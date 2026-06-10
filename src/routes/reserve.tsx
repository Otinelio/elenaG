import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { BRAND, waLink } from "@/data/menu";

export const Route = createFileRoute("/reserve")({
  head: () => ({
    meta: [
      { title: "Reserve a Table | Elena G" },
      { name: "description", content: "Réservez votre table chez Elena G à Lomé. Ouvert tous les jours sauf mardi de 10h à minuit." },
      { property: "og:title", content: "Reserve a Table | Elena G" },
      { property: "og:description", content: "Book your table at Elena G in Lomé." },
    ],
  }),
  component: ReservePage,
});

function ReservePage() {
  const [form, setForm] = useState({ name: "", phone: "", date: "", time: "", guests: 2, note: "" });
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (!form.name || !form.phone || !form.date || !form.time) return setErr("All fields marked required.");
    const today = new Date(); today.setHours(0,0,0,0);
    if (new Date(form.date) < today) return setErr("Date cannot be in the past.");
    const [h, m] = form.time.split(":").map(Number);
    const mins = h * 60 + m;
    if (mins < 600 || mins > 23*60+30) return setErr("Time must be between 10:00 and 23:30.");
    const msg = `Hello ${BRAND.name}! Reservation request:\nName: ${form.name}\nDate: ${form.date}\nTime: ${form.time}\nGuests: ${form.guests}\nNote: ${form.note || "-"}`;
    window.open(waLink(msg), "_blank");
    setDone(true);
  };

  if (done) {
    return (
      <PageTransition>
        <section className="min-h-[80vh] flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald text-white flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h1 className="font-display text-4xl font-bold mt-6">Request sent!</h1>
            <p className="text-muted-foreground mt-3">We'll confirm your reservation shortly via WhatsApp.</p>
            <button onClick={() => { setDone(false); setForm({ name: "", phone: "", date: "", time: "", guests: 2, note: "" }); }} className="mt-6 px-6 py-3 rounded-full bg-ink text-offwhite font-semibold">New reservation</button>
          </div>
        </section>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <section className="bg-emerald text-white py-20 px-6 text-center">
        <span className="text-yellow text-xs tracking-widest font-bold">— RESERVE —</span>
        <h1 className="font-display text-5xl sm:text-7xl font-extrabold mt-3">Book Your Table</h1>
        <p className="mt-4 text-white/80">Open every day except Tuesday · 10:00 – 00:00</p>
      </section>
      <section className="py-16 px-6">
        <form onSubmit={submit} className="max-w-2xl mx-auto bg-card rounded-3xl p-6 sm:p-10 border border-border space-y-4 shadow-sm">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Name *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <Input label="Phone *" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
            <Input label="Date *" type="date" value={form.date} onChange={(v) => setForm({ ...form, date: v })} min={new Date().toISOString().slice(0,10)} />
            <Input label="Time *" type="time" value={form.time} onChange={(v) => setForm({ ...form, time: v })} min="10:00" max="23:30" />
            <Input label="Guests" type="number" value={String(form.guests)} onChange={(v) => setForm({ ...form, guests: Number(v) })} min="1" max="20" />
          </div>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Notes</span>
            <textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} rows={3} className="mt-1 w-full px-4 py-3 rounded-xl border border-border bg-background" />
          </label>
          {err && <p className="text-paprika text-sm">{err}</p>}
          <button type="submit" className="w-full py-3.5 rounded-full bg-emerald text-white font-semibold hover:scale-[1.01] transition">Send Reservation</button>
        </form>
      </section>
    </PageTransition>
  );
}

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> & {
  label: string;
  value: string;
  onChange: (v: string) => void;
};
function Input({ label, value, onChange, ...rest }: InputProps) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <input {...rest} value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full px-4 py-3 rounded-xl border border-border bg-background" />
    </label>
  );
}
