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

import { Pencil, Trash2 } from "lucide-react";

const CompanyTable = ({ companies, onDelete }) => (
  <div className="overflow-x-auto mt-6 bg-white rounded-xl shadow-xl border border-gray-100">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
        <tr>
          <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
            ID
          </th>
          <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
            Company Name
          </th>
          <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
            Contact Email
          </th>
          <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
            Contact Phone
          </th>
          <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
            Address
          </th>
          <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
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
            <td className="py-4 px-6 text-sm text-gray-600">
              {company.companyName}
            </td>
            <td className="py-4 px-6 text-sm text-gray-600">
              {company.contactEmail}
            </td>
            <td className="py-4 px-6 text-sm text-gray-600">
              {company.contactPhone || "-"}
            </td>
            <td className="py-4 px-6 text-sm text-gray-600">
              {company.address || "-"}
            </td>
            <td className="py-4 px-6 text-sm text-gray-600">
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    window.location.assign(`/companies/${company.companyId}`)
                  }
                  className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all shadow-sm hover:shadow-md"
                  title="Update Company"
                >
                  <Pencil className="h-4 w-4 mr-1" />
                  Update
                </button>
                <button
                  onClick={() => onDelete(company.companyId)}
                  className="flex items-center px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-sm hover:shadow-md"
                  title="Delete Company"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default CompanyTable;
