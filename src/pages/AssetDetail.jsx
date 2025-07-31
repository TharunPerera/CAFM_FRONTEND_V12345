// "use client";

// import { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import {
//   ArrowLeft,
//   Edit,
//   Trash2,
//   Calendar,
//   Tag,
//   Barcode,
//   Box,
//   Cpu,
//   Info,
//   Building,
//   MapPin,
//   Layers,
//   Home,
//   DoorOpen,
//   Wrench,
//   User,
//   Clock,
//   QrCode,
//   Download,
//   Printer,
//   ImageIcon,
//   ChevronLeft,
//   ChevronRight,
//   AlertCircle,
//   Shield,
//   DollarSign,
//   TrendingDown,
//   FileText,
//   FileDown,
//   FileType,
// } from "lucide-react";
// import { assetService } from "../services/assetService";
// import { toast } from "react-toastify";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// const AssetDetail = () => {
//   const { assetId } = useParams();
//   const navigate = useNavigate();
//   const [asset, setAsset] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [showQRModal, setShowQRModal] = useState(false);
//   const [qrCodeUrl, setQrCodeUrl] = useState(null);
//   const [showPDFModal, setShowPDFModal] = useState(false);
//   const [selectedFields, setSelectedFields] = useState([]);
//   const [generatingPDF, setGeneratingPDF] = useState(false);

//   // Available PDF fields
//   const availableFields = [
//     { key: "assetId", label: "Asset ID", category: "Basic" },
//     { key: "assetTag", label: "Asset Tag", category: "Basic" },
//     { key: "assetName", label: "Asset Name", category: "Basic" },
//     { key: "serialNumber", label: "Serial Number", category: "Basic" },
//     { key: "brandName", label: "Brand Name", category: "Basic" },
//     { key: "modelNumber", label: "Model Number", category: "Basic" },
//     { key: "assetStatus", label: "Asset Status", category: "Basic" },
//     { key: "assetCondition", label: "Asset Condition", category: "Basic" },
//     { key: "observation", label: "Observation", category: "Basic" },
//     { key: "recommendation", label: "Recommendation", category: "Basic" },
//     { key: "purchaseCost", label: "Purchase Cost", category: "Financial" },
//     {
//       key: "depreciationValue",
//       label: "Depreciation Value",
//       category: "Financial",
//     },
//     {
//       key: "depreciationType",
//       label: "Depreciation Type",
//       category: "Financial",
//     },
//     { key: "timeFrameYears", label: "Time Frame Years", category: "Financial" },
//     {
//       key: "currentDepreciatedValue",
//       label: "Current Depreciated Value",
//       category: "Financial",
//     },
//     { key: "companyName", label: "Company Name", category: "Organization" },
//     { key: "contractName", label: "Contract Name", category: "Organization" },
//     { key: "zoneName", label: "Zone Name", category: "Location" },
//     { key: "subZoneName", label: "Sub Zone Name", category: "Location" },
//     { key: "buildingName", label: "Building Name", category: "Location" },
//     {
//       key: "villaApartmentName",
//       label: "Villa/Apartment Name",
//       category: "Location",
//     },
//     { key: "floorName", label: "Floor Name", category: "Location" },
//     { key: "roomName", label: "Room Name", category: "Location" },
//     { key: "serviceName", label: "Service Name", category: "Service" },
//     { key: "subServiceName", label: "Sub Service Name", category: "Service" },
//     {
//       key: "serviceScopeNames",
//       label: "Service Scope Names",
//       category: "Service",
//     },
//     { key: "createdByUsername", label: "Created By", category: "Lifecycle" },
//     { key: "purchaseDate", label: "Purchase Date", category: "Lifecycle" },
//     {
//       key: "installationDate",
//       label: "Installation Date",
//       category: "Lifecycle",
//     },
//     { key: "assetAgeDays", label: "Asset Age (Days)", category: "Lifecycle" },
//     {
//       key: "warrantyPeriodDays",
//       label: "Warranty Period (Days)",
//       category: "Lifecycle",
//     },
//     {
//       key: "remainingWarrantyPeriodDays",
//       label: "Remaining Warranty (Days)",
//       category: "Lifecycle",
//     },
//     {
//       key: "warrantyExpiryDate",
//       label: "Warranty Expiry Date",
//       category: "Lifecycle",
//     },
//     { key: "ownerType", label: "Owner Type", category: "Basic" },
//     { key: "lastAuditDate", label: "Last Audit Date", category: "Lifecycle" },
//     { key: "createdAt", label: "Created At", category: "Lifecycle" },
//     { key: "imageUrls", label: "Asset Images", category: "Media" },
//   ];

//   useEffect(() => {
//     const loadAsset = async () => {
//       try {
//         const response = await assetService.getAssetById(assetId);
//         setAsset(response.data);
//       } catch (error) {
//         console.error("Error loading asset:", error);
//         toast.error("Failed to load asset details");
//         navigate("/assets/list");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadAsset();
//   }, [assetId, navigate]);

//   const handleDelete = async () => {
//     if (window.confirm("Are you sure you want to delete this asset?")) {
//       try {
//         await assetService.deleteAsset(assetId);
//         toast.success("Asset deleted successfully");
//         navigate("/assets/list");
//       } catch (error) {
//         console.error("Error deleting asset:", error);
//         toast.error("Failed to delete asset");
//       }
//     }
//   };

//   const nextImage = () => {
//     if (asset?.imageUrls?.length > 0) {
//       setCurrentImageIndex((prev) => (prev + 1) % asset.imageUrls.length);
//     }
//   };

//   const prevImage = () => {
//     if (asset?.imageUrls?.length > 0) {
//       setCurrentImageIndex((prev) =>
//         prev === 0 ? asset.imageUrls.length - 1 : prev - 1
//       );
//     }
//   };

//   const generateQRCode = async () => {
//     try {
//       const response = await assetService.generateAssetQRCode(assetId);
//       const blob = new Blob([response.data], { type: "image/png" });
//       const url = URL.createObjectURL(blob);
//       setQrCodeUrl(url);
//       setShowQRModal(true);
//     } catch (error) {
//       console.error("Error generating QR code:", error);
//       toast.error("Failed to generate QR code");
//     }
//   };

//   const downloadQRCode = () => {
//     if (qrCodeUrl) {
//       const link = document.createElement("a");
//       link.download = `asset-${asset.assetTag}-qrcode.png`;
//       link.href = qrCodeUrl;
//       link.click();
//     }
//   };

//   const printQRCode = () => {
//     if (qrCodeUrl) {
//       const printWindow = window.open("", "_blank");
//       printWindow.document.write(`
//         <html>
//           <head>
//             <title>Asset QR Code - ${asset.assetTag}</title>
//             <style>
//               body { font-family: Arial, sans-serif; text-align: center; margin: 0; padding: 20px; }
//               .container { margin: 20px auto; max-width: 400px; display: flex; flex-direction: column; align-items: center; justify-content: center; }
//               img { max-width: 100%; width: 300px; height: 300px; }
//               h2 { margin-bottom: 30px; }
//               .asset-tag { margin-top: 20px; font-size: 16px; font-weight: bold; }
//             </style>
//           </head>
//           <body>
//             <div class="container">
//               <h2>Asset QR Code</h2>
//               <img src="${qrCodeUrl}" alt="Asset QR Code" />
//               <div class="asset-tag">Asset Tag: ${asset.assetTag}</div>
//             </div>
//             <script>
//               window.onload = function() { window.print(); }
//             </script>
//           </body>
//         </html>
//       `);
//       printWindow.document.close();
//     }
//   };

//   const handleFieldToggle = (fieldKey) => {
//     setSelectedFields((prev) => {
//       if (prev.includes(fieldKey)) {
//         return prev.filter((key) => key !== fieldKey);
//       } else {
//         return [...prev, fieldKey];
//       }
//     });
//   };

//   const selectAllFields = () => {
//     setSelectedFields(availableFields.map((field) => field.key));
//   };

//   const clearAllFields = () => {
//     setSelectedFields([]);
//   };

//   const generatePDF = async (format = "pdf") => {
//     if (selectedFields.length === 0) {
//       toast.error("Please select at least one field to include in the report");
//       return;
//     }

//     setGeneratingPDF(true);
//     try {
//       if (format === "pdf") {
//         await generatePDFReport();
//       } else {
//         await generateWordReport();
//       }
//       toast.success(`${format.toUpperCase()} report generated successfully`);
//       setShowPDFModal(false);
//     } catch (error) {
//       console.error("Error generating report:", error);
//       toast.error("Failed to generate report");
//     } finally {
//       setGeneratingPDF(false);
//     }
//   };

//   const generatePDFReport = async () => {
//     const doc = new jsPDF();

//     // Header
//     doc.setFontSize(20);
//     doc.setTextColor(40, 116, 240);
//     doc.text("Asset Report", 20, 20);

//     doc.setFontSize(12);
//     doc.setTextColor(100, 100, 100);
//     doc.text(`Asset Tag: ${asset.assetTag}`, 20, 30);
//     doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 38);

//     // Line separator
//     doc.setDrawColor(200, 200, 200);
//     doc.line(20, 45, 190, 45);

//     let yPosition = 55;

//     // Group fields by category
//     const groupedFields = availableFields.reduce((acc, field) => {
//       if (selectedFields.includes(field.key)) {
//         if (!acc[field.category]) {
//           acc[field.category] = [];
//         }
//         acc[field.category].push(field);
//       }
//       return acc;
//     }, {});

