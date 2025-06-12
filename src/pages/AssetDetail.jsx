///2555555
// "use client";

// import { useState, useEffect, useRef } from "react";
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
// } from "lucide-react";
// import { assetService } from "../services/assetService";
// import { toast } from "react-toastify";
// import QRCode from "qrcode";

// const AssetDetail = () => {
//   const { assetId } = useParams();
//   const navigate = useNavigate();
//   const [asset, setAsset] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [showQRModal, setShowQRModal] = useState(false);
//   const qrCodeRef = useRef(null);

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

//   const generateQRCode = () => {
//     setShowQRModal(true);

//     // Generate QR code with asset information
//     setTimeout(() => {
//       if (qrCodeRef.current) {
//         const qrData = JSON.stringify({
//           assetId: asset.assetId,
//           assetTag: asset.assetTag,
//           assetName: asset.assetName,
//           serialNumber: asset.serialNumber,
//           location: `${asset.buildingName}, ${asset.floorName}, ${asset.roomName}`,
//           status: asset.assetStatus,
//         });

//         QRCode.toCanvas(
//           qrCodeRef.current,
//           qrData,
//           {
//             width: 300,
//             margin: 2,
//             color: {
//               dark: "#000000",
//               light: "#ffffff",
//             },
//           },
//           (error) => {
//             if (error) console.error(error);
//           }
//         );
//       }
//     }, 100);
//   };

//   const downloadQRCode = () => {
//     if (qrCodeRef.current) {
//       const link = document.createElement("a");
//       link.download = `asset-${asset.assetTag}-qrcode.png`;
//       link.href = qrCodeRef.current.toDataURL("image/png");
//       link.click();
//     }
//   };

//   const printQRCode = () => {
//     if (qrCodeRef.current) {
//       const printWindow = window.open("", "_blank");
//       const qrCodeImage = qrCodeRef.current.toDataURL("image/png");

//       printWindow.document.write(`
//         <html>
//           <head>
//             <title>Asset QR Code - ${asset.assetTag}</title>
//             <style>
//               body { font-family: Arial, sans-serif; text-align: center; }
//               .container { margin: 20px auto; max-width: 400px; }
//               img { max-width: 100%; }
//               .details { margin-top: 20px; text-align: left; }
//               table { width: 100%; border-collapse: collapse; }
//               td { padding: 5px; }
//             </style>
//           </head>
//           <body>
//             <div class="container">
//               <h2>Asset QR Code</h2>
//               <img src="${qrCodeImage}" alt="Asset QR Code" />
//               <div class="details">
//                 <table>
//                   <tr>
//                     <td><strong>Asset Tag:</strong></td>
//                     <td>${asset.assetTag}</td>
//                   </tr>
//                   <tr>
//                     <td><strong>Name:</strong></td>
//                     <td>${asset.assetName}</td>
//                   </tr>
//                   <tr>
//                     <td><strong>Serial Number:</strong></td>
//                     <td>${asset.serialNumber || "-"}</td>
//                   </tr>
//                   <tr>
//                     <td><strong>Location:</strong></td>
//                     <td>${asset.buildingName}, ${asset.floorName}, ${
//         asset.roomName
//       }</td>
//                   </tr>
//                 </table>
//               </div>
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

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//         <span className="ml-3 text-lg font-medium text-gray-700">
//           Loading...
//         </span>
//       </div>
//     );
//   }

//   if (!asset) {
//     return (
//       <div className="text-center py-12">
//         <p className="text-xl text-gray-600">Asset not found</p>
//         <Link
//           to="/assets/list"
//           className="mt-4 inline-flex items-center text-blue-600 hover:underline"
//         >
//           <ArrowLeft className="w-4 h-4 mr-2" />
//           Back to Asset List
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div className="flex items-center">
//           <Link
//             to="/assets/list"
//             className="mr-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200"
//           >
//             <ArrowLeft className="w-5 h-5 text-gray-600" />
//           </Link>
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Asset Details</h1>
//             <p className="text-gray-600">View complete asset information</p>
//           </div>
//         </div>
//         <div className="flex gap-3">
//           <button
//             onClick={generateQRCode}
//             className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
//           >
//             <QrCode className="w-5 h-5 mr-2" />
//             Generate QR Code
//           </button>
//           <Link
//             to={`/assets/edit/${assetId}`}
//             className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             <Edit className="w-5 h-5 mr-2" />
//             Edit Asset
//           </Link>
//           <button
//             onClick={handleDelete}
//             className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//           >
//             <Trash2 className="w-5 h-5 mr-2" />
//             Delete Asset
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Asset Images */}
//         <div className="lg:col-span-1">
//           <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//               <ImageIcon className="w-5 h-5 mr-2 text-blue-600" />
//               Asset Images
//             </h2>

