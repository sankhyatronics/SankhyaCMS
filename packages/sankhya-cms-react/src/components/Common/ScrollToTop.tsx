import { useEffect } from "react";
import { useLocation } from "react-router";

export function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // Force scroll to top on route change
    }, [pathname]);

    return null;
}
