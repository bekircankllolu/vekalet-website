import { useEffect, useRef } from 'react';
import { Sparkles, Gift, Crown, CheckCircle2, ArrowRight, Camera, HandHeart, Flower2 } from 'lucide-react';

const packages = [
  {
    icon: Sparkles,
    title: 'Temel Bakım',
    subtitle: 'Mezar temizliği + Fatiha + Fotoğraf kanıtı',
    description:
      'Sevdiklerinizin kabri özenle temizlenir, Fatiha-i Şerif okunur ve tüm süreç fotoğraflı kanıtla size iletilir.',
    price: '750',
    oldPrice: null,
    duration: '60–75 dk',
    accent: 'emerald',
    popular: false,
    badge: null,
    includes: [
      { icon: Sparkles, text: 'Mezar taşı ve çevre temizliği' },
      { icon: HandHeart, text: 'Kabir başında El-Fatiha okunması' },
      { icon: Camera, text: 'Zaman ve konum damgalı fotoğraflar' },
      { icon: Camera, text: 'Hizmet sonrası video raporu' },
    ],
  },
  {
    icon: Flower2,
    title: 'Tam Bakım',
    subtitle: 'Temel Bakım + Taze çiçek bırakma',
    description:
      'Temel bakım hizmetlerine ek olarak mezara taze çiçek bırakılır. Gül, karanfil veya mevsim çiçeği tercih edebilirsiniz.',
    price: '950',
    oldPrice: null,
    duration: '75–90 dk',
    accent: 'gold',
    popular: true,
    badge: 'En Çok Tercih Edilen',
    includes: [
      { icon: Sparkles, text: 'Mezar taşı ve çevre temizliği' },
      { icon: HandHeart, text: 'Kabir başında El-Fatiha okunması' },
      { icon: Flower2, text: 'Taze çiçek temini ve özenli yerleştirme' },
      { icon: Camera, text: 'Zaman ve konum damgalı fotoğraflar' },
    ],
  },
  {
    icon: Crown,
    title: 'Bayram & Premium',
    subtitle: 'Tam Bakım + Ekstra özen + Öncelikli hizmet',
    description:
      'Dini bayramlar ve özel günler için hazırlanmış kapsamlı paket. Öncelikli hizmet veren ataması ve kapsamlı video belgeleme dahil.',
    price: '1.350',
    oldPrice: '1.600',
    duration: '90–120 dk',
    accent: 'sage',
    popular: false,
    badge: 'Bayram Özel',
    includes: [
      { icon: Sparkles, text: 'Detaylı mezar ve çevre temizliği' },
      { icon: HandHeart, text: 'El-Fatiha ve genişletilmiş dua' },
      { icon: Flower2, text: 'Premium taze çiçek buketi' },
      { icon: Camera, text: 'Kapsamlı fotoğraf + video raporu' },
    ],
  },
];

const accentMap = {
  emerald: {
    iconBg: 'bg-emerald-light',
    iconText: 'text-emerald',
    badge: 'bg-emerald text-white',
    tag: 'bg-emerald-light text-emerald',
    button: 'btn-primary',
    border: '',
    checkText: 'text-emerald',
  },
  gold: {
    iconBg: 'bg-gold-light',
    iconText: 'text-gold',
    badge: 'bg-gold text-white',
    tag: 'bg-gold-light text-gold',
    button: 'btn-primary',
    border: 'ring-2 ring-gold/40',
    checkText: 'text-gold',
  },
  sage: {
    iconBg: 'bg-parchment',
    iconText: 'text-sage',
    badge: 'bg-sage text-white',
    tag: 'bg-parchment text-stone',
    button: 'btn-primary',
    border: '',
    checkText: 'text-sage',
  },
};

