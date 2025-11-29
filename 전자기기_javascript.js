/**
 * MyDevice - 전자기기 포트폴리오 SPA
 * 순수 JavaScript IIFE 패턴 기반 모듈식 아키텍처
 */

// ===== 경로 유틸 =====
const WIN_BASE = "C:/Users/joon3/OneDrive/바탕 화면/2-2 학습자료/웹퍼블리싱/기말과제/";
const fileURL = (name) => "file:///" + encodeURI(WIN_BASE + name).replace(/#/g, "%23");

// ===== 파일명 매핑 (assets 디렉토리의 정확한 파일명) =====
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
  phone: "스마트폰.GIF",
  buds: "버즈2 프로.GIF",
};

/**
 * 스마트 이미지 로더
 * 상대경로 > 확장자 변형 > file:// URL > SVG 플레이스홀더 순서로 시도
 * @param {HTMLImageElement} img - 설정할 이미지 요소
 * @param {string} fileName - 파일명
 * @param {string} alt - alt 텍스트
 */
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
      // 최종 SVG 플레이스홀더
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

// ===== 기기 데이터 =====
const Devices = [
  {
    name: "AULA F108",
    key: "keyboard",
    description: "카라멜라떼축의 부드러운 타건감과 트리플 연결을 지원하는 풀배열 무선 기계식 키보드",
    badges: ["입력장치"],
    rating: 4.0,
    pros: ["가성비", "높은 스테빌라이저", "좋은 타건감"],
    cons: ["타건 소리 큼", "불편한 RGB 커스터마이징", "배터리 미표시"],
    specs: { 스위치: "카라멜라떼축", 연결: "블루투스, 2.4G, 유선 USB-C", 키배열: "108", 무게: "1.2kg", 배터리: "8,000mAh" }
  },
  {
    name: "MOGA 컨트롤러",
    key: "controller",
    description: "가벼우면서도 튼튼한 내구성을 갖춘 모바일/PC 겸용 무선 게임패드",
    badges: ["입력장치"],
    rating: 3.5,
    pros: ["가벼운 무게", "높은 내구성", "오래가는 배터리"],
    cons: ["아쉬운 마감 처리", "밋밋한 클릭감", "진동 기능 없음"],
    specs: { 연결: "블루투스, USB-A, USB-C", 무게: "215g", 배터리: "3,000mAh" }
  },
  {
    name: "에디파이어 M60",
    key: "speaker",
    description: "컴팩트한 사이즈에 강력한 출력을 담은 2.0채널 블루투스 스피커",
    badges: ["출력장치"],
    rating: 4.7,
    pros: ["작고 이쁜 디자인", "가성비", "연결성"],
    cons: ["아쉬운 해상도", "부족한 우퍼"],
    specs: { 연결: "블루투스, 코덱, USB-C", 무게: "3.07kg", 출력: "트레블 15W×2, 중저음 18W×2", 주파수응답: "58Hz~40kHz" }
  },
  {
    name: "MSI 게이밍 모니터",
    key: "monitor",
    description: "165Hz 고주사율로 부드러운 게이밍 경험을 선사하는 가성비 모니터",
    badges: ["출력장치"],
    rating: 3.7,
    pros: ["무결점", "가성비", "디자인"],
    cons: ["FHD 해상도", "무거운 무게"],
    specs: { 해상도: "FHD (1920×1080)", 주사율: "최대 165Hz", 응답속도: "1ms MPRT", 포트: "HDMI×2, DP×1" }
  },
  {
    name: "R1 PRO MAX",
    key: "mouse",
    description: "57g 초경량 바디에 145시간 배터리를 탑재한 가성비 무선 마우스",
    badges: ["입력장치"],
    rating: 4.6,
    pros: ["가벼운 무게", "오래가는 배터리", "가성비"],
    cons: ["소음", "인피니티 휠 미지원"],
    specs: { 무게: "57g", 연결: "USB-C, 블루투스", 배터리: "145h" }
  },
  {
    name: "HP Envy x360",
    key: "laptop",
    description: "터치스크린과 360도 힌지로 다양한 활용이 가능한 2-in-1 컨버터블 노트북",
    badges: ["모바일"],
    rating: 4.2,
    pros: ["저소음", "가성비", "디자인"],
    cons: ["약한 힌지", "애매한 무게", "펜 미포함"],
    specs: { CPU: "Ryzen 5 8640HS", 스크린: "14인치, 300nit, 2.2K, 터치", 그래픽: "내장 그래픽", 메모리: "16GB", 저장장치: "1TB SSD", 배터리: "최대 15시간", 무게: "1.39kg" }
  },
  {
    name: "GIGABYTE RTX 4060",
    key: "gpu",
    description: "DLSS 3와 레이트레이싱을 지원하는 1080p 게이밍 최적화 그래픽카드",
    badges: ["부품"],
    rating: 4.3,
    pros: ["낮은 전력 소모", "DLSS 3 지원", "저발열"],
    cons: ["8GB VRAM 한계", "가격 대비 애매한 포지션"],
    specs: { 메모리: "8GB GDDR6", 부스트클럭: "2,475MHz", TDP: "115W", 출력: "HDMI 2.1, DP 1.4×3" }
  },
  {
    name: "GIGABYTE SATA SSD 1TB",
    key: "ssd",
    description: "안정적인 성능과 넉넉한 용량을 갖춘 SATA 인터페이스 SSD",
    badges: ["부품"],
    rating: 4.1,
    pros: ["가성비", "안정성", "낮은 발열"],
    cons: ["NVMe 대비 느린 속도", "구형 인터페이스"],
    specs: { 규격: "2.5인치", 인터페이스: "SATA III 6Gb/s", 읽기: "550MB/s", 쓰기: "500MB/s", 용량: "1TB" }
  },
  {
    name: "Intel i5-12400F",
    key: "cpu",
    description: "내장그래픽 없이 효율적인 가성비를 자랑하는 6코어 12스레드 CPU",
    badges: ["부품"],
    rating: 4.5,
    pros: ["뛰어난 가성비", "낮은 발열", "충분한 게이밍 성능"],
    cons: ["내장그래픽 없음", "오버클럭 미지원"],
    specs: { 코어: "6C/12T", 클럭: "2.5GHz (부스트 4.4GHz)", 캐시: "18MB", 소켓: "LGA1700", TDP: "65W" }
  },
  {
    name: "갤럭시 S22+",
    key: "phone",
    description: "균형 잡힌 성능과 세련된 디자인의 삼성 플래그십 스마트폰",
    badges: ["모바일"],
    rating: 4.7,
    pros: ["디자인", "오래가는 배터리", "내구도"],
    cons: ["아쉬운 두께", "아쉬운 성능"],
    specs: { AP: "스냅드래곤 8 Gen 1", 메모리: "8GB", 저장공간: "256GB", 무게: "167g", 배터리: "4,500mAh" }
  },
  {
    name: "갤럭시 버즈2 Pro",
    key: "buds",
    description: "24bit Hi-Fi 사운드와 지능형 ANC를 탑재한 프리미엄 무선 이어버드",
    badges: ["모바일"],
    rating: 4.6,
    pros: ["24bit Hi-Fi 음질", "강력한 ANC", "편안한 착용감"],
    cons: ["아쉬운 통화 품질", "케이스 무선충전 속도"],
    specs: { 드라이버: "코액셜 2-way", ANC: "지능형 ANC", 배터리: "5h (ANC ON), 케이스 포함 18h", 연결: "Bluetooth 5.3", 방수: "IPX7" }
  }
];

