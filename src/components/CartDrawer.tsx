import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/store/cartStore";
import { BRAND, formatCFA, waLink } from "@/data/menu";

export function CartDrawer() {
  const { items, open, setOpen, setQty, remove, clear, total } = useCart();
  const [name, setName] = useState("");
  const [orderType, setOrderType] = useState<"Dine-in" | "Takeaway">("Takeaway");

  const checkout = () => {
    if (!items.length) return;
    const lines = items
      .map((i) => `${i.name} x${i.qty} — ${formatCFA(i.price * i.qty)}`)
      .join("\n");
    const msg = `Hello ${BRAND.name}! Here is my order:\n${lines}\nTOTAL: ${formatCFA(total())} CFA\nName: ${name || "Guest"}\nOrder type: ${orderType}`;
    window.open(waLink(msg), "_blank");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[60]"
            onClick={() => setOpen(false)}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-background z-[70] flex flex-col shadow-2xl"
          >
            <header className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-2 font-display text-xl font-bold">
                <ShoppingCart className="w-5 h-5 text-emerald" /> Your Order
              </div>
              <button onClick={() => setOpen(false)} className="p-2 hover:bg-muted rounded-full">
                <X className="w-5 h-5" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {items.length === 0 && (
                <div className="text-center text-muted-foreground py-12">
                  <ShoppingCart className="w-10 h-10 mx-auto mb-3 opacity-40" />
                  Your cart is empty.
                </div>
              )}
              {items.map((i) => (
                <div key={i.id} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
                  <div className="flex-1">
                    <div className="font-medium">{i.name}</div>
                    <div className="text-sm text-emerald font-semibold">{formatCFA(i.price)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setQty(i.id, i.qty - 1)} className="w-7 h-7 rounded-full bg-muted flex items-center justify-center"><Minus className="w-3 h-3" /></button>
                    <span className="w-6 text-center font-semibold">{i.qty}</span>
                    <button onClick={() => setQty(i.id, i.qty + 1)} className="w-7 h-7 rounded-full bg-emerald text-white flex items-center justify-center"><Plus className="w-3 h-3" /></button>
                  </div>
                  <button onClick={() => remove(i.id)} className="p-2 text-paprika hover:bg-paprika/10 rounded-full"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>

            {items.length > 0 && (
              <div className="p-5 border-t border-border space-y-3 bg-card">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background"
                />
                <div className="flex gap-2">
                  {(["Dine-in", "Takeaway"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setOrderType(t)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium border ${
                        orderType === t ? "bg-emerald text-white border-emerald" : "border-border"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-between text-lg">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-display font-bold">{formatCFA(total())} CFA</span>
                </div>
                <button
                  onClick={checkout}
                  className="w-full py-3 rounded-full bg-emerald text-white font-semibold hover:scale-[1.02] active:scale-95 transition"
                >
                  Send Order via WhatsApp
                </button>
                <button onClick={clear} className="w-full py-2 text-sm text-muted-foreground hover:text-paprika">
                  Clear cart
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
