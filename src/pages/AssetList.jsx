// // "use client";
// // import { useState, useEffect } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import {
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
// //   Tag,
// //   Wrench,
// //   Settings,
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
// //   const [totalElements, setTotalElements] = useState(0);

// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     loadContracts();
// //     loadAssets();
// //   }, [
// //     currentPage,
// //     pageSize,
// //     sortBy,
// //     sortDirection,
// //     selectedContract,
// //     searchTerm,
// //   ]);

// //   useEffect(() => {
// //     setCurrentPage(0);
// //   }, [searchTerm, selectedContract, sortBy, sortDirection]);

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
// //       const pageable = {
// //         page: currentPage,
// //         size: pageSize,
// //         sort: `${sortBy},${sortDirection}`,
// //       };
// //       if (searchTerm) {
// //         pageable.search = searchTerm;
// //       }
// //       let response;
// //       if (selectedContract) {
// //         response = await assetService.getAssetsByContract(
// //           selectedContract,
// //           pageable
// //         );
// //       } else {
// //         response = await assetService.getAllAssets(pageable);
// //       }
// //       setAssets(response.data.content || []);
// //       setTotalElements(response.data.totalElements || 0);
// //       setTotalPages(response.data.totalPages || 0);
// //     } catch (error) {
// //       console.error("Error loading assets:", error);
// //       toast.error("Failed to load assets");
// //       setAssets([]);
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

// //   const handlePageSizeChange = (newSize) => {
// //     setPageSize(newSize);
// //     setCurrentPage(0);
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
// //       setSelectedAssets(assets.map((asset) => asset.assetId));
// //       setSelectAll(true);
// //     }
// //   };

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

// //         if (asset.imageUrls && asset.imageUrls.length > 0) {
// //           const imageWidth = 40;
// //           const imageHeight = 30;
// //           let imageX = 20;
// //           let imagesAdded = 0;
// //           const maxImagesPerRow = Math.floor(
// //             (pageWidth - 40) / (imageWidth + 5)
// //           );

// //           for (const imageUrl of asset.imageUrls.slice(0, 3)) {
// //             try {
// //               const base64Image = await getImageAsBase64(imageUrl);
// //               if (base64Image) {
// //                 if (imagesAdded > 0 && imagesAdded % maxImagesPerRow === 0) {
// //                   yPosition += imageHeight + 5;
// //                   imageX = 20;
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

// //         if (yPosition > pageHeight - 100) {
// //           doc.addPage();
// //           yPosition = 20;
// //         }

// //         const basicInfo = [
// //           ["Asset Name", asset.assetName || "-"],
// //           ["Brand", asset.brandName || "-"],
// //           ["Model", asset.modelNumber || "-"],
// //           ["Category", asset.categoryName || "-"],
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

// //   const handleCmWr = (asset) => {
// //     if (!selectedContract) {
// //       toast.error("Please select a contract first");
// //       return;
// //     }
// //     navigate("/work-requests", {
// //       state: {
// //         type: "cm",
// //         assetId: asset.assetId,
// //         contractId: selectedContract,
// //       },
// //     });
// //   };

// //   const handleRmWr = (asset) => {
// //     if (!selectedContract) {
// //       toast.error("Please select a contract first");
// //       return;
// //     }
// //     navigate("/work-requests", {
// //       state: {
// //         type: "rm",
// //         assetId: asset.assetId,
// //         contractId: selectedContract,
// //       },
// //     });
// //   };

// //   const handlePmSchedule = () => {
// //     if (!selectedContract) {
// //       toast.error("Please select a contract first");
// //       return;
// //     }
// //     if (selectedAssets.length === 0) {
// //       toast.error("Please select at least one asset");
// //       return;
// //     }
// //     navigate("/work-requests", {
// //       state: { type: "pm", selectedAssets, contractId: selectedContract },
// //     });
// //   };

// //   const paginatedAssets = assets;

