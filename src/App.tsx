
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import TripDetailsPage from "./pages/TripDetailsPage";
import ItineraryPage from "./pages/ItineraryPage";
import BudgetPage from "./pages/BudgetPage";
import ChecklistPage from "./pages/ChecklistPage";
import MapPage from "./pages/MapPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected Routes (would require authentication in a real app) */}
          <Route path="/dashboard" element={<Layout><DashboardPage /></Layout>} />
          <Route path="/trips/:tripId" element={<Layout><TripDetailsPage /></Layout>} />
          <Route path="/trips/:tripId/itinerary" element={<Layout><ItineraryPage /></Layout>} />
          <Route path="/trips/:tripId/budget" element={<Layout><BudgetPage /></Layout>} />
          <Route path="/trips/:tripId/checklist" element={<Layout><ChecklistPage /></Layout>} />
          <Route path="/trips/:tripId/map" element={<Layout><MapPage /></Layout>} />
          
          {/* Catch All Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
