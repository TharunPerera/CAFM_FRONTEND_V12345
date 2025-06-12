// src / components / PropertyFlow / PropertyFlowPDFGenerator.jsx;
import { useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Building, MapPin, Layers, Home, DoorOpen } from "lucide-react";
import { propertyTypeConfig } from "../../pages/PropertyFlowManagement"; // Import shared config

const PropertyFlowPDFGenerator = ({
  treeData,
  selectedContract,
  contracts,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a3",
      });

      // Add header
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text(
        `Property Flow Hierarchy - ${
          contracts.find((c) => c.contractId.toString() === selectedContract)
            ?.contractName || "Selected Contract"
        }`,
        20,
        20
      );

      // Capture the GoJS diagram if available
      const diagramElement = document.querySelector(".gojs-diagram"); // Adjust selector as needed
      if (diagramElement) {
        const canvas = await html2canvas(diagramElement, {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
        });
        const imgData = canvas.toDataURL("image/png");
        const imgProps = doc.getImageProperties(imgData);
        const pdfWidth = doc.internal.pageSize.getWidth() - 40;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        doc.addImage(imgData, "PNG", 20, 30, pdfWidth, pdfHeight);
      } else {
        // Fallback: Generate a structured table if diagram is not available
        doc.setFontSize(12);
        let yPosition = 30;

        doc.setFont("helvetica", "bold");
        doc.text("Property Hierarchy", 20, yPosition);
        yPosition += 10;

        doc.setFont("helvetica", "normal");
        treeData.forEach((node, index) => {
          const config =
            propertyTypeConfig[node.type] || propertyTypeConfig.zone;
          const indent = node.parent ? "    " : "";
          doc.text(
            `${indent}${config.name}: ${node.name} (ID: ${node.id})`,
            20,
            yPosition
          );
          yPosition += 8;
          if (node.description) {
            doc.setFontSize(10);
            doc.text(
              `${indent}Description: ${node.description}`,
              30,
              yPosition
            );
            yPosition += 6;
            doc.setFontSize(12);
          }
          if (yPosition > 260) {
            doc.addPage();
            yPosition = 20;
          }
        });
      }

      // Add footer
      doc.setFontSize(10);
      doc.setFont("helvetica", "italic");
      doc.text(
        `Generated on ${new Date().toLocaleDateString()} by PropertyFlow Manager`,
        20,
        doc.internal.pageSize.getHeight() - 10
      );

      // Save the PDF
      doc.save(
        `Property_Flow_${selectedContract}_${
          new Date().toISOString().split("T")[0]
        }.pdf`
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={generatePDF}
      disabled={isGenerating || !selectedContract || treeData.length === 0}
      className={`inline-flex items-center px-4 py-2 border-2 text-sm font-semibold rounded-xl shadow-sm text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {isGenerating ? (
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          Generating PDF...
        </div>
      ) : (
        <>
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H3a2 2 0 01-2-2V3a2 2 0 012-2h18a2 2 0 012 2v16a2 2 0 01-2 2z"
            />
          </svg>
          Download A3 PDF
        </>
      )}
    </button>
  );
};

export default PropertyFlowPDFGenerator;