// //   return (
// //     <div className="min-h-screen bg-slate-50">
// //       <div className="max-w-[1600px] mx-auto p-6">
// //         {/* Header */}
// //         <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
// //           <div className="flex justify-between items-start">
// //             <div className="flex items-start space-x-4">
// //               <div className="p-3 bg-slate-800 rounded-lg shadow-sm">
// //                 <Building className="w-6 h-6 text-white" />
// //               </div>
// //               <div>
// //                 <h1 className="text-2xl font-bold text-slate-900 mb-1">
// //                   Asset Management
// //                 </h1>
// //                 <p className="text-slate-600 text-sm">
// //                   View and manage all assets in your inventory
// //                 </p>
// //               </div>
// //             </div>
// //             <div className="flex gap-3">
// //               <Link
// //                 to="/assets"
// //                 className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
// //               >
// //                 <ArrowLeft className="w-4 h-4 mr-2" />
// //                 Back
// //               </Link>
// //               <Link
// //                 to="/assets/create"
// //                 className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-slate-800 border border-transparent rounded-lg hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
// //               >
// //                 <Plus className="w-4 h-4 mr-2" />
// //                 Add New Asset
// //               </Link>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Filters and Controls */}
// //         <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
// //           <div className="flex flex-col gap-4">
// //             {/* Search and Filter Row */}
// //             <div className="flex flex-col sm:flex-row gap-4">
// //               <div className="relative flex-1">
// //                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
// //                 <input
// //                   type="text"
// //                   placeholder="Search by asset tag, name, category, or room..."
// //                   value={searchTerm}
// //                   onChange={(e) => setSearchTerm(e.target.value)}
// //                   className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors"
// //                 />
// //               </div>
// //               <div className="relative">
// //                 <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
// //                 <select
// //                   value={selectedContract}
// //                   onChange={(e) => setSelectedContract(e.target.value)}
// //                   className="pl-10 pr-8 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 appearance-none min-w-48"
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
// //                 <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
// //               </div>
// //               <div className="flex gap-2">
// //                 <button
// //                   onClick={handleRefresh}
// //                   disabled={isRefreshing}
// //                   className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
// //                   title="Refresh"
// //                 >
// //                   <RefreshCw
// //                     className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
// //                   />
// //                 </button>
// //                 <button
// //                   onClick={handleExport}
// //                   disabled={exporting || !selectedContract}
// //                   className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-lg hover:bg-teal-700 disabled:opacity-50 transition-colors"
// //                   title="Export Excel"
// //                 >
// //                   {exporting ? (
// //                     <>
// //                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
// //                       Exporting...
// //                     </>
// //                   ) : (
// //                     <>
// //                       <FileSpreadsheet className="w-4 h-4 mr-2" />
// //                       Export Excel
// //                     </>
// //                   )}
// //                 </button>
// //                 <button
// //                   onClick={() => setShowBulkReportModal(true)}
// //                   disabled={!selectedContract}
// //                   className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
// //                   title="Generate Asset Report"
// //                 >
// //                   <FileDown className="w-4 h-4 mr-2" />
// //                   Generate Report
// //                 </button>
// //                 <button
// //                   onClick={handlePmSchedule}
// //                   disabled={!selectedContract}
// //                   className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
// //                   title="PM Schedule"
// //                 >
// //                   <Calendar className="w-4 h-4 mr-2" />
// //                   PM Schedule
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Table */}
// //         <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
// //           <div className="overflow-x-auto">
// //             <table className="min-w-full divide-y divide-slate-200">
// //               <thead className="bg-slate-50">
// //                 <tr>
// //                   <th scope="col" className="px-4 py-3 text-left">
// //                     <button
// //                       onClick={handleSelectAll}
// //                       className="flex items-center text-xs font-semibold text-slate-700 uppercase tracking-wider hover:text-slate-900 transition-colors"
// //                     >
// //                       {selectAll ? (
// //                         <CheckSquare className="w-4 h-4 text-slate-600" />
// //                       ) : (
// //                         <Square className="w-4 h-4" />
// //                       )}
// //                       <span className="ml-2">Select</span>
// //                     </button>
// //                   </th>
// //                   <th
// //                     scope="col"
// //                     className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
// //                     onClick={() => handleSort("assetTag")}
// //                   >
// //                     <div className="flex items-center">
// //                       Asset Tag
// //                       {sortBy === "assetTag" && (
// //                         <span className="ml-2 text-slate-600">
// //                           {sortDirection === "asc" ? "↑" : "↓"}
// //                         </span>
// //                       )}
// //                     </div>
// //                   </th>
// //                   <th
// //                     scope="col"
// //                     className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
// //                     onClick={() => handleSort("assetName")}
// //                   >
// //                     <div className="flex items-center">
// //                       Asset Name
// //                       {sortBy === "assetName" && (
// //                         <span className="ml-2 text-slate-600">
// //                           {sortDirection === "asc" ? "↑" : "↓"}
// //                         </span>
// //                       )}
// //                     </div>
// //                   </th>
// //                   <th
// //                     scope="col"
// //                     className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider"
// //                   >
// //                     Category
// //                   </th>
// //                   <th
// //                     scope="col"
// //                     className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider"
// //                   >
// //                     Location
// //                   </th>
// //                   <th
// //                     scope="col"
// //                     className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
// //                     onClick={() => handleSort("assetStatus")}
// //                   >
// //                     <div className="flex items-center">
// //                       Status
// //                       {sortBy === "assetStatus" && (
// //                         <span className="ml-2 text-slate-600">
// //                           {sortDirection === "asc" ? "↑" : "↓"}
// //                         </span>
// //                       )}
// //                     </div>
// //                   </th>
// //                   <th
// //                     scope="col"
// //                     className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
// //                     onClick={() => handleSort("createdAt")}
// //                   >
// //                     <div className="flex items-center">
// //                       <Calendar className="w-4 h-4 mr-1" />
// //                       Created Date
// //                       {sortBy === "createdAt" && (
// //                         <span className="ml-2 text-slate-600">
// //                           {sortDirection === "asc" ? "↑" : "↓"}
// //                         </span>
// //                       )}
// //                     </div>
// //                   </th>
// //                   <th
// //                     scope="col"
// //                     className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider"
// //                   >
// //                     Actions
// //                   </th>
// //                 </tr>
// //               </thead>
// //               <tbody className="bg-white divide-y divide-slate-100">
// //                 {loading ? (
// //                   <tr>
// //                     <td colSpan="8" className="px-4 py-12 text-center">
// //                       <div className="flex justify-center items-center">
// //                         <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-600"></div>
// //                         <span className="ml-3 text-sm font-medium text-slate-600">
// //                           Loading assets...
// //                         </span>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ) : paginatedAssets.length === 0 ? (
// //                   <tr>
// //                     <td colSpan="8" className="px-4 py-12 text-center">
// //                       <div className="text-slate-500">
// //                         <Building className="w-8 h-8 mx-auto mb-3 text-slate-300" />
// //                         <p className="text-sm font-medium">No assets found</p>
// //                         <p className="text-xs text-slate-400 mt-1">
// //                           Try adjusting your search or filter criteria
// //                         </p>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ) : (
// //                   paginatedAssets.map((asset, index) => (
// //                     <tr
// //                       key={asset.assetId}
// //                       className={`hover:bg-slate-50 transition-colors ${
// //                         index % 2 === 0 ? "bg-white" : "bg-slate-25"
// //                       }`}
// //                     >
// //                       <td className="px-4 py-4 whitespace-nowrap">
// //                         <button
// //                           onClick={() => handleAssetSelection(asset.assetId)}
// //                           className="text-slate-600 hover:text-slate-800 transition-colors"
// //                         >
// //                           {selectedAssets.includes(asset.assetId) ? (
// //                             <CheckSquare className="w-4 h-4" />
// //                           ) : (
// //                             <Square className="w-4 h-4" />
// //                           )}
// //                         </button>
// //                       </td>
// //                       <td className="px-4 py-4 whitespace-nowrap">
// //                         <div className="text-sm font-semibold text-slate-900">
// //                           {asset.assetTag}
// //                         </div>
// //                       </td>
// //                       <td className="px-4 py-4 whitespace-nowrap">
// //                         <div className="text-sm font-medium text-slate-900">
// //                           {asset.assetName}
// //                         </div>
// //                       </td>
// //                       <td className="px-4 py-4 whitespace-nowrap">
// //                         <div className="flex items-center text-sm text-slate-600">
// //                           <Tag className="w-4 h-4 mr-1 text-slate-400" />
// //                           {asset.categoryName || "-"}
// //                         </div>
// //                       </td>
// //                       <td className="px-4 py-4 whitespace-nowrap">
// //                         <div className="text-sm text-slate-600">
// //                           <div className="flex items-center">
// //                             <MapPin className="w-4 h-4 mr-1 text-slate-400" />
// //                             {asset.buildingName}, {asset.floorName},{" "}
// //                             {asset.roomName}
// //                           </div>
// //                         </div>
// //                       </td>
// //                       <td className="px-4 py-4 whitespace-nowrap">
// //                         <span
// //                           className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-md border ${
// //                             asset.assetStatus === "ACTIVE"
// //                               ? "bg-emerald-50 text-emerald-700 border-emerald-200"
// //                               : asset.assetStatus === "UNDER_MAINTENANCE"
// //                               ? "bg-amber-50 text-amber-700 border-amber-200"
// //                               : asset.assetStatus === "DECOMMISSIONED"
// //                               ? "bg-red-50 text-red-700 border-red-200"
// //                               : "bg-slate-50 text-slate-700 border-slate-200"
// //                           }`}
// //                         >
// //                           {asset.assetStatus?.replace("_", " ")}
// //                         </span>
// //                       </td>
// //                       <td className="px-4 py-4 whitespace-nowrap">
// //                         <div className="text-xs text-slate-600">
// //                           {asset.createdAt
// //                             ? new Date(asset.createdAt).toLocaleDateString()
// //                             : "-"}
// //                         </div>
// //                       </td>
// //                       {/* <td className="px-4 py-4 whitespace-nowrap">
// //                         <div className="flex space-x-2">
// //                           <Link
// //                             to={`/assets/detail/${asset.assetId}`}
// //                             className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
// //                             title="View Details"
// //                           >
// //                             <Eye className="w-4 h-4" />
// //                           </Link>
// //                           <button
// //                             onClick={() => handleCmWr(asset)}
// //                             className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all"
// //                             title="CM WR"
// //                           >
// //                             <Wrench className="w-4 h-4" />
// //                           </button>
// //                           <button
// //                             onClick={() => handleRmWr(asset)}
// //                             className="p-2 text-orange-600 hover:text-orange-800 hover:bg-orange-50 rounded-lg transition-all"
// //                             title="RM WR"
// //                           >
// //                             <Settings className="w-4 h-4" />
// //                           </button>
// //                         </div>
// //                       </td> */}

