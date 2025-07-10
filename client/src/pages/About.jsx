import donationImg from "../assets/donation.jpeg";
import missionImg from "../assets/mission.jpeg";
import visionImg from "../assets/vision.jpeg";
import goalImg from "../assets/goal.jpeg";

const About = () => {
  return (
    <div className="bg-gradient-to-br from-green-100 via-teal-100 to-blue-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-200 min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Image */}
        <div className="text-center mb-12">
          <img
            src={donationImg}
            alt="Food donation"
            className="mx-auto w-full max-w-xl md:max-w-md h-auto rounded-xl shadow-md"
            loading="lazy"
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-green-700 dark:text-green-400 mb-8 text-center">
          About WasteToPlate
        </h1>

        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-10 text-center max-w-3xl mx-auto">
          WasteToPlate is a non-profit initiative focused on solving urban hunger
          by redistributing surplus food from restaurants, households, and
          events to people in need through verified NGOs and dedicated
          volunteers.
        </p>

        {/* Mission Section with Image */}
        <div className="mt-10 grid md:grid-cols-2 gap-8 items-center bg-white/60 dark:bg-gray-800/60 p-6 md:p-10 rounded-xl shadow-lg">
          <div>
            <h2 className="text-2xl font-semibold text-purple-700 dark:text-purple-400 mb-4">
              Our Mission
            </h2>
            <p className="text-base text-gray-700 dark:text-gray-300">
              Our mission is simple yet impactful — to eliminate food waste and
              hunger by connecting those who have surplus food with those who
              desperately need it. Using real-time technology and a
              community-first approach, WasteToPlate ensures that no meal goes
              wasted and no stomach goes hungry.
            </p>
          </div>
          <img
            src={missionImg}
            alt="Mission"
            className="rounded-lg shadow-md w-full object-cover h-64"
            loading="lazy"
          />
        </div>

        {/* Vision Section with Image */}
        <div className="mt-12 grid md:grid-cols-2 gap-8 items-center">
          <img
            src={visionImg}
            alt="Vision"
            className="rounded-lg shadow-md w-full object-cover h-64"
            loading="lazy"
          />
          <div className="bg-white/60 dark:bg-gray-800/60 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-2">
              Our Vision
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              A sustainable urban future where no food is wasted and every
              citizen has access to nutritious meals.
            </p>
          </div>
        </div>

        {/* Goals Section with Image */}
        <div className="mt-12 grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-white/60 dark:bg-gray-800/60 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-pink-700 dark:text-pink-300 mb-2">
              Our Goals
            </h3>
            <ul className="list-disc ml-5 text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li>Build a strong donor and volunteer network across cities</li>
              <li>Automate food pickup and delivery logistics</li>
              <li>Collaborate with NGOs and municipal bodies</li>
              <li>Raise awareness about urban hunger and food wastage</li>
            </ul>
          </div>
          <img
            src={goalImg}
            alt="Goals"
            className="rounded-lg shadow-md w-full object-cover h-64"
            loading="lazy"
          />
        </div>

        {/* Stats section (you can add icons later if you wish) */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <h4 className="text-4xl font-bold text-green-700 dark:text-green-400">
              60,000+
            </h4>
            <p className="text-sm">Meals Rescued</p>
          </div>
          <div>
            <h4 className="text-4xl font-bold text-blue-700 dark:text-blue-400">
              800+
            </h4>
            <p className="text-sm">Active Donors</p>
          </div>
          <div>
            <h4 className="text-4xl font-bold text-pink-700 dark:text-pink-400">
              1,200+
            </h4>
            <p className="text-sm">Volunteers Involved</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Want to make a difference?
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Join our mission to save food and feed lives.
          </p>
          <a
            href="/register"
            className="inline-block bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-full text-sm font-medium transition"
          >
            Become a Volunteer
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