//     // Add images if selected
//     if (
//       selectedFields.includes("imageUrls") &&
//       asset.imageUrls &&
//       asset.imageUrls.length > 0
//     ) {
//       if (yPosition > 200) {
//         doc.addPage();
//         yPosition = 20;
//       }

//       doc.setFontSize(14);
//       doc.setTextColor(40, 116, 240);
//       doc.text("Asset Images", 20, yPosition);
//       yPosition += 15;

//       try {
//         for (let i = 0; i < Math.min(asset.imageUrls.length, 4); i++) {
//           const imageUrl = asset.imageUrls[i];

//           // Create a new image element to load the image
//           const img = new Image();
//           img.crossOrigin = "anonymous";

//           await new Promise((resolve, reject) => {
//             img.onload = () => {
//               try {
//                 // Create canvas to convert image
//                 const canvas = document.createElement("canvas");
//                 const ctx = canvas.getContext("2d");
//                 canvas.width = img.width;
//                 canvas.height = img.height;
//                 ctx.drawImage(img, 0, 0);

//                 const imgData = canvas.toDataURL("image/jpeg", 0.8);

//                 // Calculate image dimensions for PDF
//                 const maxWidth = 80;
//                 const maxHeight = 60;
//                 let imgWidth = maxWidth;
//                 let imgHeight = (img.height * maxWidth) / img.width;

//                 if (imgHeight > maxHeight) {
//                   imgHeight = maxHeight;
//                   imgWidth = (img.width * maxHeight) / img.height;
//                 }

//                 // Position images in a 2x2 grid
//                 const col = i % 2;
//                 const row = Math.floor(i / 2);
//                 const x = 20 + col * 90;
//                 const y = yPosition + row * 70;

//                 doc.addImage(imgData, "JPEG", x, y, imgWidth, imgHeight);

//                 // Add image caption
//                 doc.setFontSize(8);
//                 doc.setTextColor(100, 100, 100);
//                 doc.text(`Image ${i + 1}`, x, y + imgHeight + 5);

//                 resolve();
//               } catch (error) {
//                 console.error("Error processing image:", error);
//                 resolve(); // Continue even if one image fails
//               }
//             };

//             img.onerror = () => {
//               console.error("Error loading image:", imageUrl);
//               resolve(); // Continue even if image fails to load
//             };

//             img.src = imageUrl;
//           });
//         }

//         yPosition +=
//           Math.ceil(Math.min(asset.imageUrls.length, 4) / 2) * 70 + 20;
//       } catch (error) {
//         console.error("Error adding images to PDF:", error);
//       }
//     }

//     // Generate sections
//     Object.keys(groupedFields).forEach((category) => {
//       if (category === "Media") return; // Skip media category as it's handled separately

//       if (yPosition > 250) {
//         doc.addPage();
//         yPosition = 20;
//       }

//       // Category header
//       doc.setFontSize(14);
//       doc.setTextColor(40, 116, 240);
//       doc.text(`${category} Information`, 20, yPosition);
//       yPosition += 10;

//       // Category fields
//       const tableData = groupedFields[category].map((field) => {
//         let value = asset[field.key];

//         // Format specific fields
//         if (field.key.includes("Cost") || field.key.includes("Value")) {
//           value =
//             typeof value === "number"
//               ? `$${value.toLocaleString()}`
//               : value || "-";
//         } else if (field.key === "serviceScopeNames" && Array.isArray(value)) {
//           value = value.join(", ");
//         } else if (field.key === "createdAt" && value) {
//           value = new Date(value).toLocaleString();
//         } else {
//           value = value || "-";
//         }

//         return [field.label, value.toString()];
//       });

//       autoTable(doc, {
//         startY: yPosition,
//         head: [["Field", "Value"]],
//         body: tableData,
//         theme: "grid",
//         headStyles: {
//           fillColor: [40, 116, 240],
//           textColor: 255,
//           fontSize: 10,
//           fontStyle: "bold",
//         },
//         bodyStyles: {
//           fontSize: 9,
//           textColor: 50,
//         },
//         alternateRowStyles: {
//           fillColor: [248, 249, 250],
//         },
//         margin: { left: 20, right: 20 },
//         columnStyles: {
//           0: { cellWidth: 60, fontStyle: "bold" },
//           1: { cellWidth: 110 },
//         },
//       });

//       yPosition = doc.lastAutoTable.finalY + 15;
//     });

//     // Footer
//     const pageCount = doc.internal.getNumberOfPages();
//     for (let i = 1; i <= pageCount; i++) {
//       doc.setPage(i);
//       doc.setFontSize(8);
//       doc.setTextColor(150, 150, 150);
//       doc.text(`Page ${i} of ${pageCount}`, 20, 285);
//       doc.text("Generated by CAFM UAE System", 120, 285);
//     }

//     // Save the PDF
//     doc.save(`asset-report-${asset.assetTag}.pdf`);
//   };

//   const generateWordReport = async () => {
//     // Create HTML content for Word document
//     const selectedData = selectedFields.reduce((acc, fieldKey) => {
//       const field = availableFields.find((f) => f.key === fieldKey);
//       if (field) {
//         let value = asset[fieldKey];

//         if (fieldKey.includes("Cost") || fieldKey.includes("Value")) {
//           value =
//             typeof value === "number"
//               ? `$${value.toLocaleString()}`
//               : value || "-";
//         } else if (fieldKey === "serviceScopeNames" && Array.isArray(value)) {
//           value = value.join(", ");
//         } else if (fieldKey === "createdAt" && value) {
//           value = new Date(value).toLocaleString();
//         } else if (fieldKey === "imageUrls" && Array.isArray(value)) {
//           value = `${value.length} image(s) attached`;
//         } else {
//           value = value || "-";
//         }

//         acc[field.category] = acc[field.category] || [];
//         acc[field.category].push({
//           label: field.label,
//           value: value.toString(),
//         });
//       }
//       return acc;
//     }, {});

//     const htmlContent = `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <meta charset="utf-8">
//           <title>Asset Report - ${asset.assetTag}</title>
//           <style>
//             body { font-family: Arial, sans-serif; margin: 40px; color: #333; line-height: 1.6; }
//             .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #2874f0; padding-bottom: 20px; }
//             .header h1 { color: #2874f0; margin: 0; font-size: 28px; }
//             .header p { color: #666; margin: 5px 0; font-size: 14px; }
//             .section { margin-bottom: 30px; page-break-inside: avoid; }
//             .section h2 { color: #2874f0; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px; font-size: 18px; }
//             .field-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
//             .field { padding: 15px; background: #f8f9fa; border-left: 4px solid #2874f0; border-radius: 4px; }
//             .field-label { font-weight: bold; color: #495057; margin-bottom: 8px; font-size: 14px; }
//             .field-value { color: #212529; font-size: 14px; word-wrap: break-word; }
//             .footer { margin-top: 50px; text-align: center; color: #666; border-top: 1px solid #ddd; padding-top: 20px; font-size: 12px; }
//             .images { display: flex; flex-wrap: wrap; gap: 10px; margin: 20px 0; }
//             .images img { max-width: 200px; max-height: 150px; object-fit: cover; border: 1px solid #ddd; border-radius: 4px; }
//             @media print {
//               body { margin: 20px; }
//               .section { page-break-inside: avoid; }
//             }
//           </style>
//         </head>
//         <body>
//           <div class="header">
//             <h1>Asset Report</h1>
//             <p><strong>Asset Tag:</strong> ${asset.assetTag}</p>
//             <p><strong>Asset Name:</strong> ${asset.assetName}</p>
//             <p><strong>Generated on:</strong> ${new Date().toLocaleDateString()}</p>
//           </div>

//           ${
//             selectedFields.includes("imageUrls") &&
//             asset.imageUrls &&
//             asset.imageUrls.length > 0
//               ? `
//           <div class="section">
//             <h2>Asset Images</h2>
//             <div class="images">
//               ${asset.imageUrls
//                 .map(
//                   (url, index) => `
//                 <img src="${url}" alt="Asset Image ${index + 1}" />
//               `
//                 )
//                 .join("")}
//             </div>
//           </div>
//           `
//               : ""
//           }

//           ${Object.keys(selectedData)
//             .filter((category) => category !== "Media")
//             .map(
//               (category) => `
//             <div class="section">
//               <h2>${category} Information</h2>
//               <div class="field-grid">
//                 ${selectedData[category]
//                   .map(
//                     (field) => `
//                   <div class="field">
//                     <div class="field-label">${field.label}</div>
//                     <div class="field-value">${field.value}</div>
//                   </div>
//                 `
//                   )
//                   .join("")}
//               </div>
//             </div>
//           `
//             )
//             .join("")}

//           <div class="footer">
//             <p><strong>This report was generated by CAFM UAE System</strong></p>
//             <p>Report contains ${
//               selectedFields.length
//             } selected fields across ${
//       Object.keys(selectedData).length
//     } categories</p>
//           </div>
//         </body>
//       </html>
//     `;

//     // Create and download Word document
//     const blob = new Blob([htmlContent], {
//       type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = `asset-report-${asset.assetTag}.doc`;
//     link.click();
//     URL.revokeObjectURL(url);
//   };

