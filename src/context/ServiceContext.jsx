import { createContext, useState, useEffect, useCallback } from "react";
import { serviceManagementService } from "../services/serviceManagementService";

export const ServiceContext = createContext(null);

export const ServiceProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [subServices, setSubServices] = useState([]);
  const [serviceScopes, setServiceScopes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [servicesRes, subServicesRes, serviceScopesRes] = await Promise.all(
        [
          serviceManagementService.getServices(),
          serviceManagementService.getSubServices(),
          serviceManagementService.getServiceScopes(),
        ]
      );
      setServices(servicesRes.data || []);
      setSubServices(subServicesRes.data || []);
      setServiceScopes(serviceScopesRes.data || []);
    } catch (err) {
      setError("Failed to load data. Please try again.");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addService = useCallback((service) => {
    setServices((prev) => [...prev, service]);
  }, []);

  const addSubService = useCallback((subService) => {
    setSubServices((prev) => [...prev, subService]);
  }, []);

  const addServiceScope = useCallback((serviceScope) => {
    setServiceScopes((prev) => [...prev, serviceScope]);
  }, []);

  const updateService = useCallback((updatedService) => {
    setServices((prev) =>
      prev.map((s) =>
        s.serviceId === updatedService.serviceId ? updatedService : s
      )
    );
  }, []);

  const updateSubService = useCallback((updatedSubService) => {
    setSubServices((prev) =>
      prev.map((ss) =>
        ss.subServiceId === updatedSubService.subServiceId
          ? updatedSubService
          : ss
      )
    );
  }, []);

  const updateServiceScope = useCallback((updatedServiceScope) => {
    setServiceScopes((prev) =>
      prev.map((sc) =>
        sc.scopeId === updatedServiceScope.scopeId ? updatedServiceScope : sc
      )
    );
  }, []);

  const deleteService = useCallback(
    async (serviceId) => {
      try {
        // Remove service and its child data from state
        setServices((prev) => prev.filter((s) => s.serviceId !== serviceId));
        setSubServices((prev) =>
          prev.filter((ss) => ss.serviceId !== serviceId)
        );
        setServiceScopes((prev) =>
          prev.filter((sc) => sc.serviceId !== serviceId)
        );
        // Refresh data to ensure consistency
        await fetchData();
      } catch (err) {
        console.error("Error refreshing after service deletion:", err);
        setError("Failed to refresh data after deletion.");
      }
    },
    [fetchData]
  );

  const deleteSubService = useCallback(
    async (subServiceId) => {
      try {
        // Remove sub-service and its child service scopes from state
        setSubServices((prev) =>
          prev.filter((ss) => ss.subServiceId !== subServiceId)
        );
        setServiceScopes((prev) =>
          prev.filter((sc) => sc.subServiceId !== subServiceId)
        );
        // Refresh data to ensure consistency
        await fetchData();
      } catch (err) {
        console.error("Error refreshing after sub-service deletion:", err);
        setError("Failed to refresh data after deletion.");
      }
    },
    [fetchData]
  );

  const deleteServiceScope = useCallback(
    async (scopeId) => {
      try {
        setServiceScopes((prev) => prev.filter((sc) => sc.scopeId !== scopeId));
        // Refresh data to ensure consistency
        await fetchData();
      } catch (err) {
        console.error("Error refreshing after service scope deletion:", err);
        setError("Failed to refresh data after deletion.");
      }
    },
    [fetchData]
  );

  return (
    <ServiceContext.Provider
      value={{
        services,
        subServices,
        serviceScopes,
        loading,
        error,
        fetchData,
        addService,
        addSubService,
        addServiceScope,
        updateService,
        updateSubService,
        updateServiceScope,
        deleteService,
        deleteSubService,
        deleteServiceScope,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};