//             {asset.imageUrls && asset.imageUrls.length > 0 ? (
//               <div className="space-y-4">
//                 <div className="relative">
//                   <img
//                     src={
//                       asset.imageUrls[currentImageIndex] || "/placeholder.svg"
//                     }
//                     alt={`Asset ${currentImageIndex + 1}`}
//                     className="w-full h-64 object-cover rounded-lg border"
//                   />
//                   {asset.imageUrls.length > 1 && (
//                     <>
//                       <button
//                         onClick={prevImage}
//                         className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70"
//                       >
//                         <ChevronLeft className="w-4 h-4" />
//                       </button>
//                       <button
//                         onClick={nextImage}
//                         className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70"
//                       >
//                         <ChevronRight className="w-4 h-4" />
//                       </button>
//                     </>
//                   )}
//                 </div>

//                 {asset.imageUrls.length > 1 && (
//                   <div className="flex space-x-2 overflow-x-auto">
//                     {asset.imageUrls.map((url, index) => (
//                       <button
//                         key={index}
//                         onClick={() => setCurrentImageIndex(index)}
//                         className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden ${
//                           index === currentImageIndex
//                             ? "border-blue-500"
//                             : "border-gray-300"
//                         }`}
//                       >
//                         <img
//                           src={url || "/placeholder.svg"}
//                           alt={`Thumbnail ${index + 1}`}
//                           className="w-full h-full object-cover"
//                         />
//                       </button>
//                     ))}
//                   </div>
//                 )}

//                 <p className="text-sm text-gray-500 text-center">
//                   {currentImageIndex + 1} of {asset.imageUrls.length} images
//                 </p>
//               </div>
//             ) : (
//               <div className="text-center py-8">
//                 <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
//                 <p className="text-gray-500">No images available</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Asset Information */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Basic Information */}
//           <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//               <Info className="w-5 h-5 mr-2 text-blue-600" />
//               Basic Information
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-4">
//                 <div className="flex items-center">
//                   <Tag className="w-4 h-4 mr-2 text-gray-500" />
//                   <div>
//                     <p className="text-sm text-gray-500">Asset Tag</p>
//                     <p className="font-medium">{asset.assetTag}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center">
//                   <Tag className="w-4 h-4 mr-2 text-gray-500" />
//                   <div>
//                     <p className="text-sm text-gray-500">Asset Name</p>
//                     <p className="font-medium">{asset.assetName}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center">
//                   <Barcode className="w-4 h-4 mr-2 text-gray-500" />
//                   <div>
//                     <p className="text-sm text-gray-500">Serial Number</p>
//                     <p className="font-medium">{asset.serialNumber || "-"}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div className="flex items-center">
//                   <Box className="w-4 h-4 mr-2 text-gray-500" />
//                   <div>
//                     <p className="text-sm text-gray-500">Brand Name</p>
//                     <p className="font-medium">{asset.brandName || "-"}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center">
//                   <Cpu className="w-4 h-4 mr-2 text-gray-500" />
//                   <div>
//                     <p className="text-sm text-gray-500">Model Number</p>
//                     <p className="font-medium">{asset.modelNumber || "-"}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center">
//                   <User className="w-4 h-4 mr-2 text-gray-500" />
//                   <div>
//                     <p className="text-sm text-gray-500">Owner Type</p>
//                     <p className="font-medium">{asset.ownerType}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-4">
//               <div className="flex items-center">
//                 <div className="w-4 h-4 mr-2">
//                   <div
//                     className={`w-full h-full rounded-full ${
//                       asset.assetStatus === "ACTIVE"
//                         ? "bg-green-500"
//                         : asset.assetStatus === "UNDER_MAINTENANCE"
//                         ? "bg-yellow-500"
//                         : "bg-red-500"
//                     }`}
//                   ></div>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Status</p>
//                   <span
//                     className={`px-2 py-1 text-xs font-semibold rounded-full ${
//                       asset.assetStatus === "ACTIVE"
//                         ? "bg-green-100 text-green-800"
//                         : asset.assetStatus === "UNDER_MAINTENANCE"
//                         ? "bg-yellow-100 text-yellow-800"
//                         : "bg-red-100 text-red-800"
//                     }`}
//                   >
//                     {asset.assetStatus.replace("_", " ")}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Location Information */}
//           <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//               <MapPin className="w-5 h-5 mr-2 text-blue-600" />
//               Location Information
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-4">
//                 <div className="flex items-center">
//                   <MapPin className="w-4 h-4 mr-2 text-gray-500" />
//                   <div>
//                     <p className="text-sm text-gray-500">Zone</p>
//                     <p className="font-medium">{asset.zoneName}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center">
//                   <Layers className="w-4 h-4 mr-2 text-gray-500" />
//                   <div>
//                     <p className="text-sm text-gray-500">Sub Zone</p>
//                     <p className="font-medium">{asset.subZoneName}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center">
//                   <Building className="w-4 h-4 mr-2 text-gray-500" />
//                   <div>
//                     <p className="text-sm text-gray-500">Building</p>
//                     <p className="font-medium">{asset.buildingName}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div className="flex items-center">
//                   <Home className="w-4 h-4 mr-2 text-gray-500" />
//                   <div>
//                     <p className="text-sm text-gray-500">Villa/Apartment</p>
//                     <p className="font-medium">{asset.villaApartmentName}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center">
//                   <Layers className="w-4 h-4 mr-2 text-gray-500" />
//                   <div>
//                     <p className="text-sm text-gray-500">Floor</p>
//                     <p className="font-medium">{asset.floorName}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center">
//                   <DoorOpen className="w-4 h-4 mr-2 text-gray-500" />
//                   <div>
//                     <p className="text-sm text-gray-500">Room</p>
//                     <p className="font-medium">{asset.roomName}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Service Information */}
//           <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//               <Wrench className="w-5 h-5 mr-2 text-blue-600" />
//               Service Information
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="flex items-center">
//                 <Wrench className="w-4 h-4 mr-2 text-gray-500" />
//                 <div>
//                   <p className="text-sm text-gray-500">Service</p>
//                   <p className="font-medium">{asset.serviceName}</p>
//                 </div>
//               </div>

