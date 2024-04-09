import React from "react";

const Footer = () => {
  return (
    <div
      className="footer w-full flex flex-col items-center bg-slate-900 text-white"
      id="contact"
    >
      <div>
        <p className="text-2xl">
          Copyright &copy;2023 All rights reserved | Powered with
          <span className="text-red-500"> &hearts; </span>by Vikas Chaudhari
        </p>
      </div>
    </div>
  );
};

export default Footer;
