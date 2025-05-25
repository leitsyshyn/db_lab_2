"use client";

import * as React from "react";
import {
  AlignHorizontalJustifyCenter,
  ChevronRight,
  SearchCode,
  Table,
  Table2,
  TableCellsSplit,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

import Link from "next/link";

const items = {
  tables: [
    {
      title: "Model",
      url: "#",
      icon: Table,
      isActive: true,
      items: [
        {
          title: "Albums",
          url: "/tables/model/albums",
        },
        {
          title: "Artists",
          url: "/tables/model/artists",
        },
        {
          title: "Genres",
          url: "/tables/model/genres",
        },
        {
          title: "Playlists",
          url: "/tables/model/playlists",
        },
        {
          title: "Tracks",
          url: "/tables/model/tracks",
        },
        {
          title: "Users",
          url: "/tables/model/users",
        },
      ],
    },
    {
      title: "Junction",
      url: "#",
      icon: TableCellsSplit,
      isActive: true,
      items: [
        {
          title: "PlaylistTrack",
          url: "/tables/junction/playlist_track",
        },
        {
          title: "TrackGenre",
          url: "/tables/junction/track_genre",
        },
      ],
    },
  ],
  queries: [
    {
      title: "Simple",
      url: "#",
      icon: SearchCode,
      isActive: false,
      items: [
        {
          title: "Query 1",
          url: "/queries/simple/query_1",
        },
        {
          title: "Query 2",
          url: "/queries/simple/query_2",
        },
        {
          title: "Query 3",
          url: "/queries/simple/query_3",
        },
        {
          title: "Query 4",
          url: "/queries/simple/query_4",
        },
        {
          title: "Query 5",
          url: "/queries/simple/query_5",
        },
      ],
    },
    {
      title: "Set Comparison",
      url: "#",
      icon: AlignHorizontalJustifyCenter,
      isActive: false,
      items: [
        {
          title: "Query 1",
          url: "/queries/set_comparison/query_1",
        },
        {
          title: "Query 2",
          url: "/queries/set_comparison/query_2",
        },
        {
          title: "Query 3",
          url: "/queries/set_comparison/query_3",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton size="lg">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Table2 />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Databases Lab №2</span>
            <span className="truncate text-xs">by Tymofii Leitsyshyn</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarGroupLabel>Tables</SidebarGroupLabel>
            {items.tables.map((item) => (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={subItem.url}>{subItem.title}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
            <SidebarGroupLabel>Queries</SidebarGroupLabel>
            {items.queries.map((item) => (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={subItem.url}>{subItem.title}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
