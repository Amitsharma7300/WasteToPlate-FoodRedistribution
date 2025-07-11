import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import registerImg from '../assets/registerImg.jpeg';
import axiosInstance from '../utils/axiosInstance';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'donor'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await axiosInstance.post(
        '/api/auth/register',
        formData
      );

      if (res.data.success) {
        setSuccess('Registration successful!');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setError(res.data.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-blue-100 to-green-100 p-4">
      <div className="bg-white/95 backdrop-blur-lg p-0 md:p-0 rounded-3xl shadow-2xl w-full max-w-4xl border border-green-100 flex flex-col md:flex-row items-center overflow-hidden">
        <div className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-br from-green-400/80 to-blue-200/80 h-full p-0">
          <img src={registerImg} alt="Register Illustration" className="w-full h-full object-cover object-center drop-shadow-2xl scale-110" />
        </div>
        <div className="flex-1 w-full p-10 md:p-16 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold mb-2 text-green-700 tracking-tight text-center drop-shadow-lg">Create your account</h2>
          <p className="text-gray-500 text-base text-center mb-6">Join WasteToPlate and help make a difference!</p>
          {error && <p className="text-red-600 text-sm text-center mb-2 animate-pulse">{error}</p>}
          {success && <p className="text-green-600 text-sm text-center mb-2 animate-bounce">{success}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  onChange={handleChange}
                  required
                  placeholder="Full Name"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition shadow-sm"
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  required
                  placeholder="Email"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition shadow-sm"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  required
                  placeholder="Password"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition shadow-sm"
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-1">Role</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition shadow-sm"
                >
                  <option value="donor">Donor</option>
                  <option value="receiver">Receiver (NGO)</option>
                  <option value="volunteer">Volunteer</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white p-3 rounded-xl font-bold shadow-lg hover:from-green-600 hover:to-green-700 transition text-lg tracking-wide mt-2"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
