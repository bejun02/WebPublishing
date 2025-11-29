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
    name: "기계식 키보드",
    key: "keyboard",
    description: "청축 스위치의 시원한 타건감으로 코딩과 문서 작업이 즐거워지는 입력장치",
    badges: ["입력장치", "RGB"],
    rating: 4.5,
    pros: ["타건감 선명", "핫스왑 가능", "RGB 커스터마이징"],
    cons: ["소음 큼", "무게 있음"],
    specs: { 스위치: "청축", 연결: "유선 USB-C", 키배열: "87 TKL", 무게: "900g" }
  },
  {
    name: "무선 컨트롤러",
    key: "controller",
    description: "PC와 콘솔을 넘나드는 멀티플랫폼 게이밍의 필수품",
    badges: ["게임", "Bluetooth"],
    rating: 4.0,
    pros: ["그립감 우수", "지연 낮음", "멀티 플랫폼"],
    cons: ["배터리 관리 필요"],
    specs: { 연결: "BT 5.0 / 2.4GHz", 배터리: "20h", 진동: "듀얼", 무게: "240g" }
  },
  {
    name: "2.1채널 스피커",
    key: "speaker",
    description: "서브우퍼가 만들어내는 풍부한 저음으로 몰입감 있는 사운드 경험",
    badges: ["오디오", "우퍼"],
    rating: 4.2,
    pros: ["저음 탄탄", "볼륨 노브 편리", "음질 선명"],
    cons: ["공간 차지"],
    specs: { 출력: "60W RMS", 입력: "3.5mm / AUX", 전원: "AC", 재생대역: "50Hz~20kHz" }
  },
  {
    name: "27\" QHD 모니터",
    key: "monitor",
    description: "색감과 주사율 모두 잡은 게이밍 & 작업용 만능 디스플레이",
    badges: ["디스플레이", "IPS"],
    rating: 4.8,
    pros: ["색 정확도 높음", "높낮이/피벗 지원", "144Hz 부드러움"],
    cons: ["HDR 보통"],
    specs: { 해상도: "2560×1440", 주사율: "144Hz", 응답속도: "1ms MPRT", 포트: "HDMI×2, DP×1" }
  },
  {
    name: "무선 마우스",
    key: "mouse",
    description: "59g 초경량 설계로 장시간 사용해도 피로감 없는 게이밍 마우스",
    badges: ["입력장치", "초경량"],
    rating: 4.6,
    pros: ["정밀 트래킹", "그립 안정", "초경량 설계"],
    cons: ["손 큰 사용자 비추천"],
    specs: { 센서: "PAW3395", 무게: "59g", 연결: "2.4G/BT/유선", DPI: "26K" }
  },
  {
    name: "노트북",
    key: "laptop",
    description: "강의실에서 카페까지, 어디서든 생산성을 유지하는 휴대용 워크스테이션",
    badges: ["모바일", "학생용"],
    rating: 4.3,
    pros: ["휴대성 우수", "배터리 효율", "조용한 팬"],
    cons: ["업그레이드 제한"],
    specs: { CPU: "Intel i7", RAM: "16GB", 저장장치: "512GB NVMe", 무게: "1.4kg" }
  },
  {
    name: "그래픽카드",
    key: "gpu",
    description: "4K 게이밍과 딥러닝 학습을 동시에 소화하는 고성능 GPU",
    badges: ["PC부품", "CUDA"],
    rating: 4.7,
    pros: ["연산 성능 최상", "DLSS 지원", "레이트레이싱"],
    cons: ["발열", "소모전력 높음"],
    specs: { 메모리: "12GB GDDR6X", 버스: "PCIe 4.0", 전원: "8+8핀", 출력: "HDMI/DP" }
  },
  {
    name: "NVMe SSD",
    key: "ssd",
    description: "7,000MB/s의 극강 속도로 로딩 시간을 잊게 만드는 초고속 저장장치",
    badges: ["PC부품", "M.2"],
    rating: 4.9,
    pros: ["부팅/로딩 빠름", "무소음", "저발열"],
    cons: ["수명 관리 필요"],
    specs: { 규격: "2280", 인터페이스: "PCIe 4.0 x4", 읽기: "7,000MB/s", 쓰기: "6,100MB/s" }
  },
  {
    name: "CPU",
    key: "cpu",
    description: "8코어 16스레드의 강력한 멀티태스킹 성능을 자랑하는 두뇌",
    badges: ["PC부품", "멀티코어"],
    rating: 4.4,
    pros: ["멀티스레드 강함", "오버클럭 가능", "내장그래픽 없음(효율)"],
    cons: ["발열 관리 필요"],
    specs: { 코어: "8C/16T", 클럭: "5.0GHz", 캐시: "24MB", 소켓: "LGA1700" }
  }
];

// ===== 슬라이더용 기기 부분집합 =====
const SliderSet = [
  { key: "laptop", caption: "노트북" },
  { key: "monitor", caption: "QHD 모니터" },
  { key: "keyboard", caption: "기계식 키보드" },
  { key: "mouse", caption: "무선 마우스" },
  { key: "controller", caption: "컨트롤러" },
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
    const card = document.createElement("article");
    card.className = "device-card";
    card.dataset.categories = device.badges.join(",");
    card.dataset.name = device.name;
    card.dataset.rating = device.rating || 0;

    const media = document.createElement("div");
    media.className = "device-media";

    const img = document.createElement("img");
    setImageSmart(img, Names[device.key], device.name);
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
      Modal.open(img.src, device.name);
    });
    media.appendChild(img);

    const body = document.createElement("div");
    body.className = "device-body";

    body.innerHTML = `
      <h3 class="device-title">${device.name}</h3>
      ${device.rating ? renderStars(device.rating) : ''}
      <p class="device-desc">${device.description || ""}</p>
      <div class="badges">
        ${device.badges.map((badge) => `<span class="badge">${badge}</span>`).join("")}
      </div>
      <div class="hr"></div>
      <div class="pros-cons">
        <div>👍 장점</div>
        <ul>
          ${device.pros.map((pro) => `<li>${pro}</li>`).join("")}
        </ul>
        <div>⚠️ 단점</div>
        <ul>
          ${device.cons.map((con) => `<li>${con}</li>`).join("")}
        </ul>
      </div>
      <div class="hr"></div>
      <div class="specs">
        ${Object.entries(device.specs)
          .map(([k, v]) => entry(k, v))
          .join("")}
      </div>
    `;

    card.append(media, body);
    return card;
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
