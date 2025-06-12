const CompanyTable = ({ companies }) => (
  <div className="overflow-x-auto mt-6 bg-white rounded-xl shadow-lg">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
            ID
          </th>
          <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
            Company Name
          </th>
          <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
            Contact Email
          </th>
          <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
            Contact Phone
          </th>
          <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
            Address
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {companies.map((company) => (
          <tr key={company.companyId} className="hover:bg-gray-50">
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
              {company.contactPhone}
            </td>
            <td className="py-4 px-6 text-sm text-gray-600">
              {company.address}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default CompanyTable;
