import { useState } from "react";
import { toast } from "sonner";
import { createContactMessage } from "@/api/contactApi";
import { usePublicSettings } from "@/hooks/usePublicSettings";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { settings } = usePublicSettings();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await createContactMessage({ name, email, phone, subject, message });
      toast.success("Message sent successfully");
      setName(""); setEmail(""); setPhone(""); setSubject(""); setMessage("");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to send message");
    } finally { setSubmitting(false); }
  };

  return (
    <div className="container mx-auto px-4 py-10"><div className="grid gap-8 lg:grid-cols-2"><div className="space-y-6"><div><h1 className="font-display text-3xl font-bold">Contact Us</h1><p className="text-muted-foreground">Send us a message and our team will get back to you.</p></div><Card><CardContent className="p-6 space-y-3"><p><strong>Company:</strong> {settings?.companyName || "Xepci Rent"}</p><p><strong>Email:</strong> {settings?.email || "info@xepcirent.com"}</p><p><strong>Phone:</strong> {settings?.phone || "+383 44 000 000"}</p><p><strong>Address:</strong> {settings?.address || "Pejë, Kosovo"}</p>{settings?.workingHours ? <p><strong>Working hours:</strong> {settings.workingHours}</p> : null}</CardContent></Card></div><Card><CardContent className="p-6"><form onSubmit={handleSubmit} className="grid gap-4"><Input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required /><Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /><Input placeholder="Phone (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} /><Input placeholder="Subject (optional)" value={subject} onChange={(e) => setSubject(e.target.value)} /><Textarea className="min-h-[160px]" placeholder="Your message" value={message} onChange={(e) => setMessage(e.target.value)} required /><Button type="submit" disabled={submitting}>{submitting ? "Sending..." : "Send message"}</Button></form></CardContent></Card></div></div>
  );
}
