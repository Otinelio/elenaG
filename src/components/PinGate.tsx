import { Lock } from "lucide-react";
import { useState, type ReactNode } from "react";

export function PinGate({ pin, title, children }: { pin: string; title: string; children: ReactNode }) {
  const [value, setValue] = useState("");
  const [ok, setOk] = useState(false);
  const [error, setError] = useState(false);

  if (ok) return <>{children}</>;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value === pin) {
      setOk(true);
      setError(false);
    } else {
      setError(true);
      setValue("");
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink text-offwhite p-6">
      <form
        onSubmit={submit}
        className={`max-w-sm w-full bg-white/5 border ${error ? "border-paprika animate-shake" : "border-white/10"} rounded-3xl p-8 text-center space-y-5`}
      >
        <div className="w-14 h-14 mx-auto rounded-full bg-emerald flex items-center justify-center">
          <Lock className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold">{title}</h1>
          <p className="text-sm text-offwhite/60 mt-1">Enter 4-digit PIN to continue</p>
        </div>
        <input
          autoFocus
          inputMode="numeric"
          maxLength={4}
          value={value}
          onChange={(e) => setValue(e.target.value.replace(/\D/g, ""))}
          className="w-full text-center text-3xl tracking-[1em] font-bold bg-transparent border-2 border-white/20 rounded-xl py-3 focus:border-yellow outline-none"
        />
        <button
          type="submit"
          className="w-full py-3 rounded-full bg-emerald font-semibold hover:bg-emerald/90"
        >
          Unlock
        </button>
      </form>
    </div>
  );
}
