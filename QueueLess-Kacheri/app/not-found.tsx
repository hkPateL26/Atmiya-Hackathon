import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-3xl font-black text-slate-900 mb-2">૪૦૪ - પાનું મળ્યું નથી (404)</h2>
      <p className="text-sm text-slate-500 mb-6">આ પાનું અસ્તિત્વમાં નથી અથવા ખસેડવામાં આવ્યું છે.</p>
      <Link href="/" className="px-5 py-2.5 rounded-xl bg-orange-600 text-white font-bold text-xs shadow-md">
        હોમ પેજ પર પાછા જાઓ
      </Link>
    </div>
  );
}
