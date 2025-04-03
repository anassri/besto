import { useEffect, useState } from "react";
import {
    LARGE_MEDIA_QUERY,
    MEDIUM_MEDIA_QUERY,
} from "../constants/breakpoints.constants";
import { doesWindowExist, generateListener } from "../helpers/general.helpers";

export type Breakpoints = {
    isMedium: boolean;
    isLarge: boolean;
    isNotSmall: boolean;
};

export function useBreakpoints(): Breakpoints {
    if (doesWindowExist()) {
        const mediumMediaQueryList = window.matchMedia(MEDIUM_MEDIA_QUERY);
        const largeMediaQueryList = window.matchMedia(LARGE_MEDIA_QUERY);
        const [isMedium, setIsMedium] = useState(mediumMediaQueryList.matches);
        const [isLarge, setIsLarge] = useState(largeMediaQueryList.matches);

        const mediumListener = generateListener(setIsMedium);
        const largeListener = generateListener(setIsLarge);

        useEffect(() => {
            mediumMediaQueryList.addEventListener("change", mediumListener);
            largeMediaQueryList.addEventListener("change", largeListener);
            // remove listeners on unmount
            return () => {
                mediumMediaQueryList.removeEventListener(
                    "change",
                    mediumListener
                );
                largeMediaQueryList.removeEventListener(
                    "change",
                    largeListener
                );
            };
        }, []);

        return {
            isMedium,
            isLarge,
            isNotSmall: isMedium || isLarge,
        };
    } else {
        throw new Error("Breakpoints should not be used during SSR");
    }
}
