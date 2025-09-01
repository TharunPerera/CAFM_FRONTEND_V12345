// "use client";

// import { useState, useEffect, useCallback, useRef } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   Save,
//   X,
//   Upload,
//   Calendar,
//   Clock,
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
//   AlertTriangle,
//   ImageIcon,
//   DollarSign,
//   TrendingDown,
//   ArrowLeft,
//   BookmarkPlus,
//   CheckCircle,
//   XCircle,
//   Plus,
//   Trash2,
// } from "lucide-react";
// import { assetService } from "../services/assetService";
// import { contractService } from "../services/contractService";
// import { companyService } from "../services/companyService";
// import { serviceManagementService } from "../services/serviceManagementService";
// import { propertyFlowService } from "../services/propertyFlowService";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import DraftModal from "./DraftModal";

// const AssetForm = ({ isEdit = false }) => {
//   const navigate = useNavigate();
//   const { assetId } = useParams();
//   const { user } = useContext(AuthContext);
//   const updateTimeoutRef = useRef(null);

//   const [loading, setLoading] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [draftSaved, setDraftSaved] = useState(false);
//   const [showDraftModal, setShowDraftModal] = useState(false);
//   const [pendingDraft, setPendingDraft] = useState(null);

//   const [asset, setAsset] = useState({
//     assetName: "",
//     serialNumber: "",
//     brandName: "",
//     modelNumber: "",
//     assetStatus: "ACTIVE",
//     assetCondition: "GOOD",
//     observation: "",
//     recommendation: "",
//     purchaseCost: "",
//     depreciationValue: "",
//     depreciationType: "PERCENTAGE",
//     timeFrameYears: "",
//     companyId: "",
//     contractId: "",
//     zoneId: "",
//     subZoneId: "",
//     buildingId: "",
//     villaApartmentId: "",
//     floorId: "",
//     roomId: "",
//     subServices: [],
//     purchaseDate: "",
//     installationDate: "",
//     warrantyPeriodDays: "",
//     ownerType: "KANVEL",
//     lastAuditDate: "",
//     images: [],
//     imagesToRemove: [],
//   });

//   const [imageFiles, setImageFiles] = useState([]);
//   const [imagePreview, setImagePreview] = useState([]);
//   const [existingImageUrls, setExistingImageUrls] = useState([]);
//   const [errors, setErrors] = useState({});

//   // Dropdown data
//   const [companies, setCompanies] = useState([]);
//   const [contracts, setContracts] = useState([]);
//   const [zones, setZones] = useState([]);
//   const [subZones, setSubZones] = useState([]);
//   const [buildings, setBuildings] = useState([]);
//   const [villaApartments, setVillaApartments] = useState([]);
//   const [floors, setFloors] = useState([]);
//   const [rooms, setRooms] = useState([]);
//   const [services, setServices] = useState([]);
//   const [contractSubServices, setContractSubServices] = useState([]);
//   const [contractServiceScopes, setContractServiceScopes] = useState({});

//   const MAX_IMAGES = 3;
//   const MAX_IMAGE_SIZE_MB = 1;
//   const ALLOWED_IMAGE_TYPES = [
//     "image/jpeg",
//     "image/png",
//     "image/gif",
//     "image/webp",
//   ];

//   // Draft functionality
//   const DRAFT_KEY = `asset_draft_${isEdit ? assetId : "new"}`;

//   const saveDraft = useCallback(() => {
//     try {
//       const draftData = {
//         asset,
//         timestamp: new Date().toISOString(),
//         companies,
//         contracts,
//         zones,
//         subZones,
//         buildings,
//         villaApartments,
//         floors,
//         rooms,
//         contractSubServices,
//         contractServiceScopes,
//       };
//       localStorage.setItem(DRAFT_KEY, JSON.stringify(draftData));
//       setDraftSaved(true);
//       setTimeout(() => setDraftSaved(false), 3000);
//     } catch (error) {
//       console.error("Failed to save draft:", error);
//     }
//   }, [
//     asset,
//     companies,
//     contracts,
//     zones,
//     subZones,
//     buildings,
//     villaApartments,
//     floors,
//     rooms,
//     contractSubServices,
//     contractServiceScopes,
//     DRAFT_KEY,
//   ]);

//   const loadDraft = useCallback(() => {
//     try {
//       const savedDraft = localStorage.getItem(DRAFT_KEY);
//       if (savedDraft) {
//         const draftData = JSON.parse(savedDraft);
//         return draftData;
//       }
//     } catch (error) {
//       console.error("Failed to load draft:", error);
//     }
//     return null;
//   }, [DRAFT_KEY]);

//   const clearDraft = useCallback(() => {
//     try {
//       localStorage.removeItem(DRAFT_KEY);
//     } catch (error) {
//       console.error("Failed to clear draft:", error);
//     }
//   }, [DRAFT_KEY]);

//   useEffect(() => {
//     if (!isEdit) {
//       const draft = loadDraft();
//       if (draft && draft.asset) {
//         setPendingDraft(draft);
//         setShowDraftModal(true);
//       }
//     }
//   }, [loadDraft, isEdit]);

//   const handleLoadDraft = () => {
//     if (pendingDraft) {
//       setAsset(pendingDraft.asset);
//       if (pendingDraft.companies) setCompanies(pendingDraft.companies);
//       if (pendingDraft.contracts) setContracts(pendingDraft.contracts);
//       if (pendingDraft.zones) setZones(pendingDraft.zones);
//       if (pendingDraft.subZones) setSubZones(pendingDraft.subZones);
//       if (pendingDraft.buildings) setBuildings(pendingDraft.buildings);
//       if (pendingDraft.villaApartments)
//         setVillaApartments(pendingDraft.villaApartments);
//       if (pendingDraft.floors) setFloors(pendingDraft.floors);
//       if (pendingDraft.rooms) setRooms(pendingDraft.rooms);
//       if (pendingDraft.contractSubServices)
//         setContractSubServices(pendingDraft.contractSubServices);
//       if (pendingDraft.contractServiceScopes)
//         setContractServiceScopes(pendingDraft.contractServiceScopes);
//     }
//     setShowDraftModal(false);
//     setPendingDraft(null);
//   };

//   const handleCloseDraftModal = () => {
//     setShowDraftModal(false);
//     setPendingDraft(null);
//   };

//   useEffect(() => {
//     if (!isEdit) {
//       if (updateTimeoutRef.current) {
//         clearTimeout(updateTimeoutRef.current);
//       }
//       updateTimeoutRef.current = setTimeout(() => {
//         if (asset.assetName || asset.companyId || asset.contractId) {
//           saveDraft();
//         }
//       }, 2000);

//       return () => {
//         if (updateTimeoutRef.current) {
//           clearTimeout(updateTimeoutRef.current);
//         }
//       };
//     }
//   }, [asset, saveDraft, isEdit]);

//   useEffect(() => {
//     const loadInitialData = async () => {
//       setLoading(true);
//       try {
//         const [companiesResponse, contractsResponse, servicesResponse] =
//           await Promise.all([
//             companyService.getAllCompanies(),
//             contractService.getAllContracts(),
//             serviceManagementService.getServices(),
//           ]);

//         setCompanies(companiesResponse.data || []);
//         setContracts(contractsResponse.data || []);
//         setServices(servicesResponse.data || []);

//         if (isEdit && assetId) {
//           const assetResponse = await assetService.getAssetById(assetId);
//           const assetData = assetResponse.data;

//           const transformedSubServices =
//             assetData.subServices?.map((subService) => ({
//               subServiceId: subService.subServiceId,
//               serviceScopeIds: subService.serviceScopeIds || [],
//             })) || [];

//           setAsset({
//             ...assetData,
//             companyId: assetData.companyId.toString(),
//             contractId: assetData.contractId.toString(),
//             zoneId: assetData.zoneId.toString(),
//             subZoneId: assetData.subZoneId.toString(),
//             buildingId: assetData.buildingId.toString(),
//             villaApartmentId: assetData.villaApartmentId.toString(),
//             floorId: assetData.floorId.toString(),
//             roomId: assetData.roomId.toString(),
//             subServices: transformedSubServices,
//             purchaseCost: assetData.purchaseCost?.toString() || "",
//             depreciationValue: assetData.depreciationValue?.toString() || "",
//             timeFrameYears: assetData.timeFrameYears?.toString() || "",
//             warrantyPeriodDays: assetData.warrantyPeriodDays?.toString() || "",
//             imagesToRemove: [],
//           });

//           if (assetData.imageUrls && assetData.imageUrls.length > 0) {
//             setExistingImageUrls(assetData.imageUrls);
//             setImagePreview(assetData.imageUrls);
//           }

//           await Promise.all([
//             loadZones(assetData.contractId),
//             loadContractSubServices(assetData.contractId),
//           ]);

//           await Promise.all([
//             loadSubZones(assetData.contractId, assetData.zoneId),
//           ]);

//           await loadBuildings(assetData.contractId, assetData.subZoneId);
//           await loadVillaApartments(assetData.contractId, assetData.buildingId);
//           await loadFloors(assetData.contractId, assetData.villaApartmentId);
//           await loadRooms(assetData.contractId, assetData.floorId);

//           for (const subService of transformedSubServices) {
//             await loadServiceScopes(
//               assetData.contractId,
//               subService.subServiceId
//             );
//           }
//         }
//       } catch (error) {
//         console.error("Error loading initial data:", error);
//         toast.error("Failed to load form data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadInitialData();
//   }, [isEdit, assetId]);

//   const loadZones = async (contractId) => {
//     if (!contractId) return;
//     try {
//       const response = await propertyFlowService.getAllZonesByContract(
//         contractId
//       );
//       setZones(response.data || []);
//     } catch (error) {
//       console.error("Error loading zones:", error);
//       toast.error("Failed to load zones");
//     }
//   };

//   const loadSubZones = async (contractId, zoneId) => {
//     if (!contractId || !zoneId) return;
//     try {
//       const response = await propertyFlowService.getAllSubZonesByContract(
//         contractId
//       );
//       setSubZones(
//         (response.data || []).filter(
//           (sz) => sz.zoneId.toString() === zoneId.toString()
//         )
//       );
//     } catch (error) {
//       console.error("Error loading sub zones:", error);
//       toast.error("Failed to load sub zones");
//     }
//   };

//   const loadBuildings = async (contractId, subZoneId) => {
//     if (!contractId || !subZoneId) return;
//     try {
//       const response = await propertyFlowService.getAllBuildingsByContract(
//         contractId
//       );
//       setBuildings(
//         (response.data || []).filter(
//           (b) => b.subZoneId.toString() === subZoneId.toString()
//         )
//       );
//     } catch (error) {
//       console.error("Error loading buildings:", error);
//       toast.error("Failed to load buildings");
//     }
//   };

//   const loadVillaApartments = async (contractId, buildingId) => {
//     if (!contractId || !buildingId) return;
//     try {
//       const response =
//         await propertyFlowService.getAllVillaApartmentsByContract(contractId);
//       setVillaApartments(
//         (response.data || []).filter(
//           (va) => va.buildingId.toString() === buildingId.toString()
//         )
//       );
//     } catch (error) {
//       console.error("Error loading villa apartments:", error);
//       toast.error("Failed to load villa apartments");
//     }
//   };

//   const loadFloors = async (contractId, villaApartmentId) => {
//     if (!contractId || !villaApartmentId) return;
//     try {
//       const response = await propertyFlowService.getAllFloorsByContract(
//         contractId
//       );
//       setFloors(
//         (response.data || []).filter(
//           (f) => f.villaApartmentId.toString() === villaApartmentId.toString()
//         )
//       );
//     } catch (error) {
//       console.error("Error loading floors:", error);
//       toast.error("Failed to load floors");
//     }
//   };

//   const loadRooms = async (contractId, floorId) => {
//     if (!contractId || !floorId) return;
//     try {
//       const response = await propertyFlowService.getAllRoomsByContract(
//         contractId
//       );
//       setRooms(
//         (response.data || []).filter(
//           (r) => r.floorId.toString() === floorId.toString()
//         )
//       );
//     } catch (error) {
//       console.error("Error loading rooms:", error);
//       toast.error("Failed to load rooms");
//     }
//   };

//   const loadContractSubServices = async (contractId) => {
//     if (!contractId) {
//       setContractSubServices([]);
//       return;
//     }
//     try {
//       const response = await assetService.getSubServicesByContract(contractId);
//       setContractSubServices(response.data || []);
//     } catch (error) {
//       console.error("Error loading contract sub services:", error);
//       setContractSubServices([]);
//       toast.error("Failed to load contract sub-services");
//     }
//   };

//   const loadServiceScopes = async (contractId, subServiceId) => {
//     if (!contractId || !subServiceId) return;
//     try {
//       const response =
//         await assetService.getServiceScopesByContractAndSubService(
//           contractId,
//           subServiceId
//         );
//       setContractServiceScopes((prev) => ({
//         ...prev,
//         [subServiceId]: response.data || [],
//       }));
//     } catch (error) {
//       console.error("Error loading service scopes:", error);
//       toast.error("Failed to load service scopes");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAsset((prev) => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: null }));
//     }

//     if (name === "contractId") {
//       loadZones(value);
//       loadContractSubServices(value);
//       setAsset((prev) => ({
//         ...prev,
//         zoneId: "",
//         subZoneId: "",
//         buildingId: "",
//         villaApartmentId: "",
//         floorId: "",
//         roomId: "",
//         subServices: [],
//       }));
//       setContractServiceScopes({});
//     } else if (name === "zoneId") {
//       loadSubZones(asset.contractId, value);
//       setAsset((prev) => ({
//         ...prev,
//         subZoneId: "",
//         buildingId: "",
//         villaApartmentId: "",
//         floorId: "",
//         roomId: "",
//       }));
//     } else if (name === "subZoneId") {
//       loadBuildings(asset.contractId, value);
//       setAsset((prev) => ({
//         ...prev,
//         buildingId: "",
//         villaApartmentId: "",
//         floorId: "",
//         roomId: "",
//       }));
//     } else if (name === "buildingId") {
//       loadVillaApartments(asset.contractId, value);
//       setAsset((prev) => ({
//         ...prev,
//         villaApartmentId: "",
//         floorId: "",
//         roomId: "",
//       }));
//     } else if (name === "villaApartmentId") {
//       loadFloors(asset.contractId, value);
//       setAsset((prev) => ({ ...prev, floorId: "", roomId: "" }));
//     } else if (name === "floorId") {
//       loadRooms(asset.contractId, value);
//       setAsset((prev) => ({ ...prev, roomId: "" }));
//     }
//   };

//   const addSubService = () => {
//     setAsset((prev) => ({
//       ...prev,
//       subServices: [
//         ...prev.subServices,
//         { subServiceId: "", serviceScopeIds: [] },
//       ],
//     }));
//   };

//   const removeSubService = (index) => {
//     setAsset((prev) => ({
//       ...prev,
//       subServices: prev.subServices.filter((_, i) => i !== index),
//     }));
//   };

//   const updateSubService = (index, field, value) => {
//     setAsset((prev) => ({
//       ...prev,
//       subServices: prev.subServices.map((subService, i) => {
//         if (i === index) {
//           if (field === "subServiceId") {
//             loadServiceScopes(asset.contractId, value);
//             return { ...subService, [field]: value, serviceScopeIds: [] };
//           }
//           return { ...subService, [field]: value };
//         }
//         return subService;
//       }),
//     }));
//   };

//   const toggleServiceScope = (subServiceIndex, scopeId) => {
//     setAsset((prev) => ({
//       ...prev,
//       subServices: prev.subServices.map((subService, i) => {
//         if (i === subServiceIndex) {
//           const currentScopes = subService.serviceScopeIds;
//           const isSelected = currentScopes.includes(scopeId);
//           return {
//             ...subService,
//             serviceScopeIds: isSelected
//               ? currentScopes.filter((id) => id !== scopeId)
//               : [...currentScopes, scopeId],
//           };
//         }
//         return subService;
//       }),
//     }));
//   };

//   const validateImageFile = (file) => {
//     console.log(
//       `Validating file: ${file.name}, size: ${file.size}, type: ${file.type}`
//     );
//     const fileSizeMB = file.size / (1024 * 1024);
//     if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
//       toast.error(
//         `Image "${file.name}" has an unsupported format. Allowed formats: JPEG, PNG, GIF, WebP.`
//       );
//       return false;
//     }
//     if (fileSizeMB > MAX_IMAGE_SIZE_MB) {
//       toast.error(
//         `Image "${file.name}" exceeds ${MAX_IMAGE_SIZE_MB}MB limit. Please upload a smaller image.`
//       );
//       return false;
//     }
//     return true;
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     console.log(`Selected files: ${files.map((f) => f.name).join(", ")}`);
//     if (files.length === 0) {
//       console.log("No files selected");
//       return;
//     }

//     const totalCurrentImages = imageFiles.length + existingImageUrls.length;
//     const availableSlots = MAX_IMAGES - totalCurrentImages;

//     if (files.length > availableSlots) {
//       toast.error(
//         `You can only upload ${availableSlots} more image(s). Maximum ${MAX_IMAGES} images allowed.`
//       );
//       console.log(
//         `Too many files selected. Available slots: ${availableSlots}`
//       );
//       e.target.value = "";
//       return;
//     }

//     const validFiles = [];
//     const invalidFiles = [];

//     files.forEach((file) => {
//       if (validateImageFile(file)) {
//         validFiles.push(file);
//       } else {
//         invalidFiles.push(file);
//       }
//     });

//     if (validFiles.length > 0) {
//       console.log(`Valid files: ${validFiles.map((f) => f.name).join(", ")}`);
//       setImageFiles((prev) => [...prev, ...validFiles]);
//       const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
//       setImagePreview((prev) => [...prev, ...newPreviews]);
//       toast.success(`${validFiles.length} image(s) added successfully`);

//       if (errors.images) {
//         setErrors((prev) => ({ ...prev, images: null }));
//       }
//     }

//     if (invalidFiles.length > 0) {
//       console.log(
//         `Invalid files: ${invalidFiles.map((f) => f.name).join(", ")}`
//       );
//       e.target.value = "";
//       return;
//     }

//     e.target.value = "";
//   };

//   const removeImage = (index) => {
//     console.log(`Removing image at index: ${index}`);
//     if (isEdit) {
//       const totalPreviews = imagePreview.length;
//       const existingCount = existingImageUrls.length;

//       if (index < existingCount) {
//         const imageToRemove = existingImageUrls[index];
//         setAsset((prev) => ({
//           ...prev,
//           imagesToRemove: [...(prev.imagesToRemove || []), imageToRemove],
//         }));

//         const updatedExistingUrls = [...existingImageUrls];
//         updatedExistingUrls.splice(index, 1);
//         setExistingImageUrls(updatedExistingUrls);

//         setImagePreview((prev) => {
//           const updated = [...prev];
//           updated.splice(index, 1);
//           return updated;
//         });
//         toast.info(`Existing image ${index + 1} removed`);
//       } else {
//         const newImageIndex = index - existingCount;
//         setImageFiles((prev) => {
//           const updated = [...prev];
//           updated.splice(newImageIndex, 1);
//           return updated;
//         });

