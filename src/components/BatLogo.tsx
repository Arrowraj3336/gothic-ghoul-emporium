type Props = { className?: string; title?: string };

// Stylized bat silhouette
export function BatLogo({ className, title = "Bat emblem" }: Props) {
  return (
    <svg
      viewBox="0 0 200 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <path
        fill="currentColor"
        d="M100 18c-4 6-9 9-16 9-3 7-2 13 1 19-7-6-15-9-25-9-2 6 0 12 5 17-9-7-21-10-35-9 6 4 11 9 15 16-9-4-18-5-28-3 9 6 17 13 24 22 7-1 14 0 21 5 8 4 16 7 25 8 4 0 8 1 13 3v-6c2 1 4 1 6 1l-2-6 6 4 4-7 5 6c1-1 1-3 2-4l4 5c1-2 2-4 4-5l3 6c1-2 3-3 5-3l1 6c4-1 9-3 13-4 4-2 8-3 13-3 7-1 14-3 21-7 7-9 15-16 24-22-10-2-19-1-28 3 4-7 9-12 15-16-14-1-26 2-35 9 5-5 7-11 5-17-10 0-18 3-25 9 3-6 4-12 1-19-7 0-12-3-16-9z"
      />
    </svg>
  );
}
