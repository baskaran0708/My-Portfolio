import { Component } from "react";

/**
 * Wraps children and catches any React render errors.
 * Pass location.key (or any string that changes on route change) as the `resetKey`
 * prop so the boundary auto-resets when the user navigates to a healthy route.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("[ErrorBoundary] Render error:", error, info.componentStack);
  }

  // Reset when the parent passes a new resetKey (e.g. location changes)
  componentDidUpdate(prevProps) {
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
          <div className="text-center max-w-md">
            <p className="text-5xl mb-4">⚠️</p>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Something went wrong</h2>
            <p className="text-slate-500 text-sm mb-6">
              A rendering error occurred — usually a WebGL or 3D model issue.
              Navigate to another page or reload.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg,#00c6ff,#0072ff)" }}
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
