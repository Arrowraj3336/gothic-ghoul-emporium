import { BatLogo } from "./BatLogo";

// Full-screen bat-signal overlay used for page transitions
export function BatSignalOverlay({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-background/85 backdrop-blur-sm animate-fade-in" />
      <div
        className="absolute inset-0 opacity-70"
        style={{ background: "var(--gradient-signal)" }}
      />
      <div className="relative animate-signal-burst">
        <div className="absolute inset-0 -m-20 rounded-full bg-signal/30 blur-3xl" />
        <BatLogo className="relative h-32 w-64 text-signal drop-shadow-[0_0_40px_var(--signal-glow)]" />
      </div>
    </div>
  );
}

// Decorative bat-signal in the sky (used in hero)
export function BatSignalSky({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="absolute inset-0 animate-signal-pulse">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[60vmin] w-[60vmin] rounded-full opacity-40 blur-2xl"
          style={{ background: "var(--gradient-signal)" }}
        />
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-signal-flicker">
        <BatLogo className="h-32 w-64 text-signal/90 drop-shadow-[0_0_60px_var(--signal-glow)]" />
      </div>
    </div>
  );
}

// A bat that flies across the screen
export function FlyingBat() {
  return (
    <div className="pointer-events-none fixed top-1/3 left-0 z-50 animate-bat-fly">
      <BatLogo className="h-10 w-20 text-foreground/80" />
    </div>
  );
}
