import { motion } from "framer-motion";
import { Sparkles, Wine } from "lucide-react";
import type { Cocktail } from "@/data/menu";
import { formatCFA } from "@/data/menu";

export function CocktailCard({ c }: { c: Cocktail }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      className="glass-dark rounded-2xl overflow-hidden text-offwhite relative"
    >
      {c.signature && (
        <span className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 bg-yellow text-ink text-[10px] font-bold px-2 py-1 rounded-full">
          <Sparkles className="w-3 h-3" /> SIGNATURE
        </span>
      )}
      <div className="aspect-[4/5] overflow-hidden">
        <img src={c.image} alt={c.name} loading="lazy" className="w-full h-full object-cover" />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-emerald">
          <Wine className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-wider">Cocktail</span>
        </div>
        <h3 className="font-display font-bold text-xl mt-1">{c.name}</h3>
        <p className="text-sm text-offwhite/70 mt-1 line-clamp-2">{c.description}</p>
        <div className="mt-4 font-display font-bold text-yellow text-lg">{formatCFA(c.price)}</div>
      </div>
    </motion.article>
  );
}
