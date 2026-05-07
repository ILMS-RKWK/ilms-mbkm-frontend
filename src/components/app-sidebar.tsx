"use client";

import * as React from "react";
import {
  IconLayoutGrid,
  IconBook,
  IconUsers,
  IconClipboardList,
  IconChartBar,
  IconSettings,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

const NAV_DATA = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: IconLayoutGrid,
    },
    {
      title: "Manajemen Buku",
      url: "/admin/buku",
      icon: IconBook,
    },
    {
      title: "Manajemen Anggota",
      url: "/admin/anggota",
      icon: IconUsers,
    },
    {
      title: "Permintaan Pinjam",
      url: "/admin/permintaan",
      icon: IconClipboardList,
    },
  ],
  navSecondary: [
    {
      title: "Analitik",
      url: "/admin/analitik",
      icon: IconChartBar,
    },
    {
      title: "Pengaturan",
      url: "/admin/pengaturan",
      icon: IconSettings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();

  const userData = {
    name: session?.user?.name || "Guest",
    email: session?.user?.email || "No Email",
    avatar: session?.user?.image || "/icon-marketing.png",
  };

  return (
    <Sidebar collapsible="offcanvas" className="border-r-0 bg-white" {...props}>
      <SidebarHeader className="pt-4 pb-6 px-4 border-b border-slate-100/60">
        <div className="flex items-center gap-3">
          <div className="flex aspect-square size-[42px] items-center justify-center rounded-2xl bg-[#98BF4A] text-white shadow-[0_6px_16px_-4px_rgba(152,191,74,0.5)]">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Open book */}
              <path d="M2 6s1.5-2 5-2 5 2 5 2v14s-1.5-1-5-1-5 1-5 1V6z" />
              <path d="M12 6s1.5-2 5-2 5 2 5 2v14s-1.5-1-5-1-5 1-5 1V6z" />
              {/* Upward arrow / bookmark */}
              <path d="M12 3v3" />
              <path d="M10 4l2-2 2 2" />
            </svg>
          </div>
          <div className="flex flex-col gap-1 leading-none mt-1">
            <span className="text-[20px] font-black tracking-wide text-[#232B39]">
              WADAS KELIR
            </span>
            <span className="text-[9px] font-bold tracking-widest text-[#94A3B8] uppercase">
              Library System
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <NavMain items={NAV_DATA.navMain} />
        <NavSecondary items={NAV_DATA.navSecondary} />
      </SidebarContent>
      <SidebarFooter className="border-t border-slate-100/60 py-2 bg-white">
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  );
}
