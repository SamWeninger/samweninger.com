import { useEffect, useState } from "react";
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

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-4 flex items-center justify-between bg-background/80 backdrop-blur-md border-b border-border/50">
          <button
            onClick={() => scrollTo("#top")}
            className="font-display text-sm tracking-[0.2em] uppercase hover:text-accent transition-colors"
          >
            SW
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="label-caps link-underline hover:text-foreground transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={toggleTheme}
              className="label-caps hover:text-accent transition-colors"
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? "Dark" : "Light"}
            </button>
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden label-caps"
            aria-label="Toggle menu"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
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
          <button onClick={toggleTheme} className="label-caps mt-4">
            {theme === "light" ? "Dark mode" : "Light mode"}
          </button>
        </div>
      )}
    </>
  );
};

export default Header;
