"use client";

import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  Building,
  Home,
  MapPin,
  Layers,
  DoorOpen,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { usePropertyFlow } from "../../context/PropertyFlowContext";
import { contractService } from "../../services/contractService";
import PropertyDetailModal from "./PropertyDetailModal";

const PropertyFlowDiagram = () => {
  const {
    zones,
    subZones,
    buildings,
    villaApartments,
    floors,
    rooms,
    selectedContract,
    setSelectedContract,
    loading,
  } = usePropertyFlow();

  const [contracts, setContracts] = useState([]);
  const [expandedNodes, setExpandedNodes] = useState(new Set());
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    loadContracts();
  }, []);

  const loadContracts = async () => {
    try {
      const response = await contractService.getAllContracts();
      setContracts(response.data);
    } catch (error) {
      console.error("Error loading contracts:", error);
    }
  };

  const toggleNode = (nodeId) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const buildFlowData = () => {
    const flow = zones.map((zone) => ({
      ...zone,
      type: "zone",
      children: subZones
        .filter((subZone) => subZone.zoneId === zone.zoneId)
        .map((subZone) => ({
          ...subZone,
          type: "subZone",
          children: buildings
            .filter((building) => building.subZoneId === subZone.subZoneId)
            .map((building) => ({
              ...building,
              type: "building",
              children: villaApartments
                .filter((va) => va.buildingId === building.buildingId)
                .map((va) => ({
                  ...va,
                  type: "villaApartment",
                  children: floors
                    .filter(
                      (floor) => floor.villaApartmentId === va.villaApartmentId
                    )
                    .map((floor) => ({
                      ...floor,
                      type: "floor",
                      children: rooms
                        .filter((room) => room.floorId === floor.floorId)
                        .map((room) => ({
                          ...room,
                          type: "room",
                          children: [],
                        })),
                    })),
                })),
            })),
        })),
    }));
    return flow;
  };

  const getNodeIcon = (type) => {
    switch (type) {
      case "zone":
        return <MapPin className="w-5 h-5 text-blue-500" />;
      case "subZone":
        return <Layers className="w-5 h-5 text-green-500" />;
      case "building":
        return <Building className="w-5 h-5 text-purple-500" />;
      case "villaApartment":
        return <Home className="w-5 h-5 text-orange-500" />;
      case "floor":
        return <Layers className="w-5 h-5 text-indigo-500" />;
      case "room":
        return <DoorOpen className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getNodeName = (node) => {
    switch (node.type) {
      case "zone":
        return node.zoneName;
      case "subZone":
        return node.subZoneName;
      case "building":
        return node.buildingName;
      case "villaApartment":
        return node.villaApartmentName;
      case "floor":
        return node.floorName;
      case "room":
        return node.roomName;
      default:
        return "Unknown";
    }
  };

  const getNodeColor = (type) => {
    switch (type) {
      case "zone":
        return "bg-blue-50 border-blue-200 hover:bg-blue-100";
      case "subZone":
        return "bg-green-50 border-green-200 hover:bg-green-100";
      case "building":
        return "bg-purple-50 border-purple-200 hover:bg-purple-100";
      case "villaApartment":
        return "bg-orange-50 border-orange-200 hover:bg-orange-100";
      case "floor":
        return "bg-indigo-50 border-indigo-200 hover:bg-indigo-100";
      case "room":
        return "bg-red-50 border-red-200 hover:bg-red-100";
      default:
        return "bg-gray-50 border-gray-200 hover:bg-gray-100";
    }
  };

  const handleViewDetails = (node) => {
    setSelectedProperty(node);
    setShowDetailModal(true);
  };

  const FlowNode = ({
    node,
    level = 0,
    isLast = false,
    parentConnectors = [],
  }) => {
    const nodeId = `${node.type}-${node[`${node.type}Id`]}`;
    const isExpanded = expandedNodes.has(nodeId);
    const hasChildren = node.children && node.children.length > 0;

    const connectorStyle =
      level > 0
        ? {
            position: "relative",
            "::before": {
              content: '""',
              position: "absolute",
              left: "-20px",
              top: "50%",
              width: "20px",
              height: "1px",
              backgroundColor: "#d1d5db",
            },
          }
        : {};

    return (
      <div className="relative">
        {/* Connector lines for hierarchy */}
        {level > 0 && (
          <div className="absolute left-0 top-0 bottom-0 flex items-center">
            {parentConnectors.map((connector, index) => (
              <div
                key={index}
                className="w-px bg-gray-300"
                style={{
                  height: "100%",
                  marginLeft: `${index * 40}px`,
                }}
              />
            ))}
            <div className="w-5 h-px bg-gray-300 ml-2" />
            {!isLast && (
              <div
                className="absolute w-px bg-gray-300"
                style={{
                  left: `${level * 40 - 20}px`,
                  top: "50%",
                  bottom: "-100%",
                }}
              />
            )}
          </div>
        )}

        <div
          className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all cursor-pointer ml-${
            level * 10
          } ${getNodeColor(node.type)}`}
          style={{ marginLeft: `${level * 40}px` }}
        >
          <div className="flex items-center gap-2 flex-1">
            {hasChildren ? (
              <button
                onClick={() => toggleNode(nodeId)}
                className="p-1 hover:bg-white rounded transition-colors"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                )}
              </button>
            ) : (
              <div className="w-6 h-6" />
            )}

            {getNodeIcon(node.type)}

            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">
                {getNodeName(node)}
              </h4>
              {node.description && (
                <p className="text-sm text-gray-600 mt-1">{node.description}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {node.imageUrl && (
              <img
                src={node.imageUrl || "/placeholder.svg"}
                alt={getNodeName(node)}
                className="w-12 h-12 rounded object-cover border"
              />
            )}

            <button
              onClick={() => handleViewDetails(node)}
              className="p-2 text-blue-600 hover:bg-blue-100 rounded transition-colors"
              title="View Details"
            >
              <Eye className="w-4 h-4" />
            </button>

            <button
              className="p-2 text-green-600 hover:bg-green-100 rounded transition-colors"
              title="Edit"
            >
              <Edit className="w-4 h-4" />
            </button>

            <button
              className="p-2 text-red-600 hover:bg-red-100 rounded transition-colors"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="mt-2 space-y-2">
            {node.children.map((child, index) => (
              <FlowNode
                key={`${child.type}-${child[`${child.type}Id`]}`}
                node={child}
                level={level + 1}
                isLast={index === node.children.length - 1}
                parentConnectors={[...parentConnectors, !isLast]}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  const flowData = buildFlowData();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          Property Flow Diagram
        </h1>
        <div className="flex items-center gap-4">
          <select
            value={selectedContract?.toString() || ""}
            onChange={(e) => setSelectedContract(e.target.value)}
            className="w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a contract to view</option>
            {contracts.map((contract) => (
              <option
                key={contract.contractId}
                value={contract.contractId.toString()}
              >
                {contract.contractName}
              </option>
            ))}
          </select>

          <button
            onClick={() => setExpandedNodes(new Set())}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Collapse All
          </button>

          <button
            onClick={() => {
              const allNodeIds = new Set();
              const addNodeIds = (nodes) => {
                nodes.forEach((node) => {
                  const nodeId = `${node.type}-${node[`${node.type}Id`]}`;
                  allNodeIds.add(nodeId);
                  if (node.children) {
                    addNodeIds(node.children);
                  }
                });
              };
              addNodeIds(flowData);
              setExpandedNodes(allNodeIds);
            }}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Expand All
          </button>
        </div>
      </div>

      {!selectedContract ? (
        <div className="bg-white shadow rounded-lg">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                Select a Contract
              </h3>
              <p className="text-gray-500">
                Choose a contract from the dropdown above to view its property
                flow diagram
              </p>
            </div>
          </div>
        </div>
      ) : loading ? (
        <div className="bg-white shadow rounded-lg">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading property data...</p>
            </div>
          </div>
        </div>
      ) : flowData.length === 0 ? (
        <div className="bg-white shadow rounded-lg">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                No Property Data Found
              </h3>
              <p className="text-gray-500">
                Start by creating zones for this contract
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-8">
            <div className="space-y-4">
              {flowData.map((zone, index) => (
                <FlowNode
                  key={`zone-${zone.zoneId}`}
                  node={zone}
                  level={0}
                  isLast={index === flowData.length - 1}
                  parentConnectors={[]}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Property Types
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Zone</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
              <Layers className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">SubZone</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg">
              <Building className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium">Building</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg">
              <Home className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium">Villa/Apartment</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-indigo-50 rounded-lg">
              <Layers className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-medium">Floor</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-red-50 rounded-lg">
              <DoorOpen className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium">Room</span>
            </div>
          </div>
        </div>
      </div>

      {/* Property Detail Modal */}
      {showDetailModal && selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedProperty(null);
          }}
        />
      )}
    </div>
  );
};

export default PropertyFlowDiagram;
