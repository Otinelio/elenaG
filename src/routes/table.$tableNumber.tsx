import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CheckCircle2, LayoutGrid, Minus, Plus, Trash2 } from "lucide-react";
import { CATEGORIES, DEFAULT_MENU, formatCFA, type MenuItem } from "@/data/menu";

export const Route = createFileRoute("/table/$tableNumber")({
  component: TablePage,
});

type Line = { id: string; name: string; price: number; qty: number };

function TablePage() {
  const { tableNumber } = Route.useParams();
  const stored = typeof window !== "undefined" ? localStorage.getItem("elenaG_menu") : null;
  const menu: MenuItem[] = stored ? JSON.parse(stored) : DEFAULT_MENU;
  const [cat, setCat] = useState<string>("All");
  const [items, setItems] = useState<Line[]>([]);
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);

  const visible = useMemo(
    () => menu.filter((m) => m.available !== false && (cat === "All" || m.category === cat)),
    [cat, menu],
  );
  const total = items.reduce((a, b) => a + b.price * b.qty, 0);

  const add = (m: MenuItem) => setItems((cur) => {
    const ex = cur.find((x) => x.id === m.id);
    if (ex) return cur.map((x) => (x.id === m.id ? { ...x, qty: x.qty + 1 } : x));
    return [...cur, { id: m.id, name: m.name, price: m.price, qty: 1 }];
  });
  const setQty = (id: string, qty: number) => setItems((cur) => qty <= 0 ? cur.filter((x) => x.id !== id) : cur.map((x) => x.id === id ? { ...x, qty } : x));

  const submit = () => {
    if (!name.trim() || items.length === 0) return;
    const order = {
      id: Date.now(),
      table: tableNumber,
      customerName: name,
      items: items.map(({ name, qty, price }) => ({ name, qty, price })),
      total,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
    };
    const cur = JSON.parse(localStorage.getItem("elenaG_orders") || "[]");
    localStorage.setItem("elenaG_orders", JSON.stringify([...cur, order]));
    setSent(true);
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-ink text-offwhite flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto rounded-full bg-emerald flex items-center justify-center"><CheckCircle2 className="w-10 h-10" /></div>
          <h1 className="font-display text-4xl font-bold mt-6">Order sent to the kitchen!</h1>
          <p className="text-offwhite/70 mt-3">We'll bring it to your table shortly.</p>
          <button onClick={() => { setSent(false); setItems([]); setName(""); }} className="mt-8 px-6 py-3 rounded-full bg-yellow text-ink font-semibold">Order more</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink text-offwhite">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(15,139,109,0.3),transparent_60%)] pointer-events-none" />
      <header className="relative text-center pt-8 pb-4 px-6 border-b border-white/10">
        <div className="font-display text-3xl font-bold"><span className="text-emerald">Elena</span> <span className="text-yellow">G</span></div>
        <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow text-ink font-bold">
          <LayoutGrid className="w-4 h-4" /> Table {tableNumber}
        </div>
      </header>

      <div className="relative px-4 py-6 pb-72">
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold border ${cat === c ? "bg-emerald text-white border-emerald" : "border-white/20 text-offwhite/80"}`}>{c}</button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {visible.map((m) => (
            <button key={m.id} onClick={() => add(m)} className="text-left bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-emerald transition">
              <div className="aspect-square overflow-hidden"><img src={m.image} alt={m.name} className="w-full h-full object-cover" loading="lazy" /></div>
              <div className="p-3">
                <div className="text-sm font-semibold leading-tight">{m.name}</div>
                <div className="text-yellow font-bold mt-1">{formatCFA(m.price)}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 inset-x-0 bg-ink border-t border-white/10 p-4 space-y-3 max-h-[60vh] overflow-y-auto">
        {items.length > 0 && (
          <div className="space-y-2">
            {items.map((l) => (
              <div key={l.id} className="flex items-center gap-2 text-sm">
                <span className="flex-1 truncate">{l.name}</span>
                <button onClick={() => setQty(l.id, l.qty - 1)} className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center"><Minus className="w-3 h-3" /></button>
                <span className="w-5 text-center font-semibold">{l.qty}</span>
                <button onClick={() => setQty(l.id, l.qty + 1)} className="w-7 h-7 rounded-full bg-emerald flex items-center justify-center"><Plus className="w-3 h-3" /></button>
                <span className="w-20 text-right font-semibold text-yellow">{formatCFA(l.price * l.qty)}</span>
                <button onClick={() => setQty(l.id, 0)} className="text-paprika"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
            <div className="flex justify-between font-bold pt-2 border-t border-white/10">
              <span>Total</span><span className="text-yellow">{formatCFA(total)} CFA</span>
            </div>
          </div>
        )}
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name *" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-offwhite placeholder:text-offwhite/40" />
        <button disabled={!name.trim() || items.length === 0} onClick={submit} className="w-full py-3.5 rounded-full bg-emerald text-white font-bold disabled:opacity-40">
          Send Order to Kitchen
        </button>
      </div>
    </div>
  );
}
