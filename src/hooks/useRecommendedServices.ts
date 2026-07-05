import { useEffect, useState } from "react";

import { Service } from "../modules/home/types/home";

import { getRecommendedServices } from "../services/service.service";

export default function useRecommendedServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      const data = await getRecommendedServices();

      setServices(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return {
    services,
    loading,
    refresh: fetchData,
  };
}