// ===== 슬라이더용 기기 (전체 기기) =====
const SliderSet = [
  { key: "keyboard", caption: "AULA F108" },
  { key: "controller", caption: "MOGA 컨트롤러" },
  { key: "speaker", caption: "에디파이어 M60" },
  { key: "monitor", caption: "MSI 게이밍 모니터" },
  { key: "mouse", caption: "R1 PRO MAX" },
  { key: "laptop", caption: "HP Envy x360" },
  { key: "gpu", caption: "GIGABYTE RTX 4060" },
  { key: "ssd", caption: "GIGABYTE SATA SSD 1TB" },
  { key: "cpu", caption: "Intel i5-12400F" },
  { key: "phone", caption: "갤럭시 S22+" },
  { key: "buds", caption: "갤럭시 버즈2 Pro" },
];

// ===== 테마 모듈 =====
const Theme = (() => {
  const root = document.documentElement;
  const key = "mydevice-theme";

  /**
   * 테마 설정
   * @param {string} mode - 'dark' 또는 'light'
   */
  const set = (mode) => {
    if (!["light", "dark"].includes(mode)) mode = "dark";
    root.setAttribute("data-theme", mode);
    root.classList.toggle("theme-light", mode === "light");
    try {
      localStorage.setItem(key, mode);
    } catch (e) {
      console.warn("localStorage 사용 불가:", e.message);
    }
  };

  const toggle = () => {
    const current = root.getAttribute("data-theme") || "dark";
    set(current === "dark" ? "light" : "dark");
  };

  const init = (btn) => {
    const saved = localStorage.getItem(key);
    const initial = saved || root.getAttribute("data-theme") || "dark";
    set(initial);
    btn.addEventListener("click", toggle);
  };

  return { init, set, toggle };
})();

