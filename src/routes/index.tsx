import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Clock, MapPin, MessageCircle, Utensils, Wine } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { MenuItemCard } from "@/components/MenuItemCard";
import { CocktailCard } from "@/components/CocktailCard";
import { BRAND, COCKTAILS, DEFAULT_MENU, waLink } from "@/data/menu";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Elena G | Restaurant & Fast Food à Lomé" },
      { name: "description", content: "Restaurant, fast food & cocktail bar à Agoè-Zongo, Lomé. Plats à partir de 2500 F CFA. Ouvert tous les jours sauf mardi." },
      { property: "og:title", content: "Elena G | Restaurant & Fast Food à Lomé" },
      { property: "og:description", content: "Good Food. Good Vibes. Agoè-Zongo, Lomé." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <StatsBar />
      <Featured />
      <CocktailsSpotlight />
      <Ambiance />
      <HoursBanner />
      <WhatsAppCta />
      <ReservationForm />
    </PageTransition>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 300]);
  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&auto=format&fit=crop"
          alt="Elena G ambiance"
          className="w-full h-[120%] object-cover"
        />
        <div className="absolute inset-0 bg-ink/60" />
      </motion.div>
      <div className="relative z-10 text-center text-white max-w-4xl px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-yellow/90 text-ink text-xs font-bold tracking-widest uppercase mb-6">
            Restaurant · Fast Food · Cocktails
          </span>
          <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl leading-[0.95]">
            Good Food. <br /><span className="text-yellow">Good Vibes.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
            Restaurant & Fast Food · Lomé, Agoè-Zongo · Open from 10h to midnight
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link to="/menu" className="px-7 py-3.5 rounded-full bg-emerald text-white font-semibold hover:scale-105 active:scale-95 transition shadow-xl">
              See the Menu
            </Link>
            <Link to="/reserve" className="px-7 py-3.5 rounded-full border-2 border-yellow text-yellow font-semibold hover:bg-yellow hover:text-ink transition">
              Reserve a Table
            </Link>
          </div>
        </motion.div>
      </div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 z-10"
      >
        <ChevronDown className="w-7 h-7" />
      </motion.div>
    </section>
  );
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const start = performance.now();
        const dur = 1200;
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);
  return <span ref={ref}>{n.toLocaleString("fr-FR")}{suffix}</span>;
}