//   useEffect(() => {
//     return () => {
//       if (qrCodeUrl) {
//         URL.revokeObjectURL(qrCodeUrl);
//       }
//     };
//   }, [qrCodeUrl]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center">
//         <div className="bg-white p-8 rounded-2xl shadow-xl">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <span className="block mt-4 text-lg font-medium text-gray-700 text-center">
//             Loading...
//           </span>
//         </div>
//       </div>
//     );
//   }

//   if (!asset) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center">
//         <div className="text-center py-12 bg-white rounded-2xl shadow-xl p-8">
//           <p className="text-xl text-gray-600 mb-4">Asset not found</p>
//           <Link
//             to="/assets/list"
//             className="inline-flex items-center text-blue-600 hover:underline"
//           >
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back to Asset List
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   // Helper function to format monetary values
//   const formatCurrency = (value) => {
//     if (value == null || isNaN(Number(value))) return "-";
//     return `$${Number(value).toLocaleString(undefined, {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     })}`;
//   };

//   // Helper function to format depreciation value
//   const formatDepreciationValue = () => {
//     if (!asset.depreciationValue || isNaN(Number(asset.depreciationValue)))
//       return "-";
//     return asset.depreciationType === "PERCENTAGE"
//       ? `${asset.depreciationValue}%`
//       : formatCurrency(asset.depreciationValue);
//   };

//   const groupedFields = availableFields.reduce((acc, field) => {
//     if (!acc[field.category]) {
//       acc[field.category] = [];
//     }
//     acc[field.category].push(field);
//     return acc;
//   }, {});

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => navigate("/assets/list")}
//                 className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
//               >
//                 <ArrowLeft className="w-5 h-5 text-gray-600" />
//               </button>
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">
//                   Asset Details
//                 </h1>
//                 <p className="text-gray-600 mt-1">
//                   Complete asset information and management
//                 </p>
//               </div>
//             </div>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setShowPDFModal(true)}
//                 className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
//               >
//                 <FileDown className="w-5 h-5 mr-2" />
//                 Generate Report
//               </button>
//               <button
//                 onClick={generateQRCode}
//                 className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl"
//               >
//                 <QrCode className="w-5 h-5 mr-2" />
//                 Generate QR Code
//               </button>
//               <Link
//                 to={`/assets/edit/${assetId}`}
//                 className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
//               >
//                 <Edit className="w-5 h-5 mr-2" />
//                 Edit Asset
//               </Link>
//               <button
//                 onClick={handleDelete}
//                 className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl"
//               >
//                 <Trash2 className="w-5 h-5 mr-2" />
//                 Delete Asset
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Warning for missing financial info */}
//         {(!asset.purchaseCost ||
//           !asset.depreciationValue ||
//           !asset.timeFrameYears) && (
//           <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
//             <div className="flex">
//               <AlertCircle className="h-5 w-5 text-yellow-400" />
//               <div className="ml-3">
//                 <p className="text-sm text-yellow-700">
//                   Some financial information is missing, which may affect the
//                   accuracy of the current depreciated value.
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Images and Financial Info */}
//           <div className="lg:col-span-1 space-y-8">
//             {/* Asset Images */}
//             <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
//               <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
//                 <div className="p-2 bg-blue-100 rounded-lg mr-3">
//                   <ImageIcon className="w-5 h-5 text-blue-600" />
//                 </div>
//                 Asset Images
//               </h2>
//               {asset.imageUrls && asset.imageUrls.length > 0 ? (
//                 <div className="space-y-4">
//                   <div className="relative">
//                     <img
//                       src={
//                         asset.imageUrls[currentImageIndex] || "/placeholder.svg"
//                       }
//                       alt={`Asset image ${currentImageIndex + 1}`}
//                       className="w-full h-64 object-cover rounded-xl border-2 border-gray-200"
//                     />
//                     {asset.imageUrls.length > 1 && (
//                       <>
//                         <button
//                           onClick={prevImage}
//                           className="absolute left-3 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all"
//                         >
//                           <ChevronLeft className="w-5 h-5" />
//                         </button>
//                         <button
//                           onClick={nextImage}
//                           className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all"
//                         >
//                           <ChevronRight className="w-5 h-5" />
//                         </button>
//                       </>
//                     )}
//                   </div>
//                   {asset.imageUrls.length > 1 && (
//                     <div className="flex space-x-2 overflow-x-auto pb-2">
//                       {asset.imageUrls.map((url, index) => (
//                         <button
//                           key={index}
//                           onClick={() => setCurrentImageIndex(index)}
//                           className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden transition-all ${
//                             index === currentImageIndex
//                               ? "border-blue-500 shadow-lg"
//                               : "border-gray-300 hover:border-gray-400"
//                           }`}
//                         >
//                           <img
//                             src={url || "/placeholder.svg"}
//                             alt={`Thumbnail ${index + 1}`}
//                             className="w-full h-full object-cover"
//                           />
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                   <p className="text-sm text-gray-500 text-center">
//                     Image {currentImageIndex + 1} of {asset.imageUrls.length}
//                   </p>
//                 </div>
//               ) : (
//                 <div className="text-center py-12">
//                   <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                   <p className="text-gray-500">No images available</p>
//                 </div>
//               )}
//             </div>

//             {/* Financial Information */}
//             <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
//               <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
//                 <div className="p-2 bg-emerald-100 rounded-lg mr-3">
//                   <DollarSign className="w-5 h-5 text-emerald-600" />
//                 </div>
//                 Financial Information
//               </h2>
//               <div className="space-y-6">
//                 <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
//                   <div className="flex items-center mb-2">
//                     <DollarSign className="w-5 h-5 mr-2 text-green-600" />
//                     <p className="text-sm font-semibold text-gray-700">
//                       Purchase Cost
//                     </p>
//                   </div>
//                   <p className="text-2xl font-bold text-green-600">
//                     {formatCurrency(asset.purchaseCost)}
//                   </p>
//                 </div>

//                 <div className="grid grid-cols-1 gap-4">
//                   <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                     <span className="text-sm text-gray-600">
//                       Depreciation Type
//                     </span>
//                     <span className="font-medium">
//                       {asset.depreciationType
//                         ? asset.depreciationType.replace("_", " ")
//                         : "-"}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                     <span className="text-sm text-gray-600">
//                       Depreciation Value
//                     </span>
//                     <span className="font-medium">
//                       {formatDepreciationValue()}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                     <span className="text-sm text-gray-600">Time Frame</span>
//                     <span className="font-medium">
//                       {asset.timeFrameYears
//                         ? `${asset.timeFrameYears} years`
//                         : "-"}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
//                   <div className="flex items-center mb-2">
//                     <TrendingDown className="w-5 h-5 mr-2 text-blue-600" />
//                     <p className="text-sm font-semibold text-gray-700">
//                       Current Depreciated Value
//                     </p>
//                   </div>
//                   <p className="text-2xl font-bold text-blue-600">
//                     {formatCurrency(asset.currentDepreciatedValue)}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Asset Age & Warranty */}
//             <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
//               <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
//                 <div className="p-2 bg-purple-100 rounded-lg mr-3">
//                   <Shield className="w-5 h-5 text-purple-600" />
//                 </div>
//                 Asset Age & Warranty
//               </h2>
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                   <span className="text-sm text-gray-600">Asset Age</span>
//                   <span className="font-medium">
//                     {asset.assetAgeDays ? `${asset.assetAgeDays} days` : "-"}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                   <span className="text-sm text-gray-600">Warranty Period</span>
//                   <span className="font-medium">
//                     {asset.warrantyPeriodDays
//                       ? `${asset.warrantyPeriodDays} days`
//                       : "-"}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                   <span className="text-sm text-gray-600">
//                     Remaining Warranty
//                   </span>
//                   <span className="font-medium">
//                     {asset.remainingWarrantyPeriodDays !== null
//                       ? `${asset.remainingWarrantyPeriodDays} days`
//                       : "-"}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                   <span className="text-sm text-gray-600">Warranty Expiry</span>
//                   <span className="font-medium">
//                     {asset.warrantyExpiryDate || "-"}
//                   </span>
//                 </div>

