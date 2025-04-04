/**
 * check if window is defined.  Good for gating code that only executes on the client side
 */
export function doesWindowExist() {
    return typeof window !== "undefined";
}

/**
 * Generate a window listener
 */
export function generateListener(
    setter: React.Dispatch<React.SetStateAction<boolean>>
): EventListener {
    /**
     * Listen for media query changes
     */
    return function listen(ev: Event) {
        if (ev instanceof MediaQueryListEvent) {
            setter(ev.matches);
        }
    };
}

export function scrollToElement(id: string, headerOffset = 30) {
    const cleanId = id.startsWith("#") ? id.substring(1) : id;

    const element = document.getElementById(cleanId);

    if (!element) {
        return;
    }

    const elementPosition = element.getBoundingClientRect().top;
    // Determine offset position by adding element position with pageYOffset and subtracting the fixed header offset
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    const supportsNativeSmoothScroll =
        "scrollBehavior" in document.documentElement.style;

    // Check is "behavior: smooth" is supported by the browser
    if (supportsNativeSmoothScroll) {
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    } else {
        window.scrollTo(0, offsetPosition);
    }
}

export const determineErrorsList = (prevState: string[], error: string) => {
    if (prevState.includes(error)) {
        return prevState;
    } else {
        return [...prevState, error];
    }
};

export const determineIndefiniteArticle = (word: string) => {
    const firstLetter = word.charAt(0).toLowerCase();
    const vowels = ["a", "e", "i", "o", "u"];
    return vowels.includes(firstLetter) ? "an" : "a";
};

export const getAgeText = (age: number, shouldAddPeriod = false) => {
    if (age === 0) {
        return "a puppy!";
    } else if (age === 1) {
        return `${age} year old${shouldAddPeriod ? "." : ""}`;
    } else {
        return `${age} years old${shouldAddPeriod ? "." : ""}`;
    }
};
