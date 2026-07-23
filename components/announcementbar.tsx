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
                    animation: marquee 25s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>

            <div className="fixed top-0 left-0 w-full z-50 overflow-hidden bg-floodlight-500/20 backdrop-blur-[8px] border-b border-floodlight-500/30 px-12 py-2.5 text-sm font-medium text-white transition-all">

                <div className="flex overflow-hidden w-full whitespace-nowrap">
                    <div className="animate-marquee items-center gap-4 flex-nowrap">

                        {/*Announcement Message */}
                        <span className="font-extrabold shrink-0 text-white/90">
                            SITE IS CURRENTLY UNDER DEVELOPMENT, WILL BE LIVE VERY SOON. STAY WITH US!
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