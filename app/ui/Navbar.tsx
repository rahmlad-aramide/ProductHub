import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4 flex items-center h-20">
      <div className="container mx-auto">
        <a href="/" className="text-white text-2xl font-bold tracking-wide">
          <span className="font-extrabold text-primary">Product</span>
          Hub
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
