import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
    <div className="text-center">
      <h1 className="text-8xl font-black text-slate-200 leading-none">404</h1>
      <h2 className="text-2xl font-bold text-slate-800 mt-2 mb-3">Page not found</h2>
      <p className="text-slate-500 text-sm mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center px-6 py-3 rounded-lg text-sm font-semibold text-white"
        style={{ background: "linear-gradient(135deg,#00c6ff,#0072ff)" }}
      >
        Go home
      </Link>
    </div>
  </div>
);

export default NotFound;
