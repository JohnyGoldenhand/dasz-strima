import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem
} from "@/components/ui/sidebar";
import {Eye, ListVideo, PersonStanding} from "lucide-react";
import Link from "next/link";
import {ClerkLoginButton} from "@/components/Navigation/ClerkLoginButton";

export const AppSidebar = () => {

    const movieItems = [
        {title: "Listed to watch", url: "#", icon: <ListVideo/>},
        {title: "Watched", url: "#", icon: <Eye/>},
    ]

    const userItems = [
        {title: "Added by me", url: "#", icon: <PersonStanding/>},
    ]

    return (
        <Sidebar collapsible={"icon"}>
            <SidebarHeader className={"pt-4 group-data-[collapsible=icon]:hidden"}>
                <Link href="/" className={"text-xl font-bold hover:text-primary"}>
                    Dasz strima
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Movies</SidebarGroupLabel>
                    <SidebarMenu>
                        {movieItems.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <a href={item.url}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>User</SidebarGroupLabel>
                    <SidebarMenu>
                        {userItems.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <a href={item.url}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className={"pb-4 group-data-[collapsible=icon]:hidden"}>
                <ClerkLoginButton/>
            </SidebarFooter>
        </Sidebar>
    );
}