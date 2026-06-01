import { ArrowRight, ShieldCheck, Star, MapPin, Camera, CheckCircle2 } from 'lucide-react';
import { useEffect, useRef } from 'react';

const trustBadges = [
  { icon: ShieldCheck, text: 'Kimlik Doğrulamalı Hizmet Verenler' },
  { icon: Camera, text: 'Fotoğraflı Teslim Kanıtı' },
  { icon: MapPin, text: 'Türkiye Geneli Hizmet' },
];

const floatingCards = [
  {
    icon: CheckCircle2,
    color: 'text-emerald',
    bg: 'bg-emerald-light',
    title: 'Teslim Onaylandı',
    sub: 'Mezarlık temizliği tamamlandı',
    badge: 'Bugün 14:23',
    badgeColor: 'bg-emerald-light text-emerald',
  },
  {
    icon: Star,
    color: 'text-gold',
    bg: 'bg-gold-light',
    title: '4.9 / 5.0',
    sub: '1.200+ tamamlanan hizmet',
    badge: 'Doğrulanmış Yorum',
    badgeColor: 'bg-gold-light text-gold',
  },
];

export function Hero() {
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 },
    );
    const els = revealRef.current?.querySelectorAll('.reveal');
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={revealRef}
      className="relative min-h-screen overflow-hidden pt-16"
      style={{
        background: 'linear-gradient(160deg, #FAF7F2 0%, #F3EDE3 40%, #EBF3E8 100%)',
      }}
    >
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large soft circle top right */}
        <div
          className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #EBF3E8 0%, transparent 70%)' }}
        />
        {/* Medium circle bottom left */}
        <div
          className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #E8DECE 0%, transparent 70%)' }}
        />
        {/* Islamic diamond pattern */}
        <div className="pattern-bg absolute inset-0 opacity-40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — Content */}
          <div>
            {/* Top badge */}
            <div className="reveal mb-6 inline-flex items-center gap-2 rounded-full border border-emerald/20 bg-emerald-light px-4 py-2">
              <ShieldCheck className="text-emerald" size={15} />
              <span className="text-xs font-bold text-emerald">Türkiye'nin İlk Güvenilir Kabir Bakım Platformu</span>
            </div>

            {/* Heading */}
            <h1 className="reveal reveal-delay-1 font-display text-balance text-4xl font-bold leading-[1.1] text-ink sm:text-5xl lg:text-[3.25rem]">
              Uzaktaki Sevdiklerinizin{' '}
              <span className="relative">
                <span className="relative z-10 text-emerald">Kabrine</span>
                <span
                  className="absolute -bottom-1 left-0 right-0 h-3 -z-0 opacity-30"
                  style={{ background: 'linear-gradient(90deg, #EBF3E8, transparent)' }}
                />
              </span>{' '}
              Saygıyla Bakım
            </h1>

            {/* Description */}
            <p className="reveal reveal-delay-2 mt-6 max-w-xl text-lg leading-8 text-muted">
              İstanbul'da yaşayıp sevdiklerinizin kabri başka şehirlerdeyse, doğrulanmış hizmet verenlerimiz
              saygı ve özenle bakım yapar. Her hizmet fotoğraflı kanıtla teslim edilir.
            </p>

            {/* Bismillah note */}
            <p className="reveal reveal-delay-2 mt-3 text-sm font-medium text-stone italic">
              "Her işe besmele ile başlanır, her kabir ziyareti Fatiha ile tamamlanır."
            </p>

            {/* CTAs */}
            <div className="reveal reveal-delay-3 mt-8 flex flex-wrap gap-3">
              <a href="#talep-formu" className="btn-primary">
                Hemen Talep Oluştur
                <ArrowRight size={18} />
              </a>
              <a href="#nasil-calisir" className="btn-secondary">
                Nasıl Çalışır?
              </a>
            </div>

            {/* Trust badges */}
            <div className="reveal reveal-delay-4 mt-10 flex flex-wrap gap-4">
              {trustBadges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <div key={badge.text} className="flex items-center gap-2">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-light">
                      <Icon className="text-emerald" size={14} />
                    </div>
                    <span className="text-xs font-semibold text-stone">{badge.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — Visual */}
          <div className="reveal reveal-delay-2 relative flex justify-center lg:justify-end">
            {/* Main visual card */}
            <div className="relative w-full max-w-md">
              {/* Cemetery illustration card */}
              <div className="relative overflow-hidden rounded-4xl border border-line bg-white shadow-elevated">
                {/* Cemetery SVG illustration */}
                <CemeteryIllustration />

                {/* Overlay badge */}
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-2xl border border-white/50 bg-white/90 px-3 py-2 shadow-soft backdrop-blur-sm">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-emerald" />
                  <span className="text-xs font-bold text-emerald">Hizmet Aktif</span>
                </div>

                {/* Proof gallery badge bottom */}
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/50 bg-white/90 p-3 shadow-soft backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-ink">Teslim Kanıtları</p>
                      <p className="text-xs text-muted">Zincirlikuyu Mezarlığı · İstanbul</p>
                    </div>
                    <div className="flex -space-x-2">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="flex h-8 w-8 items-center justify-center rounded-xl border-2 border-white shadow-sm"
                          style={{
                            background: i === 0
                              ? 'linear-gradient(135deg, #EBF3E8, #C8DFC0)'
                              : i === 1
                              ? 'linear-gradient(135deg, #E8DECE, #D6C9B5)'
                              : 'linear-gradient(135deg, #F3EDE3, #E8DECE)',
                          }}
                        >
                          <Camera size={12} className="text-emerald" />
                        </div>
                      ))}
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl border-2 border-white bg-emerald text-xs font-bold text-white shadow-sm">
                        +5
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              {floatingCards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <div
                    key={i}
                    className={[
                      'absolute card w-52 shadow-card animate-float',
                      i === 0 ? '-left-12 top-16' : '-right-8 bottom-20',
                    ].join(' ')}
                    style={{ animationDelay: `${i * 1.5}s` }}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${card.bg}`}>
                        <Icon className={card.color} size={18} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-ink">{card.title}</p>
                        <p className="mt-0.5 text-xs text-muted leading-4">{card.sub}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <span className={`tag text-2xs ${card.badgeColor}`}>{card.badge}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="reveal reveal-delay-4 mt-20 grid grid-cols-2 gap-4 rounded-4xl border border-line bg-white/70 p-6 shadow-soft backdrop-blur-sm sm:grid-cols-4">
          {[
            { value: '1.200+', label: 'Tamamlanan Hizmet' },
            { value: '98%', label: 'Müşteri Memnuniyeti' },
            { value: '4.9/5', label: 'Ortalama Puan' },
            { value: '81', label: 'Şehirde Hizmet' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl font-bold text-emerald">{stat.value}</p>
              <p className="mt-1 text-xs font-semibold text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60 L0 30 Q360 0 720 30 Q1080 60 1440 30 L1440 60 Z" fill="#FAF7F2" />
        </svg>
      </div>
    </section>
  );
}

function CemeteryIllustration() {
  return (
    <svg viewBox="0 0 480 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
      {/* Sky gradient */}
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EBF3E8" />
          <stop offset="100%" stopColor="#F3EDE3" />
        </linearGradient>
        <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D6C9B5" />
          <stop offset="100%" stopColor="#C8BAA8" />
        </linearGradient>
        <linearGradient id="stoneGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F3EDE3" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="480" height="340" fill="url(#skyGrad)" />

      {/* Distant hills */}
      <ellipse cx="100" cy="280" rx="160" ry="60" fill="#C8DFC0" opacity="0.4" />
      <ellipse cx="380" cy="290" rx="180" ry="70" fill="#C8DFC0" opacity="0.3" />

      {/* Ground */}
      <rect x="0" y="260" width="480" height="80" fill="url(#groundGrad)" rx="4" />

      {/* Grass line */}
      <path d="M0 260 Q120 250 240 262 Q360 274 480 258" stroke="#7A9A72" strokeWidth="3" fill="none" opacity="0.6" />

      {/* Trees left */}
      <g opacity="0.85">
        {/* Tree 1 */}
        <rect x="42" y="160" width="8" height="100" fill="#A08060" rx="2" />
        <ellipse cx="46" cy="145" rx="28" ry="38" fill="#5A7A52" />
        <ellipse cx="46" cy="135" rx="20" ry="28" fill="#7A9A72" />

        {/* Tree 2 */}
        <rect x="82" y="180" width="6" height="80" fill="#A08060" rx="2" />
        <ellipse cx="85" cy="166" rx="22" ry="30" fill="#5A7A52" />
        <ellipse cx="85" cy="158" rx="16" ry="22" fill="#7A9A72" />
      </g>

      {/* Trees right */}
      <g opacity="0.85">
        <rect x="390" y="160" width="8" height="100" fill="#A08060" rx="2" />
        <ellipse cx="394" cy="145" rx="30" ry="40" fill="#5A7A52" />
        <ellipse cx="394" cy="134" rx="22" ry="30" fill="#7A9A72" />

        <rect x="430" y="175" width="6" height="85" fill="#A08060" rx="2" />
        <ellipse cx="433" cy="162" rx="22" ry="32" fill="#5A7A52" />
        <ellipse cx="433" cy="152" rx="16" ry="24" fill="#7A9A72" />
      </g>

      {/* Main gravestone — center */}
      <g>
        {/* Stone base */}
        <rect x="188" y="185" width="104" height="75" fill="url(#stoneGrad)" rx="4" stroke="#E2D9CE" strokeWidth="1.5" />
        {/* Stone top arch */}
        <path d="M188 200 L188 185 Q188 170 240 168 Q292 170 292 185 L292 200 Z" fill="url(#stoneGrad)" stroke="#E2D9CE" strokeWidth="1.5" />

        {/* Arabic/Ottoman style decorative top */}
        <path d="M222 178 Q240 166 258 178" stroke="#A08060" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <circle cx="240" cy="176" r="3" fill="#A08060" opacity="0.6" />

        {/* Crescent and star */}
        <g transform="translate(240, 186)" opacity="0.7">
          <path d="M-7 0 A7 7 0 0 1 7 0 A5 5 0 0 0 -7 0Z" fill="#A08060" />
          <polygon points="10,0 11.5,4.5 16,4.5 12.5,7.5 14,12 10,9 6,12 7.5,7.5 4,4.5 8.5,4.5" fill="#A08060" transform="scale(0.5) translate(4,-6)" />
        </g>

        {/* Name text */}
        <text x="240" y="210" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7A6855" fontFamily="Inter, sans-serif">MERHUM</text>
        <text x="240" y="223" textAnchor="middle" fontSize="10" fontWeight="700" fill="#3D2E1E" fontFamily="Inter, sans-serif">AHMET YILMAZ</text>
        <text x="240" y="235" textAnchor="middle" fontSize="8" fill="#A08060" fontFamily="Inter, sans-serif">1945 — 2018</text>

        {/* Decorative line */}
        <line x1="210" y1="240" x2="270" y2="240" stroke="#D6C9B5" strokeWidth="1" />

        {/* Fatiha text */}
        <text x="240" y="252" textAnchor="middle" fontSize="7.5" fill="#7A9A72" fontFamily="Inter, sans-serif" fontStyle="italic">Ruhuna El-Fatiha</text>
      </g>

      {/* Secondary gravestones */}
      <g opacity="0.7">
        {/* Left small */}
        <rect x="128" y="218" width="62" height="52" fill="url(#stoneGrad)" rx="3" stroke="#E2D9CE" strokeWidth="1" />
        <path d="M128 228 L128 218 Q128 208 159 207 Q190 208 190 218 L190 228 Z" fill="url(#stoneGrad)" stroke="#E2D9CE" strokeWidth="1" />
        <text x="159" y="240" textAnchor="middle" fontSize="7" fill="#A08060" fontFamily="Inter, sans-serif">MERHUME</text>
        <text x="159" y="252" textAnchor="middle" fontSize="7.5" fontWeight="600" fill="#3D2E1E" fontFamily="Inter, sans-serif">FATİMA H.</text>
        <text x="159" y="262" textAnchor="middle" fontSize="7" fill="#A08060" fontFamily="Inter, sans-serif">1952 — 2019</text>
      </g>

      <g opacity="0.7">
        {/* Right small */}
        <rect x="298" y="215" width="65" height="55" fill="url(#stoneGrad)" rx="3" stroke="#E2D9CE" strokeWidth="1" />
        <path d="M298 226 L298 215 Q298 204 330 203 Q362 204 362 215 L362 226 Z" fill="url(#stoneGrad)" stroke="#E2D9CE" strokeWidth="1" />
        <text x="330" y="238" textAnchor="middle" fontSize="7" fill="#A08060" fontFamily="Inter, sans-serif">MERHUM</text>
        <text x="330" y="250" textAnchor="middle" fontSize="7.5" fontWeight="600" fill="#3D2E1E" fontFamily="Inter, sans-serif">MEHMET K.</text>
        <text x="330" y="261" textAnchor="middle" fontSize="7" fill="#A08060" fontFamily="Inter, sans-serif">1938 — 2015</text>
      </g>

      {/* Flowers on main grave */}
      <g>
        <circle cx="218" cy="264" r="5" fill="#E88C8C" opacity="0.8" />
        <circle cx="228" cy="260" r="4" fill="#E88C8C" opacity="0.7" />
        <circle cx="252" cy="264" r="5" fill="#E88C8C" opacity="0.8" />
        <circle cx="263" cy="260" r="4" fill="#E88C8C" opacity="0.7" />
        <line x1="223" y1="266" x2="223" y2="274" stroke="#7A9A72" strokeWidth="1.5" />
        <line x1="257" y1="266" x2="257" y2="274" stroke="#7A9A72" strokeWidth="1.5" />
      </g>

      {/* Small plant / grass tufts */}
      <g opacity="0.5">
        {[140, 200, 280, 340].map((x, i) => (
          <g key={i} transform={`translate(${x}, 262)`}>
            <path d="M0 0 Q-4 -8 -2 -14" stroke="#7A9A72" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M0 0 Q0 -10 2 -16" stroke="#5A7A52" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M0 0 Q4 -8 3 -13" stroke="#7A9A72" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </g>
        ))}
      </g>

      {/* Soft light rays from top */}
      <g opacity="0.15">
        <line x1="240" y1="0" x2="150" y2="260" stroke="#C8943A" strokeWidth="30" />
        <line x1="280" y1="0" x2="320" y2="260" stroke="#C8943A" strokeWidth="20" />
      </g>
    </svg>
  );
}
