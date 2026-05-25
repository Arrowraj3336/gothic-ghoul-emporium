import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BatSignalOverlay } from "./BatSignal";

// Triggers a brief bat-signal burst on every route change
export function RouteTransition() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
    const t = setTimeout(() => setActive(false), 900);
    return () => clearTimeout(t);
  }, [path]);

  return <BatSignalOverlay active={active} />;
}