function StatsBar() {
  const stats = [
    { label: "From", value: <><Counter value={2500} /> F CFA</> },
    { label: "Open", value: <><Counter value={6} /> days / 7</> },
    { label: "Hours", value: "10h – Midnight" },
    { label: "Location", value: "Agoè-Zongo" },
  ];
  return (
    <section className="bg-emerald text-white py-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
            <div className="text-[10px] uppercase tracking-widest text-white/70">{s.label}</div>
            <div className="font-display font-bold text-2xl sm:text-3xl mt-1">{s.value}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Featured() {
  const featuredIds = ["gr2", "ff1", "pj1", "ac1", "sn1", "ff2"];
  const items = featuredIds.map((id) => DEFAULT_MENU.find((m) => m.id === id)!).filter(Boolean);
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-emerald font-semibold tracking-widest text-xs uppercase">Best Sellers</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2">What We're Known For</h2>
          <p className="text-muted-foreground mt-3">Crowd favorites from our kitchen, prepared fresh daily.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((i) => <MenuItemCard key={i.id} item={i} />)}
        </div>
        <div className="text-center mt-10">
          <Link to="/menu" className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-ink text-offwhite font-semibold hover:bg-emerald transition">
            See Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
}

function CocktailsSpotlight() {
  const featured = COCKTAILS.slice(0, 3);
  return (
    <section className="relative py-24 px-6 bg-ink text-offwhite overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(15,139,109,0.4),transparent_60%)]" />
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-yellow font-semibold tracking-widest text-xs uppercase">The Bar</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2">The Bar is Open</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 overflow-x-auto">
          {featured.map((c) => <CocktailCard key={c.id} c={c} />)}
        </div>
        <div className="text-center mt-10">
          <Link to="/cocktails" className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-yellow text-ink font-bold hover:scale-105 transition">
            <Wine className="w-4 h-4" /> Explore Cocktails Menu
          </Link>
        </div>
      </div>
    </section>
  );
}

function Ambiance() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-3xl overflow-hidden aspect-[4/5] lg:aspect-[5/6]">
          <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop" alt="Restaurant interior" className="w-full h-full object-cover" loading="lazy" />
        </motion.div>
        <div>
          <span className="text-emerald font-semibold tracking-widest text-xs uppercase">Experience</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2">More Than a Meal</h2>
          <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
            Elena G is a modern bistro in the heart of Agoè — where great food meets a lively cocktail bar.
            Whether you're stopping by for a quick burger, a slow grilled chicken with friends, or a midnight
            mojito, you'll find a space made for good moments.
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {["Accessible prices", "Every day except Tuesday", "Until midnight"].map((t) => (
              <span key={t} className="px-4 py-2 rounded-full bg-yellow/30 text-ink text-sm font-medium">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HoursBanner() {
  return (
    <section className="bg-yellow text-ink py-6 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
        <Clock className="w-6 h-6 shrink-0" />
        <div>
          <p className="font-display font-bold text-base sm:text-lg">
            Open Monday, Wednesday, Thursday, Friday, Saturday & Sunday · 10:00 – 00:00
          </p>
          <p className="text-sm opacity-80">Closed every Tuesday</p>
        </div>
      </div>
    </section>
  );
}

function WhatsAppCta() {
  return (
    <section className="bg-emerald text-white py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-display text-4xl sm:text-5xl font-bold">Order in 30 seconds</h2>
        <p className="mt-4 text-white/80 text-lg">Send us your order directly via WhatsApp and we'll have it ready for you.</p>
        <a href={waLink("Hello Elena G! I'd like to place an order:")} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-emerald font-bold hover:scale-105 transition shadow-xl">
          <MessageCircle className="w-5 h-5" /> Order via WhatsApp
        </a>
      </div>
    </section>
  );
}

function ReservationForm() {
  const [form, setForm] = useState({ name: "", phone: "", date: "", time: "", guests: 2, note: "" });
  const [err, setErr] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (!form.name || !form.phone || !form.date || !form.time) {
      setErr("Please fill all required fields.");
      return;
    }
    const today = new Date(); today.setHours(0, 0, 0, 0);
    if (new Date(form.date) < today) { setErr("Date cannot be in the past."); return; }
    const [h, m] = form.time.split(":").map(Number);
    const mins = h * 60 + m;
    if (mins < 600 || mins > 23 * 60 + 30) { setErr("Time must be between 10:00 and 23:30."); return; }
    const msg = `Hello ${BRAND.name}! Reservation request:\nName: ${form.name}\nDate: ${form.date}\nTime: ${form.time}\nGuests: ${form.guests}\nNote: ${form.note || "-"}`;
    window.open(waLink(msg), "_blank");
  };

  return (
    <section className="py-20 px-6 bg-card">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-emerald font-semibold tracking-widest text-xs uppercase">Book Your Table</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2">Reserve Online</h2>
        </div>
        <form onSubmit={submit} className="bg-background rounded-3xl p-6 sm:p-8 border border-border space-y-4 shadow-sm">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Name *"><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" /></Field>
            <Field label="Phone *"><input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" /></Field>
            <Field label="Date *"><input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="input" min={new Date().toISOString().slice(0, 10)} /></Field>
            <Field label="Time *"><input type="time" required value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="input" min="10:00" max="23:30" /></Field>
            <Field label="Guests"><input type="number" min={1} max={20} value={form.guests} onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })} className="input" /></Field>
          </div>
          <Field label="Special request"><textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} className="input min-h-[80px]" /></Field>
          {err && <p className="text-paprika text-sm">{err}</p>}
          <button type="submit" className="w-full py-3.5 rounded-full bg-emerald text-white font-semibold hover:scale-[1.01] transition">
            Send Reservation via WhatsApp
          </button>
        </form>
      </div>
      <style>{`.input{width:100%;padding:0.7rem 0.9rem;border-radius:0.7rem;border:1px solid var(--color-border);background:var(--color-background);outline:none}.input:focus{border-color:var(--color-emerald)}`}</style>
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

import type { ReactNode } from "react";
