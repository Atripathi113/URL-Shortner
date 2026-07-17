import { Link, useNavigate } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slice/authSlice.js";
import { logoutUser } from "../api/user.api";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(logout());
      navigate({ to: "/" });
    }
  };

  return (
    <nav className="bg-slate-950 border-b border-slate-800 sticky top-0 z-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-lg font-semibold text-slate-100 tracking-tight">
            Snip<span className="text-indigo-400">Link</span>
          </Link>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-slate-400 hidden sm:inline">
                  {user?.name}
                </span>
                <Link
                  to="/dashboard"
                  className="text-sm text-slate-300 hover:text-white px-3 py-1.5 rounded-md hover:bg-slate-800 transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm bg-slate-800 hover:bg-slate-700 text-slate-100 px-3 py-1.5 rounded-md transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-md transition-colors"
              >
                Login / Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;