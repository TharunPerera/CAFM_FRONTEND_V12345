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
} from "lucide-react";
import { usePropertyFlow } from "../../context/PropertyFlowContext";
import { contractService } from "../../services/contractService";

const PropertyTreeVisualization = () => {
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

  const buildTreeData = () => {
    const tree = zones.map((zone) => ({
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
    return tree;
  };

  const getNodeIcon = (type) => {
    switch (type) {
      case "zone":
        return <MapPin className="w-4 h-4 text-blue-500" />;
      case "subZone":
        return <Layers className="w-4 h-4 text-green-500" />;
      case "building":
        return <Building className="w-4 h-4 text-purple-500" />;
      case "villaApartment":
        return <Home className="w-4 h-4 text-orange-500" />;
      case "floor":
        return <Layers className="w-4 h-4 text-indigo-500" />;
      case "room":
        return <DoorOpen className="w-4 h-4 text-red-500" />;
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

  const TreeNode = ({ node, level = 0 }) => {
    const nodeId = `${node.type}-${node[`${node.type}Id`]}`;
    const isExpanded = expandedNodes.has(nodeId);
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div className="select-none">
        <div
          className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors`}
          style={{ marginLeft: `${level * 20}px` }}
          onClick={() => hasChildren && toggleNode(nodeId)}
        >
          <div className="flex items-center gap-2 flex-1">
            {hasChildren ? (
              isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )
            ) : (
              <div className="w-4 h-4" />
            )}
            {getNodeIcon(node.type)}
            <span className="font-medium text-gray-800">
              {getNodeName(node)}
            </span>
            {node.description && (
              <span className="text-sm text-gray-500 ml-2">
                - {node.description}
              </span>
            )}
          </div>
          {node.imageUrl && (
            <img
              src={node.imageUrl || "/placeholder.svg"}
              alt={getNodeName(node)}
              className="w-8 h-8 rounded object-cover"
            />
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="mt-1">
            {node.children.map((child, index) => (
              <TreeNode
                key={`${child.type}-${child[`${child.type}Id`]}`}
                node={child}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  const treeData = buildTreeData();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Property Flow Visualization</h1>
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
              addNodeIds(treeData);
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
                hierarchy
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
      ) : treeData.length === 0 ? (
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
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center gap-2 mb-4">
              <Building className="w-5 h-5" />
              Property Hierarchy Tree
            </h3>
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {treeData.map((zone) => (
                <TreeNode key={`zone-${zone.zoneId}`} node={zone} level={0} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Legend
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span className="text-sm">Zone</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-green-500" />
              <span className="text-sm">SubZone</span>
            </div>
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-purple-500" />
              <span className="text-sm">Building</span>
            </div>
            <div className="flex items-center gap-2">
              <Home className="w-4 h-4 text-orange-500" />
              <span className="text-sm">Villa/Apartment</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-500" />
              <span className="text-sm">Floor</span>
            </div>
            <div className="flex items-center gap-2">
              <DoorOpen className="w-4 h-4 text-red-500" />
              <span className="text-sm">Room</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyTreeVisualization;
