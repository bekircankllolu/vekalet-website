import { useState, useEffect } from 'react';
import { Menu, X, Leaf } from 'lucide-react';

const navLinks = [
  { href: '#hizmetler', label: 'Hizmetlerimiz' },
  { href: '#nasil-calisir', label: 'Nasıl Çalışır?' },
  { href: '#guven', label: 'Güven & Güvenlik' },
  { href: '#yorumlar', label: 'Yorumlar' },
  { href: '#iletisim', label: 'İletişim' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-cream/95 shadow-soft backdrop-blur-md'
          : 'bg-transparent',
      ].join(' ')}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group" aria-label="Vekalet ana sayfa">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald shadow-green transition-transform duration-200 group-hover:scale-105">
            <Leaf className="text-white" size={20} />
          </span>
          <div className="leading-none">
            <span className="block text-lg font-bold text-ink tracking-tight">Vekalet</span>
            <span className="block text-[10px] font-medium text-muted tracking-wide">Kabir Bakım Hizmeti</span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Ana navigasyon">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav-link rounded-lg px-3 py-2">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <a href="#talep-formu" className="btn-primary py-2.5 px-5 text-sm">
            Talep Oluştur
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white text-stone transition-colors hover:bg-parchment lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={[
          'overflow-hidden transition-all duration-300 lg:hidden',
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        ].join(' ')}
      >
        <nav className="border-t border-line bg-cream/98 px-4 py-4 backdrop-blur-md">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-stone transition-colors hover:bg-parchment hover:text-ink"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 pt-3 border-t border-line">
              <a
                href="#talep-formu"
                onClick={() => setOpen(false)}
                className="btn-primary w-full justify-center text-sm"
              >
                Talep Oluştur
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
