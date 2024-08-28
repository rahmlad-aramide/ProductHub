import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4 flex items-center min-h-20">
      <div className="container mx-auto">
        <p className="text-sm md:text-base">
          Frontend Assessment <span className="hidden"> by Rahmlad</span>{" "}
          <Link href={"https://linkedin.com/in/rahmlad"} target="_blank">&copy; 2024</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
