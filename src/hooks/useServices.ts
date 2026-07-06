import { useEffect, useState } from "react";

import { Service } from "../modules/home/types/home";

import { getAllServices } from "../services/service.service";

export default function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchServices() {
    try {
      const data = await getAllServices();

      setServices(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchServices();
  }, []);

  return {
    services,
    loading,
    refresh: fetchServices,
  };
}