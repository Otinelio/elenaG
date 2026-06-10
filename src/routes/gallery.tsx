import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | Elena G" },
      { name: "description", content: "Découvrez l'ambiance, les plats et les cocktails d'Elena G en images." },
      { property: "og:title", content: "Gallery | Elena G" },
      { property: "og:description", content: "Moments at Elena G — food, cocktails, vibes." },
    ],
  }),
  component: GalleryPage,
});

const PHOTOS = [
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200",
  "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=1200",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200",
  "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=1200",
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200",
  "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=1200",
  "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1200",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200",
  "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1200",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200",
  "https://images.unsplash.com/photo-1604908554007-2a1fe5ebe616?w=1200",
];

function GalleryPage() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i! + 1) % PHOTOS.length);
      if (e.key === "ArrowLeft") setActive((i) => (i! - 1 + PHOTOS.length) % PHOTOS.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <PageTransition>
      <section className="bg-emerald text-white py-24 px-6 text-center">
        <span className="text-yellow text-xs tracking-widest font-bold">— GALLERY —</span>
        <h1 className="font-display text-6xl sm:text-7xl font-extrabold mt-3">Our Moments</h1>
      </section>

      <section className="py-14 px-6">
        <div className="max-w-7xl mx-auto columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {PHOTOS.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`group block w-full break-inside-avoid rounded-2xl overflow-hidden relative ${
                i % 3 === 0 ? "aspect-[3/4]" : i % 4 === 0 ? "aspect-square" : "aspect-[4/5]"
              }`}
            >
              <img src={src} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {active !== null && (
        <div className="fixed inset-0 z-[80] bg-black/95 flex items-center justify-center p-4">
          <button onClick={() => setActive(null)} className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full"><X className="w-6 h-6" /></button>
          <button onClick={() => setActive((i) => (i! - 1 + PHOTOS.length) % PHOTOS.length)} className="absolute left-4 text-white p-2 hover:bg-white/10 rounded-full"><ChevronLeft className="w-8 h-8" /></button>
          <img src={PHOTOS[active]} alt="" className="max-h-[85vh] max-w-full rounded-xl" />
          <button onClick={() => setActive((i) => (i! + 1) % PHOTOS.length)} className="absolute right-4 text-white p-2 hover:bg-white/10 rounded-full"><ChevronRight className="w-8 h-8" /></button>
        </div>
      )}
    </PageTransition>
  );
}
