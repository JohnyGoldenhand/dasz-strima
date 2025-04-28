"use client";

import {Button} from "@/components/ui/button";
import {Gamepad2} from "lucide-react";

export const LoginDiscordButton = () => {

    const handleLogin = () => {
        window.location.href = "http://localhost:8000/oauth2/login/"; // auth user on backend
    };

    return (
        <Button className={"cursor-pointer bg-[#7E61AB] text-slate-50 hover:text-slate-600"}
                onClick={() => handleLogin()}>
            <Gamepad2/>Login
            with Discord
        </Button>
    );
}