//                 {asset.remainingWarrantyPeriodDays !== null &&
//                   asset.remainingWarrantyPeriodDays <= 30 && (
//                     <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-lg">
//                       <div className="flex">
//                         <AlertCircle className="h-5 w-5 text-yellow-400" />
//                         <div className="ml-3">
//                           <p className="text-sm text-yellow-700">
//                             {asset.remainingWarrantyPeriodDays <= 0
//                               ? "Warranty has expired!"
//                               : `Warranty expires soon (${asset.remainingWarrantyPeriodDays} days remaining)!`}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Detailed Information */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Basic Information */}
//             <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//               <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
//                 <div className="p-2 bg-orange-100 rounded-lg mr-3">
//                   <Info className="w-5 h-5 text-orange-600" />
//                 </div>
//                 Basic Information
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <div className="space-y-6">
//                   <div className="flex items-start">
//                     <Tag className="w-5 h-5 mr-3 text-gray-500 mt-1" />
//                     <div>
//                       <p className="text-sm font-semibold text-gray-700">
//                         Asset Tag
//                       </p>
//                       <p className="text-lg font-medium text-gray-900">
//                         {asset.assetTag}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-start">
//                     <Tag className="w-5 h-5 mr-3 text-gray-500 mt-1" />
//                     <div>
//                       <p className="text-sm font-semibold text-gray-700">
//                         Asset Name
//                       </p>
//                       <p className="text-lg font-medium text-gray-900">
//                         {asset.assetName}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-start">
//                     <Barcode className="w-5 h-5 mr-3 text-gray-500 mt-1" />
//                     <div>
//                       <p className="text-sm font-semibold text-gray-700">
//                         Serial Number
//                       </p>
//                       <p className="text-lg font-medium text-gray-900">
//                         {asset.serialNumber || "-"}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-start">
//                     <User className="w-5 h-5 mr-3 text-gray-500 mt-1" />
//                     <div>
//                       <p className="text-sm font-semibold text-gray-700">
//                         Owner Type
//                       </p>
//                       <p className="text-lg font-medium text-gray-900">
//                         {asset.ownerType}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="space-y-6">
//                   <div className="flex items-start">
//                     <Box className="w-5 h-5 mr-3 text-gray-500 mt-1" />
//                     <div>
//                       <p className="text-sm font-semibold text-gray-700">
//                         Brand Name
//                       </p>
//                       <p className="text-lg font-medium text-gray-900">
//                         {asset.brandName || "-"}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-start">
//                     <Cpu className="w-5 h-5 mr-3 text-gray-500 mt-1" />
//                     <div>
//                       <p className="text-sm font-semibold text-gray-700">
//                         Model Number
//                       </p>
//                       <p className="text-lg font-medium text-gray-900">
//                         {asset.modelNumber || "-"}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-start">
//                     <div className="w-5 h-5 mr-3 mt-1">
//                       <div
//                         className={`w-full h-full rounded-full ${
//                           asset.assetStatus === "ACTIVE"
//                             ? "bg-green-500"
//                             : asset.assetStatus === "UNDER_MAINTENANCE"
//                             ? "bg-yellow-500"
//                             : "bg-red-500"
//                         }`}
//                       ></div>
//                     </div>
//                     <div>
//                       <p className="text-sm font-semibold text-gray-700">
//                         Status
//                       </p>
//                       <span
//                         className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
//                           asset.assetStatus === "ACTIVE"
//                             ? "bg-green-100 text-green-800"
//                             : asset.assetStatus === "UNDER_MAINTENANCE"
//                             ? "bg-yellow-100 text-yellow-800"
//                             : "bg-red-100 text-red-800"
//                         }`}
//                       >
//                         {asset.assetStatus.replace("_", " ")}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="flex items-start">
//                     <div className="w-5 h-5 mr-3 mt-1">
//                       <div
//                         className={`w-full h-full rounded-full ${
//                           asset.assetCondition === "EXCELLENT"
//                             ? "bg-green-500"
//                             : asset.assetCondition === "GOOD"
//                             ? "bg-blue-500"
//                             : asset.assetCondition === "AVERAGE"
//                             ? "bg-yellow-500"
//                             : "bg-red-500"
//                         }`}
//                       ></div>
//                     </div>
//                     <div>
//                       <p className="text-sm font-semibold text-gray-700">
//                         Condition
//                       </p>
//                       <span
//                         className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
//                           asset.assetCondition === "EXCELLENT"
//                             ? "bg-green-100 text-green-800"
//                             : asset.assetCondition === "GOOD"
//                             ? "bg-blue-100 text-blue-800"
//                             : asset.assetCondition === "AVERAGE"
//                             ? "bg-yellow-100 text-yellow-800"
//                             : "bg-red-100 text-red-800"
//                         }`}
//                       >
//                         {asset.assetCondition}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {(asset.observation || asset.recommendation) && (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-8 border-t border-gray-200">
//                   {asset.observation && (
//                     <div className="flex items-start">
//                       <FileText className="w-5 h-5 mr-3 text-gray-500 mt-1" />
//                       <div>
//                         <p className="text-sm font-semibold text-gray-700">
//                           Observation
//                         </p>
//                         <p className="text-gray-900 mt-1">
//                           {asset.observation}
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                   {asset.recommendation && (
//                     <div className="flex items-start">
//                       <FileText className="w-5 h-5 mr-3 text-gray-500 mt-1" />
//                       <div>
//                         <p className="text-sm font-semibold text-gray-700">
//                           Recommendation
//                         </p>
//                         <p className="text-gray-900 mt-1">
//                           {asset.recommendation}
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Location Information */}
//             <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//               <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
//                 <div className="p-2 bg-green-100 rounded-lg mr-3">
//                   <MapPin className="w-5 h-5 text-green-600" />
//                 </div>
//                 Location Information
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 <div className="flex items-start">
//                   <MapPin className="w-5 h-5 mr-3 text-gray-500 mt-1" />
//                   <div>
//                     <p className="text-sm font-semibold text-gray-700">Zone</p>
//                     <p className="text-lg font-medium text-gray-900">
//                       {asset.zoneName}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start">
//                   <Layers className="w-5 h-5 mr-3 text-gray-500 mt-1" />
//                   <div>
//                     <p className="text-sm font-semibold text-gray-700">
//                       Sub Zone
//                     </p>
//                     <p className="text-lg font-medium text-gray-900">
//                       {asset.subZoneName}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start">
//                   <Building className="w-5 h-5 mr-3 text-gray-500 mt-1" />
//                   <div>
//                     <p className="text-sm font-semibold text-gray-700">
//                       Building
//                     </p>
//                     <p className="text-lg font-medium text-gray-900">
//                       {asset.buildingName}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start">
//                   <Home className="w-5 h-5 mr-3 text-gray-500 mt-1" />
//                   <div>
//                     <p className="text-sm font-semibold text-gray-700">
//                       Villa/Apartment
//                     </p>
//                     <p className="text-lg font-medium text-gray-900">
//                       {asset.villaApartmentName}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start">
//                   <Layers className="w-5 h-5 mr-3 text-gray-500 mt-1" />
//                   <div>
//                     <p className="text-sm font-semibold text-gray-700">Floor</p>
//                     <p className="text-lg font-medium text-gray-900">
//                       {asset.floorName}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start">
//                   <DoorOpen className="w-5 h-5 mr-3 text-gray-500 mt-1" />
//                   <div>
//                     <p className="text-sm font-semibold text-gray-700">Room</p>
//                     <p className="text-lg font-medium text-gray-900">
//                       {asset.roomName}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Service Information */}
//             <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//               <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
//                 <div className="p-2 bg-purple-100 rounded-lg mr-3">
//                   <Wrench className="w-5 h-5 text-purple-600" />
//                 </div>
//                 Service Information
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div className="flex items-start">
//                   <Wrench className="w-5 h-5 mr-3 text-gray-500 mt-1" />
//                   <div>
//                     <p className="text-sm font-semibold text-gray-700">
//                       Service
//                     </p>
//                     <p className="text-lg font-medium text-gray-900">
//                       {asset.serviceName}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start">
//                   <Wrench className="w-5 h-5 mr-3 text-gray-500 mt-1" />
//                   <div>
//                     <p className="text-sm font-semibold text-gray-700">
//                       Sub Service
//                     </p>
//                     <p className="text-lg font-medium text-gray-900">
//                       {asset.subServiceName}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start">
//                   <Wrench className="w-5 h-5 mr-3 text-gray-500 mt-1" />
//                   <div>
//                     <p className="text-sm font-semibold text-gray-700">
//                       Service Scopes
//                     </p>
//                     <div className="mt-1">
//                       {asset.serviceScopeNames &&
//                       asset.serviceScopeNames.length > 0 ? (
//                         <div className="flex flex-wrap gap-2">
//                           {asset.serviceScopeNames.map((scope, index) => (
//                             <span
//                               key={index}
//                               className="inline-flex px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full"
//                             >
//                               {scope}
//                             </span>
//                           ))}
//                         </div>
//                       ) : (
//                         <p className="text-gray-500">-</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Lifecycle Information */}
//             <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//               <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
//                 <div className="p-2 bg-indigo-100 rounded-lg mr-3">
//                   <Clock className="w-5 h-5 text-indigo-600" />
//                 </div>
//                 Lifecycle Information
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <div className="space-y-6">
//                   <div className="flex items-start">
//                     <Calendar className="w-5 h-5 mr-3 text-gray-500 mt-1" />
//                     <div>
//                       <p className="text-sm font-semibold text-gray-700">
//                         Purchase Date
//                       </p>
//                       <p className="text-lg font-medium text-gray-900">
//                         {asset.purchaseDate || "-"}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-start">
//                     <Calendar className="w-5 h-5 mr-3 text-gray-500 mt-1" />
//                     <div>
//                       <p className="text-sm font-semibold text-gray-700">
//                         Installation Date
//                       </p>
//                       <p className="text-lg font-medium text-gray-900">
//                         {asset.installationDate || "-"}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-start">
//                     <Calendar className="w-5 h-5 mr-3 text-gray-500 mt-1" />
//                     <div>
//                       <p className="text-sm font-semibold text-gray-700">
//                         Last Audit Date
//                       </p>
//                       <p className="text-lg font-medium text-gray-900">
//                         {asset.lastAuditDate || "-"}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="space-y-6">
//                   <div className="flex items-start">
//                     <User className="w-5 h-5 mr-3 text-gray-500 mt-1" />
//                     <div>
//                       <p className="text-sm font-semibold text-gray-700">
//                         Created By
//                       </p>
//                       <p className="text-lg font-medium text-gray-900">
//                         {asset.createdByUsername || "-"}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-start">
//                     <Calendar className="w-5 h-5 mr-3 text-gray-500 mt-1" />
//                     <div>
//                       <p className="text-sm font-semibold text-gray-700">
//                         Created At
//                       </p>
//                       <p className="text-lg font-medium text-gray-900">
//                         {asset.createdAt
//                           ? new Date(asset.createdAt).toLocaleString()
//                           : "-"}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-start">
//                     <Building className="w-5 h-5 mr-3 text-gray-500 mt-1" />
//                     <div>
//                       <p className="text-sm font-semibold text-gray-700">
//                         Company
//                       </p>
//                       <p className="text-lg font-medium text-gray-900">
//                         {asset.companyName}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-start">
//                     <FileText className="w-5 h-5 mr-3 text-gray-500 mt-1" />
//                     <div>
//                       <p className="text-sm font-semibold text-gray-700">
//                         Contract
//                       </p>
//                       <p className="text-lg font-medium text-gray-900">
//                         {asset.contractName}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* QR Code Modal */}
//         {showQRModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-xl font-bold text-gray-900">
//                   Asset QR Code
//                 </h3>
//                 <button
//                   onClick={() => {
//                     setShowQRModal(false);
//                     setQrCodeUrl(null);
//                   }}
//                   className="text-gray-500 hover:text-gray-700 text-2xl"
//                 >
//                   ×
//                 </button>
//               </div>
//               <div className="text-center">
//                 {qrCodeUrl ? (
//                   <img
//                     src={qrCodeUrl || "/placeholder.svg"}
//                     alt="Asset QR Code"
//                     className="mx-auto mb-6 w-[300px] h-[300px] border-2 border-gray-200 rounded-xl"
//                   />
//                 ) : (
//                   <div className="flex justify-center items-center h-[300px]">
//                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                   </div>
//                 )}
//                 <p className="text-sm text-gray-600 mb-6">
//                   Scan this QR code to access asset information.
//                 </p>
//                 <div className="flex gap-3 justify-center">
//                   <button
//                     onClick={downloadQRCode}
//                     className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                     disabled={!qrCodeUrl}
//                   >
//                     <Download className="w-4 h-4 mr-2" />
//                     Download
//                   </button>
//                   <button
//                     onClick={printQRCode}
//                     className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
//                     disabled={!qrCodeUrl}
//                   >
//                     <Printer className="w-4 h-4 mr-2" />
//                     Print
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* PDF Generation Modal */}
//         {showPDFModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-2xl font-bold text-gray-900">
//                   Generate Asset Report
//                 </h3>
//                 <button
//                   onClick={() => setShowPDFModal(false)}
//                   className="text-gray-500 hover:text-gray-700 text-2xl"
//                 >
//                   ×
//                 </button>
//               </div>

