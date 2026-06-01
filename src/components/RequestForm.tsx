import { useEffect, useRef, useState } from 'react';
import {
  MapPin, Phone, Send, CheckCircle2, ChevronDown,
  User, MessageSquare, Sparkles, Flower2, Crown, Loader2, LogIn,
} from 'lucide-react';
import { OtpModal } from './OtpModal';
import { createGrave, createOrder, startCheckout, registerProfile, ApiError } from '../lib/api';
import { getSession, type AuthUser } from '../lib/auth';

const cities = [
  'Adana','Adıyaman','Afyonkarahisar','Ağrı','Aksaray','Amasya','Ankara','Antalya',
  'Ardahan','Artvin','Aydın','Balıkesir','Bartın','Batman','Bayburt','Bilecik',
  'Bingöl','Bitlis','Bolu','Burdur','Bursa','Çanakkale','Çankırı','Çorum',
  'Denizli','Diyarbakır','Düzce','Edirne','Elazığ','Erzincan','Erzurum','Eskişehir',
  'Gaziantep','Giresun','Gümüşhane','Hakkari','Hatay','Iğdır','Isparta','İstanbul',
  'İzmir','Kahramanmaraş','Karabük','Karaman','Kars','Kastamonu','Kayseri','Kilis',
  'Kırıkkale','Kırklareli','Kırşehir','Kocaeli','Konya','Kütahya','Malatya','Manisa',
  'Mardin','Mersin','Muğla','Muş','Nevşehir','Niğde','Ordu','Osmaniye','Rize',
  'Sakarya','Samsun','Şanlıurfa','Siirt','Sinop','Şırnak','Sivas','Tekirdağ',
  'Tokat','Trabzon','Tunceli','Uşak','Van','Yalova','Yozgat','Zonguldak',
];

const packages = [
  { id: 'temel', label: 'Temel Bakım', sublabel: 'Temizlik + Fatiha + Fotoğraf', price: 750, icon: Sparkles, iconBg: 'bg-emerald-light', iconColor: 'text-emerald', popular: false },
  { id: 'tam', label: 'Tam Bakım', sublabel: 'Temel + Taze çiçek bırakma', price: 950, icon: Flower2, iconBg: 'bg-gold-light', iconColor: 'text-gold', popular: true },
  { id: 'premium', label: 'Bayram & Premium', sublabel: 'Tam Bakım + Öncelikli hizmet', price: 1350, icon: Crown, iconBg: 'bg-parchment', iconColor: 'text-sage', popular: false },
];

const PACKAGE_SERVICE_IDS: Record<string, string> = {
  temel: '00000000-0000-0000-0000-000000000001',
  tam: '00000000-0000-0000-0000-000000000001',
  premium: '00000000-0000-0000-0000-000000000001',
};

const PLATFORM_FEE = 0.2;

type FormState = 'idle' | 'submitting' | 'success' | 'error' | 'payment';

