"use client";

import { useState } from "react";

import Footer from "@/components/footer";
import { SidebarTrigger, SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "./app-sidebar";

const SideBarComponent = ({ children }) => {
  const [open, setOpen] = useState(true);
  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <AppSidebar setOpen={setOpen} />
      <SidebarTrigger open={open} />
      <main className="w-full p-4">{children}</main>
    </SidebarProvider>
  );
};

export default SideBarComponent;
