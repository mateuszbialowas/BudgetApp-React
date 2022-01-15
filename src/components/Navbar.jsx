import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useUserAuth } from "../context/UserAuthContext";

export default function Navbar() {
  let { user, logOut } = useUserAuth();
  function toggleMenu() {
    const menu_button = document.getElementById("mobile-menu-button");
    const mobile_menu = document.getElementById("mobile-menu");
    const logo = document.getElementById("logo");
    menu_button.classList.toggle("active-menu");
    mobile_menu.classList.toggle("active-menu");
    logo.classList.toggle("active-logo-btn");
    menu_button.classList.toggle("active-logo-btn");
  }
  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {}
  };
  return (
    <nav className="py-4 mb-5 shadow-lg relative">
      <div className="max-w-7xl mx-auto">
        <div className="px-3 lg:px-8 flex items-center space-x-5 justify-between">
          <div className="z-10">
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="Logo"
                className="h-9 lg:h-12 w-9 lg:w-12
          mr-2"
              />
              <span
                id="logo"
                className="color-animation text-xl lg:text-2xl text-gray-900 font-bold"
              >
                BudgetApp
              </span>
            </Link>
          </div>
          <ul className="hidden lg:flex items-center space-x-6">
            <li>
              <Link to="#" className="font-medium">
                Pricing & Features
              </Link>
            </li>
            <li>
              <Link to="#" className="font-medium">
                Blog
              </Link>
            </li>
          </ul>
          <div className="hidden lg:block space-x-4">
            {user ? (
              <>
                <button className="p-4" onClick={handleLogout}>
                  Log out
                </button>
                <Link
                  to="/dashboard"
                  className="px-5 py-4
        bg-blue-light text-white rounded-lg font-medium shadow-md
        hover:shadow-lg"
                >
                  Go to dashboard
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">Log in</Link>
                <Link
                  to="/signup"
                  className="px-5 py-4
          bg-blue-light text-white rounded-lg font-medium shadow-md
          hover:shadow-lg"
                >
                  Try for free
                </Link>
              </>
            )}
          </div>
          <div className="z-10 lg:hidden">
            <button
              className="color-animation"
              id="mobile-menu-button"
              onClick={() => toggleMenu()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-9 w-9"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <div
          id="mobile-menu"
          className="
        menu-animation
        -left-full
        lg:hidden
        absolute
        inset-y-0
        w-full
        h-screen
        bg-black
        opacity-95
        pt-14
      "
        >
          <ul className="py-9 px-9 flex flex-col space-y-9">
            <li>
              <Link
                onClick={() => toggleMenu()}
                to="#"
                className="text-xl text-white"
              >
                Pricing & Features
              </Link>
            </li>
            <li>
              <Link
                onClick={() => toggleMenu()}
                to="#"
                className="text-xl text-white"
              >
                Blog
              </Link>
            </li>
            {user ? (
              <>
                <button
                  className="text-xl
                      text-white
                      text-left"
                  onClick={handleLogout}
                >
                  Log out
                </button>
                <Link
                  onClick={() => toggleMenu()}
                  to="/dashboard"
                  className="px-5 py-4
        bg-blue-light text-white rounded-lg font-bold shadow-md
        hover:shadow-lg text-center"
                >
                  Go to dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  onClick={() => toggleMenu()}
                  className="text-xl
                      text-white"
                  to="/login"
                >
                  Log in
                </Link>
                <Link
                  onClick={() => toggleMenu()}
                  to="/signup"
                  className="px-5 py-4
          bg-blue-light text-white rounded-lg font-bold shadow-md
          hover:shadow-lg text-center"
                >
                  Try for free
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
