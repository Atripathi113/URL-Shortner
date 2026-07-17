# Client (Frontend)

This is the React frontend for the URL Shortener. Handles the UI for shortening links, logging in/registering, and the dashboard where logged-in users can see and manage their links.

See the [main README](../README.md) for the full project overview, how the backend/auth works, and setup instructions for the whole app.

## Stack

- **React + Vite** — UI and dev server
- **TanStack Router** — routing, including the auth guard on `/dashboard`
- **TanStack Query** — fetches and caches the user's URL list, handles the polling that keeps click counts updated
- **Redux Toolkit** — just holds auth state (`user`, `isAuthenticated`)
- **Tailwind CSS** — styling
- **Axios** — API calls, with a shared instance and interceptors for error handling

## Folder layout

```
src/
  api/          axios calls (user.api.js, shortUrl.api.js)
  components/    LoginForm, RegisterForm, UrlForm, UserUrl, Navbar
  pages/         HomePage, AuthPage, DashboardPage
  routing/       route definitions + route tree
  store/         redux store + authSlice
  utils/         axiosInstance, checkAuth helper
```

## Running it

```bash
npm install
npm run dev
```

Needs a `.env` file in this folder with:
```
VITE_APP_URL=http://localhost:3000
```

That should point at wherever the backend is running — used to build the actual shortened link URLs shown on the dashboard.

## Notes

- The dashboard route is protected by `checkAuth` in `routing/dashboard.js` — if you're not logged in, you get redirected before the page even renders.
- `UserUrl.jsx` polls every 30 seconds via `refetchInterval` so click counts stay reasonably fresh without a manual refresh.
- Creating a new link calls `queryClient.invalidateQueries` so the dashboard list updates immediately instead of waiting for the next poll.
