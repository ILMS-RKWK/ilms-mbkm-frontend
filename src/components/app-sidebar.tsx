"use client";

import * as React from "react";
import {
  IconDashboard,
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
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";

const NAV_DATA = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: IconDashboard,
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
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <Image
                  src="/icon-marketing.png"
                  alt="Marketing Systems"
                  width={32}
                  height={32}
                />
                <span className="text-base font-semibold">
                  Rumah Kreatif Wadas Kelir | Library System
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={NAV_DATA.navMain} />
        <NavSecondary items={NAV_DATA.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  );
}
