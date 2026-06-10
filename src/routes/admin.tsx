import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Clock, Copy, Plus, Trash2 } from "lucide-react";
import { PinGate } from "@/components/PinGate";
import { CATEGORIES, DEFAULT_MENU, formatCFA, type MenuItem } from "@/data/menu";

export const Route = createFileRoute("/admin")({
  component: () => (
    <PinGate pin="9999" title="Admin Dashboard">
      <Admin />
    </PinGate>
  ),
});

type Order = {
  id: number; table: string; customerName: string;
  items: { name: string; qty: number; price: number }[];
  total: number; status: string; createdAt: string;
};

function Admin() {
  const [tab, setTab] = useState<"menu" | "orders" | "hours">("menu");
  return (
    <div className="min-h-screen bg-offwhite">
      <header className="bg-ink text-offwhite py-5 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold"><span className="text-emerald">Elena G</span> · Admin</h1>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6">
          {(["menu", "orders", "hours"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-full text-sm font-semibold ${tab === t ? "bg-emerald text-white" : "bg-card border border-border"}`}>
              {t === "menu" ? "Menu Management" : t === "orders" ? "Order History" : "Opening Hours"}
            </button>
          ))}
        </div>
        {tab === "menu" && <MenuManagement />}
        {tab === "orders" && <OrderHistory />}
        {tab === "hours" && <HoursPanel />}
      </div>
    </div>
  );
}

function MenuManagement() {
  const [menu, setMenu] = useState<MenuItem[]>(() => {
    const s = localStorage.getItem("elenaG_menu");
    return s ? JSON.parse(s) : DEFAULT_MENU;
  });
  const [form, setForm] = useState({ name: "", category: "Fast Food", price: 0, image: "" });

  const save = (next: MenuItem[]) => { setMenu(next); localStorage.setItem("elenaG_menu", JSON.stringify(next)); };
  const toggle = (id: string) => save(menu.map((m) => m.id === id ? { ...m, available: m.available === false ? true : false } : m));
  const remove = (id: string) => save(menu.filter((m) => m.id !== id));
  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    save([...menu, { id: `c${Date.now()}`, ...form, available: true }]);
    setForm({ name: "", category: "Fast Food", price: 0, image: "" });
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <form onSubmit={add} className="bg-card rounded-2xl p-5 border border-border space-y-3 h-fit">
        <h3 className="font-display font-bold text-lg">Add Item</h3>
        <input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background" />
        <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background">
          {CATEGORIES.filter((c) => c !== "All").map((c) => <option key={c}>{c}</option>)}
        </select>
        <input required type="number" placeholder="Price (F CFA)" value={form.price || ""} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="w-full px-3 py-2 rounded-lg border border-border bg-background" />
        <input placeholder="Image URL (Unsplash)" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background" />
        <button className="w-full py-2.5 rounded-full bg-emerald text-white font-semibold flex items-center justify-center gap-1"><Plus className="w-4 h-4" /> Add</button>
      </form>
      <div className="lg:col-span-2 space-y-2">
        {menu.map((m) => (
          <div key={m.id} className="bg-card rounded-xl p-3 border border-border flex items-center gap-3">
            <img src={m.image} alt="" className="w-14 h-14 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <div className="font-semibold truncate">{m.name}</div>
              <div className="text-xs text-muted-foreground">{m.category} · {formatCFA(m.price)}</div>
            </div>
            <button onClick={() => toggle(m.id)} className={`px-3 py-1 rounded-full text-xs font-semibold ${m.available === false ? "bg-muted text-muted-foreground" : "bg-emerald/20 text-emerald"}`}>
              {m.available === false ? "Hidden" : "Visible"}
            </button>
            <button onClick={() => remove(m.id)} className="p-2 text-paprika hover:bg-paprika/10 rounded-full"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [status, setStatus] = useState("all");
  const [table, setTable] = useState("");
  useEffect(() => {
    const data: Order[] = JSON.parse(localStorage.getItem("elenaG_orders") || "[]");
    setOrders([...data].sort((a, b) => b.id - a.id));
  }, []);

  const filtered = orders.filter((o) => (status === "all" || o.status === status) && (table === "" || o.table.includes(table)));

  const copy = () => {
    const text = filtered.map((o) => {
      const items = o.items.map((i) => `  ${i.name} x${i.qty} — ${formatCFA(i.price * i.qty)}`).join("\n");
      return `Order #${o.id} · Table ${o.table} · ${o.customerName}\n${items}\nTotal: ${formatCFA(o.total)} CFA · ${o.status}\n`;
    }).join("\n");
    navigator.clipboard.writeText(text);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="px-3 py-2 rounded-lg border border-border bg-card">
          <option value="all">All statuses</option><option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="delivered">Delivered</option>
        </select>
        <input placeholder="Filter table…" value={table} onChange={(e) => setTable(e.target.value)} className="px-3 py-2 rounded-lg border border-border bg-card" />
        <button onClick={copy} className="ml-auto px-4 py-2 rounded-full bg-ink text-offwhite text-sm font-semibold flex items-center gap-2"><Copy className="w-4 h-4" /> Copy as text</button>
      </div>
      <div className="space-y-2">
        {filtered.length === 0 && <p className="text-center text-muted-foreground py-10">No orders match.</p>}
        {filtered.map((o) => (
          <div key={o.id} className="bg-card rounded-xl p-4 border border-border">
            <div className="flex justify-between items-center">
              <div><b>Table {o.table}</b> · {o.customerName}</div>
              <div className="text-xs text-muted-foreground">{new Date(o.createdAt).toLocaleString("fr-FR")}</div>
            </div>
            <ul className="text-sm text-muted-foreground mt-2">
              {o.items.map((i, idx) => <li key={idx}>{i.name} × {i.qty} — {formatCFA(i.price * i.qty)}</li>)}
            </ul>
            <div className="flex justify-between mt-2"><span className="text-xs uppercase tracking-wider text-muted-foreground">{o.status}</span><b>{formatCFA(o.total)} CFA</b></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HoursPanel() {
  return (
    <div className="bg-card rounded-2xl p-8 border border-border max-w-xl">
      <div className="flex items-center gap-3 mb-4">
        <Clock className="w-6 h-6 text-emerald" />
        <h3 className="font-display font-bold text-xl">Opening Hours</h3>
      </div>
      <p className="font-medium">Open Monday, Wednesday, Thursday, Friday, Saturday & Sunday</p>
      <p className="text-3xl font-display font-bold text-emerald mt-2">10:00 – 00:00</p>
      <p className="text-muted-foreground mt-3">Closed every Tuesday</p>
    </div>
  );
}
