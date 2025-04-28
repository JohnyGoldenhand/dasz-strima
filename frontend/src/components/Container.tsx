import type {PropsWithChildren} from "react";
import {cn} from "@/lib/utils";

export const Container = ({children, className}: PropsWithChildren<{ className?: string }>) => (
    <div className={cn(`max-w-[1440px] mx-auto`, className)}>
        {children}
    </div>
)