import { useEffect, useRef } from 'react';
import { MapPin, ClipboardList, UserCheck, Camera, Bell, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'Talep Oluşturun',
    description:
      'Mezarlık bilgilerini (şehir, mezarlık adı, parsel no) girin, almak istediğiniz hizmetleri seçin ve uygun zaman aralığını belirleyin. İşlem 3 dakika sürer.',
    color: 'emerald',
  },
  {
    number: '02',
    icon: UserCheck,
    title: 'Doğrulanmış Hizmet Veren Atanır',
    description:
      'Sisteminiz, mezarlığa en yakın ve kimlik doğrulaması tamamlanmış hizmet vereni bulur. Hizmet vereninizin profili ve puanı size bildirilir.',
    color: 'gold',
  },
  {
    number: '03',
    icon: MapPin,
    title: 'Hizmet Gerçekleştirilir',
    description:
      'Hizmet veren belirlenen zaman aralığında mezarlığa gider. Varışında konum kaydı alınır. Hizmet, dini hassasiyetlere uygun şekilde özenle yerine getirilir.',
    color: 'sage',
  },
  {
    number: '04',
    icon: Camera,
    title: 'Kanıtlar Size İletilir',
    description:
      'Hizmet sırasında ve sonrasında çekilen fotoğraf ve videolar, zaman ve konum bilgisiyle birlikte güvenli şekilde platformda saklanır ve size gönderilir.',
    color: 'emerald',
  },
  {
    number: '05',
    icon: Bell,
    title: 'Onaylayın ve Değerlendirin',
    description:
      'Kanıtları inceleyerek hizmeti onaylayın. Dilediğinizde hizmet verenizi değerlendirin. Ödeme, onay sonrasında hizmet verene aktarılır.',
    color: 'gold',
  },
];

const colorMap: Record<string, { num: string; bg: string; icon: string; line: string }> = {
  emerald: { num: 'text-emerald', bg: 'bg-emerald-light', icon: 'text-emerald', line: 'bg-emerald/20' },
  gold: { num: 'text-gold', bg: 'bg-gold-light', icon: 'text-gold', line: 'bg-gold/20' },
  sage: { num: 'text-sage', bg: 'bg-emerald-light', icon: 'text-sage', line: 'bg-sage/20' },
};

const defaultColor = { num: 'text-emerald', bg: 'bg-emerald-light', icon: 'text-emerald', line: 'bg-emerald/20' };

export function HowItWorks() {
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.08 },
    );
    const els = revealRef.current?.querySelectorAll('.reveal');
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="nasil-calisir"
      ref={revealRef}
      className="relative py-24 sm:py-32"
      style={{ background: 'linear-gradient(180deg, #FAF7F2 0%, #F3EDE3 100%)' }}
    >
      {/* Decorative pattern */}
      <div className="pattern-bg pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="section-label">Süreç</span>
          <h2 className="section-title mt-3">
            Talep Oluşturmaktan Teslime{' '}
            <span className="text-emerald">5 Adım</span>
          </h2>
          <p className="section-subtitle mt-4">
            Her adım şeffaf, her teslim belgelenmiş. Sevdiklerinizin kabrine yapılan her ziyaret
            size de ulaşır.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16">
          {/* Desktop: horizontal flow */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Connecting line */}
              <div
                className="absolute top-12 left-[10%] right-[10%] h-0.5 opacity-30"
                style={{ background: 'linear-gradient(90deg, #5A7A52, #C8943A, #5A7A52, #C8943A, #5A7A52)' }}
              />

              <div className="grid grid-cols-5 gap-4">
                {steps.map((step, i) => {
                  const Icon = step.icon;
                  const c = colorMap[step.color] ?? defaultColor;
                  return (
                    <div key={step.number} className={`reveal reveal-delay-${Math.min(i + 1, 4)} flex flex-col items-center text-center`}>
                      {/* Icon circle */}
                      <div className={`relative z-10 flex h-24 w-24 flex-col items-center justify-center rounded-3xl border-4 border-white ${c.bg} shadow-card`}>
                        <span className={`text-xs font-black ${c.num}`}>{step.number}</span>
                        <Icon className={`mt-1 ${c.icon}`} size={28} />
                      </div>

                      {/* Text */}
                      <h3 className="mt-5 text-sm font-bold text-ink">{step.title}</h3>
                      <p className="mt-2 text-xs leading-5 text-muted">{step.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile: vertical timeline */}
          <div className="relative lg:hidden">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald/30 via-gold/30 to-emerald/30" />

            <div className="space-y-8">
              {steps.map((step, i) => {
                const Icon = step.icon;
                const c = colorMap[step.color] ?? defaultColor;
                return (
                  <div key={step.number} className={`reveal reveal-delay-${Math.min(i + 1, 4)} relative flex gap-6 pl-4`}>
                    {/* Icon */}
                    <div className={`relative z-10 flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-2xl ${c.bg} border-2 border-white shadow-soft`}>
                      <Icon className={c.icon} size={20} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-black ${c.num}`}>{step.number}</span>
                        <h3 className="text-base font-bold text-ink">{step.title}</h3>
                      </div>
                      <p className="mt-1.5 text-sm leading-6 text-muted">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="reveal mt-14 flex justify-center">
          <a href="#talep-formu" className="btn-primary">
            Hemen Başlayın
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
