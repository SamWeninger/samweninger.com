import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const links = [
  { href: "#moments", label: "Moments" },
  { href: "#work", label: "Work" },
  { href: "#career", label: "Career" },
  { href: "#education", label: "Education" },
];

const scrollTo = (href: string) => {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
};

const ThemeToggle = ({ className = "" }: { className?: string }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 text-muted-foreground hover:text-foreground transition-colors ${className}`}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "dark" ? <Sun className="w-[18px] h-[18px]" strokeWidth={1.5} /> : <Moon className="w-[18px] h-[18px]" strokeWidth={1.5} />}
    </button>
  );
};

const Header = () => {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.5);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 ${
          visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-full flex items-center justify-between px-4 sm:px-6 lg:px-10 py-3.5 bg-background/90 backdrop-blur-md border-b border-border/50">
          <button
            onClick={() => scrollTo("#top")}
            className="font-display text-sm tracking-[0.2em] uppercase hover:text-accent transition-colors"
          >
            SW
          </button>

          <nav className="hidden md:flex items-center gap-6 lg:gap-10">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="label-caps link-underline hover:text-foreground transition-colors"
              >
                {link.label}
              </button>
            ))}
            <ThemeToggle />
          </nav>

          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button onClick={() => setMenuOpen(!menuOpen)} className="label-caps" aria-label="Toggle menu">
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-8 md:hidden animate-fade-in">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => {
                scrollTo(link.href);
                setMenuOpen(false);
              }}
              className="font-display text-4xl uppercase tracking-tight hover:text-accent transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default Header;
