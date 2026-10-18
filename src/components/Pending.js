import { site } from "@/content/site";

// Marks a detail that is waiting for owner confirmation (preview only).
export default function Pending({ children = "Awaiting owner confirmation" }) {
  if (!site.preview.showPending) return null;
  return <span className="pending">{children}</span>;
}
