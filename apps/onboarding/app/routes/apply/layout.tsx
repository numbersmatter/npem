import { Form, Link, Outlet } from "react-router";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarRail, SidebarTrigger } from "~/components/ui/sidebar";
import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";
import type { Route } from "./+types/layout";
import { ListOrderedIcon, Home, Inbox } from "lucide-react"


// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Food Pantry",
      url: "",

      items: [{
        title: "Home",
        url: "/",
        icon: Home,
      },

      ]
    }
    // {
    //   title: "Food Pantry Activities",
    //   url: "home",
    //   items: [
    //     {
    //       title: "Events",
    //       url: "/events",
    //     },
    //     {
    //       title: "Semesters",
    //       url: "/semesters",
    //     }
    //     // {
    //     //   title: "Applications",
    //     //   url: "/applications",
    //     // },
    //     // {
    //     //   title: "Users",
    //     //   url: "/users",
    //     // }
    //   ],
    // },
  ],
}
export const loader = async ({ request }: Route.LoaderArgs) => {
  return {};
};


export default function MainLayout() {
  return (
    <>
      <>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <PageHeader />
            <Outlet />
          </SidebarInset>
        </SidebarProvider>
      </>
    </>
  )
}
function PageHeader() {
  return (
    <header className="flex h-20 shrink-0 items-center px-6 border-b bg-emerald-50/80 dark:bg-emerald-900/80 shadow-sm">
      <SidebarTrigger className="-ml-1 mr-3" />
      <Separator orientation="vertical" className="mr-4 h-8" />
      <img
        src="/welcome/logo-light.svg"
        alt="Thomasville Food Pantry Logo"
        className="hidden dark:inline-block h-10 w-10 rounded-full mr-4 shadow-md bg-white"
      />
      <img
        src="/welcome/logo-dark.svg"
        alt="Thomasville Food Pantry Logo"
        className="inline-block dark:hidden h-10 w-10 rounded-full mr-4 shadow-md bg-white"
      />
      <div className="flex flex-col items-start">
        <h1 className="text-2xl font-bold text-emerald-800 dark:text-emerald-200 leading-tight">
          Thomasville Food Pantry
        </h1>
        <span className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">
          Serving our community with care
        </span>
      </div>
      <div className="flex-1" />
      {/* Add a Donate button or user avatar here if desired */}
    </header>
  )
}



function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className="bg-emerald-50/90 dark:bg-emerald-950/90 border-r border-emerald-100 dark:border-emerald-900 shadow-lg">
      <SidebarHeader className="flex flex-col items-center py-6">
        <img
          src="/welcome/logo-light.svg"
          alt="Thomasville Food Pantry Logo"
          className="hidden dark:inline-block h-14 w-14 rounded-full shadow bg-white mb-2"
        />
        <img
          src="/welcome/logo-dark.svg"
          alt="Thomasville Food Pantry Logo"
          className="inline-block dark:hidden h-14 w-14 rounded-full shadow bg-white mb-2"
        />
        <span className="text-lg font-bold text-emerald-800 dark:text-emerald-200">Thomasville Food Pantry</span>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="text-emerald-700 dark:text-emerald-300 font-semibold tracking-wide uppercase text-xs mb-1">
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="rounded-lg px-3 py-2 text-emerald-900 dark:text-emerald-100 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition">
                      <Link to={item.url}>
                        <item.icon className="mr-2 h-5 w-5 text-emerald-500 dark:text-emerald-300" />
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter className="flex flex-col items-center py-4 border-t border-emerald-100 dark:border-emerald-900">
        <Button
          variant="default"
          size="lg"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow"
          onClick={() => window.open('https://www.thomasvillefoodpantry.org/donate', '_blank')}
        >
          Donate
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}