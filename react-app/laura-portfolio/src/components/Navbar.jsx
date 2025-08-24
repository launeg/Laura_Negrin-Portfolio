import { useEffect, useRef, useState, useCallback } from 'react';

const LINKS = [
    { id: 'home',                label: 'Home' },
    { id: 'about',              label: 'About' },
    { id: 'skills',            label: 'Skills' },
    { id: 'certs',              label: 'Certificates' },
    { id: 'experience',    label: 'Experience' },
    { id: 'contact',          label: 'Contact' },
];

const NAVBAR_HEIGHT = 84;            //any changes must also update CSS --nav-h
const CLICK_GRACE_MS = 700;      

export default function Navbar(){
    const [active, setActive] = useState('home');

    // ignore observer updates for a small grace period (issues with smooth scroll + click on navbar)
    const ignoreUntilRef = useRef(0);
    const ratiosRef = useRef(new Map());
    const go = useCallback((id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActive(id);
        ignoreUntilRef.current = performance.now() + CLICK_GRACE_MS;
    }, []);

    useEffect(() => {
        const sections = LINKS
            .map(({ id }) => document.getElementById(id))
            .filter(Boolean);

        if (!sections.length) return;

        // Initialize ratios of nav button spce
        LINKS.forEach(({ id }) => ratiosRef.current.set(id, 0));

        const pickBest = () => {
            //fallbacks
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

        // determine most visible section to set navbutton active state
        const io = new IntersectionObserver(
            (entries) => {
                if (performance.now() < ignoreUntilRef.current) return;

                for (const e of entries) {
                    const id = e.target.id;
                    ratiosRef.current.set(id, e.isIntersecting ? e.intersectionRatio : 0);
                }
                pickBest();
            },
            {
                root: null,
                rootMargin: `-${NAVBAR_HEIGHT}px 0px -60% 0px`,
                threshold: [0, 0.2, 0.35, 0.5, 0.75, 0.9],
            }
        );

        sections.forEach((sec) => io.observe(sec));

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