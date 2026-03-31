export function Navbar() {
  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-48px)] max-w-5xl">
      <nav className="bg-white/85 backdrop-blur-xl border border-black/7 rounded-full px-5 py-2.5 flex items-center justify-between shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 no-underline">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-400 shadow-[0_2px_12px_rgba(255,77,28,0.35)] shrink-0" />
          <span className="font-bold text-[15px] text-black tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            Joseph Alexander
          </span>
        </a>

        {/* Links */}
        <ul className="flex gap-7 list-none m-0 p-0">
          {['Work', 'Services', 'Pricing', 'Blog'].map((link) => (
            <li key={link}>
              <a
                href="#"
                className="text-sm font-medium text-neutral-500 no-underline hover:text-black transition-colors"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#"
          className="bg-white border border-neutral-200 rounded-full px-5 py-2 text-[13px] font-semibold text-black no-underline shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:bg-black hover:text-white hover:border-black transition-all"
        >
          Contact
        </a>
      </nav>
    </div>
  );
}