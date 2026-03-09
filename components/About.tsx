"use client";

import { motion } from "framer-motion";
import { Cpu, Maximize, Layers, Zap } from "lucide-react";

export default function About() {
    const capabilities = [
        { label: "Prototyping", icon: <Zap size={18} />, desc: "Exploring ideas through rapid, working prototypes." },
        { label: "UI Engineering", icon: <Layers size={18} />, desc: "Translating thoughtful design into responsive, interactive interfaces." },
        { label: "System Design", icon: <Maximize size={18} />, desc: "Designing maintainable application structures and data models." },
        { label: "Full Stack", icon: <Cpu size={18} />, desc: "Building complete applications from database to interface." },
    ];

    return (
        <section id="about" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">

                    <div className="md:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            <div className="inline-flex items-center gap-2 text-te-orange font-mono text-xs uppercase tracking-widest mb-6 border border-te-orange/30 px-2 py-1 rounded-sm bg-te-orange/10">
                                <div className="w-1.5 h-1.5 rounded-full bg-te-orange animate-pulse" />
                                Module 01: About
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">
                                Human-first<br />engineering.
                            </h2>

                            <div className="w-16 h-1 bg-foreground mb-6" />
                            <p className="text-xl md:text-2xl font-sans tracking-tight leading-snug text-foreground mb-8">
                                I'm a creative technologist and full-stack developer focused on building thoughtful digital products and interactive systems.
                            </p>
                            <p className="text-xl md:text-2xl font-sans tracking-tight leading-snug text-foreground mb-8">
                                My work sits at the intersection of design, software, and experimentation. I enjoy rapid prototyping, exploring new interfaces, and building tools that make complex ideas feel simple.
                            </p>
                            <div className="bg-te-gray-100 dark:bg-te-gray-800/50 border border-border p-6 font-mono text-sm">
                                <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Values // Operating Principles</h3>
                                <ul className="space-y-3 list-none p-0 m-0">
                                    <li className="flex gap-3">
                                        <span className="text-te-orange">01.</span>
                                        <span><strong>Start with the experience.
                                        </strong> Technology should support the product, not define it.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-te-blue">02.</span>
                                        <span><strong>Details shape the experience.</strong> Thoughtful interaction, motion, and typography make something enjoyable.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-te-green">03.</span>
                                        <span><strong>Build systems that can evolve.</strong> Clear structure and modular components make it easier to iterate, refactor, and grow a product over time.</span>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>
                    </div>

                    <div className="md:col-span-7 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="prose prose-lg dark:prose-invert prose-headings:font-sans prose-p:font-mono prose-p:text-base prose-p:leading-relaxed"
                        >
                            <h3 className="font-sans font-bold text-2xl mb-6 tracking-tight">Capabilities</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 not-prose">
                                {capabilities.map((cap, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="border border-border p-4 hover:border-foreground transition-colors group bg-card"
                                    >
                                        <div className="w-8 h-8 flex items-center justify-center bg-muted text-foreground mb-3 group-hover:bg-te-yellow group-hover:text-black transition-colors">
                                            {cap.icon}
                                        </div>
                                        <h4 className="font-bold text-sm uppercase tracking-tight mb-2">{cap.label}</h4>
                                        <p className="text-xs font-mono text-muted-foreground leading-relaxed">{cap.desc}</p>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="bg-te-gray-100 dark:bg-te-gray-800/50 border border-border p-6 font-mono text-sm mb-6">
                                <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Toolbox // Systems & Protocols</h3>
                                <ul className="space-y-3 list-none p-0 m-0">
                                    <li className="flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-te-orange" />
                                        <span><strong>Frontend.</strong> React • Next.js • TypeScript</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-te-blue" />
                                        <span><strong>Mobile.</strong> React Native • SwiftUI</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-te-green" />
                                        <span><strong>Backend.</strong> Node • Firebase</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-te-yellow" />
                                        <span><strong>Tools.</strong> Figma • Git</span>
                                    </li>
                                </ul>
                            </div>

                            <h3 className="font-sans font-bold text-2xl mb-6 tracking-tight">Education</h3>
                            <div className="flex flex-col gap-4 not-prose">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="border border-border p-4 hover:border-foreground transition-colors group bg-card flex justify-between items-center sm:items-start sm:flex-col gap-2"
                                >
                                    <div>
                                        <h4 className="font-bold text-sm uppercase tracking-tight mb-1 group-hover:text-te-orange transition-colors">New York University</h4>
                                        <p className="text-xs font-mono text-muted-foreground">MPS Interactive Telecommunications</p>
                                    </div>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                    className="border border-border p-4 hover:border-foreground transition-colors group bg-card flex justify-between items-center sm:items-start sm:flex-col gap-2"
                                >
                                    <div>
                                        <h4 className="font-bold text-sm uppercase tracking-tight mb-1 group-hover:text-te-orange transition-colors">Stony Brook University</h4>
                                        <p className="text-xs font-mono text-muted-foreground">BE Computer Engineering</p>
                                    </div>
                                </motion.div>
                            </div>

                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
