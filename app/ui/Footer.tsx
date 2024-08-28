import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4 flex items-center min-h-20">
      <div className="container mx-auto">
        <p className="text-sm md:text-base">
          Made with <span className="text-red-500">💖</span> by Rahmlad &copy;
          2024
        </p>
      </div>
    </footer>
  );
};

export default Footer;
