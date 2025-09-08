import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProfilePage from "./pages/ProfilePage";
import Contact from "./pages/DashboardPage"; // adjust if this is a different page
import MainUspPage from "./pages/MainUspPage";
import LoadingSpinner from "./components/LoadingSpinner";
import CommunityTweets from "./components/CommunityTweets";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to='/MainUspPage' replace />;
  }

  return children;
};

function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div>
      <Routes>
        <Route
          path='/'
          element={
            isAuthenticated ? (
              <Navigate to='/MainUspPage' replace />
            ) : (
              <DashboardPage />
            )
          }
        />

        <Route
          path='/signup'
          element={
            <RedirectAuthenticatedUser>
              <SignUpPage />
            </RedirectAuthenticatedUser>
          }
        />

        <Route
          path='/login'
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />

        <Route
          path='/forgot-password'
          element={
            <RedirectAuthenticatedUser>
              <ForgotPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />

        <Route
          path='/reset-password/:token'
          element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />

        <Route path='/contact' element={<Contact />} />
        <Route path='/profile' element={<ProfilePage />} />

        <Route
          path='/MainUspPage'
          element={
            <ProtectedRoute>
              <MainUspPage />
            </ProtectedRoute>
          }
        />

        <Route path='*' element={<Navigate to='/' replace />} />
		
<Route path="/tweets" element={<CommunityTweets />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;