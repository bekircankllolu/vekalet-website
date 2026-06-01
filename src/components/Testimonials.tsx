import { useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ayşe Kaya',
    city: 'İstanbul',
    origin: 'Konyalı',
    service: 'Mezar Temizliği + Fatiha',
    rating: 5,
    text: 'Annem Konya\'da medfun. Bayram öncesi gidip kabri ziyaret etmek her seferinde mümkün olmuyor. Vekalet sayesinde güvenilir biri gidip hem temizledi hem Fatiha okudu. Fotoğrafları gördüğümde içim rahatladı. Allah razı olsun.',
    date: 'Nisan 2025',
    avatar: 'AK',
    avatarColor: 'bg-emerald-light text-emerald',
  },
  {
    name: 'Mehmet Yıldız',
    city: 'İstanbul',
    origin: 'Trabzonlu',
    service: 'Bayram Paketi',
    rating: 5,
    text: 'Babamın kabri Trabzon\'da. Kurban bayramı öncesi hizmet talep ettim. Hem temizlik yaptılar hem çiçek bıraktılar hem de dua okudular. Konum bilgisiyle birlikte gelen fotoğraflar çok güvende hissettirdi. Kesinlikle tavsiye ederim.',
    date: 'Haziran 2025',
    avatar: 'MY',
    avatarColor: 'bg-gold-light text-gold',
  },
  {
    name: 'Fatma Şahin',
    city: 'Ankara',
    origin: 'İzmirli',
    service: 'Çiçek + Fotoğraf Kanıtı',
    rating: 5,
    text: 'Ankarada yaşıyorum, kayınvalidem İzmir\'de vefat etti. Eşim her bayram gidemediği için üzülüyordu. Vekalet\'i keşfettik, hizmet verenimiz çok özenli davrandı. Gönderilen fotoğrafları gören eşim hüzünlendi ama huzur buldu.',
    date: 'Mayıs 2025',
    avatar: 'FŞ',
    avatarColor: 'bg-parchment text-stone',
  },
  {
    name: 'Hasan Demir',
    city: 'İstanbul',
    origin: 'Sivas\'lı',
    service: 'Mezar Temizliği',
    rating: 5,
    text: 'Dedemin mezarı Sivas\'ta, yıllardır temizlik yapamıyorduk. İlk başta tereddüt ettim ama hizmet verenin profili, puanı ve kimlik doğrulaması güven verdi. Hizmet sonrası gelen fotoğraflar ve videolar mükemmeldi. Çok teşekkürler.',
    date: 'Mart 2025',
    avatar: 'HD',
    avatarColor: 'bg-emerald-light text-emerald',
  },
  {
    name: 'Zeynep Arslan',
    city: 'İzmir',
    origin: 'Erzurumlu',
    service: 'Fatiha + Çiçek',
    rating: 5,
    text: 'Annem geçen yıl vefat etti. Babam Erzurum\'da, yalnız başına gidip ziyaret etmek istemiyor. Vekalet aracılığıyla düzenli bakım yaptırıyoruz. Her hizmet sonrası gelen kanıtları birlikte izliyoruz. Çok kıymetli bir hizmet.',
    date: 'Nisan 2025',
    avatar: 'ZA',
    avatarColor: 'bg-gold-light text-gold',
  },
  {
    name: 'Ali Öztürk',
    city: 'Bursa',
    origin: 'Kayserili',
    service: 'Bayram Paketi',
    rating: 5,
    text: 'Anneannemi Kayseri\'ye defnettik. Her bayram gidemiyoruz. Bu uygulama bulunmaz bir nimet oldu. Hizmet veren Fatiha okurken çekilen video beni derinden duygulandırdı. Allah bu hizmeti verenlerin ellerini dert görmesin.',
    date: 'Mayıs 2025',
    avatar: 'AÖ',
    avatarColor: 'bg-parchment text-stone',
  },
];

function Stars({ count, size = 16 }: { count: number; size?: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(count)].map((_, i) => (
        <Star key={i} className="text-gold" size={size} fill="currentColor" />
      ))}
    </div>
  );
}

export function Testimonials() {
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.06 },
    );
    revealRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="yorumlar" ref={revealRef} className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="section-label">Müşteri Yorumları</span>
          <h2 className="section-title mt-3">
            Binlerce Aile{' '}
            <span className="text-emerald">Güveniyor</span>
          </h2>
          <p className="section-subtitle mt-4">
            Uzaktaki sevdiklerinin kabirlerini ziyaret edemeyen aileler, Vekalet sayesinde
            huzur buldu. İşte onların samimi deneyimleri.
          </p>
        </div>

        {/* Masonry grid */}
        <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`reveal reveal-delay-${Math.min((i % 3) + 1, 4)} card mb-6 break-inside-avoid`}
            >
              {/* Quote icon */}
              <Quote className="text-emerald/20" size={32} />

              {/* Stars */}
              <div className="mt-1">
                <Stars count={t.rating} />
              </div>

              {/* Text */}
              <p className="mt-3 text-sm leading-7 text-muted italic">"{t.text}"</p>

              {/* Service tag */}
              <div className="mt-3">
                <span className="tag text-2xs">{t.service}</span>
              </div>

              {/* Footer */}
              <div className="mt-4 flex items-center gap-3 border-t border-line pt-4">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${t.avatarColor}`}
                >
                  {t.avatar}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-ink truncate">{t.name}</p>
                  <p className="text-xs text-muted">
                    {t.city} · {t.origin} · {t.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary rating bar */}
        <div className="reveal mt-10 grid rounded-4xl border border-line bg-white shadow-soft sm:grid-cols-3">
          {/* Stat 1 — Ortalama Puan */}
          <div className="flex flex-col items-center justify-center gap-3 px-8 py-8 text-center">
            <span className="font-display text-6xl font-bold leading-none text-emerald">4.9</span>
            <div className="flex items-center gap-1">
              <Stars count={5} />
            </div>
            <div>
              <p className="text-sm font-bold text-ink">Ortalama Puan</p>
              <p className="mt-0.5 text-xs text-muted">1.200+ değerlendirmeden</p>
            </div>
          </div>

          {/* Dividers */}
          <div className="flex flex-col items-center justify-center gap-3 border-y border-line px-8 py-8 text-center sm:border-x sm:border-y-0">
            <span className="font-display text-6xl font-bold leading-none text-gold">1.200+</span>
            <div>
              <p className="text-sm font-bold text-ink">Tamamlanan Hizmet</p>
              <p className="mt-0.5 text-xs text-muted">ve her biri belgelenmiş</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 px-8 py-8 text-center">
            <span className="font-display text-6xl font-bold leading-none text-emerald">98%</span>
            <div>
              <p className="text-sm font-bold text-ink">Müşteri Memnuniyeti</p>
              <p className="mt-0.5 text-xs text-muted">doğrulanmış yorumlara göre</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
