import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";

export const Navbar = () => {
    return (
        <nav className="bg-slate-500 w-full">
            <SignedOut>
                <SignInButton/>
            </SignedOut>
            <SignedIn>
                <UserButton/>
            </SignedIn>
        </nav>
    );
}