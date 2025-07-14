import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/components/ThemeProvider";
import {Navigation} from "@/components/Navigation";
import {ClerkProvider} from "@clerk/nextjs";
import {AppSidebar} from "@/components/AppSidebar";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Dasz strima",
    description: "Website to manage videos you watched with your friends",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable}`}
            >
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <div className="flex flex-col h-screen">
                    <div className="flex-1 flex">
                        <SidebarProvider>
                            <AppSidebar/>
                            <SidebarTrigger/>
                            <main className={"flex-1"}>
                                <Navigation/>
                                <div className={"px-8 py-6 max-w-screen"}>
                                    {children}
                                </div>
                            </main>
                        </SidebarProvider>
                    </div>
                </div>
            </ThemeProvider>
            </body>
            </html>
        </ClerkProvider>
    );
}
