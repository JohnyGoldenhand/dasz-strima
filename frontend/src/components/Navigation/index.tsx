import {ThemeToggler} from "@/components/ThemeToggler";
import {Container} from "@/components/Container";
import {LoginDiscordButton} from "@/components/Navigation/LoginDiscordButton";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {User} from "lucide-react";


export const Navigation = () => {


    return (
        <nav className={"sticky top-0 left-0 bg-accent shadow-md z-10"}>
            <Container className={"flex justify-between items-center py-4"}>
                <Link href="/" className={"text-xl font-bold hover:text-primary"}>
                    Dasz strima
                </Link>
                <div className={"flex gap-4 items-center"}>
                    <LoginDiscordButton/>
                    <ThemeToggler/>
                </div>
            </Container>
        </nav>
    );
}
