import Link from "next/link";

interface AuthFooterProps {
  promptText: string;
  linkText: string;
  linkHref: string;
}

export default function AuthFooter({
  promptText,
  linkText,
  linkHref,
}: AuthFooterProps) {
  return (
    <p className="text-center mt-5 text-muted text-xs sm:text-sm">
      {promptText}{" "}
      <Link
        href={linkHref}
        className="text-ink font-bold hover:text-primary transition-colors"
      >
        {linkText}
      </Link>
    </p>
  );
}
