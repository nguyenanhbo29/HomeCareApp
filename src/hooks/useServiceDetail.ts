import { useEffect, useState } from "react";
import { getServiceDetail} from "../services/service.service";

export default function useServiceDetail(id?: string) {
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    loadService();
  }, [id]);

  async function loadService() {
    try {
      setLoading(true);

      const data = await getServiceDetail(id!);

      setService(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    service,
    loading,
    reload: loadService,
  };
}