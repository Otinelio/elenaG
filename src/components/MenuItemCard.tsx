import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import type { MenuItem } from "@/data/menu";
import { formatCFA } from "@/data/menu";
import { useCart } from "@/store/cartStore";

export function MenuItemCard({ item }: { item: MenuItem }) {
  const add = useCart((s) => s.add);
  const setOpen = useCart((s) => s.setOpen);
  return (
    <motion.article
      layout
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-shadow"
    >
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <span className="inline-block text-[10px] tracking-wider uppercase font-semibold px-2 py-1 rounded-full bg-yellow/20 text-ink">
          {item.category}
        </span>
        <h3 className="font-display font-bold text-lg mt-2 leading-snug">{item.name}</h3>
        <div className="flex items-center justify-between mt-3">
          <span className="text-emerald font-bold text-lg">{formatCFA(item.price)}</span>
          <button
            onClick={() => {
              add({ id: item.id, name: item.name, price: item.price });
              setOpen(true);
            }}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-ink text-offwhite text-xs font-semibold hover:bg-emerald transition"
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </div>
      </div>
    </motion.article>
  );
}
