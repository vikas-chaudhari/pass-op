import React from "react";
import github from "../assets/github.svg";
const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-3 px-10 bg-slate-800 text-white">
      <div className="logo cursor-pointer text-3xl font-bold">
        <span className="text-green-500">&lt;</span>
        Pass
        <span className="text-green-500">OP/&gt;</span>
      </div>
      <a
        href="https://github.com/vikas-chaudhari"
        className="github cursor-pointer flex gap-2 bg-green-600 rounded-full p-1 pr-4 justify-between items-center text-xl text-center
      border-b-4  hover:border-b-2 transition-all duration-300 hover:mt-1 right-5 absolute select-none"
        target="_blank"
      >
        <img src={github} className="w-8 invert" alt="github" />
        Github
      </a>
    </nav>
  );
};

export default Navbar;
