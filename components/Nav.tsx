"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUp, Menu, X } from "lucide-react";

function ScrambleText() {
    const [text, setText] = useState("FRANK_DULKO");
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const normalText = "FRANK_DULKO";
    const hoverText = "SYS_ONLINE";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_/";

    const triggerScramble = (target: string) => {
        let iteration = 0;
        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setText(() =>
                target.split("").map((letter, index) => {
                    if (index < iteration) {
                        return target[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join("")
            );

            if (iteration >= target.length) {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }

            iteration += 1 / 2;
        }, 30);
    };

    // Keep fixed width so it doesn't shift the nav during scramble (11 chars max)
    return (
        <span
            className="group-hover:text-te-orange transition-colors inline-block w-[11ch]"
            onMouseEnter={() => triggerScramble(hoverText)}
            onMouseLeave={() => triggerScramble(normalText)}
        >
            {text}
        </span>
    );
}

export default function Nav() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileMenuOpen]);

    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-te-orange origin-left z-50 mix-blend-difference"
                style={{ scaleX }}
            />
            <header
                className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled
                    ? "bg-background/80 backdrop-blur-md border-b border-border/50 py-3"
                    : "bg-transparent py-5"
                    }`}
            >
                <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
                    <div
                        className="text-sm font-mono font-semibold tracking-tighter cursor-pointer select-none flex items-center gap-2 group z-50"
                        onClick={() => {
                            scrollTo("home");
                            setIsMobileMenuOpen(false);
                        }}
                    >
                        <div className="w-2 h-2 rounded-full bg-te-green animate-pulse" />
                        <ScrambleText />
                    </div>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center gap-6 text-sm font-mono tracking-tight">
                        {["home", "about", "projects", "contact"].map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollTo(item)}
                                className="hover:text-te-orange transition-colors uppercase relative group"
                            >
                                <span>{item}</span>
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-te-orange group-hover:w-full transition-all duration-300" />
                            </button>
                        ))}
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-foreground hover:text-te-orange transition-colors z-50 p-2 -mr-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <motion.div
                            initial={false}
                            animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </motion.div>
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 z-30 bg-background/50 backdrop-blur-xl flex flex-col items-center justify-center md:hidden"
                    >
                        <nav className="flex flex-col items-center gap-8 text-2xl font-mono tracking-widest mt-16">
                            {["home", "about", "projects", "contact"].map((item, i) => (
                                <motion.button
                                    key={`mobile-${item}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ delay: i * 0.1, duration: 0.3 }}
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setTimeout(() => scrollTo(item), 300);
                                    }}
                                    className="hover:text-te-orange transition-colors uppercase group relative py-2 px-8"
                                >
                                    <span className="relative z-10">{item}</span>
                                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-te-orange group-hover:w-full transition-all duration-300" />
                                </motion.button>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Back to top FAB */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: scrolled ? 1 : 0, scale: scrolled ? 1 : 0.8 }}
                onClick={() => scrollTo("home")}
                className="fixed bottom-6 right-6 w-10 h-10 bg-foreground text-background rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform z-40"
                aria-label="Back to top"
            >
                <ArrowUp size={18} />
            </motion.button>
        </>
    );
}
