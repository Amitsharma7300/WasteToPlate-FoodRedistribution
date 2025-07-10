import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <section className="bg-gray-100 dark:bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Reduce Food Waste. <br /> Feed the Hungry.
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              A platform that connects food donors with NGOs and individuals in need through real-time logistics and coordination.
            </p>
            <div className="flex space-x-4">
              <Link
                to="/donate"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium"
              >
                Donate Now
              </Link>
              <Link
                to="/register"
                className="border border-green-600 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-gray-700 px-6 py-3 rounded-md font-medium"
              >
                Become a Volunteer
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <img
              src="https://images.unsplash.com/photo-1606787366850-de6330128bfc"
              alt="Helping hands with food"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">How WasteToPlate Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "1. Food Donors",
                desc: "Restaurants, homes, and event planners list leftover food quickly and easily.",
                icon: "🍱",
              },
              {
                title: "2. NGOs & Shelters",
                desc: "Nearby NGOs get notified and can claim surplus food for distribution.",
                icon: "🏠",
              },
              {
                title: "3. Volunteers",
                desc: "Verified volunteers ensure fast pickup and delivery from donor to NGO.",
                icon: "🚴‍♂️",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center shadow hover:shadow-lg transition"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Stats */}
      <section className="py-20 bg-green-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            We aim to eliminate urban hunger by making sure excess food reaches the right hands—on time. With transparency, technology, and volunteers, we bridge the gap between waste and need.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-center">
            <div>
              <h3 className="text-4xl font-bold text-green-600">60,000+</h3>
              <p className="text-gray-700 dark:text-gray-300">Meals Delivered</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-green-600">800+</h3>
              <p className="text-gray-700 dark:text-gray-300">Food Donors</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-green-600">1,200+</h3>
              <p className="text-gray-700 dark:text-gray-300">Volunteers Active</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-white dark:bg-gray-900 py-20">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl md:text-3xl font-bold">
              Ready to Make a Difference?
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Sign up as a volunteer or donor and help us eliminate food waste today.
            </p>
          </div>
          <Link
            to="/register"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium"
          >
            Join Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
