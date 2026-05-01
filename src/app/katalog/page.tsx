"use client";

import { useState } from "react";
import KatalogSidebar from "@/components/katalog/katalog-sidebar";
import KatalogHeader from "@/components/katalog/katalog-header";
import KatalogView from "@/components/katalog/katalog-view";

export default function KatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState("000");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* DDC Sidebar - Full height left */}
      <KatalogSidebar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Content Area - Header and Body on the right */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <KatalogHeader toggleSidebar={() => setIsSidebarOpen(true)} />
        <KatalogView selectedCategory={selectedCategory} />
      </div>
    </>
  );
}
