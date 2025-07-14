import {SignInButton, UserButton} from "@clerk/nextjs";
import {Button} from "@/components/ui/button";
import {SignedIn, SignedOut} from "@clerk/nextjs";
import {Gamepad2} from "lucide-react";
import {User} from "lucide-react";
import Link from "next/link";


export const ClerkLoginButton = () => {
        return (
            <>
                <SignedOut>
                    <SignInButton mode="modal">
                        <Button className={"cursor-pointer bg-[#7E61AB] text-slate-50 hover:text-slate-600"}>
                            <Gamepad2/>Login
                            with Discord
                        </Button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <div className={"flex gap-4"}>
                        <UserButton/>
                        
                        <Link href={"/user"}
                              className={"flex p-2 rounded-lg bg-slate-700 hover:bg-slate-600 cursor-pointer transition-all "}>
                            <User/>
                        </Link>
                    </div>
                </SignedIn>
            </>
        );
    }
;