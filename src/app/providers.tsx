"use client";

import { ReactNode } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Toaster } from "sonner";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import React from "react";
import {
  fetchCountries,
  fetchPlaylists,
  fetchTracks,
  fetchArtists,
  fetchGenres,
  fetchAlbums,
  fetchUsers,
} from "@/lib/api/tables";
import { FieldOptionsProvider } from "@/contexts/FieldOptionsContext";
import { Option } from "@/components/ui/combobox";

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <InnerProviders>{children}</InnerProviders>
    </QueryClientProvider>
  );
}

export function InnerProviders({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  let hrefAcc = "";

  const { data: countries = [] } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });
  const { data: playlists = [] } = useQuery({
    queryKey: ["playlists"],
    queryFn: fetchPlaylists,
  });
  const { data: tracks = [] } = useQuery({
    queryKey: ["tracks"],
    queryFn: fetchTracks,
  });
  const { data: artists = [] } = useQuery({
    queryKey: ["artists"],
    queryFn: fetchArtists,
  });
  const { data: genres = [] } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });
  const { data: albums = [] } = useQuery({
    queryKey: ["albums"],
    queryFn: fetchAlbums,
  });
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const fieldOptions: Record<string, Option[]> = {
    countryId: countries.map((c) => ({ value: c.id, label: c.name })),
    playlistId: playlists.map((p) => ({ value: p.id, label: p.name })),
    trackId: tracks.map((t) => ({ value: t.id, label: t.title })),
    artistId: artists.map((a) => ({ value: a.id, label: a.name })),
    genreId: genres.map((g) => ({ value: g.id, label: g.name })),
    albumId: albums.map((a) => ({ value: a.id, label: a.title })),
    userId: users.map((u) => ({ value: u.id, label: u.username })),
  };

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 min-h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  {segments.map((segment, index) => {
                    hrefAcc += `/${segment}`;
                    return (
                      <React.Fragment key={index}>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                          {index === segments.length - 1 ? (
                            <BreadcrumbPage className="hidden md:block">
                              <BreadcrumbLink href={hrefAcc}>
                                {segment
                                  .replace(/[-_]/g, " ")
                                  .replace(/\b\w/g, (l) => l.toUpperCase())}
                              </BreadcrumbLink>
                            </BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink href={hrefAcc}>
                              {segment
                                .replace(/[-_]/g, " ")
                                .replace(/\b\w/g, (l) => l.toUpperCase())}
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                      </React.Fragment>
                    );
                  })}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <main className="flex h-full flex-col overflow-y-auto p-4 pt-0">
            <FieldOptionsProvider options={fieldOptions}>
              {children}
            </FieldOptionsProvider>
          </main>
        </SidebarInset>
      </SidebarProvider>

      <Toaster richColors />
    </>
  );
}
