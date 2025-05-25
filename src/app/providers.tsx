"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  let hrefAcc = "";

  return (
    <QueryClientProvider client={queryClient}>
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
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>

      <Toaster richColors />
    </QueryClientProvider>
  );
}
