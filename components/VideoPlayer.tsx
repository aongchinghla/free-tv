"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { TVChannel } from "@/data/playlist";

function parseViewerCount(value: string | number | undefined): number {
  if (!value) return 0;

  const text = String(value).trim().toUpperCase();
  const amount = Number.parseFloat(text);

  if (Number.isNaN(amount)) return 0;
  if (text.endsWith("K")) return Math.round(amount * 1000);
  if (text.endsWith("M")) return Math.round(amount * 1000000);

  return Math.round(amount);
}

function formatViewerCount(value: number): string {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;

  return String(value);
}

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function PlayIcon() {
  return (
    <Icon>
      <polygon points="6 4 20 12 6 20 6 4" fill="currentColor" stroke="none" />
    </Icon>
  );
}

function PauseIcon() {
  return (
    <Icon>
      <path d="M8 5v14" />
      <path d="M16 5v14" />
    </Icon>
  );
}

function VolumeIcon({ muted }: { muted: boolean }) {
  return (
    <Icon>
      <path d="M4 9v6h4l5 4V5L8 9H4Z" />
      {muted ? (
        <>
          <path d="M18 9l4 4" />
          <path d="M22 9l-4 4" />
        </>
      ) : (
        <>
          <path d="M16 9.5a4 4 0 0 1 0 5" />
          <path d="M18.5 7a8 8 0 0 1 0 10" />
        </>
      )}
    </Icon>
  );
}

function CaptionsIcon() {
  return (
    <Icon>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M8 12h3" />
      <path d="M13 12h3" />
      <path d="M8 15h2" />
      <path d="M12 15h4" />
    </Icon>
  );
}

function MiniPlayerIcon() {
  return (
    <Icon>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <rect x="12" y="11" width="6" height="4" rx="1" />
    </Icon>
  );
}

function FullscreenIcon() {
  return (
    <Icon>
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M16 3h3a2 2 0 0 1 2 2v3" />
      <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    </Icon>
  );
}

function EyeIcon() {
  return (
    <Icon>
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </Icon>
  );
}

interface VideoPlayerProps {
  id?: string;
  src: string;
  poster?: string;
  servers?: { name: string; quality?: string; url: string }[];
  activeIndex?: number;
  onSelectServer?: (index: number) => void;
  viewers?: string | number;
  channels?: TVChannel[];
  activeChannelIndex?: number;
  onSelectChannel?: (index: number) => void;
}

