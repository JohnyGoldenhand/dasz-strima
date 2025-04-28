import type {PropsWithChildren} from "react";

export const CarouselCardOverlayWrapper = ({children}: PropsWithChildren) => (
    <div
        className="flex flex-col gap-4 opacity-0 absolute bottom-0 left-0 right-0 bg-black bg-opacity-30 p-4 group-hover:opacity-100 transition-opacity duration-300 overflow-y-auto">
        {children}
    </div>
)
