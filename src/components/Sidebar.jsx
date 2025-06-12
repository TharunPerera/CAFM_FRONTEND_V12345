// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// const Sidebar = () => {
//   const { logout } = useContext(AuthContext);

//   return (
//     <div className="fixed w-64 bg-gray-900 text-white h-screen p-4 flex flex-col shadow-lg">
//       <h2 className="text-2xl font-bold mb-6">CAFM System</h2>
//       <nav className="flex-1">
//         <ul>
//           <li className="mb-2">
//             <Link
//               to="/dashboard"
//               className="block p-3 hover:bg-gray-700 rounded-lg transition duration-200"
//             >
//               Dashboard
//             </Link>
//           </li>
//           <li className="mb-2">
//             <Link
//               to="/companies"
//               className="block p-3 hover:bg-gray-700 rounded-lg transition duration-200"
//             >
//               Companies
//             </Link>
//           </li>
//           <li className="mb-2">
//             <Link
//               to="/contracts"
//               className="block p-3 hover:bg-gray-700 rounded-lg transition duration-200"
//             >
//               Contracts
//             </Link>
//           </li>
//           <li className="mb-2">
//             <Link
//               to="/services"
//               className="block p-3 hover:bg-gray-700 rounded-lg transition duration-200"
//             >
//               Services
//             </Link>
//           </li>
//           <li className="mb-2">
//             <Link
//               to="/assets"
//               className="block p-3 hover:bg-gray-700 rounded-lg transition duration-200"
//             >
//               Assets
//             </Link>
//           </li>
//           <li className="mb-2">
//             <Link
//               to="/workrequests"
//               className="block p-3 hover:bg-gray-700 rounded-lg transition duration-200"
//             >
//               Work Requests
//             </Link>
//           </li>
//         </ul>
//       </nav>
//       <button
//         onClick={logout}
//         className="block p-3 bg-red-600 hover:bg-red-700 rounded-lg text-white transition duration-200"
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Sidebar;

//1111111
// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// const Sidebar = () => {
//   const { logout } = useContext(AuthContext);

//   return (
//     <div className="fixed w-64 bg-gray-800 text-white h-screen p-6 shadow-lg">
//       <h2 className="text-xl font-bold text-white mb-8">CAFM System</h2>
//       <nav className="flex-1">
//         <ul className="space-y-2">
//           <li>
//             <Link
//               to="/dashboard"
//               className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
//             >
//               Dashboard
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/companies"
//               className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
//             >
//               Companies
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/contracts"
//               className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
//             >
//               Contracts
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/services"
//               className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
//             >
//               Services
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/sla"
//               className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
//             >
//               SLA
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/assets"
//               className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
//             >
//               Assets
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/workrequests"
//               className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
//             >
//               Work Requests
//             </Link>
//           </li>
//         </ul>
//       </nav>
//       <button
//         type="submit"
//         onClick={logout}
//         className="block p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors w-full mt-4"
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Sidebar;

// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// const Sidebar = () => {
//   const { logout } = useContext(AuthContext);

//   return (
//     <div className="fixed w-64 bg-gray-800 text-white h-screen p-6 shadow-lg">
//       <h2 className="text-xl font-bold text-white mb-8">CAFM System</h2>
//       <nav className="flex-1">
//         <ul className="space-y-2">
//           <li>
//             <Link
//               to="/dashboard"
//               className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
//             >
//               Dashboard
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/companies"
//               className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
//             >
//               Companies
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/contracts"
//               className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
//             >
//               Contracts
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/services"
//               className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
//             >
//               Services
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/sla"
//               className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors text-sm"
//             >
//               SLA
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/assets"
//               className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
//             >
//               Assets
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/workrequests"
//               className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
//             >
//               Work Requests
//             </Link>
//           </li>
//         </ul>
//       </nav>
//       <button
//         type="button"
//         onClick={logout}
//         className="block p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors w-full mt-4"
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Sidebar;
"use client";

import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="fixed w-64 bg-gray-800 text-white h-screen p-6 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-8">CAFM System</h2>
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <Link
              to="/dashboard"
              className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/companies"
              className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
            >
              Companies
            </Link>
          </li>
          <li>
            <Link
              to="/contracts"
              className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
            >
              Contracts
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/property-flow"
              className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
            >
              Property Flow
            </Link>
          </li>
          <li>
            <Link
              to="/sla"
              className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors text-sm"
            >
              SLA
            </Link>
          </li>
          <li>
            <Link
              to="/assets"
              className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
            >
              Assets
            </Link>
          </li>
          <li>
            <Link
              to="/workrequests"
              className="block p-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
            >
              Work Requests
            </Link>
          </li>
        </ul>
      </nav>
      <button
        type="button"
        onClick={logout}
        className="block p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors w-full mt-4"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
