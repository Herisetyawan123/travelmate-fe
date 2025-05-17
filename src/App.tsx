
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import AddNewTripPage from "./pages/AddNewTripPage";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MyTripsPage from "./pages/MyTripsPage.tsx";
import TripDetailsPage from "./pages/TripDetailsPage";
import ItineraryPage from "./pages/ItineraryPage";
import BudgetPage from "./pages/BudgetPage";
import ChecklistPage from "./pages/ChecklistPage";
import MapPage from "./pages/MapPage";
import NotFound from "./pages/NotFound";
import TripsPage from "./pages/TripsPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Protected Routes */}
              <Route path="/mytrips" element={
                <ProtectedRoute>
                  <Layout><MyTripsPage /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/trips" element={
                <ProtectedRoute>
                  <Layout><TripsPage /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/trips/new" element={
                <ProtectedRoute>
                  <Layout><AddNewTripPage /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Layout><ProfilePage /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/trips/:tripId" element={
                <ProtectedRoute>
                  <Layout><TripDetailsPage /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/trips/:tripId/itinerary" element={
                <ProtectedRoute>
                  <Layout><ItineraryPage /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/trips/:tripId/budget" element={
                <ProtectedRoute>
                  <Layout><BudgetPage /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/trips/:tripId/checklist" element={
                <ProtectedRoute>
                  <Layout><ChecklistPage /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/trips/:tripId/map" element={
                <ProtectedRoute>
                  <Layout><MapPage /></Layout>
                </ProtectedRoute>
              } />

              {/* Catch All Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);

export default App;
