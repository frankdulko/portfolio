"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { ExternalLink, X, Play, Trophy } from "lucide-react";
import { ProjectType } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import Image from "next/image";

const portableTextComponents: PortableTextComponents = {
    block: {
        h1: ({ children }) => <h1 className="text-3xl font-sans font-bold mt-8 mb-4 tracking-tight text-foreground">{children}</h1>,
        h2: ({ children }) => <h2 className="text-2xl font-sans font-bold mt-8 mb-4 tracking-tight text-foreground">{children}</h2>,
        h3: ({ children }) => <h3 className="text-xl font-sans font-bold mt-6 mb-3 tracking-tight text-foreground">{children}</h3>,
        h4: ({ children }) => <h4 className="text-lg font-sans font-bold mt-4 mb-2 tracking-tight text-foreground">{children}</h4>,
        normal: ({ children }) => <p className="font-mono text-sm mb-2 leading-relaxed text-muted-foreground">{children}</p>,
        blockquote: ({ children }) => <blockquote className="border-l-2 border-foreground pl-4 italic text-muted-foreground my-6 font-mono text-sm py-2">{children}</blockquote>,
    },
    list: {
        bullet: ({ children }) => <ul className="list-disc pl-5 mb-6 font-mono text-sm text-muted-foreground space-y-2">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal pl-5 mb-6 font-mono text-sm text-muted-foreground space-y-2">{children}</ol>,
    },
    listItem: {
        bullet: ({ children }) => <li className="pl-1 marker:text-foreground/50">{children}</li>,
        number: ({ children }) => <li className="pl-1 marker:text-foreground/50">{children}</li>,
    },
    marks: {
        strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        code: ({ children }) => <code className="bg-muted px-1.5 py-0.5 font-mono text-xs border border-border text-foreground">{children}</code>,
        link: ({ children, value }) => {
            const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
            return (
                <a
                    href={value?.href}
                    target={target}
                    rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                    className="text-foreground underline decoration-foreground/30 hover:decoration-foreground transition-colors"
                >
                    {children}
                </a>
            );
        },
    },
};

export function ProjectCard({ project, expanded, onToggle }: { project: ProjectType; expanded: boolean; onToggle: () => void }) {
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    return (
        <motion.div
            layout
            className={`flex flex-col h-full border border-border bg-card transition-colors ${expanded ? 'col-span-1 md:col-span-2 shadow-xl border-foreground z-10' : 'hover:border-foreground/50'}`}
        >
            <div
                className="p-4 cursor-pointer group flex flex-col flex-grow"
                onClick={onToggle}
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1 pr-4">
                        <h3 className="font-sans font-bold text-xl md:text-2xl tracking-tight mb-2 group-hover:text-te-orange transition-colors">
                            {project.title}
                        </h3>
                        {project.award && (
                            <div className="inline-flex items-center gap-1 text-te-yellow font-bold text-xs font-mono uppercase tracking-widest bg-te-yellow/5 px-2 py-0.5 mb-2 border border-te-yellow/30">
                                <Trophy size={10} /> {project.award}
                            </div>
                        )}
                        <p className="text-sm font-mono text-muted-foreground line-clamp-2">
                            {project.description}
                        </p>
                    </div>
                    <motion.div
                        animate={{ rotate: expanded ? 45 : 0 }}
                        className="w-8 h-8 flex-shrink-0 flex items-center justify-center border border-border group-hover:bg-foreground group-hover:text-background transition-colors"
                    >
                        <X size={16} className={expanded ? "block" : "hidden"} />
                        <div className={`w-3 h-3 border-r-2 border-b-2 transform -rotate-45 ${expanded ? "hidden" : "block"}`} />
                    </motion.div>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto pt-4">
                    {project.tags?.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs font-mono px-2 py-1 bg-muted border border-border text-muted-foreground whitespace-nowrap">
                            {tag}
                        </span>
                    ))}
                    {(project.tags?.length || 0) > 3 && (
                        <span className="text-xs font-mono px-2 py-1 text-muted-foreground">+{project.tags!.length - 3}</span>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-border overflow-hidden"
                    >
                        <div className="p-4 md:p-8 bg-muted/30">

                            {(project.videoId || (project.images && project.images.length > 0)) && (
                                <div className="mb-8 border border-border bg-background p-2">

                                    <div className="flex flex-col gap-2">
                                        <div className="aspect-video relative overflow-hidden bg-te-gray-100 dark:bg-te-gray-900 flex items-center justify-center">
                                            <Image
                                                src={urlFor(project.images![activeImageIndex] || project.images![0]).url()}
                                                alt={`${project.title} image ${activeImageIndex + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        {project.images!.length > 1 && (
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {project.images!.map((img, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => setActiveImageIndex(idx)}
                                                        className={`relative w-16 sm:w-24 aspect-video flex-shrink-0 overflow-hidden border-2 transition-all ${activeImageIndex === idx ? 'border-foreground opacity-100' : 'border-transparent opacity-60 hover:opacity-100 hover:border-foreground/50'}`}
                                                        aria-label={`View image ${idx + 1}`}
                                                        type="button"
                                                    >
                                                        <Image
                                                            src={urlFor(img).url()}
                                                            alt={`${project.title} thumbnail ${idx + 1}`}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="md:col-span-2">
                                    {project.body ? (
                                        <div className="flex flex-col">
                                            <PortableText value={project.body as any} components={portableTextComponents} />
                                        </div>
                                    ) : (
                                        <p className="text-muted-foreground italic font-mono text-sm leading-relaxed">{project.description}</p>
                                    )}
                                    {project.videoId && (
                                        <div className="aspect-video relative bg-black overflow-hidden mt-6">
                                            <iframe
                                                src={`https://www.youtube.com/embed/${project.videoId}`}
                                                title={project.title}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className="absolute inset-0 w-full h-full border-0"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col gap-6 font-mono text-sm border-l border-border pl-6">
                                    {project.tags && project.tags.length > 0 && (
                                        <div>
                                            <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Tech_Stack</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tags.map(tag => (
                                                    <span key={tag} className="px-2 py-1 bg-background border border-border text-xs">{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {project.url && (
                                        <div className="mt-auto pt-4">
                                            <a
                                                href={project.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-2 px-4 py-3 bg-foreground text-background hover:bg-te-blue transition-colors uppercase font-bold tracking-tight text-xs group"
                                            >
                                                {project.cta || "View Live Project"}
                                                <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ml-auto" />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
