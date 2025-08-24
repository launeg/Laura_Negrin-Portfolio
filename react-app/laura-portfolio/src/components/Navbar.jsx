import { useEffect, useRef, useState, useCallback } from 'react';

const LINKS = [
    { id: 'home',                label: 'Home' },
    { id: 'about',              label: 'About' },
    { id: 'skills',            label: 'Skills' },
    { id: 'certs',              label: 'Certificates' },
    { id: 'experience',    label: 'Experience' },
    { id: 'contact',          label: 'Contact' },
];

const NAVBAR_HEIGHT = 84;            // keep in sync with your CSS --nav-h
const CLICK_GRACE_MS = 700;        // ignore observer updates right after a click

export default function Navbar(){
    const [active, setActive] = useState('home');

    // During a smooth scroll from a click, ignore observer updates for a short window
    const ignoreUntilRef = useRef(0);
    const ratiosRef = useRef(new Map()); // id -> latest intersectionRatio

    const go = useCallback((id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActive(id); // immediate feedback
        ignoreUntilRef.current = performance.now() + CLICK_GRACE_MS;
    }, []);

    useEffect(() => {
        const sections = LINKS
            .map(({ id }) => document.getElementById(id))
            .filter(Boolean);

        if (!sections.length) return;

        // Initialize ratios
        LINKS.forEach(({ id }) => ratiosRef.current.set(id, 0));

        const pickBest = () => {
            // Edge fallbacks
            const y = window.scrollY;
            const viewport = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;

            if (y <= 2) {
                setActive('home');
                return;
            }
            if (y + viewport >= docHeight - 2) {
                setActive('contact');
                return;
            }

            // Otherwise, pick the section with the highest ratio
            let bestId = active;
            let bestRatio = -1;
            for (const [id, ratio] of ratiosRef.current.entries()) {
                if (ratio > bestRatio) {
                    bestRatio = ratio;
                    bestId = id;
                }
            }
            if (bestId && bestId !== active) setActive(bestId);
        };

        const io = new IntersectionObserver(
            (entries) => {
                // Ignore updates right after a click-driven smooth scroll
                if (performance.now() < ignoreUntilRef.current) return;

                // Update ratios and choose best
                for (const e of entries) {
                    const id = e.target.id;
                    ratiosRef.current.set(id, e.isIntersecting ? e.intersectionRatio : 0);
                }
                pickBest();
            },
            {
                root: null,
                // Move the top boundary down by nav height, shrink bottom to bias top-most section
                rootMargin: `-${NAVBAR_HEIGHT}px 0px -60% 0px`,
                // Include 0 so the top section can register even with tiny overlap; others smooth values
                threshold: [0, 0.2, 0.35, 0.5, 0.75, 0.9],
            }
        );

        sections.forEach((sec) => io.observe(sec));

        // Also handle manual top/bottom edges during normal scrolling
        let raf = 0;
        const onScroll = () => {
            if (performance.now() < ignoreUntilRef.current) return;
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => pickBest());
        };
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            io.disconnect();
            window.removeEventListener('scroll', onScroll);
            cancelAnimationFrame(raf);
        };
    }, [active]);

    return (
        <nav className="navbar">
            <div className="brand">Laura Negrin</div>
            <ul className="nav-links">
                {LINKS.map(({ id, label }) => (
                    <li key={id}>
                        <button
                            onClick={() => go(id)}
                            className={active === id ? 'active' : ''}
                        >
                            {label}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}