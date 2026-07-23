export interface TVChannel {
  id: string;
  type: string;
  title: string;
  logo: string;
  servers?: { name: string; quality: string; url: string }[];
  url?: string;
  viewers?: string | number;
  teamA?: { name: string };
  teamB?: { name: string };
  competition?: string;
  round?: string;
}

const tvlinks: TVChannel[] = [
  {
    id: "bein-sports",
    type: "tv",
    title: "BeIN Sports",
    logo: "/bein-sports-logo.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://1nyaler.streamhostingcdn.top/stream/23/index.m3u8" },
      { name: "Server 2", quality: "HD", url: "/api/proxy?url=http://ua102.online24.pm:8222/1101/video.m3u8?token=350B326FB34F4B8" },
      { name: "Server 3", quality: "HD", url: "https://ua.online24.pm/play/1103/350B326FB34F4B8/video.m3u8" },
      { name: "Server 4", quality: "HD", url: "https://bein-esp-xumo.amagi.tv/playlistR1080p.m3u8" }
    ]
  },
  {
    id: "fox-sport",
    type: "tv",
    title: "FOX Sport",
    logo: "/Fox_sport.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://gpuserver3.tier1streams.com/FOX_SOCCER_PLUS/index.m3u8" },
      { name: "Server 2", quality: "HD", url: "https://d1jzu95oc8fgt3.cloudfront.net/FOX_Sports720p.m3u8" },
      // { name: "Server 3", quality: "HD", url: "/api/proxy?url=http://y3fqd48g.megatv.fun/iptv/NRLXRWSBWBPLN4/19146/index.m3u8" }
    ]
  },
  {
    id: "somoy-tv",
    type: "tv",
    title: "SOMOY TV",
    logo: "/somoy_tv.webp",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://live.thebosstv.com:30443/dwlive/Somoy-TV/chunks.m3u8" },
      { name: "Server 2", quality: "HD", url: "/api/proxy?url=http://114.130.57.233:8080/Somoy-TV-3Mb/tracks-v1a1/mono.m3u8?token=SkQuhAXZxgBan1" },
      { name: "Server 3", quality: "HD", url: "/api/proxy?url=http://103.165.93.31:8095/somoyTv/tracks-v1a1/mono.m3u8" }
    ]
  },
  {
    id: "t-sports-hd",
    type: "tv",
    title: "T-Sports HD",
    logo: "/T_Sports_logo.webp",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://flussonic.deltainfonet.com/01_Tsports_HD/tracks-v1a1/mono.m3u8" },
      { name: "Server 2", quality: "HD", url: "/api/proxy?url=http://103.165.93.31:8095/tsports/tracks-v1a1a2/mono.m3u8" },
      { name: "Server 3", quality: "HD", url: "/api/proxy?url=http://103.165.93.31:8095/tsports/tracks-v1a1/mono.m3u8" },
      { name: "Server 4", quality: "HD", url: "/api/proxy?url=http://114.130.57.233:8080/T-Sports/tracks-v1a1/mono.m3u8?token=SkQuhAXZxgBan1" }
    ]
  },
  {
    id: "tsn-hd",
    type: "tv",
    title: "TSN HD",
    logo: "/TSN_Logo.webp",
    servers: [
      { name: "TSN 1", quality: "HD", url: "/api/proxy?url=http://40.160.24.55/TSN_1/index.m3u8" },
      { name: "TSN 2", quality: "HD", url: "/api/proxy?url=http://40.160.24.55/TSN_2/index.m3u8" },
      { name: "TSN 3", quality: "HD", url: "/api/proxy?url=http://40.160.24.55/TSN_3/index.m3u8" },
      { name: "TSN 4", quality: "HD", url: "/api/proxy?url=http://40.160.24.55/TSN_4/index.m3u8" },
      { name: "TSN 5", quality: "HD", url: "/api/proxy?url=http://40.160.24.55/TSN_5/index.m3u8" }
    ]
  },
  {
    id: "trace-sport-stars",
    type: "tv",
    title: "Trace Sport Stars",
    logo: "/trace.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://channels.trace.plus/Traceprod/TRACE_SPORT_STARS_sd/index.m3u8" },
    ]
  },
  {
    id: "win-sports",
    type: "tv",
    title: "Win Sports",
    logo: "/Win_Sports_logo.webp",
    servers: [
      { name: "Server 1", quality: "HD", url: "/api/proxy?url=http://181.78.71.71:18000/play/a03p/index.m3u8" },
      { name: "Server 2", quality: "HD", url: "/api/proxy?url=http://181.78.211.244:8005/play/a0am/index.m3u8" },
      { name: "Server 3", quality: "HD", url: "/api/proxy?url=http://181.78.8.199:8000/play/a06v/index.m3u8" },
      { name: "Server 4", quality: "HD", url: "/api/proxy?url=http://138.121.15.230:9002/WIN-SPORT/index.m3u8" }
    ]
  },
  {
    id: "caze-tv",
    type: "tv",
    title: "Caze TV",
    logo: "/caze-tv-logo.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://dfr80qz435crc.cloudfront.net/MNOP/Amagi/Caze/Caze_TV_BR/1080p-vtt/index.m3u8" },
      { name: "Server 2", quality: "HD", url: "https://dfr80qz435crc.cloudfront.net/MNOP/Amagi/Caze/Caze_TV_BR/720p-vtt/index.m3u8" },
      { name: "Server 3", quality: "HD", url: "https://dfr80qz435crc.cloudfront.net/MNOP/Amagi/Caze/Caze_TV_BR/Caze_TV.m3u8" }
    ]
  },
  {
    id: "goal-tv",
    type: "tv",
    title: "Goal TV",
    logo: "/goal-212.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://streams2.sofast.tv/sofastplayout/WiseM3U8_1/master.m3u8" }
    ]
  },
  {
    id: "dsports",
    type: "tv",
    title: "DSports HD",
    logo: "/DSports.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "/api/proxy?url=http://190.108.83.69:8000/play/a05w/index.m3u8" },
      { name: "Server 2", quality: "HD", url: "/api/proxy?url=http://181.64.27.65:8000/play/a0dq/index.m3u8" }
    ]
  },
  {
    id: "fifa+",
    type: "tv",
    title: "FIFA +",
    logo: "/FIFA+.webp",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://d2w9q46ikgrcwx.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-of5cbk3sav3w5/v1/sysdata_s_p_a_fifa_7/samsungheadend_us/latest/main/hls/playlist.m3u8" }
    ]
  },
  {
    id: "fifa-plus-women",
    type: "tv",
    title: "FIFA + Women",
    logo: "/FIFA+.webp",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://cffda8ff.wurl.com/master/f36d25e7e52f1ba8d7e56eb859c636563214f541/U2Ftc3VuZy1nYl9GSUZBUGx1c3dvbWVuX0hMUw/playlist.m3u8" }
    ]
  },
  {
    id: "btv",
    type: "tv",
    title: "BTV",
    logo: "https://ssl.com.bd/sites/default/files/BTV%20Logo%20Gallery.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "/api/proxy?url=http://103.165.93.31:8095/btv/tracks-v1a1/mono.m3u8" },
      { name: "Akash Go", quality: "HD", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1709/output/1709.m3u8" }
    ]
  },
  {
    id: "telemundo",
    type: "tv",
    title: "Telemundo",
    logo: "Telemundo_logo.webp",
    servers: [
      { name: "Server 2", quality: "HD", url: "https://nbculocallive.akamaized.net/hls/live/2037499/puertorico/stream1/master_720.m3u8" },
      { name: "Server 1", quality: "HD", url: "https://nbculocallive.akamaized.net/hls/live/2037499/puertorico/stream1/master.m3u8" }
    ]
  },
  {
    id: "willow",
    type: "tv",
    title: "Willow",
    logo: "Willow.webp",
    servers: [
      { name: "Server 1", quality: "HD", url: "/api/proxy?url=http://27.124.71.27/Willow_Extra/index.m3u8" },
      { name: "Server 2", quality: "HD", url: "/api/proxy?url=http://tvsen5.aynascope.net/willowhd/index.m3u8" }
    ]
  },
  {
    id: "tvp-sports",
    type: "tv",
    title: "TVP Sports",
    logo: "TVP_Sport.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://1nyaler.streamhostingcdn.top/stream/89/index.m3u8" }
    ]
  },
  {
    id: "ptv-sports",
    type: "tv",
    title: "PTV Sports",
    logo: "PTV_Sports.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "/api/proxy?url=http://103.165.93.31:8095/ptv/tracks-v1a1/mono.m3u8" }
    ]
  },
  {
    id: "red-bull",
    type: "tv",
    title: "Red Bull TV",
    logo: "red-bull-tv.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://dms.redbull.tv/v5/destination/rbtv/linear-borb/personal_computer/http/bd/en/playlist.m3u8" },
      { name: "Server 2", quality: "HD", url: "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master_3360.m3u8" }
    ]
  },
  {
    id: "dbc-news",
    type: "tv",
    title: "DBC News HD",
    logo: "/DBC_FB_LOGO.jpg",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1728/output/index.m3u8" }
    ]
  },
  {
    id: "channel-1",
    type: "tv",
    title: "CHANNEL 1 4K",
    logo: "/Channel_1_Logo.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1702/output/index.m3u8" }
    ]
  },
  {
    id: "fighter-tv",
    type: "tv",
    title: "Fighters",
    logo: "/fighter-logo-vector.svg",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://nomawnoijl.gpcdn.net/akash/fighter/playlist.m3u8" }
    ]
  },
  // {
  //   id: "next-hd",
  //   type: "tv",
  //   title: "NEXT HD",
  //   logo: "https://carboncredits.com/wp-content/uploads/2025/09/shutterstock_2306088965-e1757112807302.jpg",
  //   servers: [
  //     { name: "Server 1", quality: "HD", url: "" }
  //   ]
  // },
  {
    id: "live-football",
    type: "tv",
    title: "Live FOOTBALL",
    logo: "https://bugsfreeweb.github.io/LiveTVCollector/BugsfreeLogo/default-logo.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://rmtv.akamaized.net/hls/live/2043154/rmtv-en-web/bitrate_3.m3u8" }
    ]
  },
  {
    id: "cricket-gold",
    type: "tv",
    title: "CR | Cricket Gold",
    logo: "https://d229kpbsb5jevy.cloudfront.net/tv/150/150/bnw/Cricket-Gold-Channel_black.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://d1nj4u39ja4cn0.cloudfront.net/v1/master/9d062541f2ff39b5c0f48b743c6411d25f62fc25/FLS-MuxIP-CricketGold/418.m3u8" }
    ]
  },
  {
    id: "star-sports1",
    type: "tv",
    title: "Star Sports 1",
    logo: "/star_Sports_1_HD.png",
    servers: [
      { name: "Server 1 Hindi", quality: "HD", url: "https://starsportshindiii.pages.dev/index.m3u8" },
      { name: "Server 2", quality: "HD", url: "/api/proxy?url=http://103.151.60.162:2121/play/a01a/index.m3u8" }
    ]
  },
  {
    id: "star-sports2",
    type: "tv",
    title: "Star Sports 2",
    logo: "/star-sports2.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "/api/proxy?url=http://tvsen7.aynascope.net/ssport2hd/index.m3u8" },
      // { name: "Server 2", quality: "HD", url: "/api/proxy?url=http://103.151.60.162:2121/play/a00v/index.m3u8" },
      // { name: "Server 3", quality: "HD", url: "/api/proxy?url=http://103.151.60.162:2121/play/a01a/index.m3u8" }
    ]
  },
  {
    id: "star-sports-select",
    type: "tv",
    title: "Star Sports Select",
    logo: "/star-sports-select.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "/api/proxy?url=http://tvsen7.aynascope.net/sspts1/index.m3u8" },
      { name: "Server 2", quality: "HD", url: "/api/proxy?url=http://tvsen7.aynascope.net/ssport2hd/index.m3u8" },
    ]
  },
  {
    id: "MNX-HD",
    type: "tv",
    title: "MNX-HD",
    logo: "/MNX-HD.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://nomawnoijl.gpcdn.net/akash/screem/playlist.m3u8" }
    ]
  },
  {
    id: "the-movie-club",
    type: "tv",
    title: "The Movie Club",
    logo: "/the-movie-club.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://cc-r5hupcym5oehh.akamaized.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-r5hupcym5oehh/SBUM/RunnTV/BollyFlix_IN/BollyFlix_IN.m3u8" }
    ]
  },
  {
    id: "superrix",
    type: "tv",
    title: "Super RIX",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f0/611-cinemax.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://nomawnoijl.gpcdn.net/akash/superrix/playlist.m3u8" }
    ]
  },
  {
    id: "cine-nanar",
    type: "tv",
    title: "CINE NANAR",
    logo: "/cine-nanar.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "/api/proxy?url=http://145.239.5.177/349/index.m3u8" }
    ]
  },
  {
    id: "tv9-bangla",
    type: "tv",
    title: "TV9 Bangla",
    logo: "/test.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://amg01448-samsungin-tv9bangla-samsungin-9lgnh.amagi.tv/playlist/amg01448-samsungin-tv9bangla-samsungin/playlist.m3u8" }
    ]
  },
  {
    id: "shemaroo-bollywood",
    type: "tv",
    title: "Shemaroo Bollywood",
    logo: "/test.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://cdn-uw2-prod.tsv2.amagi.tv/linear/amg00864-shemarooenterta-shemabollywood-ono/playlist.m3u8" }
    ]
  },
  {
    id: "hollywood-movies",
    type: "tv",
    title: "Hollywood Movies",
    logo: "/test.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://amg01076-lightningintern-actionhollywood-samsungnz-82rry.amagi.tv/playlist/amg01076-lightningintern-actionhollywood-samsungnz/playlist.m3u8" }
    ]
  },
  {
    id: "hbo",
    type: "tv",
    title: "HBO",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/HBO_logo.svg/2560px-HBO_logo.svg.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "/api/proxy?url=http://103.213.31.111/HBOHD/index.m3u8" }
    ]
  },
  {
    id: "&flix",
    type: "tv",
    title: "&Flix HD",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/HBO_logo.svg/2560px-HBO_logo.svg.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "/api/proxy?url=http://103.151.60.162:2121/play/a01m/index.m3u8" }
    ]
  },
  {
    id: "cindie",
    type: "tv",
    title: "CINDIE",
    logo: "https://i.ibb.co/Ns62bY2/2021-04-22-10-24-01.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://d20xuwbyc4yoag.cloudfront.net/v1/master/9d062541f2ff39b5c0f48b743c6411d25f62fc25/DistroTV-MuxIP-CINDIE/387.m3u8" }
    ]
  },

  // ── Akash Go ──────────────────────────────────────────────
  {
    id: "channel-24",
    type: "tv",
    title: "Channel 24",
    logo: "https://dl.dropbox.com/s/puf12xv5flgbnz5/channel24_bd.png",
    servers: [
      { name: "Akash Go", quality: "HD", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1703/output/index.m3u8" }
    ]
  },
  {
    id: "star-news",
    type: "tv",
    title: "Star News",
    logo: "/Star_News_logo.webp",
    servers: [
      { name: "Akash Go", quality: "HD", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1710/output/index.m3u8" }
    ]
  },
  {
    id: "independent-tv",
    type: "tv",
    title: "Independent TV",
    logo: "https://dl.dropbox.com/s/7xwwb8hetz3w8rp/independent_tv.png",
    servers: [
      { name: "Akash Go", quality: "HD", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1704/output/index.m3u8" }
    ]
  },
  {
    id: "ekattor-tv",
    type: "tv",
    title: "Ekattor TV",
    logo: "https://s4.gifyu.com/images/imagea02f4314e761661d.png",
    servers: [
      { name: "Akash Go", quality: "HD", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1705/output/index.m3u8" }
    ]
  },
  {
    id: "jamuna-tv",
    type: "tv",
    title: "Jamuna TV",
    logo: "https://dl.dropbox.com/s/k7z1dsec1jfjbkn/jamuna_tv_bd.png",
    servers: [
      { name: "Akash Go", quality: "HD", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1701/output/index.m3u8" }
    ]
  },
  {
    id: "atn-news",
    type: "tv",
    title: "ATN NEWS",
    logo: "https://dl.dropbox.com/s/4ldi1dp09s8o6bm/atn_news_bd.png",
    servers: [
      { name: "Akash Go", quality: "HD", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1706/output/index.m3u8" }
    ]
  },
  {
    id: "nagorik-tv",
    type: "tv",
    title: "NAGORIK TV HD",
    logo: "Nagorik.webp",
    servers: [
      { name: "Server 1", quality: "HD", url: "/api/proxy?url=http://198.195.239.50:8095/nagorik/tracks-v1a1/mono.m3u8" },
      { name: "Server 2", quality: "HD", url: "/api/proxy?url=http://103.163.117.83:8063/ch8/tracks-v1/index.fmp4.m3u8" }
    ]
  },
  {
    id: "maasranga-tv",
    type: "tv",
    title: "Maasranga TV",
    logo: "https://maasranga.tv/wp-content/uploads/2023/11/cropped-Logo-for-website-1.jpg",
    servers: [
      { name: "Akash Go", quality: "HD", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1722/output/index.m3u8" }
    ]
  },
  {
    id: "ntv",
    type: "tv",
    title: "NTV",
    logo: "https://www.ntvbd.com/sites/default/files/aggregator/2020/02/17/ntv-channel_0.jpg",
    servers: [
      { name: "Akash Go", quality: "HD", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1716/output/index.m3u8" }
    ]
  },
  {
    id: "channel-i-bd",
    type: "tv",
    title: "Channel I",
    logo: "https://dl.dropbox.com/s/ul1hoiovemyyhp8/channel_i.png",
    servers: [
      { name: "Akash Go", quality: "HD", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1723/output/index.m3u8" }
    ]
  },
  {
    id: "banglavision",
    type: "tv",
    title: "Bangla Vision",
    logo: "https://www.bvnews24.com/media/common/newbvlogo.png",
    servers: [
      { name: "Akash Go", quality: "HD", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1715/output/1715-audio_113452_eng=113200-video=1692000.m3u8" }]
  },
  {
    id: "srk-tv",
    type: "tv",
    title: "SRK TV",
    logo: "/srk_tv.jpg",
    servers: [
      { name: "Akash Go", quality: "HD", url: "https://srknowapp.ncare.live/srktvhlswodrm/srktv.stream/playlist.m3u8" }
    ]
  },
  {
    id: "ekushey-tv",
    type: "tv",
    title: "Ekushey TV",
    logo: "https://i.postimg.cc/C15wr1RW/Ekushey-Television-Logo-svg.png",
    servers: [{ name: "Akash Go", quality: "HD", url: "https://ekusheyserver.com/hls-live/livepkgr/_definst_/liveevent/livestream3.m3u8" }
    ]
  },
  {
    id: "deepto-tv",
    type: "tv",
    title: "Deepto TV",
    logo: "/deepto-tv-logo.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://byphdgllyk.gpcdn.net/hls/deeptotv/0_1/index.m3u8" },
      { name: "Akash Go", quality: "HD", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1711/output/index.m3u8" }
    ]
  },
  {
    id: "jago-news24",
    type: "tv",
    title: "Jago News24",
    logo: "/jago.png",
    servers: [
      { name: "Akash Go", quality: "HD", url: "https://app.ncare.live/live-orgin/jagonews24.stream/playlist.m3u8" }
    ]
  },
  {
    id: "gazi-tv",
    type: "tv",
    title: "Gazi TV",
    logo: "/Gtvhd.webp",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/gazibdz.stream/tracks-v1a1/mono.m3u8" },
      { name: "Server 2", quality: "HD", url: "https://edge01.iptv.digijadoo.net/live/nagorik_tv/chunks.m3u8" }
    ]
  },
  {
    id: "sa-tv",
    type: "tv",
    title: "SA TV",
    logo: "https://cdn.brandfetch.io/idetEPdN4G/w/329/h/329/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1773065739783",
    servers: [
      { name: "Akash Go", quality: "HD", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1720/output/1720-audio_113502_eng=113200-video=3224800.m3u8" }
    ]
  },
  {
    id: "desh-tv",
    type: "tv",
    title: "Desh TV",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/25/Desh_tv_logo.jpg",
    servers: [
      { name: "Akash Go", quality: "HD", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1724/output/index.m3u8" }
    ]
  },
  {
    id: "my-tv",
    type: "tv",
    title: "My TV",
    logo: "https://dl.dropbox.com/s/jjr5835pbth49tm/my_tv_bd.png",
    servers: [
      { name: "Akash Go", quality: "HD", url: "https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/mytv-up-off.stream/tracks-v1a1/mono.m3u8" }
    ]
  },
  {
    id: "mohona-tv",
    type: "tv",
    title: "Mohona TV",
    logo: "https://mohona.tv/wp-content/uploads/2026/02/Mohona_tv_Logo.svg_-scaled.png",
    servers: [
      { name: "Akash Go", quality: "HD", url: "https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/mohonatv.stream/tracks-v1a1/mono.m3u8" }
    ]
  },
  {
    id: "rajdhani-tv",
    type: "tv",
    title: "Rajdhani TV",
    logo: "https://rajdhani.tv/assets/images/logo-3.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://stream.shariarsuvo.com/hls5/rajdhanicable.m3u8" }
    ]
  },
  {
    id: "boishakhi-tv",
    type: "tv",
    title: "Boishakhi TV",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c7/Boishakhi_TV_logo.svg/500px-Boishakhi_TV_logo.svg.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://boishakhi.sonarbanglatv.com/boishakhi/boishakhitv/index.m3u8" }
    ]
  },
  {
    id: "green-tv",
    type: "tv",
    title: "Green TV",
    logo: ".png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://app.ncare.live/c3VydmVyX8RpbEU9Mi8xNy8yMDE0GIDU6RgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcGVMZEJCTEFWeVN3PTOmdFsaWRtaW51aiPhnPTI2/greentv.stream/live-orgin/greentv.stream/chunks.m3u8" }
    ]
  },
  {
    id: "s-tv-bangla",
    type: "tv",
    title: "S TV Bangla",
    logo: ".png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/channels.stream/playlist.m3u8" }
    ]
  },
  {
    id: "asian-tv",
    type: "tv",
    title: "Asian TV",
    logo: "/asian-tv.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://mtlivestream.com/hls/asian/ytlive/index.m3u8" }
    ]
  },
  {
    id: "channel-9",
    type: "tv",
    title: "Channel 9 HD",
    logo: "/channel-9-hd.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/channel9hd.stream/playlist.m3u8" }
    ]
  },
  {
    id: "g-series",
    type: "tv",
    title: "G-Series",
    logo: "https://upload.wikimedia.org/wikipedia/en/c/ce/G-Series_Logo.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://vods2.aynaott.com/gseriesDrama/tracks-v1a1/mono.ts.m3u8" }
    ]
  },
  {
    id: "movie-bangla",
    type: "tv",
    title: "Movie Bangla",
    logo: "https://i.ibb.co/0rPdpW9/MB-TV.jpg",
    servers: [
      { name: "Server 1", quality: "HD", url: "/api/proxy?url=http://alvetv.com/moviebanglatv/8080/index.m3u8" }
    ]
  },
  {
    id: "deshi-tv",
    type: "tv",
    title: "Deshi TV",
    logo: "https://www.flixj.com/upload/images/TV/DeshTV24-BanglaLogo.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://deshitv.deshitv24.net/live/myStream/playlist.m3u8" }
    ]
  },
  {
    id: "yrf-music",
    type: "tv",
    title: "YRF Music",
    logo: "/yrf-music.jpg",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://cdn-uw2-prod.tsv2.amagi.tv/linear/amg01412-xiaomiasia-yrfmusic-xiaomi/playlist.m3u8" }
    ]
  },
  {
    id: "music-india",
    type: "tv",
    title: "Music India",
    logo: "/Music_India.webp",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://cdn-2.pishow.tv/live/226/master.m3u8" }
    ]
  },
  {
    id: "zoom",
    type: "tv",
    title: "ZOOM",
    logo: "/Zoom-TV.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://pubads.g.doubleclick.net/ssai/event/JCAm25qkRXiKcK1AJMlvKQ/master.m3u8" }
    ]
  },
  {
    id: "sangeet-bangla",
    type: "tv",
    title: "Sangeet Bangla",
    logo: "/sangeet.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://cdn-4.pishow.tv/live/1143/master.m3u8" }
    ]
  },
  {
    id: "z-sonarbangla",
    type: "tv",
    title: "Z Sonar Bangla",
    logo: "/z-sonarbangla.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://d1g8wgjurz8via.cloudfront.net/bpk-tv/ColorsHD/default/ColorsHD-video=2137600.m3u8" }
    ]
  },
  {
    id: "zee-bangla-hd",
    type: "tv",
    title: "Zee Bangla HD",
    logo: "/zee-bangla.svg",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://yupptvcatchupire.yuppcdn.net/preview/zeebangla/2500.m3u8" }
    ]
  },
  {
    id: "colors-bangla",
    type: "tv",
    title: "Colors Bangla",
    logo: "/colors-bangla.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://yupptvcatchupire.yuppcdn.net/preview/colorsbanglahd/800.m3u8" }
    ]
  },
  {
    id: "star-jalsha-hd",
    type: "tv",
    title: "Star jalsha HD",
    logo: "/star_jalsha_logo.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://yupptvcatchupire.yuppcdn.net/preview/starjalsha/1800.m3u8" }
    ]
  },

  // ── ENG International News ────────────────────────────────
  {
    id: "times-of-india",
    type: "tv",
    title: "Times Of India",
    logo: "https://cdn.brandfetch.io/id7ncM9RiX/w/400/h/400/theme/dark/icon.png?c=1bxid64Mup7aczewSAYMX&t=1774908336895",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://live.sli.ke/live/npnhm84gz9/master.m3u8" }
    ]
  },
  {
    id: "aljazeera",
    type: "tv",
    title: "Al Jazeera",
    logo: "https://s3.aynaott.com/storage/5d707a103f48d8f9f1634f1b70e2ecdf",
    servers: [
      { name: "Akash Go", quality: "HD", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1721/output/index.m3u8" },
      { name: "Server 1", quality: "HD", url: "https://live-hls-apps-aje-fa.getaj.net/AJE/index.m3u8" }
    ]
  },
  {
    id: "wion-news",
    type: "tv",
    title: "WION News",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/WION_news_Logo.svg/330px-WION_news_Logo.svg.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://d7x8z4yuq42qn.cloudfront.net/index_7.m3u8" }
    ]
  },
  {
    id: "trt-world",
    type: "tv",
    title: "TRT World",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4f/TRT_World_logosu.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://tv-trtworld.medya.trt.com.tr/master.m3u8" }
    ]
  },
  {
    id: "press-tv",
    type: "tv",
    title: "Press TV Iran",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Press_TV_logo.svg/500px-Press_TV_logo.svg.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://live.presstv.ir/hls/presstv_5_482/index.m3u8" }
    ]
  },
  {
    id: "france-24",
    type: "tv",
    title: "France 24",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/France_24_logo_%282013%29.svg/330px-France_24_logo_%282013%29.svg.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://live.france24.com/hls/live/2037218-b/F24_EN_HI_HLS/master_2300.m3u8" }
    ]
  },
  {
    id: "cnn",
    type: "tv",
    title: "CNN",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/CNN.svg/1920px-CNN.svg.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://amg01448-samsungin-cnnnow-samsungin-4npqg.amagi.tv/playlist/amg01448-samsungin-cnnnow-samsungin/playlist.m3u8" }
    ]
  },
  {
    id: "global-news",
    type: "tv",
    title: "Global News",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Global_News_%282022%29.svg/1920px-Global_News_%282022%29.svg.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://live.corusdigitaldev.com/groupd/live/49a91e7f-1023-430f-8d66-561055f3d0f7/live.isml/master.m3u8" }
    ]
  },
  {
    id: "rt-news",
    type: "tv",
    title: "RT News",
    logo: "https://i.ibb.co/M7W5zRy/images.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://rt-glb.rttv.com/live/rtnews/playlist.m3u8" }
    ]
  },
  {
    id: "iran-international",
    type: "tv",
    title: "Iran International",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Iran_International_logo_2021.svg/960px-Iran_International_logo_2021.svg.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://dev-live.livetvstream.co.uk/LS-63503-4/chunklist_b1196000.m3u8" }
    ]
  },
  {
    id: "dw",
    type: "tv",
    title: "DW",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/8e/DW_%28TV%29_Logo_2012.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://dwamdstream102.akamaized.net/hls/live/2015525/dwstream102/index.m3u8" }
    ]
  },
  {
    id: "10-news-sydney",
    type: "tv",
    title: "10 News Sydney",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/10_News_First.svg/1920px-10_News_First.svg.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://cdn-ue1-prod.tsv2.amagi.tv/linear/amg02703-leadstory-leadstory-samsungau/playlist.m3u8" }
    ]
  },
  {
    id: "cgtn",
    type: "tv",
    title: "CGTN",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/CGTN.svg/1920px-CGTN.svg.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://0472.org/hls/cgtn.m3u8" },
      { name: "Server 2", quality: "HD", url: "https://app.ncare.live/c3VydmVyX8RpbEU9Mi8xNy8yMDE0GIDU6RgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcGVMZEJCTEFWeVN3PTOmdFsaWRtaW51aiPhnPTI2/cgtn.stream/playlist.m3u8" }
    ]
  },
  {
    id: "ndtv-english",
    type: "tv",
    title: "NDTV English",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/NDTV_logo.svg/960px-NDTV_logo.svg.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://ndtv24x7elemarchana.akamaized.net/hls/live/2003678/ndtv24x7/master.m3u8" }
    ]
  },
  {
    id: "sky-news",
    type: "tv",
    title: "Sky News",
    logo: "/sky-news.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://d39chvnxm26pgp.cloudfront.net/v1/master/72588bff830dec7b26d7cbbf5f3c24928aec5c03/cc-sthen6ms4vxgv-stage/WNSFO/ABR.m3u8" }
    ]
  },

  // ── New Channels ──────────────────────────────────────────
  {
    id: "nikki",
    type: "tv",
    title: "Nikki",
    logo: "https://imgur.com/79g2kMA.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://nomawnoijl.gpcdn.net/akash/nikky/playlist.m3u8" }
    ]
  },
  {
    id: "originals",
    type: "tv",
    title: "Originals",
    logo: "https://imgur.com/79g2kMA.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://nomawnoijl.gpcdn.net/akash/originals/playlist.m3u8" }
    ]
  },
  {
    id: "crazy-ex",
    type: "tv",
    title: "Crazy Ex",
    logo: "https://imgur.com/79g2kMA.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://nomawnoijl.gpcdn.net/akash/crazy_ex/playlist.m3u8" }
    ]
  },
  {
    id: "delicious",
    type: "tv",
    title: "Delicious",
    logo: "https://imgur.com/79g2kMA.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://nomawnoijl.gpcdn.net/akash/delicious/playlist.m3u8" }
    ]
  },
  {
    id: "kids-stars",
    type: "tv",
    title: "Kids Stars",
    logo: "https://imgur.com/79g2kMA.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://nomawnoijl.gpcdn.net/akash/kidsstars/playlist.m3u8" }
    ]
  },
  {
    id: "crimes",
    type: "tv",
    title: "Crimes",
    logo: "https://imgur.com/79g2kMA.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://nomawnoijl.gpcdn.net/akash/crimes/playlist.m3u8" }
    ]
  },
  {
    id: "true-stories",
    type: "tv",
    title: "True Stories",
    logo: "https://imgur.com/79g2kMA.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://nomawnoijl.gpcdn.net/akash/truestories/playlist.m3u8" }
    ]
  },
  {
    id: "intelligence",
    type: "tv",
    title: "Intelligence",
    logo: "https://imgur.com/79g2kMA.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://nomawnoijl.gpcdn.net/akash/intelligence/playlist.m3u8" }
    ]
  },
  {
    id: "sports-range",
    type: "tv",
    title: "Sports Range",
    logo: "https://imgur.com/79g2kMA.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://nomawnoijl.gpcdn.net/akash/sportrange/playlist.m3u8" }
    ]
  },
  {
    id: "thunder-er",
    type: "tv",
    title: "Thunder Er",
    logo: "https://imgur.com/79g2kMA.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://nomawnoijl.gpcdn.net/akash/thunder/playlist.m3u8" }
    ]
  },

  // ── Kids Channels ──────────────────────────────────────────
  {
    id: "rongeen-tv",
    type: "tv",
    title: "Rongeen TV",
    logo: "/rongeen.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://server.thelegitpro.in/rongeentv/rongeentv/tracks-v1a1/mono.m3u8" }
    ]
  },
  {
    id: "motu-patlu",
    type: "tv",
    title: "Motu Patlu",
    logo: "https://bugsfreeweb.github.io/LiveTVCollector/BugsfreeLogo/default-logo.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://live20.bozztv.com/giatvplayout7/giatv-209622/tracks-v1a1/mono.ts.m3u8" }
    ]
  },
  {
    id: "gopal-bhar-tv",
    type: "tv",
    title: "Gopal Bhar",
    logo: "https://bugsfreeweb.github.io/LiveTVCollector/BugsfreeLogo/default-logo.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://live20.bozztv.com/giatvplayout7/giatv-209611/tracks-v1a1/mono.ts.m3u8" }
    ]
  },
  {
    id: "tom-and-jerry",
    type: "tv",
    title: "Tom and Jerry",
    logo: "https://bugsfreeweb.github.io/LiveTVCollector/BugsfreeLogo/default-logo.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://live20.bozztv.com/giatvplayout7/giatv-208314/tracks-v1a1/mono.ts.m3u8" }
    ]
  },
  {
    id: "toon-goggles",
    type: "tv",
    title: "Toon Goggles",
    logo: "https://www.toongoggles.com/themes/custom/tg/toon_goggles/logo.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://d1eg24xrsfr6kv.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-b4b1bzxkt1uzo-prod/tg/tg/tg.m3u8" }
    ]
  },
  {
    id: "toon-goggles2",
    type: "tv",
    title: "Toon Goggle",
    logo: "https://www.toongoggles.com/themes/custom/tg/toon_goggles/logo.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://stream-us-east-1.getpublica.com/playlist.m3u8?network_id=36" }
    ]
  },
  {
    id: "funny-junior",
    type: "tv",
    title: "Funny Junior HD",
    logo: "/funny-junior.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://nomawnoijl.gpcdn.net/akash/funnyjunior/playlist.m3u8" }
    ]
  },
  {
    id: "zoo-moo",
    type: "tv",
    title: "ZOO MOO",
    logo: "https://static.wikia.nocookie.net/logopedia/images/4/44/ZooMoo_Kids_2020.svg",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://zoomoo-samsungau.amagi.tv/playlist720p.m3u8" }
    ]
  },
  {
    id: "nick-german-pluto-tv",
    type: "tv",
    title: "Nick German Pluto TV",
    logo: "https://static.wikia.nocookie.net/logopedia/images/e/e4/Nickplutotvlogo2023.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5ede448d3d50590007a4419elivestitch/master.m3u8?deviceId=channel&deviceModel=web&deviceVersion=1.0&appVersion=1.0&deviceType=rokuChannel&deviceMake=rokuChannel&deviceDNT=1&advertisingId=channel&embedPartner=rokuChannel&appName=rokuchannel&is_lat=1&bmodel=bm1&content=channel&platform=web&tags=ROKU_CONTENT_TAGS&coppa=false&content_type=livefeed&rdid=channel&genre=ROKU_ADS_CONTENT_GENRE&content_rating=ROKU_ADS_CONTENT_RATING&studio_id=viacom&channel_id=channel&profilesFromStream=true" }
    ]
  },
  {
    id: "nick-jr-us-pluto-tv",
    type: "tv",
    title: "Nick Jr US Pluto TV",
    logo: "https://static.wikia.nocookie.net/logopedia/images/6/69/Nicktoons_2023_Logo.svg",
    servers: [
      { name: "Server 1", quality: "HD", url: "/api/proxy?url=http://service-stitcher.clusters.pluto.tv/stitch/hls/channel/5ca6748a37b88b269472dad9livestitch/master.m3u8?terminate=false&deviceType=web&deviceMake=web&deviceModel=web&sid=978&deviceId=5ca6748a37b88b269472dad9&deviceVersion=DNT&appVersion=DNT&deviceDNT=0&userId=&advertisingId=&deviceLat=&deviceLon=&app_name=&appName=web&buildVersion=&appStoreUrl=&architecture=&includeExtendedEvents=false&marketingRegion=US&serverSideAds=false&profilesFromStream=true" }
    ]
  },
  {
    id: "nickelodeon",
    type: "tv",
    title: "Nickelodeon",
    logo: "https://static.wikia.nocookie.net/logopedia/images/0/0b/Nick_Jr_%28formerly_Noggin%29_New_Logo.jpg",
    servers: [
      { name: "Server 1", quality: "HD", url: "/api/proxy?url=http://151.80.18.177:86/Nickelodeon_FR/index.m3u8" }
    ]
  },
  {
    id: "nickelodeon-pluto-tv",
    type: "tv",
    title: "Nickelodeon Pluto TV",
    logo: "https://static.wikia.nocookie.net/logopedia/images/0/0b/Nick_Jr_%28formerly_Noggin%29_New_Logo.jpg",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5ca673e0d0bd6c2689c94ce3livestitch/master.m3u8?deviceId=channel&deviceModel=web&deviceVersion=1.0&appVersion=1.0&deviceType=rokuChannel&deviceMake=rokuChannel&deviceDNT=1&advertisingId=channel&embedPartner=rokuChannel&appName=rokuchannel&is_lat=1&bmodel=bm1&content=channel&platform=web&tags=ROKU_CONTENT_TAGS&coppa=false&content_type=livefeed&rdid=channel&genre=ROKU_ADS_CONTENT_GENRE&content_rating=ROKU_ADS_CONTENT_RATING&studio_id=viacom&channel_id=channel&profilesFromStream=true" }
    ]
  },
  {
    id: "pappa-pig-pluto",
    type: "tv",
    title: "Pappa Pig Pluto",
    logo: "https://static.wikia.nocookie.net/logopedia/images/c/c5/Peppa_Pig.svg",
    servers: [
      { name: "Server 1", quality: "HD", url: "/api/proxy?url=http://cfd-v4-service-channel-stitcher-use1-1.prd.pluto.tv/stitch/hls/channel/5d14fb6c84dd37df3b4290c5/master.m3u8?appName=web&appVersion=unknown&clientTime=0&deviceDNT=0&deviceId=6c287c49-30d3-11ef-9cf5-e9ddff8ff496&deviceMake=Chrome&deviceModel=web&deviceType=web&deviceVersion=unknown&includeExtendedEvents=false&serverSideAds=false&sid=58d418cb-223d-4b93-bc8e-5666e9995949" }
    ]
  },
  {
    id: "pbs-kids-alaska",
    type: "tv",
    title: "PBS Kids Alaska",
    logo: "https://i.imgur.com/ambc9le.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://livestream.pbskids.org/out/v1/94b88ad58fc14f84a9382341f1c00b82/akst.m3u8" }
    ]
  },
  {
    id: "persiana-junior",
    type: "tv",
    title: "Persiana Junior",
    logo: "https://i.imgur.com/zeKHZYG.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "/api/proxy?url=https://junhls.persiana.live/hls/stream.m3u8" }
    ]
  },
  {
    id: "roya-kids",
    type: "tv",
    title: "Roya Kids",
    logo: "https://i.imgur.com/acuCGF8.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://playlist.fasttvcdn.com/pl/ptllxjd03j6g9oxxjdfapg/roya-kids/playlist.m3u8" }
    ]
  },
  {
    id: "ryan-and-friends",
    type: "tv",
    title: "Ryan and Friends",
    logo: "https://i.imgur.com/jcIprmt.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://ryanandfriends-samsungau.amagi.tv/playlist.m3u8" }
    ]
  },
  {
    id: "smurf-tv",
    type: "tv",
    title: "Smurf TV",
    logo: "https://tvpnlogopeu.samsungcloud.tv/platform/image/sourcelogo/vc/00/02/34/GBBD1300001WA_20250107T030751SQUARE.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://d144py1prrd7ns.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-affg2ev32s0dq/smrfe.m3u8" }
    ]
  },
  {
    id: "tg-junior",
    type: "tv",
    title: "TG Junior",
    logo: "https://tvpnlogopus.samsungcloud.tv/platform/image/sourcelogo/vc/00/02/34/USBB3600001R6_20240520T214655SQUARE.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://d3i6upqaqzosi1.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-9k42dil136v1e-prod/tg/jr_us/tg_jr_us.m3u8" }
    ]
  },
  {
    id: "the-lego-channel",
    type: "tv",
    title: "The LEGO Channel",
    logo: "https://tvpnlogopus.samsungcloud.tv/platform/image/sourcelogo/vc/00/02/34/USBA2300001S8_20241210T013828SQUARE.png",
    servers: [
      { name: "Server 1", quality: "HD", url: "https://dh18i7whff86v.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-pslwq5nud9zg9/index.m3u8" }
    ]
  }
];

export default tvlinks;