export function RequestForm() {
  const revealRef = useRef<HTMLDivElement>(null);
  const [selectedPackage, setSelectedPackage] = useState<string>('tam');
  const [city, setCity] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cemeteryName, setCemeteryName] = useState('');
  const [plotInfo, setPlotInfo] = useState('');
  const [note, setNote] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  useEffect(() => {
    getSession().then(setAuthUser).catch(() => null);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.06 },
    );
    revealRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const selectedPkg = packages.find((p) => p.id === selectedPackage) ?? packages[1]!;
  const subtotal = selectedPkg.price;
  const platformFee = Math.round(subtotal * PLATFORM_FEE);
  const total = subtotal + platformFee;

  const handleOtpSuccess = async (user: AuthUser) => {
    setAuthUser(user);
    setShowOtpModal(false);
    try {
      await registerProfile(user.accessToken, user.id, name || 'Kullanıcı', user.phone);
    } catch {
      // Zaten kayıtlıysa ignore
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPackage || !city || !name || !phone) return;

    if (!authUser) {
      setShowOtpModal(true);
      return;
    }

    setFormState('submitting');
    setErrorMsg('');

    try {
      const grave = await createGrave(authUser.accessToken, {
        cemeteryName: cemeteryName || `${city} Mezarlığı`,
        city,
        description: plotInfo || undefined,
      });

      const start = new Date(Date.now() + 7 * 86400000).toISOString();
      const end = new Date(Date.now() + 7 * 86400000 + 3600000).toISOString();
      const serviceId = PACKAGE_SERVICE_IDS[selectedPackage] ?? PACKAGE_SERVICE_IDS['tam']!;

      const order = await createOrder(authUser.accessToken, {
        graveId: grave.id,
        scheduledStartAt: start,
        scheduledEndAt: end,
        note: [plotInfo && `Parsel: ${plotInfo}`, note].filter(Boolean).join(' | ') || undefined,
        items: [{ serviceId, quantity: 1, addonIds: [] }],
      });

      const checkout = await startCheckout(authUser.accessToken, order.id);

      if (checkout.paymentPageUrl) {
        setCheckoutUrl(checkout.paymentPageUrl);
        setFormState('payment');
      } else {
        setFormState('success');
      }
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Bir hata oluştu. Lütfen tekrar deneyin.';
      setErrorMsg(msg);
      setFormState('error');
    }
  };

  if (formState === 'payment' && checkoutUrl) {
    return (
      <section id="talep-formu" className="py-24 sm:py-32 bg-cream">
        <div className="mx-auto max-w-lg px-4 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-light">
            <Send className="text-emerald" size={44} />
          </div>
          <h2 className="mt-6 font-display text-3xl font-bold text-ink">Siparişiniz Oluşturuldu</h2>
          <p className="mt-4 text-base leading-7 text-muted">
            Ödeme sayfasına yönlendiriliyorsunuz. Ödeme tamamlandıktan sonra hizmetiniz aktif olacak.
          </p>
          <a href={checkoutUrl} className="btn-primary mt-8 inline-flex justify-center">
            Ödeme Sayfasına Git
          </a>
          <button className="mt-3 block w-full text-center text-sm text-muted" onClick={() => setFormState('idle')}>
            Geri Dön
          </button>
        </div>
      </section>
    );
  }

  if (formState === 'success') {
    return (
      <section id="talep-formu" className="py-24 sm:py-32 bg-cream">
        <div className="mx-auto max-w-lg px-4 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-light">
            <CheckCircle2 className="text-emerald" size={44} />
          </div>
          <h2 className="mt-6 font-display text-3xl font-bold text-ink">Talebiniz Alındı</h2>
          <p className="mt-4 text-base leading-7 text-muted">
            En kısa sürede uygun bir hizmet veren bulup sizinle iletişime geçeceğiz.
          </p>
          <p className="mt-3 text-sm font-medium text-stone">
            Rabbimiz, rahmetini, mağfiretini geçmişlerimizin üzerine daim eylesin. Âmîn.
          </p>
          <button className="btn-primary mt-8" onClick={() => setFormState('idle')}>Yeni Talep Oluştur</button>
        </div>
      </section>
    );
  }

  return (
    <>
      {showOtpModal && (
        <OtpModal onSuccess={handleOtpSuccess} onClose={() => setShowOtpModal(false)} initialPhone={phone} />
      )}
      <section id="talep-formu" ref={revealRef} className="py-24 sm:py-32"
        style={{ background: 'linear-gradient(180deg, #FAF7F2 0%, #F3EDE3 100%)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="reveal mx-auto max-w-2xl text-center">
            <span className="section-label">Talep Oluştur</span>
            <h2 className="section-title mt-3">
              Birkaç Adımda <span className="text-emerald">Talebinizi Oluşturun</span>
            </h2>
            <p className="section-subtitle mt-4">
              Formu doldurun, uygun fiyatı anında görün. Size en yakın doğrulanmış hizmet verenimiz belirlenen gün ve saatte mezarlıkta olacak.
            </p>
            {authUser && (
              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-light px-4 py-1.5 text-sm font-medium text-emerald">
                <CheckCircle2 size={14} />{authUser.phone} ile giriş yapıldı
              </div>
            )}
          </div>

          <div className="reveal mt-14 grid gap-8 lg:grid-cols-[1fr_380px]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="card">
                <h3 className="text-base font-bold text-ink flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald text-white text-xs font-black">1</span>
                  Kişisel Bilgiler
                </h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-stone" htmlFor="name">Ad Soyad *</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone/50" size={16} />
                      <input id="name" type="text" className="input-field pl-10" placeholder="Adınız ve soyadınız" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-stone" htmlFor="phone">Telefon Numarası *</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone/50" size={16} />
                      <input id="phone" type="tel" className="input-field pl-10" placeholder="0532 000 00 00" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="text-base font-bold text-ink flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald text-white text-xs font-black">2</span>
                  Mezar Bilgileri
                </h3>
                <div className="mt-4 grid gap-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-stone" htmlFor="city">Mezarlığın Bulunduğu Şehir *</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone/50" size={16} />
                      <select id="city" className="input-field cursor-pointer appearance-none pl-10 pr-10" value={city} onChange={(e) => setCity(e.target.value)} required>
                        <option value="">Şehir seçiniz</option>
                        {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-stone/50" size={16} />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-stone" htmlFor="cemetery">Mezarlık Adı</label>
                      <input id="cemetery" type="text" className="input-field" placeholder="ör. Zincirlikuyu Mezarlığı" value={cemeteryName} onChange={(e) => setCemeteryName(e.target.value)} />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-stone" htmlFor="plot">Ada / Parsel / Mezar No</label>
                      <input id="plot" type="text" className="input-field" placeholder="ör. Ada 12, Parsel 45" value={plotInfo} onChange={(e) => setPlotInfo(e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="text-base font-bold text-ink flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald text-white text-xs font-black">3</span>
                  Paket Seçimi *
                </h3>
                <div className="mt-4 grid gap-3">
                  {packages.map((pkg) => {
                    const Icon = pkg.icon;
                    const active = selectedPackage === pkg.id;
                    return (
                      <button key={pkg.id} type="button" onClick={() => setSelectedPackage(pkg.id)}
                        className={['flex items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-150', active ? 'border-emerald bg-emerald-light ring-1 ring-emerald/30' : 'border-line bg-white hover:border-sage/40 hover:bg-parchment'].join(' ')}>
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${active ? 'bg-emerald' : pkg.iconBg}`}>
                          <Icon className={active ? 'text-white' : pkg.iconColor} size={20} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className={`text-sm font-bold ${active ? 'text-emerald' : 'text-ink'}`}>{pkg.label}</p>
                            {pkg.popular && <span className="rounded-full bg-gold px-2 py-0.5 text-2xs font-bold text-white">Popüler</span>}
                          </div>
                          <p className="text-xs text-muted mt-0.5">{pkg.sublabel}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className={`text-base font-black ${active ? 'text-emerald' : 'text-ink'}`}>{pkg.price.toLocaleString('tr-TR')} ₺</p>
                        </div>
                        <div className={['h-5 w-5 shrink-0 rounded-full border-2 transition-all', active ? 'border-emerald bg-emerald' : 'border-line'].join(' ')}>
                          {active && <svg viewBox="0 0 20 20" fill="white" className="h-full w-full"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="card">
                <h3 className="text-base font-bold text-ink flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald text-white text-xs font-black">4</span>
                  Ek Notlar
                </h3>
                <div className="mt-4">
                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-3.5 text-stone/50" size={16} />
                    <textarea className="input-field min-h-[100px] pl-10 pt-3 resize-none" placeholder="Özel istekleriniz..." value={note} onChange={(e) => setNote(e.target.value)} rows={4} />
                  </div>
                </div>
              </div>

              <button type="submit" disabled={formState === 'submitting' || !selectedPackage}
                className={['btn-primary w-full justify-center py-4 text-base', formState === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''].join(' ')}>
                {formState === 'submitting' ? (
                  <><Loader2 className="animate-spin" size={18} />İşleniyor...</>
                ) : !authUser ? (
                  <><LogIn size={18} />Giriş Yap ve Devam Et</>
                ) : (
                  <><Send size={18} />Talebi Gönder ve Öde</>
                )}
              </button>

              {formState === 'error' && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {errorMsg || 'Bir hata oluştu.'}{' '}
                  <a href="tel:08500000000" className="font-bold">0850 000 00 00</a>
                </div>
              )}
            </form>

            <div className="space-y-4">
              <div className="sticky top-24 card">
                <h3 className="text-base font-bold text-ink">Fiyat Özeti</h3>
                <div className="mt-4">
                  {(() => {
                    const Icon = selectedPkg.icon;
                    return (
                      <div className={`flex items-center gap-3 rounded-2xl p-3 ${selectedPkg.iconBg}`}>
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/60">
                          <Icon className={selectedPkg.iconColor} size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-ink">{selectedPkg.label}</p>
                          <p className="text-xs text-muted">{selectedPkg.sublabel}</p>
                        </div>
                      </div>
                    );
                  })()}
                </div>
                <div className="mt-4 border-t border-line pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Hizmet bedeli</span>
                    <span className="font-semibold text-ink">{subtotal.toLocaleString('tr-TR')} ₺</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Platform hizmet bedeli (%20)</span>
                    <span className="font-semibold text-ink">{platformFee.toLocaleString('tr-TR')} ₺</span>
                  </div>
                  <div className="flex justify-between rounded-2xl bg-emerald-light px-3 py-2.5">
                    <span className="font-bold text-emerald">Toplam</span>
                    <span className="font-black text-emerald">{total.toLocaleString('tr-TR')} ₺</span>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {['Ödeme hizmet onayından sonra alınır', 'Doğrulanmış hizmet veren güvencesi', 'Fotoğraflı teslim kanıtı'].map((n) => (
                    <div key={n} className="flex items-center gap-2 text-xs text-muted">
                      <CheckCircle2 className="shrink-0 text-emerald" size={13} />{n}
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl border border-gold/20 bg-gold-light p-5">
                <p className="text-xs font-medium text-stone leading-6 italic text-center">
                  "Kim bir Müslüman kardeşinin ihtiyacını giderirse, Allah da onun ihtiyacını giderir."
                </p>
                <p className="mt-2 text-center text-2xs font-semibold text-bark">— Hz. Muhammed (s.a.v.)</p>
              </div>
              <div className="card text-center">
                <p className="text-sm font-semibold text-ink">Sorunuz mu var?</p>
                <p className="mt-1 text-xs text-muted">Hemen arayın, size yardımcı olalım.</p>
                <a href="tel:08500000000" className="mt-3 flex items-center justify-center gap-2 text-sm font-bold text-emerald">
                  <Phone size={15} />0850 000 00 00
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