//         setImagePreview((prev) => {
//           const updated = [...prev];
//           updated.splice(index, 1);
//           return updated;
//         });
//         toast.info(`New image ${index + 1} removed`);
//       }
//     } else {
//       setImageFiles((prev) => prev.filter((_, i) => i !== index));
//       setImagePreview((prev) => prev.filter((_, i) => i !== index));
//       toast.info(`Image ${index + 1} removed`);
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!asset.assetName.trim()) {
//       newErrors.assetName = "Asset name is required";
//       toast.error("Asset name is required");
//     }

//     if (!user || !user.username) {
//       newErrors.username = "User information is required. Please log in again.";
//       toast.error("User information is required. Please log in again.");
//     }

//     if (!asset.companyId) {
//       newErrors.companyId = "Company is required";
//       toast.error("Company is required");
//     }

//     if (!asset.contractId) {
//       newErrors.contractId = "Contract is required";
//       toast.error("Contract is required");
//     }

//     if (!asset.zoneId) {
//       newErrors.zoneId = "Zone is required";
//       toast.error("Zone is required");
//     }

//     if (!asset.subZoneId) {
//       newErrors.subZoneId = "Sub Zone is required";
//       toast.error("Sub Zone is required");
//     }

//     if (!asset.buildingId) {
//       newErrors.buildingId = "Building is required";
//       toast.error("Building is required");
//     }

//     if (!asset.villaApartmentId) {
//       newErrors.villaApartmentId = "Villa/Apartment is required";
//       toast.error("Villa/Apartment is required");
//     }

//     if (!asset.floorId) {
//       newErrors.floorId = "Floor is required";
//       toast.error("Floor is required");
//     }

//     if (!asset.roomId) {
//       newErrors.roomId = "Room is required";
//       toast.error("Room is required");
//     }

//     if (!asset.subServices || asset.subServices.length === 0) {
//       newErrors.subServices = "At least one sub-service must be specified";
//       toast.error("At least one sub-service must be specified");
//     } else {
//       asset.subServices.forEach((subService, index) => {
//         if (!subService.subServiceId) {
//           newErrors[`subService_${index}`] = `Sub-service ${
//             index + 1
//           }: Selection is required`;
//           toast.error(`Sub-service ${index + 1}: Selection is required`);
//         }
//         if (
//           !subService.serviceScopeIds ||
//           subService.serviceScopeIds.length === 0
//         ) {
//           newErrors[`serviceScopes_${index}`] = `Sub-service ${
//             index + 1
//           }: At least one service scope must be selected`;
//           toast.error(
//             `Sub-service ${
//               index + 1
//             }: At least one service scope must be selected`
//           );
//         }
//       });
//     }

//     if (asset.purchaseCost && isNaN(Number.parseFloat(asset.purchaseCost))) {
//       newErrors.purchaseCost = "Purchase cost must be a valid number";
//       toast.error("Purchase cost must be a valid number");
//     }

//     if (
//       asset.depreciationValue &&
//       isNaN(Number.parseFloat(asset.depreciationValue))
//     ) {
//       newErrors.depreciationValue = "Depreciation value must be a valid number";
//       toast.error("Depreciation value must be a valid number");
//     }

//     if (
//       asset.depreciationType === "PERCENTAGE" &&
//       asset.depreciationValue &&
//       (Number.parseFloat(asset.depreciationValue) < 0 ||
//         Number.parseFloat(asset.depreciationValue) > 100)
//     ) {
//       newErrors.depreciationValue =
//         "Depreciation percentage must be between 0 and 100";
//       toast.error("Depreciation percentage must be between 0 and 100");
//     }

//     if (
//       asset.timeFrameYears &&
//       (isNaN(Number.parseInt(asset.timeFrameYears)) ||
//         Number.parseInt(asset.timeFrameYears) < 1 ||
//         Number.parseInt(asset.timeFrameYears) > 50)
//     ) {
//       newErrors.timeFrameYears = "Time frame must be between 1 and 50 years";
//       toast.error("Time frame must be between 1 and 50 years");
//     }

//     if (!isEdit && imageFiles.length === 0) {
//       newErrors.images = "At least one image is required";
//       toast.error("At least one image is required");
//     } else if (
//       isEdit &&
//       imageFiles.length === 0 &&
//       existingImageUrls.length === 0
//     ) {
//       newErrors.images = "At least one image is required";
//       toast.error("At least one image is required");
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const calculateDepreciatedValue = () => {
//     if (
//       !asset.purchaseCost ||
//       !asset.depreciationValue ||
//       !asset.depreciationType ||
//       !asset.timeFrameYears
//     )
//       return "-";

//     const cost = Number.parseFloat(asset.purchaseCost);
//     const value = Number.parseFloat(asset.depreciationValue);
//     const years = Number.parseInt(asset.timeFrameYears);

//     if (asset.depreciationType === "NUMBER") {
//       const result = Math.max(cost - value * years, 0);
//       return result.toLocaleString(undefined, {
//         minimumFractionDigits: 2,
//         maximumFractionDigits: 2,
//       });
//     }

//     const annualDepreciation = cost * (value / 100);
//     const result = Math.max(cost - annualDepreciation * years, 0);
//     return result.toLocaleString(undefined, {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Submitting form...");
//     if (!validateForm()) {
//       console.log("Form validation failed");
//       return;
//     }

//     if (!user || !user.username) {
//       toast.error("User information is missing. Please log in again.");
//       console.log("User information missing");
//       return;
//     }

//     setSubmitting(true);
//     try {
//       const assetData = {
//         ...asset,
//         images: imageFiles,
//         appendImages: true,
//         imagesToRemove: asset.imagesToRemove || [],
//       };

//       if (isEdit) {
//         await assetService.updateAsset(assetId, assetData);
//         toast.success("Asset updated successfully");
//       } else {
//         await assetService.createAsset(assetData);
//         toast.success("Asset created successfully");
//         clearDraft();
//       }

//       navigate("/assets/list");
//     } catch (error) {
//       console.error("Error saving asset:", error);
//       toast.error(error.response?.data?.message || "Failed to save asset");
//     } finally {
//       setSubmitting(false);
//     }
//   };

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

//   return (
//     <>
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//       />
//       <DraftModal
//         isOpen={showDraftModal}
//         onClose={handleCloseDraftModal}
//         onLoad={handleLoadDraft}
//         draftData={pendingDraft}
//       />
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Header */}
//           <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-4">
//                 <button
//                   onClick={() => navigate("/assets/list")}
//                   className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
//                 >
//                   <ArrowLeft className="w-5 h-5 text-gray-600" />
//                 </button>
//                 <div>
//                   <h1 className="text-3xl font-bold text-gray-900">
//                     {isEdit ? "Edit Asset" : "Create New Asset"}
//                   </h1>
//                   <p className="text-gray-600 mt-1">
//                     {isEdit
//                       ? "Update asset information"
//                       : "Add a new asset to your inventory"}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-4">
//                 {draftSaved && (
//                   <div className="flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-lg animate-fade-in">
//                     <CheckCircle className="w-5 h-5 mr-2" />
//                     <span className="font-medium">Draft Saved</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {(!user || !user.username) && (
//             <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
//               <div className="flex">
//                 <AlertTriangle className="h-5 w-5 text-yellow-400" />
//                 <div className="ml-3">
//                   <p className="text-sm text-yellow-700">
//                     User information is missing. Please log out and log in again
//                     to fix this issue.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-8">
//             {/* 1. Organization Information */}
//             <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//               <div className="flex items-center mb-6">
//                 <div className="p-3 bg-blue-100 rounded-xl mr-4">
//                   <Building className="w-6 h-6 text-blue-600" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900">
//                     Organization Information
//                   </h2>
//                   <p className="text-gray-600">
//                     Select company and contract details
//                   </p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <div className="space-y-2">
//                   <label
//                     htmlFor="companyId"
//                     className="block text-sm font-semibold text-gray-700"
//                   >
//                     Company *
//                   </label>
//                   <select
//                     id="companyId"
//                     name="companyId"
//                     value={asset.companyId}
//                     onChange={handleChange}
//                     className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                       errors.companyId
//                         ? "border-red-500 bg-red-50"
//                         : "border-gray-200 hover:border-gray-300"
//                     }`}
//                   >
//                     <option value="">Select Company</option>
//                     {companies.map((company) => (
//                       <option
//                         key={company.companyId}
//                         value={company.companyId.toString()}
//                       >
//                         {company.companyName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="space-y-2">
//                   <label
//                     htmlFor="contractId"
//                     className="block text-sm font-semibold text-gray-700"
//                   >
//                     Contract *
//                   </label>
//                   <select
//                     id="contractId"
//                     name="contractId"
//                     value={asset.contractId}
//                     onChange={handleChange}
//                     className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                       errors.contractId
//                         ? "border-red-500 bg-red-50"
//                         : "border-gray-200 hover:border-gray-300"
//                     }`}
//                   >
//                     <option value="">Select Contract</option>
//                     {contracts.map((contract) => (
//                       <option
//                         key={contract.contractId}
//                         value={contract.contractId.toString()}
//                       >
//                         {contract.contractName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>

//             {/* 2. Location Information */}
//             <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//               <div className="flex items-center mb-6">
//                 <div className="p-3 bg-green-100 rounded-xl mr-4">
//                   <MapPin className="w-6 h-6 text-green-600" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900">
//                     Location Information
//                   </h2>
//                   <p className="text-gray-600">
//                     Specify the exact location of the asset
//                   </p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 <div className="space-y-2">
//                   <label
//                     htmlFor="zoneId"
//                     className="block text-sm font-semibold text-gray-700 flex items-center"
//                   >
//                     <MapPin className="w-4 h-4 mr-1 text-gray-500" />
//                     Zone *
//                   </label>
//                   <select
//                     id="zoneId"
//                     name="zoneId"
//                     value={asset.zoneId}
//                     onChange={handleChange}
//                     disabled={!asset.contractId}
//                     className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                       errors.zoneId
//                         ? "border-red-500 bg-red-50"
//                         : "border-gray-200 hover:border-gray-300"
//                     } ${
//                       !asset.contractId ? "bg-gray-100 cursor-not-allowed" : ""
//                     }`}
//                   >
//                     <option value="">Select Zone</option>
//                     {zones.map((zone) => (
//                       <option key={zone.zoneId} value={zone.zoneId.toString()}>
//                         {zone.zoneName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="space-y-2">
//                   <label
//                     htmlFor="subZoneId"
//                     className="block text-sm font-semibold text-gray-700 flex items-center"
//                   >
//                     <Layers className="w-4 h-4 mr-1 text-gray-500" />
//                     Sub Zone *
//                   </label>
//                   <select
//                     id="subZoneId"
//                     name="subZoneId"
//                     value={asset.subZoneId}
//                     onChange={handleChange}
//                     disabled={!asset.zoneId}
//                     className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                       errors.subZoneId
//                         ? "border-red-500 bg-red-50"
//                         : "border-gray-200 hover:border-gray-300"
//                     } ${!asset.zoneId ? "bg-gray-100 cursor-not-allowed" : ""}`}
//                   >
//                     <option value="">Select Sub Zone</option>
//                     {subZones.map((subZone) => (
//                       <option
//                         key={subZone.subZoneId}
//                         value={subZone.subZoneId.toString()}
//                       >
//                         {subZone.subZoneName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="space-y-2">
//                   <label
//                     htmlFor="buildingId"
//                     className="block text-sm font-semibold text-gray-700 flex items-center"
//                   >
//                     <Building className="w-4 h-4 mr-1 text-gray-500" />
//                     Building *
//                   </label>
//                   <select
//                     id="buildingId"
//                     name="buildingId"
//                     value={asset.buildingId}
//                     onChange={handleChange}
//                     disabled={!asset.subZoneId}
//                     className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                       errors.buildingId
//                         ? "border-red-500 bg-red-50"
//                         : "border-gray-200 hover:border-gray-300"
//                     } ${
//                       !asset.subZoneId ? "bg-gray-100 cursor-not-allowed" : ""
//                     }`}
//                   >
//                     <option value="">Select Building</option>
//                     {buildings.map((building) => (
//                       <option
//                         key={building.buildingId}
//                         value={building.buildingId.toString()}
//                       >
//                         {building.buildingName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="space-y-2">
//                   <label
//                     htmlFor="villaApartmentId"
//                     className="block text-sm font-semibold text-gray-700 flex items-center"
//                   >
//                     <Home className="w-4 h-4 mr-1 text-gray-500" />
//                     Villa/Apartment *
//                   </label>
//                   <select
//                     id="villaApartmentId"
//                     name="villaApartmentId"
//                     value={asset.villaApartmentId}
//                     onChange={handleChange}
//                     disabled={!asset.buildingId}
//                     className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                       errors.villaApartmentId
//                         ? "border-red-500 bg-red-50"
//                         : "border-gray-200 hover:border-gray-300"
//                     } ${
//                       !asset.buildingId ? "bg-gray-100 cursor-not-allowed" : ""
//                     }`}
//                   >
//                     <option value="">Select Villa/Apartment</option>
//                     {villaApartments.map((va) => (
//                       <option
//                         key={va.villaApartmentId}
//                         value={va.villaApartmentId.toString()}
//                       >
//                         {va.villaApartmentName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="space-y-2">
//                   <label
//                     htmlFor="floorId"
//                     className="block text-sm font-semibold text-gray-700 flex items-center"
//                   >
//                     <Layers className="w-4 h-4 mr-1 text-gray-500" />
//                     Floor *
//                   </label>
//                   <select
//                     id="floorId"
//                     name="floorId"
//                     value={asset.floorId}
//                     onChange={handleChange}
//                     disabled={!asset.villaApartmentId}
//                     className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                       errors.floorId
//                         ? "border-red-500 bg-red-50"
//                         : "border-gray-200 hover:border-gray-300"
//                     } ${
//                       !asset.villaApartmentId
//                         ? "bg-gray-100 cursor-not-allowed"
//                         : ""
//                     }`}
//                   >
//                     <option value="">Select Floor</option>
//                     {floors.map((floor) => (
//                       <option
//                         key={floor.floorId}
//                         value={floor.floorId.toString()}
//                       >
//                         {floor.floorName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="space-y-2">
//                   <label
//                     htmlFor="roomId"
//                     className="block text-sm font-semibold text-gray-700 flex items-center"
//                   >
//                     <DoorOpen className="w-4 h-4 mr-1 text-gray-500" />
//                     Room *
//                   </label>
//                   <select
//                     id="roomId"
//                     name="roomId"
//                     value={asset.roomId}
//                     onChange={handleChange}
//                     disabled={!asset.floorId}
//                     className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                       errors.roomId
//                         ? "border-red-500 bg-red-50"
//                         : "border-gray-200 hover:border-gray-300"
//                     } ${
//                       !asset.floorId ? "bg-gray-100 cursor-not-allowed" : ""
//                     }`}
//                   >
//                     <option value="">Select Room</option>
//                     {rooms.map((room) => (
//                       <option key={room.roomId} value={room.roomId.toString()}>
//                         {room.roomName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//               <div className="flex items-center mb-6">
//                 <div className="p-3 bg-orange-100 rounded-xl mr-4">
//                   <Info className="w-6 h-6 text-orange-600" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900">
//                     Basic Asset Information
//                   </h2>
//                   <p className="text-gray-600">
//                     Enter fundamental asset details
//                   </p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <div className="space-y-6">
//                   <div className="space-y-2">
//                     <label
//                       htmlFor="assetName"
//                       className="block text-sm font-semibold text-gray-700 flex items-center"
//                     >
//                       <Tag className="w-4 h-4 mr-1 text-gray-500" />
//                       Asset Name *
//                     </label>
//                     <input
//                       id="assetName"
//                       type="text"
//                       name="assetName"
//                       value={asset.assetName}
//                       onChange={handleChange}
//                       className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                         errors.assetName
//                           ? "border-red-500 bg-red-50"
//                           : "border-gray-200 hover:border-gray-300"
//                       }`}
//                       placeholder="Enter asset name"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label
//                       htmlFor="serialNumber"
//                       className="block text-sm font-semibold text-gray-700 flex items-center"
//                     >
//                       <Barcode className="w-4 h-4 mr-1 text-gray-500" />
//                       Serial Number
//                     </label>
//                     <input
//                       id="serialNumber"
//                       type="text"
//                       name="serialNumber"
//                       value={asset.serialNumber}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
//                       placeholder="Enter serial number"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label
//                       htmlFor="brandName"
//                       className="block text-sm font-semibold text-gray-700 flex items-center"
//                     >
//                       <Box className="w-4 h-4 mr-1 text-gray-500" />
//                       Brand Name
//                     </label>
//                     <input
//                       id="brandName"
//                       type="text"
//                       name="brandName"
//                       value={asset.brandName}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
//                       placeholder="Enter brand name"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label
//                       htmlFor="modelNumber"
//                       className="block text-sm font-semibold text-gray-700 flex items-center"
//                     >
//                       <Cpu className="w-4 h-4 mr-1 text-gray-500" />
//                       Model Number
//                     </label>
//                     <input
//                       id="modelNumber"
//                       type="text"
//                       name="modelNumber"
//                       value={asset.modelNumber}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
//                       placeholder="Enter model number"
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-6">
//                   <div className="space-y-2">
//                     <label
//                       htmlFor="assetStatus"
//                       className="block text-sm font-semibold text-gray-700 flex items-center"
//                     >
//                       <AlertTriangle className="w-4 h-4 mr-1 text-gray-500" />
//                       Asset Status *
//                     </label>
//                     <select
//                       id="assetStatus"
//                       name="assetStatus"
//                       value={asset.assetStatus}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
//                     >
//                       <option value="ACTIVE">Active</option>
//                       <option value="UNDER_MAINTENANCE">
//                         Under Maintenance
//                       </option>
//                       <option value="DECOMMISSIONED">Decommissioned</option>
//                     </select>
//                   </div>

//                   <div className="space-y-2">
//                     <label
//                       htmlFor="assetCondition"
//                       className="block text-sm font-semibold text-gray-700 flex items-center"
//                     >
//                       <AlertTriangle className="w-4 h-4 mr-1 text-gray-500" />
//                       Asset Condition *
//                     </label>
//                     <select
//                       id="assetCondition"
//                       name="assetCondition"
//                       value={asset.assetCondition}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
//                     >
//                       <option value="EXCELLENT">Excellent</option>
//                       <option value="GOOD">Good</option>
//                       <option value="AVERAGE">Average</option>
//                       <option value="POOR">Poor</option>
//                     </select>
//                   </div>

//                   <div className="space-y-2">
//                     <label
//                       htmlFor="ownerType"
//                       className="block text-sm font-semibold text-gray-700 flex items-center"
//                     >
//                       <User className="w-4 h-4 mr-1 text-gray-500" />
//                       Owner Type
//                     </label>
//                     <select
//                       id="ownerType"
//                       name="ownerType"
//                       value={asset.ownerType}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
//                     >
//                       <option value="KANVEL">Kanvel</option>
//                       <option value="TENANT">Tenant</option>
//                       <option value="PROPERTY_OWNER">Property Owner</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
//                 <div className="space-y-2">
//                   <label
//                     htmlFor="observation"
//                     className="block text-sm font-semibold text-gray-700"
//                   >
//                     Observation
//                   </label>
//                   <textarea
//                     id="observation"
//                     name="observation"
//                     value={asset.observation}
//                     onChange={handleChange}
//                     rows={4}
//                     className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all resize-none"
//                     placeholder="Enter observations about the asset"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label
//                     htmlFor="recommendation"
//                     className="block text-sm font-semibold text-gray-700"
//                   >
//                     Recommendation
//                   </label>
//                   <textarea
//                     id="recommendation"
//                     name="recommendation"
//                     value={asset.recommendation}
//                     onChange={handleChange}
//                     rows={4}
//                     className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all resize-none"
//                     placeholder="Enter recommendations for the asset"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//               <div className="flex items-center mb-6">
//                 <div className="p-3 bg-purple-100 rounded-xl mr-4">
//                   <Wrench className="w-6 h-6 text-purple-600" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900">
//                     Service Information
//                   </h2>
//                   <p className="text-gray-600">
//                     Define service categories and scopes for multiple
//                     sub-services
//                   </p>
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 <div className="flex items-center justify-between">
//                   <label className="block text-sm font-semibold text-gray-700">
//                     Contract-Defined Sub-Services *
//                   </label>
//                   <button
//                     type="button"
//                     onClick={addSubService}
//                     disabled={!asset.contractId}
//                     className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                   >
//                     <Plus className="w-4 h-4 mr-2" />
//                     Add Sub-Service
//                   </button>
//                 </div>

//                 {asset.subServices.length === 0 ? (
//                   <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-xl">
//                     <Wrench className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                     <p className="text-lg font-medium">No sub-services added</p>
//                     <p className="text-sm">
//                       {!asset.contractId
//                         ? "Please select a contract first"
//                         : "Click 'Add Sub-Service' to get started"}
//                     </p>
//                   </div>
//                 ) : (
//                   <div className="space-y-6">
//                     {asset.subServices.map((subService, index) => (
//                       <div
//                         key={index}
//                         className="border border-gray-200 rounded-xl p-6 bg-gray-50"
//                       >
//                         <div className="flex items-center justify-between mb-4">
//                           <h4 className="text-lg font-semibold text-gray-900">
//                             Sub-Service {index + 1}
//                           </h4>
//                           <button
//                             type="button"
//                             onClick={() => removeSubService(index)}
//                             className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div>

//                         <div className="mb-4">
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Select Sub-Service *
//                           </label>
//                           <select
//                             value={subService.subServiceId}
//                             onChange={(e) =>
//                               updateSubService(
//                                 index,
//                                 "subServiceId",
//                                 e.target.value
//                               )
//                             }
//                             disabled={!asset.contractId}
//                             className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
//                               errors[`subService_${index}`]
//                                 ? "border-red-500 bg-red-50"
//                                 : "border-gray-200 hover:border-gray-300"
//                             } ${
//                               !asset.contractId
//                                 ? "bg-gray-100 cursor-not-allowed"
//                                 : ""
//                             }`}
//                           >
//                             <option value="">Select Sub-Service</option>
//                             {contractSubServices.map((contractSubService) => (
//                               <option
//                                 key={contractSubService.subServiceId}
//                                 value={contractSubService.subServiceId}
//                               >
//                                 {contractSubService.subServiceName}
//                               </option>
//                             ))}
//                           </select>
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-3">
//                             Contract-Defined Service Scopes *
//                           </label>
//                           {contractServiceScopes[subService.subServiceId]
//                             ?.length > 0 ? (
//                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//                               {contractServiceScopes[
//                                 subService.subServiceId
//                               ].map((scope) => (
//                                 <div
//                                   key={scope.scopeId}
//                                   className={`p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
//                                     subService.serviceScopeIds.includes(
//                                       scope.scopeId
//                                     )
//                                       ? "border-purple-500 bg-purple-50 shadow-md"
//                                       : "border-gray-200 hover:border-gray-300"
//                                   }`}
//                                   onClick={() =>
//                                     toggleServiceScope(index, scope.scopeId)
//                                   }
//                                 >
//                                   <div className="flex items-center">
//                                     <div
//                                       className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
//                                         subService.serviceScopeIds.includes(
//                                           scope.scopeId
//                                         )
//                                           ? "border-purple-500 bg-purple-500"
//                                           : "border-gray-300"
//                                       }`}
//                                     >
//                                       {subService.serviceScopeIds.includes(
//                                         scope.scopeId
//                                       ) && (
//                                         <CheckCircle className="w-3 h-3 text-white" />
//                                       )}
//                                     </div>
//                                     <span className="text-sm font-medium text-gray-700">
//                                       {scope.scopeName}
//                                     </span>
//                                   </div>
//                                 </div>
//                               ))}
//                             </div>
//                           ) : (
//                             <div className="text-center py-6 text-gray-500 border-2 border-dashed border-gray-300 rounded-xl">
//                               {!subService.subServiceId
//                                 ? "Please select a sub-service first"
//                                 : "No service scopes available for selected sub-service"}
//                             </div>
//                           )}
//                           {subService.serviceScopeIds.length > 0 && (
//                             <p className="text-purple-600 text-sm mt-2">
//                               {subService.serviceScopeIds.length} service
//                               scope(s) selected
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//               <div className="flex items-center mb-6">
//                 <div className="p-3 bg-indigo-100 rounded-xl mr-4">
//                   <Clock className="w-6 h-6 text-indigo-600" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900">
//                     Lifecycle Information
//                     <span className="ml-3 text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
//                       Optional Data
//                     </span>
//                   </h2>
//                   <p className="text-gray-600">
//                     Track important dates and milestones (optional)
//                   </p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <div className="space-y-6">
//                   <div className="space-y-2">
//                     <label
//                       htmlFor="purchaseDate"
//                       className="block text-sm font-semibold text-gray-700 flex items-center"
//                     >
//                       <Calendar className="w-4 h-4 mr-1 text-gray-500" />
//                       Purchase Date
//                     </label>
//                     <input
//                       id="purchaseDate"
//                       type="date"
//                       name="purchaseDate"
//                       value={asset.purchaseDate}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label
//                       htmlFor="installationDate"
//                       className="block text-sm font-semibold text-gray-700 flex items-center"
//                     >
//                       <Calendar className="w-4 h-4 mr-1 text-gray-500" />
//                       Installation Date
//                     </label>
//                     <input
//                       id="installationDate"
//                       type="date"
//                       name="installationDate"
//                       value={asset.installationDate}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-6">
//                   <div className="space-y-2">
//                     <label
//                       htmlFor="warrantyPeriodDays"
//                       className="block text-sm font-semibold text-gray-700"
//                     >
//                       Warranty Period (Days)
//                     </label>
//                     <input
//                       id="warrantyPeriodDays"
//                       type="number"
//                       name="warrantyPeriodDays"
//                       value={asset.warrantyPeriodDays}
//                       onChange={handleChange}
//                       min="0"
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
//                       placeholder="Enter warranty period in days"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label
//                       htmlFor="lastAuditDate"
//                       className="block text-sm font-semibold text-gray-700 flex items-center"
//                     >
//                       <Calendar className="w-4 h-4 mr-1 text-gray-500" />
//                       Last Audit Date
//                     </label>
//                     <input
//                       id="lastAuditDate"
//                       type="date"
//                       name="lastAuditDate"
//                       value={asset.lastAuditDate}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//               <div className="flex items-center mb-6">
//                 <div className="p-3 bg-emerald-100 rounded-xl mr-4">
//                   <DollarSign className="w-6 h-6 text-emerald-600" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900">
//                     Financial Information
//                     <span className="ml-3 text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
//                       Optional Data
//                     </span>
//                   </h2>
//                   <p className="text-gray-600">
//                     Manage cost and depreciation details (optional)
//                   </p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <div className="space-y-6">
//                   <div className="space-y-2">
//                     <label
//                       htmlFor="purchaseCost"
//                       className="block text-sm font-semibold text-gray-700 flex items-center"
//                     >
//                       <DollarSign className="w-4 h-4 mr-1 text-gray-500" />
//                       Purchase Cost (USD)
//                     </label>
//                     <div className="relative">
//                       <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
//                         $
//                       </span>
//                       <input
//                         id="purchaseCost"
//                         type="number"
//                         name="purchaseCost"
//                         value={asset.purchaseCost}
//                         onChange={handleChange}
//                         step="100"
//                         min="0"
//                         className={`w-full pl-8 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                           errors.purchaseCost
//                             ? "border-red-500 bg-red-50"
//                             : "border-gray-200 hover:border-gray-300"
//                         }`}
//                         placeholder="5000.00"
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <label
//                       htmlFor="depreciationType"
//                       className="block text-sm font-semibold text-gray-700 flex items-center"
//                     >
//                       <TrendingDown className="w-4 h-4 mr-1 text-gray-500" />
//                       Depreciation Type
//                     </label>
//                     <select
//                       id="depreciationType"
//                       name="depreciationType"
//                       value={asset.depreciationType}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
//                     >
//                       <option value="PERCENTAGE">Percentage</option>
//                       <option value="NUMBER">Fixed Amount</option>
//                     </select>
//                   </div>

//                   <div className="space-y-2">
//                     <label
//                       htmlFor="depreciationValue"
//                       className="block text-sm font-semibold text-gray-700 flex items-center"
//                     >
//                       <TrendingDown className="w-4 h-4 mr-1 text-gray-500" />
//                       Depreciation Value
//                     </label>
//                     <div className="relative">
//                       <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
//                         {asset.depreciationType === "PERCENTAGE" ? "%" : "$"}
//                       </span>
//                       <input
//                         id="depreciationValue"
//                         type="number"
//                         name="depreciationValue"
//                         value={asset.depreciationValue}
//                         onChange={handleChange}
//                         step={
//                           asset.depreciationType === "PERCENTAGE" ? "1" : "100"
//                         }
//                         min="0"
//                         max={
//                           asset.depreciationType === "PERCENTAGE"
//                             ? "100"
//                             : undefined
//                         }
//                         className={`w-full pl-8 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                           errors.depreciationValue
//                             ? "border-red-500 bg-red-50"
//                             : "border-gray-200 hover:border-gray-300"
//                         }`}
//                         placeholder={
//                           asset.depreciationType === "PERCENTAGE" ? "10" : "500"
//                         }
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="space-y-6">
//                   <div className="space-y-2">
//                     <label
//                       htmlFor="timeFrameYears"
//                       className="block text-sm font-semibold text-gray-700 flex items-center"
//                     >
//                       <Clock className="w-4 h-4 mr-1 text-gray-500" />
//                       Time Frame (Years)
//                     </label>
//                     <input
//                       id="timeFrameYears"
//                       type="number"
//                       name="timeFrameYears"
//                       value={asset.timeFrameYears}
//                       onChange={handleChange}
//                       step="1"
//                       min="1"
//                       max="50"
//                       className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                         errors.timeFrameYears
//                           ? "border-red-500 bg-red-50"
//                           : "border-gray-200 hover:border-gray-300"
//                       }`}
//                       placeholder="5"
//                     />
//                   </div>

//                   <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
//                     <label className="block text-sm font-semibold text-gray-700 flex items-center mb-2">
//                       <DollarSign className="w-4 h-4 mr-1 text-green-600" />
//                       Estimated Current Value
//                     </label>
//                     <p className="text-3xl font-bold text-green-600">
//                       {calculateDepreciatedValue() === "-"
//                         ? "-"
//                         : `$${calculateDepreciatedValue()}`}
//                     </p>
//                     <p className="text-sm text-gray-600 mt-1">
//                       Based on depreciation calculation
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//               <div className="flex items-center mb-6">
//                 <div className="p-3 bg-pink-100 rounded-xl mr-4">
//                   <ImageIcon className="w-6 h-6 text-pink-600" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900">
//                     Asset Images
//                   </h2>
//                   <p className="text-gray-600">
//                     Upload visual documentation of the asset
//                   </p>
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
//                   <div className="flex">
//                     <ImageIcon className="h-5 w-5 text-blue-400" />
//                     <div className="ml-3">
//                       <p className="text-sm text-blue-700 font-medium">
//                         Image Upload Requirements:
//                       </p>
//                       <ul className="list-disc pl-5 mt-1 text-sm text-blue-700">
//                         <li>Maximum 3 images allowed</li>
//                         <li>Formats: JPEG, PNG, GIF, WebP</li>
//                         <li>
//                           Maximum file size: {MAX_IMAGE_SIZE_MB}MB per image
//                         </li>
//                         <li>At least one image is required</li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>

//                 <div
//                   className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
//                     errors.images
//                       ? "border-red-500 bg-red-50"
//                       : "border-gray-300 hover:border-gray-400"
//                   }`}
//                 >
//                   <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                   <p className="text-gray-600 mb-2 text-lg">
//                     Click to upload or drag and drop asset images
//                   </p>
//                   <p className="text-sm text-gray-500 mb-4">
//                     {imagePreview.length}/{MAX_IMAGES} images uploaded (Maximum{" "}
//                     {MAX_IMAGES} images allowed)
//                   </p>
//                   <input
//                     type="file"
//                     multiple
//                     accept="image/jpeg,image/png,image/gif,image/webp"
//                     onChange={handleImageChange}
//                     className="hidden"
//                     id="image-upload"
//                     disabled={imagePreview.length >= MAX_IMAGES}
//                   />
//                   <label
//                     htmlFor="image-upload"
//                     className={`inline-flex items-center px-6 py-3 rounded-xl cursor-pointer transition-all ${
//                       imagePreview.length >= MAX_IMAGES
//                         ? "bg-gray-400 text-gray-200 cursor-not-allowed"
//                         : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl"
//                     }`}
//                   >
//                     <Upload className="w-5 h-5 mr-2" />
//                     {imagePreview.length >= MAX_IMAGES
//                       ? "Maximum Images Reached"
//                       : "Choose Images"}
//                   </label>
//                 </div>

//                 {imagePreview.length > 0 && (
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     {imagePreview.map((preview, index) => (
//                       <div key={index} className="relative group">
//                         <img
//                           src={preview || "/placeholder.svg"}
//                           alt={`Preview ${index + 1}`}
//                           className="w-full h-48 object-cover rounded-xl border-2 border-gray-200 group-hover:border-gray-300 transition-all"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => removeImage(index)}
//                           className="absolute top-3 right-3 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-lg transition-all opacity-0 group-hover:opacity-100"
//                         >
//                           <X className="w-4 h-4" />
//                         </button>
//                         <div className="absolute bottom-3 left-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
//                           Image {index + 1}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//               <div className="flex justify-between items-center">
//                 <button
//                   type="button"
//                   onClick={() => navigate("/assets/list")}
//                   className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all"
//                 >
//                   <ArrowLeft className="w-5 h-5 mr-2" />
//                   Cancel
//                 </button>
//                 <div className="flex items-center space-x-4">
//                   <button
//                     type="submit"
//                     disabled={submitting}
//                     className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
//                   >
//                     {submitting ? (
//                       <>
//                         <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                         {isEdit ? "Updating..." : "Creating..."}
//                       </>
//                     ) : (
//                       <>
//                         <Save className="w-5 h-5 mr-2" />
//                         {isEdit ? "Update Asset" : "Create Asset"}
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AssetForm;

// "use client";
// import { useState, useEffect, useCallback, useRef } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   Save,
//   X,
//   Upload,
//   Calendar,
//   Clock,
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
//   AlertTriangle,
//   ImageIcon,
//   DollarSign,
//   TrendingDown,
//   ArrowLeft,
//   CheckCircle,
//   Plus,
//   Trash2,
//   Search,
// } from "lucide-react";
// import { assetService } from "../services/assetService";
// import { assetCategoryService } from "../services/assetCategoryService";
// import { contractService } from "../services/contractService";
// import { companyService } from "../services/companyService";
// import { serviceManagementService } from "../services/serviceManagementService";
// import { propertyFlowService } from "../services/propertyFlowService";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import DraftModal from "./DraftModal";

// const AssetForm = ({ isEdit = false }) => {
//   const navigate = useNavigate();
//   const { assetId } = useParams();
//   const { user } = useContext(AuthContext);
//   const updateTimeoutRef = useRef(null);
//   const [loading, setLoading] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [draftSaved, setDraftSaved] = useState(false);
//   const [showDraftModal, setShowDraftModal] = useState(false);
//   const [pendingDraft, setPendingDraft] = useState(null);

//   const [asset, setAsset] = useState({
//     assetName: "",
//     serialNumber: "",
//     brandName: "",
//     modelNumber: "",
//     assetStatus: "ACTIVE",
//     assetCondition: "GOOD",
//     observation: "",
//     recommendation: "",
//     purchaseCost: "",
//     depreciationValue: "",
//     depreciationType: "PERCENTAGE",
//     timeFrameYears: "",
//     companyId: "",
//     contractId: "",
//     categoryId: "",
//     zoneId: "",
//     subZoneId: "",
//     buildingId: "",
//     villaApartmentId: "",
//     floorId: "",
//     roomId: "",
//     subServices: [],
//     purchaseDate: "",
//     installationDate: "",
//     warrantyPeriodDays: "",
//     ownerType: "KANVEL",
//     lastAuditDate: "",
//     images: [],
//     imagesToRemove: [],
//   });

//   const [imageFiles, setImageFiles] = useState([]);
//   const [imagePreview, setImagePreview] = useState([]);
//   const [existingImageUrls, setExistingImageUrls] = useState([]);
//   const [errors, setErrors] = useState({});

//   // Dropdown data
//   const [companies, setCompanies] = useState([]);
//   const [contracts, setContracts] = useState([]);
//   const [assetCategories, setAssetCategories] = useState([]);
//   const [categorySearchTerm, setCategorySearchTerm] = useState("");
//   const [filteredCategories, setFilteredCategories] = useState([]);
//   const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
//   const [zones, setZones] = useState([]);
//   const [subZones, setSubZones] = useState([]);
//   const [buildings, setBuildings] = useState([]);
//   const [villaApartments, setVillaApartments] = useState([]);
//   const [floors, setFloors] = useState([]);
//   const [rooms, setRooms] = useState([]);
//   const [services, setServices] = useState([]);
//   const [contractSubServices, setContractSubServices] = useState([]);
//   const [contractServiceScopes, setContractServiceScopes] = useState({});

//   const MAX_IMAGES = 3;
//   const MAX_IMAGE_SIZE_MB = 1;
//   const ALLOWED_IMAGE_TYPES = [
//     "image/jpeg",
//     "image/png",
//     "image/gif",
//     "image/webp",
//   ];

//   // Draft functionality
//   const DRAFT_KEY = `asset_draft_${isEdit ? assetId : "new"}`;

//   useEffect(() => {
//     if (categorySearchTerm.trim()) {
//       const filtered = assetCategories.filter((category) =>
//         category.categoryName
//           .toLowerCase()
//           .includes(categorySearchTerm.toLowerCase())
//       );
//       setFilteredCategories(filtered);
//     } else {
//       setFilteredCategories(assetCategories);
//     }
//   }, [categorySearchTerm, assetCategories]);

//   const saveDraft = useCallback(() => {
//     try {
//       const draftData = {
//         asset,
//         timestamp: new Date().toISOString(),
//         companies,
//         contracts,
//         assetCategories,
//         zones,
//         subZones,
//         buildings,
//         villaApartments,
//         floors,
//         rooms,
//         contractSubServices,
//         contractServiceScopes,
//       };
//       localStorage.setItem(DRAFT_KEY, JSON.stringify(draftData));
//       setDraftSaved(true);
//       setTimeout(() => setDraftSaved(false), 3000);
//     } catch (error) {
//       console.error("Failed to save draft:", error);
//     }
//   }, [
//     asset,
//     companies,
//     contracts,
//     assetCategories,
//     zones,
//     subZones,
//     buildings,
//     villaApartments,
//     floors,
//     rooms,
//     contractSubServices,
//     contractServiceScopes,
//     DRAFT_KEY,
//   ]);

//   const loadDraft = useCallback(() => {
//     try {
//       const savedDraft = localStorage.getItem(DRAFT_KEY);
//       if (savedDraft) {
//         const draftData = JSON.parse(savedDraft);
//         return draftData;
//       }
//     } catch (error) {
//       console.error("Failed to load draft:", error);
//     }
//     return null;
//   }, [DRAFT_KEY]);

//   const clearDraft = useCallback(() => {
//     try {
//       localStorage.removeItem(DRAFT_KEY);
//     } catch (error) {
//       console.error("Failed to clear draft:", error);
//     }
//   }, [DRAFT_KEY]);

//   useEffect(() => {
//     if (!isEdit) {
//       const draft = loadDraft();
//       if (draft && draft.asset) {
//         setPendingDraft(draft);
//         setShowDraftModal(true);
//       }
//     }
//   }, [loadDraft, isEdit]);

//   const handleLoadDraft = () => {
//     if (pendingDraft) {
//       setAsset(pendingDraft.asset);
//       if (pendingDraft.companies) setCompanies(pendingDraft.companies);
//       if (pendingDraft.contracts) setContracts(pendingDraft.contracts);
//       if (pendingDraft.assetCategories)
//         setAssetCategories(pendingDraft.assetCategories);
//       if (pendingDraft.zones) setZones(pendingDraft.zones);
//       if (pendingDraft.subZones) setSubZones(pendingDraft.subZones);
//       if (pendingDraft.buildings) setBuildings(pendingDraft.buildings);
//       if (pendingDraft.villaApartments)
//         setVillaApartments(pendingDraft.villaApartments);
//       if (pendingDraft.floors) setFloors(pendingDraft.floors);
//       if (pendingDraft.rooms) setRooms(pendingDraft.rooms);
//       if (pendingDraft.contractSubServices)
//         setContractSubServices(pendingDraft.contractSubServices);
//       if (pendingDraft.contractServiceScopes)
//         setContractServiceScopes(pendingDraft.contractServiceScopes);
//     }
//     setShowDraftModal(false);
//     setPendingDraft(null);
//   };

//   const handleCloseDraftModal = () => {
//     setShowDraftModal(false);
//     setPendingDraft(null);
//   };

//   useEffect(() => {
//     if (!isEdit) {
//       if (updateTimeoutRef.current) {
//         clearTimeout(updateTimeoutRef.current);
//       }
//       updateTimeoutRef.current = setTimeout(() => {
//         if (asset.assetName || asset.companyId || asset.contractId) {
//           saveDraft();
//         }
//       }, 2000);
//       return () => {
//         if (updateTimeoutRef.current) {
//           clearTimeout(updateTimeoutRef.current);
//         }
//       };
//     }
//   }, [asset, saveDraft, isEdit]);

//   useEffect(() => {
//     const loadInitialData = async () => {
//       setLoading(true);
//       try {
//         const [
//           companiesResponse,
//           contractsResponse,
//           servicesResponse,
//           categoriesResponse,
//         ] = await Promise.all([
//           companyService.getAllCompanies(),
//           contractService.getAllContracts(),
//           serviceManagementService.getServices(),
//           assetCategoryService.getAllCategories(),
//         ]);

//         setCompanies(companiesResponse.data || []);
//         setContracts(contractsResponse.data || []);
//         setServices(servicesResponse.data || []);
//         setAssetCategories(categoriesResponse.data || []);

//         if (isEdit && assetId) {
//           const assetResponse = await assetService.getAssetById(assetId);
//           const assetData = assetResponse.data;

//           const transformedSubServices =
//             assetData.subServices?.map((subService) => ({
//               subServiceId: subService.subServiceId,
//               serviceScopeIds: subService.serviceScopeIds || [],
//             })) || [];

//           setAsset({
//             ...assetData,
//             companyId: assetData.companyId.toString(),
//             contractId: assetData.contractId.toString(),
//             categoryId: assetData.categoryId?.toString() || "",
//             zoneId: assetData.zoneId.toString(),
//             subZoneId: assetData.subZoneId.toString(),
//             buildingId: assetData.buildingId.toString(),
//             villaApartmentId: assetData.villaApartmentId.toString(),
//             floorId: assetData.floorId.toString(),
//             roomId: assetData.roomId.toString(),
//             subServices: transformedSubServices,
//             purchaseCost: assetData.purchaseCost?.toString() || "",
//             depreciationValue: assetData.depreciationValue?.toString() || "",
//             timeFrameYears: assetData.timeFrameYears?.toString() || "",
//             warrantyPeriodDays: assetData.warrantyPeriodDays?.toString() || "",
//             imagesToRemove: [],
//           });

//           if (assetData.imageUrls && assetData.imageUrls.length > 0) {
//             setExistingImageUrls(assetData.imageUrls);
//             setImagePreview(assetData.imageUrls);
//           }

//           await Promise.all([
//             loadZones(assetData.contractId),
//             loadContractSubServices(assetData.contractId),
//           ]);

//           await Promise.all([
//             loadSubZones(assetData.contractId, assetData.zoneId),
//           ]);

//           await loadBuildings(assetData.contractId, assetData.subZoneId);
//           await loadVillaApartments(assetData.contractId, assetData.buildingId);
//           await loadFloors(assetData.contractId, assetData.villaApartmentId);
//           await loadRooms(assetData.contractId, assetData.floorId);

//           for (const subService of transformedSubServices) {
//             await loadServiceScopes(
//               assetData.contractId,
//               subService.subServiceId
//             );
//           }
//         }
//       } catch (error) {
//         console.error("Error loading initial data:", error);
//         toast.error("Failed to load form data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadInitialData();
//   }, [isEdit, assetId]);

//   const handleCategorySearch = (e) => {
//     setCategorySearchTerm(e.target.value);
//     setShowCategoryDropdown(true);
//   };

//   const handleCategorySelect = (category) => {
//     setAsset((prev) => ({
//       ...prev,
//       categoryId: category.categoryId.toString(),
//     }));
//     setCategorySearchTerm(category.categoryName);
//     setShowCategoryDropdown(false);
//     if (errors.categoryId) {
//       setErrors((prev) => ({ ...prev, categoryId: null }));
//     }
//   };

//   const getSelectedCategoryName = () => {
//     if (asset.categoryId) {
//       const category = assetCategories.find(
//         (c) => c.categoryId.toString() === asset.categoryId
//       );
//       return category ? category.categoryName : "";
//     }
//     return "";
//   };

//   const loadZones = async (contractId) => {
//     if (!contractId) return;
//     try {
//       const response = await propertyFlowService.getAllZonesByContract(
//         contractId
//       );
//       setZones(response.data || []);
//     } catch (error) {
//       console.error("Error loading zones:", error);
//       toast.error("Failed to load zones");
//     }
//   };

//   const loadSubZones = async (contractId, zoneId) => {
//     if (!contractId || !zoneId) return;
//     try {
//       const response = await propertyFlowService.getAllSubZonesByContract(
//         contractId
//       );
//       setSubZones(
//         (response.data || []).filter(
//           (sz) => sz.zoneId.toString() === zoneId.toString()
//         )
//       );
//     } catch (error) {
//       console.error("Error loading sub zones:", error);
//       toast.error("Failed to load sub zones");
//     }
//   };

//   const loadBuildings = async (contractId, subZoneId) => {
//     if (!contractId || !subZoneId) return;
//     try {
//       const response = await propertyFlowService.getAllBuildingsByContract(
//         contractId
//       );
//       setBuildings(
//         (response.data || []).filter(
//           (b) => b.subZoneId.toString() === subZoneId.toString()
//         )
//       );
//     } catch (error) {
//       console.error("Error loading buildings:", error);
//       toast.error("Failed to load buildings");
//     }
//   };

//   const loadVillaApartments = async (contractId, buildingId) => {
//     if (!contractId || !buildingId) return;
//     try {
//       const response =
//         await propertyFlowService.getAllVillaApartmentsByContract(contractId);
//       setVillaApartments(
//         (response.data || []).filter(
//           (va) => va.buildingId.toString() === buildingId.toString()
//         )
//       );
//     } catch (error) {
//       console.error("Error loading villa apartments:", error);
//       toast.error("Failed to load villa apartments");
//     }
//   };

//   const loadFloors = async (contractId, villaApartmentId) => {
//     if (!contractId || !villaApartmentId) return;
//     try {
//       const response = await propertyFlowService.getAllFloorsByContract(
//         contractId
//       );
//       setFloors(
//         (response.data || []).filter(
//           (f) => f.villaApartmentId.toString() === villaApartmentId.toString()
//         )
//       );
//     } catch (error) {
//       console.error("Error loading floors:", error);
//       toast.error("Failed to load floors");
//     }
//   };

//   const loadRooms = async (contractId, floorId) => {
//     if (!contractId || !floorId) return;
//     try {
//       const response = await propertyFlowService.getAllRoomsByContract(
//         contractId
//       );
//       setRooms(
//         (response.data || []).filter(
//           (r) => r.floorId.toString() === floorId.toString()
//         )
//       );
//     } catch (error) {
//       console.error("Error loading rooms:", error);
//       toast.error("Failed to load rooms");
//     }
//   };

//   const loadContractSubServices = async (contractId) => {
//     if (!contractId) {
//       setContractSubServices([]);
//       return;
//     }
//     try {
//       const response = await assetService.getSubServicesByContract(contractId);
//       setContractSubServices(response.data || []);
//     } catch (error) {
//       console.error("Error loading contract sub services:", error);
//       setContractSubServices([]);
//       toast.error("Failed to load contract sub-services");
//     }
//   };

//   const loadServiceScopes = async (contractId, subServiceId) => {
//     if (!contractId || !subServiceId) return;
//     try {
//       const response =
//         await assetService.getServiceScopesByContractAndSubService(
//           contractId,
//           subServiceId
//         );
//       setContractServiceScopes((prev) => ({
//         ...prev,
//         [subServiceId]: response.data || [],
//       }));
//     } catch (error) {
//       console.error("Error loading service scopes:", error);
//       toast.error("Failed to load service scopes");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAsset((prev) => ({ ...prev, [name]: value }));

//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: null }));
//     }

//     if (name === "contractId") {
//       loadZones(value);
//       loadContractSubServices(value);
//       setAsset((prev) => ({
//         ...prev,
//         zoneId: "",
//         subZoneId: "",
//         buildingId: "",
//         villaApartmentId: "",
//         floorId: "",
//         roomId: "",
//         subServices: [],
//       }));
//       setContractServiceScopes({});
//     } else if (name === "zoneId") {
//       loadSubZones(asset.contractId, value);
//       setAsset((prev) => ({
//         ...prev,
//         subZoneId: "",
//         buildingId: "",
//         villaApartmentId: "",
//         floorId: "",
//         roomId: "",
//       }));
//     } else if (name === "subZoneId") {
//       loadBuildings(asset.contractId, value);
//       setAsset((prev) => ({
//         ...prev,
//         buildingId: "",
//         villaApartmentId: "",
//         floorId: "",
//         roomId: "",
//       }));
//     } else if (name === "buildingId") {
//       loadVillaApartments(asset.contractId, value);
//       setAsset((prev) => ({
//         ...prev,
//         villaApartmentId: "",
//         floorId: "",
//         roomId: "",
//       }));
//     } else if (name === "villaApartmentId") {
//       loadFloors(asset.contractId, value);
//       setAsset((prev) => ({ ...prev, floorId: "", roomId: "" }));
//     } else if (name === "floorId") {
//       loadRooms(asset.contractId, value);
//       setAsset((prev) => ({ ...prev, roomId: "" }));
//     }
//   };

//   const addSubService = () => {
//     setAsset((prev) => ({
//       ...prev,
//       subServices: [
//         ...prev.subServices,
//         { subServiceId: "", serviceScopeIds: [] },
//       ],
//     }));
//   };

//   const removeSubService = (index) => {
//     setAsset((prev) => ({
//       ...prev,
//       subServices: prev.subServices.filter((_, i) => i !== index),
//     }));
//   };

//   const updateSubService = (index, field, value) => {
//     setAsset((prev) => ({
//       ...prev,
//       subServices: prev.subServices.map((subService, i) => {
//         if (i === index) {
//           if (field === "subServiceId") {
//             loadServiceScopes(asset.contractId, value);
//             return { ...subService, [field]: value, serviceScopeIds: [] };
//           }
//           return { ...subService, [field]: value };
//         }
//         return subService;
//       }),
//     }));
//   };

//   const toggleServiceScope = (subServiceIndex, scopeId) => {
//     setAsset((prev) => ({
//       ...prev,
//       subServices: prev.subServices.map((subService, i) => {
//         if (i === subServiceIndex) {
//           const currentScopes = subService.serviceScopeIds;
//           const isSelected = currentScopes.includes(scopeId);
//           return {
//             ...subService,
//             serviceScopeIds: isSelected
//               ? currentScopes.filter((id) => id !== scopeId)
//               : [...currentScopes, scopeId],
//           };
//         }
//         return subService;
//       }),
//     }));
//   };

//   const validateImageFile = (file) => {
//     console.log(
//       `Validating file: ${file.name}, size: ${file.size}, type: ${file.type}`
//     );
//     const fileSizeMB = file.size / (1024 * 1024);

//     if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
//       toast.error(
//         `Image "${file.name}" has an unsupported format. Allowed formats: JPEG, PNG, GIF, WebP.`
//       );
//       return false;
//     }

//     if (fileSizeMB > MAX_IMAGE_SIZE_MB) {
//       toast.error(
//         `Image "${file.name}" exceeds ${MAX_IMAGE_SIZE_MB}MB limit. Please upload a smaller image.`
//       );
//       return false;
//     }

//     return true;
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     console.log(`Selected files: ${files.map((f) => f.name).join(", ")}`);

//     if (files.length === 0) {
//       console.log("No files selected");
//       return;
//     }

//     const totalCurrentImages = imageFiles.length + existingImageUrls.length;
//     const availableSlots = MAX_IMAGES - totalCurrentImages;

//     if (files.length > availableSlots) {
//       toast.error(
//         `You can only upload ${availableSlots} more image(s). Maximum ${MAX_IMAGES} images allowed.`
//       );
//       console.log(
//         `Too many files selected. Available slots: ${availableSlots}`
//       );
//       e.target.value = "";
//       return;
//     }

//     const validFiles = [];
//     const invalidFiles = [];

//     files.forEach((file) => {
//       if (validateImageFile(file)) {
//         validFiles.push(file);
//       } else {
//         invalidFiles.push(file);
//       }
//     });

//     if (validFiles.length > 0) {
//       console.log(`Valid files: ${validFiles.map((f) => f.name).join(", ")}`);
//       setImageFiles((prev) => [...prev, ...validFiles]);

//       const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
//       setImagePreview((prev) => [...prev, ...newPreviews]);

//       toast.success(`${validFiles.length} image(s) added successfully`);

//       if (errors.images) {
//         setErrors((prev) => ({ ...prev, images: null }));
//       }
//     }

//     if (invalidFiles.length > 0) {
//       console.log(
//         `Invalid files: ${invalidFiles.map((f) => f.name).join(", ")}`
//       );
//       e.target.value = "";
//       return;
//     }

//     e.target.value = "";
//   };

//   const removeImage = (index) => {
//     console.log(`Removing image at index: ${index}`);

//     if (isEdit) {
//       const totalPreviews = imagePreview.length;
//       const existingCount = existingImageUrls.length;

//       if (index < existingCount) {
//         const imageToRemove = existingImageUrls[index];
//         setAsset((prev) => ({
//           ...prev,
//           imagesToRemove: [...(prev.imagesToRemove || []), imageToRemove],
//         }));

//         const updatedExistingUrls = [...existingImageUrls];
//         updatedExistingUrls.splice(index, 1);
//         setExistingImageUrls(updatedExistingUrls);

//         setImagePreview((prev) => {
//           const updated = [...prev];
//           updated.splice(index, 1);
//           return updated;
//         });

//         toast.info(`Existing image ${index + 1} removed`);
//       } else {
//         const newImageIndex = index - existingCount;
//         setImageFiles((prev) => {
//           const updated = [...prev];
//           updated.splice(newImageIndex, 1);
//           return updated;
//         });

//         setImagePreview((prev) => {
//           const updated = [...prev];
//           updated.splice(index, 1);
//           return updated;
//         });

//         toast.info(`New image ${index + 1} removed`);
//       }
//     } else {
//       setImageFiles((prev) => prev.filter((_, i) => i !== index));
//       setImagePreview((prev) => prev.filter((_, i) => i !== index));
//       toast.info(`Image ${index + 1} removed`);
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!asset.assetName.trim()) {
//       newErrors.assetName = "Asset name is required";
//       toast.error("Asset name is required");
//     }

//     if (!user || !user.username) {
//       newErrors.username = "User information is required. Please log in again.";
//       toast.error("User information is required. Please log in again.");
//     }

//     if (!asset.companyId) {
//       newErrors.companyId = "Company is required";
//       toast.error("Company is required");
//     }

//     if (!asset.contractId) {
//       newErrors.contractId = "Contract is required";
//       toast.error("Contract is required");
//     }

//     if (!asset.categoryId) {
//       newErrors.categoryId = "Asset category is required";
//       toast.error("Asset category is required");
//     }

//     if (!asset.zoneId) {
//       newErrors.zoneId = "Zone is required";
//       toast.error("Zone is required");
//     }

//     if (!asset.subZoneId) {
//       newErrors.subZoneId = "Sub Zone is required";
//       toast.error("Sub Zone is required");
//     }

//     if (!asset.buildingId) {
//       newErrors.buildingId = "Building is required";
//       toast.error("Building is required");
//     }

//     if (!asset.villaApartmentId) {
//       newErrors.villaApartmentId = "Villa/Apartment is required";
//       toast.error("Villa/Apartment is required");
//     }

//     if (!asset.floorId) {
//       newErrors.floorId = "Floor is required";
//       toast.error("Floor is required");
//     }

//     if (!asset.roomId) {
//       newErrors.roomId = "Room is required";
//       toast.error("Room is required");
//     }

//     if (!asset.subServices || asset.subServices.length === 0) {
//       newErrors.subServices = "At least one sub-service must be specified";
//       toast.error("At least one sub-service must be specified");
//     } else {
//       asset.subServices.forEach((subService, index) => {
//         if (!subService.subServiceId) {
//           newErrors[`subService_${index}`] = `Sub-service ${
//             index + 1
//           }: Selection is required`;
//           toast.error(`Sub-service ${index + 1}: Selection is required`);
//         }
//         if (
//           !subService.serviceScopeIds ||
//           subService.serviceScopeIds.length === 0
//         ) {
//           newErrors[`serviceScopes_${index}`] = `Sub-service ${
//             index + 1
//           }: At least one service scope must be selected`;
//           toast.error(
//             `Sub-service ${
//               index + 1
//             }: At least one service scope must be selected`
//           );
//         }
//       });
//     }

//     if (asset.purchaseCost && isNaN(Number.parseFloat(asset.purchaseCost))) {
//       newErrors.purchaseCost = "Purchase cost must be a valid number";
//       toast.error("Purchase cost must be a valid number");
//     }

//     if (
//       asset.depreciationValue &&
//       isNaN(Number.parseFloat(asset.depreciationValue))
//     ) {
//       newErrors.depreciationValue = "Depreciation value must be a valid number";
//       toast.error("Depreciation value must be a valid number");
//     }

//     if (
//       asset.depreciationType === "PERCENTAGE" &&
//       asset.depreciationValue &&
//       (Number.parseFloat(asset.depreciationValue) < 0 ||
//         Number.parseFloat(asset.depreciationValue) > 100)
//     ) {
//       newErrors.depreciationValue =
//         "Depreciation percentage must be between 0 and 100";
//       toast.error("Depreciation percentage must be between 0 and 100");
//     }

//     if (
//       asset.timeFrameYears &&
//       (isNaN(Number.parseInt(asset.timeFrameYears)) ||
//         Number.parseInt(asset.timeFrameYears) < 1 ||
//         Number.parseInt(asset.timeFrameYears) > 50)
//     ) {
//       newErrors.timeFrameYears = "Time frame must be between 1 and 50 years";
//       toast.error("Time frame must be between 1 and 50 years");
//     }

//     if (!isEdit && imageFiles.length === 0) {
//       newErrors.images = "At least one image is required";
//       toast.error("At least one image is required");
//     } else if (
//       isEdit &&
//       imageFiles.length === 0 &&
//       existingImageUrls.length === 0
//     ) {
//       newErrors.images = "At least one image is required";
//       toast.error("At least one image is required");
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const calculateDepreciatedValue = () => {
//     if (
//       !asset.purchaseCost ||
//       !asset.depreciationValue ||
//       !asset.depreciationType ||
//       !asset.timeFrameYears
//     )
//       return "-";

//     const cost = Number.parseFloat(asset.purchaseCost);
//     const value = Number.parseFloat(asset.depreciationValue);
//     const years = Number.parseInt(asset.timeFrameYears);

//     if (asset.depreciationType === "NUMBER") {
//       const result = Math.max(cost - value * years, 0);
//       return result.toLocaleString(undefined, {
//         minimumFractionDigits: 2,
//         maximumFractionDigits: 2,
//       });
//     }

//     const annualDepreciation = cost * (value / 100);
//     const result = Math.max(cost - annualDepreciation * years, 0);
//     return result.toLocaleString(undefined, {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Submitting form...");

//     if (!validateForm()) {
//       console.log("Form validation failed");
//       return;
//     }

//     if (!user || !user.username) {
//       toast.error("User information is missing. Please log in again.");
//       console.log("User information missing");
//       return;
//     }

//     setSubmitting(true);
//     try {
//       const assetData = {
//         ...asset,
//         images: imageFiles,
//         appendImages: true,
//         imagesToRemove: asset.imagesToRemove || [],
//       };

//       if (isEdit) {
//         await assetService.updateAsset(assetId, assetData);
//         toast.success("Asset updated successfully");
//       } else {
//         await assetService.createAsset(assetData);
//         toast.success("Asset created successfully");
//         clearDraft();
//       }

//       navigate("/assets/list");
//     } catch (error) {
//       console.error("Error saving asset:", error);
//       toast.error(error.response?.data?.message || "Failed to save asset");
//     } finally {
//       setSubmitting(false);
//     }
//   };

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

//   return (
//     <>
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//       />
//       <DraftModal
//         isOpen={showDraftModal}
//         onClose={handleCloseDraftModal}
//         onLoad={handleLoadDraft}
//         draftData={pendingDraft}
//       />
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Header */}
//           <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-4">
//                 <button
//                   onClick={() => navigate("/assets/list")}
//                   className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
//                 >
//                   <ArrowLeft className="w-5 h-5 text-gray-600" />
//                 </button>
//                 <div>
//                   <h1 className="text-3xl font-bold text-gray-900">
//                     {isEdit ? "Edit Asset" : "Create New Asset"}
//                   </h1>
//                   <p className="text-gray-600 mt-1">
//                     {isEdit
//                       ? "Update asset information"
//                       : "Add a new asset to your inventory"}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-4">
//                 {draftSaved && (
//                   <div className="flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-lg animate-fade-in">
//                     <CheckCircle className="w-5 h-5 mr-2" />
//                     <span className="font-medium">Draft Saved</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {(!user || !user.username) && (
//             <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
//               <div className="flex">
//                 <AlertTriangle className="h-5 w-5 text-yellow-400" />
//                 <div className="ml-3">
//                   <p className="text-sm text-yellow-700">
//                     User information is missing. Please log out and log in again
//                     to fix this issue.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-8">
//             {/* 1. Organization Information */}
//             <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//               <div className="flex items-center mb-6">
//                 <div className="p-3 bg-blue-100 rounded-xl mr-4">
//                   <Building className="w-6 h-6 text-blue-600" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900">
//                     Organization Information
//                   </h2>
//                   <p className="text-gray-600">
//                     Select company and contract details
//                   </p>
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <div className="space-y-2">
//                   <label
//                     htmlFor="companyId"
//                     className="block text-sm font-semibold text-gray-700"
//                   >
//                     Company *
//                   </label>
//                   <select
//                     id="companyId"
//                     name="companyId"
//                     value={asset.companyId}
//                     onChange={handleChange}
//                     className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                       errors.companyId
//                         ? "border-red-500 bg-red-50"
//                         : "border-gray-200 hover:border-gray-300"
//                     }`}
//                   >
//                     <option value="">Select Company</option>
//                     {companies.map((company) => (
//                       <option
//                         key={company.companyId}
//                         value={company.companyId.toString()}
//                       >
//                         {company.companyName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="space-y-2">
//                   <label
//                     htmlFor="contractId"
//                     className="block text-sm font-semibold text-gray-700"
//                   >
//                     Contract *
//                   </label>
//                   <select
//                     id="contractId"
//                     name="contractId"
//                     value={asset.contractId}
//                     onChange={handleChange}
//                     className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                       errors.contractId
//                         ? "border-red-500 bg-red-50"
//                         : "border-gray-200 hover:border-gray-300"
//                     }`}
//                   >
//                     <option value="">Select Contract</option>
//                     {contracts.map((contract) => (
//                       <option
//                         key={contract.contractId}
//                         value={contract.contractId.toString()}
//                       >
//                         {contract.contractName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>

//             {/* 2. Location Information */}
//             <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//               <div className="flex items-center mb-6">
//                 <div className="p-3 bg-green-100 rounded-xl mr-4">
//                   <MapPin className="w-6 h-6 text-green-600" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900">
//                     Location Information
//                   </h2>
//                   <p className="text-gray-600">
//                     Specify the exact location of the asset
//                   </p>
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 <div className="space-y-2">
//                   <label
//                     htmlFor="zoneId"
//                     className="block text-sm font-semibold text-gray-700 flex items-center"
//                   >
//                     <MapPin className="w-4 h-4 mr-1 text-gray-500" />
//                     Zone *
//                   </label>
//                   <select
//                     id="zoneId"
//                     name="zoneId"
//                     value={asset.zoneId}
//                     onChange={handleChange}
//                     disabled={!asset.contractId}
//                     className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                       errors.zoneId
//                         ? "border-red-500 bg-red-50"
//                         : "border-gray-200 hover:border-gray-300"
//                     } ${
//                       !asset.contractId ? "bg-gray-100 cursor-not-allowed" : ""
//                     }`}
//                   >
//                     <option value="">Select Zone</option>
//                     {zones.map((zone) => (
//                       <option key={zone.zoneId} value={zone.zoneId.toString()}>
//                         {zone.zoneName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="space-y-2">
//                   <label
//                     htmlFor="subZoneId"
//                     className="block text-sm font-semibold text-gray-700 flex items-center"
//                   >
//                     <Layers className="w-4 h-4 mr-1 text-gray-500" />
//                     Sub Zone *
//                   </label>
//                   <select
//                     id="subZoneId"
//                     name="subZoneId"
//                     value={asset.subZoneId}
//                     onChange={handleChange}
//                     disabled={!asset.zoneId}
//                     className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                       errors.subZoneId
//                         ? "border-red-500 bg-red-50"
//                         : "border-gray-200 hover:border-gray-300"
//                     } ${!asset.zoneId ? "bg-gray-100 cursor-not-allowed" : ""}`}
//                   >
//                     <option value="">Select Sub Zone</option>
//                     {subZones.map((subZone) => (
//                       <option
//                         key={subZone.subZoneId}
//                         value={subZone.subZoneId.toString()}
//                       >
//                         {subZone.subZoneName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="space-y-2">
//                   <label
//                     htmlFor="buildingId"
//                     className="block text-sm font-semibold text-gray-700 flex items-center"
//                   >
//                     <Building className="w-4 h-4 mr-1 text-gray-500" />
//                     Building *
//                   </label>
//                   <select
//                     id="buildingId"
//                     name="buildingId"
//                     value={asset.buildingId}
//                     onChange={handleChange}
//                     disabled={!asset.subZoneId}
//                     className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                       errors.buildingId
//                         ? "border-red-500 bg-red-50"
//                         : "border-gray-200 hover:border-gray-300"
//                     } ${
//                       !asset.subZoneId ? "bg-gray-100 cursor-not-allowed" : ""
//                     }`}
//                   >
//                     <option value="">Select Building</option>
//                     {buildings.map((building) => (
//                       <option
//                         key={building.buildingId}
//                         value={building.buildingId.toString()}
//                       >
//                         {building.buildingName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="space-y-2">
//                   <label
//                     htmlFor="villaApartmentId"
//                     className="block text-sm font-semibold text-gray-700 flex items-center"
//                   >
//                     <Home className="w-4 h-4 mr-1 text-gray-500" />
//                     Villa/Apartment *
//                   </label>
//                   <select
//                     id="villaApartmentId"
//                     name="villaApartmentId"
//                     value={asset.villaApartmentId}
//                     onChange={handleChange}
//                     disabled={!asset.buildingId}
//                     className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                       errors.villaApartmentId
//                         ? "border-red-500 bg-red-50"
//                         : "border-gray-200 hover:border-gray-300"
//                     } ${
//                       !asset.buildingId ? "bg-gray-100 cursor-not-allowed" : ""
//                     }`}
//                   >
//                     <option value="">Select Villa/Apartment</option>
//                     {villaApartments.map((va) => (
//                       <option
//                         key={va.villaApartmentId}
//                         value={va.villaApartmentId.toString()}
//                       >
//                         {va.villaApartmentName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="space-y-2">
//                   <label
//                     htmlFor="floorId"
//                     className="block text-sm font-semibold text-gray-700 flex items-center"
//                   >
//                     <Layers className="w-4 h-4 mr-1 text-gray-500" />
//                     Floor *
//                   </label>
//                   <select
//                     id="floorId"
//                     name="floorId"
//                     value={asset.floorId}
//                     onChange={handleChange}
//                     disabled={!asset.villaApartmentId}
//                     className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                       errors.floorId
//                         ? "border-red-500 bg-red-50"
//                         : "border-gray-200 hover:border-gray-300"
//                     } ${
//                       !asset.villaApartmentId
//                         ? "bg-gray-100 cursor-not-allowed"
//                         : ""
//                     }`}
//                   >
//                     <option value="">Select Floor</option>
//                     {floors.map((floor) => (
//                       <option
//                         key={floor.floorId}
//                         value={floor.floorId.toString()}
//                       >
//                         {floor.floorName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="space-y-2">
//                   <label
//                     htmlFor="roomId"
//                     className="block text-sm font-semibold text-gray-700 flex items-center"
//                   >
//                     <DoorOpen className="w-4 h-4 mr-1 text-gray-500" />
//                     Room *
//                   </label>
//                   <select
//                     id="roomId"
//                     name="roomId"
//                     value={asset.roomId}
//                     onChange={handleChange}
//                     disabled={!asset.floorId}
//                     className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                       errors.roomId
//                         ? "border-red-500 bg-red-50"
//                         : "border-gray-200 hover:border-gray-300"
//                     } ${
//                       !asset.floorId ? "bg-gray-100 cursor-not-allowed" : ""
//                     }`}
//                   >
//                     <option value="">Select Room</option>
//                     {rooms.map((room) => (
//                       <option key={room.roomId} value={room.roomId.toString()}>
//                         {room.roomName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//               <div className="flex items-center mb-6">
//                 <div className="p-3 bg-orange-100 rounded-xl mr-4">
//                   <Info className="w-6 h-6 text-orange-600" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900">
//                     Basic Asset Information
//                   </h2>
//                   <p className="text-gray-600">
//                     Enter fundamental asset details
//                   </p>
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <div className="space-y-6">
//                   <div className="space-y-2">
//                     <label
//                       htmlFor="assetName"
//                       className="block text-sm font-semibold text-gray-700 flex items-center"
//                     >
//                       <Tag className="w-4 h-4 mr-1 text-gray-500" />
//                       Asset Name *
//                     </label>
//                     <input
//                       id="assetName"
//                       type="text"
//                       name="assetName"
//                       value={asset.assetName}
//                       onChange={handleChange}
//                       className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                         errors.assetName
//                           ? "border-red-500 bg-red-50"
//                           : "border-gray-200 hover:border-gray-300"
//                       }`}
//                       placeholder="Enter asset name"
//                     />
//                   </div>

//                   {/* <div className="space-y-2 relative">
//                     <label
//                       htmlFor="categorySearch"
//                       className="block text-sm font-semibold text-gray-700 flex items-center"
//                     >
//                       <Tag className="w-4 h-4 mr-1 text-gray-500" />
//                       Asset Category *
//                     </label>
//                     <div className="relative">
//                       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                       <input
//                         id="categorySearch"
//                         type="text"
//                         value={categorySearchTerm || getSelectedCategoryName()}
//                         onChange={handleCategorySearch}
//                         onFocus={() => setShowCategoryDropdown(true)}
//                         className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                           errors.categoryId
//                             ? "border-red-500 bg-red-50"
//                             : "border-gray-200 hover:border-gray-300"
//                         }`}
//                         placeholder="Search asset category..."
//                       />
//                       {showCategoryDropdown && (
//                         <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//                           {filteredCategories.length > 0 ? (
//                             filteredCategories.map((category) => (
//                               <button
//                                 key={category.categoryId}
//                                 type="button"
//                                 onClick={() => handleCategorySelect(category)}
//                                 className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors"
//                               >
//                                 <div className="font-medium text-gray-900">
//                                   {category.categoryName}
//                                 </div>
//                                 {category.description && (
//                                   <div className="text-sm text-gray-500 truncate">
//                                     {category.description}
//                                   </div>
//                                 )}
//                               </button>
//                             ))
//                           ) : (
//                             <div className="px-4 py-3 text-gray-500 text-center">
//                               No categories found
//                             </div>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                     {errors.categoryId && (
//                       <p className="text-red-500 text-sm">
//                         {errors.categoryId}
//                       </p>
//                     )}
//                   </div> */}

//                   <div className="space-y-2 relative">
//                     <label
//                       htmlFor="categorySearch"
//                       className="block text-sm font-semibold text-gray-700 flex items-center"
//                     >
//                       <Tag className="w-4 h-4 mr-1 text-gray-500" />
//                       Asset Category *
//                     </label>
//                     <div className="relative">
//                       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                       <input
//                         id="categorySearch"
//                         type="text"
//                         value={categorySearchTerm || getSelectedCategoryName()}
//                         onChange={(e) => {
//                           setCategorySearchTerm(e.target.value);
//                           setShowCategoryDropdown(
//                             e.target.value.trim().length > 0
//                           ); // Show dropdown only if search term is not empty
//                         }}
//                         onFocus={() => {
//                           if (categorySearchTerm.trim().length > 0) {
//                             setShowCategoryDropdown(true); // Show dropdown on focus only if there's a search term
//                           }
//                         }}
//                         onBlur={() => {
//                           setTimeout(() => setShowCategoryDropdown(false), 200); // Delay hiding to allow click
//                         }}
//                         className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                           errors.categoryId
//                             ? "border-red-500 bg-red-50"
//                             : "border-gray-200 hover:border-gray-300"
//                         }`}
//                         placeholder="Search asset category..."
//                       />
//                       {showCategoryDropdown &&
//                         filteredCategories.length > 0 && (
//                           <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//                             {filteredCategories.map((category) => (
//                               <button
//                                 key={category.categoryId}
//                                 type="button"
//                                 onClick={() => {
//                                   handleCategorySelect(category);
//                                   setCategorySearchTerm(""); // Clear search term after selection
//                                 }}
//                                 className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors"
//                               >
//                                 <div className="font-medium text-gray-900">
//                                   {category.categoryName}
//                                 </div>
//                                 {category.description && (
//                                   <div className="text-sm text-gray-500 truncate">
//                                     {category.description}
//                                   </div>
//                                 )}
//                               </button>
//                             ))}
//                           </div>
//                         )}
//                       {showCategoryDropdown &&
//                         categorySearchTerm.trim().length > 0 &&
//                         filteredCategories.length === 0 && (
//                           <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-4 text-gray-500 text-center">
//                             No categories found
//                           </div>
//                         )}
//                     </div>
//                     {errors.categoryId && (
//                       <p className="text-red-500 text-sm">
//                         {errors.categoryId}
//                       </p>
//                     )}
//                   </div>

//                   <div className="space-y-2">
//                     <label
//                       htmlFor="serialNumber"
//                       className="block text-sm font-semibold text-gray-700 flex items-center"
//                     >
//                       <Barcode className="w-4 h-4 mr-1 text-gray-500" />
//                       Serial Number
//                     </label>
//                     <input
//                       id="serialNumber"
//                       type="text"
//                       name="serialNumber"
//                       value={asset.serialNumber}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
//                       placeholder="Enter serial number"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label
//                       htmlFor="brandName"
//                       className="block text-sm font-semibold text-gray-700 flex items-center"
//                     >
//                       <Box className="w-4 h-4 mr-1 text-gray-500" />
//                       Brand Name
//                     </label>
//                     <input
//                       id="brandName"
//                       type="text"
//                       name="brandName"
//                       value={asset.brandName}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
//                       placeholder="Enter brand name"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label
//                       htmlFor="modelNumber"
//                       className="block text-sm font-semibold text-gray-700 flex items-center"
//                     >
//                       <Cpu className="w-4 h-4 mr-1 text-gray-500" />
//                       Model Number
//                     </label>
//                     <input
//                       id="modelNumber"
//                       type="text"
//                       name="modelNumber"
//                       value={asset.modelNumber}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
//                       placeholder="Enter model number"
//                     />
//                   </div>
//                 </div>
//                 <div className="space-y-6">
//                   <div className="space-y-2">
//                     <label
//                       htmlFor="assetStatus"
//                       className="block text-sm font-semibold text-gray-700 flex items-center"
//                     >
//                       <AlertTriangle className="w-4 h-4 mr-1 text-gray-500" />
//                       Asset Status *
//                     </label>
//                     <select
//                       id="assetStatus"
//                       name="assetStatus"
//                       value={asset.assetStatus}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
//                     >
//                       <option value="ACTIVE">Active</option>
//                       <option value="UNDER_MAINTENANCE">
//                         Under Maintenance
//                       </option>
//                       <option value="DECOMMISSIONED">Decommissioned</option>
//                     </select>
//                   </div>
//                   <div className="space-y-2">
//                     <label
//                       htmlFor="assetCondition"
//                       className="block text-sm font-semibold text-gray-700 flex items-center"
//                     >
//                       <AlertTriangle className="w-4 h-4 mr-1 text-gray-500" />
//                       Asset Condition *
//                     </label>
//                     <select
//                       id="assetCondition"
//                       name="assetCondition"
//                       value={asset.assetCondition}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
//                     >
//                       <option value="EXCELLENT">Excellent</option>
//                       <option value="GOOD">Good</option>
//                       <option value="AVERAGE">Average</option>
//                       <option value="POOR">Poor</option>
//                     </select>
//                   </div>
//                   <div className="space-y-2">
//                     <label
//                       htmlFor="ownerType"
//                       className="block text-sm font-semibold text-gray-700 flex items-center"
//                     >
//                       <User className="w-4 h-4 mr-1 text-gray-500" />
//                       Owner Type
//                     </label>
//                     <select
//                       id="ownerType"
//                       name="ownerType"
//                       value={asset.ownerType}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
//                     >
//                       <option value="KANVEL">Kanvel</option>
//                       <option value="TENANT">Tenant</option>
//                       <option value="PROPERTY_OWNER">Property Owner</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
//                 <div className="space-y-2">
//                   <label
//                     htmlFor="observation"
//                     className="block text-sm font-semibold text-gray-700"
//                   >
//                     Observation
//                   </label>
//                   <textarea
//                     id="observation"
//                     name="observation"
//                     value={asset.observation}
//                     onChange={handleChange}
//                     rows={4}
//                     className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all resize-none"
//                     placeholder="Enter observations about the asset"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label
//                     htmlFor="recommendation"
//                     className="block text-sm font-semibold text-gray-700"
//                   >
//                     Recommendation
//                   </label>
//                   <textarea
//                     id="recommendation"
//                     name="recommendation"
//                     value={asset.recommendation}
//                     onChange={handleChange}
//                     rows={4}
//                     className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all resize-none"
//                     placeholder="Enter recommendations for the asset"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//               <div className="flex items-center mb-6">
//                 <div className="p-3 bg-purple-100 rounded-xl mr-4">
//                   <Wrench className="w-6 h-6 text-purple-600" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900">
//                     Service Information
//                   </h2>
//                   <p className="text-gray-600">
//                     Define service categories and scopes for multiple
//                     sub-services
//                   </p>
//                 </div>
//               </div>
//               <div className="space-y-6">
//                 <div className="flex items-center justify-between">
//                   <label className="block text-sm font-semibold text-gray-700">
//                     Contract-Defined Sub-Services *
//                   </label>
//                   <button
//                     type="button"
//                     onClick={addSubService}
//                     disabled={!asset.contractId}
//                     className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                   >
//                     <Plus className="w-4 h-4 mr-2" />
//                     Add Sub-Service
//                   </button>
//                 </div>
//                 {asset.subServices.length === 0 ? (
//                   <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-xl">
//                     <Wrench className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                     <p className="text-lg font-medium">No sub-services added</p>
//                     <p className="text-sm">
//                       {!asset.contractId
//                         ? "Please select a contract first"
//                         : "Click 'Add Sub-Service' to get started"}
//                     </p>
//                   </div>
//                 ) : (
//                   <div className="space-y-6">
//                     {asset.subServices.map((subService, index) => (
//                       <div
//                         key={index}
//                         className="border border-gray-200 rounded-xl p-6 bg-gray-50"
//                       >
//                         <div className="flex items-center justify-between mb-4">
//                           <h4 className="text-lg font-semibold text-gray-900">
//                             Sub-Service {index + 1}
//                           </h4>
//                           <button
//                             type="button"
//                             onClick={() => removeSubService(index)}
//                             className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                         <div className="mb-4">
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Select Sub-Service *
//                           </label>
//                           <select
//                             value={subService.subServiceId}
//                             onChange={(e) =>
//                               updateSubService(
//                                 index,
//                                 "subServiceId",
//                                 e.target.value
//                               )
//                             }
//                             disabled={!asset.contractId}
//                             className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
//                               errors[`subService_${index}`]
//                                 ? "border-red-500 bg-red-50"
//                                 : "border-gray-200 hover:border-gray-300"
//                             } ${
//                               !asset.contractId
//                                 ? "bg-gray-100 cursor-not-allowed"
//                                 : ""
//                             }`}
//                           >
//                             <option value="">Select Sub-Service</option>
//                             {contractSubServices.map((contractSubService) => (
//                               <option
//                                 key={contractSubService.subServiceId}
//                                 value={contractSubService.subServiceId}
//                               >
//                                 {contractSubService.subServiceName}
//                               </option>
//                             ))}
//                           </select>
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-3">
//                             Contract-Defined Service Scopes *
//                           </label>
//                           {contractServiceScopes[subService.subServiceId]
//                             ?.length > 0 ? (
//                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//                               {contractServiceScopes[
//                                 subService.subServiceId
//                               ].map((scope) => (
//                                 <div
//                                   key={scope.scopeId}
//                                   className={`p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
//                                     subService.serviceScopeIds.includes(
//                                       scope.scopeId
//                                     )
//                                       ? "border-purple-500 bg-purple-50 shadow-md"
//                                       : "border-gray-200 hover:border-gray-300"
//                                   }`}
//                                   onClick={() =>
//                                     toggleServiceScope(index, scope.scopeId)
//                                   }
//                                 >
//                                   <div className="flex items-center">
//                                     <div
//                                       className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
//                                         subService.serviceScopeIds.includes(
//                                           scope.scopeId
//                                         )
//                                           ? "border-purple-500 bg-purple-500"
//                                           : "border-gray-300"
//                                       }`}
//                                     >
//                                       {subService.serviceScopeIds.includes(
//                                         scope.scopeId
//                                       ) && (
//                                         <CheckCircle className="w-3 h-3 text-white" />
//                                       )}
//                                     </div>
//                                     <span className="text-sm font-medium text-gray-700">
//                                       {scope.scopeName}
//                                     </span>
//                                   </div>
//                                 </div>
//                               ))}
//                             </div>
//                           ) : (
//                             <div className="text-center py-6 text-gray-500 border-2 border-dashed border-gray-300 rounded-xl">
//                               {!subService.subServiceId
//                                 ? "Please select a sub-service first"
//                                 : "No service scopes available for selected sub-service"}
//                             </div>
//                           )}
//                           {subService.serviceScopeIds.length > 0 && (
//                             <p className="text-purple-600 text-sm mt-2">
//                               {subService.serviceScopeIds.length} service
//                               scope(s) selected
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//               <div className="flex items-center mb-6">
//                 <div className="p-3 bg-indigo-100 rounded-xl mr-4">
//                   <Clock className="w-6 h-6 text-indigo-600" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900">
//                     Lifecycle Information{" "}
//                     <span className="ml-3 text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
//                       Optional Data
//                     </span>
//                   </h2>
//                   <p className="text-gray-600">
//                     Track important dates and milestones (optional)
//                   </p>
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <div className="space-y-6">
//                   <div className="space-y-2">
//                     <label
//                       htmlFor="purchaseDate"
//                       className="block text-sm font-semibold text-gray-700 flex items-center"
//                     >
//                       <Calendar className="w-4 h-4 mr-1 text-gray-500" />
//                       Purchase Date
//                     </label>
//                     <input
//                       id="purchaseDate"
//                       type="date"
//                       name="purchaseDate"
//                       value={asset.purchaseDate}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label
//                       htmlFor="installationDate"
//                       className="block text-sm font-semibold text-gray-700 flex items-center"
//                     >
//                       <Calendar className="w-4 h-4 mr-1 text-gray-500" />
//                       Installation Date
//                     </label>
//                     <input
//                       id="installationDate"
//                       type="date"
//                       name="installationDate"
//                       value={asset.installationDate}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
//                     />
//                   </div>
//                 </div>
//                 <div className="space-y-6">
//                   <div className="space-y-2">
//                     <label
//                       htmlFor="warrantyPeriodDays"
//                       className="block text-sm font-semibold text-gray-700"
//                     >
//                       Warranty Period (Days)
//                     </label>
//                     <input
//                       id="warrantyPeriodDays"
//                       type="number"
//                       name="warrantyPeriodDays"
//                       value={asset.warrantyPeriodDays}
//                       onChange={handleChange}
//                       min="0"
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
//                       placeholder="Enter warranty period in days"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label
//                       htmlFor="lastAuditDate"
//                       className="block text-sm font-semibold text-gray-700 flex items-center"
//                     >
//                       <Calendar className="w-4 h-4 mr-1 text-gray-500" />
//                       Last Audit Date
//                     </label>
//                     <input
//                       id="lastAuditDate"
//                       type="date"
//                       name="lastAuditDate"
//                       value={asset.lastAuditDate}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//               <div className="flex items-center mb-6">
//                 <div className="p-3 bg-emerald-100 rounded-xl mr-4">
//                   <DollarSign className="w-6 h-6 text-emerald-600" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900">
//                     Financial Information{" "}
//                     <span className="ml-3 text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
//                       Optional Data
//                     </span>
//                   </h2>
//                   <p className="text-gray-600">
//                     Manage cost and depreciation details (optional)
//                   </p>
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <div className="space-y-6">
//                   <div className="space-y-2">
//                     <label
//                       htmlFor="purchaseCost"
//                       className="block text-sm font-semibold text-gray-700 flex items-center"
//                     >
//                       <DollarSign className="w-4 h-4 mr-1 text-gray-500" />
//                       Purchase Cost (USD)
//                     </label>
//                     <div className="relative">
//                       <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
//                         $
//                       </span>
//                       <input
//                         id="purchaseCost"
//                         type="number"
//                         name="purchaseCost"
//                         value={asset.purchaseCost}
//                         onChange={handleChange}
//                         step="100"
//                         min="0"
//                         className={`w-full pl-8 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                           errors.purchaseCost
//                             ? "border-red-500 bg-red-50"
//                             : "border-gray-200 hover:border-gray-300"
//                         }`}
//                         placeholder="5000.00"
//                       />
//                     </div>
//                   </div>
//                   <div className="space-y-2">
//                     <label
//                       htmlFor="depreciationType"
//                       className="block text-sm font-semibold text-gray-700 flex items-center"
//                     >
//                       <TrendingDown className="w-4 h-4 mr-1 text-gray-500" />
//                       Depreciation Type
//                     </label>
//                     <select
//                       id="depreciationType"
//                       name="depreciationType"
//                       value={asset.depreciationType}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
//                     >
//                       <option value="PERCENTAGE">Percentage</option>
//                       <option value="NUMBER">Fixed Amount</option>
//                     </select>
//                   </div>
//                   <div className="space-y-2">
//                     <label
//                       htmlFor="depreciationValue"
//                       className="block text-sm font-semibold text-gray-700 flex items-center"
//                     >
//                       <TrendingDown className="w-4 h-4 mr-1 text-gray-500" />
//                       Depreciation Value
//                     </label>
//                     <div className="relative">
//                       <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
//                         {asset.depreciationType === "PERCENTAGE" ? "%" : "$"}
//                       </span>
//                       <input
//                         id="depreciationValue"
//                         type="number"
//                         name="depreciationValue"
//                         value={asset.depreciationValue}
//                         onChange={handleChange}
//                         step={
//                           asset.depreciationType === "PERCENTAGE" ? "1" : "100"
//                         }
//                         min="0"
//                         max={
//                           asset.depreciationType === "PERCENTAGE"
//                             ? "100"
//                             : undefined
//                         }
//                         className={`w-full pl-8 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                           errors.depreciationValue
//                             ? "border-red-500 bg-red-50"
//                             : "border-gray-200 hover:border-gray-300"
//                         }`}
//                         placeholder={
//                           asset.depreciationType === "PERCENTAGE" ? "10" : "500"
//                         }
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="space-y-6">
//                   <div className="space-y-2">
//                     <label
//                       htmlFor="timeFrameYears"
//                       className="block text-sm font-semibold text-gray-700 flex items-center"
//                     >
//                       <Clock className="w-4 h-4 mr-1 text-gray-500" />
//                       Time Frame (Years)
//                     </label>
//                     <input
//                       id="timeFrameYears"
//                       type="number"
//                       name="timeFrameYears"
//                       value={asset.timeFrameYears}
//                       onChange={handleChange}
//                       step="1"
//                       min="1"
//                       max="50"
//                       className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                         errors.timeFrameYears
//                           ? "border-red-500 bg-red-50"
//                           : "border-gray-200 hover:border-gray-300"
//                       }`}
//                       placeholder="5"
//                     />
//                   </div>
//                   <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
//                     <label className="block text-sm font-semibold text-gray-700 flex items-center mb-2">
//                       <DollarSign className="w-4 h-4 mr-1 text-green-600" />
//                       Estimated Current Value
//                     </label>
//                     <p className="text-3xl font-bold text-green-600">
//                       {calculateDepreciatedValue() === "-"
//                         ? "-"
//                         : `$${calculateDepreciatedValue()}`}
//                     </p>
//                     <p className="text-sm text-gray-600 mt-1">
//                       Based on depreciation calculation
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//               <div className="flex items-center mb-6">
//                 <div className="p-3 bg-pink-100 rounded-xl mr-4">
//                   <ImageIcon className="w-6 h-6 text-pink-600" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900">
//                     Asset Images
//                   </h2>
//                   <p className="text-gray-600">
//                     Upload visual documentation of the asset
//                   </p>
//                 </div>
//               </div>
//               <div className="space-y-6">
//                 <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
//                   <div className="flex">
//                     <ImageIcon className="h-5 w-5 text-blue-400" />
//                     <div className="ml-3">
//                       <p className="text-sm text-blue-700 font-medium">
//                         Image Upload Requirements:
//                       </p>
//                       <ul className="list-disc pl-5 mt-1 text-sm text-blue-700">
//                         <li>Maximum 3 images allowed</li>
//                         <li>Formats: JPEG, PNG, GIF, WebP</li>
//                         <li>
//                           Maximum file size: {MAX_IMAGE_SIZE_MB}MB per image
//                         </li>
//                         <li>At least one image is required</li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//                 <div
//                   className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
//                     errors.images
//                       ? "border-red-500 bg-red-50"
//                       : "border-gray-300 hover:border-gray-400"
//                   }`}
//                 >
//                   <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                   <p className="text-gray-600 mb-2 text-lg">
//                     Click to upload or drag and drop asset images
//                   </p>
//                   <p className="text-sm text-gray-500 mb-4">
//                     {imagePreview.length}/{MAX_IMAGES} images uploaded (Maximum{" "}
//                     {MAX_IMAGES} images allowed)
//                   </p>
//                   <input
//                     type="file"
//                     multiple
//                     accept="image/jpeg,image/png,image/gif,image/webp"
//                     onChange={handleImageChange}
//                     className="hidden"
//                     id="image-upload"
//                     disabled={imagePreview.length >= MAX_IMAGES}
//                   />
//                   <label
//                     htmlFor="image-upload"
//                     className={`inline-flex items-center px-6 py-3 rounded-xl cursor-pointer transition-all ${
//                       imagePreview.length >= MAX_IMAGES
//                         ? "bg-gray-400 text-gray-200 cursor-not-allowed"
//                         : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl"
//                     }`}
//                   >
//                     <Upload className="w-5 h-5 mr-2" />
//                     {imagePreview.length >= MAX_IMAGES
//                       ? "Maximum Images Reached"
//                       : "Choose Images"}
//                   </label>
//                 </div>
//                 {imagePreview.length > 0 && (
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     {imagePreview.map((preview, index) => (
//                       <div key={index} className="relative group">
//                         <img
//                           src={preview || "/placeholder.svg"}
//                           alt={`Preview ${index + 1}`}
//                           className="w-full h-48 object-cover rounded-xl border-2 border-gray-200 group-hover:border-gray-300 transition-all"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => removeImage(index)}
//                           className="absolute top-3 right-3 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-lg transition-all opacity-0 group-hover:opacity-100"
//                         >
//                           <X className="w-4 h-4" />
//                         </button>
//                         <div className="absolute bottom-3 left-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
//                           Image {index + 1}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//               <div className="flex justify-between items-center">
//                 <button
//                   type="button"
//                   onClick={() => navigate("/assets/list")}
//                   className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all"
//                 >
//                   <ArrowLeft className="w-5 h-5 mr-2" />
//                   Cancel
//                 </button>
//                 <div className="flex items-center space-x-4">
//                   <button
//                     type="submit"
//                     disabled={submitting}
//                     className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
//                   >
//                     {submitting ? (
//                       <>
//                         <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                         {isEdit ? "Updating..." : "Creating..."}
//                       </>
//                     ) : (
//                       <>
//                         <Save className="w-5 h-5 mr-2" />
//                         {isEdit ? "Update Asset" : "Create Asset"}
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AssetForm;

"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Save,
  X,
  Upload,
  Calendar,
  Clock,
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
  AlertTriangle,
  ImageIcon,
  DollarSign,
  TrendingDown,
  ArrowLeft,
  CheckCircle,
  Plus,
  Trash2,
  Search,
} from "lucide-react";
import { assetService } from "../services/assetService";
import { assetCategoryService } from "../services/assetCategoryService";
import { contractService } from "../services/contractService";
import { companyService } from "../services/companyService";
import { serviceManagementService } from "../services/serviceManagementService";
import { propertyFlowService } from "../services/propertyFlowService";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DraftModal from "./DraftModal";

const AssetForm = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const { assetId } = useParams();
  const { user } = useContext(AuthContext);
  const updateTimeoutRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [pendingDraft, setPendingDraft] = useState(null);

  const [asset, setAsset] = useState({
    assetName: "",
    serialNumber: "",
    brandName: "",
    modelNumber: "",
    assetStatus: "ACTIVE",
    assetCondition: "GOOD",
    observation: "",
    recommendation: "",
    purchaseCost: "",
    depreciationValue: "",
    depreciationType: "PERCENTAGE",
    timeFrameYears: "",
    companyId: "",
    contractId: "",
    categoryId: "",
    zoneId: "",
    subZoneId: "",
    buildingId: "",
    villaApartmentId: "",
    floorId: "",
    roomId: "",
    subServices: [],
    purchaseDate: "",
    installationDate: "",
    warrantyPeriodDays: "",
    ownerType: "KANVEL",
    lastAuditDate: "",
    images: [],
    imagesToRemove: [],
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [existingImageUrls, setExistingImageUrls] = useState([]);
  const [errors, setErrors] = useState({});

  // Dropdown data
  const [companies, setCompanies] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [assetCategories, setAssetCategories] = useState([]);
  const [categorySearchTerm, setCategorySearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [zones, setZones] = useState([]);
  const [subZones, setSubZones] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [villaApartments, setVillaApartments] = useState([]);
  const [floors, setFloors] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [services, setServices] = useState([]);
  const [contractSubServices, setContractSubServices] = useState([]);
  const [contractServiceScopes, setContractServiceScopes] = useState({});

  const MAX_IMAGES = 3;
  const MAX_IMAGE_SIZE_MB = 1;
  const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
  ];

  // Draft functionality
  const DRAFT_KEY = `asset_draft_${isEdit ? assetId : "new"}`;

  useEffect(() => {
    if (categorySearchTerm.trim()) {
      const filtered = assetCategories.filter((category) =>
        category.categoryName
          .toLowerCase()
          .includes(categorySearchTerm.toLowerCase())
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(assetCategories);
    }
  }, [categorySearchTerm, assetCategories]);

  const saveDraft = useCallback(() => {
    try {
      const draftData = {
        asset,
        timestamp: new Date().toISOString(),
        companies,
        contracts,
        assetCategories,
        zones,
        subZones,
        buildings,
        villaApartments,
        floors,
        rooms,
        contractSubServices,
        contractServiceScopes,
      };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draftData));
      setDraftSaved(true);
      setTimeout(() => setDraftSaved(false), 3000);
    } catch (error) {
      console.error("Failed to save draft:", error);
    }
  }, [
    asset,
    companies,
    contracts,
    assetCategories,
    zones,
    subZones,
    buildings,
    villaApartments,
    floors,
    rooms,
    contractSubServices,
    contractServiceScopes,
    DRAFT_KEY,
  ]);

  const loadDraft = useCallback(() => {
    try {
      const savedDraft = localStorage.getItem(DRAFT_KEY);
      if (savedDraft) {
        const draftData = JSON.parse(savedDraft);
        return draftData;
      }
    } catch (error) {
      console.error("Failed to load draft:", error);
    }
    return null;
  }, [DRAFT_KEY]);

  const clearDraft = useCallback(() => {
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch (error) {
      console.error("Failed to clear draft:", error);
    }
  }, [DRAFT_KEY]);

  useEffect(() => {
    if (!isEdit) {
      const draft = loadDraft();
      if (draft && draft.asset) {
        setPendingDraft(draft);
        setShowDraftModal(true);
      }
    }
  }, [loadDraft, isEdit]);

  const handleLoadDraft = () => {
    if (pendingDraft) {
      setAsset(pendingDraft.asset);
      if (pendingDraft.companies) setCompanies(pendingDraft.companies);
      if (pendingDraft.contracts) setContracts(pendingDraft.contracts);
      if (pendingDraft.assetCategories)
        setAssetCategories(pendingDraft.assetCategories);
      if (pendingDraft.zones) setZones(pendingDraft.zones);
      if (pendingDraft.subZones) setSubZones(pendingDraft.subZones);
      if (pendingDraft.buildings) setBuildings(pendingDraft.buildings);
      if (pendingDraft.villaApartments)
        setVillaApartments(pendingDraft.villaApartments);
      if (pendingDraft.floors) setFloors(pendingDraft.floors);
      if (pendingDraft.rooms) setRooms(pendingDraft.rooms);
      if (pendingDraft.contractSubServices)
        setContractSubServices(pendingDraft.contractSubServices);
      if (pendingDraft.contractServiceScopes)
        setContractServiceScopes(pendingDraft.contractServiceScopes);
    }
    setShowDraftModal(false);
    setPendingDraft(null);
  };

  const handleCloseDraftModal = () => {
    setShowDraftModal(false);
    setPendingDraft(null);
  };

  useEffect(() => {
    if (!isEdit) {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
      updateTimeoutRef.current = setTimeout(() => {
        if (asset.assetName || asset.companyId || asset.contractId) {
          saveDraft();
        }
      }, 2000);
      return () => {
        if (updateTimeoutRef.current) {
          clearTimeout(updateTimeoutRef.current);
        }
      };
    }
  }, [asset, saveDraft, isEdit]);

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        const [
          companiesResponse,
          contractsResponse,
          servicesResponse,
          categoriesResponse,
        ] = await Promise.all([
          companyService.getAllCompanies(),
          contractService.getAllContracts(),
          serviceManagementService.getServices(),
          assetCategoryService.getAllCategories(),
        ]);

        setCompanies(companiesResponse.data || []);
        setContracts(contractsResponse.data || []);
        setServices(servicesResponse.data || []);
        setAssetCategories(categoriesResponse.data || []);

        if (isEdit && assetId) {
          const assetResponse = await assetService.getAssetById(assetId);
          const assetData = assetResponse.data;

          const transformedSubServices =
            assetData.subServices?.map((subService) => ({
              subServiceId: subService.subServiceId,
              serviceScopeIds: subService.serviceScopeIds || [],
            })) || [];

          setAsset({
            ...assetData,
            companyId: assetData.companyId.toString(),
            contractId: assetData.contractId.toString(),
            categoryId: assetData.categoryId?.toString() || "",
            zoneId: assetData.zoneId.toString(),
            subZoneId: assetData.subZoneId.toString(),
            buildingId: assetData.buildingId.toString(),
            villaApartmentId: assetData.villaApartmentId.toString(),
            floorId: assetData.floorId.toString(),
            roomId: assetData.roomId.toString(),
            subServices: transformedSubServices,
            purchaseCost: assetData.purchaseCost?.toString() || "",
            depreciationValue: assetData.depreciationValue?.toString() || "",
            timeFrameYears: assetData.timeFrameYears?.toString() || "",
            warrantyPeriodDays: assetData.warrantyPeriodDays?.toString() || "",
            imagesToRemove: [],
          });

          if (assetData.imageUrls && assetData.imageUrls.length > 0) {
            setExistingImageUrls(assetData.imageUrls);
            setImagePreview(assetData.imageUrls);
          }

          await Promise.all([
            loadZones(assetData.contractId),
            loadContractSubServices(assetData.contractId),
          ]);

          await Promise.all([
            loadSubZones(assetData.contractId, assetData.zoneId),
          ]);

          await loadBuildings(assetData.contractId, assetData.subZoneId);
          await loadVillaApartments(assetData.contractId, assetData.buildingId);
          await loadFloors(assetData.contractId, assetData.villaApartmentId);
          await loadRooms(assetData.contractId, assetData.floorId);

          for (const subService of transformedSubServices) {
            await loadServiceScopes(
              assetData.contractId,
              subService.subServiceId
            );
          }
        }
      } catch (error) {
        console.error("Error loading initial data:", error);
        toast.error("Failed to load form data");
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, [isEdit, assetId]);

  const handleCategorySearch = (e) => {
    setCategorySearchTerm(e.target.value);
    setShowCategoryDropdown(true);
  };

  const handleCategorySelect = (category) => {
    setAsset((prev) => ({
      ...prev,
      categoryId: category.categoryId.toString(),
    }));
    setCategorySearchTerm(category.categoryName);
    setShowCategoryDropdown(false);
    if (errors.categoryId) {
      setErrors((prev) => ({ ...prev, categoryId: null }));
    }
  };

  const getSelectedCategoryName = () => {
    if (asset.categoryId) {
      const category = assetCategories.find(
        (c) => c.categoryId.toString() === asset.categoryId
      );
      return category ? category.categoryName : "";
    }
    return "";
  };

  const loadZones = async (contractId) => {
    if (!contractId) return;
    try {
      const response = await propertyFlowService.getAllZonesByContract(
        contractId
      );
      setZones(response.data || []);
    } catch (error) {
      console.error("Error loading zones:", error);
      toast.error("Failed to load zones");
    }
  };

  const loadSubZones = async (contractId, zoneId) => {
    if (!contractId || !zoneId) return;
    try {
      const response = await propertyFlowService.getAllSubZonesByContract(
        contractId
      );
      setSubZones(
        (response.data || []).filter(
          (sz) => sz.zoneId.toString() === zoneId.toString()
        )
      );
    } catch (error) {
      console.error("Error loading sub zones:", error);
      toast.error("Failed to load sub zones");
    }
  };

  const loadBuildings = async (contractId, subZoneId) => {
    if (!contractId || !subZoneId) return;
    try {
      const response = await propertyFlowService.getAllBuildingsByContract(
        contractId
      );
      setBuildings(
        (response.data || []).filter(
          (b) => b.subZoneId.toString() === subZoneId.toString()
        )
      );
    } catch (error) {
      console.error("Error loading buildings:", error);
      toast.error("Failed to load buildings");
    }
  };

  const loadVillaApartments = async (contractId, buildingId) => {
    if (!contractId || !buildingId) return;
    try {
      const response =
        await propertyFlowService.getAllVillaApartmentsByContract(contractId);
      setVillaApartments(
        (response.data || []).filter(
          (va) => va.buildingId.toString() === buildingId.toString()
        )
      );
    } catch (error) {
      console.error("Error loading villa apartments:", error);
      toast.error("Failed to load villa apartments");
    }
  };

  const loadFloors = async (contractId, villaApartmentId) => {
    if (!contractId || !villaApartmentId) return;
    try {
      const response = await propertyFlowService.getAllFloorsByContract(
        contractId
      );
      setFloors(
        (response.data || []).filter(
          (f) => f.villaApartmentId.toString() === villaApartmentId.toString()
        )
      );
    } catch (error) {
      console.error("Error loading floors:", error);
      toast.error("Failed to load floors");
    }
  };

  const loadRooms = async (contractId, floorId) => {
    if (!contractId || !floorId) return;
    try {
      const response = await propertyFlowService.getAllRoomsByContract(
        contractId
      );
      setRooms(
        (response.data || []).filter(
          (r) => r.floorId.toString() === floorId.toString()
        )
      );
    } catch (error) {
      console.error("Error loading rooms:", error);
      toast.error("Failed to load rooms");
    }
  };

  const loadContractSubServices = async (contractId) => {
    if (!contractId) {
      setContractSubServices([]);
      return;
    }
    try {
      const response = await assetService.getSubServicesByContract(contractId);
      setContractSubServices(response.data || []);
    } catch (error) {
      console.error("Error loading contract sub services:", error);
      setContractSubServices([]);
      toast.error("Failed to load contract sub-services");
    }
  };

  const loadServiceScopes = async (contractId, subServiceId) => {
    if (!contractId || !subServiceId) return;
    try {
      const response =
        await assetService.getServiceScopesByContractAndSubService(
          contractId,
          subServiceId
        );
      setContractServiceScopes((prev) => ({
        ...prev,
        [subServiceId]: response.data || [],
      }));
    } catch (error) {
      console.error("Error loading service scopes:", error);
      toast.error("Failed to load service scopes");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAsset((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }

    if (name === "contractId") {
      loadZones(value);
      loadContractSubServices(value);
      setAsset((prev) => ({
        ...prev,
        zoneId: "",
        subZoneId: "",
        buildingId: "",
        villaApartmentId: "",
        floorId: "",
        roomId: "",
        subServices: [],
      }));
      setContractServiceScopes({});
    } else if (name === "zoneId") {
      loadSubZones(asset.contractId, value);
      setAsset((prev) => ({
        ...prev,
        subZoneId: "",
        buildingId: "",
        villaApartmentId: "",
        floorId: "",
        roomId: "",
      }));
    } else if (name === "subZoneId") {
      loadBuildings(asset.contractId, value);
      setAsset((prev) => ({
        ...prev,
        buildingId: "",
        villaApartmentId: "",
        floorId: "",
        roomId: "",
      }));
    } else if (name === "buildingId") {
      loadVillaApartments(asset.contractId, value);
      setAsset((prev) => ({
        ...prev,
        villaApartmentId: "",
        floorId: "",
        roomId: "",
      }));
    } else if (name === "villaApartmentId") {
      loadFloors(asset.contractId, value);
      setAsset((prev) => ({ ...prev, floorId: "", roomId: "" }));
    } else if (name === "floorId") {
      loadRooms(asset.contractId, value);
      setAsset((prev) => ({ ...prev, roomId: "" }));
    }
  };

  const addSubService = () => {
    setAsset((prev) => ({
      ...prev,
      subServices: [
        ...prev.subServices,
        { subServiceId: "", serviceScopeIds: [] },
      ],
    }));
  };

  const removeSubService = (index) => {
    setAsset((prev) => ({
      ...prev,
      subServices: prev.subServices.filter((_, i) => i !== index),
    }));
  };

  const updateSubService = (index, field, value) => {
    setAsset((prev) => ({
      ...prev,
      subServices: prev.subServices.map((subService, i) => {
        if (i === index) {
          if (field === "subServiceId") {
            loadServiceScopes(asset.contractId, value);
            return { ...subService, [field]: value, serviceScopeIds: [] };
          }
          return { ...subService, [field]: value };
        }
        return subService;
      }),
    }));
  };

  const toggleServiceScope = (subServiceIndex, scopeId) => {
    setAsset((prev) => ({
      ...prev,
      subServices: prev.subServices.map((subService, i) => {
        if (i === subServiceIndex) {
          const currentScopes = subService.serviceScopeIds;
          const isSelected = currentScopes.includes(scopeId);
          return {
            ...subService,
            serviceScopeIds: isSelected
              ? currentScopes.filter((id) => id !== scopeId)
              : [...currentScopes, scopeId],
          };
        }
        return subService;
      }),
    }));
  };

  const validateImageFile = (file) => {
    console.log(
      `Validating file: ${file.name}, size: ${file.size}, type: ${file.type}`
    );
    const fileSizeMB = file.size / (1024 * 1024);

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      toast.error(
        `Image "${file.name}" has an unsupported format. Allowed formats: JPEG, PNG, GIF, WebP.`
      );
      return false;
    }

    if (fileSizeMB > MAX_IMAGE_SIZE_MB) {
      toast.error(
        `Image "${file.name}" exceeds ${MAX_IMAGE_SIZE_MB}MB limit. Please upload a smaller image.`
      );
      return false;
    }

    return true;
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    console.log(`Selected files: ${files.map((f) => f.name).join(", ")}`);

    if (files.length === 0) {
      console.log("No files selected");
      return;
    }

    const totalCurrentImages = imageFiles.length + existingImageUrls.length;
    const availableSlots = MAX_IMAGES - totalCurrentImages;

    if (files.length > availableSlots) {
      toast.error(
        `You can only upload ${availableSlots} more image(s). Maximum ${MAX_IMAGES} images allowed.`
      );
      console.log(
        `Too many files selected. Available slots: ${availableSlots}`
      );
      e.target.value = "";
      return;
    }

    const validFiles = [];
    const invalidFiles = [];

    files.forEach((file) => {
      if (validateImageFile(file)) {
        validFiles.push(file);
      } else {
        invalidFiles.push(file);
      }
    });

    if (validFiles.length > 0) {
      console.log(`Valid files: ${validFiles.map((f) => f.name).join(", ")}`);
      setImageFiles((prev) => [...prev, ...validFiles]);

      const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
      setImagePreview((prev) => [...prev, ...newPreviews]);

      toast.success(`${validFiles.length} image(s) added successfully`);

      if (errors.images) {
        setErrors((prev) => ({ ...prev, images: null }));
      }
    }

    if (invalidFiles.length > 0) {
      console.log(
        `Invalid files: ${invalidFiles.map((f) => f.name).join(", ")}`
      );
      e.target.value = "";
      return;
    }

    e.target.value = "";
  };

  const removeImage = (index) => {
    console.log(`Removing image at index: ${index}`);

    if (isEdit) {
      const totalPreviews = imagePreview.length;
      const existingCount = existingImageUrls.length;

      if (index < existingCount) {
        const imageToRemove = existingImageUrls[index];
        setAsset((prev) => ({
          ...prev,
          imagesToRemove: [...(prev.imagesToRemove || []), imageToRemove],
        }));

        const updatedExistingUrls = [...existingImageUrls];
        updatedExistingUrls.splice(index, 1);
        setExistingImageUrls(updatedExistingUrls);

        setImagePreview((prev) => {
          const updated = [...prev];
          updated.splice(index, 1);
          return updated;
        });

        toast.info(`Existing image ${index + 1} removed`);
      } else {
        const newImageIndex = index - existingCount;
        setImageFiles((prev) => {
          const updated = [...prev];
          updated.splice(newImageIndex, 1);
          return updated;
        });

        setImagePreview((prev) => {
          const updated = [...prev];
          updated.splice(index, 1);
          return updated;
        });

        toast.info(`New image ${index + 1} removed`);
      }
    } else {
      setImageFiles((prev) => prev.filter((_, i) => i !== index));
      setImagePreview((prev) => prev.filter((_, i) => i !== index));
      toast.info(`Image ${index + 1} removed`);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!asset.assetName.trim()) {
      newErrors.assetName = "Asset name is required";
      toast.error("Asset name is required");
    }

    if (!user || !user.username) {
      newErrors.username = "User information is required. Please log in again.";
      toast.error("User information is required. Please log in again.");
    }

    if (!asset.companyId) {
      newErrors.companyId = "Company is required";
      toast.error("Company is required");
    }

    if (!asset.contractId) {
      newErrors.contractId = "Contract is required";
      toast.error("Contract is required");
    }

    if (!asset.categoryId) {
      newErrors.categoryId = "Asset category is required";
      toast.error("Asset category is required");
    }

    if (!asset.zoneId) {
      newErrors.zoneId = "Zone is required";
      toast.error("Zone is required");
    }

    if (!asset.subZoneId) {
      newErrors.subZoneId = "Sub Zone is required";
      toast.error("Sub Zone is required");
    }

    if (!asset.buildingId) {
      newErrors.buildingId = "Building is required";
      toast.error("Building is required");
    }

    if (!asset.villaApartmentId) {
      newErrors.villaApartmentId = "Villa/Apartment is required";
      toast.error("Villa/Apartment is required");
    }

    if (!asset.floorId) {
      newErrors.floorId = "Floor is required";
      toast.error("Floor is required");
    }

    if (!asset.roomId) {
      newErrors.roomId = "Room is required";
      toast.error("Room is required");
    }

    if (!asset.subServices || asset.subServices.length === 0) {
      newErrors.subServices = "At least one sub-service must be specified";
      toast.error("At least one sub-service must be specified");
    } else {
      asset.subServices.forEach((subService, index) => {
        if (!subService.subServiceId) {
          newErrors[`subService_${index}`] = `Sub-service ${
            index + 1
          }: Selection is required`;
          toast.error(`Sub-service ${index + 1}: Selection is required`);
        }
        if (
          !subService.serviceScopeIds ||
          subService.serviceScopeIds.length === 0
        ) {
          newErrors[`serviceScopes_${index}`] = `Sub-service ${
            index + 1
          }: At least one service scope must be selected`;
          toast.error(
            `Sub-service ${
              index + 1
            }: At least one service scope must be selected`
          );
        }
      });
    }

    if (asset.purchaseCost && isNaN(Number.parseFloat(asset.purchaseCost))) {
      newErrors.purchaseCost = "Purchase cost must be a valid number";
      toast.error("Purchase cost must be a valid number");
    }

    if (
      asset.depreciationValue &&
      isNaN(Number.parseFloat(asset.depreciationValue))
    ) {
      newErrors.depreciationValue = "Depreciation value must be a valid number";
      toast.error("Depreciation value must be a valid number");
    }

    if (
      asset.depreciationType === "PERCENTAGE" &&
      asset.depreciationValue &&
      (Number.parseFloat(asset.depreciationValue) < 0 ||
        Number.parseFloat(asset.depreciationValue) > 100)
    ) {
      newErrors.depreciationValue =
        "Depreciation percentage must be between 0 and 100";
      toast.error("Depreciation percentage must be between 0 and 100");
    }

    if (
      asset.timeFrameYears &&
      (isNaN(Number.parseInt(asset.timeFrameYears)) ||
        Number.parseInt(asset.timeFrameYears) < 1 ||
        Number.parseInt(asset.timeFrameYears) > 50)
    ) {
      newErrors.timeFrameYears = "Time frame must be between 1 and 50 years";
      toast.error("Time frame must be between 1 and 50 years");
    }

    if (!isEdit && imageFiles.length === 0) {
      newErrors.images = "At least one image is required";
      toast.error("At least one image is required");
    } else if (
      isEdit &&
      imageFiles.length === 0 &&
      existingImageUrls.length === 0
    ) {
      newErrors.images = "At least one image is required";
      toast.error("At least one image is required");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateDepreciatedValue = () => {
    if (
      !asset.purchaseCost ||
      !asset.depreciationValue ||
      !asset.depreciationType ||
      !asset.timeFrameYears
    )
      return "-";

    const cost = Number.parseFloat(asset.purchaseCost);
    const value = Number.parseFloat(asset.depreciationValue);
    const years = Number.parseInt(asset.timeFrameYears);

    if (asset.depreciationType === "NUMBER") {
      const result = Math.max(cost - value * years, 0);
      return result.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }

    const annualDepreciation = cost * (value / 100);
    const result = Math.max(cost - annualDepreciation * years, 0);
    return result.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form...");

    if (!validateForm()) {
      console.log("Form validation failed");
      return;
    }

    if (!user || !user.username) {
      toast.error("User information is missing. Please log in again.");
      console.log("User information missing");
      return;
    }

    setSubmitting(true);
    try {
      const assetData = {
        ...asset,
        images: imageFiles,
        appendImages: true,
        imagesToRemove: asset.imagesToRemove || [],
      };

      if (isEdit) {
        await assetService.updateAsset(assetId, assetData);
        toast.success("Asset updated successfully");
      } else {
        await assetService.createAsset(assetData);
        toast.success("Asset created successfully");
        clearDraft();
      }

      navigate("/assets/list");
    } catch (error) {
      console.error("Error saving asset:", error);
      toast.error(error.response?.data?.message || "Failed to save asset");
    } finally {
      setSubmitting(false);
    }
  };

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

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <DraftModal
        isOpen={showDraftModal}
        onClose={handleCloseDraftModal}
        onLoad={handleLoadDraft}
        draftData={pendingDraft}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate("/assets/list")}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {isEdit ? "Edit Asset" : "Create New Asset"}
                  </h1>
                  <p className="text-gray-600 mt-1">
                    {isEdit
                      ? "Update asset information"
                      : "Add a new asset to your inventory"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {draftSaved && (
                  <div className="flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-lg animate-fade-in">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span className="font-medium">Draft Saved</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {(!user || !user.username) && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    User information is missing. Please log out and log in again
                    to fix this issue.
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 1. Organization Information */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-100 rounded-xl mr-4">
                  <Building className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Organization Information
                  </h2>
                  <p className="text-gray-600">
                    Select company and contract details
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label
                    htmlFor="companyId"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Company *
                  </label>
                  <select
                    id="companyId"
                    name="companyId"
                    value={asset.companyId}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.companyId
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <option value="">Select Company</option>
                    {companies.map((company) => (
                      <option
                        key={company.companyId}
                        value={company.companyId.toString()}
                      >
                        {company.companyName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="contractId"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Contract *
                  </label>
                  <select
                    id="contractId"
                    name="contractId"
                    value={asset.contractId}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.contractId
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <option value="">Select Contract</option>
                    {contracts.map((contract) => (
                      <option
                        key={contract.contractId}
                        value={contract.contractId.toString()}
                      >
                        {contract.contractName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 2. Location Information */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-green-100 rounded-xl mr-4">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Location Information
                  </h2>
                  <p className="text-gray-600">
                    Specify the exact location of the asset
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="zoneId"
                    className="block text-sm font-semibold text-gray-700 flex items-center"
                  >
                    <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                    Zone *
                  </label>
                  <select
                    id="zoneId"
                    name="zoneId"
                    value={asset.zoneId}
                    onChange={handleChange}
                    disabled={!asset.contractId}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.zoneId
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    } ${
                      !asset.contractId ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                  >
                    <option value="">Select Zone</option>
                    {zones.map((zone) => (
                      <option key={zone.zoneId} value={zone.zoneId.toString()}>
                        {zone.zoneName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="subZoneId"
                    className="block text-sm font-semibold text-gray-700 flex items-center"
                  >
                    <Layers className="w-4 h-4 mr-1 text-gray-500" />
                    Sub Zone *
                  </label>
                  <select
                    id="subZoneId"
                    name="subZoneId"
                    value={asset.subZoneId}
                    onChange={handleChange}
                    disabled={!asset.zoneId}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.subZoneId
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    } ${!asset.zoneId ? "bg-gray-100 cursor-not-allowed" : ""}`}
                  >
                    <option value="">Select Sub Zone</option>
                    {subZones.map((subZone) => (
                      <option
                        key={subZone.subZoneId}
                        value={subZone.subZoneId.toString()}
                      >
                        {subZone.subZoneName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="buildingId"
                    className="block text-sm font-semibold text-gray-700 flex items-center"
                  >
                    <Building className="w-4 h-4 mr-1 text-gray-500" />
                    Building *
                  </label>
                  <select
                    id="buildingId"
                    name="buildingId"
                    value={asset.buildingId}
                    onChange={handleChange}
                    disabled={!asset.subZoneId}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.buildingId
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    } ${
                      !asset.subZoneId ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                  >
                    <option value="">Select Building</option>
                    {buildings.map((building) => (
                      <option
                        key={building.buildingId}
                        value={building.buildingId.toString()}
                      >
                        {building.buildingName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="villaApartmentId"
                    className="block text-sm font-semibold text-gray-700 flex items-center"
                  >
                    <Home className="w-4 h-4 mr-1 text-gray-500" />
                    Villa/Apartment *
                  </label>
                  <select
                    id="villaApartmentId"
                    name="villaApartmentId"
                    value={asset.villaApartmentId}
                    onChange={handleChange}
                    disabled={!asset.buildingId}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.villaApartmentId
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    } ${
                      !asset.buildingId ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                  >
                    <option value="">Select Villa/Apartment</option>
                    {villaApartments.map((va) => (
                      <option
                        key={va.villaApartmentId}
                        value={va.villaApartmentId.toString()}
                      >
                        {va.villaApartmentName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="floorId"
                    className="block text-sm font-semibold text-gray-700 flex items-center"
                  >
                    <Layers className="w-4 h-4 mr-1 text-gray-500" />
                    Floor *
                  </label>
                  <select
                    id="floorId"
                    name="floorId"
                    value={asset.floorId}
                    onChange={handleChange}
                    disabled={!asset.villaApartmentId}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.floorId
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    } ${
                      !asset.villaApartmentId
                        ? "bg-gray-100 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <option value="">Select Floor</option>
                    {floors.map((floor) => (
                      <option
                        key={floor.floorId}
                        value={floor.floorId.toString()}
                      >
                        {floor.floorName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="roomId"
                    className="block text-sm font-semibold text-gray-700 flex items-center"
                  >
                    <DoorOpen className="w-4 h-4 mr-1 text-gray-500" />
                    Room *
                  </label>
                  <select
                    id="roomId"
                    name="roomId"
                    value={asset.roomId}
                    onChange={handleChange}
                    disabled={!asset.floorId}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.roomId
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    } ${
                      !asset.floorId ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                  >
                    <option value="">Select Room</option>
                    {rooms.map((room) => (
                      <option key={room.roomId} value={room.roomId.toString()}>
                        {room.roomName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-orange-100 rounded-xl mr-4">
                  <Info className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Basic Asset Information
                  </h2>
                  <p className="text-gray-600">
                    Enter fundamental asset details
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="assetName"
                      className="block text-sm font-semibold text-gray-700 flex items-center"
                    >
                      <Tag className="w-4 h-4 mr-1 text-gray-500" />
                      Asset Name *
                    </label>
                    <input
                      id="assetName"
                      type="text"
                      name="assetName"
                      value={asset.assetName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        errors.assetName
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      placeholder="Enter asset name"
                    />
                  </div>

                  {/* <div className="space-y-2 relative">
                    <label
                      htmlFor="categorySearch"
                      className="block text-sm font-semibold text-gray-700 flex items-center"
                    >
                      <Tag className="w-4 h-4 mr-1 text-gray-500" />
                      Asset Category *
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        id="categorySearch"
                        type="text"
                        value={categorySearchTerm || getSelectedCategoryName()}
                        onChange={handleCategorySearch}
                        onFocus={() => setShowCategoryDropdown(true)}
                        className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          errors.categoryId
                            ? "border-red-500 bg-red-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        placeholder="Search asset category..."
                      />
                      {showCategoryDropdown && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          {filteredCategories.length > 0 ? (
                            filteredCategories.map((category) => (
                              <button
                                key={category.categoryId}
                                type="button"
                                onClick={() => handleCategorySelect(category)}
                                className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors"
                              >
                                <div className="font-medium text-gray-900">
                                  {category.categoryName}
                                </div>
                                {category.description && (
                                  <div className="text-sm text-gray-500 truncate">
                                    {category.description}
                                  </div>
                                )}
                              </button>
                            ))
                          ) : (
                            <div className="px-4 py-3 text-gray-500 text-center">
                              No categories found
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    {errors.categoryId && (
                      <p className="text-red-500 text-sm">
                        {errors.categoryId}
                      </p>
                    )}
                  </div> */}

                  <div className="space-y-2 relative">
                    <label
                      htmlFor="categorySearch"
                      className="block text-sm font-semibold text-gray-700 flex items-center"
                    >
                      <Tag className="w-4 h-4 mr-1 text-gray-500" />
                      Asset Category *
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        id="categorySearch"
                        type="text"
                        value={categorySearchTerm || getSelectedCategoryName()}
                        onChange={(e) => {
                          setCategorySearchTerm(e.target.value);
                          setShowCategoryDropdown(
                            e.target.value.trim().length > 0
                          ); // Show dropdown only if search term is not empty
                        }}
                        onFocus={() => {
                          if (categorySearchTerm.trim().length > 0) {
                            setShowCategoryDropdown(true); // Show dropdown on focus only if there's a search term
                          }
                        }}
                        onBlur={() => {
                          setTimeout(() => setShowCategoryDropdown(false), 200); // Delay hiding to allow click
                        }}
                        className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          errors.categoryId
                            ? "border-red-500 bg-red-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        placeholder="Search asset category..."
                      />
                      {showCategoryDropdown &&
                        filteredCategories.length > 0 && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {filteredCategories.map((category) => (
                              <button
                                key={category.categoryId}
                                type="button"
                                onClick={() => {
                                  handleCategorySelect(category);
                                  setCategorySearchTerm(""); // Clear search term after selection
                                }}
                                className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors"
                              >
                                <div className="font-medium text-gray-900">
                                  {category.categoryName}
                                </div>
                                {category.description && (
                                  <div className="text-sm text-gray-500 truncate">
                                    {category.description}
                                  </div>
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                      {showCategoryDropdown &&
                        categorySearchTerm.trim().length > 0 &&
                        filteredCategories.length === 0 && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-4 text-gray-500 text-center">
                            No categories found
                          </div>
                        )}
                    </div>
                    {errors.categoryId && (
                      <p className="text-red-500 text-sm">
                        {errors.categoryId}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="serialNumber"
                      className="block text-sm font-semibold text-gray-700 flex items-center"
                    >
                      <Barcode className="w-4 h-4 mr-1 text-gray-500" />
                      Serial Number
                    </label>
                    <input
                      id="serialNumber"
                      type="text"
                      name="serialNumber"
                      value={asset.serialNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
                      placeholder="Enter serial number"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="brandName"
                      className="block text-sm font-semibold text-gray-700 flex items-center"
                    >
                      <Box className="w-4 h-4 mr-1 text-gray-500" />
                      Brand Name
                    </label>
                    <input
                      id="brandName"
                      type="text"
                      name="brandName"
                      value={asset.brandName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
                      placeholder="Enter brand name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="modelNumber"
                      className="block text-sm font-semibold text-gray-700 flex items-center"
                    >
                      <Cpu className="w-4 h-4 mr-1 text-gray-500" />
                      Model Number
                    </label>
                    <input
                      id="modelNumber"
                      type="text"
                      name="modelNumber"
                      value={asset.modelNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
                      placeholder="Enter model number"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="assetStatus"
                      className="block text-sm font-semibold text-gray-700 flex items-center"
                    >
                      <AlertTriangle className="w-4 h-4 mr-1 text-gray-500" />
                      Asset Status *
                    </label>
                    <select
                      id="assetStatus"
                      name="assetStatus"
                      value={asset.assetStatus}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
                    >
                      <option value="ACTIVE">Active</option>
                      <option value="UNDER_MAINTENANCE">
                        Under Maintenance
                      </option>
                      <option value="DECOMMISSIONED">Decommissioned</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="assetCondition"
                      className="block text-sm font-semibold text-gray-700 flex items-center"
                    >
                      <AlertTriangle className="w-4 h-4 mr-1 text-gray-500" />
                      Asset Condition *
                    </label>
                    <select
                      id="assetCondition"
                      name="assetCondition"
                      value={asset.assetCondition}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
                    >
                      <option value="EXCELLENT">Excellent</option>
                      <option value="GOOD">Good</option>
                      <option value="AVERAGE">Average</option>
                      <option value="POOR">Poor</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="ownerType"
                      className="block text-sm font-semibold text-gray-700 flex items-center"
                    >
                      <User className="w-4 h-4 mr-1 text-gray-500" />
                      Owner Type
                    </label>
                    <select
                      id="ownerType"
                      name="ownerType"
                      value={asset.ownerType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
                    >
                      <option value="KANVEL">Kanvel</option>
                      <option value="TENANT">Tenant</option>
                      <option value="PROPERTY_OWNER">Property Owner</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="space-y-2">
                  <label
                    htmlFor="observation"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Observation
                  </label>
                  <textarea
                    id="observation"
                    name="observation"
                    value={asset.observation}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all resize-none"
                    placeholder="Enter observations about the asset"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="recommendation"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Recommendation
                  </label>
                  <textarea
                    id="recommendation"
                    name="recommendation"
                    value={asset.recommendation}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all resize-none"
                    placeholder="Enter recommendations for the asset"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-purple-100 rounded-xl mr-4">
                  <Wrench className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Service Information
                  </h2>
                  <p className="text-gray-600">
                    Define service categories and scopes for multiple
                    sub-services
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-semibold text-gray-700">
                    Contract-Defined Sub-Services *
                  </label>
                  <button
                    type="button"
                    onClick={addSubService}
                    disabled={!asset.contractId}
                    className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Sub-Service
                  </button>
                </div>
                {asset.subServices.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-xl">
                    <Wrench className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">No sub-services added</p>
                    <p className="text-sm">
                      {!asset.contractId
                        ? "Please select a contract first"
                        : "Click 'Add Sub-Service' to get started"}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {asset.subServices.map((subService, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-xl p-6 bg-gray-50"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold text-gray-900">
                            Sub-Service {index + 1}
                          </h4>
                          <button
                            type="button"
                            onClick={() => removeSubService(index)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Sub-Service *
                          </label>
                          <select
                            value={subService.subServiceId}
                            onChange={(e) =>
                              updateSubService(
                                index,
                                "subServiceId",
                                e.target.value
                              )
                            }
                            disabled={!asset.contractId}
                            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                              errors[`subService_${index}`]
                                ? "border-red-500 bg-red-50"
                                : "border-gray-200 hover:border-gray-300"
                            } ${
                              !asset.contractId
                                ? "bg-gray-100 cursor-not-allowed"
                                : ""
                            }`}
                          >
                            <option value="">Select Sub-Service</option>
                            {contractSubServices.map((contractSubService) => (
                              <option
                                key={contractSubService.subServiceId}
                                value={contractSubService.subServiceId}
                              >
                                {contractSubService.subServiceName}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Contract-Defined Service Scopes *
                          </label>
                          {contractServiceScopes[subService.subServiceId]
                            ?.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                              {contractServiceScopes[
                                subService.subServiceId
                              ].map((scope) => (
                                <div
                                  key={scope.scopeId}
                                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                                    subService.serviceScopeIds.includes(
                                      scope.scopeId
                                    )
                                      ? "border-purple-500 bg-purple-50 shadow-md"
                                      : "border-gray-200 hover:border-gray-300"
                                  }`}
                                  onClick={() =>
                                    toggleServiceScope(index, scope.scopeId)
                                  }
                                >
                                  <div className="flex items-center">
                                    <div
                                      className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                                        subService.serviceScopeIds.includes(
                                          scope.scopeId
                                        )
                                          ? "border-purple-500 bg-purple-500"
                                          : "border-gray-300"
                                      }`}
                                    >
                                      {subService.serviceScopeIds.includes(
                                        scope.scopeId
                                      ) && (
                                        <CheckCircle className="w-3 h-3 text-white" />
                                      )}
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">
                                      {scope.scopeName}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-6 text-gray-500 border-2 border-dashed border-gray-300 rounded-xl">
                              {!subService.subServiceId
                                ? "Please select a sub-service first"
                                : "No service scopes available for selected sub-service"}
                            </div>
                          )}
                          {subService.serviceScopeIds.length > 0 && (
                            <p className="text-purple-600 text-sm mt-2">
                              {subService.serviceScopeIds.length} service
                              scope(s) selected
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-indigo-100 rounded-xl mr-4">
                  <Clock className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Lifecycle Information{" "}
                    <span className="ml-3 text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      Optional Data
                    </span>
                  </h2>
                  <p className="text-gray-600">
                    Track important dates and milestones (optional)
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="purchaseDate"
                      className="block text-sm font-semibold text-gray-700 flex items-center"
                    >
                      <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                      Purchase Date
                    </label>
                    <input
                      id="purchaseDate"
                      type="date"
                      name="purchaseDate"
                      value={asset.purchaseDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="installationDate"
                      className="block text-sm font-semibold text-gray-700 flex items-center"
                    >
                      <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                      Installation Date
                    </label>
                    <input
                      id="installationDate"
                      type="date"
                      name="installationDate"
                      value={asset.installationDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="warrantyPeriodDays"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Warranty Period (Days)
                    </label>
                    <input
                      id="warrantyPeriodDays"
                      type="number"
                      name="warrantyPeriodDays"
                      value={asset.warrantyPeriodDays}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
                      placeholder="Enter warranty period in days"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="lastAuditDate"
                      className="block text-sm font-semibold text-gray-700 flex items-center"
                    >
                      <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                      Last Audit Date
                    </label>
                    <input
                      id="lastAuditDate"
                      type="date"
                      name="lastAuditDate"
                      value={asset.lastAuditDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-emerald-100 rounded-xl mr-4">
                  <DollarSign className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Financial Information{" "}
                    <span className="ml-3 text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      Optional Data
                    </span>
                  </h2>
                  <p className="text-gray-600">
                    Manage cost and depreciation details (optional)
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="purchaseCost"
                      className="block text-sm font-semibold text-gray-700 flex items-center"
                    >
                      <DollarSign className="w-4 h-4 mr-1 text-gray-500" />
                      Purchase Cost (USD)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                        $
                      </span>
                      <input
                        id="purchaseCost"
                        type="number"
                        name="purchaseCost"
                        value={asset.purchaseCost}
                        onChange={handleChange}
                        step="100"
                        min="0"
                        className={`w-full pl-8 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          errors.purchaseCost
                            ? "border-red-500 bg-red-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        placeholder="5000.00"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="depreciationType"
                      className="block text-sm font-semibold text-gray-700 flex items-center"
                    >
                      <TrendingDown className="w-4 h-4 mr-1 text-gray-500" />
                      Depreciation Type
                    </label>
                    <select
                      id="depreciationType"
                      name="depreciationType"
                      value={asset.depreciationType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
                    >
                      <option value="PERCENTAGE">Percentage</option>
                      <option value="NUMBER">Fixed Amount</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="depreciationValue"
                      className="block text-sm font-semibold text-gray-700 flex items-center"
                    >
                      <TrendingDown className="w-4 h-4 mr-1 text-gray-500" />
                      Depreciation Value
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                        {asset.depreciationType === "PERCENTAGE" ? "%" : "$"}
                      </span>
                      <input
                        id="depreciationValue"
                        type="number"
                        name="depreciationValue"
                        value={asset.depreciationValue}
                        onChange={handleChange}
                        step={
                          asset.depreciationType === "PERCENTAGE" ? "1" : "100"
                        }
                        min="0"
                        max={
                          asset.depreciationType === "PERCENTAGE"
                            ? "100"
                            : undefined
                        }
                        className={`w-full pl-8 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          errors.depreciationValue
                            ? "border-red-500 bg-red-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        placeholder={
                          asset.depreciationType === "PERCENTAGE" ? "10" : "500"
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="timeFrameYears"
                      className="block text-sm font-semibold text-gray-700 flex items-center"
                    >
                      <Clock className="w-4 h-4 mr-1 text-gray-500" />
                      Time Frame (Years)
                    </label>
                    <input
                      id="timeFrameYears"
                      type="number"
                      name="timeFrameYears"
                      value={asset.timeFrameYears}
                      onChange={handleChange}
                      step="1"
                      min="1"
                      max="50"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        errors.timeFrameYears
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      placeholder="5"
                    />
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                    <label className="block text-sm font-semibold text-gray-700 flex items-center mb-2">
                      <DollarSign className="w-4 h-4 mr-1 text-green-600" />
                      Estimated Current Value
                    </label>
                    <p className="text-3xl font-bold text-green-600">
                      {calculateDepreciatedValue() === "-"
                        ? "-"
                        : `$${calculateDepreciatedValue()}`}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Based on depreciation calculation
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-pink-100 rounded-xl mr-4">
                  <ImageIcon className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Asset Images
                  </h2>
                  <p className="text-gray-600">
                    Upload visual documentation of the asset
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                  <div className="flex">
                    <ImageIcon className="h-5 w-5 text-blue-400" />
                    <div className="ml-3">
                      <p className="text-sm text-blue-700 font-medium">
                        Image Upload Requirements:
                      </p>
                      <ul className="list-disc pl-5 mt-1 text-sm text-blue-700">
                        <li>Maximum 3 images allowed</li>
                        <li>Formats: JPEG, PNG, GIF, WebP</li>
                        <li>
                          Maximum file size: {MAX_IMAGE_SIZE_MB}MB per image
                        </li>
                        <li>At least one image is required</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                    errors.images
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2 text-lg">
                    Click to upload or drag and drop asset images
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    {imagePreview.length}/{MAX_IMAGES} images uploaded (Maximum{" "}
                    {MAX_IMAGES} images allowed)
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                    disabled={imagePreview.length >= MAX_IMAGES}
                  />
                  <label
                    htmlFor="image-upload"
                    className={`inline-flex items-center px-6 py-3 rounded-xl cursor-pointer transition-all ${
                      imagePreview.length >= MAX_IMAGES
                        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl"
                    }`}
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    {imagePreview.length >= MAX_IMAGES
                      ? "Maximum Images Reached"
                      : "Choose Images"}
                  </label>
                </div>
                {imagePreview.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {imagePreview.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview || "/placeholder.svg"}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-48 object-cover rounded-xl border-2 border-gray-200 group-hover:border-gray-300 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-3 right-3 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-lg transition-all opacity-0 group-hover:opacity-100"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="absolute bottom-3 left-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                          Image {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => navigate("/assets/list")}
                  className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Cancel
                </button>
                <div className="flex items-center space-x-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        {isEdit ? "Updating..." : "Creating..."}
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5 mr-2" />
                        {isEdit ? "Update Asset" : "Create Asset"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AssetForm;
