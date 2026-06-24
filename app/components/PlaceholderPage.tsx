import { Construction } from "lucide-react";
import GlassCard from "./GlassCard";
import Breadcrumb from "./Breadcrumb";

interface Props {
  title: string;
  desc?: string;
}

export default function PlaceholderPage({ title, desc }: Props) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
      <Breadcrumb />
      <GlassCard className="text-center py-16">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent)]/10">
          <Construction className="h-8 w-8 text-[var(--accent)]" />
        </div>
        <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">
          {title}
        </h1>
        <p className="mt-3 text-sm text-[var(--text-muted)] max-w-sm mx-auto">
          {desc || "Tính năng đang được phát triển. Quay lại sau nhé!"}
        </p>
      </GlassCard>
    </div>
  );
}
