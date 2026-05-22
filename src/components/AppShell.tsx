"use client";
import { useApp } from "@/contexts/AppContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HomePage from "./pages/HomePage";
import TicketsPage from "./pages/TicketsPage";
import CheckoutPage from "./pages/CheckoutPage";
import AudioGuidePage from "./pages/AudioGuidePage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import ContactPage from "./pages/ContactPage";
import HistoryPage from "./pages/HistoryPage";
import GalleryPage from "./pages/GalleryPage";
import WaterMinePage from "./pages/WaterMinePage";
import GardensPage from "./pages/GardensPage";
import ThePlacesPage from "./pages/ThePlacesPage";

export default function AppShell() {
  const { route } = useApp();

  // Normalize route (strip query string for matching)
  const path = route.split("?")[0];

  const renderPage = () => {
    if (path === "/" || path === "") return <HomePage />;
    if (path === "/tickets") return <TicketsPage />;
    if (path === "/checkout") return <CheckoutPage />;
    if (path === "/audio-guide") return <AudioGuidePage />;
    if (path === "/the-places") return <ThePlacesPage />;
    if (path === "/water-mine") return <WaterMinePage />;
    if (path === "/gardens") return <GardensPage />;
    if (path === "/login") return <AuthPage defaultMode="login" />;
    if (path === "/signup") return <AuthPage defaultMode="signup" />;
    if (path === "/forgot-password") return <AuthPage defaultMode="forgot" />;
    if (path === "/activate") return <AuthPage defaultMode="activate" />;
    if (path.startsWith("/profile")) return <ProfilePage />;
    if (path === "/contact") return <ContactPage />;
    if (path === "/history") return <HistoryPage />;
    if (path === "/gallery") return <GalleryPage />;

    // 404
    return (
      <div className="flex min-h-screen flex-col items-center justify-center text-center px-6 pt-24">
        <div className="flex items-center gap-3 mb-6">
          <span className="h-4 w-4 rotate-45 bg-[#1d3a8a] inline-block" />
          <span className="h-4 w-4 rotate-45 bg-[#8e1d2c] inline-block" />
          <span className="h-4 w-4 rotate-45 bg-[#1f6f4a] inline-block" />
        </div>
        <h1 className="font-serif text-6xl text-primary">404</h1>
        <p className="mt-4 text-secondary">Page not found</p>
        <button
          onClick={() => (window.location.hash = "/")}
          className="mt-8 rounded-md bg-[#0f0e0c] px-6 py-3 text-[11px] font-medium uppercase tracking-widest text-[#faf6ee]"
        >
          Return Home
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
    </div>
  );
}
