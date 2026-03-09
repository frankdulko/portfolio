"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Mail, FastForward } from "lucide-react";

export default function Contact() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // Basic honeypot check
        if (data.website) {
            setStatus("error");
            setMessage("Bot detected.");
            return;
        }

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setStatus("success");
            } else {
                const err = await res.json();
                setStatus("error");
                setMessage(err.error || "Failed to send message.");
            }
        } catch (err) {
            setStatus("error");
            setMessage("A network error occurred.");
        }
    };

    return (
        <section id="contact" className="py-24 relative overflow-hidden bg-grid">
            <div className="container mx-auto px-6 md:px-12">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-12 text-center">
                        <div className="inline-flex items-center gap-2 text-te-green font-mono text-xs uppercase tracking-widest mb-4 border border-te-green/30 px-2 py-1 rounded-sm bg-te-green/10">
                            <div className="w-1.5 h-1.5 rounded-full bg-te-green animate-pulse" />
                            Module 03: Connect
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">Initialize<br />Handshake.</h2>
                        <p className="font-mono text-muted-foreground max-w-lg mx-auto">
                            Looking for a technical partner or have a project in mind? Transmit your message below or reach out directly.
                        </p>
                    </div>

                    <div className="mb-12 p-6 md:p-8 bg-card border border-border shadow-[4px_4px_0px_rgba(0,0,0,0.05)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.05)] relative overflow-hidden group">
                        {/* Motif lines */}
                        <div className="absolute top-0 right-0 w-32 h-full bg-grid opacity-20 pointer-events-none" />

                        <h3 className="font-bold text-xl font-sans mb-3 group-hover:text-te-orange transition-colors">Target Parameters // Expected Output</h3>
                        <p className="font-mono text-sm text-foreground/80 mb-6 max-w-3xl leading-relaxed">
                            Currently exploring full-time software engineering or creative technology roles, and I'm also open to select freelance collaborations.                        </p>

                        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">Prioritized Operational Domains:</p>
                        <ul className="flex flex-wrap gap-2 md:gap-3 font-mono text-sm">
                            <li className="bg-background border border-border px-3 py-1.5 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-te-orange" /> interactive products
                            </li>
                            <li className="bg-background border border-border px-3 py-1.5 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-te-blue" /> design-driven engineering
                            </li>
                            <li className="bg-background border border-border px-3 py-1.5 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-te-green" /> experimental interfaces
                            </li>
                            <li className="bg-background border border-border px-3 py-1.5 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-te-yellow" />
                                consumer apps
                            </li>
                        </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-12 bg-card border border-border shadow-2xl p-6 md:p-10 relative">
                        {/* Decorative corner pieces */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-foreground" />
                        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-foreground" />
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-foreground" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-foreground" />

                        {/* Direct contact info */}
                        <div className="md:col-span-2 flex flex-col font-mono text-sm border-r-0 md:border-r border-border md:pr-10">
                            <h3 className="font-bold text-lg font-sans mb-6">Direct Channels</h3>

                            <div className="space-y-6">
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Protocol: SMTP</p>
                                    <a href="mailto:frankdulko@gmail.com" className="flex items-center gap-2 hover:text-te-blue transition-colors group">
                                        <Mail size={16} />
                                        <span className="group-hover:underline">frankdulko@gmail.com</span>
                                    </a>
                                </div>

                                <div className="w-full h-[1px] bg-border/50" />

                                <div>
                                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Protocol: HTTP</p>
                                    <div className="flex flex-col gap-3">
                                        <a href="https://github.com/frankdulko" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-te-orange transition-colors group">
                                            <FastForward size={14} /> GitHub: /frankdulko
                                        </a>
                                        <a href="https://linkedin.com/in/frankdulko" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-te-orange transition-colors group">
                                            <FastForward size={14} /> LinkedIn: /in/frankdulko
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="md:col-span-3">
                            {status === "success" ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-center p-8 bg-te-green/5 border border-te-green/20"
                                >
                                    <CheckCircle2 size={48} className="text-te-green mb-4" />
                                    <h3 className="text-2xl font-bold mb-2">Transmission Received</h3>
                                    <p className="font-mono text-sm text-muted-foreground mb-6">Your payload has been delivered successfully. I'll process it shortly.</p>
                                    <button
                                        onClick={() => setStatus("idle")}
                                        className="font-mono text-xs uppercase tracking-widest border-b border-foreground pb-1 hover:text-te-green hover:border-te-green transition-colors"
                                    >
                                        Send Another
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                    {/* Honeypot */}
                                    <div className="hidden" aria-hidden="true">
                                        <label htmlFor="website">Website</label>
                                        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="name" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">ID // Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                className="bg-transparent border border-border px-4 py-3 font-mono text-sm focus:outline-none focus:border-foreground transition-colors"
                                                placeholder="e.g. John Doe"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="email" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Return Address // Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                className="bg-transparent border border-border px-4 py-3 font-mono text-sm focus:outline-none focus:border-foreground transition-colors"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="message" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Payload // Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows={5}
                                            className="bg-transparent border border-border px-4 py-3 font-mono text-sm focus:outline-none focus:border-foreground transition-colors resize-none"
                                            placeholder="Enter message body here..."
                                        />
                                    </div>

                                    {status === "error" && (
                                        <div className="flex items-start gap-2 text-red-500 font-mono text-xs bg-red-500/10 p-3 border border-red-500/20">
                                            <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                                            <p>Error: {message}</p>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === "submitting"}
                                        className="mt-2 bg-foreground text-background py-4 px-6 flex items-center justify-center gap-2 font-mono text-sm uppercase tracking-widest hover:bg-te-orange transition-colors disabled:opacity-70 disabled:cursor-not-allowed group shadow-[4px_4px_0px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.1)] active:translate-y-1 active:shadow-none"
                                    >
                                        {status === "submitting" ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                Transmit Payload <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
