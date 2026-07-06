import { xmenCast } from "@/lib/xmen-cast";

/**
 * Site-wide backdrop of real X-Men character portraits.
 * - Fixed layer, aria-hidden, non-interactive.
 * - Very low opacity + slight desaturation so they read as ambient decor.
 * - Responsive: fewer / smaller portraits on mobile so they don't dominate.
 * - Positions are set in CSS via .xm-cast-slot--<n>.
 * - Motion suppressed by prefers-reduced-motion (in styles.css).
 */
type Props = { variant?: "home" | "page" | "success" };

export function XmenCastBackdrop({ variant = "home" }: Props) {
  // Pick 6 evenly-distributed characters for the backdrop.
  const picks = [
    "wolverine",
    "storm",
    "magneto",
    "cyclops",
    "nightcrawler",
    "xavier",
  ]
    .map((slug) => xmenCast.find((c) => c.slug === slug))
    .filter(Boolean) as typeof xmenCast;

  return (
    <div className={`xm-cast-back xm-cast-back--${variant}`} aria-hidden="true">
      {picks.map((c, i) => (
        <img
          key={c.slug}
          src={c.img}
          alt=""
          loading="lazy"
          decoding="async"
          className={`xm-cast-slot xm-cast-slot--${i + 1}`}
        />
      ))}
    </div>
  );
}
