// "use client";

// import { useState, useEffect } from "react";
// import { Plus, Edit, Trash2, Search, Package } from "lucide-react";
// import { inventoryService } from "../services/inventoryService";
// import InventoryForm from "../components/Inventory/InventoryForm";

// const InventoryManagement = () => {
//   const [inventoryItems, setInventoryItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");

//   const categories = [
//     "ELECTRICAL",
//     "PLUMBING",
//     "HVAC",
//     "MECHANICAL",
//     "SAFETY",
//     "CLEANING",
//     "TOOLS",
//     "OTHER",
//   ];

//   useEffect(() => {
//     fetchInventoryItems();
//   }, []);

//   const fetchInventoryItems = async () => {
//     setLoading(true);
//     try {
//       const response = await inventoryService.getAllInventoryItems();
//       setInventoryItems(response.data);
//     } catch (error) {
//       console.error("Error fetching inventory items:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCreateSuccess = () => {
//     setShowForm(false);
//     setEditingItem(null);
//     fetchInventoryItems();
//   };

//   const handleEdit = (item) => {
//     setEditingItem(item);
//     setShowForm(true);
//   };

//   const handleDelete = async (itemId) => {
//     if (
//       !window.confirm("Are you sure you want to delete this inventory item?")
//     ) {
//       return;
//     }

//     try {
//       await inventoryService.deleteInventoryItem(itemId);
//       fetchInventoryItems();
//     } catch (error) {
//       console.error("Error deleting inventory item:", error);
//       alert("Failed to delete inventory item. Please try again.");
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "ACTIVE":
//         return "bg-green-100 text-green-800";
//       case "INACTIVE":
//         return "bg-red-100 text-red-800";
//       case "OUT_OF_STOCK":
//         return "bg-yellow-100 text-yellow-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getStockStatus = (quantity, reorderLevel) => {
//     if (quantity === 0)
//       return { status: "Out of Stock", color: "text-red-600" };
//     if (quantity <= reorderLevel)
//       return { status: "Low Stock", color: "text-yellow-600" };
//     return { status: "In Stock", color: "text-green-600" };
//   };

//   const filteredItems = inventoryItems.filter((item) => {
//     const matchesSearch =
//       item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.itemCode.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory =
//       !selectedCategory || item.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">
//                 Inventory Management
//               </h1>
//               <p className="text-gray-600 mt-2">
//                 Manage inventory items and stock levels
//               </p>
//             </div>
//             <button
//               onClick={() => {
//                 setEditingItem(null);
//                 setShowForm(true);
//               }}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
//             >
//               <Plus className="w-5 h-5" />
//               Add Item
//             </button>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Search Items
//               </label>
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   placeholder="Search by item name or code..."
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Category
//               </label>
//               <select
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="">All Categories</option>
//                 {categories.map((category) => (
//                   <option key={category} value={category}>
//                     {category}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Inventory Table */}
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           <div className="p-6 border-b border-gray-200">
//             <h2 className="text-xl font-semibold text-gray-900">
//               Inventory Items ({filteredItems.length})
//             </h2>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Item
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Category
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Stock
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Location
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Last Updated
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredItems.map((item) => {
//                   const stockStatus = getStockStatus(
//                     item.quantityAvailable,
//                     item.reorderLevel
//                   );
//                   return (
//                     <tr key={item.inventoryItemId} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <Package className="w-8 h-8 text-gray-400 mr-3" />
//                           <div>
//                             <div className="text-sm font-medium text-gray-900">
//                               {item.itemName}
//                             </div>
//                             <div className="text-sm text-gray-500">
//                               {item.itemCode}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {item.category}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">
//                           {item.quantityAvailable} {item.unit}
//                         </div>
//                         <div className={`text-xs ${stockStatus.color}`}>
//                           {stockStatus.status}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {item.location}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span
//                           className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
//                             item.status
//                           )}`}
//                         >
//                           {item.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {new Date(item.lastUpdated).toLocaleDateString()}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => handleEdit(item)}
//                             className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
//                           >
//                             <Edit className="w-4 h-4" />
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => handleDelete(item.inventoryItemId)}
//                             className="text-red-600 hover:text-red-900 flex items-center gap-1"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                             Delete
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Form Modal */}
//       {showForm && (
//         <InventoryForm
//           item={editingItem}
//           categories={categories}
//           onClose={() => {
//             setShowForm(false);
//             setEditingItem(null);
//           }}
//           onSuccess={handleCreateSuccess}
//         />
//       )}
//     </div>
//   );
// };

