const Contact = () => {
  return (
    <div className="bg-gradient-to-br from-green-100 via-teal-100 to-blue-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950 min-h-screen py-16 px-6 text-gray-800 dark:text-gray-200">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-green-700 dark:text-green-400 mb-12">
          Contact Us
        </h1>

        {/* Contact Form */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/60 dark:bg-gray-800/60 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-4">
              Send us a Message
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm mb-1" htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm mb-1" htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm mb-1" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows="4"
                  placeholder="Your message..."
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-full font-medium hover:from-green-600 hover:to-blue-600 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="bg-white/60 dark:bg-gray-800/60 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-purple-700 dark:text-purple-400 mb-4">
              Reach Us
            </h2>
            <p className="text-sm mb-4 text-gray-700 dark:text-gray-300">
              We'd love to hear from you! Whether you have a question about features, volunteering, or anything else — our team is ready to help.
            </p>
            <ul className="text-sm space-y-3 text-gray-700 dark:text-gray-300">
              <li><strong>Email:</strong> support@urbanfood.org</li>
              <li><strong>Phone:</strong> +91 98765 43210</li>
              <li><strong>Address:</strong> UrbanFood HQ, Sector 21, New Delhi, India</li>
            </ul>

            {/* Google Map Placeholder */}
            <div className="mt-6 w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-300 text-sm">
              [ Google Map Integration Coming Soon ]
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
