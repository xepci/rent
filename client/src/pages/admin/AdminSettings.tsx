import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getSettings, updateSettings } from "@/api/settingsApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type SettingsForm = { companyName: string; email: string; phone: string; address: string; workingHours: string; facebookUrl: string; instagramUrl: string; whatsappNumber: string; };
const defaultForm: SettingsForm = { companyName: "", email: "", phone: "", address: "", workingHours: "", facebookUrl: "", instagramUrl: "", whatsappNumber: "" };

export default function AdminSettings() {
  const [form, setForm] = useState<SettingsForm>(defaultForm);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { (async () => { try { setLoading(true); const data = await getSettings(); setForm({ companyName: data.companyName || "", email: data.email || "", phone: data.phone || "", address: data.address || "", workingHours: data.workingHours || "", facebookUrl: data.facebookUrl || "", instagramUrl: data.instagramUrl || "", whatsappNumber: data.whatsappNumber || "" }); } catch (error: any) { toast.error(error?.response?.data?.message || "Failed to load settings"); } finally { setLoading(false); } })(); }, []);

  const setField = (key: keyof SettingsForm, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try { setSubmitting(true); await updateSettings(form); toast.success("Settings updated successfully"); }
    catch (error: any) { toast.error(error?.response?.data?.message || "Failed to update settings"); }
    finally { setSubmitting(false); }
  };

  if (loading) return <div>Loading settings...</div>;

  return (
    <div className="space-y-6"><div><h1 className="font-display text-2xl font-bold">Settings</h1><p className="text-sm text-muted-foreground">Update company information shown on the public website.</p></div><Card><CardContent className="p-6"><form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2"><div className="space-y-2"><Label>Company name</Label><Input value={form.companyName} onChange={(e) => setField("companyName", e.target.value)} required /></div><div className="space-y-2"><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => setField("email", e.target.value)} required /></div><div className="space-y-2"><Label>Phone</Label><Input value={form.phone} onChange={(e) => setField("phone", e.target.value)} required /></div><div className="space-y-2"><Label>WhatsApp number</Label><Input value={form.whatsappNumber} onChange={(e) => setField("whatsappNumber", e.target.value)} /></div><div className="space-y-2 md:col-span-2"><Label>Address</Label><Input value={form.address} onChange={(e) => setField("address", e.target.value)} required /></div><div className="space-y-2 md:col-span-2"><Label>Working hours</Label><Input value={form.workingHours} onChange={(e) => setField("workingHours", e.target.value)} /></div><div className="space-y-2"><Label>Facebook URL</Label><Input value={form.facebookUrl} onChange={(e) => setField("facebookUrl", e.target.value)} /></div><div className="space-y-2"><Label>Instagram URL</Label><Input value={form.instagramUrl} onChange={(e) => setField("instagramUrl", e.target.value)} /></div><div className="md:col-span-2 flex justify-end"><Button type="submit" disabled={submitting}>{submitting ? "Saving..." : "Save settings"}</Button></div></form></CardContent></Card></div>
  );
}
