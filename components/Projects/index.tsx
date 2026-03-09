"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectType } from "@/lib/sanity/queries";
import { ProjectCard } from "./ProjectCard";

export default function ProjectsSection({ initialProjects }: { initialProjects: ProjectType[] }) {
    const [activeTag, setActiveTag] = useState<string>("All");
    const [expandedId, setExpandedId] = useState<string | null>(null);

    // Define allowed filter tags
    const allTags = [
        "React",
        "React Native",
        "TypeScript",
        "Expo",
        "Node.js",
        "Unity",
        "Arduino"
    ];

    const filteredProjects = activeTag === "All"
        ? initialProjects
        : initialProjects.filter(p =>
            p.tags?.some(t => t.toLowerCase() === activeTag.toLowerCase())
        );

    return (
        <section id="projects" className="py-24 bg-te-gray-100 dark:bg-te-gray-900 border-y border-border relative">
            <div className="absolute top-0 right-10 w-[1px] h-full bg-border/50 hidden md:block" />
            <div className="absolute top-0 left-10 w-[1px] h-full bg-border/50 hidden md:block" />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 text-te-blue font-mono text-xs uppercase tracking-widest mb-4 border border-te-blue/30 px-2 py-1 rounded-sm bg-te-blue/10">
                            <div className="w-1.5 h-1.5 rounded-full bg-te-blue animate-pulse" />
                            Module 02: Output
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Selected Works</h2>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => { setActiveTag("All"); setExpandedId(null); }}
                            className={`text-xs font-mono px-3 py-1.5 border transition-colors ${activeTag === "All"
                                ? "bg-foreground text-background border-foreground shadow-[2px_2px_0px_rgba(0,0,0,0.2)] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.2)]"
                                : "bg-background text-foreground border-border hover:border-foreground/50"
                                }`}
                        >
                            All
                        </button>
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => { setActiveTag(tag); setExpandedId(null); }}
                                className={`text-xs font-mono px-3 py-1.5 border transition-colors ${activeTag === tag
                                    ? "bg-foreground text-background border-foreground shadow-[2px_2px_0px_rgba(0,0,0,0.2)] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.2)]"
                                    : "bg-background text-foreground border-border hover:border-foreground/50"
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <ProjectCard
                                key={project._id}
                                project={project}
                                expanded={expandedId === project._id}
                                onToggle={() => setExpandedId(expandedId === project._id ? null : project._id)}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProjects.length === 0 && (
                    <div className="w-full py-24 flex flex-col items-center justify-center border border-dashed border-border text-center">
                        <p className="font-mono text-muted-foreground uppercase tracking-widest mb-2">[ NO_RESULTS_FOUND ]</p>
                        <button onClick={() => setActiveTag("All")} className="text-te-blue hover:underline text-sm font-mono">Reset Filter</button>
                    </div>
                )}
            </div>
        </section>
    );
}
