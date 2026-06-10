import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { BRAND, waLink } from "@/data/menu";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Elena G Lomé" },
      { name: "description", content: "Contactez Elena G — Agoè-Zongo, RN1, derrière Hôpital Dogta-Lafiè, Lomé. +228 711 40812." },
      { property: "og:title", content: "Contact | Elena G" },
      { property: "og:description", content: "Get in touch with Elena G in Lomé." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) return;
    const msg = `Hello ${BRAND.name}!\nName: ${form.name}\nPhone: ${form.phone}\nMessage: ${form.message}`;
    window.open(waLink(msg), "_blank");
  };

  return (
    <PageTransition>
      <section className="bg-ink text-offwhite py-24 px-6 text-center">
        <span className="text-yellow text-xs tracking-widest font-bold">— CONTACT —</span>
        <h1 className="font-display text-6xl sm:text-7xl font-extrabold mt-3">Get In Touch</h1>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">
          <div className="space-y-5">
            {[
              { icon: MapPin, label: "Address", value: BRAND.address },
              { icon: Clock, label: "Hours", value: "Monday, Wednesday, Thursday, Friday, Saturday, Sunday — 10:00 to 00:00 · Closed Tuesdays" },
              { icon: Phone, label: "Phone", value: BRAND.phoneDisplay },
              { icon: MessageCircle, label: "WhatsApp", value: BRAND.phoneDisplay, href: waLink("Hello Elena G!") },
            ].map((it, i) => {
              const Content = (
                <div className="flex gap-4 p-5 rounded-2xl bg-card border border-border hover:border-emerald transition">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-emerald text-white flex items-center justify-center"><it.icon className="w-5 h-5" /></div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">{it.label}</div>
                    <div className="font-medium mt-1">{it.value}</div>
                  </div>
                </div>
              );
              return it.href ? <a key={i} href={it.href} target="_blank" rel="noreferrer">{Content}</a> : <div key={i}>{Content}</div>;
            })}
            <div className="rounded-2xl overflow-hidden border border-border h-72">
              <iframe
                title="Map"
                src="https://www.google.com/maps?q=Ago%C3%A8-Zongo,+Lom%C3%A9,+Togo&output=embed"
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </div>

          <form onSubmit={submit} className="bg-card rounded-3xl p-6 sm:p-8 border border-border space-y-4 h-fit">
            <h2 className="font-display text-2xl font-bold">Send a Message</h2>
            <input required placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-background" />
            <input required placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-background" />
            <textarea required placeholder="Your message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} className="w-full px-4 py-3 rounded-xl border border-border bg-background" />
            <button type="submit" className="w-full py-3 rounded-full bg-emerald text-white font-semibold hover:scale-[1.01] transition">Send via WhatsApp</button>
          </form>
        </div>
      </section>
    </PageTransition>
  );
}
