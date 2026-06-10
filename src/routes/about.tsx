import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Clock, MapPin, Utensils } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Elena G Lomé" },
      { name: "description", content: "L'histoire d'Elena G — restaurant moderne et bar à cocktails au coeur d'Agoè-Zongo, Lomé." },
      { property: "og:title", content: "About | Elena G" },
      { property: "og:description", content: "We are Elena G — born in Agoè, open until midnight." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const blocks = [
    { title: "Born in Agoè", body: "Elena G was born in the lively streets of Agoè-Zongo. A modern bistro shaped by the rhythm of the neighborhood — friendly, vibrant, and proudly local." },
    { title: "Food for everyone", body: "We believe great food shouldn't be a luxury. From 2500 F CFA, our menu mixes fast food, grillades, and home-style plats du jour for every craving and every budget." },
    { title: "Open until midnight", body: "When the sun sets, the bar lights up. Cocktails, music, friends — Elena G is where Lomé comes alive after dark, every day except Tuesday." },
  ];
  return (
    <PageTransition>
      <section className="grid lg:grid-cols-2 min-h-[80vh]">
        <div className="bg-ink text-offwhite flex items-center p-10 sm:p-16 lg:p-24">
          <div>
            <span className="text-yellow text-xs tracking-widest font-bold">— OUR STORY —</span>
            <h1 className="font-display text-6xl sm:text-7xl font-extrabold mt-4">We are <span className="text-emerald">Elena G</span></h1>
            <p className="mt-6 text-offwhite/70 max-w-md">A modern restaurant, fast food & cocktail bar in the heart of Lomé.</p>
          </div>
        </div>
        <div className="aspect-square lg:aspect-auto">
          <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&auto=format&fit=crop" alt="Interior" className="w-full h-full object-cover" />
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-14">
          {blocks.map((b, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <h2 className="font-display text-4xl font-bold text-emerald">{b.title}</h2>
              <p className="mt-3 text-lg text-muted-foreground leading-relaxed">{b.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 bg-card">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-6">
          {[
            { icon: Utensils, label: "Quality Food" },
            { icon: MapPin, label: "Agoè-Zongo, Lomé" },
            { icon: Clock, label: "10h to Midnight" },
          ].map((v, i) => (
            <motion.div key={i} whileHover={{ y: -4 }} className="bg-background rounded-2xl p-8 text-center border border-border">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald text-white flex items-center justify-center">
                <v.icon className="w-6 h-6" />
              </div>
              <div className="font-display font-bold text-lg mt-4">{v.label}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