// //                       <td className="px-4 py-4 whitespace-nowrap">
// //                         <div className="flex space-x-2">
// //                           <Link
// //                             to={`/assets/detail/${asset.assetId}`}
// //                             className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
// //                             title="View Details"
// //                           >
// //                             <Eye className="w-4 h-4" />
// //                           </Link>
// //                           <button
// //                             onClick={() => handleCmWr(asset)}
// //                             className="px-3 py-1.5 text-xs font-medium text-red-600 border border-red-200 hover:text-red-800 hover:bg-red-50 hover:border-red-300 rounded-lg transition-all"
// //                             title="Create Corrective Maintenance Work Request"
// //                           >
// //                             CM WR
// //                           </button>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   ))
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>
// //           {!loading && (
// //             <div className="bg-slate-50 px-4 py-3 border-t border-slate-200">
// //               <div className="flex items-center justify-between">
// //                 <div className="flex items-center gap-4">
// //                   <div className="text-xs text-slate-600">
// //                     Showing{" "}
// //                     <span className="font-medium">
// //                       {currentPage * pageSize + 1}
// //                     </span>{" "}
// //                     to{" "}
// //                     <span className="font-medium">
// //                       {Math.min((currentPage + 1) * pageSize, totalElements)}
// //                     </span>{" "}
// //                     of
// //                     <span className="font-medium">{totalElements}</span> assets
// //                     {selectedAssets.length > 0 && (
// //                       <span className="ml-4 text-slate-600 font-medium">
// //                         {selectedAssets.length} selected
// //                       </span>
// //                     )}
// //                   </div>
// //                   <div className="flex items-center gap-2">
// //                     <label className="text-xs text-slate-600">Show:</label>
// //                     <select
// //                       value={pageSize}
// //                       onChange={(e) =>
// //                         handlePageSizeChange(Number(e.target.value))
// //                       }
// //                       className="text-xs border border-slate-300 rounded px-2 py-1 focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
// //                     >
// //                       <option value={5}>5</option>
// //                       <option value={10}>10</option>
// //                       <option value={25}>25</option>
// //                       <option value={50}>50</option>
// //                       <option value={100}>100</option>
// //                     </select>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-center gap-2">
// //                   <button
// //                     onClick={() => handlePageChange(currentPage - 1)}
// //                     disabled={currentPage === 0}
// //                     className="inline-flex items-center px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
// //                   >
// //                     <ChevronLeft className="w-3 h-3" />
// //                     Previous
// //                   </button>
// //                   <div className="flex items-center gap-1">
// //                     {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
// //                       let pageNum;
// //                       if (totalPages <= 5) {
// //                         pageNum = i;
// //                       } else if (currentPage < 3) {
// //                         pageNum = i;
// //                       } else if (currentPage > totalPages - 4) {
// //                         pageNum = totalPages - 5 + i;
// //                       } else {
// //                         pageNum = currentPage - 2 + i;
// //                       }
// //                       return (
// //                         <button
// //                           key={pageNum}
// //                           onClick={() => handlePageChange(pageNum)}
// //                           className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
// //                             currentPage === pageNum
// //                               ? "bg-slate-800 text-white"
// //                               : "text-slate-700 bg-white border border-slate-300 hover:bg-slate-50"
// //                           }`}
// //                         >
// //                           {pageNum + 1}
// //                         </button>
// //                       );
// //                     })}
// //                   </div>
// //                   <button
// //                     onClick={() => handlePageChange(currentPage + 1)}
// //                     disabled={currentPage >= totalPages - 1}
// //                     className="inline-flex items-center px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
// //                   >
// //                     Next
// //                     <ChevronRight className="w-3 h-3" />
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* Bulk Report Modal */}
// //         {showBulkReportModal && (
// //           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //             <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
// //               <div className="flex justify-between items-center p-6 border-b border-slate-200">
// //                 <h3 className="text-lg font-semibold text-slate-900">
// //                   Generate Asset Report
// //                 </h3>
// //                 <button
// //                   onClick={() => setShowBulkReportModal(false)}
// //                   className="text-slate-400 hover:text-slate-600 transition-colors"
// //                 >
// //                   x
// //                 </button>
// //               </div>
// //               <div className="p-6 space-y-6">
// //                 <div>
// //                   <p className="text-slate-600 mb-4">
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
// //                           <li>Asset category information included</li>
// //                         </ul>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-slate-700 mb-2">
// //                     Paper Size
// //                   </label>
// //                   <select
// //                     value={paperSize}
// //                     onChange={(e) => setPaperSize(e.target.value)}
// //                     className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
// //                   >
// //                     <option value="A4">A4 (210 x 297 mm)</option>
// //                     <option value="A3">A3 (297 x 420 mm)</option>
// //                   </select>
// //                 </div>
// //                 <div className="bg-slate-50 p-4 rounded-lg">
// //                   <p className="text-sm text-slate-700">
// //                     <strong>Selected Assets:</strong> {selectedAssets.length}
// //                   </p>
// //                   <p className="text-sm text-slate-700">
// //                     <strong>Contract:</strong>{" "}
// //                     {contracts.find(
// //                       (c) => c.contractId.toString() === selectedContract
// //                     )?.contractName || "None selected"}
// //                   </p>
// //                   <p className="text-sm text-slate-700">
// //                     <strong>Paper Size:</strong> {paperSize}
// //                   </p>
// //                   <p className="text-sm text-slate-700">
// //                     <strong>Images:</strong> Included (up to 3 per asset)
// //                   </p>
// //                 </div>
// //               </div>
// //               <div className="flex gap-3 p-6 border-t border-slate-200">
// //                 <button
// //                   onClick={() => setShowBulkReportModal(false)}
// //                   className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
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
// //                   className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
// //                 >
// //                   {generatingBulkReport ? (
// //                     <>
// //                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
// //                       Generating...
// //                     </>
// //                   ) : (
// //                     <>
// //                       <FileDown className="w-4 h-4 mr-2" />
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
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Eye,
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
//   Wrench,
//   X,
//   ArrowUp,
//   ArrowDown,
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
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   const [sortDirection, setSortDirection] = useState("desc");
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [exporting, setExporting] = useState(false);
//   const [showBulkReportModal, setShowBulkReportModal] = useState(false);
//   const [selectedAssets, setSelectedAssets] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const [paperSize, setPaperSize] = useState("A4");
//   const [generatingBulkReport, setGeneratingBulkReport] = useState(false);
//   const [totalElements, setTotalElements] = useState(0);
//   const [showFilters, setShowFilters] = useState(false);
//   const [filters, setFilters] = useState({
//     assetTag: "",
//     assetName: "",
//     categoryId: "",
//     zoneId: "",
//     subZoneId: "",
//     buildingId: "",
//     villaApartmentId: "",
//     floorId: "",
//     roomId: "",
//     assetStatus: "",
//     startDate: "",
//     endDate: "",
//   });
//   const [activeFilters, setActiveFilters] = useState({});