export function Services() {
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 },
    );
    revealRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="hizmetler" ref={revealRef} className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="section-label">Hizmet Paketleri</span>
          <h2 className="section-title mt-3">
            İhtiyacınıza Uygun{' '}
            <span className="text-emerald">Paketi Seçin</span>
          </h2>
          <p className="section-subtitle mt-4">
            Her paket; mezar temizliği, dua ve fotoğraflı teslim kanıtını kapsar.
            İhtiyacınıza göre çiçek ve premium seçenekler eklenebilir.
          </p>
        </div>

        {/* Packages grid */}
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {packages.map((pkg, i) => {
            const Icon = pkg.icon;
            const accent = accentMap[pkg.accent as keyof typeof accentMap];

            return (
              <div
                key={pkg.title}
                className={[
                  'reveal card flex flex-col relative',
                  `reveal-delay-${i + 1}`,
                  accent.border,
                  pkg.popular ? 'shadow-card' : '',
                ].join(' ')}
              >
                {/* Badge */}
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className={`inline-flex items-center rounded-full px-4 py-1 text-xs font-bold shadow-sm ${accent.badge}`}>
                      {pkg.badge}
                    </span>
                  </div>
                )}

                {/* Icon + title */}
                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${accent.iconBg}`}>
                    <Icon className={accent.iconText} size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-ink">{pkg.title}</h3>
                    <p className="text-xs font-medium text-muted mt-0.5">{pkg.subtitle}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-4 text-sm leading-6 text-muted">{pkg.description}</p>

                {/* Includes */}
                <ul className="mt-5 space-y-2.5 flex-1">
                  {pkg.includes.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <li key={item.text} className="flex items-center gap-2.5 text-sm text-stone">
                        <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${accent.iconBg}`}>
                          <ItemIcon className={accent.iconText} size={11} />
                        </div>
                        {item.text}
                      </li>
                    );
                  })}
                </ul>

                {/* Price + CTA */}
                <div className="mt-6 border-t border-line pt-5">
                  <div className="flex items-end justify-between">
                    <div>
                      {pkg.oldPrice && (
                        <p className="text-sm text-muted line-through">{pkg.oldPrice} ₺</p>
                      )}
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-ink">{pkg.price}</span>
                        <span className="text-sm font-semibold text-ink">₺</span>
                        <span className="text-xs text-muted">/ hizmet</span>
                      </div>
                    </div>
                    <span className={`tag text-xs ${accent.tag}`}>{pkg.duration}</span>
                  </div>
                  <a href="#talep-formu" className="btn-primary mt-4 w-full justify-center text-sm py-3">
                    Bu Paketi Seç
                    <ArrowRight size={15} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* What's always included */}
        <div className="reveal mt-10 rounded-4xl border border-line bg-white p-6 shadow-soft">
          <p className="text-center text-sm font-bold text-ink mb-4">Her pakette dahil olan standart hizmetler</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: CheckCircle2, text: 'Kimlik doğrulamalı hizmet veren' },
              { icon: CheckCircle2, text: 'GPS konum ve zaman kaydı' },
              { icon: CheckCircle2, text: 'Fotoğraflı teslim kanıtı' },
              { icon: CheckCircle2, text: 'Hizmet sonrası bildirim' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.text} className="flex items-center gap-2 text-sm text-stone">
                  <Icon className="shrink-0 text-emerald" size={15} />
                  {item.text}
                </div>
              );
            })}
          </div>
        </div>

        {/* Religious note */}
        <div className="reveal mt-5 rounded-3xl border border-gold/20 bg-gold-light px-6 py-4 text-center">
          <p className="text-sm font-medium text-stone leading-6">
            <span className="font-bold mr-1" style={{ color: '#A07030' }}>Not:</span>
            Tüm hizmetlerimiz İslam'ın kabir ziyareti adabına uygun, saygılı ve özenli biçimde gerçekleştirilmektedir.
            Hizmet verenlerimiz dini hassasiyetlere vakıf, güvenilir kişilerden oluşmaktadır.
          </p>
        </div>
      </div>
    </section>
  );
}
