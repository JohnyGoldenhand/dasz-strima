import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";

export const Navbar = () => {
    return (
        <nav className="bg-slate-500 w-full p-6 flex justify-between">
            <h1 className="text-white text-2xl font-semibold">Dasz Strima</h1>
            <SignedOut>
                <SignInButton/>
            </SignedOut>
            <SignedIn
            >
                <div className={"h-10 w-10"}>
                    <UserButton/>
                </div>
            </SignedIn>
        </nav>
    );
}