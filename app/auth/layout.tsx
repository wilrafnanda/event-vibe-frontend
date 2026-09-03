import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-surface text-ink min-h-screen lg:h-screen lg:overflow-hidden">
      <main className="flex flex-col lg:flex-row h-full min-h-screen lg:min-h-0">
        {/* Left Side: Visual  */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden h-full text-paper">
          <img
            className="w-full h-full object-cover"
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_d58d2850c2_5990f6640c654eb5.png"
            alt="dramatic aerial view of a music festival at night, purple and blue stage lights illuminating a sea of people"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/20 to-ink"></div>
          <div className="absolute bottom-12 left-12 xl:bottom-20 xl:left-20 z-10 max-w-md">
            <Link
              href="/"
              className="text-3xl font-bold tracking-tighter mb-6 block text-paper"
            >
              Event<span className="text-primary">Vibe</span>
            </Link>
            <h2 className="text-4xl xl:text-5xl font-black tracking-tighter leading-tight mb-4 text-paper">
              THE BEST NIGHTS
              <br />
              START HERE.
            </h2>
            <p className="text-paper/70 text-base xl:text-lg">
              Join the community of millions discovering the most exclusive events worldwide.
            </p>
          </div>
        </div>

        {/* Right Side: Login Form  */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 overflow-y-auto h-full bg-surface">
          {children}
        </div>
      </main>
    </section>
  );
}