// ===== 네비게이션 모듈 =====
const Nav = (() => {
  const init = () => {
    const toggle = document.getElementById("nav-toggle");
    const list = document.getElementById("nav-list");

    if (!toggle || !list) {
      console.warn("네비게이션 요소를 찾을 수 없습니다");
      return;
    }

    // 토글 버튼 클릭
    toggle.addEventListener("click", () => {
      const isOpen = list.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // 링크 클릭 시 메뉴 닫기
    list.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        list.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  };

  return { init };
})();

// ===== 배너 모듈 =====
const Banner = (() => {
  const lines = [
    "최신 입력장치 세팅 로딩 중…",
    "Tip: 다크모드를 전환해 눈부심을 줄이세요.",
    "슬라이더를 좌우로 넘겨 디바이스를 비교하세요.",
    "Grid 카드에서 장단점과 사양을 빠르게 확인.",
  ];

  let currentIndex = 0;
  let intervalId = null;

  const show = (index) => {
    const element = document.querySelector("#top-banner .banner-text");
    if (!element) return;

    element.style.opacity = "0";
    setTimeout(() => {
      element.textContent = lines[index];
      element.style.opacity = "0.9";
    }, 160);
  };

  const rotate = () => {
    currentIndex = (currentIndex + 1) % lines.length;
    show(currentIndex);
  };

  const init = () => {
    show(0);
    intervalId = setInterval(rotate, 3500);
  };

  const stop = () => {
    if (intervalId) clearInterval(intervalId);
  };

  return { init, stop };
})();

// ===== 슬라이더 모듈 =====
const Slider = (() => {
  let currentIdx = 0;
  let autoplayId = null;
  let isPlaying = true;
  const sliderElement = document.getElementById("device-slider");

  const updateCounter = () => {
    const counter = document.getElementById("slide-counter");
    if (counter) {
      counter.textContent = `${currentIdx + 1} / ${SliderSet.length}`;
    }
  };

  const updatePlayButton = () => {
    const playBtn = document.getElementById("slider-play-btn");
    if (playBtn) {
      playBtn.classList.toggle("paused", isPlaying);
      playBtn.setAttribute("aria-label", isPlaying ? "자동 재생 일시정지" : "자동 재생 시작");
    }
  };

  const render = () => {
    const track = document.getElementById("slides");
    if (!track) return;

    track.innerHTML = "";

    SliderSet.forEach((item, idx) => {
      const slide = document.createElement("div");
      slide.className = "slide";
      slide.setAttribute("role", "group");
      slide.setAttribute("aria-roledescription", "slide");
      slide.setAttribute("aria-label", `${idx + 1} / ${SliderSet.length}`);

      const img = document.createElement("img");
      setImageSmart(img, Names[item.key], item.caption);

      const caption = document.createElement("div");
      caption.className = "slide-caption";
      caption.textContent = item.caption;

      slide.append(img, caption);
      track.appendChild(slide);
    });

    renderDots();
    update();
  };

  const renderDots = () => {
    const dots = document.getElementById("dots");
    if (!dots) return;

    dots.innerHTML = "";
    SliderSet.forEach((_, idx) => {
      const dot = document.createElement("button");
      dot.className = "dot";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-selected", idx === currentIdx);
      dot.addEventListener("click", () => go(idx));
      dots.appendChild(dot);
    });
  };

  const update = () => {
    const track = document.getElementById("slides");
    if (track) {
      track.style.transform = `translateX(-${currentIdx * 100}%)`;
    }

    document.querySelectorAll(".dot").forEach((dot, idx) => {
      dot.setAttribute("aria-selected", idx === currentIdx);
    });

    updateCounter();
  };

  const next = () => {
    currentIdx = (currentIdx + 1) % SliderSet.length;
    update();
  };

  const prev = () => {
    currentIdx = (currentIdx - 1 + SliderSet.length) % SliderSet.length;
    update();
  };

  const go = (idx) => {
    currentIdx = idx;
    update();
  };

  const startAutoplay = () => {
    stopAutoplay();
    isPlaying = true;
    autoplayId = setInterval(next, 5000);
    updatePlayButton();
  };

  const stopAutoplay = () => {
    isPlaying = false;
    if (autoplayId) {
      clearInterval(autoplayId);
      autoplayId = null;
    }
    updatePlayButton();
  };

  const toggleAutoplay = () => {
    if (isPlaying) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  };

  const init = () => {
    render();

    const nextBtn = document.getElementById("next-btn");
    const prevBtn = document.getElementById("prev-btn");
    const playBtn = document.getElementById("slider-play-btn");
    const slides = document.getElementById("slides");

    if (nextBtn) nextBtn.addEventListener("click", next);
    if (prevBtn) prevBtn.addEventListener("click", prev);
    if (playBtn) playBtn.addEventListener("click", toggleAutoplay);

    if (slides) {
      slides.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      });
    }

    // 호버 시 일시정지 (단, 수동으로 정지한 경우 제외)
    if (sliderElement) {
      sliderElement.addEventListener("mouseenter", () => {
        if (isPlaying && autoplayId) {
          clearInterval(autoplayId);
          autoplayId = null;
        }
      });
      sliderElement.addEventListener("mouseleave", () => {
        if (isPlaying && !autoplayId) {
          autoplayId = setInterval(next, 5000);
        }
      });
    }

    startAutoplay();
  };

  return { init, next, prev, go, toggleAutoplay };
})();

