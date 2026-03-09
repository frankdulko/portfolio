import { client } from "@/lib/sanity/client";
import { PROJECTS_QUERY, ProjectType } from "@/lib/sanity/queries";

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ProjectsSection from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Revalidate every hour, or use webhooks for on-demand revalidation
export const revalidate = 3600;

export default async function Home() {
  const projects = await client.fetch<ProjectType[]>(PROJECTS_QUERY);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-te-orange/30 selection:text-foreground">
      <Nav />
      <main>
        <Hero />
        <About />
        <ProjectsSection initialProjects={projects} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
