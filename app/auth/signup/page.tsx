import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md my-auto py-2 sm:py-4">
      <div className="mb-5 text-center lg:text-left">
        <div className="lg:hidden mb-4">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-ink">
            Event<span className="text-primary">Vibe</span>
          </Link>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1.5 text-ink">
          Create  account
        </h1>
        <p className="text-muted text-xs sm:text-sm">
          Join the vibe. It only takes a minute.
        </p>
      </div>

      <div className="space-y-3 mb-5">
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 bg-surface hover:bg-ghost border border-border text-ink transition-colors py-2.5 rounded-xl font-medium text-xs sm:text-sm shadow-xs"
        >
          <i className="fa-brands fa-google text-base sm:text-lg"></i>
          Sign up with Google
        </button>
      </div>

      <div className="relative flex items-center gap-4 mb-5">
        <div className="flex-1 h-px bg-border"></div>
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted">
          or use email
        </span>
        <div className="flex-1 h-px bg-border"></div>
      </div>

      <form className="space-y-3.5">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-muted mb-1.5">
            Full Name
          </label>
          <div className="relative">
            <i className="fa-solid fa-user absolute left-3.5 top-1/2 -translate-y-1/2 text-muted text-xs sm:text-sm"></i>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full bg-ghost border border-border rounded-xl py-2.5 pl-10 pr-4 outline-none focus:border-primary focus:bg-surface transition-colors text-ink placeholder:text-muted/60 text-xs sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-muted mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <i className="fa-solid fa-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-muted text-xs sm:text-sm"></i>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full bg-ghost border border-border rounded-xl py-2.5 pl-10 pr-4 outline-none focus:border-primary focus:bg-surface transition-colors text-ink placeholder:text-muted/60 text-xs sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-muted mb-1.5">
            Password
          </label>
          <div className="relative">
            <i className="fa-solid fa-lock absolute left-3.5 top-1/2 -translate-y-1/2 text-muted text-xs sm:text-sm"></i>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-ghost border border-border rounded-xl py-2.5 pl-10 pr-4 outline-none focus:border-primary focus:bg-surface transition-colors text-ink placeholder:text-muted/60 text-xs sm:text-sm"
            />
          </div>
        </div>

        <div className="flex items-start gap-2.5 py-1">
          <input type="checkbox" id="terms" className="mt-0.5 accent-primary cursor-pointer" />
          <label htmlFor="terms" className="text-[11px] sm:text-xs text-muted leading-relaxed cursor-pointer select-none">
            I agree to the{" "}
            <Link href="#" className="text-ink font-semibold hover:text-primary transition-colors underline underline-offset-2">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-ink font-semibold hover:text-primary transition-colors underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-[#a333ff] text-paper py-2.5 sm:py-3 rounded-xl font-bold transition-all transform hover:scale-[1.01] active:scale-95 shadow-lg shadow-primary/20 text-xs sm:text-sm mt-1 cursor-pointer"
        >
          Create Account
        </button>
      </form>

      <p className="text-center mt-5 text-muted text-xs sm:text-sm">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="text-ink font-bold hover:text-primary transition-colors"
        >
          login
        </Link>
      </p>
    </div>
  );
}



