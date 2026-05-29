import { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";

import { Footer, Navbar } from "./components";
import ErrorBoundary from "./components/ErrorBoundary";

// Route-level code splitting
const Home     = lazy(() => import("./pages/Home"));
const About    = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Contact  = lazy(() => import("./pages/Contact"));
const Resume   = lazy(() => import("./pages/Resume"));
const NotFound = lazy(() => import("./pages/NotFound"));

const DARK_BG       = { background: "rgb(0,3,25)" };
const SPECIAL_ROUTES = ["/projects", "/resume"];

// Route-aware spinner — dark bg on dark pages prevents flash of white
const PageLoader = ({ dark }) => (
  <div
    className="min-h-screen flex items-center justify-center"
    style={dark ? DARK_BG : undefined}
  >
    <div
      className="w-12 h-12 rounded-full border-[3px] border-t-blue-500 animate-spin"
      style={{ borderColor: dark ? "rgba(255,255,255,0.15)" : "#e2e8f0", borderTopColor: "#3b82f6" }}
    />
  </div>
);

const AppLayout = () => {
  const location = useLocation();
  const isSpecial = SPECIAL_ROUTES.includes(location.pathname);

  return (
    // resetKey on ErrorBoundary = auto-clear error state when user navigates away
    <ErrorBoundary resetKey={location.key}>
      <main
        className={isSpecial ? "min-h-screen" : "bg-slate-300/20"}
        style={isSpecial ? DARK_BG : undefined}
      >
        {!isSpecial && <Navbar />}
        <Suspense fallback={<PageLoader dark={isSpecial} />}>
          <Routes>
            <Route path="/"         element={<Home />} />
            <Route path="/about"    element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact"  element={<Contact />} />
            <Route path="/resume"   element={<Resume />} />
            <Route path="*"         element={<NotFound />} />
          </Routes>
        </Suspense>
        {!isSpecial && <Footer />}
      </main>
    </ErrorBoundary>
  );
};

const App = () => (
  <Router>
    <AppLayout />
  </Router>
);

export default App;
