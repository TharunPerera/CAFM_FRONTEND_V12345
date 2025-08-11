// const CompanyTable = ({ companies }) => (
//   <div className="overflow-x-auto mt-6 bg-white rounded-xl shadow-lg">
//     <table className="min-w-full divide-y divide-gray-200">
//       <thead className="bg-gray-50">
//         <tr>
//           <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
//             ID
//           </th>
//           <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
//             Company Name
//           </th>
//           <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
//             Contact Email
//           </th>
//           <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
//             Contact Phone
//           </th>
//           <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
//             Address
//           </th>
//         </tr>
//       </thead>
//       <tbody className="divide-y divide-gray-200">
//         {companies.map((company) => (
//           <tr key={company.companyId} className="hover:bg-gray-50">
//             <td className="py-4 px-6 text-sm text-gray-600">
//               {company.companyId}
//             </td>
//             <td className="py-4 px-6 text-sm text-gray-600">
//               {company.companyName}
//             </td>
//             <td className="py-4 px-6 text-sm text-gray-600">
//               {company.contactEmail}
//             </td>
//             <td className="py-4 px-6 text-sm text-gray-600">
//               {company.contactPhone}
//             </td>
//             <td className="py-4 px-6 text-sm text-gray-600">
//               {company.address}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// );

// export default CompanyTable;

// import { Pencil, Trash2 } from "lucide-react";

// const CompanyTable = ({ companies, onDelete }) => (
//   <div className="overflow-x-auto mt-6 bg-white rounded-xl shadow-xl border border-gray-100">
//     <table className="min-w-full divide-y divide-gray-200">
//       <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
//         <tr>
//           <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
//             ID
//           </th>
//           <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
//             Company Name
//           </th>
//           <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
//             Contact Email
//           </th>
//           <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
//             Contact Phone
//           </th>
//           <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
//             Address
//           </th>
//           <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
//             Actions
//           </th>
//         </tr>
//       </thead>
//       <tbody className="divide-y divide-gray-200">
//         {companies.map((company) => (
//           <tr
//             key={company.companyId}
//             className="hover:bg-blue-50 transition-colors duration-200"
//           >
//             <td className="py-4 px-6 text-sm text-gray-600">
//               {company.companyId}
//             </td>
//             <td className="py-4 px-6 text-sm text-gray-600">
//               {company.companyName}
//             </td>
//             <td className="py-4 px-6 text-sm text-gray-600">
//               {company.contactEmail}
//             </td>
//             <td className="py-4 px-6 text-sm text-gray-600">
//               {company.contactPhone || "-"}
//             </td>
//             <td className="py-4 px-6 text-sm text-gray-600">
//               {company.address || "-"}
//             </td>
//             <td className="py-4 px-6 text-sm text-gray-600">
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() =>
//                     window.location.assign(`/companies/${company.companyId}`)
//                   }
//                   className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all shadow-sm hover:shadow-md"
//                   title="Update Company"
//                 >
//                   <Pencil className="h-4 w-4 mr-1" />
//                   Update
//                 </button>
//                 <button
//                   onClick={() => onDelete(company.companyId)}
//                   className="flex items-center px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-sm hover:shadow-md"
//                   title="Delete Company"
//                 >
//                   <Trash2 className="h-4 w-4 mr-1" />
//                   Delete
//                 </button>
//               </div>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// );

// export default CompanyTable;

import { Pencil, Trash2 } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const CompanyTable = ({ companies, onDelete }) => {
  const { user } = useContext(AuthContext);

  const handleUpdateClick = (companyId) => {
    if (!user?.permissions?.includes("update_company")) {
      toast.error("You don't have permission to update companies");
      return;
    }
    window.location.assign(`/companies/${companyId}`);
  };

  const handleDeleteClick = (companyId) => {
    if (!user?.permissions?.includes("delete_company")) {
      toast.error("You don't have permission to delete companies");
      return;
    }
    onDelete(companyId);
  };

  return (
    <div className="w-full overflow-x-auto mt-6 bg-white rounded-xl shadow-xl border border-gray-100">
      <table className="w-full table-auto">
        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
          <tr>
            <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 min-w-[100px]">
              ID
            </th>
            <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 min-w-[200px]">
              Company Name
            </th>
            <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 min-w-[200px]">
              Contact Email
            </th>
            <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 min-w-[150px]">
              Contact Phone
            </th>
            <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 min-w-[200px]">
              Address
            </th>
            <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 min-w-[150px]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {companies.map((company) => (
            <tr
              key={company.companyId}
              className="hover:bg-blue-50 transition-colors duration-200"
            >
              <td className="py-4 px-6 text-sm text-gray-600">
                {company.companyId}
              </td>
              <td className="py-4 px-6 text-sm text-gray-600 truncate">
                {company.companyName}
              </td>
              <td className="py-4 px-6 text-sm text-gray-600 truncate">
                {company.contactEmail}
              </td>
              <td className="py-4 px-6 text-sm text-gray-600">
                {company.contactPhone || "-"}
              </td>
              <td className="py-4 px-6 text-sm text-gray-600 truncate">
                {company.address || "-"}
              </td>
              <td className="py-4 px-6 text-sm text-gray-600">
                <div className="flex space-x-2">
                  <div className="relative group">
                    <button
                      onClick={() => handleUpdateClick(company.companyId)}
                      className={`flex items-center px-3 py-1 rounded-lg shadow-sm transition-all ${
                        user?.permissions?.includes("update_company")
                          ? "bg-blue-500 text-white hover:bg-blue-600 hover:shadow-md"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                      disabled={!user?.permissions?.includes("update_company")}
                      title={
                        user?.permissions?.includes("update_company")
                          ? "Update Company"
                          : "No permission to update"
                      }
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      Update
                    </button>
                    {!user?.permissions?.includes("update_company") && (
                      <div className="absolute right-0 top-full mt-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                        You don't have permission to update companies
                      </div>
                    )}
                  </div>
                  <div className="relative group">
                    <button
                      onClick={() => handleDeleteClick(company.companyId)}
                      className={`flex items-center px-3 py-1 rounded-lg shadow-sm transition-all ${
                        user?.permissions?.includes("delete_company")
                          ? "bg-red-500 text-white hover:bg-red-600 hover:shadow-md"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                      disabled={!user?.permissions?.includes("delete_company")}
                      title={
                        user?.permissions?.includes("delete_company")
                          ? "Delete Company"
                          : "No permission to delete"
                      }
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </button>
                    {!user?.permissions?.includes("delete_company") && (
                      <div className="absolute right-0 top-full mt-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                        You don't have permission to delete companies
                      </div>
                    )}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyTable;
