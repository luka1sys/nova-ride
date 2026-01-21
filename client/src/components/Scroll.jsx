import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollAnimations = () => {
    const location = useLocation();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate");
                    }
                });
            },
            { threshold: 0.2 }
        );

        const elements = document.querySelectorAll(".animate-on-scroll");
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [location.pathname]); // <-- ახლა ყოველი გვერდის ცვლილებისას განახლდება

    return null;
};

export default ScrollAnimations;