//   const navigate = useNavigate();

//   useEffect(() => {
//     loadContracts();
//     loadAssets();
//   }, [currentPage, pageSize, sortDirection, selectedContract, activeFilters]);

//   useEffect(() => {
//     setCurrentPage(0);
//   }, [activeFilters, selectedContract, sortDirection]);

//   const loadContracts = async () => {
//     try {
//       const response = await contractService.getAllContracts();
//       setContracts(response.data || []);
//     } catch (error) {
//       console.error("Error loading contracts:", error);
//       toast.error("Failed to load contracts");
//     }
//   };

//   // const loadAssets = async () => {
//   //   setLoading(true);
//   //   try {
//   //     const pageable = {
//   //       page: currentPage,
//   //       size: pageSize,
//   //       sort: `createdAt,${sortDirection}`,
//   //     };
//   //     let response;
//   //     if (Object.keys(activeFilters).length > 0) {
//   //       // If there are active filters, use getFilteredAssets
//   //       const filterData = { ...activeFilters };
//   //       if (selectedContract) {
//   //         filterData.contractId = selectedContract;
//   //       }
//   //       response = await assetService.getFilteredAssets(
//   //         filterData,
//   //         currentPage,
//   //         pageSize,
//   //         `createdAt,${sortDirection}`
//   //       );
//   //     } else if (selectedContract) {
//   //       // If only contract is selected, use getAssetsByContract
//   //       response = await assetService.getAssetsByContract(
//   //         selectedContract,
//   //         pageable
//   //       );
//   //     } else {
//   //       // No filters or contract selected, get all assets
//   //       response = await assetService.getAllAssets(pageable);
//   //     }
//   //     setAssets(response.data.content || []);
//   //     setTotalElements(response.data.totalElements || 0);
//   //     setTotalPages(response.data.totalPages || 0);
//   //   } catch (error) {
//   //     console.error("Error loading assets:", error);
//   //     toast.error("Failed to load assets");
//   //     setAssets([]);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const loadAssets = async () => {
//     setLoading(true);
//     try {
//       const pageable = {
//         page: currentPage,
//         size: pageSize,
//         sort: `createdAt,${sortDirection}`,
//       };

//       let response;

//       // Always use filtered assets endpoint when there are filters OR a contract is selected
//       if (Object.keys(activeFilters).length > 0 || selectedContract) {
//         const filterData = { ...activeFilters };

//         // Add contractId to filters if a contract is selected
//         if (selectedContract) {
//           filterData.contractId = selectedContract;
//         }

//         response = await assetService.getFilteredAssets(
//           filterData,
//           currentPage,
//           pageSize,
//           `createdAt,${sortDirection}`
//         );
//       } else {
//         // No filters or contract selected, get all assets
//         response = await assetService.getAllAssets(pageable);
//       }

//       setAssets(response.data.content || []);
//       setTotalElements(response.data.totalElements || 0);
//       setTotalPages(response.data.totalPages || 0);
//     } catch (error) {
//       console.error("Error loading assets:", error);
//       toast.error("Failed to load assets");
//       setAssets([]);
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

//   const handleSort = () => {
//     setSortDirection(sortDirection === "asc" ? "desc" : "asc");
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

//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   const applyFilters = () => {
//     if (
//       filters.startDate &&
//       filters.endDate &&
//       new Date(filters.startDate) > new Date(filters.endDate)
//     ) {
//       toast.error("Start date cannot be after end date");
//       return;
//     }