//               <div className="flex items-center">
//                 <Wrench className="w-4 h-4 mr-2 text-gray-500" />
//                 <div>
//                   <p className="text-sm text-gray-500">Sub Service</p>
//                   <p className="font-medium">{asset.subServiceName}</p>
//                 </div>
//               </div>

//               <div className="flex items-center">
//                 <Wrench className="w-4 h-4 mr-2 text-gray-500" />
//                 <div>
//                   <p className="text-sm text-gray-500">Service Scope</p>
//                   <p className="font-medium">{asset.serviceScopeName}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Lifecycle Information */}
//           <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//               <Clock className="w-5 h-5 mr-2 text-blue-600" />
//               Lifecycle Information
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-4">
//                 <div className="flex items-center">
//                   <Calendar className="w-4 h-4 mr-2 text-gray-500" />
//                   <div>
//                     <p className="text-sm text-gray-500">Purchase Date</p>
//                     <p className="font-medium">{asset.purchaseDate || "-"}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center">
//                   <Calendar className="w-4 h-4 mr-2 text-gray-500" />
//                   <div>
//                     <p className="text-sm text-gray-500">Installation Date</p>
//                     <p className="font-medium">
//                       {asset.installationDate || "-"}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center">
//                   <Calendar className="w-4 h-4 mr-2 text-gray-500" />
//                   <div>
//                     <p className="text-sm text-gray-500">Last Audit Date</p>
//                     <p className="font-medium">{asset.lastAuditDate || "-"}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div className="flex items-center">
//                   <Clock className="w-4 h-4 mr-2 text-gray-500" />
//                   <div>
//                     <p className="text-sm text-gray-500">Warranty Period</p>
//                     <p className="font-medium">
//                       {asset.warrantyPeriodDays
//                         ? `${asset.warrantyPeriodDays} days`
//                         : "-"}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center">
//                   <Clock className="w-4 h-4 mr-2 text-gray-500" />
//                   <div>
//                     <p className="text-sm text-gray-500">
//                       Expected Useful Life
//                     </p>
//                     <p className="font-medium">
//                       {asset.expectedUsefulLifeDays
//                         ? `${asset.expectedUsefulLifeDays} days`
//                         : "-"}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* QR Code Modal */}
//       {showQRModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full mx-4">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold">Asset QR Code</h3>
//               <button
//                 onClick={() => setShowQRModal(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 ×
//               </button>
//             </div>

