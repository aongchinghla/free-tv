"use client";

import { useState } from "react";

export default function AnnouncementBar() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <>
            <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(100vw); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: inline-flex;
          white-space: nowrap;
          animation: marquee 35s linear infinite;
        }
      `}</style>

            <div className="fixed top-0 left-0 w-full z-50 overflow-hidden bg-floodlight-500/20 backdrop-blur-[2px] border-b border-floodlight-500/30 px-12 py-2.5 text-sm font-medium text-white transition-all">

                <div className="flex overflow-hidden">
                    <div className="animate-marquee items-center gap-3">
                        <span className="inline-block animate-pulse text-rose-500 font-bold">🔴 LIVE</span>
                        <span className="flex items-center gap-2">
                            FIFA World Cup 2026™ — Quarter-finals: France
                            <img src="https://flagcdn.com/fr.svg" alt="France" className="inline-block h-3.5 w-auto rounded-sm object-cover shadow-sm" />
                            <span className="text-white/60 mx-1">vs</span>
                            <img src="https://flagcdn.com/ma.svg" alt="Morocco" className="inline-block h-3.5 w-auto rounded-sm object-cover shadow-sm" />
                            Morocco ( 10/07/2026 Tomorrow, 2:00 AM)
                        </span>
                    </div>
                </div>

                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute right-3 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white backdrop-blur-sm"
                    aria-label="Close announcement"
                >
                    ✕
                </button>
            </div>
        </>
    );
}