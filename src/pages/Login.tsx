import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin && formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Simulate setting authentication token
    localStorage.setItem('isAuthenticated', 'true');
    // Redirect securely to profile
    navigate('/profile');
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans">
      <Navbar forceWhiteText={true} />

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 z-0 transition-all duration-700"
        style={{
          backgroundImage: `url('src/assets/background.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(10px)',
          transform: 'scale(1.1)'
        }}
      />

      <div className="absolute inset-0 bg-black/40 z-1" />

      {/* MAIN INTERFACE CARD */}
      <div className="relative z-10 w-full max-w-md p-6 mx-4">
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] shadow-2xl px-6 py-10 md:px-8 md:py-12 text-white transition-all duration-500">

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight">
              {isLogin ? 'Welcome Back' : 'Join the Journey'}
            </h2>
            <p className="text-gray-300 mt-2 text-sm md:text-base">
              {isLogin ? 'Sign in to your account' : 'Create an account to explore Bihar'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {!isLogin && (
              <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold mb-1.5 ml-1 text-amber-400">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 outline-none transition-all placeholder:text-gray-500 text-white"
                    placeholder="Rahul"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold mb-1.5 ml-1 text-amber-400">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 outline-none transition-all placeholder:text-gray-500 text-white"
                    placeholder="Kumar"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold mb-1.5 ml-1 text-amber-400">Email Address</label>
              <input
                type="email"
                name="email"
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 outline-none transition-all placeholder:text-gray-500 text-white"
                placeholder="name@example.com"
                required
              />
            </div>

            {/* NEW PASSWORD FIELDS */}
            <div className={`${!isLogin ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}`}>
              <div className="w-full relative">
                <label className="block text-[10px] uppercase tracking-widest font-bold mb-1.5 ml-1 text-amber-400">
                  {isLogin ? 'Password' : 'New Password'}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    onChange={handleInputChange}
                    className="w-full px-4 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 outline-none transition-all placeholder:text-gray-500 text-white"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-black transition-all focus:outline-none cursor-pointer shadow-sm"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className="w-full relative animate-in fade-in slide-in-from-right-2 duration-300">
                  <label className="block text-[10px] uppercase tracking-widest font-bold mb-1.5 ml-1 text-amber-400">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      onChange={handleInputChange}
                      className="w-full px-4 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 outline-none transition-all placeholder:text-gray-500 text-white"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-black transition-all focus:outline-none cursor-pointer shadow-sm"
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {isLogin && (
              <div className="flex items-center justify-end text-xs">
                <Link to="/forgot-password" className="text-amber-400 hover:text-amber-300 transition-colors font-medium">Forgot password?</Link>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 px-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl shadow-xl shadow-amber-950/40 transition-all active:scale-[0.97] mt-4 uppercase tracking-widest text-sm cursor-pointer"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm">
            <span className="text-gray-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
            </span>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-amber-400 font-bold hover:underline decoration-2 underline-offset-4 bg-transparent border-none cursor-pointer"
            >
              {isLogin ? 'Register now' : 'Sign in instead'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;