//     const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
//       if (value && value.trim() !== "") {
//         acc[key] = value;
//       }
//       return acc;
//     }, {});
//     setActiveFilters(cleanFilters);
//     setCurrentPage(0);
//     setShowFilters(false);
//   };

//   const clearFilters = () => {
//     setFilters({
//       assetTag: "",
//       assetName: "",
//       categoryId: "",
//       zoneId: "",
//       subZoneId: "",
//       buildingId: "",
//       villaApartmentId: "",
//       floorId: "",
//       roomId: "",
//       assetStatus: "",
//       startDate: "",
//       endDate: "",
//     });
//     setActiveFilters({});
//     setCurrentPage(0);
//     setShowFilters(false);
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

//   const handleCmWr = (asset) => {
//     if (!selectedContract) {
//       toast.error("Please select a contract first");
//       return;
//     }
//     navigate("/work-requests", {
//       state: {
//         type: "cm",
//         assetId: asset.assetId,
//         contractId: selectedContract,
//       },
//     });
//   };

//   const handlePmSchedule = () => {
//     if (!selectedContract) {
//       toast.error("Please select a contract first");
//       return;
//     }
//     if (selectedAssets.length === 0) {
//       toast.error("Please select at least one asset");
//       return;
//     }
//     navigate("/work-requests", {
//       state: { type: "pm", selectedAssets, contractId: selectedContract },
//     });
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
//             <div className="flex gap-2">
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className={`px-4 py-2.5 text-sm font-medium border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors ${
//                   Object.keys(activeFilters).length > 0
//                     ? "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
//                     : "text-slate-700 bg-white border-slate-300 hover:bg-slate-50"
//                 }`}
//               >
//                 <Filter className="w-4 h-4 mr-2 inline" />
//                 Filters{" "}
//                 {Object.keys(activeFilters).length > 0 &&
//                   `(${Object.keys(activeFilters).length})`}
//               </button>
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
//               <button
//                 onClick={handleRefresh}
//                 disabled={isRefreshing}
//                 className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
//                 title="Refresh"
//               >
//                 <RefreshCw
//                   className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
//                 />
//               </button>
//               <button
//                 onClick={handleExport}
//                 disabled={exporting || !selectedContract}
//                 className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-lg hover:bg-teal-700 disabled:opacity-50 transition-colors"
//                 title="Export Excel"
//               >
//                 {exporting ? (
//                   <>
//                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                     Exporting...
//                   </>
//                 ) : (
//                   <>
//                     <FileSpreadsheet className="w-4 h-4 mr-2" />
//                     Export Excel
//                   </>
//                 )}
//               </button>
//               <button
//                 onClick={() => setShowBulkReportModal(true)}
//                 disabled={!selectedContract}
//                 className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
//                 title="Generate Asset Report"
//               >
//                 <FileDown className="w-4 h-4 mr-2" />
//                 Generate Report
//               </button>
//               <button
//                 onClick={handlePmSchedule}
//                 disabled={!selectedContract}
//                 className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
//                 title="PM Schedule"
//               >
//                 <Calendar className="w-4 h-4 mr-2" />
//                 PM Schedule
//               </button>
//               <button
//                 onClick={handleSort}
//                 className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
//               >
//                 {sortDirection === "desc" ? (
//                   <>
//                     <ArrowDown className="w-4 h-4 mr-2 inline" />
//                     Latest First
//                   </>
//                 ) : (
//                   <>
//                     <ArrowUp className="w-4 h-4 mr-2 inline" />
//                     Oldest First
//                   </>
//                 )}
//               </button>
//             </div>

