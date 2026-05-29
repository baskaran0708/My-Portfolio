import { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";

import { Footer, Navbar } from "./components";
import ErrorBoundary from "./components/ErrorBoundary";
import Loader from "./components/Loader";

// Route-level code splitting — each page loads its own JS chunk on demand
const Home     = lazy(() => import("./pages/Home"));
const About    = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Contact  = lazy(() => import("./pages/Contact"));
const Resume   = lazy(() => import("./pages/Resume"));
const NotFound = lazy(() => import("./pages/NotFound"));

const DARK_BG = { background: "rgb(0,3,25)" };
const SPECIAL_ROUTES = ["/projects", "/resume"];

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <Loader />
  </div>
);

const AppLayout = () => {
  const location = useLocation();
  const isSpecial = SPECIAL_ROUTES.includes(location.pathname);

  return (
    <main
      className={isSpecial ? "min-h-screen" : "bg-slate-300/20"}
      style={isSpecial ? DARK_BG : undefined}
    >
      {!isSpecial && <Navbar />}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/"        element={<Home />} />
          <Route path="/about"   element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resume"  element={<Resume />} />
          <Route path="*"        element={<NotFound />} />
        </Routes>
      </Suspense>
      {!isSpecial && <Footer />}
    </main>
  );
};

const App = () => (
  <ErrorBoundary>
    <Router>
      <AppLayout />
    </Router>
  </ErrorBoundary>
);

export default App;