// ===== 렌더링 모듈 =====
const Render = (() => {
  const entry = (k, v) => `<div><strong>${k}</strong> · ${v}</div>`;
  let currentFilter = "all";
  let currentSearch = "";
  let currentSort = "default";

  // 별점 렌더링 함수
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    let stars = '';
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars += '<span class="star filled">★</span>';
      } else if (i === fullStars && hasHalf) {
        stars += '<span class="star filled">★</span>';
      } else {
        stars += '<span class="star">★</span>';
      }
    }
    return `<div class="rating">${stars}<span class="rating-value">${rating.toFixed(1)}</span></div>`;
  };

  const createCard = (device) => {
    // 컨테이너 생성
    const container = document.createElement("div");
    container.className = "device-card-container";
    container.dataset.categories = device.badges.join(",");
    container.dataset.name = device.name;
    container.dataset.rating = device.rating || 0;
    container.dataset.deviceKey = device.key;

    // 카드
    const card = document.createElement("article");
    card.className = "device-card";

    // 이미지 영역
    const media = document.createElement("div");
    media.className = "device-media";
    const img = document.createElement("img");
    setImageSmart(img, Names[device.key], device.name);
    media.appendChild(img);

    // 정보 영역
    const info = document.createElement("div");
    info.className = "device-info";
    info.innerHTML = `
      <h3 class="device-title">${device.name}</h3>
      ${device.rating ? renderStars(device.rating) : ''}
      <p class="device-hint">클릭하여 상세정보 보기</p>
    `;

    card.append(media, info);
    container.appendChild(card);

    return container;
  };

  // 필터링 + 검색 + 정렬 적용
  const getFilteredDevices = () => {
    let filtered = [...Devices];

    // 카테고리 필터
    if (currentFilter !== "all") {
      filtered = filtered.filter(d => d.badges.some(b => b.includes(currentFilter)));
    }

    // 검색어 필터
    if (currentSearch) {
      const search = currentSearch.toLowerCase();
      filtered = filtered.filter(d => 
        d.name.toLowerCase().includes(search) ||
        d.description?.toLowerCase().includes(search) ||
        d.badges.some(b => b.toLowerCase().includes(search))
      );
    }

    // 정렬
    switch (currentSort) {
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name, 'ko'));
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "category":
        filtered.sort((a, b) => a.badges[0].localeCompare(b.badges[0], 'ko'));
        break;
    }

    return filtered;
  };

  const grid = (filter = currentFilter, search = currentSearch, sort = currentSort) => {
    currentFilter = filter;
    currentSearch = search;
    currentSort = sort;

    const wrapper = document.getElementById("device-grid");
    const noResults = document.getElementById("no-results");
    if (!wrapper) {
      console.warn("device-grid 요소를 찾을 수 없습니다");
      return;
    }

    wrapper.innerHTML = "";
    const filtered = getFilteredDevices();

    if (filtered.length === 0 && noResults) {
      noResults.style.display = "block";
    } else if (noResults) {
      noResults.style.display = "none";
    }

    filtered.forEach((device, idx) => {
      const card = createCard(device);
      card.style.animationDelay = `${idx * 0.05}s`;
      wrapper.appendChild(card);
    });

    // 이벤트 위임: device-grid에서 카드 클릭 처리
    wrapper.onclick = (e) => {
      const container = e.target.closest(".device-card-container");
      if (container) {
        const deviceKey = container.dataset.deviceKey;
        const device = Devices.find(d => d.key === deviceKey);
        if (device) {
          DeviceModal.open(device);
        }
      }
    };
  };

  // 검색/정렬 업데이트 함수
  const setSearch = (search) => {
    currentSearch = search;
    grid();
  };

  const setSort = (sort) => {
    currentSort = sort;
    grid();
  };

  const setFilter = (filter) => {
    currentFilter = filter;
    grid();
  };

  return { grid, createCard, setSearch, setSort, setFilter };
})();