//               <div className="mb-6">
//                 <p className="text-gray-600 mb-4">
//                   Select the fields you want to include in your asset report:
//                 </p>
//                 <div className="flex gap-3 mb-4">
//                   <button
//                     onClick={selectAllFields}
//                     className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                   >
//                     Select All
//                   </button>
//                   <button
//                     onClick={clearAllFields}
//                     className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
//                   >
//                     Clear All
//                   </button>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//                 {Object.keys(groupedFields).map((category) => (
//                   <div key={category} className="bg-gray-50 p-4 rounded-xl">
//                     <h4 className="font-semibold text-gray-900 mb-3">
//                       {category}
//                     </h4>
//                     <div className="space-y-2">
//                       {groupedFields[category].map((field) => (
//                         <label
//                           key={field.key}
//                           className="flex items-center cursor-pointer"
//                         >
//                           <input
//                             type="checkbox"
//                             checked={selectedFields.includes(field.key)}
//                             onChange={() => handleFieldToggle(field.key)}
//                             className="mr-3 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
//                           />
//                           <span className="text-sm text-gray-700">
//                             {field.label}
//                           </span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="flex justify-between items-center">
//                 <p className="text-sm text-gray-600">
//                   {selectedFields.length} field
//                   {selectedFields.length !== 1 ? "s" : ""} selected
//                 </p>
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => setShowPDFModal(false)}
//                     className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={() => generatePDF("word")}
//                     disabled={generatingPDF || selectedFields.length === 0}
//                     className="inline-flex items-center px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 transition-colors"
//                   >
//                     {generatingPDF ? (
//                       <>
//                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                         Generating...
//                       </>
//                     ) : (
//                       <>
//                         <FileType className="w-4 h-4 mr-2" />
//                         Generate Word
//                       </>
//                     )}
//                   </button>
//                   <button
//                     onClick={() => generatePDF("pdf")}
//                     disabled={generatingPDF || selectedFields.length === 0}
//                     className="inline-flex items-center px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
//                   >
//                     {generatingPDF ? (
//                       <>
//                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                         Generating...
//                       </>
//                     ) : (
//                       <>
//                         <FileDown className="w-4 h-4 mr-2" />
//                         Generate PDF
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AssetDetail;

