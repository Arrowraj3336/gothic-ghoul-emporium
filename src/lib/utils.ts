import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a numeric price as Indian Rupees.
 * Uses en-IN grouping (lakhs / crores) and the ₹ symbol.
 * The stored price stays USD-native; we just present in INR at ×83.
 */
const INR = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});
export function formatINR(usdPrice: number): string {
  return INR.format(Math.round(usdPrice * 83));
}
