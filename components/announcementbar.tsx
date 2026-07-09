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
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>

            <div className="fixed top-0 left-0 w-full z-50 overflow-hidden bg-floodlight-500/20 backdrop-blur-[8px] border-b border-floodlight-500/30 px-12 py-2.5 text-sm font-medium text-white transition-all">

                <div className="flex overflow-hidden w-full whitespace-nowrap">
                    <div className="animate-marquee items-center gap-8 flex-nowrap">

                        {/* Title Tag */}
                        <span className="inline-block font-bold tracking-wider text-rose-500 text-[11px] bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 uppercase shrink-0">
                            Upcoming QFs
                        </span>

                        {/* Match 1: Spain vs Belgium */}
                        <span className="inline-flex items-center gap-2 ml-4 shrink-0">
                            <span className="text-white/40 text-xs font-normal">(Tomorrow 1:00 AM)</span>
                            <span className="font-semibold">Spain</span>
                            <img src="https://flagcdn.com/es.svg" alt="Spain" className="inline-block h-3.5 w-auto rounded-sm object-cover shadow-sm" />
                            <span className="text-white/60 mx-1 font-normal text-xs">vs</span>
                            <img src="https://flagcdn.com/be.svg" alt="Belgium" className="inline-block h-3.5 w-auto rounded-sm object-cover shadow-sm" />
                            <span className="font-semibold">Belgium</span>
                        </span>

                        <span className="text-white/20 mx-4 shrink-0">•</span>

                        {/* Match 2: Norway vs England */}
                        <span className="inline-flex items-center gap-2 shrink-0">
                            <span className="text-white/40 text-xs font-normal">(Sun, Jul 12 3:00 AM)</span>
                            <span className="font-semibold">Norway</span>
                            <img src="https://flagcdn.com/no.svg" alt="Norway" className="inline-block h-3.5 w-auto rounded-sm object-cover shadow-sm" />
                            <span className="text-white/60 mx-1 font-normal text-xs">vs</span>
                            <img src="https://flagcdn.com/gb-eng.svg" alt="England" className="inline-block h-3.5 w-auto rounded-sm object-cover shadow-sm" />
                            <span className="font-semibold">England</span>
                        </span>

                        <span className="text-white/20 mx-4 shrink-0">•</span>

                        {/* Match 3: Argentina vs Switzerland */}
                        <span className="inline-flex items-center gap-2 shrink-0">
                            <span className="text-white/40 text-xs font-normal">(Sun, Jul 12 7:00 AM)</span>
                            <span className="font-semibold">Argentina</span>
                            <img src="https://flagcdn.com/ar.svg" alt="Argentina" className="inline-block h-3.5 w-auto rounded-sm object-cover shadow-sm" />
                            <span className="text-white/60 mx-1 font-normal text-xs">vs</span>
                            <img src="https://flagcdn.com/ch.svg" alt="Switzerland" className="inline-block h-3.5 w-auto rounded-sm object-cover shadow-sm" />
                            <span className="font-semibold">Switzerland</span>
                        </span>

                    </div>
                </div>

                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute right-3 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white backdrop-blur-sm transition-colors"
                    aria-label="Close announcement"
                >
                    ✕
                </button>
            </div>
        </>
    );
}