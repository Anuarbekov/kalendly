import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import Dashboard from "./pages/Dashboard";
import Availability from "./pages/Availability";
import BookingPage from "./pages/BookingPage";
import Welcome from "./pages/Welcome";
import BookingSuccess from "./pages/BookingSuccess";
import { Toaster } from "react-hot-toast";

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
      <Toaster position="bottom-center" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route
          path="/"
          element={
            <RedirectIfAuthenticated>
              <Welcome />
            </RedirectIfAuthenticated>
          }
        />

        {/* user flow */}
        <Route path="/event/:slug" element={<BookingPage />} />

        <Route path="/booking-confirmed" element={<BookingSuccess />} />

        {/* admin flow */}
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
          path="/availability"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Availability />} />
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
