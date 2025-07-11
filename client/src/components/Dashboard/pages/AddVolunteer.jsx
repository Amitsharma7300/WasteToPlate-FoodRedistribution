import axios from "axios";
import { useState } from "react";

const AddVolunteer = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post("http://localhost:5000/api/admin/add-volunteer", form, { withCredentials: true });
      setMessage(res.data.message || "Volunteer added successfully!");
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Failed to add volunteer."
      );
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-8">
      <h2 className="text-xl font-bold mb-4 text-green-700">Add Volunteer</h2>
      {message && (
        <div className="mb-4 text-center text-blue-700 font-medium">{message}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Add Volunteer
        </button>
      </form>
    </div>
  );
};

export default AddVolunteer;