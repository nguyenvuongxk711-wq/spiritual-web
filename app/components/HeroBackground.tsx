import { ReactNode } from "react";

interface HeroBackgroundProps {
  children: ReactNode;
  image?: string;
  className?: string;
}

export default function HeroBackground({ children, image, className = "" }: HeroBackgroundProps) {
  return (
    <section
      className={`relative overflow-hidden bg-cover bg-center ${className}`}
      style={{
        backgroundImage: image
          ? `linear-gradient(to bottom, rgba(15,14,26,0.55) 0%, rgba(15,14,26,0.92) 100%), url('${image}')`
          : undefined,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% -20%, rgba(201,168,76,0.16), transparent),
                       radial-gradient(ellipse 60% 40% at 80% 50%, rgba(139,92,246,0.10), transparent)`,
        }}
      />
      <div className="relative">{children}</div>
    </section>
  );
}
