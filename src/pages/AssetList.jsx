// // "use client";

// // import { useState, useEffect } from "react";
// // import { Link } from "react-router-dom";
// // import {
// //   Edit,
// //   Trash2,
// //   Eye,
// //   Search,
// //   Filter,
// //   RefreshCw,
// //   ChevronDown,
// //   ChevronLeft,
// //   ChevronRight,
// //   Plus,
// //   Calendar,
// //   MapPin,
// //   Building,
// //   ArrowLeft,
// //   FileDown,
// //   CheckSquare,
// //   Square,
// //   FileSpreadsheet,
// // } from "lucide-react";
// // import { assetService } from "../services/assetService";
// // import { contractService } from "../services/contractService";
// // import { toast } from "react-toastify";
// // import jsPDF from "jspdf";
// // import autoTable from "jspdf-autotable";

// // const AssetList = () => {
// //   const [assets, setAssets] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [contracts, setContracts] = useState([]);
// //   const [selectedContract, setSelectedContract] = useState("");
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [currentPage, setCurrentPage] = useState(0);
// //   const [totalPages, setTotalPages] = useState(0);
// //   const [pageSize, setPageSize] = useState(10);
// //   const [sortBy, setSortBy] = useState("createdAt");
// //   const [sortDirection, setSortDirection] = useState("desc");
// //   const [isRefreshing, setIsRefreshing] = useState(false);
// //   const [exporting, setExporting] = useState(false);
// //   const [showBulkReportModal, setShowBulkReportModal] = useState(false);
// //   const [selectedAssets, setSelectedAssets] = useState([]);
// //   const [selectAll, setSelectAll] = useState(false);
// //   const [paperSize, setPaperSize] = useState("A4");
// //   const [generatingBulkReport, setGeneratingBulkReport] = useState(false);

// //   useEffect(() => {
// //     loadContracts();
// //     loadAssets();
// //   }, [currentPage, pageSize, sortBy, sortDirection, selectedContract]);

// //   const loadContracts = async () => {
// //     try {
// //       const response = await contractService.getAllContracts();
// //       setContracts(response.data || []);
// //     } catch (error) {
// //       console.error("Error loading contracts:", error);
// //       toast.error("Failed to load contracts");
// //     }
// //   };

