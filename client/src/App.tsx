import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PublicLayout } from "@/layouts/PublicLayout";
import { AdminLayout } from "@/layouts/AdminLayout";
import { AdminAuthProvider } from "@/context/AdminAuthContext";
import ProtectedAdminRoute from "@/routes/ProtectedAdminRoute";
import Index from "./pages/Index";
import Fleet from "./pages/Fleet";
import CarDetail from "./pages/CarDetail";
import About from "./pages/About";
import Services from "./pages/Services";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCars from "./pages/admin/AdminCars";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminSettings from "./pages/admin/AdminSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AdminAuthProvider>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/fleet" element={<Fleet />} />
              <Route path="/fleet/:id" element={<CarDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
            </Route>

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route element={<ProtectedAdminRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="cars" element={<AdminCars />} />
                <Route path="bookings" element={<AdminBookings />} />
                <Route path="messages" element={<AdminMessages />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AdminAuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
