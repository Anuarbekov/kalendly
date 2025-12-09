import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import Dashboard from "./pages/Dashboard";
import BookingPage from "./pages/BookingPage";
import Welcome from "./pages/Welcome";
import BookingSuccess from "./pages/BookingSuccess";

// --- WRAPPERS ---

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = !!localStorage.getItem("access_token");
  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

const RedirectIfAuthenticated = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isAuthenticated = !!localStorage.getItem("access_token");
  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <>{children}</>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RedirectIfAuthenticated>
              <Welcome />
            </RedirectIfAuthenticated>
          }
        />

        {/* Student Flow */}
        <Route path="/event/:slug" element={<BookingPage />} />

        <Route path="/booking-confirmed" element={<BookingSuccess />} />

        {/* Teacher Flow */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
        </Route>

        <Route
          path="*"
          element={<div className="p-10 text-center">Page not found</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