// //   const loadAssets = async () => {
// //     setLoading(true);
// //     try {
// //       let response;
// //       if (selectedContract) {
// //         response = await assetService.getAssetsByContract(selectedContract);
// //         setAssets(response.data || []);
// //         setTotalPages(Math.ceil((response.data || []).length / pageSize));
// //       } else {
// //         const pageable = {
// //           page: currentPage,
// //           size: pageSize,
// //           sort: `${sortBy},${sortDirection}`,
// //         };
// //         response = await assetService.getAllAssets(pageable);
// //         setAssets(response.data.content || []);
// //         setTotalPages(response.data.totalPages || 0);
// //       }
// //     } catch (error) {
// //       console.error("Error loading assets:", error);
// //       toast.error("Failed to load assets");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleRefresh = async () => {
// //     setIsRefreshing(true);
// //     try {
// //       await loadAssets();
// //       toast.success("Assets refreshed successfully");
// //     } finally {
// //       setTimeout(() => setIsRefreshing(false), 500);
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     if (window.confirm("Are you sure you want to delete this asset?")) {
// //       try {
// //         await assetService.deleteAsset(id);
// //         toast.success("Asset deleted successfully");
// //         loadAssets();
// //       } catch (error) {
// //         console.error("Error deleting asset:", error);
// //         toast.error("Failed to delete asset");
// //       }
// //     }
// //   };

// //   const handleSort = (field) => {
// //     if (sortBy === field) {
// //       setSortDirection(sortDirection === "asc" ? "desc" : "asc");
// //     } else {
// //       setSortBy(field);
// //       setSortDirection("asc");
// //     }
// //   };

// //   const handlePageChange = (newPage) => {
// //     if (newPage >= 0 && newPage < totalPages) {
// //       setCurrentPage(newPage);
// //     }
// //   };

// //   const handleExport = async () => {
// //     if (!selectedContract) {
// //       toast.error("Please select a contract to export assets");
// //       return;
// //     }
// //     setExporting(true);
// //     try {
// //       const response = await assetService.exportAssetsExcel(selectedContract);
// //       const blob = new Blob([response.data], {
// //         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// //       });
// //       const url = window.URL.createObjectURL(blob);
// //       const link = document.createElement("a");
// //       link.href = url;
// //       link.download = `assets-contract-${selectedContract}-${
// //         new Date().toISOString().split("T")[0]
// //       }.xlsx`;
// //       document.body.appendChild(link);
// //       link.click();
// //       document.body.removeChild(link);
// //       window.URL.revokeObjectURL(url);
// //       toast.success("Assets exported to Excel successfully");
// //     } catch (error) {
// //       console.error("Error exporting assets to Excel:", error);
// //       toast.error("Failed to export assets to Excel. Please try again.");
// //     } finally {
// //       setExporting(false);
// //     }
// //   };

// //   const handleAssetSelection = (assetId) => {
// //     setSelectedAssets((prev) => {
// //       if (prev.includes(assetId)) {
// //         return prev.filter((id) => id !== assetId);
// //       } else {
// //         return [...prev, assetId];
// //       }
// //     });
// //   };

// //   const handleSelectAll = () => {
// //     if (selectAll) {
// //       setSelectedAssets([]);
// //       setSelectAll(false);
// //     } else {
// //       setSelectedAssets(filteredAssets.map((asset) => asset.assetId));
// //       setSelectAll(true);
// //     }
// //   };

// //   // Helper function to convert image URL to base64
// //   const getImageAsBase64 = async (imageUrl) => {
// //     try {
// //       const response = await fetch(imageUrl, { mode: "cors" });
// //       const blob = await response.blob();
// //       return new Promise((resolve, reject) => {
// //         const reader = new FileReader();
// //         reader.onloadend = () => resolve(reader.result);
// //         reader.onerror = reject;
// //         reader.readAsDataURL(blob);
// //       });
// //     } catch (error) {
// //       console.error("Error converting image to base64:", error);
// //       return null;
// //     }
// //   };

// //   const generateBulkAssetReport = async () => {
// //     if (!selectedContract) {
// //       toast.error("Please select a contract first");
// //       return;
// //     }
// //     if (selectedAssets.length === 0) {
// //       toast.error("Please select at least one asset");
// //       return;
// //     }

// //     setGeneratingBulkReport(true);
// //     try {
// //       const assetPromises = selectedAssets.map((assetId) =>
// //         assetService.getAssetById(assetId)
// //       );
// //       const assetResponses = await Promise.all(assetPromises);
// //       const detailedAssets = assetResponses.map((response) => response.data);

// //       const doc = new jsPDF({
// //         orientation: "portrait",
// //         unit: "mm",
// //         format: paperSize.toLowerCase(),
// //         compress: true,
// //       });

// //       doc.setProperties({
// //         title: `Asset Report - Contract ${selectedContract}`,
// //         subject: "Asset Management Report",
// //         author: "CAFM UAE System",
// //         creator: "CAFM UAE System",
// //       });

// //       doc.setFontSize(24);
// //       doc.setTextColor(40, 116, 240);
// //       doc.text("Bulk Asset Report", 20, 25);

// //       doc.setFontSize(12);
// //       doc.setTextColor(100, 100, 100);
// //       doc.text(
// //         `Contract: ${
// //           contracts.find((c) => c.contractId.toString() === selectedContract)
// //             ?.contractName || "Unknown"
// //         }`,
// //         20,
// //         35
// //       );
// //       doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 42);
// //       doc.text(`Total Assets: ${selectedAssets.length}`, 20, 49);
// //       doc.text(`Paper Size: ${paperSize}`, 20, 56);

// //       doc.setDrawColor(200, 200, 200);
// //       doc.line(20, 62, paperSize === "A3" ? 277 : 190, 62);

// //       let yPosition = 75;
// //       const pageHeight = paperSize === "A3" ? 420 : 297;
// //       const pageWidth = paperSize === "A3" ? 297 : 210;

// //       for (let i = 0; i < detailedAssets.length; i++) {
// //         const asset = detailedAssets[i];

// //         if (yPosition > pageHeight - 150) {
// //           doc.addPage();
// //           yPosition = 20;
// //         }

// //         doc.setFontSize(16);
// //         doc.setTextColor(40, 116, 240);
// //         doc.text(`Asset ${i + 1}: ${asset.assetTag}`, 20, yPosition);
// //         yPosition += 10;

// //         // Add asset images if available
// //         if (asset.imageUrls && asset.imageUrls.length > 0) {
// //           const imageWidth = 40;
// //           const imageHeight = 30;
// //           let imageX = 20;
// //           let imagesAdded = 0;
// //           const maxImagesPerRow = Math.floor(
// //             (pageWidth - 40) / (imageWidth + 5)
// //           );

// //           for (const imageUrl of asset.imageUrls.slice(0, 3)) {
// //             // Limit to 3 images
// //             try {
// //               const base64Image = await getImageAsBase64(imageUrl);
// //               if (base64Image) {
// //                 // Check if we need a new row
// //                 if (imagesAdded > 0 && imagesAdded % maxImagesPerRow === 0) {
// //                   yPosition += imageHeight + 5;
// //                   imageX = 20;

// //                   // Check if we need a new page
// //                   if (yPosition + imageHeight > pageHeight - 50) {
// //                     doc.addPage();
// //                     yPosition = 20;
// //                   }
// //                 }

// //                 doc.addImage(
// //                   base64Image,
// //                   "JPEG",
// //                   imageX,
// //                   yPosition,
// //                   imageWidth,
// //                   imageHeight
// //                 );
// //                 imageX += imageWidth + 5;
// //                 imagesAdded++;
// //               }
// //             } catch (error) {
// //               console.error("Error adding image to PDF:", error);
// //             }
// //           }

// //           if (imagesAdded > 0) {
// //             yPosition += imageHeight + 15;
// //           }
// //         }

// //         // Check if we need a new page before adding tables
// //         if (yPosition > pageHeight - 100) {
// //           doc.addPage();
// //           yPosition = 20;
// //         }

// //         const basicInfo = [
// //           ["Asset Name", asset.assetName || "-"],
// //           ["Serial Number", asset.serialNumber || "-"],
// //           ["Brand", asset.brandName || "-"],
// //           ["Model", asset.modelNumber || "-"],
// //           ["Status", asset.assetStatus || "-"],
// //           ["Condition", asset.assetCondition || "-"],
// //           ["Owner Type", asset.ownerType || "-"],
// //         ];

// //         autoTable(doc, {
// //           startY: yPosition,
// //           head: [["Property", "Value"]],
// //           body: basicInfo,
// //           theme: "grid",
// //           headStyles: {
// //             fillColor: [40, 116, 240],
// //             textColor: 255,
// //             fontSize: 9,
// //             fontStyle: "bold",
// //           },
// //           bodyStyles: {
// //             fontSize: 8,
// //             textColor: 50,
// //           },
// //           columnStyles: {
// //             0: { cellWidth: 40, fontStyle: "bold" },
// //             1: { cellWidth: paperSize === "A3" ? 120 : 80 },
// //           },
// //           margin: { left: 20, right: 20 },
// //         });

// //         yPosition = doc.lastAutoTable.finalY + 10;

// //         if (yPosition > pageHeight - 60) {
// //           doc.addPage();
// //           yPosition = 20;
// //         }

// //         const locationInfo = [
// //           ["Zone", asset.zoneName || "-"],
// //           ["Sub Zone", asset.subZoneName || "-"],
// //           ["Building", asset.buildingName || "-"],
// //           ["Villa/Apartment", asset.villaApartmentName || "-"],
// //           ["Floor", asset.floorName || "-"],
// //           ["Room", asset.roomName || "-"],
// //         ];

// //         autoTable(doc, {
// //           startY: yPosition,
// //           head: [["Location", "Value"]],
// //           body: locationInfo,
// //           theme: "grid",
// //           headStyles: {
// //             fillColor: [34, 197, 94],
// //             textColor: 255,
// //             fontSize: 9,
// //             fontStyle: "bold",
// //           },
// //           bodyStyles: {
// //             fontSize: 8,
// //             textColor: 50,
// //           },
// //           columnStyles: {
// //             0: { cellWidth: 40, fontStyle: "bold" },
// //             1: { cellWidth: paperSize === "A3" ? 120 : 80 },
// //           },
// //           margin: { left: 20, right: 20 },
// //         });

// //         yPosition = doc.lastAutoTable.finalY + 10;

// //         if (yPosition > pageHeight - 60) {
// //           doc.addPage();
// //           yPosition = 20;
// //         }

// //         const serviceInfo = [];
// //         if (asset.subServices && asset.subServices.length > 0) {
// //           asset.subServices.forEach((subService, index) => {
// //             serviceInfo.push([
// //               `Sub-Service ${index + 1}`,
// //               subService.subServiceName || "-",
// //             ]);
// //             if (
// //               subService.serviceScopeNames &&
// //               subService.serviceScopeNames.length > 0
// //             ) {
// //               serviceInfo.push([
// //                 `Service Scopes ${index + 1}`,
// //                 subService.serviceScopeNames.join(", "),
// //               ]);
// //             }
// //           });
// //         } else {
// //           serviceInfo.push(["Sub-Services", "No sub-services assigned"]);
// //         }

// //         autoTable(doc, {
// //           startY: yPosition,
// //           head: [["Service Information", "Value"]],
// //           body: serviceInfo,
// //           theme: "grid",
// //           headStyles: {
// //             fillColor: [147, 51, 234],
// //             textColor: 255,
// //             fontSize: 9,
// //             fontStyle: "bold",
// //           },
// //           bodyStyles: {
// //             fontSize: 8,
// //             textColor: 50,
// //           },
// //           columnStyles: {
// //             0: { cellWidth: 40, fontStyle: "bold" },
// //             1: { cellWidth: paperSize === "A3" ? 120 : 80 },
// //           },
// //           margin: { left: 20, right: 20 },
// //         });

// //         yPosition = doc.lastAutoTable.finalY + 15;

// //         if (i < detailedAssets.length - 1) {
// //           doc.setDrawColor(200, 200, 200);
// //           doc.line(20, yPosition, pageWidth - 20, yPosition);
// //           yPosition += 10;
// //         }
// //       }

// //       const pageCount = doc.internal.getNumberOfPages();
// //       for (let i = 1; i <= pageCount; i++) {
// //         doc.setPage(i);
// //         doc.setFontSize(8);
// //         doc.setTextColor(150, 150, 150);
// //         doc.text(`Page ${i} of ${pageCount}`, 20, pageHeight - 10);
// //         doc.text(
// //           "Generated by CAFM UAE System",
// //           pageWidth - 80,
// //           pageHeight - 10
// //         );
// //       }

// //       const fileName = `bulk-asset-report-${selectedContract}-${paperSize}-${
// //         new Date().toISOString().split("T")[0]
// //       }.pdf`;
// //       doc.save(fileName);

// //       toast.success(
// //         `Bulk asset report with images generated successfully (${paperSize} format)`
// //       );
// //       setShowBulkReportModal(false);
// //       setSelectedAssets([]);
// //       setSelectAll(false);
// //     } catch (error) {
// //       console.error("Error generating bulk report:", error);
// //       toast.error("Failed to generate bulk asset report");
// //     } finally {
// //       setGeneratingBulkReport(false);
// //     }
// //   };

// //   const filteredAssets = assets.filter((asset) => {
// //     if (!searchTerm) return true;
// //     const searchLower = searchTerm.toLowerCase();
// //     return (
// //       asset.assetName?.toLowerCase().includes(searchLower) ||
// //       asset.assetTag?.toLowerCase().includes(searchLower) ||
// //       asset.roomName?.toLowerCase().includes(searchLower)
// //     );
// //   });

// //   const paginatedAssets = selectedContract
// //     ? filteredAssets.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
// //     : filteredAssets;

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
// //           <div className="flex justify-between items-center">
// //             <div className="flex items-center space-x-4">
// //               <Link
// //                 to="/assets"
// //                 className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
// //               >
// //                 <ArrowLeft className="w-5 h-5 text-gray-600" />
// //               </Link>
// //               <div>
// //                 <h1 className="text-3xl font-bold text-gray-900">Asset List</h1>
// //                 <p className="text-gray-600 mt-1">
// //                   View and manage all assets in your inventory
// //                 </p>
// //               </div>
// //             </div>
// //             <div className="flex gap-3">
// //               <Link
// //                 to="/assets/create"
// //                 className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
// //               >
// //                 <Plus className="w-5 h-5 mr-2" /> Add New Asset
// //               </Link>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
// //           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
// //             <div className="flex flex-col sm:flex-row gap-4 flex-1">
// //               <div className="relative flex-1">
// //                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// //                 <input
// //                   type="text"
// //                   placeholder="Search by asset tag, asset name, or room name..."
// //                   value={searchTerm}
// //                   onChange={(e) => setSearchTerm(e.target.value)}
// //                   className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
// //                 />
// //               </div>
// //               <div className="relative">
// //                 <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// //                 <select
// //                   value={selectedContract}
// //                   onChange={(e) => setSelectedContract(e.target.value)}
// //                   className="w-full sm:w-56 pl-10 pr-8 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition-all"
// //                 >
// //                   <option value="">All Contracts</option>
// //                   {contracts.map((contract) => (
// //                     <option
// //                       key={contract.contractId}
// //                       value={contract.contractId}
// //                     >
// //                       {contract.contractName}
// //                     </option>
// //                   ))}
// //                 </select>
// //                 <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
// //               </div>
// //             </div>
// //             <div className="flex gap-3">
// //               <button
// //                 onClick={handleRefresh}
// //                 disabled={isRefreshing}
// //                 className="p-3 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
// //                 title="Refresh"
// //               >
// //                 <RefreshCw
// //                   className={`w-5 h-5 text-gray-600 ${
// //                     isRefreshing ? "animate-spin" : ""
// //                   }`}
// //                 />
// //               </button>
// //               <button
// //                 onClick={handleExport}
// //                 disabled={exporting || !selectedContract}
// //                 className="inline-flex items-center px-4 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl hover:from-teal-700 hover:to-teal-800 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
// //                 title="Export Excel"
// //               >
// //                 {exporting ? (
// //                   <>
// //                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
// //                     Exporting...
// //                   </>
// //                 ) : (
// //                   <>
// //                     <FileSpreadsheet className="w-5 h-5 mr-2" />
// //                     Export Excel
// //                   </>
// //                 )}
// //               </button>
// //               <button
// //                 onClick={() => setShowBulkReportModal(true)}
// //                 disabled={!selectedContract}
// //                 className="inline-flex items-center px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
// //                 title="Generate Asset Report"
// //               >
// //                 <FileDown className="w-5 h-5 mr-2" />
// //                 Generate Asset Report
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
// //           <div className="overflow-x-auto">
// //             <table className="min-w-full divide-y divide-gray-200">
// //               <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
// //                 <tr>
// //                   <th scope="col" className="px-6 py-4 text-left">
// //                     <button
// //                       onClick={handleSelectAll}
// //                       className="flex items-center text-xs font-bold text-gray-700 uppercase tracking-wider hover:text-blue-600 transition-colors"
// //                     >
// //                       {selectAll ? (
// //                         <CheckSquare className="w-5 h-5 text-blue-600" />
// //                       ) : (
// //                         <Square className="w-5 h-5" />
// //                       )}
// //                       <span className="ml-2">Select</span>
// //                     </button>
// //                   </th>
// //                   <th
// //                     scope="col"
// //                     className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
// //                     onClick={() => handleSort("assetTag")}
// //                   >
// //                     <div className="flex items-center">
// //                       Asset Tag
// //                       {sortBy === "assetTag" && (
// //                         <span className="ml-2 text-blue-600">
// //                           {sortDirection === "asc" ? "↑" : "↓"}
// //                         </span>
// //                       )}
// //                     </div>
// //                   </th>
// //                   <th
// //                     scope="col"
// //                     className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
// //                     onClick={() => handleSort("assetName")}
// //                   >
// //                     <div className="flex items-center">
// //                       Name
// //                       {sortBy === "assetName" && (
// //                         <span className="ml-2 text-blue-600">
// //                           {sortDirection === "asc" ? "↑" : "↓"}
// //                         </span>
// //                       )}
// //                     </div>
// //                   </th>
// //                   <th
// //                     scope="col"
// //                     className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
// //                   >
// //                     Location
// //                   </th>
// //                   <th
// //                     scope="col"
// //                     className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
// //                   >
// //                     Serial Number
// //                   </th>
// //                   <th
// //                     scope="col"
// //                     className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
// //                     onClick={() => handleSort("assetStatus")}
// //                   >
// //                     <div className="flex items-center">
// //                       Status
// //                       {sortBy === "assetStatus" && (
// //                         <span className="ml-2 text-blue-600">
// //                           {sortDirection === "asc" ? "↑" : "↓"}
// //                         </span>
// //                       )}
// //                     </div>
// //                   </th>
// //                   <th
// //                     scope="col"
// //                     className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
// //                     onClick={() => handleSort("createdAt")}
// //                   >
// //                     <div className="flex items-center">
// //                       <Calendar className="w-4 h-4 mr-1" />
// //                       Created Date
// //                       {sortBy === "createdAt" && (
// //                         <span className="ml-2 text-blue-600">
// //                           {sortDirection === "asc" ? "↑" : "↓"}
// //                         </span>
// //                       )}
// //                     </div>
// //                   </th>
// //                   <th
// //                     scope="col"
// //                     className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
// //                   >
// //                     Actions
// //                   </th>
// //                 </tr>
// //               </thead>
// //               <tbody className="bg-white divide-y divide-gray-200">
// //                 {loading ? (
// //                   <tr>
// //                     <td colSpan="8" className="px-6 py-12 text-center">
// //                       <div className="flex justify-center items-center">
// //                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// //                         <span className="ml-3 text-lg font-medium text-gray-700">
// //                           Loading assets...
// //                         </span>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ) : paginatedAssets.length === 0 ? (
// //                   <tr>
// //                     <td colSpan="8" className="px-6 py-12 text-center">
// //                       <div className="text-gray-500">
// //                         <Building className="w-12 h-12 mx-auto mb-4 text-gray-300" />
// //                         <p className="text-lg font-medium">No assets found</p>
// //                         <p className="text-sm">
// //                           Try adjusting your search or filter criteria
// //                         </p>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ) : (
// //                   paginatedAssets.map((asset, index) => (
// //                     <tr
// //                       key={asset.assetId}
// //                       className={`hover:bg-blue-50 transition-colors ${
// //                         index % 2 === 0 ? "bg-white" : "bg-gray-50"
// //                       }`}
// //                     >
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <button
// //                           onClick={() => handleAssetSelection(asset.assetId)}
// //                           className="text-blue-600 hover:text-blue-800 transition-colors"
// //                         >
// //                           {selectedAssets.includes(asset.assetId) ? (
// //                             <CheckSquare className="w-5 h-5" />
// //                           ) : (
// //                             <Square className="w-5 h-5" />
// //                           )}
// //                         </button>
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <div className="text-sm font-bold text-gray-900">
// //                           {asset.assetTag}
// //                         </div>
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <div className="text-sm font-medium text-gray-900">
// //                           {asset.assetName}
// //                         </div>
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <div className="text-sm text-gray-600">
// //                           <div className="flex items-center">
// //                             <MapPin className="w-4 h-4 mr-1 text-gray-400" />
// //                             {asset.buildingName}, {asset.floorName},{" "}
// //                             {asset.roomName}
// //                           </div>
// //                         </div>
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <div className="text-sm text-gray-600">
// //                           {asset.serialNumber || "-"}
// //                         </div>
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <span
// //                           className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
// //                             asset.assetStatus === "ACTIVE"
// //                               ? "bg-green-100 text-green-800"
// //                               : asset.assetStatus === "UNDER_MAINTENANCE"
// //                               ? "bg-yellow-100 text-yellow-800"
// //                               : asset.assetStatus === "DECOMMISSIONED"
// //                               ? "bg-red-100 text-red-800"
// //                               : "bg-gray-100 text-gray-800"
// //                           }`}
// //                         >
// //                           {asset.assetStatus.replace("_", " ")}
// //                         </span>
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <div className="text-sm text-gray-600">
// //                           {asset.createdAt
// //                             ? new Date(asset.createdAt).toLocaleDateString()
// //                             : "-"}
// //                         </div>
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <div className="flex space-x-3">
// //                           <Link
// //                             to={`/assets/detail/${asset.assetId}`}
// //                             className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded-lg transition-all"
// //                             title="View Details"
// //                           >
// //                             <Eye className="w-5 h-5" />
// //                           </Link>
// //                           <Link
// //                             to={`/assets/edit/${asset.assetId}`}
// //                             className="p-2 text-green-600 hover:text-green-900 hover:bg-green-100 rounded-lg transition-all"
// //                             title="Edit Asset"
// //                           >
// //                             <Edit className="w-5 h-5" />
// //                           </Link>
// //                           <button
// //                             onClick={() => handleDelete(asset.assetId)}
// //                             className="p-2 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-lg transition-all"
// //                             title="Delete Asset"
// //                           >
// //                             <Trash2 className="w-5 h-5" />
// //                           </button>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   ))
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>

// //           <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
// //             <div className="text-sm text-gray-700">
// //               Showing{" "}
// //               <span className="font-medium">{paginatedAssets.length}</span> of{" "}
// //               <span className="font-medium">{filteredAssets.length}</span>{" "}
// //               assets
// //               {selectedAssets.length > 0 && (
// //                 <span className="ml-4 text-blue-600 font-medium">
// //                   {selectedAssets.length} selected
// //                 </span>
// //               )}
// //             </div>
// //             <div className="flex items-center space-x-3">
// //               <button
// //                 onClick={() => handlePageChange(currentPage - 1)}
// //                 disabled={currentPage === 0}
// //                 className="p-2 border-2 border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-all"
// //               >
// //                 <ChevronLeft className="w-5 h-5" />
// //               </button>
// //               <span className="px-4 py-2 text-sm font-medium">
// //                 Page {currentPage + 1} of {Math.max(1, totalPages)}
// //               </span>
// //               <button
// //                 onClick={() => handlePageChange(currentPage + 1)}
// //                 disabled={currentPage >= totalPages - 1}
// //                 className="p-2 border-2 border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-all"
// //               >
// //                 <ChevronRight className="w-5 h-5" />
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {showBulkReportModal && (
// //           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //             <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4">
// //               <div className="flex justify-between items-center mb-6">
// //                 <h3 className="text-2xl font-bold text-gray-900">
// //                   Generate Asset Report
// //                 </h3>
// //                 <button
// //                   onClick={() => setShowBulkReportModal(false)}
// //                   className="text-gray-500 hover:text-gray-700 text-2xl"
// //                 >
// //                   ×
// //                 </button>
// //               </div>
// //               <div className="space-y-6">
// //                 <div>
// //                   <p className="text-gray-600 mb-4">
// //                     Generate a comprehensive PDF report for selected assets with
// //                     images.
// //                   </p>
// //                   <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
// //                     <div className="flex">
// //                       <FileDown className="h-5 w-5 text-blue-400" />
// //                       <div className="ml-3">
// //                         <p className="text-sm text-blue-700 font-medium">
// //                           Report Features:
// //                         </p>
// //                         <ul className="list-disc pl-5 mt-1 text-sm text-blue-700">
// //                           <li>Compressed PDF for smaller file size</li>
// //                           <li>Detailed asset information</li>
// //                           <li>Asset images included (up to 3 per asset)</li>
// //                           <li>Multiple sub-services support</li>
// //                           <li>Professional formatting</li>
// //                         </ul>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Paper Size
// //                   </label>
// //                   <select
// //                     value={paperSize}
// //                     onChange={(e) => setPaperSize(e.target.value)}
// //                     className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
// //                   >
// //                     <option value="A4">A4 (210 × 297 mm)</option>
// //                     <option value="A3">A3 (297 × 420 mm)</option>
// //                   </select>
// //                 </div>
// //                 <div className="bg-gray-50 p-4 rounded-xl">
// //                   <p className="text-sm text-gray-700">
// //                     <strong>Selected Assets:</strong> {selectedAssets.length}
// //                   </p>
// //                   <p className="text-sm text-gray-700">
// //                     <strong>Contract:</strong>{" "}
// //                     {contracts.find(
// //                       (c) => c.contractId.toString() === selectedContract
// //                     )?.contractName || "None selected"}
// //                   </p>
// //                   <p className="text-sm text-gray-700">
// //                     <strong>Paper Size:</strong> {paperSize}
// //                   </p>
// //                   <p className="text-sm text-gray-700">
// //                     <strong>Images:</strong> Included (up to 3 per asset)
// //                   </p>
// //                 </div>
// //               </div>
// //               <div className="flex gap-3 mt-8">
// //                 <button
// //                   onClick={() => setShowBulkReportModal(false)}
// //                   className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   onClick={generateBulkAssetReport}
// //                   disabled={
// //                     generatingBulkReport ||
// //                     selectedAssets.length === 0 ||
// //                     !selectedContract
// //                   }
// //                   className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
// //                 >
// //                   {generatingBulkReport ? (
// //                     <>
// //                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
// //                       Generating...
// //                     </>
// //                   ) : (
// //                     <>
// //                       <FileDown className="w-5 h-5 mr-2" />
// //                       Generate Report
// //                     </>
// //                   )}
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default AssetList;

// "use client";
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   Edit,
//   Trash2,
//   Eye,
//   Search,
//   Filter,
//   RefreshCw,
//   ChevronDown,
//   ChevronLeft,
//   ChevronRight,
//   Plus,
//   Calendar,
//   MapPin,
//   Building,
//   ArrowLeft,
//   FileDown,
//   CheckSquare,
//   Square,
//   FileSpreadsheet,
//   Tag,
// } from "lucide-react";
// import { assetService } from "../services/assetService";
// import { contractService } from "../services/contractService";
// import { toast } from "react-toastify";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// const AssetList = () => {
//   const [assets, setAssets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [contracts, setContracts] = useState([]);
//   const [selectedContract, setSelectedContract] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   const [sortBy, setSortBy] = useState("createdAt");
//   const [sortDirection, setSortDirection] = useState("desc");
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [exporting, setExporting] = useState(false);
//   const [showBulkReportModal, setShowBulkReportModal] = useState(false);
//   const [selectedAssets, setSelectedAssets] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const [paperSize, setPaperSize] = useState("A4");
//   const [generatingBulkReport, setGeneratingBulkReport] = useState(false);

//   useEffect(() => {
//     loadContracts();
//     loadAssets();
//   }, [currentPage, pageSize, sortBy, sortDirection, selectedContract]);

//   const loadContracts = async () => {
//     try {
//       const response = await contractService.getAllContracts();
//       setContracts(response.data || []);
//     } catch (error) {
//       console.error("Error loading contracts:", error);
//       toast.error("Failed to load contracts");
//     }
//   };

//   const loadAssets = async () => {
//     setLoading(true);
//     try {
//       let response;
//       if (selectedContract) {
//         response = await assetService.getAssetsByContract(selectedContract);
//         setAssets(response.data || []);
//         setTotalPages(Math.ceil((response.data || []).length / pageSize));
//       } else {
//         const pageable = {
//           page: currentPage,
//           size: pageSize,
//           sort: `${sortBy},${sortDirection}`,
//         };
//         response = await assetService.getAllAssets(pageable);
//         setAssets(response.data.content || []);
//         setTotalPages(response.data.totalPages || 0);
//       }
//     } catch (error) {
//       console.error("Error loading assets:", error);
//       toast.error("Failed to load assets");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     try {
//       await loadAssets();
//       toast.success("Assets refreshed successfully");
//     } finally {
//       setTimeout(() => setIsRefreshing(false), 500);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this asset?")) {
//       try {
//         await assetService.deleteAsset(id);
//         toast.success("Asset deleted successfully");
//         loadAssets();
//       } catch (error) {
//         console.error("Error deleting asset:", error);
//         toast.error("Failed to delete asset");
//       }
//     }
//   };

//   const handleSort = (field) => {
//     if (sortBy === field) {
//       setSortDirection(sortDirection === "asc" ? "desc" : "asc");
//     } else {
//       setSortBy(field);
//       setSortDirection("asc");
//     }
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage >= 0 && newPage < totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   const handleExport = async () => {
//     if (!selectedContract) {
//       toast.error("Please select a contract to export assets");
//       return;
//     }

//     setExporting(true);
//     try {
//       const response = await assetService.exportAssetsExcel(selectedContract);
//       const blob = new Blob([response.data], {
//         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       });
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = `assets-contract-${selectedContract}-${
//         new Date().toISOString().split("T")[0]
//       }.xlsx`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//       toast.success("Assets exported to Excel successfully");
//     } catch (error) {
//       console.error("Error exporting assets to Excel:", error);
//       toast.error("Failed to export assets to Excel. Please try again.");
//     } finally {
//       setExporting(false);
//     }
//   };

//   const handleAssetSelection = (assetId) => {
//     setSelectedAssets((prev) => {
//       if (prev.includes(assetId)) {
//         return prev.filter((id) => id !== assetId);
//       } else {
//         return [...prev, assetId];
//       }
//     });
//   };

//   const handleSelectAll = () => {
//     if (selectAll) {
//       setSelectedAssets([]);
//       setSelectAll(false);
//     } else {
//       setSelectedAssets(filteredAssets.map((asset) => asset.assetId));
//       setSelectAll(true);
//     }
//   };

//   // Helper function to convert image URL to base64
//   const getImageAsBase64 = async (imageUrl) => {
//     try {
//       const response = await fetch(imageUrl, { mode: "cors" });
//       const blob = await response.blob();
//       return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onloadend = () => resolve(reader.result);
//         reader.onerror = reject;
//         reader.readAsDataURL(blob);
//       });
//     } catch (error) {
//       console.error("Error converting image to base64:", error);
//       return null;
//     }
//   };

//   const generateBulkAssetReport = async () => {
//     if (!selectedContract) {
//       toast.error("Please select a contract first");
//       return;
//     }
//     if (selectedAssets.length === 0) {
//       toast.error("Please select at least one asset");
//       return;
//     }

//     setGeneratingBulkReport(true);
//     try {
//       const assetPromises = selectedAssets.map((assetId) =>
//         assetService.getAssetById(assetId)
//       );
//       const assetResponses = await Promise.all(assetPromises);
//       const detailedAssets = assetResponses.map((response) => response.data);

//       const doc = new jsPDF({
//         orientation: "portrait",
//         unit: "mm",
//         format: paperSize.toLowerCase(),
//         compress: true,
//       });

//       doc.setProperties({
//         title: `Asset Report - Contract ${selectedContract}`,
//         subject: "Asset Management Report",
//         author: "CAFM UAE System",
//         creator: "CAFM UAE System",
//       });

//       doc.setFontSize(24);
//       doc.setTextColor(40, 116, 240);
//       doc.text("Bulk Asset Report", 20, 25);

//       doc.setFontSize(12);
//       doc.setTextColor(100, 100, 100);
//       doc.text(
//         `Contract: ${
//           contracts.find((c) => c.contractId.toString() === selectedContract)
//             ?.contractName || "Unknown"
//         }`,
//         20,
//         35
//       );
//       doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 42);
//       doc.text(`Total Assets: ${selectedAssets.length}`, 20, 49);
//       doc.text(`Paper Size: ${paperSize}`, 20, 56);

//       doc.setDrawColor(200, 200, 200);
//       doc.line(20, 62, paperSize === "A3" ? 277 : 190, 62);

//       let yPosition = 75;
//       const pageHeight = paperSize === "A3" ? 420 : 297;
//       const pageWidth = paperSize === "A3" ? 297 : 210;

//       for (let i = 0; i < detailedAssets.length; i++) {
//         const asset = detailedAssets[i];

//         if (yPosition > pageHeight - 150) {
//           doc.addPage();
//           yPosition = 20;
//         }

//         doc.setFontSize(16);
//         doc.setTextColor(40, 116, 240);
//         doc.text(`Asset ${i + 1}: ${asset.assetTag}`, 20, yPosition);
//         yPosition += 10;

//         // Add asset images if available
//         if (asset.imageUrls && asset.imageUrls.length > 0) {
//           const imageWidth = 40;
//           const imageHeight = 30;
//           let imageX = 20;
//           let imagesAdded = 0;
//           const maxImagesPerRow = Math.floor(
//             (pageWidth - 40) / (imageWidth + 5)
//           );

//           for (const imageUrl of asset.imageUrls.slice(0, 3)) {
//             // Limit to 3 images
//             try {
//               const base64Image = await getImageAsBase64(imageUrl);
//               if (base64Image) {
//                 // Check if we need a new row
//                 if (imagesAdded > 0 && imagesAdded % maxImagesPerRow === 0) {
//                   yPosition += imageHeight + 5;
//                   imageX = 20;
//                   // Check if we need a new page
//                   if (yPosition + imageHeight > pageHeight - 50) {
//                     doc.addPage();
//                     yPosition = 20;
//                   }
//                 }

//                 doc.addImage(
//                   base64Image,
//                   "JPEG",
//                   imageX,
//                   yPosition,
//                   imageWidth,
//                   imageHeight
//                 );
//                 imageX += imageWidth + 5;
//                 imagesAdded++;
//               }
//             } catch (error) {
//               console.error("Error adding image to PDF:", error);
//             }
//           }

//           if (imagesAdded > 0) {
//             yPosition += imageHeight + 15;
//           }
//         }

//         // Check if we need a new page before adding tables
//         if (yPosition > pageHeight - 100) {
//           doc.addPage();
//           yPosition = 20;
//         }

//         const basicInfo = [
//           ["Asset Name", asset.assetName || "-"],
//           ["Serial Number", asset.serialNumber || "-"],
//           ["Brand", asset.brandName || "-"],
//           ["Model", asset.modelNumber || "-"],
//           ["Category", asset.categoryName || "-"],
//           ["Status", asset.assetStatus || "-"],
//           ["Condition", asset.assetCondition || "-"],
//           ["Owner Type", asset.ownerType || "-"],
//         ];

//         autoTable(doc, {
//           startY: yPosition,
//           head: [["Property", "Value"]],
//           body: basicInfo,
//           theme: "grid",
//           headStyles: {
//             fillColor: [40, 116, 240],
//             textColor: 255,
//             fontSize: 9,
//             fontStyle: "bold",
//           },
//           bodyStyles: {
//             fontSize: 8,
//             textColor: 50,
//           },
//           columnStyles: {
//             0: { cellWidth: 40, fontStyle: "bold" },
//             1: { cellWidth: paperSize === "A3" ? 120 : 80 },
//           },
//           margin: { left: 20, right: 20 },
//         });

//         yPosition = doc.lastAutoTable.finalY + 10;

//         if (yPosition > pageHeight - 60) {
//           doc.addPage();
//           yPosition = 20;
//         }

//         const locationInfo = [
//           ["Zone", asset.zoneName || "-"],
//           ["Sub Zone", asset.subZoneName || "-"],
//           ["Building", asset.buildingName || "-"],
//           ["Villa/Apartment", asset.villaApartmentName || "-"],
//           ["Floor", asset.floorName || "-"],
//           ["Room", asset.roomName || "-"],
//         ];

//         autoTable(doc, {
//           startY: yPosition,
//           head: [["Location", "Value"]],
//           body: locationInfo,
//           theme: "grid",
//           headStyles: {
//             fillColor: [34, 197, 94],
//             textColor: 255,
//             fontSize: 9,
//             fontStyle: "bold",
//           },
//           bodyStyles: {
//             fontSize: 8,
//             textColor: 50,
//           },
//           columnStyles: {
//             0: { cellWidth: 40, fontStyle: "bold" },
//             1: { cellWidth: paperSize === "A3" ? 120 : 80 },
//           },
//           margin: { left: 20, right: 20 },
//         });

//         yPosition = doc.lastAutoTable.finalY + 10;

//         if (yPosition > pageHeight - 60) {
//           doc.addPage();
//           yPosition = 20;
//         }

//         const serviceInfo = [];
//         if (asset.subServices && asset.subServices.length > 0) {
//           asset.subServices.forEach((subService, index) => {
//             serviceInfo.push([
//               `Sub-Service ${index + 1}`,
//               subService.subServiceName || "-",
//             ]);
//             if (
//               subService.serviceScopeNames &&
//               subService.serviceScopeNames.length > 0
//             ) {
//               serviceInfo.push([
//                 `Service Scopes ${index + 1}`,
//                 subService.serviceScopeNames.join(", "),
//               ]);
//             }
//           });
//         } else {
//           serviceInfo.push(["Sub-Services", "No sub-services assigned"]);
//         }

//         autoTable(doc, {
//           startY: yPosition,
//           head: [["Service Information", "Value"]],
//           body: serviceInfo,
//           theme: "grid",
//           headStyles: {
//             fillColor: [147, 51, 234],
//             textColor: 255,
//             fontSize: 9,
//             fontStyle: "bold",
//           },
//           bodyStyles: {
//             fontSize: 8,
//             textColor: 50,
//           },
//           columnStyles: {
//             0: { cellWidth: 40, fontStyle: "bold" },
//             1: { cellWidth: paperSize === "A3" ? 120 : 80 },
//           },
//           margin: { left: 20, right: 20 },
//         });

//         yPosition = doc.lastAutoTable.finalY + 15;

//         if (i < detailedAssets.length - 1) {
//           doc.setDrawColor(200, 200, 200);
//           doc.line(20, yPosition, pageWidth - 20, yPosition);
//           yPosition += 10;
//         }
//       }

//       const pageCount = doc.internal.getNumberOfPages();
//       for (let i = 1; i <= pageCount; i++) {
//         doc.setPage(i);
//         doc.setFontSize(8);
//         doc.setTextColor(150, 150, 150);
//         doc.text(`Page ${i} of ${pageCount}`, 20, pageHeight - 10);
//         doc.text(
//           "Generated by CAFM UAE System",
//           pageWidth - 80,
//           pageHeight - 10
//         );
//       }

//       const fileName = `bulk-asset-report-${selectedContract}-${paperSize}-${
//         new Date().toISOString().split("T")[0]
//       }.pdf`;
//       doc.save(fileName);

//       toast.success(
//         `Bulk asset report with images generated successfully (${paperSize} format)`
//       );
//       setShowBulkReportModal(false);
//       setSelectedAssets([]);
//       setSelectAll(false);
//     } catch (error) {
//       console.error("Error generating bulk report:", error);
//       toast.error("Failed to generate bulk asset report");
//     } finally {
//       setGeneratingBulkReport(false);
//     }
//   };

//   const filteredAssets = assets.filter((asset) => {
//     if (!searchTerm) return true;
//     const searchLower = searchTerm.toLowerCase();
//     return (
//       asset.assetName?.toLowerCase().includes(searchLower) ||
//       asset.assetTag?.toLowerCase().includes(searchLower) ||
//       asset.roomName?.toLowerCase().includes(searchLower) ||
//       asset.categoryName?.toLowerCase().includes(searchLower)
//     );
//   });

//   const paginatedAssets = selectedContract
//     ? filteredAssets.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
//     : filteredAssets;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center space-x-4">
//               <Link
//                 to="/assets"
//                 className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
//               >
//                 <ArrowLeft className="w-5 h-5 text-gray-600" />
//               </Link>
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">Asset List</h1>
//                 <p className="text-gray-600 mt-1">
//                   View and manage all assets in your inventory
//                 </p>
//               </div>
//             </div>
//             <div className="flex gap-3">
//               <Link
//                 to="/assets/create"
//                 className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
//               >
//                 <Plus className="w-5 h-5 mr-2" />
//                 Add New Asset
//               </Link>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//             <div className="flex flex-col sm:flex-row gap-4 flex-1">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Search by asset tag, asset name, category, or room name..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                 />
//               </div>
//               <div className="relative">
//                 <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <select
//                   value={selectedContract}
//                   onChange={(e) => setSelectedContract(e.target.value)}
//                   className="w-full sm:w-56 pl-10 pr-8 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition-all"
//                 >
//                   <option value="">All Contracts</option>
//                   {contracts.map((contract) => (
//                     <option
//                       key={contract.contractId}
//                       value={contract.contractId}
//                     >
//                       {contract.contractName}
//                     </option>
//                   ))}
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
//               </div>
//             </div>
//             <div className="flex gap-3">
//               <button
//                 onClick={handleRefresh}
//                 disabled={isRefreshing}
//                 className="p-3 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
//                 title="Refresh"
//               >
//                 <RefreshCw
//                   className={`w-5 h-5 text-gray-600 ${
//                     isRefreshing ? "animate-spin" : ""
//                   }`}
//                 />
//               </button>
//               <button
//                 onClick={handleExport}
//                 disabled={exporting || !selectedContract}
//                 className="inline-flex items-center px-4 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl hover:from-teal-700 hover:to-teal-800 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
//                 title="Export Excel"
//               >
//                 {exporting ? (
//                   <>
//                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                     Exporting...
//                   </>
//                 ) : (
//                   <>
//                     <FileSpreadsheet className="w-5 h-5 mr-2" />
//                     Export Excel
//                   </>
//                 )}
//               </button>
//               <button
//                 onClick={() => setShowBulkReportModal(true)}
//                 disabled={!selectedContract}
//                 className="inline-flex items-center px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
//                 title="Generate Asset Report"
//               >
//                 <FileDown className="w-5 h-5 mr-2" />
//                 Generate Asset Report
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
//                 <tr>
//                   <th scope="col" className="px-6 py-4 text-left">
//                     <button
//                       onClick={handleSelectAll}
//                       className="flex items-center text-xs font-bold text-gray-700 uppercase tracking-wider hover:text-blue-600 transition-colors"
//                     >
//                       {selectAll ? (
//                         <CheckSquare className="w-5 h-5 text-blue-600" />
//                       ) : (
//                         <Square className="w-5 h-5" />
//                       )}
//                       <span className="ml-2">Select</span>
//                     </button>
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
//                     onClick={() => handleSort("assetTag")}
//                   >
//                     <div className="flex items-center">
//                       Asset Tag
//                       {sortBy === "assetTag" && (
//                         <span className="ml-2 text-blue-600">
//                           {sortDirection === "asc" ? "↑" : "↓"}
//                         </span>
//                       )}
//                     </div>
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
//                     onClick={() => handleSort("assetName")}
//                   >
//                     <div className="flex items-center">
//                       Name
//                       {sortBy === "assetName" && (
//                         <span className="ml-2 text-blue-600">
//                           {sortDirection === "asc" ? "↑" : "↓"}
//                         </span>
//                       )}
//                     </div>
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
//                   >
//                     Category
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
//                   >
//                     Location
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
//                   >
//                     Serial Number
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
//                     onClick={() => handleSort("assetStatus")}
//                   >
//                     <div className="flex items-center">
//                       Status
//                       {sortBy === "assetStatus" && (
//                         <span className="ml-2 text-blue-600">
//                           {sortDirection === "asc" ? "↑" : "↓"}
//                         </span>
//                       )}
//                     </div>
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
//                     onClick={() => handleSort("createdAt")}
//                   >
//                     <div className="flex items-center">
//                       <Calendar className="w-4 h-4 mr-1" />
//                       Created Date
//                       {sortBy === "createdAt" && (
//                         <span className="ml-2 text-blue-600">
//                           {sortDirection === "asc" ? "↑" : "↓"}
//                         </span>
//                       )}
//                     </div>
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
//                   >
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {loading ? (
//                   <tr>
//                     <td colSpan="9" className="px-6 py-12 text-center">
//                       <div className="flex justify-center items-center">
//                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                         <span className="ml-3 text-lg font-medium text-gray-700">
//                           Loading assets...
//                         </span>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : paginatedAssets.length === 0 ? (
//                   <tr>
//                     <td colSpan="9" className="px-6 py-12 text-center">
//                       <div className="text-gray-500">
//                         <Building className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                         <p className="text-lg font-medium">No assets found</p>
//                         <p className="text-sm">
//                           Try adjusting your search or filter criteria
//                         </p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   paginatedAssets.map((asset, index) => (
//                     <tr
//                       key={asset.assetId}
//                       className={`hover:bg-blue-50 transition-colors ${
//                         index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                       }`}
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <button
//                           onClick={() => handleAssetSelection(asset.assetId)}
//                           className="text-blue-600 hover:text-blue-800 transition-colors"
//                         >
//                           {selectedAssets.includes(asset.assetId) ? (
//                             <CheckSquare className="w-5 h-5" />
//                           ) : (
//                             <Square className="w-5 h-5" />
//                           )}
//                         </button>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm font-bold text-gray-900">
//                           {asset.assetTag}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm font-medium text-gray-900">
//                           {asset.assetName}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center text-sm text-gray-600">
//                           <Tag className="w-4 h-4 mr-1 text-gray-400" />
//                           {asset.categoryName || "-"}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-600">
//                           <div className="flex items-center">
//                             <MapPin className="w-4 h-4 mr-1 text-gray-400" />
//                             {asset.buildingName}, {asset.floorName},{" "}
//                             {asset.roomName}
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-600">
//                           {asset.serialNumber || "-"}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span
//                           className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
//                             asset.assetStatus === "ACTIVE"
//                               ? "bg-green-100 text-green-800"
//                               : asset.assetStatus === "UNDER_MAINTENANCE"
//                               ? "bg-yellow-100 text-yellow-800"
//                               : asset.assetStatus === "DECOMMISSIONED"
//                               ? "bg-red-100 text-red-800"
//                               : "bg-gray-100 text-gray-800"
//                           }`}
//                         >
//                           {asset.assetStatus.replace("_", " ")}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-600">
//                           {asset.createdAt
//                             ? new Date(asset.createdAt).toLocaleDateString()
//                             : "-"}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex space-x-3">
//                           <Link
//                             to={`/assets/detail/${asset.assetId}`}
//                             className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded-lg transition-all"
//                             title="View Details"
//                           >
//                             <Eye className="w-5 h-5" />
//                           </Link>
//                           <Link
//                             to={`/assets/edit/${asset.assetId}`}
//                             className="p-2 text-green-600 hover:text-green-900 hover:bg-green-100 rounded-lg transition-all"
//                             title="Edit Asset"
//                           >
//                             <Edit className="w-5 h-5" />
//                           </Link>
//                           <button
//                             onClick={() => handleDelete(asset.assetId)}
//                             className="p-2 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-lg transition-all"
//                             title="Delete Asset"
//                           >
//                             <Trash2 className="w-5 h-5" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//           <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
//             <div className="text-sm text-gray-700">
//               Showing{" "}
//               <span className="font-medium">{paginatedAssets.length}</span> of{" "}
//               <span className="font-medium">{filteredAssets.length}</span>{" "}
//               assets
//               {selectedAssets.length > 0 && (
//                 <span className="ml-4 text-blue-600 font-medium">
//                   {selectedAssets.length} selected
//                 </span>
//               )}
//             </div>
//             <div className="flex items-center space-x-3">
//               <button
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 0}
//                 className="p-2 border-2 border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-all"
//               >
//                 <ChevronLeft className="w-5 h-5" />
//               </button>
//               <span className="px-4 py-2 text-sm font-medium">
//                 Page {currentPage + 1} of {Math.max(1, totalPages)}
//               </span>
//               <button
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage >= totalPages - 1}
//                 className="p-2 border-2 border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-all"
//               >
//                 <ChevronRight className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {showBulkReportModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-2xl font-bold text-gray-900">
//                   Generate Asset Report
//                 </h3>
//                 <button
//                   onClick={() => setShowBulkReportModal(false)}
//                   className="text-gray-500 hover:text-gray-700 text-2xl"
//                 >
//                   ×
//                 </button>
//               </div>
//               <div className="space-y-6">
//                 <div>
//                   <p className="text-gray-600 mb-4">
//                     Generate a comprehensive PDF report for selected assets with
//                     images.
//                   </p>
//                   <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
//                     <div className="flex">
//                       <FileDown className="h-5 w-5 text-blue-400" />
//                       <div className="ml-3">
//                         <p className="text-sm text-blue-700 font-medium">
//                           Report Features:
//                         </p>
//                         <ul className="list-disc pl-5 mt-1 text-sm text-blue-700">
//                           <li>Compressed PDF for smaller file size</li>
//                           <li>Detailed asset information</li>
//                           <li>Asset images included (up to 3 per asset)</li>
//                           <li>Multiple sub-services support</li>
//                           <li>Professional formatting</li>
//                           <li>Asset category information included</li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Paper Size
//                   </label>
//                   <select
//                     value={paperSize}
//                     onChange={(e) => setPaperSize(e.target.value)}
//                     className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
//                   >
//                     <option value="A4">A4 (210 × 297 mm)</option>
//                     <option value="A3">A3 (297 × 420 mm)</option>
//                   </select>
//                 </div>
//                 <div className="bg-gray-50 p-4 rounded-xl">
//                   <p className="text-sm text-gray-700">
//                     <strong>Selected Assets:</strong> {selectedAssets.length}
//                   </p>
//                   <p className="text-sm text-gray-700">
//                     <strong>Contract:</strong>{" "}
//                     {contracts.find(
//                       (c) => c.contractId.toString() === selectedContract
//                     )?.contractName || "None selected"}
//                   </p>
//                   <p className="text-sm text-gray-700">
//                     <strong>Paper Size:</strong> {paperSize}
//                   </p>
//                   <p className="text-sm text-gray-700">
//                     <strong>Images:</strong> Included (up to 3 per asset)
//                   </p>
//                 </div>
//               </div>
//               <div className="flex gap-3 mt-8">
//                 <button
//                   onClick={() => setShowBulkReportModal(false)}
//                   className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={generateBulkAssetReport}
//                   disabled={
//                     generatingBulkReport ||
//                     selectedAssets.length === 0 ||
//                     !selectedContract
//                   }
//                   className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
//                 >
//                   {generatingBulkReport ? (
//                     <>
//                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                       Generating...
//                     </>
//                   ) : (
//                     <>
//                       <FileDown className="w-5 h-5 mr-2" />
//                       Generate Report
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AssetList;

// "use client";

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   Edit,
//   Trash2,
//   Eye,
//   Search,
//   Filter,
//   RefreshCw,
//   ChevronDown,
//   ChevronLeft,
//   ChevronRight,
//   Plus,
//   Calendar,
//   MapPin,
//   Building,
//   ArrowLeft,
//   FileDown,
//   CheckSquare,
//   Square,
//   FileSpreadsheet,
//   Tag,
// } from "lucide-react";
// import { assetService } from "../services/assetService";
// import { contractService } from "../services/contractService";
// import { toast } from "react-toastify";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// const AssetList = () => {
//   const [assets, setAssets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [contracts, setContracts] = useState([]);
//   const [selectedContract, setSelectedContract] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   const [sortBy, setSortBy] = useState("createdAt");
//   const [sortDirection, setSortDirection] = useState("desc");
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [exporting, setExporting] = useState(false);
//   const [showBulkReportModal, setShowBulkReportModal] = useState(false);
//   const [selectedAssets, setSelectedAssets] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const [paperSize, setPaperSize] = useState("A4");
//   const [generatingBulkReport, setGeneratingBulkReport] = useState(false);
//   const [totalElements, setTotalElements] = useState(0);

//   useEffect(() => {
//     loadContracts();
//     loadAssets();
//   }, [currentPage, pageSize, sortBy, sortDirection, selectedContract]);

//   const loadContracts = async () => {
//     try {
//       const response = await contractService.getAllContracts();
//       setContracts(response.data || []);
//     } catch (error) {
//       console.error("Error loading contracts:", error);
//       toast.error("Failed to load contracts");
//     }
//   };

//   const loadAssets = async () => {
//     setLoading(true);
//     try {
//       let response;
//       if (selectedContract) {
//         response = await assetService.getAssetsByContract(selectedContract);
//         // Ensure response.data is an array
//         const assetsData = Array.isArray(response.data)
//           ? response.data
//           : response.data?.assets || []; // Adjust 'assets' key if needed
//         setAssets(assetsData);
//         setTotalElements(assetsData.length);
//         setTotalPages(Math.ceil(assetsData.length / pageSize));
//       } else {
//         const pageable = {
//           page: currentPage,
//           size: pageSize,
//           sort: `${sortBy},${sortDirection}`,
//         };
//         response = await assetService.getAllAssets(pageable);
//         setAssets(response.data.content || []);
//         setTotalElements(response.data.totalElements || 0);
//         setTotalPages(response.data.totalPages || 0);
//       }
//     } catch (error) {
//       console.error("Error loading assets:", error);
//       toast.error("Failed to load assets");
//       setAssets([]); // Fallback to empty array on error
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     try {
//       await loadAssets();
//       toast.success("Assets refreshed successfully");
//     } finally {
//       setTimeout(() => setIsRefreshing(false), 500);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this asset?")) {
//       try {
//         await assetService.deleteAsset(id);
//         toast.success("Asset deleted successfully");
//         loadAssets();
//       } catch (error) {
//         console.error("Error deleting asset:", error);
//         toast.error("Failed to delete asset");
//       }
//     }
//   };

//   const handleSort = (field) => {
//     if (sortBy === field) {
//       setSortDirection(sortDirection === "asc" ? "desc" : "asc");
//     } else {
//       setSortBy(field);
//       setSortDirection("asc");
//     }
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage >= 0 && newPage < totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   const handlePageSizeChange = (newSize) => {
//     setPageSize(newSize);
//     setCurrentPage(0);
//   };

//   const handleExport = async () => {
//     if (!selectedContract) {
//       toast.error("Please select a contract to export assets");
//       return;
//     }
//     setExporting(true);
//     try {
//       const response = await assetService.exportAssetsExcel(selectedContract);
//       const blob = new Blob([response.data], {
//         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       });
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = `assets-contract-${selectedContract}-${
//         new Date().toISOString().split("T")[0]
//       }.xlsx`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//       toast.success("Assets exported to Excel successfully");
//     } catch (error) {
//       console.error("Error exporting assets to Excel:", error);
//       toast.error("Failed to export assets to Excel. Please try again.");
//     } finally {
//       setExporting(false);
//     }
//   };

//   const handleAssetSelection = (assetId) => {
//     setSelectedAssets((prev) => {
//       if (prev.includes(assetId)) {
//         return prev.filter((id) => id !== assetId);
//       } else {
//         return [...prev, assetId];
//       }
//     });
//   };

//   const handleSelectAll = () => {
//     if (selectAll) {
//       setSelectedAssets([]);
//       setSelectAll(false);
//     } else {
//       setSelectedAssets(filteredAssets.map((asset) => asset.assetId));
//       setSelectAll(true);
//     }
//   };

//   const getImageAsBase64 = async (imageUrl) => {
//     try {
//       const response = await fetch(imageUrl, { mode: "cors" });
//       const blob = await response.blob();
//       return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onloadend = () => resolve(reader.result);
//         reader.onerror = reject;
//         reader.readAsDataURL(blob);
//       });
//     } catch (error) {
//       console.error("Error converting image to base64:", error);
//       return null;
//     }
//   };

//   const generateBulkAssetReport = async () => {
//     if (!selectedContract) {
//       toast.error("Please select a contract first");
//       return;
//     }
//     if (selectedAssets.length === 0) {
//       toast.error("Please select at least one asset");
//       return;
//     }
//     setGeneratingBulkReport(true);
//     try {
//       const assetPromises = selectedAssets.map((assetId) =>
//         assetService.getAssetById(assetId)
//       );
//       const assetResponses = await Promise.all(assetPromises);
//       const detailedAssets = assetResponses.map((response) => response.data);
//       const doc = new jsPDF({
//         orientation: "portrait",
//         unit: "mm",
//         format: paperSize.toLowerCase(),
//         compress: true,
//       });
//       doc.setProperties({
//         title: `Asset Report - Contract ${selectedContract}`,
//         subject: "Asset Management Report",
//         author: "CAFM UAE System",
//         creator: "CAFM UAE System",
//       });
//       doc.setFontSize(24);
//       doc.setTextColor(40, 116, 240);
//       doc.text("Bulk Asset Report", 20, 25);
//       doc.setFontSize(12);
//       doc.setTextColor(100, 100, 100);
//       doc.text(
//         `Contract: ${
//           contracts.find((c) => c.contractId.toString() === selectedContract)
//             ?.contractName || "Unknown"
//         }`,
//         20,
//         35
//       );
//       doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 42);
//       doc.text(`Total Assets: ${selectedAssets.length}`, 20, 49);
//       doc.text(`Paper Size: ${paperSize}`, 20, 56);
//       doc.setDrawColor(200, 200, 200);
//       doc.line(20, 62, paperSize === "A3" ? 277 : 190, 62);
//       let yPosition = 75;
//       const pageHeight = paperSize === "A3" ? 420 : 297;
//       const pageWidth = paperSize === "A3" ? 297 : 210;
//       for (let i = 0; i < detailedAssets.length; i++) {
//         const asset = detailedAssets[i];
//         if (yPosition > pageHeight - 150) {
//           doc.addPage();
//           yPosition = 20;
//         }
//         doc.setFontSize(16);
//         doc.setTextColor(40, 116, 240);
//         doc.text(`Asset ${i + 1}: ${asset.assetTag}`, 20, yPosition);
//         yPosition += 10;
//         if (asset.imageUrls && asset.imageUrls.length > 0) {
//           const imageWidth = 40;
//           const imageHeight = 30;
//           let imageX = 20;
//           let imagesAdded = 0;
//           const maxImagesPerRow = Math.floor(
//             (pageWidth - 40) / (imageWidth + 5)
//           );
//           for (const imageUrl of asset.imageUrls.slice(0, 3)) {
//             try {
//               const base64Image = await getImageAsBase64(imageUrl);
//               if (base64Image) {
//                 if (imagesAdded > 0 && imagesAdded % maxImagesPerRow === 0) {
//                   yPosition += imageHeight + 5;
//                   imageX = 20;
//                   if (yPosition + imageHeight > pageHeight - 50) {
//                     doc.addPage();
//                     yPosition = 20;
//                   }
//                 }
//                 doc.addImage(
//                   base64Image,
//                   "JPEG",
//                   imageX,
//                   yPosition,
//                   imageWidth,
//                   imageHeight
//                 );
//                 imageX += imageWidth + 5;
//                 imagesAdded++;
//               }
//             } catch (error) {
//               console.error("Error adding image to PDF:", error);
//             }
//           }
//           if (imagesAdded > 0) {
//             yPosition += imageHeight + 15;
//           }
//         }
//         if (yPosition > pageHeight - 100) {
//           doc.addPage();
//           yPosition = 20;
//         }
//         const basicInfo = [
//           ["Asset Name", asset.assetName || "-"],
//           ["Serial Number", asset.serialNumber || "-"],
//           ["Brand", asset.brandName || "-"],
//           ["Model", asset.modelNumber || "-"],
//           ["Category", asset.categoryName || "-"],
//           ["Status", asset.assetStatus || "-"],
//           ["Condition", asset.assetCondition || "-"],
//           ["Owner Type", asset.ownerType || "-"],
//         ];
//         autoTable(doc, {
//           startY: yPosition,
//           head: [["Property", "Value"]],
//           body: basicInfo,
//           theme: "grid",
//           headStyles: {
//             fillColor: [40, 116, 240],
//             textColor: 255,
//             fontSize: 9,
//             fontStyle: "bold",
//           },
//           bodyStyles: {
//             fontSize: 8,
//             textColor: 50,
//           },
//           columnStyles: {
//             0: { cellWidth: 40, fontStyle: "bold" },
//             1: { cellWidth: paperSize === "A3" ? 120 : 80 },
//           },
//           margin: { left: 20, right: 20 },
//         });
//         yPosition = doc.lastAutoTable.finalY + 10;
//         if (yPosition > pageHeight - 60) {
//           doc.addPage();
//           yPosition = 20;
//         }
//         const locationInfo = [
//           ["Zone", asset.zoneName || "-"],
//           ["Sub Zone", asset.subZoneName || "-"],
//           ["Building", asset.buildingName || "-"],
//           ["Villa/Apartment", asset.villaApartmentName || "-"],
//           ["Floor", asset.floorName || "-"],
//           ["Room", asset.roomName || "-"],
//         ];
//         autoTable(doc, {
//           startY: yPosition,
//           head: [["Location", "Value"]],
//           body: locationInfo,
//           theme: "grid",
//           headStyles: {
//             fillColor: [34, 197, 94],
//             textColor: 255,
//             fontSize: 9,
//             fontStyle: "bold",
//           },
//           bodyStyles: {
//             fontSize: 8,
//             textColor: 50,
//           },
//           columnStyles: {
//             0: { cellWidth: 40, fontStyle: "bold" },
//             1: { cellWidth: paperSize === "A3" ? 120 : 80 },
//           },
//           margin: { left: 20, right: 20 },
//         });
//         yPosition = doc.lastAutoTable.finalY + 10;
//         if (yPosition > pageHeight - 60) {
//           doc.addPage();
//           yPosition = 20;
//         }
//         const serviceInfo = [];
//         if (asset.subServices && asset.subServices.length > 0) {
//           asset.subServices.forEach((subService, index) => {
//             serviceInfo.push([
//               `Sub-Service ${index + 1}`,
//               subService.subServiceName || "-",
//             ]);
//             if (
//               subService.serviceScopeNames &&
//               subService.serviceScopeNames.length > 0
//             ) {
//               serviceInfo.push([
//                 `Service Scopes ${index + 1}`,
//                 subService.serviceScopeNames.join(", "),
//               ]);
//             }
//           });
//         } else {
//           serviceInfo.push(["Sub-Services", "No sub-services assigned"]);
//         }
//         autoTable(doc, {
//           startY: yPosition,
//           head: [["Service Information", "Value"]],
//           body: serviceInfo,
//           theme: "grid",
//           headStyles: {
//             fillColor: [147, 51, 234],
//             textColor: 255,
//             fontSize: 9,
//             fontStyle: "bold",
//           },
//           bodyStyles: {
//             fontSize: 8,
//             textColor: 50,
//           },
//           columnStyles: {
//             0: { cellWidth: 40, fontStyle: "bold" },
//             1: { cellWidth: paperSize === "A3" ? 120 : 80 },
//           },
//           margin: { left: 20, right: 20 },
//         });
//         yPosition = doc.lastAutoTable.finalY + 15;
//         if (i < detailedAssets.length - 1) {
//           doc.setDrawColor(200, 200, 200);
//           doc.line(20, yPosition, pageWidth - 20, yPosition);
//           yPosition += 10;
//         }
//       }
//       const pageCount = doc.internal.getNumberOfPages();
//       for (let i = 1; i <= pageCount; i++) {
//         doc.setPage(i);
//         doc.setFontSize(8);
//         doc.setTextColor(150, 150, 150);
//         doc.text(`Page ${i} of ${pageCount}`, 20, pageHeight - 10);
//         doc.text(
//           "Generated by CAFM UAE System",
//           pageWidth - 80,
//           pageHeight - 10
//         );
//       }
//       const fileName = `bulk-asset-report-${selectedContract}-${paperSize}-${
//         new Date().toISOString().split("T")[0]
//       }.pdf`;
//       doc.save(fileName);
//       toast.success(
//         `Bulk asset report with images generated successfully (${paperSize} format)`
//       );
//       setShowBulkReportModal(false);
//       setSelectedAssets([]);
//       setSelectAll(false);
//     } catch (error) {
//       console.error("Error generating bulk report:", error);
//       toast.error("Failed to generate bulk asset report");
//     } finally {
//       setGeneratingBulkReport(false);
//     }
//   };

//   const filteredAssets = assets.filter((asset) => {
//     if (!searchTerm) return true;
//     const searchLower = searchTerm.toLowerCase();
//     return (
//       asset.assetName?.toLowerCase().includes(searchLower) ||
//       asset.assetTag?.toLowerCase().includes(searchLower) ||
//       asset.roomName?.toLowerCase().includes(searchLower) ||
//       asset.categoryName?.toLowerCase().includes(searchLower)
//     );
//   });

//   const paginatedAssets = selectedContract
//     ? filteredAssets.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
//     : filteredAssets;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center space-x-4">
//               <Link
//                 to="/assets"
//                 className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
//               >
//                 <ArrowLeft className="w-5 h-5 text-gray-600" />
//               </Link>
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">Asset List</h1>
//                 <p className="text-gray-600 mt-1">
//                   View and manage all assets in your inventory
//                 </p>
//               </div>
//             </div>
//             <div className="flex gap-3">
//               <Link
//                 to="/assets/create"
//                 className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
//               >
//                 <Plus className="w-5 h-5 mr-2" />
//                 Add New Asset
//               </Link>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//             <div className="flex flex-col sm:flex-row gap-4 flex-1">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Search by asset tag, asset name, category, or room name..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                 />
//               </div>
//               <div className="relative">
//                 <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <select
//                   value={selectedContract}
//                   onChange={(e) => setSelectedContract(e.target.value)}
//                   className="w-full sm:w-56 pl-10 pr-8 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition-all"
//                 >
//                   <option value="">All Contracts</option>
//                   {contracts.map((contract) => (
//                     <option
//                       key={contract.contractId}
//                       value={contract.contractId}
//                     >
//                       {contract.contractName}
//                     </option>
//                   ))}
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
//               </div>
//             </div>
//             <div className="flex gap-3">
//               <button
//                 onClick={handleRefresh}
//                 disabled={isRefreshing}
//                 className="p-3 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
//                 title="Refresh"
//               >
//                 <RefreshCw
//                   className={`w-5 h-5 text-gray-600 ${
//                     isRefreshing ? "animate-spin" : ""
//                   }`}
//                 />
//               </button>
//               <button
//                 onClick={handleExport}
//                 disabled={exporting || !selectedContract}
//                 className="inline-flex items-center px-4 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl hover:from-teal-700 hover:to-teal-800 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
//                 title="Export Excel"
//               >
//                 {exporting ? (
//                   <>
//                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                     Exporting...
//                   </>
//                 ) : (
//                   <>
//                     <FileSpreadsheet className="w-5 h-5 mr-2" />
//                     Export Excel
//                   </>
//                 )}
//               </button>
//               <button
//                 onClick={() => setShowBulkReportModal(true)}
//                 disabled={!selectedContract}
//                 className="inline-flex items-center px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
//                 title="Generate Asset Report"
//               >
//                 <FileDown className="w-5 h-5 mr-2" />
//                 Generate Asset Report
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
//                 <tr>
//                   <th scope="col" className="px-6 py-4 text-left">
//                     <button
//                       onClick={handleSelectAll}
//                       className="flex items-center text-xs font-bold text-gray-700 uppercase tracking-wider hover:text-blue-600 transition-colors"
//                     >
//                       {selectAll ? (
//                         <CheckSquare className="w-5 h-5 text-blue-600" />
//                       ) : (
//                         <Square className="w-5 h-5" />
//                       )}
//                       <span className="ml-2">Select</span>
//                     </button>
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
//                     onClick={() => handleSort("assetTag")}
//                   >
//                     <div className="flex items-center">
//                       Asset Tag
//                       {sortBy === "assetTag" && (
//                         <span className="ml-2 text-blue-600">
//                           {sortDirection === "asc" ? "↑" : "↓"}
//                         </span>
//                       )}
//                     </div>
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
//                     onClick={() => handleSort("assetName")}
//                   >
//                     <div className="flex items-center">
//                       Name
//                       {sortBy === "assetName" && (
//                         <span className="ml-2 text-blue-600">
//                           {sortDirection === "asc" ? "↑" : "↓"}
//                         </span>
//                       )}
//                     </div>
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
//                   >
//                     Category
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
//                   >
//                     Location
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
//                   >
//                     Serial Number
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
//                     onClick={() => handleSort("assetStatus")}
//                   >
//                     <div className="flex items-center">
//                       Status
//                       {sortBy === "assetStatus" && (
//                         <span className="ml-2 text-blue-600">
//                           {sortDirection === "asc" ? "↑" : "↓"}
//                         </span>
//                       )}
//                     </div>
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
//                     onClick={() => handleSort("createdAt")}
//                   >
//                     <div className="flex items-center">
//                       <Calendar className="w-4 h-4 mr-1" />
//                       Created Date
//                       {sortBy === "createdAt" && (
//                         <span className="ml-2 text-blue-600">
//                           {sortDirection === "asc" ? "↑" : "↓"}
//                         </span>
//                       )}
//                     </div>
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
//                   >
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {loading ? (
//                   <tr>
//                     <td colSpan="9" className="px-6 py-12 text-center">
//                       <div className="flex justify-center items-center">
//                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                         <span className="ml-3 text-lg font-medium text-gray-700">
//                           Loading assets...
//                         </span>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : paginatedAssets.length === 0 ? (
//                   <tr>
//                     <td colSpan="9" className="px-6 py-12 text-center">
//                       <div className="text-gray-500">
//                         <Building className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                         <p className="text-lg font-medium">No assets found</p>
//                         <p className="text-sm">
//                           Try adjusting your search or filter criteria
//                         </p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   paginatedAssets.map((asset, index) => (
//                     <tr
//                       key={asset.assetId}
//                       className={`hover:bg-blue-50 transition-colors ${
//                         index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                       }`}
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <button
//                           onClick={() => handleAssetSelection(asset.assetId)}
//                           className="text-blue-600 hover:text-blue-800 transition-colors"
//                         >
//                           {selectedAssets.includes(asset.assetId) ? (
//                             <CheckSquare className="w-5 h-5" />
//                           ) : (
//                             <Square className="w-5 h-5" />
//                           )}
//                         </button>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm font-bold text-gray-900">
//                           {asset.assetTag}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm font-medium text-gray-900">
//                           {asset.assetName}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center text-sm text-gray-600">
//                           <Tag className="w-4 h-4 mr-1 text-gray-400" />
//                           {asset.categoryName || "-"}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-600">
//                           <div className="flex items-center">
//                             <MapPin className="w-4 h-4 mr-1 text-gray-400" />
//                             {asset.buildingName}, {asset.floorName},{" "}
//                             {asset.roomName}
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-600">
//                           {asset.serialNumber || "-"}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span
//                           className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
//                             asset.assetStatus === "ACTIVE"
//                               ? "bg-green-100 text-green-800"
//                               : asset.assetStatus === "UNDER_MAINTENANCE"
//                               ? "bg-yellow-100 text-yellow-800"
//                               : asset.assetStatus === "DECOMMISSIONED"
//                               ? "bg-red-100 text-red-800"
//                               : "bg-gray-100 text-gray-800"
//                           }`}
//                         >
//                           {asset.assetStatus.replace("_", " ")}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-600">
//                           {asset.createdAt
//                             ? new Date(asset.createdAt).toLocaleDateString()
//                             : "-"}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex space-x-3">
//                           <Link
//                             to={`/assets/detail/${asset.assetId}`}
//                             className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded-lg transition-all"
//                             title="View Details"
//                           >
//                             <Eye className="w-5 h-5" />
//                           </Link>
//                           <Link
//                             to={`/assets/edit/${asset.assetId}`}
//                             className="p-2 text-green-600 hover:text-green-900 hover:bg-green-100 rounded-lg transition-all"
//                             title="Edit Asset"
//                           >
//                             <Edit className="w-5 h-5" />
//                           </Link>
//                           <button
//                             onClick={() => handleDelete(asset.assetId)}
//                             className="p-2 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-lg transition-all"
//                             title="Delete Asset"
//                           >
//                             <Trash2 className="w-5 h-5" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//           {!loading && (
//             <div className="bg-slate-50 px-4 py-3 border-t border-slate-200">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-4">
//                   <div className="text-xs text-slate-600">
//                     Showing{" "}
//                     <span className="font-medium">
//                       {currentPage * pageSize + 1}
//                     </span>{" "}
//                     to{" "}
//                     <span className="font-medium">
//                       {Math.min((currentPage + 1) * pageSize, totalElements)}
//                     </span>{" "}
//                     of <span className="font-medium">{totalElements}</span>{" "}
//                     assets
//                     {selectedAssets.length > 0 && (
//                       <span className="ml-4 text-blue-600 font-medium">
//                         {selectedAssets.length} selected
//                       </span>
//                     )}
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <label className="text-xs text-slate-600">Show:</label>
//                     <select
//                       value={pageSize}
//                       onChange={(e) =>
//                         handlePageSizeChange(Number(e.target.value))
//                       }
//                       className="text-xs border border-slate-300 rounded px-2 py-1 focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     >
//                       <option value={5}>5</option>
//                       <option value={10}>10</option>
//                       <option value={25}>25</option>
//                       <option value={50}>50</option>
//                       <option value={100}>100</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     disabled={currentPage === 0}
//                     className="inline-flex items-center px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                   >
//                     <ChevronLeft className="w-3 h-3" />
//                     Previous
//                   </button>
//                   <div className="flex items-center gap-1">
//                     {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                       let pageNum;
//                       if (totalPages <= 5) {
//                         pageNum = i;
//                       } else if (currentPage < 3) {
//                         pageNum = i;
//                       } else if (currentPage > totalPages - 4) {
//                         pageNum = totalPages - 5 + i;
//                       } else {
//                         pageNum = currentPage - 2 + i;
//                       }
//                       return (
//                         <button
//                           key={pageNum}
//                           onClick={() => handlePageChange(pageNum)}
//                           className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
//                             currentPage === pageNum
//                               ? "bg-slate-800 text-white"
//                               : "text-slate-700 bg-white border border-slate-300 hover:bg-slate-50"
//                           }`}
//                         >
//                           {pageNum + 1}
//                         </button>
//                       );
//                     })}
//                   </div>
//                   <button
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     disabled={currentPage >= totalPages - 1}
//                     className="inline-flex items-center px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                   >
//                     Next
//                     <ChevronRight className="w-3 h-3" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//         {showBulkReportModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-2xl font-bold text-gray-900">
//                   Generate Asset Report
//                 </h3>
//                 <button
//                   onClick={() => setShowBulkReportModal(false)}
//                   className="text-gray-500 hover:text-gray-700 text-2xl"
//                 >
//                   ×
//                 </button>
//               </div>
//               <div className="space-y-6">
//                 <div>
//                   <p className="text-gray-600 mb-4">
//                     Generate a comprehensive PDF report for selected assets with
//                     images.
//                   </p>
//                   <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
//                     <div className="flex">
//                       <FileDown className="h-5 w-5 text-blue-400" />
//                       <div className="ml-3">
//                         <p className="text-sm text-blue-700 font-medium">
//                           Report Features:
//                         </p>
//                         <ul className="list-disc pl-5 mt-1 text-sm text-blue-700">
//                           <li>Compressed PDF for smaller file size</li>
//                           <li>Detailed asset information</li>
//                           <li>Asset images included (up to 3 per asset)</li>
//                           <li>Multiple sub-services support</li>
//                           <li>Professional formatting</li>
//                           <li>Asset category information included</li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Paper Size
//                   </label>
//                   <select
//                     value={paperSize}
//                     onChange={(e) => setPaperSize(e.target.value)}
//                     className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
//                   >
//                     <option value="A4">A4 (210 × 297 mm)</option>
//                     <option value="A3">A3 (297 × 420 mm)</option>
//                   </select>
//                 </div>
//                 <div className="bg-gray-50 p-4 rounded-xl">
//                   <p className="text-sm text-gray-700">
//                     <strong>Selected Assets:</strong> {selectedAssets.length}
//                   </p>
//                   <p className="text-sm text-gray-700">
//                     <strong>Contract:</strong>{" "}
//                     {contracts.find(
//                       (c) => c.contractId.toString() === selectedContract
//                     )?.contractName || "None selected"}
//                   </p>
//                   <p className="text-sm text-gray-700">
//                     <strong>Paper Size:</strong> {paperSize}
//                   </p>
//                   <p className="text-sm text-gray-700">
//                     <strong>Images:</strong> Included (up to 3 per asset)
//                   </p>
//                 </div>
//               </div>
//               <div className="flex gap-3 mt-8">
//                 <button
//                   onClick={() => setShowBulkReportModal(false)}
//                   className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={generateBulkAssetReport}
//                   disabled={
//                     generatingBulkReport ||
//                     selectedAssets.length === 0 ||
//                     !selectedContract
//                   }
//                   className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
//                 >
//                   {generatingBulkReport ? (
//                     <>
//                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                       Generating...
//                     </>
//                   ) : (
//                     <>
//                       <FileDown className="w-5 h-5 mr-2" />
//                       Generate Report
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // export default AssetList;

// "use client";

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   Edit,
//   Trash2,
//   Eye,
//   Search,
//   Filter,
//   RefreshCw,
//   ChevronDown,
//   ChevronLeft,
//   ChevronRight,
//   Plus,
//   Calendar,
//   MapPin,
//   Building,
//   ArrowLeft,
//   FileDown,
//   CheckSquare,
//   Square,
//   FileSpreadsheet,
//   Tag,
// } from "lucide-react";
// import { assetService } from "../services/assetService";
// import { contractService } from "../services/contractService";
// import { toast } from "react-toastify";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// const AssetList = () => {
//   const [assets, setAssets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [contracts, setContracts] = useState([]);
//   const [selectedContract, setSelectedContract] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   const [sortBy, setSortBy] = useState("createdAt");
//   const [sortDirection, setSortDirection] = useState("desc");
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [exporting, setExporting] = useState(false);
//   const [showBulkReportModal, setShowBulkReportModal] = useState(false);
//   const [selectedAssets, setSelectedAssets] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const [paperSize, setPaperSize] = useState("A4");
//   const [generatingBulkReport, setGeneratingBulkReport] = useState(false);
//   const [totalElements, setTotalElements] = useState(0);

//   useEffect(() => {
//     loadContracts();
//     loadAssets();
//   }, [currentPage, pageSize, sortBy, sortDirection, selectedContract]);

//   const loadContracts = async () => {
//     try {
//       const response = await contractService.getAllContracts();
//       setContracts(response.data || []);
//     } catch (error) {
//       console.error("Error loading contracts:", error);
//       toast.error("Failed to load contracts");
//     }
//   };

//   const loadAssets = async () => {
//     setLoading(true);
//     try {
//       let response;
//       if (selectedContract) {
//         response = await assetService.getAssetsByContract(selectedContract);
//         setAssets(response.data.content || []);
//         setTotalElements(response.data.totalElements || 0);
//         setTotalPages(response.data.totalPages || 0);
//       } else {
//         const pageable = {
//           page: currentPage,
//           size: pageSize,
//           sort: `${sortBy},${sortDirection}`,
//         };
//         response = await assetService.getAllAssets(pageable);
//         setAssets(response.data.content || []);
//         setTotalElements(response.data.totalElements || 0);
//         setTotalPages(response.data.totalPages || 0);
//       }
//     } catch (error) {
//       console.error("Error loading assets:", error);
//       toast.error("Failed to load assets");
//       setAssets([]); // Fallback to empty array on error
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     try {
//       await loadAssets();
//       toast.success("Assets refreshed successfully");
//     } finally {
//       setTimeout(() => setIsRefreshing(false), 500);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this asset?")) {
//       try {
//         await assetService.deleteAsset(id);
//         toast.success("Asset deleted successfully");
//         loadAssets();
//       } catch (error) {
//         console.error("Error deleting asset:", error);
//         toast.error("Failed to delete asset");
//       }
//     }
//   };

//   const handleSort = (field) => {
//     if (sortBy === field) {
//       setSortDirection(sortDirection === "asc" ? "desc" : "asc");
//     } else {
//       setSortBy(field);
//       setSortDirection("asc");
//     }
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage >= 0 && newPage < totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   const handlePageSizeChange = (newSize) => {
//     setPageSize(newSize);
//     setCurrentPage(0);
//   };

//   const handleExport = async () => {
//     if (!selectedContract) {
//       toast.error("Please select a contract to export assets");
//       return;
//     }
//     setExporting(true);
//     try {
//       const response = await assetService.exportAssetsExcel(selectedContract);
//       const blob = new Blob([response.data], {
//         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       });
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = `assets-contract-${selectedContract}-${
//         new Date().toISOString().split("T")[0]
//       }.xlsx`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//       toast.success("Assets exported to Excel successfully");
//     } catch (error) {
//       console.error("Error exporting assets to Excel:", error);
//       toast.error("Failed to export assets to Excel. Please try again.");
//     } finally {
//       setExporting(false);
//     }
//   };

//   const handleAssetSelection = (assetId) => {
//     setSelectedAssets((prev) => {
//       if (prev.includes(assetId)) {
//         return prev.filter((id) => id !== assetId);
//       } else {
//         return [...prev, assetId];
//       }
//     });
//   };

//   const handleSelectAll = () => {
//     if (selectAll) {
//       setSelectedAssets([]);
//       setSelectAll(false);
//     } else {
//       setSelectedAssets(filteredAssets.map((asset) => asset.assetId));
//       setSelectAll(true);
//     }
//   };

//   const getImageAsBase64 = async (imageUrl) => {
//     try {
//       const response = await fetch(imageUrl, { mode: "cors" });
//       const blob = await response.blob();
//       return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onloadend = () => resolve(reader.result);
//         reader.onerror = reject;
//         reader.readAsDataURL(blob);
//       });
//     } catch (error) {
//       console.error("Error converting image to base64:", error);
//       return null;
//     }
//   };

//   const generateBulkAssetReport = async () => {
//     if (!selectedContract) {
//       toast.error("Please select a contract first");
//       return;
//     }
//     if (selectedAssets.length === 0) {
//       toast.error("Please select at least one asset");
//       return;
//     }
//     setGeneratingBulkReport(true);
//     try {
//       const assetPromises = selectedAssets.map((assetId) =>
//         assetService.getAssetById(assetId)
//       );
//       const assetResponses = await Promise.all(assetPromises);
//       const detailedAssets = assetResponses.map((response) => response.data);
//       const doc = new jsPDF({
//         orientation: "portrait",
//         unit: "mm",
//         format: paperSize.toLowerCase(),
//         compress: true,
//       });
//       doc.setProperties({
//         title: `Asset Report - Contract ${selectedContract}`,
//         subject: "Asset Management Report",
//         author: "CAFM UAE System",
//         creator: "CAFM UAE System",
//       });
//       doc.setFontSize(24);
//       doc.setTextColor(40, 116, 240);
//       doc.text("Bulk Asset Report", 20, 25);
//       doc.setFontSize(12);
//       doc.setTextColor(100, 100, 100);
//       doc.text(
//         `Contract: ${
//           contracts.find((c) => c.contractId.toString() === selectedContract)
//             ?.contractName || "Unknown"
//         }`,
//         20,
//         35
//       );
//       doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 42);
//       doc.text(`Total Assets: ${selectedAssets.length}`, 20, 49);
//       doc.text(`Paper Size: ${paperSize}`, 20, 56);
//       doc.setDrawColor(200, 200, 200);
//       doc.line(20, 62, paperSize === "A3" ? 277 : 190, 62);
//       let yPosition = 75;
//       const pageHeight = paperSize === "A3" ? 420 : 297;
//       const pageWidth = paperSize === "A3" ? 297 : 210;
//       for (let i = 0; i < detailedAssets.length; i++) {
//         const asset = detailedAssets[i];
//         if (yPosition > pageHeight - 150) {
//           doc.addPage();
//           yPosition = 20;
//         }
//         doc.setFontSize(16);
//         doc.setTextColor(40, 116, 240);
//         doc.text(`Asset ${i + 1}: ${asset.assetTag}`, 20, yPosition);
//         yPosition += 10;
//         if (asset.imageUrls && asset.imageUrls.length > 0) {
//           const imageWidth = 40;
//           const imageHeight = 30;
//           let imageX = 20;
//           let imagesAdded = 0;
//           const maxImagesPerRow = Math.floor(
//             (pageWidth - 40) / (imageWidth + 5)
//           );
//           for (const imageUrl of asset.imageUrls.slice(0, 3)) {
//             try {
//               const base64Image = await getImageAsBase64(imageUrl);
//               if (base64Image) {
//                 if (imagesAdded > 0 && imagesAdded % maxImagesPerRow === 0) {
//                   yPosition += imageHeight + 5;
//                   imageX = 20;
//                   if (yPosition + imageHeight > pageHeight - 50) {
//                     doc.addPage();
//                     yPosition = 20;
//                   }
//                 }
//                 doc.addImage(
//                   base64Image,
//                   "JPEG",
//                   imageX,
//                   yPosition,
//                   imageWidth,
//                   imageHeight
//                 );
//                 imageX += imageWidth + 5;
//                 imagesAdded++;
//               }
//             } catch (error) {
//               console.error("Error adding image to PDF:", error);
//             }
//           }
//           if (imagesAdded > 0) {
//             yPosition += imageHeight + 15;
//           }
//         }
//         if (yPosition > pageHeight - 100) {
//           doc.addPage();
//           yPosition = 20;
//         }
//         const basicInfo = [
//           ["Asset Name", asset.assetName || "-"],
//           ["Serial Number", asset.serialNumber || "-"],
//           ["Brand", asset.brandName || "-"],
//           ["Model", asset.modelNumber || "-"],
//           ["Category", asset.categoryName || "-"],
//           ["Status", asset.assetStatus || "-"],
//           ["Condition", asset.assetCondition || "-"],
//           ["Owner Type", asset.ownerType || "-"],
//         ];
//         autoTable(doc, {
//           startY: yPosition,
//           head: [["Property", "Value"]],
//           body: basicInfo,
//           theme: "grid",
//           headStyles: {
//             fillColor: [40, 116, 240],
//             textColor: 255,
//             fontSize: 9,
//             fontStyle: "bold",
//           },
//           bodyStyles: {
//             fontSize: 8,
//             textColor: 50,
//           },
//           columnStyles: {
//             0: { cellWidth: 40, fontStyle: "bold" },
//             1: { cellWidth: paperSize === "A3" ? 120 : 80 },
//           },
//           margin: { left: 20, right: 20 },
//         });
//         yPosition = doc.lastAutoTable.finalY + 10;
//         if (yPosition > pageHeight - 60) {
//           doc.addPage();
//           yPosition = 20;
//         }
//         const locationInfo = [
//           ["Zone", asset.zoneName || "-"],
//           ["Sub Zone", asset.subZoneName || "-"],
//           ["Building", asset.buildingName || "-"],
//           ["Villa/Apartment", asset.villaApartmentName || "-"],
//           ["Floor", asset.floorName || "-"],
//           ["Room", asset.roomName || "-"],
//         ];
//         autoTable(doc, {
//           startY: yPosition,
//           head: [["Location", "Value"]],
//           body: locationInfo,
//           theme: "grid",
//           headStyles: {
//             fillColor: [34, 197, 94],
//             textColor: 255,
//             fontSize: 9,
//             fontStyle: "bold",
//           },
//           bodyStyles: {
//             fontSize: 8,
//             textColor: 50,
//           },
//           columnStyles: {
//             0: { cellWidth: 40, fontStyle: "bold" },
//             1: { cellWidth: paperSize === "A3" ? 120 : 80 },
//           },
//           margin: { left: 20, right: 20 },
//         });
//         yPosition = doc.lastAutoTable.finalY + 10;
//         if (yPosition > pageHeight - 60) {
//           doc.addPage();
//           yPosition = 20;
//         }
//         const serviceInfo = [];
//         if (asset.subServices && asset.subServices.length > 0) {
//           asset.subServices.forEach((subService, index) => {
//             serviceInfo.push([
//               `Sub-Service ${index + 1}`,
//               subService.subServiceName || "-",
//             ]);
//             if (
//               subService.serviceScopeNames &&
//               subService.serviceScopeNames.length > 0
//             ) {
//               serviceInfo.push([
//                 `Service Scopes ${index + 1}`,
//                 subService.serviceScopeNames.join(", "),
//               ]);
//             }
//           });
//         } else {
//           serviceInfo.push(["Sub-Services", "No sub-services assigned"]);
//         }
//         autoTable(doc, {
//           startY: yPosition,
//           head: [["Service Information", "Value"]],
//           body: serviceInfo,
//           theme: "grid",
//           headStyles: {
//             fillColor: [147, 51, 234],
//             textColor: 255,
//             fontSize: 9,
//             fontStyle: "bold",
//           },
//           bodyStyles: {
//             fontSize: 8,
//             textColor: 50,
//           },
//           columnStyles: {
//             0: { cellWidth: 40, fontStyle: "bold" },
//             1: { cellWidth: paperSize === "A3" ? 120 : 80 },
//           },
//           margin: { left: 20, right: 20 },
//         });
//         yPosition = doc.lastAutoTable.finalY + 15;
//         if (i < detailedAssets.length - 1) {
//           doc.setDrawColor(200, 200, 200);
//           doc.line(20, yPosition, pageWidth - 20, yPosition);
//           yPosition += 10;
//         }
//       }
//       const pageCount = doc.internal.getNumberOfPages();
//       for (let i = 1; i <= pageCount; i++) {
//         doc.setPage(i);
//         doc.setFontSize(8);
//         doc.setTextColor(150, 150, 150);
//         doc.text(`Page ${i} of ${pageCount}`, 20, pageHeight - 10);
//         doc.text(
//           "Generated by CAFM UAE System",
//           pageWidth - 80,
//           pageHeight - 10
//         );
//       }
//       const fileName = `bulk-asset-report-${selectedContract}-${paperSize}-${
//         new Date().toISOString().split("T")[0]
//       }.pdf`;
//       doc.save(fileName);
//       toast.success(
//         `Bulk asset report with images generated successfully (${paperSize} format)`
//       );
//       setShowBulkReportModal(false);
//       setSelectedAssets([]);
//       setSelectAll(false);
//     } catch (error) {
//       console.error("Error generating bulk report:", error);
//       toast.error("Failed to generate bulk asset report");
//     } finally {
//       setGeneratingBulkReport(false);
//     }
//   };

//   const filteredAssets = assets.filter((asset) => {
//     if (!searchTerm) return true;
//     const searchLower = searchTerm.toLowerCase();
//     return (
//       asset.assetName?.toLowerCase().includes(searchLower) ||
//       asset.assetTag?.toLowerCase().includes(searchLower) ||
//       asset.roomName?.toLowerCase().includes(searchLower) ||
//       asset.categoryName?.toLowerCase().includes(searchLower)
//     );
//   });

//   const paginatedAssets = selectedContract
//     ? filteredAssets.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
//     : filteredAssets;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center space-x-4">
//               <Link
//                 to="/assets"
//                 className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
//               >
//                 <ArrowLeft className="w-5 h-5 text-gray-600" />
//               </Link>
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">Asset List</h1>
//                 <p className="text-gray-600 mt-1">
//                   View and manage all assets in your inventory
//                 </p>
//               </div>
//             </div>
//             <div className="flex gap-3">
//               <Link
//                 to="/assets/create"
//                 className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
//               >
//                 <Plus className="w-5 h-5 mr-2" />
//                 Add New Asset
//               </Link>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//             <div className="flex flex-col sm:flex-row gap-4 flex-1">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Search by asset tag, asset name, category, or room name..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                 />
//               </div>
//               <div className="relative">
//                 <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <select
//                   value={selectedContract}
//                   onChange={(e) => setSelectedContract(e.target.value)}
//                   className="w-full sm:w-56 pl-10 pr-8 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition-all"
//                 >
//                   <option value="">All Contracts</option>
//                   {contracts.map((contract) => (
//                     <option
//                       key={contract.contractId}
//                       value={contract.contractId}
//                     >
//                       {contract.contractName}
//                     </option>
//                   ))}
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
//               </div>
//             </div>
//             <div className="flex gap-3">
//               <button
//                 onClick={handleRefresh}
//                 disabled={isRefreshing}
//                 className="p-3 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
//                 title="Refresh"
//               >
//                 <RefreshCw
//                   className={`w-5 h-5 text-gray-600 ${
//                     isRefreshing ? "animate-spin" : ""
//                   }`}
//                 />
//               </button>
//               <button
//                 onClick={handleExport}
//                 disabled={exporting || !selectedContract}
//                 className="inline-flex items-center px-4 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl hover:from-teal-700 hover:to-teal-800 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
//                 title="Export Excel"
//               >
//                 {exporting ? (
//                   <>
//                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                     Exporting...
//                   </>
//                 ) : (
//                   <>
//                     <FileSpreadsheet className="w-5 h-5 mr-2" />
//                     Export Excel
//                   </>
//                 )}
//               </button>
//               <button
//                 onClick={() => setShowBulkReportModal(true)}
//                 disabled={!selectedContract}
//                 className="inline-flex items-center px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
//                 title="Generate Asset Report"
//               >
//                 <FileDown className="w-5 h-5 mr-2" />
//                 Generate Asset Report
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
//                 <tr>
//                   <th scope="col" className="px-6 py-4 text-left">
//                     <button
//                       onClick={handleSelectAll}
//                       className="flex items-center text-xs font-bold text-gray-700 uppercase tracking-wider hover:text-blue-600 transition-colors"
//                     >
//                       {selectAll ? (
//                         <CheckSquare className="w-5 h-5 text-blue-600" />
//                       ) : (
//                         <Square className="w-5 h-5" />
//                       )}
//                       <span className="ml-2">Select</span>
//                     </button>
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
//                     onClick={() => handleSort("assetTag")}
//                   >
//                     <div className="flex items-center">
//                       Asset Tag
//                       {sortBy === "assetTag" && (
//                         <span className="ml-2 text-blue-600">
//                           {sortDirection === "asc" ? "↑" : "↓"}
//                         </span>
//                       )}
//                     </div>
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
//                     onClick={() => handleSort("assetName")}
//                   >
//                     <div className="flex items-center">
//                       Name
//                       {sortBy === "assetName" && (
//                         <span className="ml-2 text-blue-600">
//                           {sortDirection === "asc" ? "↑" : "↓"}
//                         </span>
//                       )}
//                     </div>
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
//                   >
//                     Category
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
//                   >
//                     Location
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
//                   >
//                     Serial Number
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
//                     onClick={() => handleSort("assetStatus")}
//                   >
//                     <div className="flex items-center">
//                       Status
//                       {sortBy === "assetStatus" && (
//                         <span className="ml-2 text-blue-600">
//                           {sortDirection === "asc" ? "↑" : "↓"}
//                         </span>
//                       )}
//                     </div>
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
//                     onClick={() => handleSort("createdAt")}
//                   >
//                     <div className="flex items-center">
//                       <Calendar className="w-4 h-4 mr-1" />
//                       Created Date
//                       {sortBy === "createdAt" && (
//                         <span className="ml-2 text-blue-600">
//                           {sortDirection === "asc" ? "↑" : "↓"}
//                         </span>
//                       )}
//                     </div>
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
//                   >
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {loading ? (
//                   <tr>
//                     <td colSpan="9" className="px-6 py-12 text-center">
//                       <div className="flex justify-center items-center">
//                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                         <span className="ml-3 text-lg font-medium text-gray-700">
//                           Loading assets...
//                         </span>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : paginatedAssets.length === 0 ? (
//                   <tr>
//                     <td colSpan="9" className="px-6 py-12 text-center">
//                       <div className="text-gray-500">
//                         <Building className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                         <p className="text-lg font-medium">No assets found</p>
//                         <p className="text-sm">
//                           Try adjusting your search or filter criteria
//                         </p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   paginatedAssets.map((asset, index) => (
//                     <tr
//                       key={asset.assetId}
//                       className={`hover:bg-blue-50 transition-colors ${
//                         index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                       }`}
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <button
//                           onClick={() => handleAssetSelection(asset.assetId)}
//                           className="text-blue-600 hover:text-blue-800 transition-colors"
//                         >
//                           {selectedAssets.includes(asset.assetId) ? (
//                             <CheckSquare className="w-5 h-5" />
//                           ) : (
//                             <Square className="w-5 h-5" />
//                           )}
//                         </button>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm font-bold text-gray-900">
//                           {asset.assetTag}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm font-medium text-gray-900">
//                           {asset.assetName}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center text-sm text-gray-600">
//                           <Tag className="w-4 h-4 mr-1 text-gray-400" />
//                           {asset.categoryName || "-"}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-600">
//                           <div className="flex items-center">
//                             <MapPin className="w-4 h-4 mr-1 text-gray-400" />
//                             {asset.buildingName}, {asset.floorName},{" "}
//                             {asset.roomName}
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-600">
//                           {asset.serialNumber || "-"}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span
//                           className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
//                             asset.assetStatus === "ACTIVE"
//                               ? "bg-green-100 text-green-800"
//                               : asset.assetStatus === "UNDER_MAINTENANCE"
//                               ? "bg-yellow-100 text-yellow-800"
//                               : asset.assetStatus === "DECOMMISSIONED"
//                               ? "bg-red-100 text-red-800"
//                               : "bg-gray-100 text-gray-800"
//                           }`}
//                         >
//                           {asset.assetStatus.replace("_", " ")}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-600">
//                           {asset.createdAt
//                             ? new Date(asset.createdAt).toLocaleDateString()
//                             : "-"}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex space-x-3">
//                           <Link
//                             to={`/assets/detail/${asset.assetId}`}
//                             className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded-lg transition-all"
//                             title="View Details"
//                           >
//                             <Eye className="w-5 h-5" />
//                           </Link>
//                           <Link
//                             to={`/assets/edit/${asset.assetId}`}
//                             className="p-2 text-green-600 hover:text-green-900 hover:bg-green-100 rounded-lg transition-all"
//                             title="Edit Asset"
//                           >
//                             <Edit className="w-5 h-5" />
//                           </Link>
//                           <button
//                             onClick={() => handleDelete(asset.assetId)}
//                             className="p-2 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-lg transition-all"
//                             title="Delete Asset"
//                           >
//                             <Trash2 className="w-5 h-5" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//           {!loading && (
//             <div className="bg-slate-50 px-4 py-3 border-t border-slate-200">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-4">
//                   <div className="text-xs text-slate-600">
//                     Showing{" "}
//                     <span className="font-medium">
//                       {currentPage * pageSize + 1}
//                     </span>{" "}
//                     to{" "}
//                     <span className="font-medium">
//                       {Math.min((currentPage + 1) * pageSize, totalElements)}
//                     </span>{" "}
//                     of <span className="font-medium">{totalElements}</span>{" "}
//                     assets
//                     {selectedAssets.length > 0 && (
//                       <span className="ml-4 text-blue-600 font-medium">
//                         {selectedAssets.length} selected
//                       </span>
//                     )}
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <label className="text-xs text-slate-600">Show:</label>
//                     <select
//                       value={pageSize}
//                       onChange={(e) =>
//                         handlePageSizeChange(Number(e.target.value))
//                       }
//                       className="text-xs border border-slate-300 rounded px-2 py-1 focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     >
//                       <option value={5}>5</option>
//                       <option value={10}>10</option>
//                       <option value={25}>25</option>
//                       <option value={50}>50</option>
//                       <option value={100}>100</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     disabled={currentPage === 0}
//                     className="inline-flex items-center px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                   >
//                     <ChevronLeft className="w-3 h-3" />
//                     Previous
//                   </button>
//                   <div className="flex items-center gap-1">
//                     {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                       let pageNum;
//                       if (totalPages <= 5) {
//                         pageNum = i;
//                       } else if (currentPage < 3) {
//                         pageNum = i;
//                       } else if (currentPage > totalPages - 4) {
//                         pageNum = totalPages - 5 + i;
//                       } else {
//                         pageNum = currentPage - 2 + i;
//                       }
//                       return (
//                         <button
//                           key={pageNum}
//                           onClick={() => handlePageChange(pageNum)}
//                           className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
//                             currentPage === pageNum
//                               ? "bg-slate-800 text-white"
//                               : "text-slate-700 bg-white border border-slate-300 hover:bg-slate-50"
//                           }`}
//                         >
//                           {pageNum + 1}
//                         </button>
//                       );
//                     })}
//                   </div>
//                   <button
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     disabled={currentPage >= totalPages - 1}
//                     className="inline-flex items-center px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                   >
//                     Next
//                     <ChevronRight className="w-3 h-3" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//         {showBulkReportModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-2xl font-bold text-gray-900">
//                   Generate Asset Report
//                 </h3>
//                 <button
//                   onClick={() => setShowBulkReportModal(false)}
//                   className="text-gray-500 hover:text-gray-700 text-2xl"
//                 >
//                   ×
//                 </button>
//               </div>
//               <div className="space-y-6">
//                 <div>
//                   <p className="text-gray-600 mb-4">
//                     Generate a comprehensive PDF report for selected assets with
//                     images.
//                   </p>
//                   <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
//                     <div className="flex">
//                       <FileDown className="h-5 w-5 text-blue-400" />
//                       <div className="ml-3">
//                         <p className="text-sm text-blue-700 font-medium">
//                           Report Features:
//                         </p>
//                         <ul className="list-disc pl-5 mt-1 text-sm text-blue-700">
//                           <li>Compressed PDF for smaller file size</li>
//                           <li>Detailed asset information</li>
//                           <li>Asset images included (up to 3 per asset)</li>
//                           <li>Multiple sub-services support</li>
//                           <li>Professional formatting</li>
//                           <li>Asset category information included</li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Paper Size
//                   </label>
//                   <select
//                     value={paperSize}
//                     onChange={(e) => setPaperSize(e.target.value)}
//                     className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
//                   >
//                     <option value="A4">A4 (210 × 297 mm)</option>
//                     <option value="A3">A3 (297 × 420 mm)</option>
//                   </select>
//                 </div>
//                 <div className="bg-gray-50 p-4 rounded-xl">
//                   <p className="text-sm text-gray-700">
//                     <strong>Selected Assets:</strong> {selectedAssets.length}
//                   </p>
//                   <p className="text-sm text-gray-700">
//                     <strong>Contract:</strong>{" "}
//                     {contracts.find(
//                       (c) => c.contractId.toString() === selectedContract
//                     )?.contractName || "None selected"}
//                   </p>
//                   <p className="text-sm text-gray-700">
//                     <strong>Paper Size:</strong> {paperSize}
//                   </p>
//                   <p className="text-sm text-gray-700">
//                     <strong>Images:</strong> Included (up to 3 per asset)
//                   </p>
//                 </div>
//               </div>
//               <div className="flex gap-3 mt-8">
//                 <button
//                   onClick={() => setShowBulkReportModal(false)}
//                   className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={generateBulkAssetReport}
//                   disabled={
//                     generatingBulkReport ||
//                     selectedAssets.length === 0 ||
//                     !selectedContract
//                   }
//                   className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
//                 >
//                   {generatingBulkReport ? (
//                     <>
//                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                       Generating...
//                     </>
//                   ) : (
//                     <>
//                       <FileDown className="w-5 h-5 mr-2" />
//                       Generate Report
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AssetList;

// "use client";

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   Edit,
//   Trash2,
//   Eye,
//   Search,
//   Filter,
//   RefreshCw,
//   ChevronDown,
//   ChevronLeft,
//   ChevronRight,
//   Plus,
//   Calendar,
//   MapPin,
//   Building,
//   ArrowLeft,
//   FileDown,
//   CheckSquare,
//   Square,
//   FileSpreadsheet,
//   Tag,
// } from "lucide-react";
// import { assetService } from "../services/assetService";
// import { contractService } from "../services/contractService";
// import { toast } from "react-toastify";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// const AssetList = () => {
//   const [assets, setAssets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [contracts, setContracts] = useState([]);
//   const [selectedContract, setSelectedContract] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   const [sortBy, setSortBy] = useState("createdAt");
//   const [sortDirection, setSortDirection] = useState("desc");
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [exporting, setExporting] = useState(false);
//   const [showBulkReportModal, setShowBulkReportModal] = useState(false);
//   const [selectedAssets, setSelectedAssets] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const [paperSize, setPaperSize] = useState("A4");
//   const [generatingBulkReport, setGeneratingBulkReport] = useState(false);
//   const [totalElements, setTotalElements] = useState(0);

//   useEffect(() => {
//     loadContracts();
//     loadAssets();
//   }, [currentPage, pageSize, sortBy, sortDirection, selectedContract]);

//   const loadContracts = async () => {
//     try {
//       const response = await contractService.getAllContracts();
//       setContracts(response.data || []);
//     } catch (error) {
//       console.error("Error loading contracts:", error);
//       toast.error("Failed to load contracts");
//     }
//   };

//   const loadAssets = async () => {
//     setLoading(true);
//     try {
//       let response;
//       if (selectedContract) {
//         response = await assetService.getAssetsByContract(selectedContract);
//         setAssets(response.data.content || []);
//         setTotalElements(response.data.totalElements || 0);
//         setTotalPages(response.data.totalPages || 0);
//       } else {
//         const pageable = {
//           page: currentPage,
//           size: pageSize,
//           sort: `${sortBy},${sortDirection}`,
//         };
//         response = await assetService.getAllAssets(pageable);
//         setAssets(response.data.content || []);
//         setTotalElements(response.data.totalElements || 0);
//         setTotalPages(response.data.totalPages || 0);
//       }
//     } catch (error) {
//       console.error("Error loading assets:", error);
//       toast.error("Failed to load assets");
//       setAssets([]); // Fallback to empty array on error
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     try {
//       await loadAssets();
//       toast.success("Assets refreshed successfully");
//     } finally {
//       setTimeout(() => setIsRefreshing(false), 500);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this asset?")) {
//       try {
//         await assetService.deleteAsset(id);
//         toast.success("Asset deleted successfully");
//         loadAssets();
//       } catch (error) {
//         console.error("Error deleting asset:", error);
//         toast.error("Failed to delete asset");
//       }
//     }
//   };

//   const handleSort = (field) => {
//     if (sortBy === field) {
//       setSortDirection(sortDirection === "asc" ? "desc" : "asc");
//     } else {
//       setSortBy(field);
//       setSortDirection("asc");
//     }
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage >= 0 && newPage < totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   const handlePageSizeChange = (newSize) => {
//     setPageSize(newSize);
//     setCurrentPage(0);
//   };

//   const handleExport = async () => {
//     if (!selectedContract) {
//       toast.error("Please select a contract to export assets");
//       return;
//     }
//     setExporting(true);
//     try {
//       const response = await assetService.exportAssetsExcel(selectedContract);
//       const blob = new Blob([response.data], {
//         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       });
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = `assets-contract-${selectedContract}-${
//         new Date().toISOString().split("T")[0]
//       }.xlsx`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//       toast.success("Assets exported to Excel successfully");
//     } catch (error) {
//       console.error("Error exporting assets to Excel:", error);
//       toast.error("Failed to export assets to Excel. Please try again.");
//     } finally {
//       setExporting(false);
//     }
//   };

//   const handleAssetSelection = (assetId) => {
//     setSelectedAssets((prev) => {
//       if (prev.includes(assetId)) {
//         return prev.filter((id) => id !== assetId);
//       } else {
//         return [...prev, assetId];
//       }
//     });
//   };

//   const handleSelectAll = () => {
//     if (selectAll) {
//       setSelectedAssets([]);
//       setSelectAll(false);
//     } else {
//       setSelectedAssets(filteredAssets.map((asset) => asset.assetId));
//       setSelectAll(true);
//     }
//   };

//   const getImageAsBase64 = async (imageUrl) => {
//     try {
//       const response = await fetch(imageUrl, { mode: "cors" });
//       const blob = await response.blob();
//       return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onloadend = () => resolve(reader.result);
//         reader.onerror = reject;
//         reader.readAsDataURL(blob);
//       });
//     } catch (error) {
//       console.error("Error converting image to base64:", error);
//       return null;
//     }
//   };

//   const generateBulkAssetReport = async () => {
//     if (!selectedContract) {
//       toast.error("Please select a contract first");
//       return;
//     }
//     if (selectedAssets.length === 0) {
//       toast.error("Please select at least one asset");
//       return;
//     }
//     setGeneratingBulkReport(true);
//     try {
//       const assetPromises = selectedAssets.map((assetId) =>
//         assetService.getAssetById(assetId)
//       );
//       const assetResponses = await Promise.all(assetPromises);
//       const detailedAssets = assetResponses.map((response) => response.data);
//       const doc = new jsPDF({
//         orientation: "portrait",
//         unit: "mm",
//         format: paperSize.toLowerCase(),
//         compress: true,
//       });
//       doc.setProperties({
//         title: `Asset Report - Contract ${selectedContract}`,
//         subject: "Asset Management Report",
//         author: "CAFM UAE System",
//         creator: "CAFM UAE System",
//       });
//       doc.setFontSize(24);
//       doc.setTextColor(40, 116, 240);
//       doc.text("Bulk Asset Report", 20, 25);
//       doc.setFontSize(12);
//       doc.setTextColor(100, 100, 100);
//       doc.text(
//         `Contract: ${
//           contracts.find((c) => c.contractId.toString() === selectedContract)
//             ?.contractName || "Unknown"
//         }`,
//         20,
//         35
//       );
//       doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 42);
//       doc.text(`Total Assets: ${selectedAssets.length}`, 20, 49);
//       doc.text(`Paper Size: ${paperSize}`, 20, 56);
//       doc.setDrawColor(200, 200, 200);
//       doc.line(20, 62, paperSize === "A3" ? 277 : 190, 62);
//       let yPosition = 75;
//       const pageHeight = paperSize === "A3" ? 420 : 297;
//       const pageWidth = paperSize === "A3" ? 297 : 210;
//       for (let i = 0; i < detailedAssets.length; i++) {
//         const asset = detailedAssets[i];
//         if (yPosition > pageHeight - 150) {
//           doc.addPage();
//           yPosition = 20;
//         }
//         doc.setFontSize(16);
//         doc.setTextColor(40, 116, 240);
//         doc.text(`Asset ${i + 1}: ${asset.assetTag}`, 20, yPosition);
//         yPosition += 10;
//         if (asset.imageUrls && asset.imageUrls.length > 0) {
//           const imageWidth = 40;
//           const imageHeight = 30;
//           let imageX = 20;
//           let imagesAdded = 0;
//           const maxImagesPerRow = Math.floor(
//             (pageWidth - 40) / (imageWidth + 5)
//           );
//           for (const imageUrl of asset.imageUrls.slice(0, 3)) {
//             try {
//               const base64Image = await getImageAsBase64(imageUrl);
//               if (base64Image) {
//                 if (imagesAdded > 0 && imagesAdded % maxImagesPerRow === 0) {
//                   yPosition += imageHeight + 5;
//                   imageX = 20;
//                   if (yPosition + imageHeight > pageHeight - 50) {
//                     doc.addPage();
//                     yPosition = 20;
//                   }
//                 }
//                 doc.addImage(
//                   base64Image,
//                   "JPEG",
//                   imageX,
//                   yPosition,
//                   imageWidth,
//                   imageHeight
//                 );
//                 imageX += imageWidth + 5;
//                 imagesAdded++;
//               }
//             } catch (error) {
//               console.error("Error adding image to PDF:", error);
//             }
//           }
//           if (imagesAdded > 0) {
//             yPosition += imageHeight + 15;
//           }
//         }
//         if (yPosition > pageHeight - 100) {
//           doc.addPage();
//           yPosition = 20;
//         }
//         const basicInfo = [
//           ["Asset Name", asset.assetName || "-"],
//           ["Serial Number", asset.serialNumber || "-"],
//           ["Brand", asset.brandName || "-"],
//           ["Model", asset.modelNumber || "-"],
//           ["Category", asset.categoryName || "-"],
//           ["Status", asset.assetStatus || "-"],
//           ["Condition", asset.assetCondition || "-"],
//           ["Owner Type", asset.ownerType || "-"],
//         ];
//         autoTable(doc, {
//           startY: yPosition,
//           head: [["Property", "Value"]],
//           body: basicInfo,
//           theme: "grid",
//           headStyles: {
//             fillColor: [40, 116, 240],
//             textColor: 255,
//             fontSize: 9,
//             fontStyle: "bold",
//           },
//           bodyStyles: {
//             fontSize: 8,
//             textColor: 50,
//           },
//           columnStyles: {
//             0: { cellWidth: 40, fontStyle: "bold" },
//             1: { cellWidth: paperSize === "A3" ? 120 : 80 },
//           },
//           margin: { left: 20, right: 20 },
//         });
//         yPosition = doc.lastAutoTable.finalY + 10;
//         if (yPosition > pageHeight - 60) {
//           doc.addPage();
//           yPosition = 20;
//         }
//         const locationInfo = [
//           ["Zone", asset.zoneName || "-"],
//           ["Sub Zone", asset.subZoneName || "-"],
//           ["Building", asset.buildingName || "-"],
//           ["Villa/Apartment", asset.villaApartmentName || "-"],
//           ["Floor", asset.floorName || "-"],
//           ["Room", asset.roomName || "-"],
//         ];
//         autoTable(doc, {
//           startY: yPosition,
//           head: [["Location", "Value"]],
//           body: locationInfo,
//           theme: "grid",
//           headStyles: {
//             fillColor: [34, 197, 94],
//             textColor: 255,
//             fontSize: 9,
//             fontStyle: "bold",
//           },
//           bodyStyles: {
//             fontSize: 8,
//             textColor: 50,
//           },
//           columnStyles: {
//             0: { cellWidth: 40, fontStyle: "bold" },
//             1: { cellWidth: paperSize === "A3" ? 120 : 80 },
//           },
//           margin: { left: 20, right: 20 },
//         });
//         yPosition = doc.lastAutoTable.finalY + 10;
//         if (yPosition > pageHeight - 60) {
//           doc.addPage();
//           yPosition = 20;
//         }
//         const serviceInfo = [];
//         if (asset.subServices && asset.subServices.length > 0) {
//           asset.subServices.forEach((subService, index) => {
//             serviceInfo.push([
//               `Sub-Service ${index + 1}`,
//               subService.subServiceName || "-",
//             ]);
//             if (
//               subService.serviceScopeNames &&
//               subService.serviceScopeNames.length > 0
//             ) {
//               serviceInfo.push([
//                 `Service Scopes ${index + 1}`,
//                 subService.serviceScopeNames.join(", "),
//               ]);
//             }
//           });
//         } else {
//           serviceInfo.push(["Sub-Services", "No sub-services assigned"]);
//         }
//         autoTable(doc, {
//           startY: yPosition,
//           head: [["Service Information", "Value"]],
//           body: serviceInfo,
//           theme: "grid",
//           headStyles: {
//             fillColor: [147, 51, 234],
//             textColor: 255,
//             fontSize: 9,
//             fontStyle: "bold",
//           },
//           bodyStyles: {
//             fontSize: 8,
//             textColor: 50,
//           },
//           columnStyles: {
//             0: { cellWidth: 40, fontStyle: "bold" },
//             1: { cellWidth: paperSize === "A3" ? 120 : 80 },
//           },
//           margin: { left: 20, right: 20 },
//         });
//         yPosition = doc.lastAutoTable.finalY + 15;
//         if (i < detailedAssets.length - 1) {
//           doc.setDrawColor(200, 200, 200);
//           doc.line(20, yPosition, pageWidth - 20, yPosition);
//           yPosition += 10;
//         }
//       }
//       const pageCount = doc.internal.getNumberOfPages();
//       for (let i = 1; i <= pageCount; i++) {
//         doc.setPage(i);
//         doc.setFontSize(8);
//         doc.setTextColor(150, 150, 150);
//         doc.text(`Page ${i} of ${pageCount}`, 20, pageHeight - 10);
//         doc.text(
//           "Generated by CAFM UAE System",
//           pageWidth - 80,
//           pageHeight - 10
//         );
//       }
//       const fileName = `bulk-asset-report-${selectedContract}-${paperSize}-${
//         new Date().toISOString().split("T")[0]
//       }.pdf`;
//       doc.save(fileName);
//       toast.success(
//         `Bulk asset report with images generated successfully (${paperSize} format)`
//       );
//       setShowBulkReportModal(false);
//       setSelectedAssets([]);
//       setSelectAll(false);
//     } catch (error) {
//       console.error("Error generating bulk report:", error);
//       toast.error("Failed to generate bulk asset report");
//     } finally {
//       setGeneratingBulkReport(false);
//     }
//   };

//   const filteredAssets = assets.filter((asset) => {
//     if (!searchTerm) return true;
//     const searchLower = searchTerm.toLowerCase();
//     return (
//       asset.assetName?.toLowerCase().includes(searchLower) ||
//       asset.assetTag?.toLowerCase().includes(searchLower) ||
//       asset.roomName?.toLowerCase().includes(searchLower) ||
//       asset.categoryName?.toLowerCase().includes(searchLower)
//     );
//   });

//   const paginatedAssets = selectedContract
//     ? filteredAssets.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
//     : filteredAssets;

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <div className="max-w-[1600px] mx-auto p-6">
//         {/* Header */}
//         <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
//           <div className="flex justify-between items-start">
//             <div className="flex items-start space-x-4">
//               <div className="p-3 bg-slate-800 rounded-lg shadow-sm">
//                 <Building className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-slate-900 mb-1">
//                   Asset Management
//                 </h1>
//                 <p className="text-slate-600 text-sm">
//                   View and manage all assets in your inventory
//                 </p>
//               </div>
//             </div>
//             <div className="flex gap-3">
//               <Link
//                 to="/assets"
//                 className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
//               >
//                 <ArrowLeft className="w-4 h-4 mr-2" />
//                 Back
//               </Link>
//               <Link
//                 to="/assets/create"
//                 className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-slate-800 border border-transparent rounded-lg hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
//               >
//                 <Plus className="w-4 h-4 mr-2" />
//                 Add New Asset
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Filters and Controls */}
//         <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
//           <div className="flex flex-col gap-4">
//             {/* Search and Filter Row */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
//                 <input
//                   type="text"
//                   placeholder="Search by asset tag, name, category, or room..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors"
//                 />
//               </div>
//               <div className="relative">
//                 <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
//                 <select
//                   value={selectedContract}
//                   onChange={(e) => setSelectedContract(e.target.value)}
//                   className="pl-10 pr-8 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 appearance-none min-w-48"
//                 >
//                   <option value="">All Contracts</option>
//                   {contracts.map((contract) => (
//                     <option
//                       key={contract.contractId}
//                       value={contract.contractId}
//                     >
//                       {contract.contractName}
//                     </option>
//                   ))}
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={handleRefresh}
//                   disabled={isRefreshing}
//                   className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
//                   title="Refresh"
//                 >
//                   <RefreshCw
//                     className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
//                   />
//                 </button>
//                 <button
//                   onClick={handleExport}
//                   disabled={exporting || !selectedContract}
//                   className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-lg hover:bg-teal-700 disabled:opacity-50 transition-colors"
//                   title="Export Excel"
//                 >
//                   {exporting ? (
//                     <>
//                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                       Exporting...
//                     </>
//                   ) : (
//                     <>
//                       <FileSpreadsheet className="w-4 h-4 mr-2" />
//                       Export Excel
//                     </>
//                   )}
//                 </button>
//                 <button
//                   onClick={() => setShowBulkReportModal(true)}
//                   disabled={!selectedContract}
//                   className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
//                   title="Generate Asset Report"
//                 >
//                   <FileDown className="w-4 h-4 mr-2" />
//                   Generate Report
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-slate-200">
//               <thead className="bg-slate-50">
//                 <tr>
//                   <th scope="col" className="px-4 py-3 text-left">
//                     <button
//                       onClick={handleSelectAll}
//                       className="flex items-center text-xs font-semibold text-slate-700 uppercase tracking-wider hover:text-slate-900 transition-colors"
//                     >
//                       {selectAll ? (
//                         <CheckSquare className="w-4 h-4 text-slate-600" />
//                       ) : (
//                         <Square className="w-4 h-4" />
//                       )}
//                       <span className="ml-2">Select</span>
//                     </button>
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
//                     onClick={() => handleSort("assetTag")}
//                   >
//                     <div className="flex items-center">
//                       Asset Tag
//                       {sortBy === "assetTag" && (
//                         <span className="ml-2 text-slate-600">
//                           {sortDirection === "asc" ? "↑" : "↓"}
//                         </span>
//                       )}
//                     </div>
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
//                     onClick={() => handleSort("assetName")}
//                   >
//                     <div className="flex items-center">
//                       Asset Name
//                       {sortBy === "assetName" && (
//                         <span className="ml-2 text-slate-600">
//                           {sortDirection === "asc" ? "↑" : "↓"}
//                         </span>
//                       )}
//                     </div>
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider"
//                   >
//                     Category
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider"
//                   >
//                     Location
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider"
//                   >
//                     Serial Number
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
//                     onClick={() => handleSort("assetStatus")}
//                   >
//                     <div className="flex items-center">
//                       Status
//                       {sortBy === "assetStatus" && (
//                         <span className="ml-2 text-slate-600">
//                           {sortDirection === "asc" ? "↑" : "↓"}
//                         </span>
//                       )}
//                     </div>
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
//                     onClick={() => handleSort("createdAt")}
//                   >
//                     <div className="flex items-center">
//                       <Calendar className="w-4 h-4 mr-1" />
//                       Created Date
//                       {sortBy === "createdAt" && (
//                         <span className="ml-2 text-slate-600">
//                           {sortDirection === "asc" ? "↑" : "↓"}
//                         </span>
//                       )}
//                     </div>
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider"
//                   >
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-slate-100">
//                 {loading ? (
//                   <tr>
//                     <td colSpan="9" className="px-4 py-12 text-center">
//                       <div className="flex justify-center items-center">
//                         <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-600"></div>
//                         <span className="ml-3 text-sm font-medium text-slate-600">
//                           Loading assets...
//                         </span>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : paginatedAssets.length === 0 ? (
//                   <tr>
//                     <td colSpan="9" className="px-4 py-12 text-center">
//                       <div className="text-slate-500">
//                         <Building className="w-8 h-8 mx-auto mb-3 text-slate-300" />
//                         <p className="text-sm font-medium">No assets found</p>
//                         <p className="text-xs text-slate-400 mt-1">
//                           Try adjusting your search or filter criteria
//                         </p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   paginatedAssets.map((asset, index) => (
//                     <tr
//                       key={asset.assetId}
//                       className={`hover:bg-slate-50 transition-colors ${
//                         index % 2 === 0 ? "bg-white" : "bg-slate-25"
//                       }`}
//                     >
//                       <td className="px-4 py-4 whitespace-nowrap">
//                         <button
//                           onClick={() => handleAssetSelection(asset.assetId)}
//                           className="text-slate-600 hover:text-slate-800 transition-colors"
//                         >
//                           {selectedAssets.includes(asset.assetId) ? (
//                             <CheckSquare className="w-4 h-4" />
//                           ) : (
//                             <Square className="w-4 h-4" />
//                           )}
//                         </button>
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap">
//                         <div className="text-sm font-semibold text-slate-900">
//                           {asset.assetTag}
//                         </div>
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap">
//                         <div className="text-sm font-medium text-slate-900">
//                           {asset.assetName}
//                         </div>
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap">
//                         <div className="flex items-center text-sm text-slate-600">
//                           <Tag className="w-4 h-4 mr-1 text-slate-400" />
//                           {asset.categoryName || "-"}
//                         </div>
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap">
//                         <div className="text-sm text-slate-600">
//                           <div className="flex items-center">
//                             <MapPin className="w-4 h-4 mr-1 text-slate-400" />
//                             {asset.buildingName}, {asset.floorName},{" "}
//                             {asset.roomName}
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap">
//                         <div className="text-sm text-slate-600">
//                           {asset.serialNumber || "-"}
//                         </div>
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap">
//                         <span
//                           className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-md border ${
//                             asset.assetStatus === "ACTIVE"
//                               ? "bg-emerald-50 text-emerald-700 border-emerald-200"
//                               : asset.assetStatus === "UNDER_MAINTENANCE"
//                               ? "bg-amber-50 text-amber-700 border-amber-200"
//                               : asset.assetStatus === "DECOMMISSIONED"
//                               ? "bg-red-50 text-red-700 border-red-200"
//                               : "bg-slate-50 text-slate-700 border-slate-200"
//                           }`}
//                         >
//                           {asset.assetStatus?.replace("_", " ")}
//                         </span>
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap">
//                         <div className="text-xs text-slate-600">
//                           {asset.createdAt
//                             ? new Date(asset.createdAt).toLocaleDateString()
//                             : "-"}
//                         </div>
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap">
//                         <div className="flex space-x-2">
//                           <Link
//                             to={`/assets/detail/${asset.assetId}`}
//                             className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
//                             title="View Details"
//                           >
//                             <Eye className="w-4 h-4" />
//                           </Link>
//                           <Link
//                             to={`/assets/edit/${asset.assetId}`}
//                             className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
//                             title="Edit Asset"
//                           >
//                             <Edit className="w-4 h-4" />
//                           </Link>
//                           <button
//                             onClick={() => handleDelete(asset.assetId)}
//                             className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
//                             title="Delete Asset"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           {!loading && (
//             <div className="bg-slate-50 px-4 py-3 border-t border-slate-200">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-4">
//                   <div className="text-xs text-slate-600">
//                     Showing{" "}
//                     <span className="font-medium">
//                       {currentPage * pageSize + 1}
//                     </span>{" "}
//                     to{" "}
//                     <span className="font-medium">
//                       {Math.min((currentPage + 1) * pageSize, totalElements)}
//                     </span>{" "}
//                     of <span className="font-medium">{totalElements}</span>{" "}
//                     assets
//                     {selectedAssets.length > 0 && (
//                       <span className="ml-4 text-slate-600 font-medium">
//                         {selectedAssets.length} selected
//                       </span>
//                     )}
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <label className="text-xs text-slate-600">Show:</label>
//                     <select
//                       value={pageSize}
//                       onChange={(e) =>
//                         handlePageSizeChange(Number(e.target.value))
//                       }
//                       className="text-xs border border-slate-300 rounded px-2 py-1 focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     >
//                       <option value={5}>5</option>
//                       <option value={10}>10</option>
//                       <option value={25}>25</option>
//                       <option value={50}>50</option>
//                       <option value={100}>100</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     disabled={currentPage === 0}
//                     className="inline-flex items-center px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                   >
//                     <ChevronLeft className="w-3 h-3" />
//                     Previous
//                   </button>
//                   <div className="flex items-center gap-1">
//                     {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                       let pageNum;
//                       if (totalPages <= 5) {
//                         pageNum = i;
//                       } else if (currentPage < 3) {
//                         pageNum = i;
//                       } else if (currentPage > totalPages - 4) {
//                         pageNum = totalPages - 5 + i;
//                       } else {
//                         pageNum = currentPage - 2 + i;
//                       }
//                       return (
//                         <button
//                           key={pageNum}
//                           onClick={() => handlePageChange(pageNum)}
//                           className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
//                             currentPage === pageNum
//                               ? "bg-slate-800 text-white"
//                               : "text-slate-700 bg-white border border-slate-300 hover:bg-slate-50"
//                           }`}
//                         >
//                           {pageNum + 1}
//                         </button>
//                       );
//                     })}
//                   </div>
//                   <button
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     disabled={currentPage >= totalPages - 1}
//                     className="inline-flex items-center px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                   >
//                     Next
//                     <ChevronRight className="w-3 h-3" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Bulk Report Modal */}
//         {showBulkReportModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
//               <div className="flex justify-between items-center p-6 border-b border-slate-200">
//                 <h3 className="text-lg font-semibold text-slate-900">
//                   Generate Asset Report
//                 </h3>
//                 <button
//                   onClick={() => setShowBulkReportModal(false)}
//                   className="text-slate-400 hover:text-slate-600 transition-colors"
//                 >
//                   ×
//                 </button>
//               </div>
//               <div className="p-6 space-y-6">
//                 <div>
//                   <p className="text-slate-600 mb-4">
//                     Generate a comprehensive PDF report for selected assets with
//                     images.
//                   </p>
//                   <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
//                     <div className="flex">
//                       <FileDown className="h-5 w-5 text-blue-400" />
//                       <div className="ml-3">
//                         <p className="text-sm text-blue-700 font-medium">
//                           Report Features:
//                         </p>
//                         <ul className="list-disc pl-5 mt-1 text-sm text-blue-700">
//                           <li>Compressed PDF for smaller file size</li>
//                           <li>Detailed asset information</li>
//                           <li>Asset images included (up to 3 per asset)</li>
//                           <li>Multiple sub-services support</li>
//                           <li>Professional formatting</li>
//                           <li>Asset category information included</li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 mb-2">
//                     Paper Size
//                   </label>
//                   <select
//                     value={paperSize}
//                     onChange={(e) => setPaperSize(e.target.value)}
//                     className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                   >
//                     <option value="A4">A4 (210 × 297 mm)</option>
//                     <option value="A3">A3 (297 × 420 mm)</option>
//                   </select>
//                 </div>
//                 <div className="bg-slate-50 p-4 rounded-lg">
//                   <p className="text-sm text-slate-700">
//                     <strong>Selected Assets:</strong> {selectedAssets.length}
//                   </p>
//                   <p className="text-sm text-slate-700">
//                     <strong>Contract:</strong>{" "}
//                     {contracts.find(
//                       (c) => c.contractId.toString() === selectedContract
//                     )?.contractName || "None selected"}
//                   </p>
//                   <p className="text-sm text-slate-700">
//                     <strong>Paper Size:</strong> {paperSize}
//                   </p>
//                   <p className="text-sm text-slate-700">
//                     <strong>Images:</strong> Included (up to 3 per asset)
//                   </p>
//                 </div>
//               </div>
//               <div className="flex gap-3 p-6 border-t border-slate-200">
//                 <button
//                   onClick={() => setShowBulkReportModal(false)}
//                   className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={generateBulkAssetReport}
//                   disabled={
//                     generatingBulkReport ||
//                     selectedAssets.length === 0 ||
//                     !selectedContract
//                   }
//                   className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
//                 >
//                   {generatingBulkReport ? (
//                     <>
//                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                       Generating...
//                     </>
//                   ) : (
//                     <>
//                       <FileDown className="w-4 h-4 mr-2" />
//                       Generate Report
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AssetList;

// "use client";

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   Edit,
//   Trash2,
//   Eye,
//   Search,
//   Filter,
//   RefreshCw,
//   ChevronDown,
//   ChevronLeft,
//   ChevronRight,
//   Plus,
//   Calendar,
//   MapPin,
//   Building,
//   ArrowLeft,
//   FileDown,
//   CheckSquare,
//   Square,
//   FileSpreadsheet,
//   Tag,
// } from "lucide-react";
// import { assetService } from "../services/assetService";
// import { contractService } from "../services/contractService";
// import { toast } from "react-toastify";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// const AssetList = () => {
//   const [assets, setAssets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [contracts, setContracts] = useState([]);
//   const [selectedContract, setSelectedContract] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   const [sortBy, setSortBy] = useState("createdAt");
//   const [sortDirection, setSortDirection] = useState("desc");
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [exporting, setExporting] = useState(false);
//   const [showBulkReportModal, setShowBulkReportModal] = useState(false);
//   const [selectedAssets, setSelectedAssets] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const [paperSize, setPaperSize] = useState("A4");
//   const [generatingBulkReport, setGeneratingBulkReport] = useState(false);
//   const [totalElements, setTotalElements] = useState(0);

//   useEffect(() => {
//     loadContracts();
//     loadAssets();
//   }, [
//     currentPage,
//     pageSize,
//     sortBy,
//     sortDirection,
//     selectedContract,
//     searchTerm,
//   ]);

//   useEffect(() => {
//     setCurrentPage(0);
//   }, [searchTerm, selectedContract, sortBy, sortDirection]);

//   const loadContracts = async () => {
//     try {
//       const response = await contractService.getAllContracts();
//       setContracts(response.data || []);
//     } catch (error) {
//       console.error("Error loading contracts:", error);
//       toast.error("Failed to load contracts");
//     }
//   };

//   const loadAssets = async () => {
//     setLoading(true);
//     try {
//       const pageable = {
//         page: currentPage,
//         size: pageSize,
//         sort: `${sortBy},${sortDirection}`,
//       };
//       if (searchTerm) {
//         pageable.search = searchTerm;
//       }
//       let response;
//       if (selectedContract) {
//         response = await assetService.getAssetsByContract(
//           selectedContract,
//           pageable
//         );
//       } else {
//         response = await assetService.getAllAssets(pageable);
//       }
//       setAssets(response.data.content || []);
//       setTotalElements(response.data.totalElements || 0);
//       setTotalPages(response.data.totalPages || 0);
//     } catch (error) {
//       console.error("Error loading assets:", error);
//       toast.error("Failed to load assets");
//       setAssets([]); // Fallback to empty array on error
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     try {
//       await loadAssets();
//       toast.success("Assets refreshed successfully");
//     } finally {
//       setTimeout(() => setIsRefreshing(false), 500);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this asset?")) {
//       try {
//         await assetService.deleteAsset(id);
//         toast.success("Asset deleted successfully");
//         loadAssets();
//       } catch (error) {
//         console.error("Error deleting asset:", error);
//         toast.error("Failed to delete asset");
//       }
//     }
//   };

//   const handleSort = (field) => {
//     if (sortBy === field) {
//       setSortDirection(sortDirection === "asc" ? "desc" : "asc");
//     } else {
//       setSortBy(field);
//       setSortDirection("asc");
//     }
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage >= 0 && newPage < totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   const handlePageSizeChange = (newSize) => {
//     setPageSize(newSize);
//     setCurrentPage(0);
//   };

//   const handleExport = async () => {
//     if (!selectedContract) {
//       toast.error("Please select a contract to export assets");
//       return;
//     }
//     setExporting(true);
//     try {
//       const response = await assetService.exportAssetsExcel(selectedContract);
//       const blob = new Blob([response.data], {
//         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       });
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = `assets-contract-${selectedContract}-${
//         new Date().toISOString().split("T")[0]
//       }.xlsx`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//       toast.success("Assets exported to Excel successfully");
//     } catch (error) {
//       console.error("Error exporting assets to Excel:", error);
//       toast.error("Failed to export assets to Excel. Please try again.");
//     } finally {
//       setExporting(false);
//     }
//   };

//   const handleAssetSelection = (assetId) => {
//     setSelectedAssets((prev) => {
//       if (prev.includes(assetId)) {
//         return prev.filter((id) => id !== assetId);
//       } else {
//         return [...prev, assetId];
//       }
//     });
//   };

//   const handleSelectAll = () => {
//     if (selectAll) {
//       setSelectedAssets([]);
//       setSelectAll(false);
//     } else {
//       setSelectedAssets(assets.map((asset) => asset.assetId));
//       setSelectAll(true);
//     }
//   };

//   const getImageAsBase64 = async (imageUrl) => {
//     try {
//       const response = await fetch(imageUrl, { mode: "cors" });
//       const blob = await response.blob();
//       return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onloadend = () => resolve(reader.result);
//         reader.onerror = reject;
//         reader.readAsDataURL(blob);
//       });
//     } catch (error) {
//       console.error("Error converting image to base64:", error);
//       return null;
//     }
//   };

//   const generateBulkAssetReport = async () => {
//     if (!selectedContract) {
//       toast.error("Please select a contract first");
//       return;
//     }
//     if (selectedAssets.length === 0) {
//       toast.error("Please select at least one asset");
//       return;
//     }
//     setGeneratingBulkReport(true);
//     try {
//       const assetPromises = selectedAssets.map((assetId) =>
//         assetService.getAssetById(assetId)
//       );
//       const assetResponses = await Promise.all(assetPromises);
//       const detailedAssets = assetResponses.map((response) => response.data);

//       const doc = new jsPDF({
//         orientation: "portrait",
//         unit: "mm",
//         format: paperSize.toLowerCase(),
//         compress: true,
//       });

//       doc.setProperties({
//         title: `Asset Report - Contract ${selectedContract}`,
//         subject: "Asset Management Report",
//         author: "CAFM UAE System",
//         creator: "CAFM UAE System",
//       });

//       doc.setFontSize(24);
//       doc.setTextColor(40, 116, 240);
//       doc.text("Bulk Asset Report", 20, 25);

//       doc.setFontSize(12);
//       doc.setTextColor(100, 100, 100);
//       doc.text(
//         `Contract: ${
//           contracts.find((c) => c.contractId.toString() === selectedContract)
//             ?.contractName || "Unknown"
//         }`,
//         20,
//         35
//       );
//       doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 42);
//       doc.text(`Total Assets: ${selectedAssets.length}`, 20, 49);
//       doc.text(`Paper Size: ${paperSize}`, 20, 56);

//       doc.setDrawColor(200, 200, 200);
//       doc.line(20, 62, paperSize === "A3" ? 277 : 190, 62);

//       let yPosition = 75;
//       const pageHeight = paperSize === "A3" ? 420 : 297;
//       const pageWidth = paperSize === "A3" ? 297 : 210;

//       for (let i = 0; i < detailedAssets.length; i++) {
//         const asset = detailedAssets[i];

//         if (yPosition > pageHeight - 150) {
//           doc.addPage();
//           yPosition = 20;
//         }

//         doc.setFontSize(16);
//         doc.setTextColor(40, 116, 240);
//         doc.text(`Asset ${i + 1}: ${asset.assetTag}`, 20, yPosition);
//         yPosition += 10;

//         if (asset.imageUrls && asset.imageUrls.length > 0) {
//           const imageWidth = 40;
//           const imageHeight = 30;
//           let imageX = 20;
//           let imagesAdded = 0;
//           const maxImagesPerRow = Math.floor(
//             (pageWidth - 40) / (imageWidth + 5)
//           );

//           for (const imageUrl of asset.imageUrls.slice(0, 3)) {
//             try {
//               const base64Image = await getImageAsBase64(imageUrl);
//               if (base64Image) {
//                 if (imagesAdded > 0 && imagesAdded % maxImagesPerRow === 0) {
//                   yPosition += imageHeight + 5;
//                   imageX = 20;
//                   if (yPosition + imageHeight > pageHeight - 50) {
//                     doc.addPage();
//                     yPosition = 20;
//                   }
//                 }
//                 doc.addImage(
//                   base64Image,
//                   "JPEG",
//                   imageX,
//                   yPosition,
//                   imageWidth,
//                   imageHeight
//                 );
//                 imageX += imageWidth + 5;
//                 imagesAdded++;
//               }
//             } catch (error) {
//               console.error("Error adding image to PDF:", error);
//             }
//           }

//           if (imagesAdded > 0) {
//             yPosition += imageHeight + 15;
//           }
//         }

//         if (yPosition > pageHeight - 100) {
//           doc.addPage();
//           yPosition = 20;
//         }

//         const basicInfo = [
//           ["Asset Name", asset.assetName || "-"],
//           ["Serial Number", asset.serialNumber || "-"],
//           ["Brand", asset.brandName || "-"],
//           ["Model", asset.modelNumber || "-"],
//           ["Category", asset.categoryName || "-"],
//           ["Status", asset.assetStatus || "-"],
//           ["Condition", asset.assetCondition || "-"],
//           ["Owner Type", asset.ownerType || "-"],
//         ];

//         autoTable(doc, {
//           startY: yPosition,
//           head: [["Property", "Value"]],
//           body: basicInfo,
//           theme: "grid",
//           headStyles: {
//             fillColor: [40, 116, 240],
//             textColor: 255,
//             fontSize: 9,
//             fontStyle: "bold",
//           },
//           bodyStyles: {
//             fontSize: 8,
//             textColor: 50,
//           },
//           columnStyles: {
//             0: { cellWidth: 40, fontStyle: "bold" },
//             1: { cellWidth: paperSize === "A3" ? 120 : 80 },
//           },
//           margin: { left: 20, right: 20 },
//         });

//         yPosition = doc.lastAutoTable.finalY + 10;

//         if (yPosition > pageHeight - 60) {
//           doc.addPage();
//           yPosition = 20;
//         }

//         const locationInfo = [
//           ["Zone", asset.zoneName || "-"],
//           ["Sub Zone", asset.subZoneName || "-"],
//           ["Building", asset.buildingName || "-"],
//           ["Villa/Apartment", asset.villaApartmentName || "-"],
//           ["Floor", asset.floorName || "-"],
//           ["Room", asset.roomName || "-"],
//         ];

//         autoTable(doc, {
//           startY: yPosition,
//           head: [["Location", "Value"]],
//           body: locationInfo,
//           theme: "grid",
//           headStyles: {
//             fillColor: [34, 197, 94],
//             textColor: 255,
//             fontSize: 9,
//             fontStyle: "bold",
//           },
//           bodyStyles: {
//             fontSize: 8,
//             textColor: 50,
//           },
//           columnStyles: {
//             0: { cellWidth: 40, fontStyle: "bold" },
//             1: { cellWidth: paperSize === "A3" ? 120 : 80 },
//           },
//           margin: { left: 20, right: 20 },
//         });

//         yPosition = doc.lastAutoTable.finalY + 10;

//         if (yPosition > pageHeight - 60) {
//           doc.addPage();
//           yPosition = 20;
//         }

//         const serviceInfo = [];
//         if (asset.subServices && asset.subServices.length > 0) {
//           asset.subServices.forEach((subService, index) => {
//             serviceInfo.push([
//               `Sub-Service ${index + 1}`,
//               subService.subServiceName || "-",
//             ]);
//             if (
//               subService.serviceScopeNames &&
//               subService.serviceScopeNames.length > 0
//             ) {
//               serviceInfo.push([
//                 `Service Scopes ${index + 1}`,
//                 subService.serviceScopeNames.join(", "),
//               ]);
//             }
//           });
//         } else {
//           serviceInfo.push(["Sub-Services", "No sub-services assigned"]);
//         }

//         autoTable(doc, {
//           startY: yPosition,
//           head: [["Service Information", "Value"]],
//           body: serviceInfo,
//           theme: "grid",
//           headStyles: {
//             fillColor: [147, 51, 234],
//             textColor: 255,
//             fontSize: 9,
//             fontStyle: "bold",
//           },
//           bodyStyles: {
//             fontSize: 8,
//             textColor: 50,
//           },
//           columnStyles: {
//             0: { cellWidth: 40, fontStyle: "bold" },
//             1: { cellWidth: paperSize === "A3" ? 120 : 80 },
//           },
//           margin: { left: 20, right: 20 },
//         });

//         yPosition = doc.lastAutoTable.finalY + 15;

//         if (i < detailedAssets.length - 1) {
//           doc.setDrawColor(200, 200, 200);
//           doc.line(20, yPosition, pageWidth - 20, yPosition);
//           yPosition += 10;
//         }
//       }

//       const pageCount = doc.internal.getNumberOfPages();
//       for (let i = 1; i <= pageCount; i++) {
//         doc.setPage(i);
//         doc.setFontSize(8);
//         doc.setTextColor(150, 150, 150);
//         doc.text(`Page ${i} of ${pageCount}`, 20, pageHeight - 10);
//         doc.text(
//           "Generated by CAFM UAE System",
//           pageWidth - 80,
//           pageHeight - 10
//         );
//       }

//       const fileName = `bulk-asset-report-${selectedContract}-${paperSize}-${
//         new Date().toISOString().split("T")[0]
//       }.pdf`;
//       doc.save(fileName);

//       toast.success(
//         `Bulk asset report with images generated successfully (${paperSize} format)`
//       );
//       setShowBulkReportModal(false);
//       setSelectedAssets([]);
//       setSelectAll(false);
//     } catch (error) {
//       console.error("Error generating bulk report:", error);
//       toast.error("Failed to generate bulk asset report");
//     } finally {
//       setGeneratingBulkReport(false);
//     }
//   };

//   const paginatedAssets = assets;

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <div className="max-w-[1600px] mx-auto p-6">
//         {/* Header */}
//         <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
//           <div className="flex justify-between items-start">
//             <div className="flex items-start space-x-4">
//               <div className="p-3 bg-slate-800 rounded-lg shadow-sm">
//                 <Building className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-slate-900 mb-1">
//                   Asset Management
//                 </h1>
//                 <p className="text-slate-600 text-sm">
//                   View and manage all assets in your inventory
//                 </p>
//               </div>
//             </div>
//             <div className="flex gap-3">
//               <Link
//                 to="/assets"
//                 className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
//               >
//                 <ArrowLeft className="w-4 h-4 mr-2" />
//                 Back
//               </Link>
//               <Link
//                 to="/assets/create"
//                 className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-slate-800 border border-transparent rounded-lg hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
//               >
//                 <Plus className="w-4 h-4 mr-2" />
//                 Add New Asset
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Filters and Controls */}
//         <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
//           <div className="flex flex-col gap-4">
//             {/* Search and Filter Row */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
//                 <input
//                   type="text"
//                   placeholder="Search by asset tag, name, category, or room..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors"
//                 />
//               </div>
//               <div className="relative">
//                 <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
//                 <select
//                   value={selectedContract}
//                   onChange={(e) => setSelectedContract(e.target.value)}
//                   className="pl-10 pr-8 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 appearance-none min-w-48"
//                 >
//                   <option value="">All Contracts</option>
//                   {contracts.map((contract) => (
//                     <option
//                       key={contract.contractId}
//                       value={contract.contractId}
//                     >
//                       {contract.contractName}
//                     </option>
//                   ))}
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={handleRefresh}
//                   disabled={isRefreshing}
//                   className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
//                   title="Refresh"
//                 >
//                   <RefreshCw
//                     className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
//                   />
//                 </button>
//                 <button
//                   onClick={handleExport}
//                   disabled={exporting || !selectedContract}
//                   className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-lg hover:bg-teal-700 disabled:opacity-50 transition-colors"
//                   title="Export Excel"
//                 >
//                   {exporting ? (
//                     <>
//                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                       Exporting...
//                     </>
//                   ) : (
//                     <>
//                       <FileSpreadsheet className="w-4 h-4 mr-2" />
//                       Export Excel
//                     </>
//                   )}
//                 </button>
//                 <button
//                   onClick={() => setShowBulkReportModal(true)}
//                   disabled={!selectedContract}
//                   className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
//                   title="Generate Asset Report"
//                 >
//                   <FileDown className="w-4 h-4 mr-2" />
//                   Generate Report
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-slate-200">
//               <thead className="bg-slate-50">
//                 <tr>
//                   <th scope="col" className="px-4 py-3 text-left">
//                     <button
//                       onClick={handleSelectAll}
//                       className="flex items-center text-xs font-semibold text-slate-700 uppercase tracking-wider hover:text-slate-900 transition-colors"
//                     >
//                       {selectAll ? (
//                         <CheckSquare className="w-4 h-4 text-slate-600" />
//                       ) : (
//                         <Square className="w-4 h-4" />
//                       )}
//                       <span className="ml-2">Select</span>
//                     </button>
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
//                     onClick={() => handleSort("assetTag")}
//                   >
//                     <div className="flex items-center">
//                       Asset Tag
//                       {sortBy === "assetTag" && (
//                         <span className="ml-2 text-slate-600">
//                           {sortDirection === "asc" ? "↑" : "↓"}
//                         </span>
//                       )}
//                     </div>
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
//                     onClick={() => handleSort("assetName")}
//                   >
//                     <div className="flex items-center">
//                       Asset Name
//                       {sortBy === "assetName" && (
//                         <span className="ml-2 text-slate-600">
//                           {sortDirection === "asc" ? "↑" : "↓"}
//                         </span>
//                       )}
//                     </div>
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider"
//                   >
//                     Category
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider"
//                   >
//                     Location
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider"
//                   >
//                     Serial Number
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
//                     onClick={() => handleSort("assetStatus")}
//                   >
//                     <div className="flex items-center">
//                       Status
//                       {sortBy === "assetStatus" && (
//                         <span className="ml-2 text-slate-600">
//                           {sortDirection === "asc" ? "↑" : "↓"}
//                         </span>
//                       )}
//                     </div>
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
//                     onClick={() => handleSort("createdAt")}
//                   >
//                     <div className="flex items-center">
//                       <Calendar className="w-4 h-4 mr-1" />
//                       Created Date
//                       {sortBy === "createdAt" && (
//                         <span className="ml-2 text-slate-600">
//                           {sortDirection === "asc" ? "↑" : "↓"}
//                         </span>
//                       )}
//                     </div>
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider"
//                   >
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-slate-100">
//                 {loading ? (
//                   <tr>
//                     <td colSpan="9" className="px-4 py-12 text-center">
//                       <div className="flex justify-center items-center">
//                         <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-600"></div>
//                         <span className="ml-3 text-sm font-medium text-slate-600">
//                           Loading assets...
//                         </span>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : paginatedAssets.length === 0 ? (
//                   <tr>
//                     <td colSpan="9" className="px-4 py-12 text-center">
//                       <div className="text-slate-500">
//                         <Building className="w-8 h-8 mx-auto mb-3 text-slate-300" />
//                         <p className="text-sm font-medium">No assets found</p>
//                         <p className="text-xs text-slate-400 mt-1">
//                           Try adjusting your search or filter criteria
//                         </p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   paginatedAssets.map((asset, index) => (
//                     <tr
//                       key={asset.assetId}
//                       className={`hover:bg-slate-50 transition-colors ${
//                         index % 2 === 0 ? "bg-white" : "bg-slate-25"
//                       }`}
//                     >
//                       <td className="px-4 py-4 whitespace-nowrap">
//                         <button
//                           onClick={() => handleAssetSelection(asset.assetId)}
//                           className="text-slate-600 hover:text-slate-800 transition-colors"
//                         >
//                           {selectedAssets.includes(asset.assetId) ? (
//                             <CheckSquare className="w-4 h-4" />
//                           ) : (
//                             <Square className="w-4 h-4" />
//                           )}
//                         </button>
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap">
//                         <div className="text-sm font-semibold text-slate-900">
//                           {asset.assetTag}
//                         </div>
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap">
//                         <div className="text-sm font-medium text-slate-900">
//                           {asset.assetName}
//                         </div>
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap">
//                         <div className="flex items-center text-sm text-slate-600">
//                           <Tag className="w-4 h-4 mr-1 text-slate-400" />
//                           {asset.categoryName || "-"}
//                         </div>
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap">
//                         <div className="text-sm text-slate-600">
//                           <div className="flex items-center">
//                             <MapPin className="w-4 h-4 mr-1 text-slate-400" />
//                             {asset.buildingName}, {asset.floorName},{" "}
//                             {asset.roomName}
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap">
//                         <div className="text-sm text-slate-600">
//                           {asset.serialNumber || "-"}
//                         </div>
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap">
//                         <span
//                           className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-md border ${
//                             asset.assetStatus === "ACTIVE"
//                               ? "bg-emerald-50 text-emerald-700 border-emerald-200"
//                               : asset.assetStatus === "UNDER_MAINTENANCE"
//                               ? "bg-amber-50 text-amber-700 border-amber-200"
//                               : asset.assetStatus === "DECOMMISSIONED"
//                               ? "bg-red-50 text-red-700 border-red-200"
//                               : "bg-slate-50 text-slate-700 border-slate-200"
//                           }`}
//                         >
//                           {asset.assetStatus?.replace("_", " ")}
//                         </span>
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap">
//                         <div className="text-xs text-slate-600">
//                           {asset.createdAt
//                             ? new Date(asset.createdAt).toLocaleDateString()
//                             : "-"}
//                         </div>
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap">
//                         <div className="flex space-x-2">
//                           <Link
//                             to={`/assets/detail/${asset.assetId}`}
//                             className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
//                             title="View Details"
//                           >
//                             <Eye className="w-4 h-4" />
//                           </Link>
//                           <Link
//                             to={`/assets/edit/${asset.assetId}`}
//                             className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
//                             title="Edit Asset"
//                           >
//                             <Edit className="w-4 h-4" />
//                           </Link>
//                           <button
//                             onClick={() => handleDelete(asset.assetId)}
//                             className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
//                             title="Delete Asset"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//           {/* Pagination */}
//           {!loading && (
//             <div className="bg-slate-50 px-4 py-3 border-t border-slate-200">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-4">
//                   <div className="text-xs text-slate-600">
//                     Showing{" "}
//                     <span className="font-medium">
//                       {currentPage * pageSize + 1}
//                     </span>{" "}
//                     to{" "}
//                     <span className="font-medium">
//                       {Math.min((currentPage + 1) * pageSize, totalElements)}
//                     </span>{" "}
//                     of <span className="font-medium">{totalElements}</span>{" "}
//                     assets
//                     {selectedAssets.length > 0 && (
//                       <span className="ml-4 text-slate-600 font-medium">
//                         {selectedAssets.length} selected
//                       </span>
//                     )}
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <label className="text-xs text-slate-600">Show:</label>
//                     <select
//                       value={pageSize}
//                       onChange={(e) =>
//                         handlePageSizeChange(Number(e.target.value))
//                       }
//                       className="text-xs border border-slate-300 rounded px-2 py-1 focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     >
//                       <option value={5}>5</option>
//                       <option value={10}>10</option>
//                       <option value={25}>25</option>
//                       <option value={50}>50</option>
//                       <option value={100}>100</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     disabled={currentPage === 0}
//                     className="inline-flex items-center px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                   >
//                     <ChevronLeft className="w-3 h-3" />
//                     Previous
//                   </button>
//                   <div className="flex items-center gap-1">
//                     {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                       let pageNum;
//                       if (totalPages <= 5) {
//                         pageNum = i;
//                       } else if (currentPage < 3) {
//                         pageNum = i;
//                       } else if (currentPage > totalPages - 4) {
//                         pageNum = totalPages - 5 + i;
//                       } else {
//                         pageNum = currentPage - 2 + i;
//                       }
//                       return (
//                         <button
//                           key={pageNum}
//                           onClick={() => handlePageChange(pageNum)}
//                           className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
//                             currentPage === pageNum
//                               ? "bg-slate-800 text-white"
//                               : "text-slate-700 bg-white border border-slate-300 hover:bg-slate-50"
//                           }`}
//                         >
//                           {pageNum + 1}
//                         </button>
//                       );
//                     })}
//                   </div>
//                   <button
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     disabled={currentPage >= totalPages - 1}
//                     className="inline-flex items-center px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                   >
//                     Next
//                     <ChevronRight className="w-3 h-3" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Bulk Report Modal */}
//         {showBulkReportModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
//               <div className="flex justify-between items-center p-6 border-b border-slate-200">
//                 <h3 className="text-lg font-semibold text-slate-900">
//                   Generate Asset Report
//                 </h3>
//                 <button
//                   onClick={() => setShowBulkReportModal(false)}
//                   className="text-slate-400 hover:text-slate-600 transition-colors"
//                 >
//                   ×
//                 </button>
//               </div>
//               <div className="p-6 space-y-6">
//                 <div>
//                   <p className="text-slate-600 mb-4">
//                     Generate a comprehensive PDF report for selected assets with
//                     images.
//                   </p>
//                   <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
//                     <div className="flex">
//                       <FileDown className="h-5 w-5 text-blue-400" />
//                       <div className="ml-3">
//                         <p className="text-sm text-blue-700 font-medium">
//                           Report Features:
//                         </p>
//                         <ul className="list-disc pl-5 mt-1 text-sm text-blue-700">
//                           <li>Compressed PDF for smaller file size</li>
//                           <li>Detailed asset information</li>
//                           <li>Asset images included (up to 3 per asset)</li>
//                           <li>Multiple sub-services support</li>
//                           <li>Professional formatting</li>
//                           <li>Asset category information included</li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 mb-2">
//                     Paper Size
//                   </label>
//                   <select
//                     value={paperSize}
//                     onChange={(e) => setPaperSize(e.target.value)}
//                     className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                   >
//                     <option value="A4">A4 (210 × 297 mm)</option>
//                     <option value="A3">A3 (297 × 420 mm)</option>
//                   </select>
//                 </div>
//                 <div className="bg-slate-50 p-4 rounded-lg">
//                   <p className="text-sm text-slate-700">
//                     <strong>Selected Assets:</strong> {selectedAssets.length}
//                   </p>
//                   <p className="text-sm text-slate-700">
//                     <strong>Contract:</strong>{" "}
//                     {contracts.find(
//                       (c) => c.contractId.toString() === selectedContract
//                     )?.contractName || "None selected"}
//                   </p>
//                   <p className="text-sm text-slate-700">
//                     <strong>Paper Size:</strong> {paperSize}
//                   </p>
//                   <p className="text-sm text-slate-700">
//                     <strong>Images:</strong> Included (up to 3 per asset)
//                   </p>
//                 </div>
//               </div>
//               <div className="flex gap-3 p-6 border-t border-slate-200">
//                 <button
//                   onClick={() => setShowBulkReportModal(false)}
//                   className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={generateBulkAssetReport}
//                   disabled={
//                     generatingBulkReport ||
//                     selectedAssets.length === 0 ||
//                     !selectedContract
//                   }
//                   className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
//                 >
//                   {generatingBulkReport ? (
//                     <>
//                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                       Generating...
//                     </>
//                   ) : (
//                     <>
//                       <FileDown className="w-4 h-4 mr-2" />
//                       Generate Report
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AssetList;

// Modified AssetList component
"use client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  Search,
  Filter,
  RefreshCw,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar,
  MapPin,
  Building,
  ArrowLeft,
  FileDown,
  CheckSquare,
  Square,
  FileSpreadsheet,
  Tag,
  Wrench,
  Settings,
} from "lucide-react";
import { assetService } from "../services/assetService";
import { contractService } from "../services/contractService";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contracts, setContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [showBulkReportModal, setShowBulkReportModal] = useState(false);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [paperSize, setPaperSize] = useState("A4");
  const [generatingBulkReport, setGeneratingBulkReport] = useState(false);
  const [totalElements, setTotalElements] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    loadContracts();
    loadAssets();
  }, [
    currentPage,
    pageSize,
    sortBy,
    sortDirection,
    selectedContract,
    searchTerm,
  ]);

  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm, selectedContract, sortBy, sortDirection]);

  const loadContracts = async () => {
    try {
      const response = await contractService.getAllContracts();
      setContracts(response.data || []);
    } catch (error) {
      console.error("Error loading contracts:", error);
      toast.error("Failed to load contracts");
    }
  };

  const loadAssets = async () => {
    setLoading(true);
    try {
      const pageable = {
        page: currentPage,
        size: pageSize,
        sort: `${sortBy},${sortDirection}`,
      };
      if (searchTerm) {
        pageable.search = searchTerm;
      }
      let response;
      if (selectedContract) {
        response = await assetService.getAssetsByContract(
          selectedContract,
          pageable
        );
      } else {
        response = await assetService.getAllAssets(pageable);
      }
      setAssets(response.data.content || []);
      setTotalElements(response.data.totalElements || 0);
      setTotalPages(response.data.totalPages || 0);
    } catch (error) {
      console.error("Error loading assets:", error);
      toast.error("Failed to load assets");
      setAssets([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await loadAssets();
      toast.success("Assets refreshed successfully");
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(0);
  };

  const handleExport = async () => {
    if (!selectedContract) {
      toast.error("Please select a contract to export assets");
      return;
    }
    setExporting(true);
    try {
      const response = await assetService.exportAssetsExcel(selectedContract);
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `assets-contract-${selectedContract}-${
        new Date().toISOString().split("T")[0]
      }.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Assets exported to Excel successfully");
    } catch (error) {
      console.error("Error exporting assets to Excel:", error);
      toast.error("Failed to export assets to Excel. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  const handleAssetSelection = (assetId) => {
    setSelectedAssets((prev) => {
      if (prev.includes(assetId)) {
        return prev.filter((id) => id !== assetId);
      } else {
        return [...prev, assetId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedAssets([]);
      setSelectAll(false);
    } else {
      setSelectedAssets(assets.map((asset) => asset.assetId));
      setSelectAll(true);
    }
  };

  const getImageAsBase64 = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl, { mode: "cors" });
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error converting image to base64:", error);
      return null;
    }
  };

  const generateBulkAssetReport = async () => {
    if (!selectedContract) {
      toast.error("Please select a contract first");
      return;
    }
    if (selectedAssets.length === 0) {
      toast.error("Please select at least one asset");
      return;
    }
    setGeneratingBulkReport(true);
    try {
      const assetPromises = selectedAssets.map((assetId) =>
        assetService.getAssetById(assetId)
      );
      const assetResponses = await Promise.all(assetPromises);
      const detailedAssets = assetResponses.map((response) => response.data);

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: paperSize.toLowerCase(),
        compress: true,
      });

      doc.setProperties({
        title: `Asset Report - Contract ${selectedContract}`,
        subject: "Asset Management Report",
        author: "CAFM UAE System",
        creator: "CAFM UAE System",
      });

      doc.setFontSize(24);
      doc.setTextColor(40, 116, 240);
      doc.text("Bulk Asset Report", 20, 25);

      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text(
        `Contract: ${
          contracts.find((c) => c.contractId.toString() === selectedContract)
            ?.contractName || "Unknown"
        }`,
        20,
        35
      );
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 42);
      doc.text(`Total Assets: ${selectedAssets.length}`, 20, 49);
      doc.text(`Paper Size: ${paperSize}`, 20, 56);

      doc.setDrawColor(200, 200, 200);
      doc.line(20, 62, paperSize === "A3" ? 277 : 190, 62);

      let yPosition = 75;
      const pageHeight = paperSize === "A3" ? 420 : 297;
      const pageWidth = paperSize === "A3" ? 297 : 210;

      for (let i = 0; i < detailedAssets.length; i++) {
        const asset = detailedAssets[i];

        if (yPosition > pageHeight - 150) {
          doc.addPage();
          yPosition = 20;
        }

        doc.setFontSize(16);
        doc.setTextColor(40, 116, 240);
        doc.text(`Asset ${i + 1}: ${asset.assetTag}`, 20, yPosition);
        yPosition += 10;

        if (asset.imageUrls && asset.imageUrls.length > 0) {
          const imageWidth = 40;
          const imageHeight = 30;
          let imageX = 20;
          let imagesAdded = 0;
          const maxImagesPerRow = Math.floor(
            (pageWidth - 40) / (imageWidth + 5)
          );

          for (const imageUrl of asset.imageUrls.slice(0, 3)) {
            try {
              const base64Image = await getImageAsBase64(imageUrl);
              if (base64Image) {
                if (imagesAdded > 0 && imagesAdded % maxImagesPerRow === 0) {
                  yPosition += imageHeight + 5;
                  imageX = 20;
                  if (yPosition + imageHeight > pageHeight - 50) {
                    doc.addPage();
                    yPosition = 20;
                  }
                }
                doc.addImage(
                  base64Image,
                  "JPEG",
                  imageX,
                  yPosition,
                  imageWidth,
                  imageHeight
                );
                imageX += imageWidth + 5;
                imagesAdded++;
              }
            } catch (error) {
              console.error("Error adding image to PDF:", error);
            }
          }

          if (imagesAdded > 0) {
            yPosition += imageHeight + 15;
          }
        }

        if (yPosition > pageHeight - 100) {
          doc.addPage();
          yPosition = 20;
        }

        const basicInfo = [
          ["Asset Name", asset.assetName || "-"],
          ["Brand", asset.brandName || "-"],
          ["Model", asset.modelNumber || "-"],
          ["Category", asset.categoryName || "-"],
          ["Status", asset.assetStatus || "-"],
          ["Condition", asset.assetCondition || "-"],
          ["Owner Type", asset.ownerType || "-"],
        ];

        autoTable(doc, {
          startY: yPosition,
          head: [["Property", "Value"]],
          body: basicInfo,
          theme: "grid",
          headStyles: {
            fillColor: [40, 116, 240],
            textColor: 255,
            fontSize: 9,
            fontStyle: "bold",
          },
          bodyStyles: {
            fontSize: 8,
            textColor: 50,
          },
          columnStyles: {
            0: { cellWidth: 40, fontStyle: "bold" },
            1: { cellWidth: paperSize === "A3" ? 120 : 80 },
          },
          margin: { left: 20, right: 20 },
        });

        yPosition = doc.lastAutoTable.finalY + 10;

        if (yPosition > pageHeight - 60) {
          doc.addPage();
          yPosition = 20;
        }

        const locationInfo = [
          ["Zone", asset.zoneName || "-"],
          ["Sub Zone", asset.subZoneName || "-"],
          ["Building", asset.buildingName || "-"],
          ["Villa/Apartment", asset.villaApartmentName || "-"],
          ["Floor", asset.floorName || "-"],
          ["Room", asset.roomName || "-"],
        ];

        autoTable(doc, {
          startY: yPosition,
          head: [["Location", "Value"]],
          body: locationInfo,
          theme: "grid",
          headStyles: {
            fillColor: [34, 197, 94],
            textColor: 255,
            fontSize: 9,
            fontStyle: "bold",
          },
          bodyStyles: {
            fontSize: 8,
            textColor: 50,
          },
          columnStyles: {
            0: { cellWidth: 40, fontStyle: "bold" },
            1: { cellWidth: paperSize === "A3" ? 120 : 80 },
          },
          margin: { left: 20, right: 20 },
        });

        yPosition = doc.lastAutoTable.finalY + 10;

        if (yPosition > pageHeight - 60) {
          doc.addPage();
          yPosition = 20;
        }

        const serviceInfo = [];
        if (asset.subServices && asset.subServices.length > 0) {
          asset.subServices.forEach((subService, index) => {
            serviceInfo.push([
              `Sub-Service ${index + 1}`,
              subService.subServiceName || "-",
            ]);
            if (
              subService.serviceScopeNames &&
              subService.serviceScopeNames.length > 0
            ) {
              serviceInfo.push([
                `Service Scopes ${index + 1}`,
                subService.serviceScopeNames.join(", "),
              ]);
            }
          });
        } else {
          serviceInfo.push(["Sub-Services", "No sub-services assigned"]);
        }

        autoTable(doc, {
          startY: yPosition,
          head: [["Service Information", "Value"]],
          body: serviceInfo,
          theme: "grid",
          headStyles: {
            fillColor: [147, 51, 234],
            textColor: 255,
            fontSize: 9,
            fontStyle: "bold",
          },
          bodyStyles: {
            fontSize: 8,
            textColor: 50,
          },
          columnStyles: {
            0: { cellWidth: 40, fontStyle: "bold" },
            1: { cellWidth: paperSize === "A3" ? 120 : 80 },
          },
          margin: { left: 20, right: 20 },
        });

        yPosition = doc.lastAutoTable.finalY + 15;

        if (i < detailedAssets.length - 1) {
          doc.setDrawColor(200, 200, 200);
          doc.line(20, yPosition, pageWidth - 20, yPosition);
          yPosition += 10;
        }
      }

      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(`Page ${i} of ${pageCount}`, 20, pageHeight - 10);
        doc.text(
          "Generated by CAFM UAE System",
          pageWidth - 80,
          pageHeight - 10
        );
      }

      const fileName = `bulk-asset-report-${selectedContract}-${paperSize}-${
        new Date().toISOString().split("T")[0]
      }.pdf`;
      doc.save(fileName);

      toast.success(
        `Bulk asset report with images generated successfully (${paperSize} format)`
      );
      setShowBulkReportModal(false);
      setSelectedAssets([]);
      setSelectAll(false);
    } catch (error) {
      console.error("Error generating bulk report:", error);
      toast.error("Failed to generate bulk asset report");
    } finally {
      setGeneratingBulkReport(false);
    }
  };

  const handleCmWr = (asset) => {
    if (!selectedContract) {
      toast.error("Please select a contract first");
      return;
    }
    navigate("/work-requests", {
      state: {
        type: "cm",
        assetId: asset.assetId,
        contractId: selectedContract,
      },
    });
  };

  const handleRmWr = (asset) => {
    if (!selectedContract) {
      toast.error("Please select a contract first");
      return;
    }
    navigate("/work-requests", {
      state: {
        type: "rm",
        assetId: asset.assetId,
        contractId: selectedContract,
      },
    });
  };

  const handlePmSchedule = () => {
    if (!selectedContract) {
      toast.error("Please select a contract first");
      return;
    }
    if (selectedAssets.length === 0) {
      toast.error("Please select at least one asset");
      return;
    }
    navigate("/work-requests", {
      state: { type: "pm", selectedAssets, contractId: selectedContract },
    });
  };

  const paginatedAssets = assets;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-[1600px] mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex justify-between items-start">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-slate-800 rounded-lg shadow-sm">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 mb-1">
                  Asset Management
                </h1>
                <p className="text-slate-600 text-sm">
                  View and manage all assets in your inventory
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                to="/assets"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Link>
              <Link
                to="/assets/create"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-slate-800 border border-transparent rounded-lg hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Asset
              </Link>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
          <div className="flex flex-col gap-4">
            {/* Search and Filter Row */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by asset tag, name, category, or room..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <select
                  value={selectedContract}
                  onChange={(e) => setSelectedContract(e.target.value)}
                  className="pl-10 pr-8 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 appearance-none min-w-48"
                >
                  <option value="">All Contracts</option>
                  {contracts.map((contract) => (
                    <option
                      key={contract.contractId}
                      value={contract.contractId}
                    >
                      {contract.contractName}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
                  title="Refresh"
                >
                  <RefreshCw
                    className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
                  />
                </button>
                <button
                  onClick={handleExport}
                  disabled={exporting || !selectedContract}
                  className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-lg hover:bg-teal-700 disabled:opacity-50 transition-colors"
                  title="Export Excel"
                >
                  {exporting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Exporting...
                    </>
                  ) : (
                    <>
                      <FileSpreadsheet className="w-4 h-4 mr-2" />
                      Export Excel
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowBulkReportModal(true)}
                  disabled={!selectedContract}
                  className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
                  title="Generate Asset Report"
                >
                  <FileDown className="w-4 h-4 mr-2" />
                  Generate Report
                </button>
                <button
                  onClick={handlePmSchedule}
                  disabled={!selectedContract}
                  className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                  title="PM Schedule"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  PM Schedule
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left">
                    <button
                      onClick={handleSelectAll}
                      className="flex items-center text-xs font-semibold text-slate-700 uppercase tracking-wider hover:text-slate-900 transition-colors"
                    >
                      {selectAll ? (
                        <CheckSquare className="w-4 h-4 text-slate-600" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                      <span className="ml-2">Select</span>
                    </button>
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleSort("assetTag")}
                  >
                    <div className="flex items-center">
                      Asset Tag
                      {sortBy === "assetTag" && (
                        <span className="ml-2 text-slate-600">
                          {sortDirection === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleSort("assetName")}
                  >
                    <div className="flex items-center">
                      Asset Name
                      {sortBy === "assetName" && (
                        <span className="ml-2 text-slate-600">
                          {sortDirection === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider"
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleSort("assetStatus")}
                  >
                    <div className="flex items-center">
                      Status
                      {sortBy === "assetStatus" && (
                        <span className="ml-2 text-slate-600">
                          {sortDirection === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleSort("createdAt")}
                  >
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Created Date
                      {sortBy === "createdAt" && (
                        <span className="ml-2 text-slate-600">
                          {sortDirection === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-12 text-center">
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-600"></div>
                        <span className="ml-3 text-sm font-medium text-slate-600">
                          Loading assets...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : paginatedAssets.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-12 text-center">
                      <div className="text-slate-500">
                        <Building className="w-8 h-8 mx-auto mb-3 text-slate-300" />
                        <p className="text-sm font-medium">No assets found</p>
                        <p className="text-xs text-slate-400 mt-1">
                          Try adjusting your search or filter criteria
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedAssets.map((asset, index) => (
                    <tr
                      key={asset.assetId}
                      className={`hover:bg-slate-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-slate-25"
                      }`}
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleAssetSelection(asset.assetId)}
                          className="text-slate-600 hover:text-slate-800 transition-colors"
                        >
                          {selectedAssets.includes(asset.assetId) ? (
                            <CheckSquare className="w-4 h-4" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-slate-900">
                          {asset.assetTag}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">
                          {asset.assetName}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-slate-600">
                          <Tag className="w-4 h-4 mr-1 text-slate-400" />
                          {asset.categoryName || "-"}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-600">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1 text-slate-400" />
                            {asset.buildingName}, {asset.floorName},{" "}
                            {asset.roomName}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-md border ${
                            asset.assetStatus === "ACTIVE"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : asset.assetStatus === "UNDER_MAINTENANCE"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : asset.assetStatus === "DECOMMISSIONED"
                              ? "bg-red-50 text-red-700 border-red-200"
                              : "bg-slate-50 text-slate-700 border-slate-200"
                          }`}
                        >
                          {asset.assetStatus?.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-xs text-slate-600">
                          {asset.createdAt
                            ? new Date(asset.createdAt).toLocaleDateString()
                            : "-"}
                        </div>
                      </td>
                      {/* <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <Link
                            to={`/assets/detail/${asset.assetId}`}
                            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleCmWr(asset)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all"
                            title="CM WR"
                          >
                            <Wrench className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleRmWr(asset)}
                            className="p-2 text-orange-600 hover:text-orange-800 hover:bg-orange-50 rounded-lg transition-all"
                            title="RM WR"
                          >
                            <Settings className="w-4 h-4" />
                          </button>
                        </div>
                      </td> */}

                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <Link
                            to={`/assets/detail/${asset.assetId}`}
                            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleCmWr(asset)}
                            className="px-3 py-1.5 text-xs font-medium text-red-600 border border-red-200 hover:text-red-800 hover:bg-red-50 hover:border-red-300 rounded-lg transition-all"
                            title="Create Corrective Maintenance Work Request"
                          >
                            CM WR
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {!loading && (
            <div className="bg-slate-50 px-4 py-3 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-xs text-slate-600">
                    Showing{" "}
                    <span className="font-medium">
                      {currentPage * pageSize + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min((currentPage + 1) * pageSize, totalElements)}
                    </span>{" "}
                    of
                    <span className="font-medium">{totalElements}</span> assets
                    {selectedAssets.length > 0 && (
                      <span className="ml-4 text-slate-600 font-medium">
                        {selectedAssets.length} selected
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-slate-600">Show:</label>
                    <select
                      value={pageSize}
                      onChange={(e) =>
                        handlePageSizeChange(Number(e.target.value))
                      }
                      className="text-xs border border-slate-300 rounded px-2 py-1 focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                    className="inline-flex items-center px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-3 h-3" />
                    Previous
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i;
                      } else if (currentPage < 3) {
                        pageNum = i;
                      } else if (currentPage > totalPages - 4) {
                        pageNum = totalPages - 5 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                            currentPage === pageNum
                              ? "bg-slate-800 text-white"
                              : "text-slate-700 bg-white border border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          {pageNum + 1}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages - 1}
                    className="inline-flex items-center px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bulk Report Modal */}
        {showBulkReportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="flex justify-between items-center p-6 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900">
                  Generate Asset Report
                </h3>
                <button
                  onClick={() => setShowBulkReportModal(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  x
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <p className="text-slate-600 mb-4">
                    Generate a comprehensive PDF report for selected assets with
                    images.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <div className="flex">
                      <FileDown className="h-5 w-5 text-blue-400" />
                      <div className="ml-3">
                        <p className="text-sm text-blue-700 font-medium">
                          Report Features:
                        </p>
                        <ul className="list-disc pl-5 mt-1 text-sm text-blue-700">
                          <li>Compressed PDF for smaller file size</li>
                          <li>Detailed asset information</li>
                          <li>Asset images included (up to 3 per asset)</li>
                          <li>Multiple sub-services support</li>
                          <li>Professional formatting</li>
                          <li>Asset category information included</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Paper Size
                  </label>
                  <select
                    value={paperSize}
                    onChange={(e) => setPaperSize(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                  >
                    <option value="A4">A4 (210 x 297 mm)</option>
                    <option value="A3">A3 (297 x 420 mm)</option>
                  </select>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm text-slate-700">
                    <strong>Selected Assets:</strong> {selectedAssets.length}
                  </p>
                  <p className="text-sm text-slate-700">
                    <strong>Contract:</strong>{" "}
                    {contracts.find(
                      (c) => c.contractId.toString() === selectedContract
                    )?.contractName || "None selected"}
                  </p>
                  <p className="text-sm text-slate-700">
                    <strong>Paper Size:</strong> {paperSize}
                  </p>
                  <p className="text-sm text-slate-700">
                    <strong>Images:</strong> Included (up to 3 per asset)
                  </p>
                </div>
              </div>
              <div className="flex gap-3 p-6 border-t border-slate-200">
                <button
                  onClick={() => setShowBulkReportModal(false)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={generateBulkAssetReport}
                  disabled={
                    generatingBulkReport ||
                    selectedAssets.length === 0 ||
                    !selectedContract
                  }
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
                >
                  {generatingBulkReport ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <FileDown className="w-4 h-4 mr-2" />
                      Generate Report
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetList;
