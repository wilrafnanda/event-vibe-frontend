import Link from "next/link";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export default function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="mb-5 text-center lg:text-left">
      <div className="lg:hidden mb-4">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-ink">
          Event<span className="text-primary">Vibe</span>
        </Link>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1.5 text-ink">
        {title}
      </h1>
      <p className="text-muted text-xs sm:text-sm">{subtitle}</p>
    </div>
  );
}
