# URL Shortener

A MERN stack app I built to shorten long URLs, with proper user accounts on top of it. Anyone can shorten a link without signing up, but if you register, you get a dashboard that keeps track of every link you've made, lets you pick your own custom slug instead of a random code, and shows you how many times each link has been clicked.

I built this mainly to practice full-stack auth (JWT + cookies) end to end, not just the URL shortening logic, which is honestly the easy part.

## What it does

- Shorten any URL instantly, no login needed
- Register/login with hashed passwords, session handled through an HTTP-only cookie
- Logged-in users can set a custom slug instead of getting a random 7-character code
- Every link tracks how many times it's been clicked
- Dashboard shows all your links in one table, with a copy button
- Dashboard route is protected — you can't reach it without being logged in, checked both on the frontend router and again on the backend
- The link list refreshes itself every 30 seconds so click counts stay reasonably current

## Stack

**Frontend:** React + Vite, TanStack Router for routing (including the auth guard on `/dashboard`), TanStack Query for fetching/caching the URL list, Redux Toolkit just for auth state, Tailwind for styling, Axios for API calls.

**Backend:** Node + Express, MongoDB with Mongoose, bcryptjs for password hashing, JWT for sessions, nanoid to generate the short codes.

I went with TanStack Query for the URLs list specifically because I didn't want to hand-roll loading/error states and polling logic myself — it does that out of the box.

## How the auth actually works

Register or login hits the backend, which hashes/checks the password, signs a JWT with the user's id, and sets it as an **HTTP-only cookie**. It's not stored in localStorage or anything JS can touch — that's on purpose, keeps it safer from XSS. Every protected route after that goes through an `authMiddleware` that reads the cookie, verifies the token, pulls the user from the DB, and attaches it to `req.user`.

On the frontend, Redux just holds a copy of the user for UI stuff (showing their name in the navbar, deciding what to render) — the cookie is the actual thing that matters for authorization, Redux is just for convenience.

## How a short URL gets created

If you're not logged in, it just generates a random 7-character code with nanoid and saves it.

If you're logged in and you type a custom slug, the backend checks if that slug is already taken before saving — if it's free, it saves the link tied to your user id so it shows up on your dashboard.

## Folder structure

```
client/
  src/
    api/          -> axios calls (user.api.js, shortUrl.api.js)
    components/    -> LoginForm, RegisterForm, UrlForm, UserUrl, Navbar
    pages/         -> HomePage, AuthPage, DashboardPage
    routing/       -> route definitions + the route tree
    store/         -> redux store + authSlice
    utils/         -> axiosInstance, checkAuth helper

server/
  controller/      -> auth.controller.js
  services/        -> auth.service.js, short_url.service.js
  dao/             -> db access layer (user.dao.js, short_url.js)
  models/          -> user.model.js, short_url.model.js
  middleware/      -> auth.middleware.js
  routes/          -> auth.routes.js + url routes
  utils/           -> helper.js (jwt sign/verify, nanoid), tryCatchWrapper.js
  app.js
```

## API routes

| Method | Route | Needs login? | What it does |
|---|---|---|---|
| POST | `/api/auth/register` | no | create account |
| POST | `/api/auth/login` | no | log in, get session cookie |
| POST | `/api/auth/logout` | yes | clears the cookie |
| GET | `/api/auth/me` | yes | get current logged-in user |
| POST | `/api/create` | no | shorten a url (guest) |
| POST | `/api/user/urls` | yes | get all urls for the logged-in user |
| GET | `/:shortUrl` | no | redirect to original url, bumps click count |

## Env variables

`server/.env`
```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

`client/.env`
```
VITE_APP_URL=http://localhost:3000
```

Change `VITE_APP_URL` once you actually deploy the backend somewhere, otherwise every shortened link will just point at localhost and only work on your own machine.

## Running it locally

```bash
git clone <your-repo-url>
cd project-root

cd server
npm install
npm start

# in a separate terminal
cd client
npm install
npm run dev
```

Then open whatever port Vite gives you (usually `localhost:5173`).

## Things I still want to add

- Actually deploy it (backend on Render/Railway, frontend on Vercel) so the links work for other people
- Link expiry
- Click history over time instead of just a total count
- QR code for each link
- Rate limiting on `/api/create` so it can't be spammed