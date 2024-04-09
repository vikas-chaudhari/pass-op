import React, { useEffect, useRef, useState } from "react";
import eye from "../assets/eye.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { v4 as uuidv4 } from "uuid";

import eyecrossed from "../assets/eye-crossed.png";
import copy from "../assets/copy.png";

const Container = () => {
  const [form, setForm] = useState({ website: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyToClipboard = (value) => {
    window.navigator.clipboard.writeText(value);
    toast.success("🦄 Copied to clipdoard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const savePassword = () => {
    console.log(form);
    if (form.website !== "" && form.username !== "" && form.password !== "") {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      toast.success("Password saved successfully.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log([...passwordArray, form]);
    }
  };
  const editPassword = (id) => {
    setForm(passwordArray.filter((item) => item.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };
  const deletePassword = (id) => {
    let isconfirmed = confirm("Do you want to delete your password");
    if (isconfirmed) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );

      toast.success("Password deleted succesfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className="maincontainer flex flex-col items-center bg-green-100">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="logo cursor-pointer text-3xl font-bold text-center">
        <span className="text-green-500">&lt;</span>
        Pass
        <span className="text-green-500">OP/&gt;</span>
        <p className="text-xl text-center font-thin cursor-text">
          Your own password manager
        </p>
      </div>

      <div className="inputs flex flex-col justify-center items-center gap-2 p-8  my-8 w-full">
        <input
          type="text"
          className="outline-none border-green-500 border-2  w-full p-1 px-4 rounded-full"
          placeholder="Website name"
          value={form.website}
          name="website"
          onChange={changeHandler}
        />
        <div className="flex md:flex-row flex-col justify-center items-center gap-2 w-full">
          <input
            type="text"
            className="outline-none border-green-500 border-2 w-full p-1 px-4 rounded-full"
            placeholder="Username"
            value={form.username}
            name="username"
            onChange={changeHandler}
          />
          <div className="w-full flex">
            <input
              type={showPass ? "text" : "password"}
              className="relative outline-none border-green-500 border-2 w-full p-1 px-4 rounded-full"
              placeholder="Password"
              value={form.password}
              name="password"
              onChange={changeHandler}
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute end-10 mt-1 cursor-pointer"
            >
              {showPass ? (
                <img src={eye} className="w-7" alt="" />
              ) : (
                <img src={eyecrossed} className="w-7" alt="" />
              )}
            </span>
          </div>
        </div>

        <button
          className="flex gap-2
        justify-center items-center bg-green-500 border-green-600 border-2 mt-5 p-1 px-5 rounded-full select-none"
          onClick={savePassword}
        >
          <lord-icon
            src="https://cdn.lordicon.com/cgzlioyf.json"
            trigger="hover"
            stroke="bold"
            state="hover-pinch"
            colors="primary:#ffffff"
          ></lord-icon>
          <h1 className="invert text-xl">Save</h1>
        </button>
      </div>

      {/* =========================table from here================================ */}

      <div className="data flex w-full flex-col justify-center items-center">
        <h1 className="text-3xl my-3">Your Paswords</h1>

        <table className="table-auto flex-col justify-center items-center w-[95%] border-green-900 rounded-md overflow-hidden text-center">
          <thead>
            <tr className="bg-green-700 text-white">
              <th className="break-words p-2">Website</th>
              <th className="break-words">Username</th>
              <th className="break-words">Password</th>
              <th className="break-words">Operations</th>
            </tr>
          </thead>
          <tbody>
            {passwordArray.length > 0 ? (
              passwordArray.map((item, index) => (
                <tr key={index} className="border-2 gap-14 even:bg-green-200">
                  <td className="break-words py-4">
                    <span className="flex  justify-center items-center ">
                      <a
                        target="_blank"
                        className="text-blue-600 w-12 sm:w-full"
                        href={item.website}
                      >
                        {item.website}
                      </a>
                      <img
                        src={copy}
                        onClick={() => copyToClipboard(item.website)}
                        className="w-4 m-1 cursor-pointer "
                        alt=""
                      />
                    </span>
                  </td>
                  <td className="break-words">
                    <span className="flex  justify-center items-center ">
                      <p className="w-12 sm:w-full"> {item.username}</p>
                      <img
                        src={copy}
                        onClick={() => copyToClipboard(item.username)}
                        className="w-4 m-1 cursor-pointer "
                        alt=""
                      />
                    </span>
                  </td>
                  <td className="break-words">
                    <span className="flex  justify-center items-center ">
                      <p className="w-12 sm:w-full">{item.password}</p>
                      <img
                        src={copy}
                        onClick={() => copyToClipboard(item.password)}
                        className="w-4 m-1 cursor-pointer "
                        alt=""
                      />
                    </span>
                  </td>
                  <td className="break-words flex flex-col sm:flex-row justify-center items-center py-5">
                    <span
                      onClick={() => editPassword(item.id)}
                      className="flex flex-col justify-center items-center my-1 sm:mx-2"
                    >
                      <lord-icon
                        src="https://cdn.lordicon.com/ghhwiltn.json"
                        trigger="hover"
                      ></lord-icon>
                      <p className="">Edit</p>
                    </span>
                    <span
                      onClick={() => deletePassword(item.id)}
                      className="flex flex-col justify-center items-center my-1 sm:mx-2"
                    >
                      <lord-icon
                        src="https://cdn.lordicon.com/drxwpfop.json"
                        trigger="hover"
                      ></lord-icon>
                      <p className="">Delete</p>
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="">
                <td colSpan={4} className="text-3xl py-6">
                  No Passwords to show :(
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Container;
