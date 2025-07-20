// src/pages/Login.jsx
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 animate-gradient p-4 sm:p-6 md:p-8 overflow-hidden relative">
      {/* Particle Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-xl shadow-2xl p-8 z-10">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          CAFM System
        </h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
