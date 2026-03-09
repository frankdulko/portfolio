export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-foreground text-background py-8 border-t-[10px] border-te-orange">
            <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border border-background/30 flex items-center justify-center font-mono font-bold text-xl">
                        <span className="text-te-orange">/</span>
                    </div>
                    <p className="font-mono text-xs uppercase tracking-widest opacity-70">
                        Frank Dulko &copy; {currentYear}
                    </p>
                </div>

                <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest opacity-70">
                    <p>Built with Next.js</p>
                    <div className="w-1 h-1 rounded-full bg-background/30" />
                    <p>Powered by Sanity</p>
                </div>
            </div>
        </footer>
    );
}