"use client";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Calendar,
  Tag,
  Barcode,
  Box,
  Cpu,
  Info,
  Building,
  MapPin,
  Layers,
  Home,
  DoorOpen,
  Wrench,
  User,
  Clock,
  QrCode,
  Download,
  Printer,
  ImageIcon,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Shield,
  DollarSign,
  TrendingDown,
  FileText,
  FileDown,
  FileType,
} from "lucide-react";
import { assetService } from "../services/assetService";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const AssetDetail = () => {
  const { assetId } = useParams();
  const navigate = useNavigate();
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [showPDFModal, setShowPDFModal] = useState(false);
  const [selectedFields, setSelectedFields] = useState([]);
  const [generatingPDF, setGeneratingPDF] = useState(false);

  // Available PDF fields
  const availableFields = [
    { key: "assetId", label: "Asset ID", category: "Basic" },
    { key: "assetTag", label: "Asset Tag", category: "Basic" },
    { key: "assetName", label: "Asset Name", category: "Basic" },
    { key: "serialNumber", label: "Serial Number", category: "Basic" },
    { key: "brandName", label: "Brand Name", category: "Basic" },
    { key: "modelNumber", label: "Model Number", category: "Basic" },
    { key: "assetStatus", label: "Asset Status", category: "Basic" },
    { key: "assetCondition", label: "Asset Condition", category: "Basic" },
    { key: "observation", label: "Observation", category: "Basic" },
    { key: "recommendation", label: "Recommendation", category: "Basic" },
    { key: "purchaseCost", label: "Purchase Cost", category: "Financial" },
    {
      key: "depreciationValue",
      label: "Depreciation Value",
      category: "Financial",
    },
    {
      key: "depreciationType",
      label: "Depreciation Type",
      category: "Financial",
    },
    { key: "timeFrameYears", label: "Time Frame Years", category: "Financial" },
    {
      key: "currentDepreciatedValue",
      label: "Current Depreciated Value",
      category: "Financial",
    },
    { key: "companyName", label: "Company Name", category: "Organization" },
    { key: "contractName", label: "Contract Name", category: "Organization" },
    { key: "zoneName", label: "Zone Name", category: "Location" },
    { key: "subZoneName", label: "Sub Zone Name", category: "Location" },
    { key: "buildingName", label: "Building Name", category: "Location" },
    {
      key: "villaApartmentName",
      label: "Villa/Apartment Name",
      category: "Location",
    },
    { key: "floorName", label: "Floor Name", category: "Location" },
    { key: "roomName", label: "Room Name", category: "Location" },
    { key: "subServices", label: "Sub Services", category: "Service" },
    {
      key: "serviceScopeNames",
      label: "Service Scope Names",
      category: "Service",
    },
    { key: "createdByUsername", label: "Created By", category: "Lifecycle" },
    { key: "purchaseDate", label: "Purchase Date", category: "Lifecycle" },
    {
      key: "installationDate",
      label: "Installation Date",
      category: "Lifecycle",
    },
    { key: "assetAgeDays", label: "Asset Age (Days)", category: "Lifecycle" },
    {
      key: "warrantyPeriodDays",
      label: "Warranty Period (Days)",
      category: "Lifecycle",
    },
    {
      key: "remainingWarrantyPeriodDays",
      label: "Remaining Warranty (Days)",
      category: "Lifecycle",
    },
    {
      key: "warrantyExpiryDate",
      label: "Warranty Expiry Date",
      category: "Lifecycle",
    },
    { key: "ownerType", label: "Owner Type", category: "Basic" },
    { key: "lastAuditDate", label: "Last Audit Date", category: "Lifecycle" },
    { key: "createdAt", label: "Created At", category: "Lifecycle" },
    { key: "imageUrls", label: "Asset Images", category: "Media" },
  ];

  useEffect(() => {
    const loadAsset = async () => {
      try {
        const response = await assetService.getAssetById(assetId);
        setAsset(response.data);
      } catch (error) {
        console.error("Error loading asset:", error);
        toast.error("Failed to load asset details");
        navigate("/assets/list");
      } finally {
        setLoading(false);
      }
    };

    loadAsset();
  }, [assetId, navigate]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this asset?")) {
      try {
        await assetService.deleteAsset(assetId);
        toast.success("Asset deleted successfully");
        navigate("/assets/list");
      } catch (error) {
        console.error("Error deleting asset:", error);
        toast.error("Failed to delete asset");
      }
    }
  };

  const nextImage = () => {
    if (asset?.imageUrls?.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % asset.imageUrls.length);
    }
  };

  const prevImage = () => {
    if (asset?.imageUrls?.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? asset.imageUrls.length - 1 : prev - 1
      );
    }
  };

  const generateQRCode = async () => {
    try {
      const response = await assetService.generateAssetQRCode(assetId);
      const blob = new Blob([response.data], { type: "image/png" });
      const url = URL.createObjectURL(blob);
      setQrCodeUrl(url);
      setShowQRModal(true);
    } catch (error) {
      console.error("Error generating QR code:", error);
      toast.error("Failed to generate QR code");
    }
  };

  const downloadQRCode = () => {
    if (qrCodeUrl) {
      const link = document.createElement("a");
      link.download = `asset-${asset.assetTag}-qrcode.png`;
      link.href = qrCodeUrl;
      link.click();
    }
  };

  const printQRCode = () => {
    if (qrCodeUrl) {
      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
        <html>
          <head>
            <title>Asset QR Code - ${asset.assetTag}</title>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; margin: 0; padding: 20px; }
              .container { margin: 20px auto; max-width: 400px; display: flex; flex-direction: column; align-items: center; justify-content: center; }
              img { max-width: 100%; width: 300px; height: 300px; }
              h2 { margin-bottom: 30px; }
              .asset-tag { margin-top: 20px; font-size: 16px; font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>Asset QR Code</h2>
              <img src="${qrCodeUrl}" alt="Asset QR Code" />
              <div class="asset-tag">Asset Tag: ${asset.assetTag}</div>
            </div>
            <script>
              window.onload = function() { window.print(); }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const handleFieldToggle = (fieldKey) => {
    setSelectedFields((prev) => {
      if (prev.includes(fieldKey)) {
        return prev.filter((key) => key !== fieldKey);
      } else {
        return [...prev, fieldKey];
      }
    });
  };

  const selectAllFields = () => {
    setSelectedFields(availableFields.map((field) => field.key));
  };

  const clearAllFields = () => {
    setSelectedFields([]);
  };

  const generatePDF = async (format = "pdf") => {
    if (selectedFields.length === 0) {
      toast.error("Please select at least one field to include in the report");
      return;
    }

    setGeneratingPDF(true);
    try {
      if (format === "pdf") {
        await generatePDFReport();
      } else {
        await generateWordReport();
      }
      toast.success(`${format.toUpperCase()} report generated successfully`);
      setShowPDFModal(false);
    } catch (error) {
      console.error("Error generating report:", error);
      toast.error("Failed to generate report");
    } finally {
      setGeneratingPDF(false);
    }
  };

  const generatePDFReport = async () => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.setTextColor(40, 116, 240);
    doc.text("Asset Report", 20, 20);
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Asset Tag: ${asset.assetTag}`, 20, 30);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 38);

    // Line separator
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 45, 190, 45);

    let yPosition = 55;

    // Group fields by category
    const groupedFields = availableFields.reduce((acc, field) => {
      if (selectedFields.includes(field.key)) {
        if (!acc[field.category]) {
          acc[field.category] = [];
        }
        acc[field.category].push(field);
      }
      return acc;
    }, {});

    // Add images if selected
    if (
      selectedFields.includes("imageUrls") &&
      asset.imageUrls &&
      asset.imageUrls.length > 0
    ) {
      if (yPosition > 200) {
        doc.addPage();
        yPosition = 20;
      }
      doc.setFontSize(14);
      doc.setTextColor(40, 116, 240);
      doc.text("Asset Images", 20, yPosition);
      yPosition += 15;

      try {
        for (let i = 0; i < Math.min(asset.imageUrls.length, 4); i++) {
          const imageUrl = asset.imageUrls[i];
          const img = new Image();
          img.crossOrigin = "anonymous";
          await new Promise((resolve, reject) => {
            img.onload = () => {
              try {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const imgData = canvas.toDataURL("image/jpeg", 0.8);

                const maxWidth = 80;
                const maxHeight = 60;
                let imgWidth = maxWidth;
                let imgHeight = (img.height * maxWidth) / img.width;
                if (imgHeight > maxHeight) {
                  imgHeight = maxHeight;
                  imgWidth = (img.width * maxHeight) / img.height;
                }

                const col = i % 2;
                const row = Math.floor(i / 2);
                const x = 20 + col * 90;
                const y = yPosition + row * 70;

                doc.addImage(imgData, "JPEG", x, y, imgWidth, imgHeight);
                doc.setFontSize(8);
                doc.setTextColor(100, 100, 100);
                doc.text(`Image ${i + 1}`, x, y + imgHeight + 5);
                resolve();
              } catch (error) {
                console.error("Error processing image:", error);
                resolve();
              }
            };
            img.onerror = () => {
              console.error("Error loading image:", imageUrl);
              resolve();
            };
            img.src = imageUrl;
          });
        }
        yPosition +=
          Math.ceil(Math.min(asset.imageUrls.length, 4) / 2) * 70 + 20;
      } catch (error) {
        console.error("Error adding images to PDF:", error);
      }
    }

    // Generate sections
    Object.keys(groupedFields).forEach((category) => {
      if (category === "Media") return;

      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(14);
      doc.setTextColor(40, 116, 240);
      doc.text(`${category} Information`, 20, yPosition);
      yPosition += 10;

      // const tableData = groupedFields[category].map((field) => {
      //   let value = asset[field.key];

      //   if (field.key.includes("Cost") || field.key.includes("Value")) {
      //     value =
      //       typeof value === "number"
      //         ? `$${value.toLocaleString()}`
      //         : value || "-";
      //   } else if (field.key === "subServices" && Array.isArray(value)) {
      //     value = value.map((sub) => sub.subServiceName).join(", ");
      //   } else if (field.key === "serviceScopeNames" && Array.isArray(value)) {
      //     // Handle the new multiple sub-services structure
      //     const allScopes = value.flatMap((sub) => sub.serviceScopeNames || []);
      //     value = allScopes.join(", ");
      //   } else if (field.key === "createdAt" && value) {
      //     value = new Date(value).toLocaleString();
      //   } else {
      //     value = value || "-";
      //   }

      //   return [field.label, value.toString()];
      // });

      const tableData = groupedFields[category].map((field) => {
        let value = asset[field.key];

        if (field.key.includes("Cost") || field.key.includes("Value")) {
          value =
            typeof value === "number"
              ? `$${value.toLocaleString()}`
              : value || "-";
        } else if (field.key === "subServices" && Array.isArray(value)) {
          value = value.map((sub) => sub.subServiceName).join(", ");
        } else if (field.key === "serviceScopeNames") {
          // Fixed: Extract service scope names from subServices array
          if (asset.subServices && Array.isArray(asset.subServices)) {
            const allScopes = asset.subServices.flatMap(
              (sub) => sub.serviceScopeNames || []
            );
            value = allScopes.length > 0 ? allScopes.join(", ") : "-";
          } else {
            value = "-";
          }
        } else if (field.key === "createdAt" && value) {
          value = new Date(value).toLocaleString();
        } else {
          value = value || "-";
        }

        return [field.label, value.toString()];
      });

      autoTable(doc, {
        startY: yPosition,
        head: [["Field", "Value"]],
        body: tableData,
        theme: "grid",
        headStyles: {
          fillColor: [40, 116, 240],
          textColor: 255,
          fontSize: 10,
          fontStyle: "bold",
        },
        bodyStyles: {
          fontSize: 9,
          textColor: 50,
        },
        alternateRowStyles: {
          fillColor: [248, 249, 250],
        },
        margin: { left: 20, right: 20 },
        columnStyles: {
          0: { cellWidth: 60, fontStyle: "bold" },
          1: { cellWidth: 110 },
        },
      });

      yPosition = doc.lastAutoTable.finalY + 15;
    });

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(`Page ${i} of ${pageCount}`, 20, 285);
      doc.text("Generated by CAFM UAE System", 120, 285);
    }

    doc.save(`asset-report-${asset.assetTag}.pdf`);
  };

  const generateWordReport = async () => {
    // const selectedData = selectedFields.reduce((acc, fieldKey) => {
    //   const field = availableFields.find((f) => f.key === fieldKey);
    //   if (field) {
    //     let value = asset[fieldKey];
    //     if (fieldKey.includes("Cost") || fieldKey.includes("Value")) {
    //       value =
    //         typeof value === "number"
    //           ? `$${value.toLocaleString()}`
    //           : value || "-";
    //     } else if (fieldKey === "subServices" && Array.isArray(value)) {
    //       value = value.map((sub) => sub.subServiceName).join(", ");
    //     } else if (fieldKey === "serviceScopeNames" && Array.isArray(value)) {
    //       const allScopes = value.flatMap((sub) => sub.serviceScopeNames || []);
    //       value = allScopes.join(", ");
    //     } else if (fieldKey === "createdAt" && value) {
    //       value = new Date(value).toLocaleString();
    //     } else if (fieldKey === "imageUrls" && Array.isArray(value)) {
    //       value = `${value.length} image(s) attached`;
    //     } else {
    //       value = value || "-";
    //     }

    //     acc[field.category] = acc[field.category] || [];
    //     acc[field.category].push({
    //       label: field.label,
    //       value: value.toString(),
    //     });
    //   }
    //   return acc;
    // }, {});

    const selectedData = selectedFields.reduce((acc, fieldKey) => {
      const field = availableFields.find((f) => f.key === fieldKey);
      if (field) {
        let value = asset[fieldKey];
        if (fieldKey.includes("Cost") || fieldKey.includes("Value")) {
          value =
            typeof value === "number"
              ? `$${value.toLocaleString()}`
              : value || "-";
        } else if (fieldKey === "subServices" && Array.isArray(value)) {
          value = value.map((sub) => sub.subServiceName).join(", ");
        } else if (fieldKey === "serviceScopeNames") {
          // Fixed: Extract service scope names from subServices array
          if (asset.subServices && Array.isArray(asset.subServices)) {
            const allScopes = asset.subServices.flatMap(
              (sub) => sub.serviceScopeNames || []
            );
            value = allScopes.length > 0 ? allScopes.join(", ") : "-";
          } else {
            value = "-";
          }
        } else if (fieldKey === "createdAt" && value) {
          value = new Date(value).toLocaleString();
        } else if (fieldKey === "imageUrls" && Array.isArray(value)) {
          value = `${value.length} image(s) attached`;
        } else {
          value = value || "-";
        }

        acc[field.category] = acc[field.category] || [];
        acc[field.category].push({
          label: field.label,
          value: value.toString(),
        });
      }
      return acc;
    }, {});
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Asset Report - ${asset.assetTag}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; color: #333; line-height: 1.6; }
            .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #2874f0; padding-bottom: 20px; }
            .header h1 { color: #2874f0; margin: 0; font-size: 28px; }
            .header p { color: #666; margin: 5px 0; font-size: 14px; }
            .section { margin-bottom: 30px; page-break-inside: avoid; }
            .section h2 { color: #2874f0; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px; font-size: 18px; }
            .field-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
            .field { padding: 15px; background: #f8f9fa; border-left: 4px solid #2874f0; border-radius: 4px; }
            .field-label { font-weight: bold; color: #495057; margin-bottom: 8px; font-size: 14px; }
            .field-value { color: #212529; font-size: 14px; word-wrap: break-word; }
            .footer { margin-top: 50px; text-align: center; color: #666; border-top: 1px solid #ddd; padding-top: 20px; font-size: 12px; }
            .images { display: flex; flex-wrap: wrap; gap: 10px; margin: 20px 0; }
            .images img { max-width: 200px; max-height: 150px; object-fit: cover; border: 1px solid #ddd; border-radius: 4px; }
            @media print { body { margin: 20px; } .section { page-break-inside: avoid; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Asset Report</h1>
            <p><strong>Asset Tag:</strong> ${asset.assetTag}</p>
            <p><strong>Asset Name:</strong> ${asset.assetName}</p>
            <p><strong>Generated on:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          ${
            selectedFields.includes("imageUrls") &&
            asset.imageUrls &&
            asset.imageUrls.length > 0
              ? `
                <div class="section">
                  <h2>Asset Images</h2>
                  <div class="images">
                    ${asset.imageUrls
                      .map(
                        (url, index) => `
                        <img src="${url}" alt="Asset Image ${index + 1}" />
                      `
                      )
                      .join("")}
                  </div>
                </div>
              `
              : ""
          }
          ${Object.keys(selectedData)
            .filter((category) => category !== "Media")
            .map(
              (category) => `
                <div class="section">
                  <h2>${category} Information</h2>
                  <div class="field-grid">
                    ${selectedData[category]
                      .map(
                        (field) => `
                        <div class="field">
                          <div class="field-label">${field.label}</div>
                          <div class="field-value">${field.value}</div>
                        </div>
                      `
                      )
                      .join("")}
                  </div>
                </div>
              `
            )
            .join("")}
          <div class="footer">
            <p><strong>This report was generated by CAFM UAE System</strong></p>
            <p>Report contains ${
              selectedFields.length
            } selected fields across ${
      Object.keys(selectedData).length
    } categories</p>
          </div>
        </body>
      </html>
    `;

    const blob = new Blob([htmlContent], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `asset-report-${asset.assetTag}.doc`;
    link.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    return () => {
      if (qrCodeUrl) {
        URL.revokeObjectURL(qrCodeUrl);
      }
    };
  }, [qrCodeUrl]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <span className="block mt-4 text-lg font-medium text-gray-700 text-center">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center">
        <div className="text-center py-12 bg-white rounded-2xl shadow-xl p-8">
          <p className="text-xl text-gray-600 mb-4">Asset not found</p>
          <Link
            to="/assets/list"
            className="inline-flex items-center text-blue-600 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Asset List
          </Link>
        </div>
      </div>
    );
  }

  // Helper function to format monetary values
  const formatCurrency = (value) => {
    if (value == null || isNaN(Number(value))) return "-";
    return `$${Number(value).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // Helper function to format depreciation value
  const formatDepreciationValue = () => {
    if (!asset.depreciationValue || isNaN(Number(asset.depreciationValue)))
      return "-";
    return asset.depreciationType === "PERCENTAGE"
      ? `${asset.depreciationValue}%`
      : formatCurrency(asset.depreciationValue);
  };

  const groupedFields = availableFields.reduce((acc, field) => {
    if (!acc[field.category]) {
      acc[field.category] = [];
    }
    acc[field.category].push(field);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/assets/list")}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Asset Details
                </h1>
                <p className="text-gray-600 mt-1">
                  Complete asset information and management
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPDFModal(true)}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
              >
                <FileDown className="w-5 h-5 mr-2" />
                Generate Report
              </button>
              <button
                onClick={generateQRCode}
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl"
              >
                <QrCode className="w-5 h-5 mr-2" />
                Generate QR Code
              </button>
              <Link
                to={`/assets/edit/${assetId}`}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                <Edit className="w-5 h-5 mr-2" />
                Edit Asset
              </Link>
              <button
                onClick={handleDelete}
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl"
              >
                <Trash2 className="w-5 h-5 mr-2" />
                Delete Asset
              </button>
            </div>
          </div>
        </div>

        {/* Warning for missing financial info */}
        {(!asset.purchaseCost ||
          !asset.depreciationValue ||
          !asset.timeFrameYears) && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Some financial information is missing, which may affect the
                  accuracy of the current depreciated value.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Financial Info */}
          <div className="lg:col-span-1 space-y-8">
            {/* Asset Images */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <ImageIcon className="w-5 h-5 text-blue-600" />
                </div>
                Asset Images
              </h2>
              {asset.imageUrls && asset.imageUrls.length > 0 ? (
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={
                        asset.imageUrls[currentImageIndex] || "/placeholder.svg"
                      }
                      alt={`Asset image ${currentImageIndex + 1}`}
                      className="w-full h-64 object-cover rounded-xl border-2 border-gray-200"
                    />
                    {asset.imageUrls.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                  {asset.imageUrls.length > 1 && (
                    <div className="flex space-x-2 overflow-x-auto pb-2">
                      {asset.imageUrls.map((url, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden transition-all ${
                            index === currentImageIndex
                              ? "border-blue-500 shadow-lg"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          <img
                            src={url || "/placeholder.svg"}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                  <p className="text-sm text-gray-500 text-center">
                    Image {currentImageIndex + 1} of {asset.imageUrls.length}
                  </p>
                </div>
              ) : (
                <div className="text-center py-12">
                  <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No images available</p>
                </div>
              )}
            </div>

            {/* Financial Information */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <div className="p-2 bg-emerald-100 rounded-lg mr-3">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                </div>
                Financial Information
              </h2>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                  <div className="flex items-center mb-2">
                    <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                    <p className="text-sm font-semibold text-gray-700">
                      Purchase Cost
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(asset.purchaseCost)}
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">
                      Depreciation Type
                    </span>
                    <span className="font-medium">
                      {asset.depreciationType
                        ? asset.depreciationType.replace("_", " ")
                        : "-"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">
                      Depreciation Value
                    </span>
                    <span className="font-medium">
                      {formatDepreciationValue()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Time Frame</span>
                    <span className="font-medium">
                      {asset.timeFrameYears
                        ? `${asset.timeFrameYears} years`
                        : "-"}
                    </span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                  <div className="flex items-center mb-2">
                    <TrendingDown className="w-5 h-5 mr-2 text-blue-600" />
                    <p className="text-sm font-semibold text-gray-700">
                      Current Depreciated Value
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(asset.currentDepreciatedValue)}
                  </p>
                </div>
              </div>
            </div>

            {/* Asset Age & Warranty */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg mr-3">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                Asset Age & Warranty
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Asset Age</span>
                  <span className="font-medium">
                    {asset.assetAgeDays ? `${asset.assetAgeDays} days` : "-"}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Warranty Period</span>
                  <span className="font-medium">
                    {asset.warrantyPeriodDays
                      ? `${asset.warrantyPeriodDays} days`
                      : "-"}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">
                    Remaining Warranty
                  </span>
                  <span className="font-medium">
                    {asset.remainingWarrantyPeriodDays !== null
                      ? `${asset.remainingWarrantyPeriodDays} days`
                      : "-"}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Warranty Expiry</span>
                  <span className="font-medium">
                    {asset.warrantyExpiryDate || "-"}
                  </span>
                </div>
                {asset.remainingWarrantyPeriodDays !== null &&
                  asset.remainingWarrantyPeriodDays <= 30 && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-lg">
                      <div className="flex">
                        <AlertCircle className="h-5 w-5 text-yellow-400" />
                        <div className="ml-3">
                          <p className="text-sm text-yellow-700">
                            {asset.remainingWarrantyPeriodDays <= 0
                              ? "Warranty has expired!"
                              : `Warranty expires soon (${asset.remainingWarrantyPeriodDays} days remaining)!`}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>

          {/* Right Column - Detailed Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg mr-3">
                  <Info className="w-5 h-5 text-orange-600" />
                </div>
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Tag className="w-5 h-5 mr-3 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm font-semibold text-gray-700">
                        Asset Tag
                      </p>
                      <p className="text-lg font-medium text-gray-900">
                        {asset.assetTag}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Tag className="w-5 h-5 mr-3 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm font-semibold text-gray-700">
                        Asset Name
                      </p>
                      <p className="text-lg font-medium text-gray-900">
                        {asset.assetName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Barcode className="w-5 h-5 mr-3 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm font-semibold text-gray-700">
                        Serial Number
                      </p>
                      <p className="text-lg font-medium text-gray-900">
                        {asset.serialNumber || "-"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <User className="w-5 h-5 mr-3 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm font-semibold text-gray-700">
                        Owner Type
                      </p>
                      <p className="text-lg font-medium text-gray-900">
                        {asset.ownerType}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Box className="w-5 h-5 mr-3 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm font-semibold text-gray-700">
                        Brand Name
                      </p>
                      <p className="text-lg font-medium text-gray-900">
                        {asset.brandName || "-"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Cpu className="w-5 h-5 mr-3 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm font-semibold text-gray-700">
                        Model Number
                      </p>
                      <p className="text-lg font-medium text-gray-900">
                        {asset.modelNumber || "-"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-5 h-5 mr-3 mt-1">
                      <div
                        className={`w-full h-full rounded-full ${
                          asset.assetStatus === "ACTIVE"
                            ? "bg-green-500"
                            : asset.assetStatus === "UNDER_MAINTENANCE"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">
                        Status
                      </p>
                      <span
                        className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                          asset.assetStatus === "ACTIVE"
                            ? "bg-green-100 text-green-800"
                            : asset.assetStatus === "UNDER_MAINTENANCE"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {asset.assetStatus.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-5 h-5 mr-3 mt-1">
                      <div
                        className={`w-full h-full rounded-full ${
                          asset.assetCondition === "EXCELLENT"
                            ? "bg-green-500"
                            : asset.assetCondition === "GOOD"
                            ? "bg-blue-500"
                            : asset.assetCondition === "AVERAGE"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">
                        Condition
                      </p>
                      <span
                        className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                          asset.assetCondition === "EXCELLENT"
                            ? "bg-green-100 text-green-800"
                            : asset.assetCondition === "GOOD"
                            ? "bg-blue-100 text-blue-800"
                            : asset.assetCondition === "AVERAGE"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {asset.assetCondition}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {(asset.observation || asset.recommendation) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-8 border-t border-gray-200">
                  {asset.observation && (
                    <div className="flex items-start">
                      <FileText className="w-5 h-5 mr-3 text-gray-500 mt-1" />
                      <div>
                        <p className="text-sm font-semibold text-gray-700">
                          Observation
                        </p>
                        <p className="text-gray-900 mt-1">
                          {asset.observation}
                        </p>
                      </div>
                    </div>
                  )}
                  {asset.recommendation && (
                    <div className="flex items-start">
                      <FileText className="w-5 h-5 mr-3 text-gray-500 mt-1" />
                      <div>
                        <p className="text-sm font-semibold text-gray-700">
                          Recommendation
                        </p>
                        <p className="text-gray-900 mt-1">
                          {asset.recommendation}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Location Information */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="p-2 bg-green-100 rounded-lg mr-3">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                Location Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Zone</p>
                    <p className="text-lg font-medium text-gray-900">
                      {asset.zoneName}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Layers className="w-5 h-5 mr-3 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      Sub Zone
                    </p>
                    <p className="text-lg font-medium text-gray-900">
                      {asset.subZoneName}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Building className="w-5 h-5 mr-3 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      Building
                    </p>
                    <p className="text-lg font-medium text-gray-900">
                      {asset.buildingName}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Home className="w-5 h-5 mr-3 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      Villa/Apartment
                    </p>
                    <p className="text-lg font-medium text-gray-900">
                      {asset.villaApartmentName}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Layers className="w-5 h-5 mr-3 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Floor</p>
                    <p className="text-lg font-medium text-gray-900">
                      {asset.floorName}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <DoorOpen className="w-5 h-5 mr-3 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Room</p>
                    <p className="text-lg font-medium text-gray-900">
                      {asset.roomName}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Information - Updated for Multiple Sub-Services */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg mr-3">
                  <Wrench className="w-5 h-5 text-purple-600" />
                </div>
                Service Information
              </h2>
              <div className="space-y-6">
                {asset.subServices && asset.subServices.length > 0 ? (
                  asset.subServices.map((subService, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-xl p-6 bg-gray-50"
                    >
                      <div className="flex items-start mb-4">
                        <Wrench className="w-5 h-5 mr-3 text-gray-500 mt-1" />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-700">
                            Sub-Service {index + 1}
                          </p>
                          <p className="text-lg font-medium text-gray-900 mb-3">
                            {subService.subServiceName}
                          </p>

                          <div>
                            <p className="text-sm font-semibold text-gray-700 mb-2">
                              Service Scopes:
                            </p>
                            {subService.serviceScopeNames &&
                            subService.serviceScopeNames.length > 0 ? (
                              <div className="flex flex-wrap gap-2">
                                {subService.serviceScopeNames.map(
                                  (scopeName, scopeIndex) => (
                                    <span
                                      key={scopeIndex}
                                      className="inline-flex px-3 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full"
                                    >
                                      {scopeName}
                                    </span>
                                  )
                                )}
                              </div>
                            ) : (
                              <p className="text-gray-500 text-sm">
                                No service scopes assigned
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Wrench className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">
                      No sub-services assigned
                    </p>
                    <p className="text-sm">
                      This asset has no sub-services configured
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Lifecycle Information */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                  <Clock className="w-5 h-5 text-indigo-600" />
                </div>
                Lifecycle Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 mr-3 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm font-semibold text-gray-700">
                        Purchase Date
                      </p>
                      <p className="text-lg font-medium text-gray-900">
                        {asset.purchaseDate || "-"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 mr-3 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm font-semibold text-gray-700">
                        Installation Date
                      </p>
                      <p className="text-lg font-medium text-gray-900">
                        {asset.installationDate || "-"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 mr-3 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm font-semibold text-gray-700">
                        Last Audit Date
                      </p>
                      <p className="text-lg font-medium text-gray-900">
                        {asset.lastAuditDate || "-"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <User className="w-5 h-5 mr-3 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm font-semibold text-gray-700">
                        Created By
                      </p>
                      <p className="text-lg font-medium text-gray-900">
                        {asset.createdByUsername || "-"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 mr-3 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm font-semibold text-gray-700">
                        Created At
                      </p>
                      <p className="text-lg font-medium text-gray-900">
                        {asset.createdAt
                          ? new Date(asset.createdAt).toLocaleString()
                          : "-"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Building className="w-5 h-5 mr-3 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm font-semibold text-gray-700">
                        Company
                      </p>
                      <p className="text-lg font-medium text-gray-900">
                        {asset.companyName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FileText className="w-5 h-5 mr-3 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm font-semibold text-gray-700">
                        Contract
                      </p>
                      <p className="text-lg font-medium text-gray-900">
                        {asset.contractName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* QR Code Modal */}
        {showQRModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Asset QR Code
                </h3>
                <button
                  onClick={() => {
                    setShowQRModal(false);
                    setQrCodeUrl(null);
                  }}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="text-center">
                {qrCodeUrl ? (
                  <img
                    src={qrCodeUrl || "/placeholder.svg"}
                    alt="Asset QR Code"
                    className="mx-auto mb-6 w-[300px] h-[300px] border-2 border-gray-200 rounded-xl"
                  />
                ) : (
                  <div className="flex justify-center items-center h-[300px]">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                )}
                <p className="text-sm text-gray-600 mb-6">
                  Scan this QR code to access asset information.
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={downloadQRCode}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    disabled={!qrCodeUrl}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </button>
                  <button
                    onClick={printQRCode}
                    className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    disabled={!qrCodeUrl}
                  >
                    <Printer className="w-4 h-4 mr-2" />
                    Print
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PDF Generation Modal */}
        {showPDFModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Generate Asset Report
                </h3>
                <button
                  onClick={() => setShowPDFModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  Select the fields you want to include in your asset report:
                </p>
                <div className="flex gap-3 mb-4">
                  <button
                    onClick={selectAllFields}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Select All
                  </button>
                  <button
                    onClick={clearAllFields}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {Object.keys(groupedFields).map((category) => (
                  <div key={category} className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      {category}
                    </h4>
                    <div className="space-y-2">
                      {groupedFields[category].map((field) => (
                        <label
                          key={field.key}
                          className="flex items-center cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedFields.includes(field.key)}
                            onChange={() => handleFieldToggle(field.key)}
                            className="mr-3 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">
                            {field.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  {selectedFields.length} field
                  {selectedFields.length !== 1 ? "s" : ""} selected
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowPDFModal(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => generatePDF("word")}
                    disabled={generatingPDF || selectedFields.length === 0}
                    className="inline-flex items-center px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 transition-colors"
                  >
                    {generatingPDF ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <FileType className="w-4 h-4 mr-2" />
                        Generate Word
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => generatePDF("pdf")}
                    disabled={generatingPDF || selectedFields.length === 0}
                    className="inline-flex items-center px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                  >
                    {generatingPDF ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <FileDown className="w-4 h-4 mr-2" />
                        Generate PDF
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetDetail;