// ===== 필터 모듈 =====
const Filter = (() => {
  const init = () => {
    const filterBtns = document.querySelectorAll(".filter-btn");
    
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        // 활성 버튼 업데이트
        filterBtns.forEach(b => {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
        
        // 그리드 필터링
        const category = btn.dataset.category;
        Render.grid(category);
      });
    });

    // 푸터 카테고리 링크 처리
    document.querySelectorAll("[data-filter]").forEach(link => {
      link.addEventListener("click", (e) => {
        const filter = link.dataset.filter;
        const filterBtn = document.querySelector(`.filter-btn[data-category="${filter}"]`);
        if (filterBtn) {
          setTimeout(() => filterBtn.click(), 300);
        }
      });
    });
  };

  return { init };
})();

// ===== 폼 유효성 검사 모듈 =====
const Form = (() => {
  const showError = (inputId, message) => {
    const input = document.getElementById(inputId);
    const errorEl = document.getElementById(`${inputId}-error`);
    if (input) input.classList.add("error");
    if (errorEl) errorEl.textContent = message;
  };

  const clearError = (inputId) => {
    const input = document.getElementById(inputId);
    const errorEl = document.getElementById(`${inputId}-error`);
    if (input) input.classList.remove("error");
    if (errorEl) errorEl.textContent = "";
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validate = () => {
    let isValid = true;
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    // 이름 검증
    if (!name.value.trim()) {
      showError("name", "이름을 입력해주세요.");
      isValid = false;
    } else if (name.value.trim().length < 2) {
      showError("name", "이름은 2자 이상이어야 합니다.");
      isValid = false;
    } else {
      clearError("name");
    }

    // 이메일 검증
    if (!email.value.trim()) {
      showError("email", "이메일을 입력해주세요.");
      isValid = false;
    } else if (!validateEmail(email.value)) {
      showError("email", "올바른 이메일 형식이 아닙니다.");
      isValid = false;
    } else {
      clearError("email");
    }

    // 메시지 검증
    if (!message.value.trim()) {
      showError("message", "내용을 입력해주세요.");
      isValid = false;
    } else if (message.value.trim().length < 10) {
      showError("message", "내용은 10자 이상이어야 합니다.");
      isValid = false;
    } else {
      clearError("message");
    }

    return isValid;
  };

  const submit = (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    const submitBtn = document.getElementById("submit-btn");
    const btnText = submitBtn.querySelector(".btn-text");
    const btnLoading = submitBtn.querySelector(".btn-loading");
    const form = document.getElementById("contact-form");
    const success = document.getElementById("form-success");

    // 로딩 상태
    submitBtn.disabled = true;
    btnText.style.display = "none";
    btnLoading.style.display = "inline-flex";

    // 전송 시뮬레이션 (setTimeout 활용 - U4 평가기준)
    setTimeout(() => {
      form.style.display = "none";
      document.querySelector(".contact-info").style.display = "none";
      success.style.display = "block";
      
      // 3초 후 폼 리셋
      setTimeout(() => {
        form.reset();
        form.style.display = "flex";
        document.querySelector(".contact-info").style.display = "flex";
        success.style.display = "none";
        submitBtn.disabled = false;
        btnText.style.display = "inline-flex";
        btnLoading.style.display = "none";
      }, 3000);
    }, 1500);
  };

  const init = () => {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", submit);

    // 실시간 유효성 검사
    ["name", "email", "message"].forEach(id => {
      const input = document.getElementById(id);
      if (input) {
        input.addEventListener("blur", () => {
          if (input.value.trim()) validate();
        });
        input.addEventListener("input", () => clearError(id));
      }
    });
  };

  return { init };
})();

// ===== 스크롤 모듈 =====
const Scroll = (() => {
  const init = () => {
    const progressBar = document.getElementById("scroll-progress");
    const scrollTopBtn = document.getElementById("scroll-top-btn");

    // 스크롤 진행바 업데이트
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }

      // 맨 위로 버튼 표시/숨김
      if (scrollTopBtn) {
        scrollTopBtn.classList.toggle("visible", scrollTop > 300);
      }
    };

    window.addEventListener("scroll", updateProgress);

    // 맨 위로 버튼 클릭
    if (scrollTopBtn) {
      scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    updateProgress();
  };

  return { init };
})();

