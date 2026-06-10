import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { MenuItemCard } from "@/components/MenuItemCard";
import { CATEGORIES, DEFAULT_MENU, type MenuItem } from "@/data/menu";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu | Elena G Lomé" },
      { name: "description", content: "Découvrez le menu complet d'Elena G : grillades, fast food, plats du jour, snacks et boissons. À partir de 2500 F CFA." },
      { property: "og:title", content: "Menu | Elena G Lomé" },
      { property: "og:description", content: "Le menu complet d'Elena G — fast food, grillades, plats du jour." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const stored = typeof window !== "undefined" ? localStorage.getItem("elenaG_menu") : null;
  const initial: MenuItem[] = stored ? JSON.parse(stored) : DEFAULT_MENU;
  const [active, setActive] = useState<string>("All");
  const visible = useMemo(
    () => initial.filter((i) => i.available !== false && (active === "All" || i.category === active)),
    [active, initial],
  );

  return (
    <PageTransition>
      <section className="relative h-[55vh] min-h-[380px] flex items-end overflow-hidden">
        <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&auto=format&fit=crop" alt="Menu" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald/95 via-emerald/40 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 pb-14 text-white">
          <span className="text-yellow font-semibold tracking-widest text-xs uppercase">Menu</span>
          <h1 className="font-display text-6xl sm:text-7xl font-bold">Our Menu</h1>
          <p className="mt-3 text-white/90">From 2500 F CFA · Fresh, local, made to order.</p>
        </div>
      </section>

      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = active === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`relative shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold border transition ${
                    isActive ? "bg-emerald text-white border-emerald" : "border-border bg-card hover:border-emerald"
                  }`}
                >
                  {isActive && <motion.span layoutId="pill" className="absolute inset-0 bg-emerald rounded-full -z-10" />}
                  {cat}
                </button>
              );
            })}
          </div>
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {visible.map((i) => <MenuItemCard key={i.id} item={i} />)}
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
