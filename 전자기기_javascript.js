/* ===== 경로 유틸 ===== */
const WIN_BASE = "C:/Users/joon3/OneDrive/바탕 화면/2-2 학습자료/웹퍼블리싱/기말과제/";
const fileURL = (name) => "file:///" + encodeURI(WIN_BASE + name).replace(/#/g, "%23");

/* ===== 파일명(assets 안의 실제 이름과 100% 일치) ===== */
const Names = {
  keyboard: "키보드.png",
  controller: "컨트롤러.png",
  speaker: "스피커 사진.png",
  monitor: "모니터.png",
  mouse: "마우스.png",
  laptop: "노트북사진.png",
  gpu: "그래픽카드.png",
  ssd: "SSD.png",
  cpu: "CPU.png",
};

/* ===== 이미지 로더: assets → 확장자/대소문자 변형 → file:/// 폴백 ===== */
function setImageSmart(img, fileName, alt) {
  img.alt = alt;
  img.loading = "lazy";

  const base = fileName.replace(/\.(png|jpg|jpeg|webp)$/i, "");
  const variants = [
    `assets/${fileName}`,
    `assets/${base}.PNG`,
    `assets/${base}.jpg`,
    `assets/${base}.jpeg`,
    `assets/${base}.webp`,
    fileURL(fileName),
    fileURL(`${base}.PNG`),
  ];

  let i = 0;
  function tryNext() {
    if (i >= variants.length) {
      // 최종 플레이스홀더
      const svg = encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='540'>
           <rect width='100%' height='100%' fill='#0f172a'/>
           <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
                 fill='#94a3b8' font-size='28' font-family='Segoe UI, Noto Sans KR'>
             이미지를 찾을 수 없습니다
           </text>
         </svg>`
      );
      img.src = `data:image/svg+xml;charset=utf-8,${svg}`;
      img.onerror = null;
      return;
    }
    img.src = variants[i++];
  }
  img.onerror = tryNext;
  tryNext();
}

/* ===== 데이터 ===== */
const Devices = [
  { name: "기계식 키보드", key: "keyboard",
    badges: ["입력장치", "RGB"], pros: ["타건감 선명", "핫스왑 가능"], cons: ["소음 큼", "무게 있음"],
    specs: { 스위치: "청축", 연결: "유선 USB-C", 키배열: "87 TKL", 무게: "900g" } },
  { name: "무선 컨트롤러", key: "controller",
    badges: ["게임", "Bluetooth"], pros: ["그립감 우수", "지연 낮음"], cons: ["배터리 관리 필요"],
    specs: { 연결: "BT 5.0 / 2.4GHz", 배터리: "20h", 진동: "듀얼", 무게: "240g" } },
  { name: "2.1채널 스피커", key: "speaker",
    badges: ["오디오", "우퍼"], pros: ["저음 탄탄", "볼륨 노브 편리"], cons: ["공간 차지"],
    specs: { 출력: "60W RMS", 입력: "3.5mm / AUX", 전원: "AC", 재생대역: "50Hz~20kHz" } },
  { name: "27\" QHD 모니터", key: "monitor",
    badges: ["디스플레이", "IPS"], pros: ["색 정확도 높음", "높낮이/피벗"], cons: ["HDR 보통"],
    specs: { 해상도: "2560×1440", 주사율: "144Hz", 응답속도: "1ms MPRT", 포트: "HDMI×2, DP×1" } },
  { name: "무선 마우스", key: "mouse",
    badges: ["입력장치", "초경량"], pros: ["정밀 트래킹", "그립 안정"], cons: ["손 큰 사용자 비추천"],
    specs: { 센서: "PAW3395", 무게: "59g", 연결: "2.4G/BT/유선", DPI: "26K" } },
  { name: "노트북", key: "laptop",
    badges: ["모바일", "학생용"], pros: ["휴대성", "배터리 효율"], cons: ["업그레이드 제한"],
    specs: { CPU: "Intel i7", RAM: "16GB", 저장장치: "512GB NVMe", 무게: "1.4kg" } },
  { name: "그래픽카드", key: "gpu",
    badges: ["PC부품", "CUDA"], pros: ["연산 성능", "DLSS 지원"], cons: ["발열", "소모전력 높음"],
    specs: { 메모리: "12GB GDDR6X", 버스: "PCIe 4.0", 전원: "8+8핀", 출력: "HDMI/DP" } },
  { name: "NVMe SSD", key: "ssd",
    badges: ["저장장치", "M.2"], pros: ["부팅/로딩 빠름"], cons: ["수명 관리 필요"],
    specs: { 규격: "2280", 인터페이스: "PCIe 4.0 x4", 읽기: "7,000MB/s", 쓰기: "6,100MB/s" } },
  { name: "CPU", key: "cpu",
    badges: ["PC부품", "멀티코어"], pros: ["멀티스레드 강함"], cons: ["발열 관리 필요"],
    specs: { 코어: "8C/16T", 클럭: "5.0GHz", 캐시: "24MB", 소켓: "LGA1700" } },
];

/* ===== 슬라이더 셋 ===== */
const SliderSet = [
  { key: "laptop", caption: "노트북" },
  { key: "monitor", caption: "QHD 모니터" },
  { key: "keyboard", caption: "기계식 키보드" },
  { key: "mouse", caption: "무선 마우스" },
  { key: "controller", caption: "컨트롤러" },
];

/* ===== 테마 ===== */
const Theme = (() => {
  const root = document.documentElement, key = "mydevice-theme";
  const set = (mode) => {
    root.setAttribute("data-theme", mode);
    root.classList.toggle("theme-light", mode === "light");
    try { localStorage.setItem(key, mode); } catch {}
  };
  const toggle = () => set((root.getAttribute("data-theme") || "dark") === "dark" ? "light" : "dark");
  const init = (btn) => { set(localStorage.getItem(key) || root.getAttribute("data-theme") || "dark"); btn.addEventListener("click", toggle); };
  return { init };
})();

/* ===== 네비 ===== */
const Nav = (() => {
  function init(){
    const t = document.getElementById("nav-toggle");
    const l = document.getElementById("nav-list");
    t.addEventListener("click", ()=>{ const open = l.classList.toggle("open"); t.setAttribute("aria-expanded", String(open)); });
    l.querySelectorAll("a").forEach(a => a.addEventListener("click", ()=> l.classList.remove("open")));
  }
  return { init };
})();

/* ===== 배너 ===== */
const Banner = (() => {
  const lines = ["최신 입력장치 세팅 로딩 중…","Tip: 다크모드를 전환해 눈부심을 줄이세요.","슬라이더를 좌우로 넘겨 디바이스를 비교하세요.","Grid 카드에서 장단점과 사양을 빠르게 확인."];
  function init(){
    const el = document.querySelector("#top-banner .banner-text");
    let i = 0; setInterval(()=>{ i=(i+1)%lines.length; el.style.opacity=0; setTimeout(()=>{el.textContent=lines[i]; el.style.opacity=1;},160); }, 3500);
  }
  return { init };
})();

/* ===== 슬라이더 ===== */
const Slider = (() => {
  let idx = 0, auto = null;
  function render(){
    const track = document.getElementById("slides"); track.innerHTML = "";
    SliderSet.forEach((it, i) => {
      const slide = document.createElement("div");
      slide.className = "slide";
      slide.setAttribute("role","group"); slide.setAttribute("aria-roledescription","slide"); slide.setAttribute("aria-label", `${i+1} / ${SliderSet.length}`);
      const img = document.createElement("img");
      setImageSmart(img, Names[it.key], it.caption);
      const cap = document.createElement("div"); cap.className="slide-caption"; cap.textContent = it.caption;
      slide.append(img, cap); track.appendChild(slide);
    });
    const dots = document.getElementById("dots"); dots.innerHTML="";
    SliderSet.forEach((_, i)=>{ const b=document.createElement("button"); b.className="dot"; b.setAttribute("role","tab"); b.setAttribute("aria-selected", i===idx); b.addEventListener("click",()=>go(i)); dots.appendChild(b); });
    update();
  }
  function update(){ document.getElementById("slides").style.transform = `translateX(-${idx*100}%)`; [...document.getElementById("dots").children].forEach((d,i)=>d.setAttribute("aria-selected", i===idx)); }
  function next(){ idx=(idx+1)%SliderSet.length; update(); }
  function prev(){ idx=(idx-1+SliderSet.length)%SliderSet.length; update(); }
  function go(i){ idx=i; update(); }
  function autoplay(){ stop(); auto=setInterval(next, 5000); const s=document.getElementById("device-slider"); s.addEventListener("mouseenter", stop); s.addEventListener("mouseleave", autoplay); }
  function stop(){ if(auto) clearInterval(auto); }
  function init(){ render(); document.getElementById("next-btn").addEventListener("click", next); document.getElementById("prev-btn").addEventListener("click", prev); document.getElementById("slides").addEventListener("keydown", e=>{ if(e.key==="ArrowRight") next(); if(e.key==="ArrowLeft") prev(); }); autoplay(); }
  return { init };
})();

/* ===== 그리드 렌더 ===== */
const Render = (() => {
  const entry = (k,v)=>`<div><strong>${k}</strong> · ${v}</div>`;
  function card(d){
    const el = document.createElement("article"); el.className="device-card";
    const media = document.createElement("div"); media.className="device-media";
    const img = document.createElement("img"); setImageSmart(img, Names[d.key], d.name); media.appendChild(img);
    const body = document.createElement("div"); body.className="device-body";
    body.innerHTML = `
      <h3 class="device-title">${d.name}</h3>
      <div class="badges">${d.badges.map(b=>`<span class="badge">${b}</span>`).join("")}</div>
      <div class="meta"><span>장점/단점, 핵심 스펙</span></div>
      <div class="hr"></div>
      <div class="pros-cons">
        <div><strong>장점</strong></div>
        <ul>${d.pros.map(p=>`<li>👍 ${p}</li>`).join("")}</ul>
        <div><strong>단점</strong></div>
        <ul>${d.cons.map(c=>`<li>⚠️ ${c}</li>`).join("")}</ul>
      </div>
      <div class="hr"></div>
      <div class="specs">${Object.entries(d.specs).map(([k,v])=>entry(k,v)).join("")}</div>`;
    el.append(media, body);
    return el;
  }
  function grid(){ const wrap=document.getElementById("device-grid"); wrap.innerHTML=""; Devices.forEach(d=>wrap.appendChild(card(d))); }
  return { grid };
})();

/* ===== 부트 ===== */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  Theme.init(document.getElementById("theme-toggle"));
  Nav.init(); Banner.init(); Slider.init(); Render.grid();
});
