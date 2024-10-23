/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/u5LrDCPAZkf
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/

import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-gray-200 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-gray-800 font-bold text-xl">Recipe App</div>
        <div className="space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-white font-bold bg-gray-800 p-2 rounded-md"
                : "text-gray-800 hover:text-white"
            }
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/recipes-table"
            className={({ isActive }) =>
              isActive
                ? "text-white font-bold bg-gray-800 p-2 rounded-md"
                : "text-gray-800 hover:text-white"
            }
          >
            Recipes
          </NavLink>
          <NavLink
            to="/add-recipe"
            className={({ isActive }) =>
              isActive
                ? "text-white font-bold bg-gray-800 p-2 rounded-md"
                : "text-gray-800 hover:text-white"
            }
          >
            Add Recipe
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

function BookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