//             {/* Filter Panel */}
//             {showFilters && (
//               <div className="border-t border-slate-200 pt-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Asset Tag
//                     </label>
//                     <input
//                       type="text"
//                       value={filters.assetTag}
//                       onChange={(e) =>
//                         handleFilterChange("assetTag", e.target.value)
//                       }
//                       placeholder="Enter Asset Tag"
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Asset Name
//                     </label>
//                     <input
//                       type="text"
//                       value={filters.assetName}
//                       onChange={(e) =>
//                         handleFilterChange("assetName", e.target.value)
//                       }
//                       placeholder="Enter Asset Name"
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Category ID
//                     </label>
//                     <input
//                       type="number"
//                       value={filters.categoryId}
//                       onChange={(e) =>
//                         handleFilterChange("categoryId", e.target.value)
//                       }
//                       placeholder="Enter Category ID"
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Zone ID
//                     </label>
//                     <input
//                       type="number"
//                       value={filters.zoneId}
//                       onChange={(e) =>
//                         handleFilterChange("zoneId", e.target.value)
//                       }
//                       placeholder="Enter Zone ID"
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Sub-Zone ID
//                     </label>
//                     <input
//                       type="number"
//                       value={filters.subZoneId}
//                       onChange={(e) =>
//                         handleFilterChange("subZoneId", e.target.value)
//                       }
//                       placeholder="Enter Sub-Zone ID"
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Building ID
//                     </label>
//                     <input
//                       type="number"
//                       value={filters.buildingId}
//                       onChange={(e) =>
//                         handleFilterChange("buildingId", e.target.value)
//                       }
//                       placeholder="Enter Building ID"
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Villa/Apartment ID
//                     </label>
//                     <input
//                       type="number"
//                       value={filters.villaApartmentId}
//                       onChange={(e) =>
//                         handleFilterChange("villaApartmentId", e.target.value)
//                       }
//                       placeholder="Enter Villa/Apartment ID"
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Floor ID
//                     </label>
//                     <input
//                       type="number"
//                       value={filters.floorId}
//                       onChange={(e) =>
//                         handleFilterChange("floorId", e.target.value)
//                       }
//                       placeholder="Enter Floor ID"
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Room ID
//                     </label>
//                     <input
//                       type="number"
//                       value={filters.roomId}
//                       onChange={(e) =>
//                         handleFilterChange("roomId", e.target.value)
//                       }
//                       placeholder="Enter Room ID"
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Asset Status
//                     </label>
//                     <select
//                       value={filters.assetStatus}
//                       onChange={(e) =>
//                         handleFilterChange("assetStatus", e.target.value)
//                       }
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     >
//                       <option value="">All Statuses</option>
//                       <option value="ACTIVE">Active</option>
//                       <option value="UNDER_MAINTENANCE">
//                         Under Maintenance
//                       </option>
//                       <option value="DECOMMISSIONED">Decommissioned</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Start Date
//                     </label>
//                     <input
//                       type="date"
//                       value={filters.startDate}
//                       onChange={(e) =>
//                         handleFilterChange("startDate", e.target.value)
//                       }
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       End Date
//                     </label>
//                     <input
//                       type="date"
//                       value={filters.endDate}
//                       onChange={(e) =>
//                         handleFilterChange("endDate", e.target.value)
//                       }
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     />
//                   </div>
//                 </div>
//                 <div className="flex gap-3 mt-4">
//                   <button
//                     onClick={applyFilters}
//                     className="px-4 py-2 text-sm font-medium text-white bg-slate-800 border border-transparent rounded-lg hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
//                   >
//                     Apply Filters
//                   </button>
//                   <button
//                     onClick={clearFilters}
//                     className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
//                   >
//                     Clear All
//                   </button>
//                 </div>
//               </div>
//             )}
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
//                     className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider"
//                   >
//                     Asset Tag
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider"
//                   >
//                     Asset Name
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
//                     Status
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
//                     onClick={handleSort}
//                   >
//                     <div className="flex items-center">
//                       <Calendar className="w-4 h-4 mr-1" />
//                       Created Date
//                       {sortDirection === "asc" ? (
//                         <ArrowUp className="w-4 h-4 ml-1" />
//                       ) : (
//                         <ArrowDown className="w-4 h-4 ml-1" />
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
//                     <td colSpan="8" className="px-4 py-12 text-center">
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
//                     <td colSpan="8" className="px-4 py-12 text-center">
//                       <div className="text-slate-500">
//                         <Building className="w-8 h-8 mx-auto mb-3 text-slate-300" />
//                         <p className="text-sm font-medium">No assets found</p>
//                         <p className="text-xs text-slate-400 mt-1">
//                           Try adjusting your filter criteria
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
//                           <button
//                             onClick={() => handleCmWr(asset)}
//                             className="px-3 py-1.5 text-xs font-medium text-red-600 border border-red-200 hover:text-red-800 hover:bg-red-50 hover:border-red-300 rounded-lg transition-all"
//                             title="Create Corrective Maintenance Work Request"
//                           >
//                             CM WR
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
//                     of
//                     <span className="font-medium">{totalElements}</span> assets
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
//                   <X className="w-5 h-5" />
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
//                     <option value="A4">A4 (210 x 297 mm)</option>
//                     <option value="A3">A3 (297 x 420 mm)</option>
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

