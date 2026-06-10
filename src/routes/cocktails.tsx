import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { CocktailCard } from "@/components/CocktailCard";
import { COCKTAILS, waLink } from "@/data/menu";

export const Route = createFileRoute("/cocktails")({
  head: () => ({
    meta: [
      { title: "Cocktails & Drinks | Elena G" },
      { name: "description", content: "Cocktails, mocktails et boissons fraîches au bar Elena G à Lomé. Ouvert jusqu'à minuit." },
      { property: "og:title", content: "Cocktails & Drinks | Elena G" },
      { property: "og:description", content: "The bar at Elena G — open every night until midnight." },
    ],
  }),
  component: CocktailsPage,
});

function CocktailsPage() {
  return (
    <PageTransition>
      <div className="bg-ink text-offwhite">
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,139,109,0.45),transparent_60%)]" />
          <img src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1920&auto=format&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
          <div className="relative text-center px-6">
            <span className="text-yellow tracking-[0.3em] text-xs font-bold">— EVERY NIGHT —</span>
            <h1 className="font-display font-extrabold text-7xl sm:text-9xl mt-4">The Bar</h1>
            <p className="mt-5 text-offwhite/70 max-w-xl mx-auto">Cocktails, mocktails & fresh drinks — every night until midnight.</p>
          </div>
        </section>

        <section className="py-16 px-6 pb-32">
          <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COCKTAILS.map((c) => <CocktailCard key={c.id} c={c} />)}
          </div>
        </section>

        <a
          href={waLink("Hello Elena G! I'd like to order drinks:")}
          target="_blank"
          rel="noreferrer"
          className="fixed sm:hidden bottom-4 inset-x-4 z-40 bg-emerald text-white py-4 rounded-full font-semibold text-center flex items-center justify-center gap-2 shadow-2xl"
        >
          <MessageCircle className="w-5 h-5" /> Order drinks via WhatsApp
        </a>
      </div>
    </PageTransition>
  );
}
