import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import login from '../assets/login.jpeg';
import useAuth from '../context/useAuth';
import axiosInstance from '../utils/axiosInstance';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      // Login
      await axiosInstance.post('/api/auth/login', formData);

      // Get user after login
      const res = await axiosInstance.get('/api/auth/me');
      const user = res.data;
      setUser(user);

      // 🌐 Role-Based Navigation
      switch (user.role) {
        case 'admin':
          navigate('/dashboard/admin');
          break;
        case 'donor':
          navigate('/dashboard/donor');
          break;
        case 'receiver':
          navigate('/dashboard/ngo');
          break;
        case 'volunteer':
          navigate('/dashboard/volunteer');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-blue-100 to-green-100 p-4">
      <div className="bg-white/90 backdrop-blur-md p-0 md:p-10 rounded-2xl shadow-2xl w-full max-w-3xl border border-green-100 flex flex-col md:flex-row items-center">
        {/* Left Side - Image */}
        <div className="hidden md:flex flex-1 items-center justify-center p-6">
          <img src={login} alt="Login Illustration" className="max-w-xs w-full h-auto object-contain" />
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 w-full p-8 md:p-0">
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-3xl font-extrabold mb-1 text-green-700 tracking-tight">Sign in to your account</h2>
            <p className="text-gray-500 text-sm">Welcome back! Please enter your credentials.</p>
            <p className="text-xs text-blue-500 italic mt-1">🔐 Admins must use authorized email to login</p>
          </div>

          {error && <p className="text-red-600 text-sm text-center mb-2">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={handleChange}
                required
                placeholder="you@email.com"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                required
                placeholder="Your password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white p-3 rounded-lg font-semibold shadow hover:from-green-600 hover:to-green-700 transition"
            >
              Login
            </button>
          </form>

          {/* 🧪 Dev Shortcut */}
          <div className="text-center mt-4">
            <button
              onClick={() =>
                setFormData({
                  email: 'admin@urbanfood.com', // Match backend seeded admin
                  password: 'admin123'
                })
              }
              className="text-sm text-blue-500 hover:underline"
            >
              🔐 Auto-Fill Admin Login (Dev)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
