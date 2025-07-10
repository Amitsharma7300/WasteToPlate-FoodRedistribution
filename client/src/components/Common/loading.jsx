import { FaLeaf } from "react-icons/fa";

const Loading = ({ message = "Loading, please wait..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-green-800 dark:text-white transition-all ease-in-out">
      {/* Animated Leaf Spinner with Glow */}
      <div className="relative mb-8">
        <div className="w-20 h-20 border-8 border-green-300 border-dashed rounded-full animate-spin shadow-2xl" />
        <FaLeaf className="absolute inset-0 m-auto text-5xl text-green-600 dark:text-green-400 animate-bounce drop-shadow-lg" />
        <div className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-green-200 opacity-30 blur-2xl animate-pulse" />
      </div>

      {/* Loading Text with Gradient */}
      <h1 className="text-2xl md:text-3xl font-extrabold mb-2 text-center bg-gradient-to-r from-green-600 via-blue-500 to-green-400 bg-clip-text text-transparent drop-shadow-lg">
        {message}
      </h1>
      <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 italic text-center mb-2">
        Bringing surplus to plates <span className="animate-pulse">🌍</span>
      </p>
      <div className="flex gap-2 mt-2">
        <span className="w-3 h-3 bg-green-400 rounded-full animate-ping" />
        <span className="w-3 h-3 bg-green-600 rounded-full animate-pulse" />
        <span className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
      </div>
    </div>
  );
};

export default Loading;