"use client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
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
  ArrowUp,
  ArrowDown,
  X,
} from "lucide-react";
import { assetService } from "../services/assetService";
import { contractService } from "../services/contractService";
import { assetCategoryService } from "../services/assetCategoryService";
import { propertyFlowService } from "../services/propertyFlowService";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contracts, setContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortDirection, setSortDirection] = useState("desc");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [showBulkReportModal, setShowBulkReportModal] = useState(false);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [paperSize, setPaperSize] = useState("A4");
  const [generatingBulkReport, setGeneratingBulkReport] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    assetTag: "",
    assetName: "",
    categoryId: "",
    zoneId: "",
    subZoneId: "",
    buildingId: "",
    villaApartmentId: "",
    floorId: "",
    roomId: "",
    assetStatus: "",
    startDate: "",
    endDate: "",
  });
  const [activeFilters, setActiveFilters] = useState({});

  // State for dropdown data
  const [categories, setCategories] = useState([]);
  const [zones, setZones] = useState([]);
  const [subZones, setSubZones] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [villaApartments, setVillaApartments] = useState([]);
  const [floors, setFloors] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingZones, setLoadingZones] = useState(false);
  const [loadingSubZones, setLoadingSubZones] = useState(false);
  const [loadingBuildings, setLoadingBuildings] = useState(false);
  const [loadingVillaApartments, setLoadingVillaApartments] = useState(false);
  const [loadingFloors, setLoadingFloors] = useState(false);
  const [loadingRooms, setLoadingRooms] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    loadContracts();
    loadCategories();
    loadAssets();
  }, [currentPage, pageSize, sortDirection, selectedContract, activeFilters]);

  useEffect(() => {
    setCurrentPage(0);
  }, [activeFilters, selectedContract, sortDirection]);

  useEffect(() => {
    // Load location data when a contract is selected
    if (selectedContract) {
      loadZones();
      loadSubZones();
      loadBuildings();
      loadVillaApartments();
      loadFloors();
      loadRooms();
    } else {
      // Clear location data when no contract is selected
      setZones([]);
      setSubZones([]);
      setBuildings([]);
      setVillaApartments([]);
      setFloors([]);
      setRooms([]);
      // Reset location filters
      setFilters((prev) => ({
        ...prev,
        zoneId: "",
        subZoneId: "",
        buildingId: "",
        villaApartmentId: "",
        floorId: "",
        roomId: "",
      }));
    }
  }, [selectedContract]);

  const loadContracts = async () => {
    try {
      const response = await contractService.getAllContracts();
      console.log("Contracts response:", response.data); // Debug log
      setContracts(response.data || []);
    } catch (error) {
      console.error("Error loading contracts:", error);
      toast.error("Failed to load contracts");
    }
  };

  const loadCategories = async () => {
    setLoadingCategories(true);
    try {
      const response = await assetCategoryService.getAllCategories();
      console.log("Categories response:", response.data); // Debug log
      setCategories(response.data || []);
    } catch (error) {
      console.error("Error loading categories:", error);
      toast.error("Failed to load asset categories");
    } finally {
      setLoadingCategories(false);
    }
  };

  const loadZones = async () => {
    if (!selectedContract) return;
    setLoadingZones(true);
    try {
      const response = await propertyFlowService.getAllZonesByContract(
        selectedContract
      );
      console.log("Zones response:", response.data); // Debug log
      setZones(response.data || []);
    } catch (error) {
      console.error("Error loading zones:", error);
      toast.error("Failed to load zones");
    } finally {
      setLoadingZones(false);
    }
  };

  const loadSubZones = async () => {
    if (!selectedContract) return;
    setLoadingSubZones(true);
    try {
      const response = await propertyFlowService.getAllSubZonesByContract(
        selectedContract
      );
      console.log("SubZones response:", response.data); // Debug log
      setSubZones(response.data || []);
    } catch (error) {
      console.error("Error loading sub-zones:", error);
      toast.error("Failed to load sub-zones");
    } finally {
      setLoadingSubZones(false);
    }
  };

  const loadBuildings = async () => {
    if (!selectedContract) return;
    setLoadingBuildings(true);
    try {
      const response = await propertyFlowService.getAllBuildingsByContract(
        selectedContract
      );
      console.log("Buildings response:", response.data); // Debug log
      setBuildings(response.data || []);
    } catch (error) {
      console.error("Error loading buildings:", error);
      toast.error("Failed to load buildings");
    } finally {
      setLoadingBuildings(false);
    }
  };

  const loadVillaApartments = async () => {
    if (!selectedContract) return;
    setLoadingVillaApartments(true);
    try {
      const response =
        await propertyFlowService.getAllVillaApartmentsByContract(
          selectedContract
        );
      console.log("VillaApartments response:", response.data); // Debug log
      setVillaApartments(response.data || []);
    } catch (error) {
      console.error("Error loading villa/apartments:", error);
      toast.error("Failed to load villa/apartments");
    } finally {
      setLoadingVillaApartments(false);
    }
  };

  const loadFloors = async () => {
    if (!selectedContract) return;
    setLoadingFloors(true);
    try {
      const response = await propertyFlowService.getAllFloorsByContract(
        selectedContract
      );
      console.log("Floors response:", response.data); // Debug log
      setFloors(response.data || []);
    } catch (error) {
      console.error("Error loading floors:", error);
      toast.error("Failed to load floors");
    } finally {
      setLoadingFloors(false);
    }
  };

  const loadRooms = async () => {
    if (!selectedContract) return;
    setLoadingRooms(true);
    try {
      const response = await propertyFlowService.getAllRoomsByContract(
        selectedContract
      );
      console.log("Rooms response:", response.data); // Debug log
      setRooms(response.data || []);
    } catch (error) {
      console.error("Error loading rooms:", error);
      toast.error("Failed to load rooms");
    } finally {
      setLoadingRooms(false);
    }
  };

  const loadAssets = async () => {
    setLoading(true);
    try {
      const pageable = {
        page: currentPage,
        size: pageSize,
        sort: `createdAt,${sortDirection}`,
      };

      let response;

      if (Object.keys(activeFilters).length > 0 || selectedContract) {
        const filterData = { ...activeFilters };
        if (selectedContract) {
          filterData.contractId = selectedContract;
        }
        response = await assetService.getFilteredAssets(
          filterData,
          currentPage,
          pageSize,
          `createdAt,${sortDirection}`
        );
      } else {
        response = await assetService.getAllAssets(pageable);
      }

      console.log("Assets response:", response.data); // Debug log
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

  const handleSort = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
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

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    if (
      filters.startDate &&
      filters.endDate &&
      new Date(filters.startDate) > new Date(filters.endDate)
    ) {
      toast.error("Start date cannot be after end date");
      return;
    }

    const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value && value.trim() !== "") {
        acc[key] = value;
      }
      return acc;
    }, {});
    setActiveFilters(cleanFilters);
    setCurrentPage(0);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setFilters({
      assetTag: "",
      assetName: "",
      categoryId: "",
      zoneId: "",
      subZoneId: "",
      buildingId: "",
      villaApartmentId: "",
      floorId: "",
      roomId: "",
      assetStatus: "",
      startDate: "",
      endDate: "",
    });
    setActiveFilters({});
    setCurrentPage(0);
    setShowFilters(false);
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

  // Helper function to get display name and ID based on data type
  const getDisplayFields = (type, item) => {
    switch (type) {
      case "category":
        return {
          id: item.id || item.categoryId,
          name: item.name || item.categoryName || "Unknown",
        };
      case "zone":
        return {
          id: item.id || item.zoneId,
          name: item.name || item.zoneName || "Unknown",
        };
      case "subZone":
        return {
          id: item.id || item.subZoneId,
          name: item.name || item.subZoneName || "Unknown",
        };
      case "building":
        return {
          id: item.id || item.buildingId,
          name: item.name || item.buildingName || "Unknown",
        };
      case "villaApartment":
        return {
          id: item.id || item.villaApartmentId,
          name: item.name || item.villaApartmentName || "Unknown",
        };
      case "floor":
        return {
          id: item.id || item.floorId,
          name: item.name || item.floorName || "Unknown",
        };
      case "room":
        return {
          id: item.id || item.roomId,
          name: item.name || item.roomName || "Unknown",
        };
      default:
        return { id: item.id, name: item.name || "Unknown" };
    }
  };

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
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2.5 text-sm font-medium border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors ${
                  Object.keys(activeFilters).length > 0
                    ? "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                    : "text-slate-700 bg-white border-slate-300 hover:bg-slate-50"
                }`}
              >
                <Filter className="w-4 h-4 mr-2 inline" />
                Filters{" "}
                {Object.keys(activeFilters).length > 0 &&
                  `(${Object.keys(activeFilters).length})`}
              </button>
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
              <button
                onClick={handleSort}
                className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
              >
                {sortDirection === "desc" ? (
                  <>
                    <ArrowDown className="w-4 h-4 mr-2 inline" />
                    Latest First
                  </>
                ) : (
                  <>
                    <ArrowUp className="w-4 h-4 mr-2 inline" />
                    Oldest First
                  </>
                )}
              </button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div className="border-t border-slate-200 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Asset Tag
                    </label>
                    <input
                      type="text"
                      value={filters.assetTag}
                      onChange={(e) =>
                        handleFilterChange("assetTag", e.target.value)
                      }
                      placeholder="Enter Asset Tag"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Asset Name
                    </label>
                    <input
                      type="text"
                      value={filters.assetName}
                      onChange={(e) =>
                        handleFilterChange("assetName", e.target.value)
                      }
                      placeholder="Enter Asset Name"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Category
                    </label>
                    <select
                      value={filters.categoryId}
                      onChange={(e) =>
                        handleFilterChange("categoryId", e.target.value)
                      }
                      className="w-full pl-3 pr-8 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 appearance-none"
                      disabled={loadingCategories}
                    >
                      <option value="">All Categories</option>
                      {categories.map((category) => {
                        const { id, name } = getDisplayFields(
                          "category",
                          category
                        );
                        return (
                          <option key={id} value={id}>
                            {name}
                          </option>
                        );
                      })}
                    </select>
                    {loadingCategories ? (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-500"></div>
                      </div>
                    ) : (
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                    )}
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Zone
                    </label>
                    <select
                      value={filters.zoneId}
                      onChange={(e) =>
                        handleFilterChange("zoneId", e.target.value)
                      }
                      className="w-full pl-3 pr-8 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 appearance-none"
                      disabled={!selectedContract || loadingZones}
                    >
                      <option value="">
                        {selectedContract
                          ? "All Zones"
                          : "Select a contract first"}
                      </option>
                      {zones.map((zone) => {
                        const { id, name } = getDisplayFields("zone", zone);
                        return (
                          <option key={id} value={id}>
                            {name}
                          </option>
                        );
                      })}
                    </select>
                    {loadingZones ? (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-500"></div>
                      </div>
                    ) : (
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                    )}
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Sub-Zone
                    </label>
                    <select
                      value={filters.subZoneId}
                      onChange={(e) =>
                        handleFilterChange("subZoneId", e.target.value)
                      }
                      className="w-full pl-3 pr-8 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 appearance-none"
                      disabled={!selectedContract || loadingSubZones}
                    >
                      <option value="">
                        {selectedContract
                          ? "All Sub-Zones"
                          : "Select a contract first"}
                      </option>
                      {subZones.map((subZone) => {
                        const { id, name } = getDisplayFields(
                          "subZone",
                          subZone
                        );
                        return (
                          <option key={id} value={id}>
                            {name}
                          </option>
                        );
                      })}
                    </select>
                    {loadingSubZones ? (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-500"></div>
                      </div>
                    ) : (
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                    )}
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Building
                    </label>
                    <select
                      value={filters.buildingId}
                      onChange={(e) =>
                        handleFilterChange("buildingId", e.target.value)
                      }
                      className="w-full pl-3 pr-8 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 appearance-none"
                      disabled={!selectedContract || loadingBuildings}
                    >
                      <option value="">
                        {selectedContract
                          ? "All Buildings"
                          : "Select a contract first"}
                      </option>
                      {buildings.map((building) => {
                        const { id, name } = getDisplayFields(
                          "building",
                          building
                        );
                        return (
                          <option key={id} value={id}>
                            {name}
                          </option>
                        );
                      })}
                    </select>
                    {loadingBuildings ? (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-500"></div>
                      </div>
                    ) : (
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                    )}
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Villa/Apartment
                    </label>
                    <select
                      value={filters.villaApartmentId}
                      onChange={(e) =>
                        handleFilterChange("villaApartmentId", e.target.value)
                      }
                      className="w-full pl-3 pr-8 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 appearance-none"
                      disabled={!selectedContract || loadingVillaApartments}
                    >
                      <option value="">
                        {selectedContract
                          ? "All Villa/Apartments"
                          : "Select a contract first"}
                      </option>
                      {villaApartments.map((villaApartment) => {
                        const { id, name } = getDisplayFields(
                          "villaApartment",
                          villaApartment
                        );
                        return (
                          <option key={id} value={id}>
                            {name}
                          </option>
                        );
                      })}
                    </select>
                    {loadingVillaApartments ? (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-500"></div>
                      </div>
                    ) : (
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                    )}
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Floor
                    </label>
                    <select
                      value={filters.floorId}
                      onChange={(e) =>
                        handleFilterChange("floorId", e.target.value)
                      }
                      className="w-full pl-3 pr-8 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 appearance-none"
                      disabled={!selectedContract || loadingFloors}
                    >
                      <option value="">
                        {selectedContract
                          ? "All Floors"
                          : "Select a contract first"}
                      </option>
                      {floors.map((floor) => {
                        const { id, name } = getDisplayFields("floor", floor);
                        return (
                          <option key={id} value={id}>
                            {name}
                          </option>
                        );
                      })}
                    </select>
                    {loadingFloors ? (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-500"></div>
                      </div>
                    ) : (
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                    )}
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Room
                    </label>
                    <select
                      value={filters.roomId}
                      onChange={(e) =>
                        handleFilterChange("roomId", e.target.value)
                      }
                      className="w-full pl-3 pr-8 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 appearance-none"
                      disabled={!selectedContract || loadingRooms}
                    >
                      <option value="">
                        {selectedContract
                          ? "All Rooms"
                          : "Select a contract first"}
                      </option>
                      {rooms.map((room) => {
                        const { id, name } = getDisplayFields("room", room);
                        return (
                          <option key={id} value={id}>
                            {name}
                          </option>
                        );
                      })}
                    </select>
                    {loadingRooms ? (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-500"></div>
                      </div>
                    ) : (
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                    )}
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Asset Status
                    </label>
                    <select
                      value={filters.assetStatus}
                      onChange={(e) =>
                        handleFilterChange("assetStatus", e.target.value)
                      }
                      className="w-full pl-3 pr-8 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 appearance-none"
                    >
                      <option value="">All Statuses</option>
                      <option value="ACTIVE">Active</option>
                      <option value="UNDER_MAINTENANCE">
                        Under Maintenance
                      </option>
                      <option value="DECOMMISSIONED">Decommissioned</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={filters.startDate}
                      onChange={(e) =>
                        handleFilterChange("startDate", e.target.value)
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={filters.endDate}
                      onChange={(e) =>
                        handleFilterChange("endDate", e.target.value)
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={applyFilters}
                    className="px-4 py-2 text-sm font-medium text-white bg-slate-800 border border-transparent rounded-lg hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
                  >
                    Apply Filters
                  </button>
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}
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
                    className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider"
                  >
                    Asset Tag
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider"
                  >
                    Asset Name
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
                    className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={handleSort}
                  >
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Created Date
                      {sortDirection === "asc" ? (
                        <ArrowUp className="w-4 h-4 ml-1" />
                      ) : (
                        <ArrowDown className="w-4 h-4 ml-1" />
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
                          Try adjusting your filter criteria
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
                  <X className="w-5 h-5" />
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