//             <div className="text-center">
//               <canvas ref={qrCodeRef} className="mx-auto mb-4"></canvas>
//               <p className="text-sm text-gray-600 mb-4">
//                 Scan this QR code to access asset information
//               </p>

//               <div className="flex gap-3 justify-center">
//                 <button
//                   onClick={downloadQRCode}
//                   className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                 >
//                   <Download className="w-4 h-4 mr-2" />
//                   Download
//                 </button>
//                 <button
//                   onClick={printQRCode}
//                   className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
//                 >
//                   <Printer className="w-4 h-4 mr-2" />
//                   Print
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AssetDetail;

"use client";

import { useState, useEffect, useRef } from "react";
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
} from "lucide-react";
import { assetService } from "../services/assetService";
import { toast } from "react-toastify";
import QRCode from "qrcode";
const AssetDetail = () => {
  const { assetId } = useParams();
  const navigate = useNavigate();
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showQRModal, setShowQRModal] = useState(false);
  const qrCodeRef = useRef(null);

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

  const generateQRCode = () => {
    setShowQRModal(true);

    // Generate QR code with comprehensive asset information
    setTimeout(() => {
      if (qrCodeRef.current) {
        const qrData = JSON.stringify({
          assetId: asset.assetId,
          assetTag: asset.assetTag,
          assetName: asset.assetName,
          serialNumber: asset.serialNumber || "",
          brandName: asset.brandName || "",
          modelNumber: asset.modelNumber || "",
          assetStatus: asset.assetStatus,
          ownerType: asset.ownerType,
          location: {
            zoneName: asset.zoneName,
            subZoneName: asset.subZoneName,
            buildingName: asset.buildingName,
            villaApartmentName: asset.villaApartmentName,
            floorName: asset.floorName,
            roomName: asset.roomName,
          },
          service: {
            serviceName: asset.serviceName,
            subServiceName: asset.subServiceName,
            serviceScopeName: asset.serviceScopeName,
          },
          lifecycle: {
            purchaseDate: asset.purchaseDate || "",
            installationDate: asset.installationDate || "",
            warrantyPeriodDays: asset.warrantyPeriodDays || "",
            expectedUsefulLifeDays: asset.expectedUsefulLifeDays || "",
            lastAuditDate: asset.lastAuditDate || "",
          },
          companyName: asset.companyName,
          contractName: asset.contractName,
          createdBy: asset.createdByUsername || "",
          createdDate: asset.createdDate || "",
          lastUpdatedDate: asset.lastUpdatedDate || "",
        });

        QRCode.toCanvas(
          qrCodeRef.current,
          qrData,
          {
            width: 300,
            margin: 2,
            color: {
              dark: "#000000",
              light: "#ffffff",
            },
          },
          (error) => {
            if (error) console.error(error);
          }
        );
      }
    }, 100);
  };

  const downloadQRCode = () => {
    if (qrCodeRef.current) {
      const link = document.createElement("a");
      link.download = `asset-${asset.assetTag}-qrcode.png`;
      link.href = qrCodeRef.current.toDataURL("image/png");
      link.click();
    }
  };

  const printQRCode = () => {
    if (qrCodeRef.current) {
      const printWindow = window.open("", "_blank");
      const qrCodeImage = qrCodeRef.current.toDataURL("image/png");

      printWindow.document.write(`
        <html>
          <head>
            <title>Asset QR Code - ${asset.assetTag}</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                text-align: center; 
                margin: 0;
                padding: 20px;
              }
              .container { 
                margin: 20px auto; 
                max-width: 400px; 
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
              }
              img { 
                max-width: 100%; 
                width: 300px;
                height: 300px;
              }
              h2 {
                margin-bottom: 30px;
              }
              .asset-tag {
                margin-top: 20px;
                font-size: 16px;
                font-weight: bold;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>Asset QR Code</h2>
              <img src="${qrCodeImage}" alt="Asset QR Code" />
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-lg font-medium text-gray-700">
          Loading...
        </span>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">Asset not found</p>
        <Link
          to="/assets/list"
          className="mt-4 inline-flex items-center text-blue-600 hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Asset List
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link
            to="/assets/list"
            className="mr-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Asset Details</h1>
            <p className="text-gray-600">View complete asset information</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={generateQRCode}
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <QrCode className="w-5 h-5 mr-2" />
            Generate QR Code
          </button>
          <Link
            to={`/assets/edit/${assetId}`}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit className="w-5 h-5 mr-2" />
            Edit Asset
          </Link>
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 className="w-5 h-5 mr-2" />
            Delete Asset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Asset Images */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <ImageIcon className="w-5 h-5 mr-2 text-blue-600" />
              Asset Images
            </h2>

            {asset.imageUrls && asset.imageUrls.length > 0 ? (
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={
                      asset.imageUrls[currentImageIndex] || "/placeholder.svg"
                    }
                    alt={`Asset ${currentImageIndex + 1}`}
                    className="w-full h-64 object-cover rounded-lg border"
                  />
                  {asset.imageUrls.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>

                {asset.imageUrls.length > 1 && (
                  <div className="flex space-x-2 overflow-x-auto">
                    {asset.imageUrls.map((url, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden ${
                          index === currentImageIndex
                            ? "border-blue-500"
                            : "border-gray-300"
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
                  {currentImageIndex + 1} of {asset.imageUrls.length} images
                </p>
              </div>
            ) : (
              <div className="text-center py-8">
                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">No images available</p>
              </div>
            )}
          </div>
        </div>

        {/* Asset Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Info className="w-5 h-5 mr-2 text-blue-600" />
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Tag className="w-4 h-4 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Asset Tag</p>
                    <p className="font-medium">{asset.assetTag}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Tag className="w-4 h-4 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Asset Name</p>
                    <p className="font-medium">{asset.assetName}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Barcode className="w-4 h-4 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Serial Number</p>
                    <p className="font-medium">{asset.serialNumber || "-"}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Box className="w-4 h-4 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Brand Name</p>
                    <p className="font-medium">{asset.brandName || "-"}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Cpu className="w-4 h-4 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Model Number</p>
                    <p className="font-medium">{asset.modelNumber || "-"}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Owner Type</p>
                    <p className="font-medium">{asset.ownerType}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center">
                <div className="w-4 h-4 mr-2">
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
                  <p className="text-sm text-gray-500">Status</p>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
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
            </div>
          </div>

          {/* Location Information */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-blue-600" />
              Location Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Zone</p>
                    <p className="font-medium">{asset.zoneName}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Layers className="w-4 h-4 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Sub Zone</p>
                    <p className="font-medium">{asset.subZoneName}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Building className="w-4 h-4 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Building</p>
                    <p className="font-medium">{asset.buildingName}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Home className="w-4 h-4 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Villa/Apartment</p>
                    <p className="font-medium">{asset.villaApartmentName}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Layers className="w-4 h-4 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Floor</p>
                    <p className="font-medium">{asset.floorName}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <DoorOpen className="w-4 h-4 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Room</p>
                    <p className="font-medium">{asset.roomName}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Information */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Wrench className="w-5 h-5 mr-2 text-blue-600" />
              Service Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center">
                <Wrench className="w-4 h-4 mr-2 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Service</p>
                  <p className="font-medium">{asset.serviceName}</p>
                </div>
              </div>

              <div className="flex items-center">
                <Wrench className="w-4 h-4 mr-2 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Sub Service</p>
                  <p className="font-medium">{asset.subServiceName}</p>
                </div>
              </div>

              <div className="flex items-center">
                <Wrench className="w-4 h-4 mr-2 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Service Scope</p>
                  <p className="font-medium">{asset.serviceScopeName}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lifecycle Information */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-600" />
              Lifecycle Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Purchase Date</p>
                    <p className="font-medium">{asset.purchaseDate || "-"}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Installation Date</p>
                    <p className="font-medium">
                      {asset.installationDate || "-"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Last Audit Date</p>
                    <p className="font-medium">{asset.lastAuditDate || "-"}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Warranty Period</p>
                    <p className="font-medium">
                      {asset.warrantyPeriodDays
                        ? `${asset.warrantyPeriodDays} days`
                        : "-"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">
                      Expected Useful Life
                    </p>
                    <p className="font-medium">
                      {asset.expectedUsefulLifeDays
                        ? `${asset.expectedUsefulLifeDays} days`
                        : "-"}
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
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Asset QR Code</h3>
              <button
                onClick={() => setShowQRModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="text-center">
              <canvas ref={qrCodeRef} className="mx-auto mb-4"></canvas>
              <p className="text-sm text-gray-600 mb-4">
                Scan this QR code to access asset information
              </p>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={downloadQRCode}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </button>
                <button
                  onClick={printQRCode}
                  className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetDetail;