// ===== 이미지 모달 모듈 =====
const Modal = (() => {
  let modal, modalImg, modalCaption, closeBtn;

  const init = () => {
    modal = document.getElementById("image-modal");
    modalImg = document.getElementById("modal-image");
    modalCaption = document.getElementById("modal-caption");
    closeBtn = document.getElementById("modal-close");

    if (!modal) return;

    // 닫기 버튼 클릭
    closeBtn?.addEventListener("click", close);

    // 배경 클릭으로 닫기
    modal.addEventListener("click", (e) => {
      if (e.target === modal) close();
    });

    // ESC 키로 닫기
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        close();
      }
    });
  };

  const open = (src, caption = "") => {
    if (!modal || !modalImg) return;
    modalImg.src = src;
    modalImg.alt = caption;
    modalCaption.textContent = caption;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    if (!modal) return;
    modal.classList.remove("active");
    document.body.style.overflow = "";
  };

  return { init, open, close };
})();

// ===== 기기 상세 모달 모듈 =====
const DeviceModal = (() => {
  let modal, overlay, closeBtn;
  let modalImage, modalTitle, modalRating, modalDesc;
  let modalBadges, modalPros, modalCons, modalSpecs;

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    let stars = '';
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars += '<span class="star filled">★</span>';
      } else if (i === fullStars && hasHalf) {
        stars += '<span class="star filled">★</span>';
      } else {
        stars += '<span class="star">★</span>';
      }
    }
    return `<div class="rating">${stars}<span class="rating-value">${rating.toFixed(1)}</span></div>`;
  };

  const init = () => {
    modal = document.getElementById("device-modal");
    if (!modal) return;

    overlay = modal.querySelector(".device-modal-overlay");
    closeBtn = modal.querySelector(".device-modal-close");
    modalImage = modal.querySelector(".device-modal-image img");
    modalTitle = modal.querySelector(".device-modal-title");
    modalRating = modal.querySelector(".device-modal-rating");
    modalDesc = modal.querySelector(".device-modal-desc");
    modalBadges = modal.querySelector(".device-modal-badges");
    modalPros = document.getElementById("device-modal-pros");
    modalCons = document.getElementById("device-modal-cons");
    modalSpecs = modal.querySelector(".device-modal-specs");

    // 닫기 버튼 클릭
    closeBtn?.addEventListener("click", close);

    // 오버레이 클릭
    overlay?.addEventListener("click", close);

    // ESC 키
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        close();
      }
    });
  };

  const open = (device) => {
    if (!modal) return;

    // 이미지 설정
    const imgSrc = Names[device.key];
    if (modalImage) {
      if (typeof imgSrc === 'string') {
        modalImage.src = `assets/${imgSrc}`;
      } else if (Array.isArray(imgSrc) && imgSrc.length > 0) {
        modalImage.src = `assets/${imgSrc[0]}`;
      }
      modalImage.alt = device.name;
    }

    // 제목
    if (modalTitle) modalTitle.textContent = device.name;

    // 평점
    if (modalRating) {
      modalRating.innerHTML = device.rating ? renderStars(device.rating) : '';
    }

    // 설명
    if (modalDesc) modalDesc.textContent = device.description || '';

    // 배지
    if (modalBadges) {
      modalBadges.innerHTML = device.badges
        .map(badge => `<span class="badge">${badge}</span>`)
        .join('');
    }

    // 장점
    if (modalPros) {
      modalPros.innerHTML = device.pros
        .map(pro => `<li>${pro}</li>`)
        .join('');
    }

    // 단점
    if (modalCons) {
      modalCons.innerHTML = device.cons
        .map(con => `<li>${con}</li>`)
        .join('');
    }

    // 스펙
    if (modalSpecs) {
      modalSpecs.innerHTML = Object.entries(device.specs)
        .map(([key, value]) => `
          <div class="spec-item">
            <span class="spec-label">${key}</span>
            <span class="spec-value">${value}</span>
          </div>
        `)
        .join('');
    }

    // 모달 표시
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    if (!modal) return;
    modal.classList.remove("active");
    document.body.style.overflow = "";
  };

  return { init, open, close };
})();

