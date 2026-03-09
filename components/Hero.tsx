"use indeterminate";
"use client";

import { motion, Variants } from "framer-motion";
import { Github, Linkedin, ArrowRight, Code } from "lucide-react";

export default function Hero() {
    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const item: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
    };

    return (
        <section id="home" className="min-h-screen flex items-center pt-20 pb-12 relative overflow-hidden bg-grid">
            {/* Subtle background motif */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] dark:opacity-[0.05]">
                <div className="w-[80vw] h-[80vw] max-w-3xl max-h-3xl rounded-full border-[100px] border-foreground" />
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="max-w-4xl"
                >
                    <motion.div variants={item} className="mb-6 flex items-center gap-3">
                        <span className="px-2 py-1 bg-te-gray-200 dark:bg-te-gray-800 text-xs font-mono uppercase tracking-widest text-te-gray-900 dark:text-te-gray-100 rounded-sm">
                            Status: Available
                        </span>
                        <span className="text-xs font-mono text-muted-foreground">v2.0.4</span>
                    </motion.div>

                    <motion.h1
                        variants={item}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] mb-6 text-balance"
                    >
                        Engineering <span className="text-te-orange italic pr-2">digital</span> experiences with purpose.
                    </motion.h1>

                    <motion.p
                        variants={item}
                        className="text-lg md:text-xl text-muted-foreground font-mono leading-relaxed mb-6 max-w-2xl text-balance"
                    >
                        Creative technologist and full-stack developer building thoughtful digital products and interactive software.
                    </motion.p>

                    <motion.p
                        variants={item}
                        className="text-sm md:text-base text-muted-foreground font-mono leading-relaxed mb-10 max-w-2xl"
                    >
                        Currently based in <span className="text-te-orange italic">New York City</span>.
                        Open to full-time opportunities and select freelance collaborations.
                    </motion.p>

                    <motion.div variants={item} className="flex flex-wrap items-center gap-4 mb-16">
                        <button
                            onClick={() => scrollTo("projects")}
                            className="px-6 py-3 bg-foreground text-background hover:bg-te-orange transition-colors font-mono text-sm uppercase flex items-center gap-2 group shadow-[4px_4px_0px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.1)] active:translate-y-1 active:shadow-none"
                        >
                            Init Projects <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={() => scrollTo("contact")}
                            className="px-6 py-3 bg-transparent border-2 border-border hover:border-foreground transition-colors font-mono text-sm uppercase shadow-[4px_4px_0px_rgba(0,0,0,0.05)] active:translate-y-1 active:shadow-none"
                        >
                            Contact_Me
                        </button>
                        <div className="flex items-center gap-2 ml-auto md:ml-4">
                            <a
                                href="https://github.com/frankdulko"
                                target="_blank"
                                rel="noreferrer"
                                className="w-12 h-12 flex items-center justify-center border-2 border-border hover:border-te-blue hover:text-te-blue transition-colors rounded-sm"
                                aria-label="GitHub"
                            >
                                <Github size={20} />
                            </a>
                            <a
                                href="https://linkedin.com/in/frankdulko"
                                target="_blank"
                                rel="noreferrer"
                                className="w-12 h-12 flex items-center justify-center border-2 border-border hover:border-te-blue hover:text-te-blue transition-colors rounded-sm"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </motion.div>

                    <motion.div variants={item} className="pt-8 border-t border-border/50">
                        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">Core Capabilities // What I build</p>
                        <div className="flex flex-wrap gap-x-8 gap-y-4">
                            {["Interactive UI/UX",
                                "Rapid Prototyping",
                                "Product Engineering",
                                "Full-Stack Development",
                                "Design Systems"].map((skill, i) => (
                                    <div key={skill} className="flex items-center gap-2 font-mono text-sm">
                                        <Code size={14} className="text-te-orange" />
                                        {skill}
                                    </div>
                                ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
