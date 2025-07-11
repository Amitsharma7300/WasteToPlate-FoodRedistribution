import axios from "axios";
import { useState } from "react";
import { FaBox, FaMapMarkerAlt, FaPhoneAlt, FaUtensils } from "react-icons/fa";
import donateImg from "../assets/donation.jpeg";
import useAuth from "../context/useAuth"; // <-- FIXED: useAuth should be imported as default, not { useAuth }

const DonateFood = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    foodType: "",
    quantity: "",
    pickupAddress: "",
    contactNumber: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/food/donate`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setMessage("🎉 Food donation submitted successfully!");
        setFormData({
          foodType: "",
          quantity: "",
          pickupAddress: "",
          contactNumber: "",
          description: "",
        });
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 p-6 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-white rounded-xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left: Image */}
        <div className="hidden md:block">
          <img
            src={donateImg}
            alt="Donate Food"
            className="object-cover h-full w-full"
          />
        </div>

        {/* Right: Form */}
        <div className="p-8 md:p-12 bg-white backdrop-blur-md">
          <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
            🍱 Donate Surplus Food
          </h2>

          {message && (
            <div className="mb-4 text-sm text-center font-medium text-green-600 bg-green-100 p-3 rounded shadow-sm">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Food Type */}
            <div className="relative">
              <FaUtensils className="absolute top-3 left-3 text-green-600" />
              <input
                name="foodType"
                value={formData.foodType}
                onChange={handleChange}
                placeholder="Type of Food"
                required
                className="pl-10 w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Quantity */}
            <div className="relative">
              <FaBox className="absolute top-3 left-3 text-green-600" />
              <input
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Quantity (e.g. 5 kg)"
                required
                className="pl-10 w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Address */}
            <div className="relative">
              <FaMapMarkerAlt className="absolute top-3 left-3 text-green-600" />
              <input
                name="pickupAddress"
                value={formData.pickupAddress}
                onChange={handleChange}
                placeholder="Pickup Address"
                required
                className="pl-10 w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <FaPhoneAlt className="absolute top-3 left-3 text-green-600" />
              <input
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="Contact Number"
                required
                className="pl-10 w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Description */}
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Additional Information"
              rows="3"
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded font-semibold shadow-md"
            >
              🚚 Submit Donation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonateFood;