export default function VideoPlayer({
  id,
  src,
  poster,
  servers = [],
  activeIndex = 0,
  onSelectServer,
  viewers,
  channels = [],
  activeChannelIndex = 0,
  onSelectChannel,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<any>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const hideTimerRef = useRef<any>(null);
  const liveStartTimeRef = useRef<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [buffering, setBuffering] = useState<boolean>(false);
  const [reconnecting, setReconnecting] = useState<boolean>(false);
  const [reconnectCountdown, setReconnectCountdown] = useState<number>(0);
  const reconnectCountdownRef = useRef<any>(null);
  const [paused, setPaused] = useState<boolean>(true);
  const [muted, setMuted] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(1);
  const [showVolPct, setShowVolPct] = useState(false);
  const volPctTimerRef = useRef<any>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [nativeFullscreen, setNativeFullscreen] = useState(false);
  const [isMobileFullscreen, setIsMobileFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const touchStartYRef = useRef(0);
  const touchCurrentYRef = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY;
    touchCurrentYRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchCurrentYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (!isMobileFullscreen) return;
    const diff = touchStartYRef.current - touchCurrentYRef.current;
    if (diff > 50) {
      setIsDrawerOpen(true);
    } else if (diff < -50) {
      setIsDrawerOpen(false);
    }
  };

  const isFullscreen = nativeFullscreen || isMobileFullscreen;

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  useEffect(() => {
    if (!isMobileFullscreen) return;

    window.history.pushState({ fullscreen: true }, "");

    const handlePopState = () => {
      setIsMobileFullscreen(false);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      if (window.history.state?.fullscreen) {
        window.history.back();
      }
    };
  }, [isMobileFullscreen]);

  useEffect(() => {
    if (isMobileFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileFullscreen]);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [ccEnabled, setCcEnabled] = useState(false);
  const [isPip, setIsPip] = useState(false);
  const [liveViewers, setLiveViewers] = useState(() => {
    const base = parseViewerCount(viewers);
    return base > 0 ? base : 1;
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    setError(null);
    setLoading(true);
    setBuffering(false);
    setProgress(0);
    liveStartTimeRef.current = null;

    let hls: any;
    let networkRetryCount = 0;
    let mediaRecoveryStage = 0; // 0=none, 1=recoverMediaError, 2=swapAudioCodec, 3=full reload
    let nativeRetryCount = 0;
    let nativeRetryTimer: any = null;
    let stallWatchdogTimer: any = null;
    let lastCurrentTime = -1;
    let stallCount = 0;
    const MAX_NETWORK_RETRIES = 6;
    const MAX_NATIVE_RETRIES = 5;

    // ── Stall watchdog: if video is supposed to be playing but time isn't advancing ──
    function startStallWatchdog() {
      clearInterval(stallWatchdogTimer);
      stallWatchdogTimer = setInterval(() => {
        if (!video || video.paused || video.ended) return;
        if (video.currentTime === lastCurrentTime) {
          stallCount++;
          console.warn(`[Live] Stall detected (${stallCount}), attempting recovery...`);
          if (stallCount >= 2) {
            stallCount = 0;
            attemptHlsReconnect();
          }
        } else {
          stallCount = 0;
          lastCurrentTime = video.currentTime;
        }
      }, 4000);
    }

    // ── Full HLS reload without showing error to user ──
    async function attemptHlsReconnect() {
      if (!video) return;
      console.warn("[Live] Reconnecting HLS stream silently...");
      setBuffering(true);
      setReconnecting(true);
      setError(null);
      clearInterval(reconnectCountdownRef.current);

      if (hls) {
        hls.destroy();
      }

      const Hls = (await import("hls.js")).default;
      hls = new Hls({
        maxBufferLength: 10,
        maxMaxBufferLength: 30,
        maxBufferHole: 0.5,
        liveSyncDurationCount: 3,
        liveMaxLatencyDurationCount: 6,
        enableWorker: true,
        lowLatencyMode: true,
        fragLoadingTimeOut: 10000,
        fragLoadingMaxRetry: 4,
        levelLoadingTimeOut: 10000,
        levelLoadingMaxRetry: 4,
        manifestLoadingTimeOut: 10000,
        manifestLoadingMaxRetry: 3,
        startFragPrefetch: true,
        testBandwidth: true,
        abrEwmaDefaultEstimate: 500000,
        xhrSetup: (xhr: XMLHttpRequest) => { xhr.withCredentials = false; },
      });
      hlsRef.current = hls;
      hls.loadSource(src);
      hls.attachMedia(video);
      networkRetryCount = 0;
      mediaRecoveryStage = 0;

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setBuffering(false);
        setLoading(false);
        setReconnecting(false);
        setReconnectCountdown(0);
        video.play().catch(() => { });
      });

      hls.on(Hls.Events.ERROR, (_event: any, data: any) => {
        handleHlsError(Hls, data);
      });

      startStallWatchdog();
    }

    // ── Schedule a visible countdown then auto-reconnect ──
    function scheduleVisibleReconnect(delaySec = 5) {
      clearInterval(reconnectCountdownRef.current);
      setReconnectCountdown(delaySec);
      let remaining = delaySec;
      reconnectCountdownRef.current = setInterval(() => {
        remaining--;
        setReconnectCountdown(remaining);
        if (remaining <= 0) {
          clearInterval(reconnectCountdownRef.current);
          attemptHlsReconnect();
        }
      }, 1000);
    }

    function handleHlsError(Hls: any, data: any) {
      if (!data.fatal) {
        console.warn("HLS non-fatal warning:", data.details);
        return;
      }

      if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
        networkRetryCount++;
        console.warn(`[Live] Fatal network error (attempt ${networkRetryCount}/${MAX_NETWORK_RETRIES}):`, data.details);

        if (networkRetryCount <= MAX_NETWORK_RETRIES) {
          setBuffering(true);
          setError(null);
          // Exponential backoff: 1s, 2s, 4s... capped at 8s
          const delay = Math.min(1000 * Math.pow(2, networkRetryCount - 1), 8000);
          setTimeout(() => {
            if (hls) hls.startLoad();
          }, delay);
          return;
        }

        // All network retries exhausted — try full reconnect
        console.warn("[Live] Network retries exhausted, attempting full reconnect...");
        networkRetryCount = 0;
        scheduleVisibleReconnect(5);
        return;
      }

      if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
        mediaRecoveryStage++;
        console.warn(`[Live] Media error, recovery stage ${mediaRecoveryStage}:`, data.details);

        if (mediaRecoveryStage === 1) {
          setBuffering(true);
          setError(null);
          hls.recoverMediaError();
          return;
        }

        if (mediaRecoveryStage === 2) {
          setBuffering(true);
          setError(null);
          hls.swapAudioCodec();
          hls.recoverMediaError();
          return;
        }

        // All media recovery stages failed — full reconnect
        console.warn("[Live] All media recovery failed, doing full reconnect...");
        mediaRecoveryStage = 0;
        scheduleVisibleReconnect(5);
        return;
      }

      // Unknown fatal error — full reconnect silently
      console.warn("[Live] Unknown fatal error, reconnecting:", data.details);
      scheduleVisibleReconnect(5);
    }

    // ── Native video element error handler (Safari / iOS) with auto-retry ──
    const handleNativeError = () => {
      if (nativeRetryCount >= MAX_NATIVE_RETRIES) {
        setError("This server cannot be loaded right now.");
        setLoading(false);
        setBuffering(false);
        return;
      }
      nativeRetryCount++;
      console.warn(`[Live] Native video error, retry ${nativeRetryCount}/${MAX_NATIVE_RETRIES} in 3s...`);
      setBuffering(true);
      setError(null);
      clearTimeout(nativeRetryTimer);
      nativeRetryTimer = setTimeout(() => {
        if (!video) return;
        const currentSrc = video.src;
        video.src = "";
        video.load();
        video.src = currentSrc;
        video.load();
        video.play().catch(() => { });
      }, 3000);
    };

    const handleWaiting = () => setBuffering(true);
    const handlePlaying = () => {
      setBuffering(false);
      setLoading(false);
      setReconnecting(false);
      setReconnectCountdown(0);
      clearInterval(reconnectCountdownRef.current);
      nativeRetryCount = 0;
      stallCount = 0;
      lastCurrentTime = video.currentTime;
    };
    const handleStalled = () => setBuffering(true);

    // ── Tab visibility: reconnect if tab was hidden for a while ──
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if (!video.paused && video.currentTime === lastCurrentTime) {
          console.warn("[Live] Tab became visible, stream may be stalled. Reconnecting...");
          scheduleVisibleReconnect(5);
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // expose manual retry for the UI button
    (window as any).__liveRetry = () => {
      clearInterval(reconnectCountdownRef.current);
      attemptHlsReconnect();
    };

    async function setup() {
      video.muted = muted;
      video.volume = volume;
      video.preload = "auto";
      video.addEventListener("waiting", handleWaiting);
      video.addEventListener("playing", handlePlaying);
      video.addEventListener("stalled", handleStalled);

      // Native HLS (Safari / iOS)
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.addEventListener("error", handleNativeError);
        video.addEventListener("loadedmetadata", () => {
          setLoading(false);
          setBuffering(false);
          video.play().catch(() => {
            video.muted = true;
            setMuted(true);
            video.play().catch(() => setPaused(true));
          });
        });
        video.src = src;
        video.load();
        startStallWatchdog();
        return;
      }

      const Hls = (await import("hls.js")).default;

      if (Hls.isSupported()) {
        hls = new Hls({
          maxBufferLength: 10,
          maxMaxBufferLength: 30,
          maxBufferHole: 0.5,
          liveSyncDurationCount: 3,
          liveMaxLatencyDurationCount: 6,
          enableWorker: true,
          lowLatencyMode: true,
          fragLoadingTimeOut: 10000,
          fragLoadingMaxRetry: 4,
          levelLoadingTimeOut: 10000,
          levelLoadingMaxRetry: 4,
          manifestLoadingTimeOut: 10000,
          manifestLoadingMaxRetry: 3,
          startFragPrefetch: true,
          testBandwidth: true,
          abrEwmaDefaultEstimate: 500000,
          xhrSetup: (xhr: XMLHttpRequest) => { xhr.withCredentials = false; },
        });
        hlsRef.current = hls;
        hls.loadSource(src);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setLoading(false);
          setBuffering(false);
          video.play().catch(() => {
            video.muted = true;
            setMuted(true);
            video.play().catch(() => setPaused(true));
          });
        });

        hls.on(Hls.Events.ERROR, (_event: any, data: any) => {
          handleHlsError(Hls, data);
        });

        startStallWatchdog();
      } else {
        setError("Your browser does not support HLS streams.");
        setLoading(false);
      }
    }

    setup();

    return () => {
      clearInterval(stallWatchdogTimer);
      clearTimeout(nativeRetryTimer);
      clearInterval(reconnectCountdownRef.current);
      delete (window as any).__liveRetry;
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("stalled", handleStalled);
      video.removeEventListener("error", handleNativeError);
      video.removeEventListener("loadedmetadata", () => { });

      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.volume = volume;
      video.muted = muted;
    }
  }, [volume, muted]);

  useEffect(() => {
    const base = parseViewerCount(viewers);
    setLiveViewers(base > 0 ? base : 1);

    if (!id) {
      // Fallback to local simulation when no channel ID is provided
      const timer = window.setInterval(() => {
        setLiveViewers((current) => {
          const swing = Math.max(1, Math.round(current * 0.006));
          const delta = Math.floor(Math.random() * (swing * 2 + 1)) - swing;
          return Math.max(1, current + delta);
        });
      }, 2500);
      return () => window.clearInterval(timer);
    }

    // Generate a unique client identifier for heartbeats on this mount
    const clientId = Math.random().toString(36).substring(2, 15);

    async function heartbeat(action = "heartbeat") {
      try {
        const res = await fetch("/api/viewers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, clientId, action }),
        });
        if (res.ok) {
          const data = await res.json();
          if (typeof data.count === "number") {
            const base = parseViewerCount(viewers);
            setLiveViewers(base > 0 ? base + data.count - 1 : data.count);
          }
        }
      } catch (err) {
        console.error("Failed to send viewer heartbeat:", err);
      }
    }

    heartbeat();
    const timer = window.setInterval(() => heartbeat(), 5000);

    return () => {
      window.clearInterval(timer);
      fetch("/api/viewers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, clientId, action: "disconnect" }),
        keepalive: true,
      }).catch(() => { });
    };
  }, [id, viewers]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const inFs = !!document.fullscreenElement;
      setNativeFullscreen(inFs);
      if (!inFs) {
        // Exiting fullscreen — always show controls
        setControlsVisible(true);
        clearTimeout(hideTimerRef.current);
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnterPip = () => setIsPip(true);
    const handleLeavePip = () => setIsPip(false);

    video.addEventListener("enterpictureinpicture", handleEnterPip);
    video.addEventListener("leavepictureinpicture", handleLeavePip);

    return () => {
      video.removeEventListener("enterpictureinpicture", handleEnterPip);
      video.removeEventListener("leavepictureinpicture", handleLeavePip);
    };
  }, []);

  function showControlsTemporarily() {
    setControlsVisible(true);
    clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      setControlsVisible(false);
    }, 3000);
  }

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => setPaused(true));
    } else {
      video.pause();
    }
  }

  function handleVideoClick() {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      if (!controlsVisible) {
        showControlsTemporarily();
      } else {
        setControlsVisible(false);
      }
      return;
    }
    togglePlay();
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setMuted(nextMuted);

    // Unmute সবসময় full volume এ
    if (!nextMuted) {
      video.volume = 1;
      setVolume(1);
    }
  }

  function handleVolumeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const video = videoRef.current;
    if (!video) return;

    const nextVolume = Number(event.target.value);
    video.volume = nextVolume;
    video.muted = nextVolume === 0;
    setVolume(nextVolume);
    setMuted(nextVolume === 0);

    // % দেখাও
    setShowVolPct(true);
    clearTimeout(volPctTimerRef.current);
    volPctTimerRef.current = setTimeout(() => setShowVolPct(false), 1200);
  }

  function updateProgress() {
    const video = videoRef.current;
    if (!video) return;

    const dur = video.duration;

    if (!dur || !isFinite(dur)) {
      setIsLive(true);

      if (!video.paused) {
        if (liveStartTimeRef.current === null) {
          liveStartTimeRef.current = Date.now();
        }

        const elapsed = (Date.now() - liveStartTimeRef.current) / 1000;
        const pseudo = Math.min(95, (elapsed / 300) * 95);
        setProgress(pseudo);
      }
      return;
    }

    setIsLive(false);
    setProgress((video.currentTime / dur) * 100);
  }

  function seek(event: React.ChangeEvent<HTMLInputElement>) {
    const video = videoRef.current;
    if (!video || !video.duration || !isFinite(video.duration)) return;

    const value = Number(event.target.value);
    const newTime = (value / 100) * video.duration;
    if (isFinite(newTime)) {
      video.currentTime = newTime;
      setProgress(value);
    }
  }

  async function toggleFullscreen() {
    const shell = shellRef.current;
    if (!shell) return;

    if (document.fullscreenElement || isMobileFullscreen) {
      if (document.fullscreenElement) {
        await document.exitFullscreen().catch(e => console.warn(e));
      }
      try {
        if (screen.orientation && (screen.orientation as any).unlock) {
          (screen.orientation as any).unlock();
        }
      } catch (e) { console.warn(e); }
      if (isMobile) setIsMobileFullscreen(false);
    } else {
      if (isMobile) setIsMobileFullscreen(true);
      try {
        if (shell.requestFullscreen) {
          await shell.requestFullscreen();
          if (isMobile && screen.orientation && (screen.orientation as any).lock) {
            await (screen.orientation as any).lock("landscape").catch((e: any) => console.warn(e));
          }
        }
      } catch (e) {
        console.warn(e);
      }
    }
  }

  function toggleCC() {
    const video = videoRef.current;
    if (!video) return;

    const nextEnabled = !ccEnabled;
    setCcEnabled(nextEnabled);

    // 1. For HLS.js
    if (hlsRef.current) {
      const hls = hlsRef.current;
      if (nextEnabled) {
        if (hls.subtitleTracks && hls.subtitleTracks.length > 0) {
          hls.subtitleTrack = 0;
        }
      } else {
        hls.subtitleTrack = -1;
      }
    }

    if (video.textTracks) {
      for (let i = 0; i < video.textTracks.length; i++) {
        video.textTracks[i].mode = nextEnabled ? "showing" : "disabled";
      }
    }
  }

  async function togglePictureInPicture() {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (video.requestPictureInPicture) {
        await video.requestPictureInPicture();
      } else {
        alert("Picture-in-Picture is not supported by your browser.");
      }
    } catch (err) {
      console.error("Failed to toggle Picture-in-Picture:", err);
    }
  }

  const containerClasses = isMobileFullscreen
    ? "fixed inset-0 z-[9999] bg-black flex flex-col justify-center w-full h-full overflow-hidden"
    : `relative w-full overflow-hidden bg-black shadow-2xl shadow-black/50${!controlsVisible ? " cursor-none" : ""}`;

  const containerStyle = isMobileFullscreen
    ? {}
    : { aspectRatio: "16/9" };

  return (
    <>
      <style>{`
      .vol-slider {
        -webkit-appearance: none;
        appearance: none;
        background: transparent;
        border-radius: 999px;
        outline: none;
        cursor: pointer;
      }
      .vol-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #FFD700;
        box-shadow: 0 0 6px rgba(255,215,0,0.8);
        cursor: pointer;
        transition: transform 0.15s;
      }
      .vol-slider::-moz-range-thumb {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: none;
        background: #FFD700;
        box-shadow: 0 0 6px rgba(255,215,0,0.8);
        cursor: pointer;
      }
      .vol-slider:hover::-webkit-slider-thumb {
        transform: scale(1.25);
        box-shadow: 0 0 10px rgba(255,215,0,0.9);
      }

      /* Golden progress/seek bar */
      .seek-bar {
        -webkit-appearance: none;
        appearance: none;
        border-radius: 999px;
        outline: none;
        cursor: pointer;
        background: rgba(255,255,255,0.2);
      }
      .seek-bar::-webkit-slider-runnable-track {
        border-radius: 999px;
        height: 4px;
      }
      .seek-bar::-moz-range-track {
        border-radius: 999px;
        height: 4px;
        background: rgba(255,255,255,0.2);
      }
      .seek-bar::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background: #FFD700;
        box-shadow: 0 0 6px rgba(255,215,0,0.8);
        cursor: pointer;
        margin-top: -4.5px;
        transition: transform 0.15s, box-shadow 0.15s;
      }
      .seek-bar::-moz-range-thumb {
        width: 13px;
        height: 13px;
        border-radius: 50%;
        border: none;
        background: #FFD700;
        box-shadow: 0 0 6px rgba(255,215,0,0.8);
        cursor: pointer;
      }
      .seek-bar:hover::-webkit-slider-thumb {
        transform: scale(1.3);
        box-shadow: 0 0 10px rgba(255,215,0,0.9);
      }

      /* Hide scrollbar utility */
      .scrollbar-none::-webkit-scrollbar {
        display: none;
      }
      .scrollbar-none {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `}</style>
      <div
        ref={shellRef}
        onMouseMove={showControlsTemporarily}
        onTouchStart={(e) => {
          showControlsTemporarily();
          handleTouchStart(e);
        }}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseLeave={() => setControlsVisible(false)}
        className={containerClasses}
        style={containerStyle}
      >
        <div className={isMobileFullscreen ? "absolute inset-0 bg-black z-30 overflow-hidden" : "relative w-full h-full"}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted={muted}
            poster={poster}
            onClick={handleVideoClick}
            onPlay={() => setPaused(false)}
            onPause={() => setPaused(true)}
            onTimeUpdate={updateProgress}
            onVolumeChange={(event) => {
              setMuted(event.currentTarget.muted);
              setVolume(event.currentTarget.volume);
            }}
            className={isMobileFullscreen ? "w-full h-full object-contain" : "absolute inset-0 h-full w-full object-contain"}
          />

          {poster && loading && !error && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black">
              <img
                src={poster}
                alt=""
                className="max-h-44 max-w-[55%] object-contain opacity-80"
              />
            </div>
          )}

          <div
            className={`pointer-events-none absolute left-1/2 top-3 flex -translate-x-1/2 items-center rounded-full border border-white/20 bg-white/15 p-0.5 shadow-xl shadow-black/30 backdrop-blur-md transition-opacity duration-300 ${!controlsVisible ? "opacity-0" : "opacity-100"
              }`}
          >
            <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase text-white sm:px-4 sm:py-2 sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-signal-500 sm:h-2 sm:w-2" />
              Live
            </span>
            <span className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase text-white sm:px-4 sm:py-2 sm:text-xs">
              <EyeIcon />
              {formatViewerCount(liveViewers)} watching
            </span>
          </div>

          {isMobileFullscreen && (
            <button
              type="button"
              onClick={toggleFullscreen}
              className="absolute left-3 top-3 z-40 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white shadow-md backdrop-blur-sm transition hover:bg-black/80 active:scale-95"
              aria-label="Exit fullscreen"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {servers.length > 1 && !isMobileFullscreen && (
            <div className={`absolute bottom-14 left-3 right-3 z-20 flex items-center justify-center gap-1 rounded-full bg-black/45 p-1 backdrop-blur-sm sm:bottom-[5.5rem] sm:left-1/2 sm:right-auto sm:-translate-x-1/2 overflow-x-auto scrollbar-none whitespace-nowrap transition-opacity duration-300 ${!controlsVisible ? "pointer-events-none opacity-0" : "opacity-100"}`}>
              {servers.map((server, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={server.name}
                    type="button"
                    onClick={() => onSelectServer?.(index)}
                    className={`relative flex items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold text-white transition sm:min-w-20 sm:px-5 sm:py-2.5 sm:text-xs ${isActive
                      ? "bg-white/25 shadow-inner ring-1 ring-white/55"
                      : "hover:bg-white/10"
                      }`}
                  >
                    {server.name}
                    {server.quality && (
                      <span className="rounded bg-cyan-400 px-1.5 py-0.5 text-[8px] font-black leading-none text-void-950">
                        {server.quality}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {loading && !reconnecting && !error && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-void-950/35">
              <div className="flex flex-col items-center gap-3">
                <span className="h-9 w-9 animate-spin rounded-full border-2 border-white/20 border-t-floodlight-500" />
              </div>
            </div>
          )}


          {reconnecting && !error && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/60">
              <div className="flex flex-col items-center gap-3 text-center">
                <span className="h-9 w-9 animate-spin rounded-full border-2 border-white/20 border-t-yellow-400" />
                <p className="text-xs font-semibold text-white/70">Reconnecting stream…</p>
              </div>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-void-950/90 px-6 text-center">
              <div className="max-w-md">
                <p className="mb-1 font-display text-xl text-signal-500">
                  Connection Lost
                </p>
                <p className="text-sm text-white/60">{error}</p>

                {/* Auto-reconnect countdown */}
                {reconnectCountdown > 0 && (
                  <p className="mt-3 text-xs text-yellow-400">
                    Reconnecting in <span className="font-bold">{reconnectCountdown}s</span>…
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => {
                    clearInterval(reconnectCountdownRef.current);
                    setError(null);
                    setReconnectCountdown(0);
                    if ((window as any).__liveRetry) (window as any).__liveRetry();
                  }}
                  className="mt-4 rounded-full bg-yellow-500 px-5 py-2 text-sm font-bold text-black transition hover:bg-yellow-400 active:scale-95"
                >
                  Retry Now
                </button>

                {typeof window !== "undefined" && window.location.protocol === "https:" && src.startsWith("http://") && (
                  <p className="mt-4 rounded-lg bg-yellow-500/10 p-3 text-xs text-yellow-400 border border-yellow-500/20">
                    <strong>Security Block:</strong> This channel uses an insecure HTTP link (http://) which is blocked by the browser on HTTPS sites. Please try another server or enable &quot;Insecure Content&quot; in your browser site settings.
                  </p>
                )}
              </div>
            </div>
          )}

          <div
            className={`absolute bottom-3 left-1/2 z-20 flex w-[calc(100%-1.5rem)] -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-2 text-white shadow-2xl shadow-black/40 backdrop-blur-md transition-opacity duration-300 sm:bottom-5 sm:w-[min(55rem,calc(100%-3rem))] sm:gap-4 sm:px-6 sm:py-3 ${!controlsVisible ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
          >
            <button
              type="button"
              onClick={togglePlay}
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-sm font-black transition hover:bg-white/10 sm:h-8 sm:w-8"
              aria-label={paused ? "Play" : "Pause"}
            >
              {paused ? <PlayIcon /> : <PauseIcon />}
            </button>
            <div className="group relative flex items-center">
              <button
                type="button"
                onClick={toggleMute}
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-black transition hover:bg-white/10 sm:h-8 sm:w-8"
                aria-label={muted ? "Unmute" : "Mute"}
              >
                <VolumeIcon muted={muted} />
              </button>
              {showVolPct && (
                <span
                  className="pointer-events-none absolute -top-7 rounded-md bg-black/80 px-1.5 py-0.5 text-[10px] font-bold text-white shadow"
                  style={{ left: `calc(1.75rem + ${(muted ? 0 : volume) * 80}px)`, transform: "translateX(-50%)" }}
                >
                  {Math.round((muted ? 0 : volume) * 100)}%
                </span>
              )}
              <div className="w-0 overflow-hidden transition-all duration-200 ease-in-out group-hover:w-20 sm:group-hover:w-24">
                <div className="relative" style={{ width: "80px", height: "20px" }}>

                  <div
                    className="pointer-events-none absolute left-0 right-0 rounded-full"
                    style={{ top: "50%", transform: "translateY(-50%)", height: "4px", background: "rgba(255,255,255,0.25)" }}
                  />

                  <div
                    className="pointer-events-none absolute left-0 rounded-full"
                    style={{
                      top: "50%",
                      transform: "translateY(-50%)",
                      height: "4px",
                      width: `calc(${(muted ? 0 : volume) * 100}% - 6px)`,
                      minWidth: "0px",
                      background: "linear-gradient(90deg, #FFB800, #FFD700, #FFF176)",
                      boxShadow: "0 0 6px rgba(255,215,0,0.55)",
                      transition: "width 0.1s ease",
                    }}
                  />

                  <div
                    className="pointer-events-none absolute rounded-full"
                    style={{
                      top: "50%",
                      left: `clamp(6px, calc(${(muted ? 0 : volume) * 100}%), calc(100% - 6px))`,
                      transform: "translate(-50%, -50%)",
                      width: "12px",
                      height: "12px",
                      background: "#FFD700",
                      boxShadow: "0 0 7px rgba(255,215,0,0.85)",
                      transition: "left 0.1s ease",
                    }}
                  />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.02"
                    value={muted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="absolute inset-0 w-full opacity-0"
                    aria-label="Volume"
                    style={{ height: "20px", cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={toggleCC}
              className={`hidden h-7 w-7 shrink-0 place-items-center rounded-full transition hover:bg-white/10 sm:grid sm:h-8 sm:w-8 ${ccEnabled ? "text-cyan-400 bg-white/10" : ""
                }`}
              aria-label="Captions"
            >
              <CaptionsIcon />
            </button>
            <button
              type="button"
              onClick={togglePictureInPicture}
              className={`hidden h-7 w-7 shrink-0 place-items-center rounded-full transition hover:bg-white/10 sm:grid sm:h-8 sm:w-8 ${isPip ? "text-cyan-400 bg-white/10" : ""
                }`}
              aria-label="Mini player"
            >
              <MiniPlayerIcon />
            </button>
            <div className="relative min-w-0 flex-1" style={{ height: "20px" }}>

              <div
                className="pointer-events-none absolute left-0 right-0 rounded-full"
                style={{ top: "50%", transform: "translateY(-50%)", height: "4px", background: "rgba(255,255,255,0.25)" }}
              />

              <div
                className="pointer-events-none absolute left-0 rounded-full"
                style={{
                  top: "50%",
                  transform: "translateY(-50%)",
                  height: "4px",
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #FFB800, #FFD700, #FFF176)",
                  boxShadow: "0 0 6px rgba(255,215,0,0.55)",
                  transition: isLive ? "width 1s linear" : "none",
                }}
              />
              <div
                className="pointer-events-none absolute rounded-full"
                style={{
                  top: "50%",
                  left: `${progress}%`,
                  transform: "translate(-50%, -50%)",
                  width: "13px",
                  height: "13px",
                  background: "#FFD700",
                  boxShadow: "0 0 8px rgba(255,215,0,0.9)",
                  transition: isLive ? "left 1s linear" : "none",
                }}
              />
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={seek}
                className="seek-bar absolute inset-0 w-full opacity-0"
                aria-label="Playback progress"
                style={{ height: "20px", cursor: "pointer" }}
              />
            </div>

            <button
              type="button"
              onClick={toggleFullscreen}
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full transition hover:bg-white/10 sm:h-8 sm:w-8"
              aria-label="Fullscreen"
            >
              <FullscreenIcon />
            </button>
          </div>
        </div>

        {isMobileFullscreen && (
          <>
            {isDrawerOpen && (
              <div
                className="absolute inset-0 bg-black/60 z-40 transition-opacity"
                onClick={() => setIsDrawerOpen(false)}
              />
            )}

            <div
              className={`absolute bottom-0 left-0 right-0 bg-void-950 z-50 rounded-t-2xl transition-transform duration-300 ease-in-out flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.5)] ${isDrawerOpen ? 'translate-y-0 h-[75vh]' : 'translate-y-full h-[75vh]'}`}
            >
              <div className="p-4 space-y-6 overflow-y-auto custom-scrollbar flex-1 pb-10">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center gap-3">
                    {poster && (
                      <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded bg-white p-1">
                        <img
                          src={poster}
                          alt=""
                          className="max-h-full max-w-full object-contain"
                        />
                      </span>
                    )}
                    <div>
                      <h2 className="font-display text-lg tracking-wide text-white uppercase">
                        {channels && activeChannelIndex !== undefined && channels[activeChannelIndex]
                          ? channels[activeChannelIndex].title
                          : "Live Stream"}
                      </h2>
                      <p className="text-xs text-white/50">
                        {servers[activeIndex] ? `Playing: ${servers[activeIndex].name}` : ""}
                      </p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase text-white">
                    <EyeIcon />
                    {formatViewerCount(liveViewers)} watching
                  </span>
                </div>

                {servers.length > 1 && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-white/45">
                      Select Server
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {servers.map((server, index) => {
                        const isActive = index === activeIndex;
                        return (
                          <button
                            key={server.name}
                            type="button"
                            onClick={() => onSelectServer?.(index)}
                            className={`relative rounded-lg px-4 py-2 font-display text-sm tracking-wide transition border ${isActive
                              ? "bg-floodlight-500 border-floodlight-500 text-void-950 font-bold"
                              : "border-white/10 bg-void-800 text-white/60 hover:border-white/25 hover:text-white"
                              }`}
                          >
                            {server.name}
                            {server.quality && (
                              <span
                                className={`ml-1.5 rounded px-1 py-0.5 text-[10px] font-semibold ${isActive
                                  ? "bg-void-950/20 text-void-950"
                                  : "bg-white/10 text-white/40"
                                  }`}
                              >
                                {server.quality}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {channels && channels.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-white/45">
                      Switch Channel
                    </h3>
                    <div className="grid grid-cols-2 gap-2 pb-6 sm:grid-cols-3">
                      {channels.map((channel, index) => {
                        const isActive = index === activeChannelIndex;
                        return (
                          <button
                            key={channel.id}
                            type="button"
                            onClick={() => {
                              onSelectChannel?.(index);
                              setIsDrawerOpen(false);
                            }}
                            className={`flex items-center gap-2.5 rounded-lg border p-2 text-left transition ${isActive
                              ? "border-floodlight-500 bg-floodlight-500/15 text-white"
                              : "border-white/5 bg-void-800 text-white/60 hover:border-white/25 hover:text-white"
                              }`}
                          >
                            <span className="grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded bg-white p-0.5">
                              <img
                                src={channel.logo}
                                alt=""
                                className="max-h-full max-w-full object-contain"
                              />
                            </span>
                            <span className="font-display text-xs tracking-wide truncate">
                              {channel.title}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
