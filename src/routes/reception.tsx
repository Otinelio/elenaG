import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { LayoutGrid } from "lucide-react";
import { PinGate } from "@/components/PinGate";
import { formatCFA } from "@/data/menu";

export const Route = createFileRoute("/reception")({
  component: () => (
    <PinGate pin="9999" title="Reception Dashboard">
      <Reception />
    </PinGate>
  ),
});

type Order = {
  id: number;
  table: string;
  customerName: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  status: "pending" | "confirmed" | "delivered";
  createdAt: string;
};

function timeAgo(iso: string) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return `${Math.floor(diff)}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

function Reception() {
  const [orders, setOrders] = useState<Order[]>([]);
  const prevIds = useRef<Set<number>>(new Set());

  useEffect(() => {
    const load = () => {
      const data: Order[] = JSON.parse(localStorage.getItem("elenaG_orders") || "[]");
      // chime when new pending appears
      const newOnes = data.filter((o) => o.status === "pending" && !prevIds.current.has(o.id));
      if (newOnes.length > 0 && prevIds.current.size > 0) {
        try {
          const audio = new Audio("data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=");
          audio.play().catch(() => { });
        } catch { }
      }
      prevIds.current = new Set(data.map((o) => o.id));
      setOrders([...data].sort((a, b) => b.id - a.id));
    };
    load();
    const i = setInterval(load, 5000);
    return () => clearInterval(i);
  }, []);

  const updateStatus = (id: number, status: Order["status"]) => {
    const data: Order[] = JSON.parse(localStorage.getItem("elenaG_orders") || "[]");
    const next = data.map((o) => (o.id === id ? { ...o, status } : o));
    localStorage.setItem("elenaG_orders", JSON.stringify(next));
    setOrders([...next].sort((a, b) => b.id - a.id));
  };

  const today = new Date().toDateString();
  const todays = orders.filter((o) => new Date(o.createdAt).toDateString() === today);
  const pending = todays.filter((o) => o.status === "pending").length;
  const delivered = todays.filter((o) => o.status === "delivered").length;
  const revenue = todays.filter((o) => o.status === "delivered").reduce((a, b) => a + b.total, 0);

  return (
    <div className="min-h-screen bg-offwhite">
      <header className="bg-ink text-offwhite py-5 px-6 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-display text-2xl font-bold"><span className="text-emerald">Elena G</span> · Reception</h1>
          <div className="flex gap-3 text-sm">
            <Stat label="Orders" value={todays.length} />
            <Stat label="Pending" value={pending} color="text-yellow" />
            <Stat label="Delivered" value={delivered} color="text-emerald" />
            <Stat label="Revenue" value={`${formatCFA(revenue)}`} />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-4">
        {orders.length === 0 && <p className="text-center text-muted-foreground py-20">No orders yet. New orders will appear here automatically.</p>}
        {orders.map((o) => {
          const compact = o.status !== "pending";
          return (
            <article key={o.id} className={`bg-card rounded-2xl border border-border p-5 ${compact ? "opacity-70" : "shadow-md"}`}>
              <header className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald text-white flex items-center justify-center"><LayoutGrid className="w-5 h-5" /></div>
                  <div>
                    <div className="font-display font-bold text-xl">Table {o.table}</div>
                    <div className="text-sm text-muted-foreground">{o.customerName} · {timeAgo(o.createdAt)}</div>
                  </div>
                </div>
                <StatusBadge status={o.status} />
              </header>
              {!compact && (
                <ul className="text-sm space-y-1 mb-3 border-t border-border pt-3">
                  {o.items.map((it, idx) => (
                    <li key={idx} className="flex justify-between">
                      <span>{it.name} × {it.qty}</span>
                      <span className="font-medium">{formatCFA(it.price * it.qty)}</span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg">{formatCFA(o.total)} CFA</span>
                <div className="flex gap-2">
                  {o.status === "pending" && <button onClick={() => updateStatus(o.id, "confirmed")} className="px-4 py-2 rounded-full bg-blue-500 text-white text-sm font-semibold">Confirm</button>}
                  {o.status !== "delivered" && <button onClick={() => updateStatus(o.id, "delivered")} className="px-4 py-2 rounded-full bg-emerald text-white text-sm font-semibold">Mark Delivered</button>}
                </div>
              </div>
            </article>
          );
        })}
      </main>
    </div>
  );
}

function Stat({ label, value, color = "" }: { label: string; value: string | number; color?: string }) {
  return (
    <div className="px-3">
      <div className="text-[10px] uppercase tracking-widest text-offwhite/60">{label}</div>
      <div className={`font-bold ${color}`}>{value}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: Order["status"] }) {
  const map = {
    pending: { dot: "bg-yellow", label: "Pending" },
    confirmed: { dot: "bg-blue-500", label: "Confirmed" },
    delivered: { dot: "bg-emerald", label: "Delivered" },
  } as const;
  const s = map[status];
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-xs font-semibold">
      <span className={`w-2 h-2 rounded-full ${s.dot}`} /> {s.label}
    </span>
  );
}