// ===== 검색 모듈 =====
const Search = (() => {
  const init = () => {
    const searchInput = document.getElementById("device-search");
    const searchClear = document.getElementById("search-clear");
    const sortSelect = document.getElementById("sort-select");

    if (searchInput) {
      // 실시간 검색 (디바운스 적용)
      let debounceTimer;
      searchInput.addEventListener("input", (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          const value = e.target.value.trim();
          Render.setSearch(value);
          searchClear.style.display = value ? "block" : "none";
        }, 200);
      });

      // 검색어 지우기 버튼
      searchClear?.addEventListener("click", () => {
        searchInput.value = "";
        searchClear.style.display = "none";
        Render.setSearch("");
        searchInput.focus();
      });
    }

    // 정렬 선택
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        Render.setSort(e.target.value);
      });
    }
  };

  return { init };
})();

// ===== FAQ 아코디언 모듈 =====
const FAQ = (() => {
  const init = () => {
    const questions = document.querySelectorAll(".faq-question");

    questions.forEach(question => {
      question.addEventListener("click", () => {
        const item = question.closest(".faq-item");
        const isActive = item.classList.contains("active");

        // 다른 아이템 닫기 (단일 열기 모드)
        document.querySelectorAll(".faq-item.active").forEach(activeItem => {
          if (activeItem !== item) {
            activeItem.classList.remove("active");
            activeItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
          }
        });

        // 현재 아이템 토글
        item.classList.toggle("active", !isActive);
        question.setAttribute("aria-expanded", !isActive);
      });
    });
  };

  return { init };
})();

