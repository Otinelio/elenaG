import { Link } from "@tanstack/react-router";
import { Clock, ExternalLink, MapPin, MessageCircle, Phone } from "lucide-react";
import { BRAND, waLink } from "@/data/menu";

export function Footer() {
  return (
    <footer className="bg-ink text-offwhite">
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="font-display text-3xl font-bold flex items-center gap-2">
            <span className="text-emerald">Elena</span>
            <span className="text-yellow">G</span>
            <span className="w-2 h-2 rounded-full bg-yellow inline-block" />
          </div>
          <p className="mt-3 text-sm text-offwhite/70">
            Good food. Good vibes. Every day.
          </p>
        </div>

        <div>
          <h4 className="font-display text-lg mb-3">Navigate</h4>
          <ul className="space-y-2 text-sm text-offwhite/80">
            <li><Link to="/menu" className="hover:text-yellow">Menu</Link></li>
            <li><Link to="/cocktails" className="hover:text-yellow">Cocktails</Link></li>
            <li><Link to="/about" className="hover:text-yellow">About</Link></li>
            <li><Link to="/gallery" className="hover:text-yellow">Gallery</Link></li>
            <li><Link to="/reserve" className="hover:text-yellow">Reserve</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg mb-3">Find Us</h4>
          <ul className="space-y-3 text-sm text-offwhite/80">
            <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5 text-yellow shrink-0" /><span>{BRAND.address}</span></li>
            <li className="flex gap-2"><Phone className="w-4 h-4 mt-0.5 text-yellow shrink-0" /><span>{BRAND.phoneDisplay}</span></li>
            <li className="flex gap-2"><Clock className="w-4 h-4 mt-0.5 text-yellow shrink-0" /><span>Open every day except Tuesday — 10:00 to 00:00</span></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg mb-3">Connect</h4>
          <div className="flex gap-3">
            <a href={waLink("Hello Elena G!")} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-emerald flex items-center justify-center hover:scale-110 transition"><MessageCircle className="w-5 h-5" /></a>
            <a href="https://www.tiktok.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:scale-110 transition"><ExternalLink className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="max-w-7xl mx-auto px-6 py-5 text-xs text-offwhite/60 text-center">
          © 2025 Elena G. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
