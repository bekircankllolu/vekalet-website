import { useEffect, useRef } from 'react';
import {
  ShieldCheck,
  UserCheck,
  Lock,
  MapPin,
  Heart,
  BookOpen,
  CreditCard,
  Bell,
} from 'lucide-react';

const pillars = [
  {
    icon: UserCheck,
    title: 'Kimlik Doğrulamalı Hizmet Verenler',
    description:
      'Her hizmet verenimiz, başvuru sürecinde kimlik doğrulamasından geçirilir. Hizmet alanları ve referansları kontrol edilir. Yalnızca güvenilir kişiler platforma kabul edilir.',
    color: 'emerald',
  },
  {
    icon: Heart,
    title: 'Dini Hassasiyetlere Uyum',
    description:
      "Hizmet verenlerimiz İslam'ın kabir ziyareti adabına, dua ve hizmet usullerine vakıf kişilerdir. Hizmet sırasında dini hassasiyetlere tam uyum sağlanır.",
    color: 'gold',
  },
  {
    icon: Lock,
    title: 'Güvenli Ödeme Sistemi',
    description:
      'Ödemeler, hizmet tamamlanıp onaylanana kadar güvenli şekilde tutulur. İyzico altyapısıyla 256-bit SSL şifrelemeli ödeme işlemi gerçekleştirilir.',
    color: 'sage',
  },
  {
    icon: MapPin,
    title: 'Konum ve Zaman Doğrulaması',
    description:
      'Her hizmet, GPS konum kaydıyla başlar. Hizmet verenin mezarlıkta olduğu, varış ve çıkış zamanı sistem tarafından otomatik olarak kaydedilir.',
    color: 'emerald',
  },
  {
    icon: BookOpen,
    title: 'KVKK ve Gizlilik',
    description:
      'Kişisel bilgileriniz ve aile kabirlerinize ilişkin tüm veriler, KVKK kapsamında korunur. Verileriniz üçüncü taraflarla asla paylaşılmaz.',
    color: 'gold',
  },
  {
    icon: Bell,
    title: 'Anlık Bildirimler',
    description:
      'Hizmet verenin yola çıkışı, mezarlığa varışı, hizmet tamamlanması ve kanıt yüklemesi anında SMS ve e-posta ile bildirilir. Her adımı takip edersiniz.',
    color: 'sage',
  },
];

const colorMap: Record<string, { bg: string; icon: string }> = {
  emerald: { bg: 'bg-emerald-light', icon: 'text-emerald' },
  gold: { bg: 'bg-gold-light', icon: 'text-gold' },
  sage: { bg: 'bg-parchment', icon: 'text-sage' },
};

const defaultTrustColor = { bg: 'bg-emerald-light', icon: 'text-emerald' };

export function Trust() {
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
    <section
      id="guven"
      ref={revealRef}
      className="py-24 sm:py-32"
      style={{ background: 'linear-gradient(180deg, #F3EDE3 0%, #FAF7F2 100%)' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="section-label">Güven & Güvenlik</span>
          <h2 className="section-title mt-3">
            Her Adımda{' '}
            <span className="text-emerald">Güvende Hissedebilirsiniz</span>
          </h2>
          <p className="section-subtitle mt-4">
            Sevdiklerinize olan sorumluluğu ciddiye alıyoruz. Platformumuzdaki her mekanizma,
            hem dini hassasiyetlere hem de dijital güvenliğe uygun olarak tasarlanmıştır.
          </p>
        </div>

        {/* Pillar cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            const c = colorMap[pillar.color] ?? defaultTrustColor;
            return (
              <div
                key={pillar.title}
                className={`reveal card-hover reveal-delay-${Math.min(i + 1, 4)}`}
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${c.bg}`}>
                  <Icon className={c.icon} size={22} />
                </div>
                <h3 className="mt-4 text-base font-bold text-ink">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{pillar.description}</p>
              </div>
            );
          })}
        </div>

        {/* Security banner */}
        <div
          className="reveal mt-14 overflow-hidden rounded-4xl"
          style={{ background: 'linear-gradient(135deg, #2E5A28 0%, #3D5A38 50%, #2E5A28 100%)' }}
        >
          <div className="relative px-8 py-10 sm:px-12 sm:py-12">
            {/* Background pattern */}
            <div className="pointer-events-none absolute inset-0 opacity-10">
              <div className="pattern-bg h-full w-full" />
            </div>

            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-white/80" size={28} />
                  <h3 className="text-xl font-bold text-white">
                    Güvenilir Platformumuz Hakkında
                  </h3>
                </div>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/75">
                  Vekalet, Türk hukuku kapsamında faaliyet göstermekte ve verileriniz yurt içi sunucularda
                  KVKK uyumlu biçimde saklanmaktadır. Ödeme altyapımız PCI-DSS sertifikalı iyzico üzerinden
                  çalışmaktadır. Hizmet verenlerimiz ile aramızdaki sözleşmeler, sizin güvenliğinizi ön planda
                  tutacak şekilde hazırlanmıştır.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {[
                    { icon: Lock, label: 'SSL 256-bit Şifreleme' },
                    { icon: CreditCard, label: 'PCI-DSS Ödeme' },
                    { icon: ShieldCheck, label: 'KVKK Uyumlu' },
                    { icon: UserCheck, label: 'KYC Doğrulamalı' },
                  ].map((badge) => {
                    const BadgeIcon = badge.icon;
                    return (
                      <div
                        key={badge.label}
                        className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2"
                      >
                        <BadgeIcon className="text-white/70" size={14} />
                        <span className="text-xs font-semibold text-white/80">{badge.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Trust score visual */}
              <div className="flex flex-col items-center gap-2 rounded-3xl border border-white/20 bg-white/10 px-8 py-6 text-center backdrop-blur-sm lg:min-w-[160px]">
                <span className="font-display text-5xl font-bold text-white">4.9</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-white/60">1.200+ değerlendirme</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
