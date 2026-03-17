import { useEffect, useState } from "react";
import { getPublicSettings } from "@/api/settingsApi";

export type PublicSettings = {
  companyName: string;
  email: string;
  phone: string;
  address: string;
  workingHours?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  whatsappNumber?: string;
};

export function usePublicSettings() {
  const [settings, setSettings] = useState<PublicSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicSettings().then(setSettings).catch(() => setSettings(null)).finally(() => setLoading(false));
  }, []);

  return { settings, loading };
}
