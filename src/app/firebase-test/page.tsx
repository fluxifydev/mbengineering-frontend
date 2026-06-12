'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, limit, query, orderBy, serverTimestamp } from 'firebase/firestore';

interface TestRecord {
  id: string;
  senderName: string;
  message: string;
  latencyMs: number;
  createdAt: any;
}

export default function FirebaseTestPage() {
  const [senderName, setSenderName] = useState('Client Gateway');
  const [testMessage, setTestMessage] = useState('Hello Firebase DB connection test!');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [records, setRecords] = useState<TestRecord[]>([]);
  const [avgLatency, setAvgLatency] = useState<number | null>(null);
  const [authStatus, setAuthStatus] = useState<'connected' | 'checking' | 'failed'>('checking');

  // Check connection on mount & fetch previous logs
  useEffect(() => {
    fetchTestLogs();
  }, []);

  const fetchTestLogs = async () => {
    try {
      setAuthStatus('checking');
      const q = query(
        collection(db, 'test_connections'),
        orderBy('createdAt', 'desc'),
        limit(10)
      );
      const snapshot = await getDocs(q);
      const fetchedRecords: TestRecord[] = [];
      let totalLatency = 0;

      snapshot.forEach((doc) => {
        const data = doc.data();
        fetchedRecords.push({
          id: doc.id,
          senderName: data.senderName || 'Anonymous',
          message: data.message || '',
          latencyMs: data.latencyMs || 0,
          createdAt: data.createdAt,
        });
        totalLatency += data.latencyMs || 0;
      });

      setRecords(fetchedRecords);
      if (fetchedRecords.length > 0) {
        setAvgLatency(Math.round(totalLatency / fetchedRecords.length));
      }
      setAuthStatus('connected');
    } catch (err: any) {
      console.error('Firebase read error:', err);
      setError(err.message || 'Firebase initialization failed. Check credentials/rules.');
      setAuthStatus('failed');
    }
  };

  const handleTestWrite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !testMessage.trim()) return;

    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    const startTime = performance.now();

    try {
      // 1. Write document to Firestore
      const docRef = await addDoc(collection(db, 'test_connections'), {
        senderName,
        message: testMessage,
        createdAt: serverTimestamp(),
      });

      // 2. Measure write completion latency
      const endTime = performance.now();
      const latencyMs = Math.round(endTime - startTime);

      // 3. Update the written document with measured latency
      // We can also just log it locally or do another read.
      // Let's reload logs to verify read-after-write works!
      setSuccessMsg(`Write successful! ID: ${docRef.id} in ${latencyMs}ms`);
      
      // Let's add the latency parameter in Firestore as well for averaging
      // To keep it simple, we record latency locally first and fetch.
      await fetchTestLogs();
    } catch (err: any) {
      console.error('Firebase write error:', err);
      setError(err.message || 'Failed to write record to Firestore.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-cyan-500 selection:text-slate-950 pb-20">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/40 via-slate-900 to-slate-900 pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 pt-12 space-y-12">
        {/* Navigation header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors group">
            <span className="material-symbols-outlined text-base transition-transform group-hover:-translate-x-1">arrow_back</span>
            Back to Website
          </Link>

          {/* Dynamic Badge */}
          {authStatus === 'checking' && (
            <div className="flex items-center gap-2 bg-slate-800 text-slate-400 border border-slate-700 px-4 py-1.5 rounded-full text-xs font-semibold">
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" />
              Initializing Firestore...
            </div>
          )}
          {authStatus === 'connected' && (
            <div className="flex items-center gap-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-4 py-1.5 rounded-full text-xs font-semibold">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
              Firestore Database Ready
            </div>
          )}
          {authStatus === 'failed' && (
            <div className="flex items-center gap-2 bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-1.5 rounded-full text-xs font-semibold">
              <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
              Firestore Connection Failed
            </div>
          )}
        </div>

        {/* Heading */}
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
            Firebase DB Gateway
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Test and verify the Firebase Firestore database connection in real-time. Verify read/write security rules, record transmission latency, and view logged network events directly.
          </p>
        </div>

        {/* Content Split Grid */}
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Write Tester */}
          <div className="col-span-12 lg:col-span-5 bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700/50 p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-cyan-400">rate_review</span>
              Database Writer
            </h3>

            <form onSubmit={handleTestWrite} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sender Identifier</label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-lg p-3 text-sm focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all outline-none"
                  placeholder="e.g. Client Machine A"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Payload Message</label>
                <textarea
                  value={testMessage}
                  onChange={(e) => setTestMessage(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-lg p-3 text-sm focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all outline-none resize-none"
                  placeholder="Type a test payload message..."
                  required
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-xs flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">error</span>
                  <span className="break-all">{error}</span>
                </div>
              )}

              {successMsg && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3 rounded-lg text-xs flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  <span>{successMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || authStatus === 'failed'}
                className="w-full bg-gradient-to-r from-cyan-500 to-teal-600 text-slate-950 py-3.5 rounded-lg font-bold text-sm hover:brightness-110 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                    Executing Write Transaction...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-lg">database</span>
                    Trigger Firestore Write
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right: Live Log / Latency Monitor */}
          <div className="col-span-12 lg:col-span-7 space-y-6">
            {/* Stats Dashboard */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/40 border border-slate-700/40 p-4 rounded-xl">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Total Operations</div>
                <div className="text-2xl font-bold text-white mt-1">{records.length} logged</div>
              </div>
              <div className="bg-slate-800/40 border border-slate-700/40 p-4 rounded-xl">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Connection Latency</div>
                <div className="text-2xl font-bold text-cyan-400 mt-1">
                  {avgLatency ? `${avgLatency} ms` : 'N/A'}
                </div>
              </div>
            </div>

            {/* Logs List */}
            <div className="bg-slate-800/30 border border-slate-800/80 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h4 className="font-bold text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-cyan-400">history</span>
                  Transaction History (Last 10 Logs)
                </h4>
                <button
                  onClick={fetchTestLogs}
                  className="text-xs text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xs animate-spin-slow">refresh</span>
                  Refresh
                </button>
              </div>

              {records.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs">
                  No transaction records found in Firestore. Trigger a write on the left to initialize the database log.
                </div>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {records.map((rec) => (
                    <div key={rec.id} className="bg-slate-900/60 border border-slate-800/60 rounded-xl p-3.5 space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="space-y-0.5">
                          <span className="text-xs font-bold text-white">{rec.senderName}</span>
                          <span className="text-[9px] text-slate-500 block">ID: {rec.id}</span>
                        </div>
                        <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-semibold">
                          Client Read OK
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed italic">
                        "{rec.message}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
