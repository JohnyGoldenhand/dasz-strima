import {Container} from "@/components/Container";
import {SignOutButton, UserProfile} from "@clerk/nextjs";
import {currentUser} from '@clerk/nextjs/server'
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Film} from "lucide-react";

export default async function UserPage() {

    return (
        <main>
            <Container className="py-8">
                <div className="flex flex-row gap-6 justify-between">
                    {/* Sidebar */}
                    <div className="w-64 flex flex-col gap-4">
                        <Link href="/user/my-movies">
                            <Button className="w-full flex items-center gap-2" variant="outline">
                                <Film size={16}/>
                                My Rated Movies
                            </Button>
                        </Link>
                        <SignOutButton>
                            <Button
                                className="w-full bg-red-500 hover:bg-red-400 text-white cursor-pointer transition-all">
                                Sign Out
                            </Button>
                        </SignOutButton>
                    </div>

                    {/* Main content */}
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold mb-6">User Profile</h1>
                        <div className="w-full">
                            <UserProfile routing={"hash"}/>
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    );
}
