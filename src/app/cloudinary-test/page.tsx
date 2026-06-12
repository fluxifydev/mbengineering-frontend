'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface UploadResponse {
  success: boolean;
  originalUrl: string;
  optimizedUrl: string;
  squareCropUrl: string;
  publicId: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
}

export default function CloudinaryTestPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<UploadResponse | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setResult(null);
      setError(null);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload image');
      }

      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during upload.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-indigo-500 selection:text-white pb-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-900 to-slate-900 pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 pt-12 space-y-12">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold transition-colors group">
            <span className="material-symbols-outlined text-base transition-transform group-hover:-translate-x-1">arrow_back</span>
            Back to Catalog
          </Link>
          <div className="flex items-center gap-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-4 py-1.5 rounded-full text-xs font-semibold">
            <span className="material-symbols-outlined text-sm animate-pulse">cloud_done</span>
            Cloudinary Gateway Connected
          </div>
        </div>

        {/* Header Block */}
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
            Cloudinary Media Gateway
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Test and verify the Cloudinary media service. Upload engineering diagrams, product photos, or brochures to evaluate Cloudinary's dynamic CDN optimizations and real-time transformations.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Left: Upload Module */}
          <div className="col-span-12 lg:col-span-5 bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700/50 p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-400">upload_file</span>
              Upload Center
            </h3>

            <form onSubmit={handleUpload} className="space-y-6">
              <div className="relative border-2 border-dashed border-slate-700 hover:border-indigo-500/60 rounded-xl p-8 text-center cursor-pointer transition-all bg-slate-900/30">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="cloudinary-upload-input"
                />
                <div className="space-y-3">
                  <span className="material-symbols-outlined text-4xl text-slate-500">image</span>
                  <div className="text-xs sm:text-sm text-slate-400">
                    <span className="font-semibold text-indigo-400 hover:underline">Click to browse</span> or drag and drop image here
                  </div>
                  <div className="text-[10px] text-slate-500">Supports PNG, JPG, WEBP or GIF</div>
                </div>
              </div>

              {/* Preview Box */}
              {previewUrl && (
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Local Preview</div>
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-slate-700 bg-slate-900">
                    <Image
                      src={previewUrl}
                      alt="Local Preview"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="text-xs text-slate-400 truncate">
                    File: <span className="font-semibold text-white">{file?.name}</span> ({(file?.size ? (file.size / 1024).toFixed(1) : 0)} KB)
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-xs flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">error</span>
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={!file || loading}
                className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white py-3.5 rounded-lg font-bold text-sm hover:brightness-110 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Uploading to CDN...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-lg">cloud_upload</span>
                    Publish to Cloudinary
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right: Cloudinary Transformation Results */}
          <div className="col-span-12 lg:col-span-7 space-y-6">
            {!result && !loading && (
              <div className="bg-slate-800/30 border border-slate-800/80 rounded-2xl p-12 text-center text-slate-500 space-y-4 flex flex-col items-center justify-center min-h-[400px]">
                <span className="material-symbols-outlined text-5xl text-slate-600 animate-pulse">cloud_queue</span>
                <div>
                  <h4 className="font-semibold text-slate-400">Awaiting Upload</h4>
                  <p className="text-xs mt-1 text-slate-500 max-w-sm mx-auto">
                    Upload an image using the form on the left to see Cloudinary's dynamic optimization and auto-crop transforms in real-time.
                  </p>
                </div>
              </div>
            )}

            {loading && (
              <div className="bg-slate-800/30 border border-slate-800/80 rounded-2xl p-12 text-center text-slate-400 space-y-4 flex flex-col items-center justify-center min-h-[400px]">
                <span className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
                <div>
                  <h4 className="font-semibold">Processing Media</h4>
                  <p className="text-xs mt-1 text-slate-500 max-w-sm mx-auto">
                    Uploading image to Cloudinary servers. Generating optimized file paths and cropped derivatives...
                  </p>
                </div>
              </div>
            )}

            {result && (
              <div className="space-y-6 animate-fade-in">
                {/* Metrics Banner */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-800/50 backdrop-blur-md p-4 rounded-xl border border-slate-700/50">
                  <div className="text-center md:border-r md:border-slate-700/50 last:border-0 p-2">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Format</div>
                    <div className="text-sm font-bold text-white mt-0.5">{result.format.toUpperCase()}</div>
                  </div>
                  <div className="text-center md:border-r md:border-slate-700/50 last:border-0 p-2">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Dimensions</div>
                    <div className="text-sm font-bold text-white mt-0.5">{result.width} x {result.height} px</div>
                  </div>
                  <div className="text-center md:border-r md:border-slate-700/50 last:border-0 p-2">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">File Size</div>
                    <div className="text-sm font-bold text-white mt-0.5">{formatBytes(result.bytes)}</div>
                  </div>
                  <div className="text-center p-2">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">CDN Status</div>
                    <div className="text-sm font-bold text-green-400 mt-0.5 flex items-center justify-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" />
                      Cached
                    </div>
                  </div>
                </div>

                {/* Derivatives Carousel/Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Variant 1: Optimized CDN Delivery */}
                  <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl overflow-hidden flex flex-col justify-between">
                    <div className="p-4 border-b border-slate-700/40 flex justify-between items-center">
                      <div>
                        <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Optimized Delivery</h4>
                        <p className="text-[10px] text-slate-400">Auto format & quality</p>
                      </div>
                      <span className="material-symbols-outlined text-sm text-indigo-400">bolt</span>
                    </div>
                    <div className="relative aspect-square w-full bg-slate-950 flex items-center justify-center">
                      <Image
                        src={result.optimizedUrl}
                        alt="Optimized delivery variant"
                        fill
                        className="object-contain p-2"
                        unoptimized
                      />
                    </div>
                    <div className="p-4 bg-slate-900/60 flex items-center justify-between gap-4">
                      <div className="truncate text-xs text-slate-400">{result.optimizedUrl}</div>
                      <button
                        onClick={() => copyToClipboard(result.optimizedUrl, 'optimized')}
                        className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-indigo-400 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                        title="Copy Optimized URL"
                      >
                        <span className="material-symbols-outlined text-sm">
                          {copiedText === 'optimized' ? 'check' : 'content_copy'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Variant 2: Auto-Crop Smart Square */}
                  <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl overflow-hidden flex flex-col justify-between">
                    <div className="p-4 border-b border-slate-700/40 flex justify-between items-center">
                      <div>
                        <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Smart Crop</h4>
                        <p className="text-[10px] text-slate-400">Aspect 1:1, auto gravity</p>
                      </div>
                      <span className="material-symbols-outlined text-sm text-indigo-400">crop_square</span>
                    </div>
                    <div className="relative aspect-square w-full bg-slate-950 flex items-center justify-center">
                      <Image
                        src={result.squareCropUrl}
                        alt="Square cropped variant"
                        fill
                        className="object-contain p-2"
                        unoptimized
                      />
                    </div>
                    <div className="p-4 bg-slate-900/60 flex items-center justify-between gap-4">
                      <div className="truncate text-xs text-slate-400">{result.squareCropUrl}</div>
                      <button
                        onClick={() => copyToClipboard(result.squareCropUrl, 'cropped')}
                        className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-indigo-400 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                        title="Copy Cropped URL"
                      >
                        <span className="material-symbols-outlined text-sm">
                          {copiedText === 'cropped' ? 'check' : 'content_copy'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Original URL Panel */}
                <div className="bg-slate-800/20 border border-slate-700/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Secure Source URL</div>
                    <div className="text-xs text-slate-300 font-mono break-all">{result.originalUrl}</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(result.originalUrl, 'original')}
                    className="self-start sm:self-center px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold text-indigo-400 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {copiedText === 'original' ? 'check' : 'content_copy'}
                    </span>
                    {copiedText === 'original' ? 'Copied' : 'Copy URL'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
