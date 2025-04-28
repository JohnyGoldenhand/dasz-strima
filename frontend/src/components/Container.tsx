import type {PropsWithChildren} from "react";
import classNames from "classnames";

export const Container = ({children, className}: PropsWithChildren<{ className?: string }>) => (
    <div className={classNames(`max-w-[1440px] mx-auto`, className)}>
        {children}
    </div>
)