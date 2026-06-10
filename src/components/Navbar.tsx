import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingCart, X } from "lucide-react";
import { waLink } from "@/data/menu";
import { useCart } from "@/store/cartStore";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/cocktails", label: "Cocktails" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
  { to: "/reserve", label: "Reserve" },
] as const;

export function Navbar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const setCartOpen = useCart((s) => s.setOpen);
  const cartCount = useCart((s) => s.count());

  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const solid = scrolled || !isHome;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        solid ? "bg-ink text-offwhite shadow-lg" : "bg-transparent text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display text-2xl font-bold">
          <span className="text-emerald">Elena</span>
          <span className="text-yellow">G</span>
          <span className="w-2 h-2 rounded-full bg-yellow inline-block" />
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm font-medium relative py-1 transition-colors hover:text-yellow ${
                  active ? "text-yellow" : ""
                }`}
              >
                {l.label}
                {active && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-yellow rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 rounded-full hover:bg-white/10 transition"
            aria-label="Open cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-yellow text-ink text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <a
            href={waLink("Hello Elena G! I'd like to place an order:")}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center px-5 py-2 rounded-full bg-emerald text-white font-medium text-sm hover:scale-105 active:scale-95 transition-transform shadow-md"
          >
            Order Now
          </a>
          <button
            className="lg:hidden p-2 rounded-full hover:bg-white/10"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-ink border-t border-white/10"
          >
            <nav className="flex flex-col px-6 py-4 gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`py-3 text-base font-medium border-b border-white/5 ${
                    pathname === l.to ? "text-yellow" : "text-offwhite"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <a
                href={waLink("Hello Elena G! I'd like to place an order:")}
                target="_blank"
                rel="noreferrer"
                className="mt-3 text-center py-3 rounded-full bg-emerald text-white font-semibold"
              >
                Order Now
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
