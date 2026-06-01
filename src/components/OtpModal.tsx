import { useState } from 'react';
import { Phone, Shield, X, Loader2 } from 'lucide-react';
import { sendOtp, verifyOtp, type AuthUser } from '../lib/auth';

interface OtpModalProps {
  onSuccess: (user: AuthUser) => void;
  onClose: () => void;
  initialPhone?: string;
}

type Step = 'phone' | 'otp';

export function OtpModal({ onSuccess, onClose, initialPhone = '' }: OtpModalProps) {
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState(initialPhone);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setLoading(true);
    setError('');
    try {
      await sendOtp(phone);
      setStep('otp');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'SMS gönderilemedi.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;
    setLoading(true);
    setError('');
    try {
      const user = await verifyOtp(phone, otp);
      onSuccess(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kod hatalı, tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-light">
            {step === 'phone' ? <Phone className="text-emerald" size={22} /> : <Shield className="text-emerald" size={22} />}
          </div>
          <button onClick={onClose} className="text-stone/60 hover:text-stone transition-colors">
            <X size={20} />
          </button>
        </div>
        <h2 className="mt-4 font-display text-xl font-bold text-ink">
          {step === 'phone' ? 'Telefon ile Giriş' : 'Doğrulama Kodu'}
        </h2>
        <p className="mt-1 text-sm text-muted">
          {step === 'phone'
            ? 'Telefon numaranıza SMS doğrulama kodu göndereceğiz.'
            : `${phone} numarasına gönderilen 6 haneli kodu girin.`}
        </p>

        {step === 'phone' && (
          <form onSubmit={handleSendOtp} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-stone" htmlFor="otp-phone">Telefon Numarası</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone/50" size={16} />
                <input id="otp-phone" type="tel" className="input-field pl-10" placeholder="0532 000 00 00" value={phone} onChange={(e) => setPhone(e.target.value)} required autoFocus />
              </div>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
              {loading ? <Loader2 className="animate-spin" size={18} /> : 'Kod Gönder'}
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-stone" htmlFor="otp-code">Doğrulama Kodu</label>
              <input id="otp-code" type="text" inputMode="numeric" pattern="[0-9]{6}" maxLength={6}
                className="input-field text-center text-xl tracking-[0.5em] font-bold"
                placeholder="000000" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} required autoFocus />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button type="submit" disabled={loading || otp.length < 6} className="btn-primary w-full justify-center">
              {loading ? <Loader2 className="animate-spin" size={18} /> : 'Doğrula ve Devam Et'}
            </button>
            <button type="button" onClick={() => { setStep('phone'); setOtp(''); setError(''); }}
              className="w-full text-center text-sm text-muted hover:text-stone transition-colors">
              Farklı numara kullan
            </button>
          </form>
        )}

        <p className="mt-4 text-center text-xs text-muted">
          Devam ederek <a href="#" className="text-emerald underline">Kullanım Koşullarını</a> kabul etmiş olursunuz.
        </p>
      </div>
    </div>
  );
}
