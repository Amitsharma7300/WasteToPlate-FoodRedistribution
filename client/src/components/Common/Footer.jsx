import { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setEmail("");
    }
  };

  return (
    <footer className="relative text-gray-800 dark:text-gray-100 bg-gradient-to-br from-green-100 via-teal-100 to-blue-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950 pt-14 mt-16 z-10 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 pb-16">
        
        {/* Brand Description */}
        <div>
          <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-4">WasteToPlate</h2>
          <p className="text-sm">
            Bridging surplus food with those in need through real-time tech and community action.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-4">Navigate</h4>
          <ul className="space-y-2 text-sm">
            {["Home", "Donate", "Join Us", "About", "Contact"].map((item, i) => (
              <li key={i}>
                <Link
                  to={item.toLowerCase().replace(" ", "")}
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold text-pink-700 dark:text-pink-300 mb-4">Contact</h4>
          <ul className="text-sm space-y-2">
            <li>📍 New Delhi, India</li>
            <li>📞 +91 7300655336</li>
            <li>✉️ support@urbanfood.org</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-semibold text-purple-700 dark:text-purple-300 mb-4">Subscribe</h4>
          <p className="text-sm mb-3">Stay informed on updates and volunteer drives.</p>
          <form onSubmit={handleSubscribe} className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-2 pr-10 rounded-full border border-blue-200 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none text-sm text-gray-800 dark:text-white"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-xs px-3 py-1.5 rounded-full transition"
            >
              Subscribe
            </button>
            {submitted && (
              <p className="mt-2 text-green-600 dark:text-green-400 text-xs">
                ✔️ Subscribed!
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 dark:border-gray-700"></div>

      {/* Bottom Row */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <p className="text-gray-700 dark:text-gray-400">
          © {new Date().getFullYear()} <span className="font-medium text-blue-700 dark:text-blue-300">WasteToPlate</span>. All rights reserved.
        </p>
        <div className="flex space-x-4 text-lg">
          <a href="#" className="text-blue-600 hover:text-blue-800"><i className="fab fa-facebook"></i></a>
          <a href="#" className="text-sky-500 hover:text-sky-700"><i className="fab fa-twitter"></i></a>
          <a href="#" className="text-pink-500 hover:text-pink-600"><i className="fab fa-instagram"></i></a>
          <a href="#" className="text-red-600 hover:text-red-700"><i className="fab fa-youtube"></i></a>
        </div>
      </div>

      {/* Scroll-to-Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-gradient-to-br from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white p-3 rounded-full shadow-lg transition"
        aria-label="Scroll to top"
      >
        <i className="fas fa-chevron-up text-sm"></i>
      </button>

      {/* WhatsApp */}
      <a
        href="https://wa.me/7300655336"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white p-3 rounded-full shadow-lg text-xl transition"
        aria-label="Chat on WhatsApp"
      >
        <i className="fab fa-whatsapp"></i>
      </a>
    </footer>
  );
};

export default Footer;