// export default InventoryManagement;

"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, Package, FileText } from "lucide-react";
import { inventoryService } from "../services/inventoryService";
import InventoryForm from "../components/Inventory/InventoryForm";
import SparePartsRequestForm from "../components/Inventory/SparePartsRequestForm";

const InventoryManagement = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showSparePartsForm, setShowSparePartsForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    "ELECTRICAL",
    "PLUMBING",
    "HVAC",
    "MECHANICAL",
    "SAFETY",
    "CLEANING",
    "TOOLS",
    "OTHER",
  ];

  useEffect(() => {
    fetchInventoryItems();
  }, []);

  const fetchInventoryItems = async () => {
    setLoading(true);
    try {
      const response = await inventoryService.getAllInventoryItems();
      setInventoryItems(response.data);
    } catch (error) {
      console.error("Error fetching inventory items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSuccess = () => {
    setShowForm(false);
    setEditingItem(null);
    fetchInventoryItems();
  };

  const handleSparePartsRequestSuccess = () => {
    setShowSparePartsForm(false);
    // Optionally refresh inventory items to show updated quantities
    fetchInventoryItems();
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (itemId) => {
    if (
      !window.confirm("Are you sure you want to delete this inventory item?")
    ) {
      return;
    }
    try {
      await inventoryService.deleteInventoryItem(itemId);
      fetchInventoryItems();
    } catch (error) {
      console.error("Error deleting inventory item:", error);
      alert("Failed to delete inventory item. Please try again.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800";
      case "INACTIVE":
        return "bg-red-100 text-red-800";
      case "OUT_OF_STOCK":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStockStatus = (quantity, reorderLevel) => {
    if (quantity === 0)
      return { status: "Out of Stock", color: "text-red-600" };
    if (quantity <= reorderLevel)
      return { status: "Low Stock", color: "text-yellow-600" };
    return { status: "In Stock", color: "text-green-600" };
  };

  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch =
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.itemCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Inventory Management
              </h1>
              <p className="text-gray-600 mt-2">
                Manage inventory items and stock levels
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSparePartsForm(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-lg hover:shadow-xl"
              >
                <FileText className="w-5 h-5" />
                Request Spare Parts
              </button>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setShowForm(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5" />
                Add Item
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Items
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by item name or code..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Inventory Items ({filteredItems.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.map((item) => {
                  const stockStatus = getStockStatus(
                    item.quantityAvailable,
                    item.reorderLevel
                  );
                  return (
                    <tr key={item.inventoryItemId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Package className="w-8 h-8 text-gray-400 mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {item.itemName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {item.itemCode}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.quantityAvailable} {item.unit}
                        </div>
                        <div className={`text-xs ${stockStatus.color}`}>
                          {stockStatus.status}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(item.lastUpdated).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item.inventoryItemId)}
                            className="text-red-600 hover:text-red-900 flex items-center gap-1"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Inventory Form Modal */}
      {showForm && (
        <InventoryForm
          item={editingItem}
          categories={categories}
          onClose={() => {
            setShowForm(false);
            setEditingItem(null);
          }}
          onSuccess={handleCreateSuccess}
        />
      )}

      {/* Spare Parts Request Form Modal */}
      {showSparePartsForm && (
        <SparePartsRequestForm
          onClose={() => setShowSparePartsForm(false)}
          onSuccess={handleSparePartsRequestSuccess}
        />
      )}
    </div>
  );
};

export default InventoryManagement;
