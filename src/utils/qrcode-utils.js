// /**
//  * QR Code utility functions for asset management
//  */

// /**
//  * Generate QR code data for an asset
//  * @param {Object} asset - Asset object
//  * @returns {string} - JSON string containing asset data
//  */
// export function generateAssetQRData(asset) {
//   return JSON.stringify({
//     assetId: asset.assetId,
//     assetTag: asset.assetTag,
//     assetName: asset.assetName,
//     serialNumber: asset.serialNumber,
//     location: `${asset.buildingName}, ${asset.floorName}, ${asset.roomName}`,
//     status: asset.assetStatus,
//     company: asset.companyName,
//     contract: asset.contractName,
//     service: asset.serviceName,
//     generatedAt: new Date().toISOString(),
//   });
// }

// /**
//  * Parse QR code data back to asset information
//  * @param {string} qrData - QR code data string
//  * @returns {Object} - Parsed asset data
//  */
// export function parseAssetQRData(qrData) {
//   try {
//     return JSON.parse(qrData);
//   } catch (error) {
//     console.error("Error parsing QR code data:", error);
//     return null;
//   }
// }

// /**
//  * Download canvas as image
//  * @param {HTMLCanvasElement} canvas - Canvas element
//  * @param {string} filename - Download filename
//  */
// export function downloadCanvasAsImage(canvas, filename) {
//   const link = document.createElement("a");
//   link.download = filename;
//   link.href = canvas.toDataURL("image/png");
//   link.click();
// }

// /**
//  * Print QR code with asset details
//  * @param {HTMLCanvasElement} canvas - Canvas element with QR code
//  * @param {Object} asset - Asset object
//  */
// export function printQRCodeWithDetails(canvas, asset) {
//   const printWindow = window.open("", "_blank");
//   const qrCodeImage = canvas.toDataURL("image/png");

//   printWindow.document.write(`
//     <html>
//       <head>
//         <title>Asset QR Code - ${asset.assetTag}</title>
//         <style>
//           body {
//             font-family: Arial, sans-serif;
//             text-align: center;
//             margin: 20px;
//           }
//           .container {
//             margin: 20px auto;
//             max-width: 400px;
//             border: 1px solid #ccc;
//             padding: 20px;
//             border-radius: 8px;
//           }
//           img {
//             max-width: 100%;
//             margin: 20px 0;
//           }
//           .details {
//             margin-top: 20px;
//             text-align: left;
//           }
//           table {
//             width: 100%;
//             border-collapse: collapse;
//             margin-top: 10px;
//           }
//           td {
//             padding: 8px;
//             border-bottom: 1px solid #eee;
//           }
//           .label {
//             font-weight: bold;
//             width: 40%;
//           }
//           .header {
//             text-align: center;
//             margin-bottom: 20px;
//           }
//           .qr-section {
//             text-align: center;
//             margin: 20px 0;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="header">
//             <h2>Asset QR Code</h2>
//             <p>Scan to access asset information</p>
//           </div>

//           <div class="qr-section">
//             <img src="${qrCodeImage}" alt="Asset QR Code" />
//           </div>

//           <div class="details">
//             <table>
//               <tr>
//                 <td class="label">Asset Tag:</td>
//                 <td>${asset.assetTag}</td>
//               </tr>
//               <tr>
//                 <td class="label">Name:</td>
//                 <td>${asset.assetName}</td>
//               </tr>
//               <tr>
//                 <td class="label">Serial Number:</td>
//                 <td>${asset.serialNumber || "-"}</td>
//               </tr>
//               <tr>
//                 <td class="label">Brand:</td>
//                 <td>${asset.brandName || "-"}</td>
//               </tr>
//               <tr>
//                 <td class="label">Model:</td>
//                 <td>${asset.modelNumber || "-"}</td>
//               </tr>
//               <tr>
//                 <td class="label">Status:</td>
//                 <td>${asset.assetStatus.replace("_", " ")}</td>
//               </tr>
//               <tr>
//                 <td class="label">Location:</td>
//                 <td>${asset.buildingName}, ${asset.floorName}, ${
//     asset.roomName
//   }</td>
//               </tr>
//               <tr>
//                 <td class="label">Company:</td>
//                 <td>${asset.companyName || "-"}</td>
//               </tr>
//               <tr>
//                 <td class="label">Generated:</td>
//                 <td>${new Date().toLocaleDateString()}</td>
//               </tr>
//             </table>
//           </div>
//         </div>
//         <script>
//           window.onload = function() {
//             window.print();
//             window.onafterprint = function() {
//               window.close();
//             }
//           }
//         </script>
//       </body>
//     </html>
//   `);

//   printWindow.document.close();
// }

/**
 * QR Code utility functions for asset management
 */

/**
 * Generate QR code data for an asset
 * @param {Object} asset - Asset object
 * @returns {string} - JSON string containing asset data
 */
export function generateAssetQRData(asset) {
  return JSON.stringify({
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
    generatedAt: new Date().toISOString(),
  });
}

/**
 * Parse QR code data back to asset information
 * @param {string} qrData - QR code data string
 * @returns {Object} - Parsed asset data
 */
export function parseAssetQRData(qrData) {
  try {
    return JSON.parse(qrData);
  } catch (error) {
    console.error("Error parsing QR code data:", error);
    return null;
  }
}

/**
 * Download canvas as image
 * @param {HTMLCanvasElement} canvas - Canvas element
 * @param {string} filename - Download filename
 */
export function downloadCanvasAsImage(canvas, filename) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

/**
 * Print QR code with asset details
 * @param {HTMLCanvasElement} canvas - Canvas element with QR code
 * @param {Object} asset - Asset object
 */
export function printQRCodeWithDetails(canvas, asset) {
  const printWindow = window.open("", "_blank");
  const qrCodeImage = canvas.toDataURL("image/png");

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
          window.onload = function() { 
            window.print(); 
            window.onafterprint = function() {
              window.close();
            }
          }
        </script>
      </body>
    </html>
  `);

  printWindow.document.close();
}