// ===== 로딩 스크린 모듈 =====
const Loading = (() => {
  const init = () => {
    const loadingScreen = document.getElementById("loading-screen");
    if (!loadingScreen) return;

    // 페이지 로드 완료 후 로딩 화면 숨기기
    window.addEventListener("load", () => {
      setTimeout(() => {
        loadingScreen.classList.add("hidden");
      }, 500);
    });

    // 3초 후에도 강제로 숨기기 (안전장치)
    setTimeout(() => {
      loadingScreen.classList.add("hidden");
    }, 3000);
  };

  return { init };
})();

// ===== 스크롤 애니메이션 모듈 =====
const ScrollAnimation = (() => {
  const init = () => {
    const sections = document.querySelectorAll(".section-animate");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });

    sections.forEach(section => observer.observe(section));
  };

  return { init };
})();

// ===== 타이핑 효과 모듈 =====
const Typing = (() => {
  const init = () => {
    const heroTitle = document.querySelector(".hero-title");
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.innerHTML = '<span class="typing-text"></span><span class="typing-cursor"></span>';
    const typingText = heroTitle.querySelector(".typing-text");

    let i = 0;
    const typeChar = () => {
      if (i < text.length) {
        typingText.textContent += text.charAt(i);
        i++;
        setTimeout(typeChar, 120);
      } else {
        // 타이핑 완료 후 커서 제거
        setTimeout(() => {
          const cursor = heroTitle.querySelector(".typing-cursor");
          if (cursor) cursor.style.display = "none";
        }, 2000);
      }
    };

    // 약간의 딜레이 후 타이핑 시작
    setTimeout(typeChar, 800);
  };

  return { init };
})();

// ===== 키보드 단축키 모듈 =====
const Shortcuts = (() => {
  const init = () => {
    document.addEventListener("keydown", (e) => {
      // 입력 필드에서는 단축키 비활성화
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

      switch (e.key.toLowerCase()) {
        case "d":
          Theme.toggle();
          break;
        case "arrowleft":
          Slider.prev();
          break;
        case "arrowright":
          Slider.next();
          break;
        case " ":
          e.preventDefault();
          Slider.toggleAutoplay();
          break;
      }
    });
  };

  return { init };
})();

// ===== 부트스트랩 =====
document.addEventListener("DOMContentLoaded", () => {
  try {
    // 로딩 스크린 먼저 초기화
    Loading.init();

    // 현재 연도 설정
    const yearElement = document.getElementById("year");
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }

    // 모든 모듈 초기화
    Theme.init(document.getElementById("theme-toggle"));
    Nav.init();
    Banner.init();
    Slider.init();
    Render.grid();
    Filter.init();
    Form.init();
    Scroll.init();
    Modal.init();
    DeviceModal.init();
    Search.init();
    FAQ.init();
    ScrollAnimation.init();
    Typing.init();
    Shortcuts.init();

    console.log("MyDevice 앱 초기화 완료");
  } catch (error) {
    console.error("초기화 오류:", error);
  }
});
