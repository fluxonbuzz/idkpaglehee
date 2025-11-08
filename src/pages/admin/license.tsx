import { useEffect, useState, ChangeEvent } from 'react';
import Head from 'next/head';
import { Shield, Key, Sparkles } from 'lucide-react';

export default function AdminLicense() {
  const [animatedBg, setAnimatedBg] = useState(true);
  const [authToken, setAuthToken] = useState<string>('');
  const [plan, setPlan] = useState<string>('standard');
  const [days, setDays] = useState<number>(30);
  const [deviceId, setDeviceId] = useState<string>('');
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    try {
      const token = localStorage.getItem('authToken') || '';
      setAuthToken(token);
    } catch {}
  }, []);

  return (
    <div className={`min-h-screen text-white relative overflow-hidden ${animatedBg ? 'animated-bg' : 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900'}`}>
      <Head>
        <title>Admin • License Generator</title>
      </Head>

      <div className="absolute top-4 right-4 z-10">
        <button onClick={() => setAnimatedBg(!animatedBg)} className="bg-gray-800/80 backdrop-blur-sm border border-cyan-500/30 rounded-xl px-4 py-2 flex items-center gap-2 hover:bg-gray-700/80 transition-all">
          <Sparkles className="w-4 h-4" />{animatedBg ? 'Disable Effects' : 'Enable Effects'}
        </button>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <header className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 text-cyan-400 mr-4" />
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">License Generator</h1>
          </div>
          <p className="text-gray-400">Create device-bound license keys</p>
        </header>

        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800/60 border border-cyan-500/20 rounded-2xl p-8 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-6">
              <Key className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-semibold">Generate Key</h2>
            </div>

            <div className="space-y-4">
              <div className="text-sm text-gray-400">{authToken ? 'Admin token detected. You can generate keys.' : 'No admin token found. Please log in at /admin/login'}</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Plan</label>
                  <input value={plan} onChange={(e: ChangeEvent<HTMLInputElement>) => setPlan(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Duration (days)</label>
                  <input type="number" value={days} onChange={(e: ChangeEvent<HTMLInputElement>) => setDays(parseInt(e.target.value || '0', 10))} className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Device ID (optional to pre-bind)</label>
                <input value={deviceId} onChange={(e: ChangeEvent<HTMLInputElement>) => setDeviceId(e.target.value)} placeholder="Leave empty to bind on first activation" className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all" />
              </div>

              <button
                onClick={async () => {
                  try {
                    setResult('');
                    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
                    if (authToken) headers['Authorization'] = `Bearer ${authToken}`;
                    const res = await fetch('/api/license/create', {
                      method: 'POST',
                      headers,
                      body: JSON.stringify({ days, plan, deviceId: deviceId || undefined })
                    });
                    const data = await res.json();
                    if (!res.ok) throw new Error(data?.message || 'Failed');
                    setResult(data.key);
                  } catch (e: any) {
                    setResult(`Error: ${e?.message || 'Failed'}`);
                  }
                }}
                disabled={!authToken}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all disabled:opacity-50"
              >
                Generate License Key
              </button>

              {result && (
                <div className="mt-4 p-4 bg-gray-700/50 border border-gray-600 rounded-xl text-cyan-300">
                  <div className="flex items-center justify-between gap-3">
                    <div className="break-all flex-1">{result}</div>
                    <button
                      onClick={async () => { try { await navigator.clipboard.writeText(result); } catch {} }}
                      className="shrink-0 bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded-lg text-sm"
                    >Copy</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animated-bg { background: linear-gradient(-45deg, #1a202c, #2d3748, #1a202c, #2d3748); background-size: 400% 400%; animation: gradient 15s ease infinite; }
        @keyframes gradient { 0% {background-position: 0% 50%;} 50% {background-position: 100% 50%;} 100% {background-position: 0% 50%;} }
      `}</style>
    </div>
  );
}
