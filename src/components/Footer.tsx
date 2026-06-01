import { Leaf, Phone, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';

const footerLinks = {
  Hizmetler: [
    { label: 'Mezar Temizliği', href: '#hizmetler' },
    { label: 'Fatiha ve Dua', href: '#hizmetler' },
    { label: 'Çiçek Bırakma', href: '#hizmetler' },
    { label: 'Fotoğraf Kanıtı', href: '#hizmetler' },
    { label: 'Bayram Paketi', href: '#hizmetler' },
  ],
  Platform: [
    { label: 'Nasıl Çalışır?', href: '#nasil-calisir' },
    { label: 'Güven ve Güvenlik', href: '#guven' },
    { label: 'Hizmet Veren Başvurusu', href: '#iletisim' },
    { label: 'Sıkça Sorulan Sorular', href: '#iletisim' },
  ],
  Yasal: [
    { label: 'Gizlilik Politikası', href: '#' },
    { label: 'Kullanım Koşulları', href: '#' },
    { label: 'KVKK Aydınlatma Metni', href: '#' },
    { label: 'Çerez Politikası', href: '#' },
  ],
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="iletisim" className="bg-ink text-white">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand col */}
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald shadow-green">
                <Leaf className="text-white" size={20} />
              </div>
              <div>
                <p className="text-lg font-bold leading-none">Vekalet</p>
                <p className="text-xs text-white/50 mt-0.5">Kabir Bakım Hizmeti</p>
              </div>
            </div>

            <p className="mt-5 max-w-xs text-sm leading-7 text-white/60">
              Uzaktaki sevdiklerinizin kabrine saygıyla bakım. Türkiye genelinde doğrulanmış
              hizmet verenlerle güvenli, belgelenmiş kabir bakım hizmeti.
            </p>

            {/* Ayat */}
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
              <p className="text-xs leading-6 text-white/50 italic text-center">
                "Kabirleri ziyaret edin. Zira onlar size ahireti hatırlatır."
              </p>
              <p className="mt-1 text-center text-2xs font-semibold text-white/30">
                — Hz. Muhammed (s.a.v.) — Müslim
              </p>
            </div>

            {/* Contact */}
            <div className="mt-6 space-y-3">
              <a href="tel:08500000000" className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Phone size={14} />
                </div>
                0850 000 00 00
              </a>
              <a href="mailto:destek@vekalet.app" className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Mail size={14} />
                </div>
                destek@vekalet.app
              </a>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <MapPin size={14} />
                </div>
                İstanbul, Türkiye
              </div>
            </div>

            {/* Social */}
            <div className="mt-6 flex gap-2">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Facebook, label: 'Facebook' },
                { icon: Youtube, label: 'YouTube' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white/60 transition-all hover:bg-emerald hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-bold text-white/90">{category}</h3>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/50 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-white/40">
              © {year} Vekalet. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-white/30">Türk hukuku kapsamında faaliyet göstermektedir.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
