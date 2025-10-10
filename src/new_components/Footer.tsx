import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border border-black py-4">
      © {new Date().getFullYear()} Created by Tomasz Gziut.
    </footer>
  );
};
