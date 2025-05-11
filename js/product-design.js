// 产品设计作品集页面的JavaScript功能

// 全局变量
let currentSlides = {};
let slideTimers = {};
const SLIDE_INTERVAL = 5000; // 自动轮播间隔（毫秒）

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM加载完成，初始化轮播...");
  initAllProjects();
  initScrollAnimations();
  initTypedText();
});

// 初始化打字效果
function initTypedText() {
  const typedTextElement = document.querySelector('.typed-text');
  const cursorElement = document.querySelector('.cursor');
  
  if (!typedTextElement || !cursorElement) return;
  
  const textArray = ['作品集', '创意展示', '设计探索', '产品创新'];
  let textArrayIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 150; // 打字速度
  
  function type() {
    const currentText = textArray[textArrayIndex];
    
    if (isDeleting) {
      // 删除文字
      typedTextElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 50; // 删除速度更快
    } else {
      // 添加文字
      typedTextElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 150; // 打字速度正常
    }
    
    // 切换状态
    if (!isDeleting && charIndex === currentText.length) {
      // 打字完成，等待一段时间后开始删除
      typingDelay = 2000; // 等待2秒
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // 删除完成，切换到下一个文本
      isDeleting = false;
      textArrayIndex = (textArrayIndex + 1) % textArray.length;
    }
    
    setTimeout(type, typingDelay);
  }
  
  // 开始打字效果
  setTimeout(type, 1000);
}

// 初始化所有项目
function initAllProjects() {
  const projects = document.querySelectorAll('.project-item');
  
  projects.forEach((project, index) => {
    const projectId = `project-${index}`;
    project.id = projectId;
    
    if (index === 0) {
      // 第一个项目：初始化视频和图片切换
      const videoContainer = project.querySelector('.video-container');
      if (videoContainer) {
        videoContainer.classList.add('active');
        initVideoControls(projectId);
        initMediaToggle(projectId);
      }
      } else {
      // 项目二、三：初始化轮播
      const carouselContainer = project.querySelector('.carousel-container');
      if (carouselContainer) {
        carouselContainer.classList.add('active');
        initSlideshow(projectId);
      }
    }
    
    // 初始化信息切换
    initToggleInfo(projectId);
  });
}

// 初始化媒体切换（视频和图片）
function initMediaToggle(projectId) {
  const project = document.getElementById(projectId);
  if (!project) return;
  
  const videoContainer = project.querySelector('.video-container');
  const carouselContainer = project.querySelector('.carousel-container');
  const dotsContainer = project.querySelector('.carousel-dots');
  
  if (!videoContainer || !carouselContainer || !dotsContainer) return;
  
  // 清空现有的轮播点
  dotsContainer.innerHTML = '';
  
  // 添加视频按钮
  const videoDot = document.createElement('div');
  videoDot.className = 'dot active';
  videoDot.addEventListener('click', (e) => {
    e.stopPropagation();
    showVideo(projectId);
  });
  dotsContainer.appendChild(videoDot);
  
  // 添加图片轮播按钮
  const slides = project.querySelectorAll('.slide');
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      showSlide(projectId, index);
    });
    dotsContainer.appendChild(dot);
    });
  
  // 默认显示视频
  showVideo(projectId);
}

// 显示视频
function showVideo(projectId) {
  const project = document.getElementById(projectId);
  if (!project) return;
  
  const videoContainer = project.querySelector('.video-container');
  const carouselContainer = project.querySelector('.carousel-container');
  const dots = project.querySelectorAll('.dot');
  
  if (!videoContainer || !carouselContainer || !dots.length) return;
  
  // 显示视频，隐藏图片
  videoContainer.classList.add('active');
  carouselContainer.classList.remove('active');
  
  // 更新按钮状态
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === 0);
  });
  
  // 暂停自动轮播
  if (slideTimers[projectId]) {
    clearInterval(slideTimers[projectId]);
  }
}

// 显示特定图片
function showSlide(projectId, index) {
  const project = document.getElementById(projectId);
  if (!project) return;
  
  const videoContainer = project.querySelector('.video-container');
  const carouselContainer = project.querySelector('.carousel-container');
  const slides = project.querySelectorAll('.slide');
  const dots = project.querySelectorAll('.dot');

  if (!videoContainer || !carouselContainer || !slides.length || !dots.length) return;
  
  // 隐藏视频，显示图片
  videoContainer.classList.remove('active');
  carouselContainer.classList.add('active');
  
  // 清除当前活动状态
  slides.forEach(slide => slide.classList.remove('active'));
  
  // 设置新的活动状态
  if (slides[index]) slides[index].classList.add('active');

  // 更新按钮状态
  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === index + 1);
  });
  
  // 更新当前索引
  currentSlides[projectId] = index;
}

// 初始化轮播（用于第2和第3个项目）
function initSlideshow(projectId) {
  const project = document.getElementById(projectId);
  if (!project) return;
  
  // 如果是第一个项目，则由 initMediaToggle 处理
  if (projectId === 'project-0') return;
  
  const slides = project.querySelectorAll('.slide');
  const dotsContainer = project.querySelector('.carousel-dots');
  
  if (!slides.length || !dotsContainer) return;
  
  // 清空现有的轮播点
  dotsContainer.innerHTML = '';
  
  // 创建轮播点
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = 'dot' + (index === 0 ? ' active' : '');
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      setSlide(projectId, index);
    });
    dotsContainer.appendChild(dot);
  });
  
  // 设置初始状态
  currentSlides[projectId] = 0;
  setSlide(projectId, 0);

  // 开始自动轮播
  startAutoSlide(projectId);
}

// 设置特定幻灯片
function setSlide(projectId, index) {
  const project = document.getElementById(projectId);
  if (!project) return;
  
  const slides = project.querySelectorAll('.slide');
  const dots = project.querySelectorAll('.dot');

  if (!slides.length || !dots.length) return;

  // 清除当前活动状态
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  // 设置新的活动状态
  if (slides[index]) slides[index].classList.add('active');
  if (dots[index]) dots[index].classList.add('active');

  // 更新当前索引
  currentSlides[projectId] = index;

  // 重置自动轮播计时器
  startAutoSlide(projectId);
}

// 开始自动轮播
function startAutoSlide(projectId) {
  const project = document.getElementById(projectId);
  if (!project) return;
  
  const slides = project.querySelectorAll('.slide');
  
  if (!slides.length) return;
  
  // 清除现有定时器
  if (slideTimers[projectId]) {
    clearInterval(slideTimers[projectId]);
  }
  
  // 设置新的定时器
  slideTimers[projectId] = setInterval(() => {
    const nextIndex = (currentSlides[projectId] + 1) % slides.length;
    setSlide(projectId, nextIndex);
  }, SLIDE_INTERVAL);
}

// 初始化视频控制
function initVideoControls(projectId) {
  const project = document.getElementById(projectId);
  if (!project) return;
  
  const video = project.querySelector('video');
  const playPauseBtn = project.querySelector('.play-pause-btn');
  const progressBar = project.querySelector('.progress-bar');
  const timeDisplay = project.querySelector('.time-display');
  const volumeBtn = project.querySelector('.volume-btn');
  const volumeSlider = project.querySelector('.volume-slider');
  
  if (!video || !playPauseBtn) return;

  // 确保视频已加载
  video.addEventListener('loadedmetadata', () => {
    console.log('视频元数据已加载');
    if (timeDisplay) timeDisplay.textContent = formatTime(0);
  });
  
  // 播放/暂停控制
  playPauseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (video.paused) {
      video.play();
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      video.pause();
      playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
  });

  // 进度条控制
  if (progressBar && timeDisplay) {
    video.addEventListener('timeupdate', () => {
      if (!video.duration) return;
      const progress = (video.currentTime / video.duration) * 100;
      progressBar.value = progress;
      timeDisplay.textContent = formatTime(video.currentTime);
    });
    
    progressBar.addEventListener('input', (e) => {
      e.stopPropagation();
      if (!video.duration) return;
      const time = (progressBar.value / 100) * video.duration;
      video.currentTime = time;
    });
  }
  
  // 音量控制
  if (volumeBtn && volumeSlider) {
    volumeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      video.muted = !video.muted;
      volumeBtn.innerHTML = video.muted ? 
        '<i class="fas fa-volume-mute"></i>' : 
        '<i class="fas fa-volume-up"></i>';
    });
    
    volumeSlider.addEventListener('input', (e) => {
      e.stopPropagation();
      video.volume = volumeSlider.value / 100;
      video.muted = false;
      volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    });
  }
  
  // 视频结束时重置
  video.addEventListener('ended', () => {
    video.currentTime = 0;
    if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  });
}

// 格式化时间
function formatTime(seconds) {
  if (isNaN(seconds) || !isFinite(seconds)) return "00:00";
  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// 初始化滚动动画
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.project-item, .process-step');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }
  );

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
}

// 页面加载动画
window.addEventListener("load", function () {
  console.log("页面完全加载完成，确保轮播正常运行...");
  document.body.classList.add("loaded");

  // 确保轮播已经初始化
  if (Object.keys(currentSlides).length === 0) {
    console.log("在window.onload中重新初始化轮播");
    initAllProjects();
  }

  // 如果有页面加载动画，可以在这里添加移除加载屏幕的代码
  const loader = document.getElementById("page-loader");
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
      }, 500);
    }, 500);
  }
});

// 添加平滑滚动到导航链接
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");

    // 确保链接是当前页面的锚点
    if (targetId.startsWith("#")) {
      e.preventDefault();

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // 如果有移动菜单，关闭它
        const mobileMenu = document.querySelector(".mobile-menu");
        if (mobileMenu && mobileMenu.classList.contains("active")) {
          mobileMenu.classList.remove("active");
          document.body.classList.remove("menu-open");
        }
      }
    }
  });
});

// 初始化信息切换
function initToggleInfo(projectId) {
  const project = document.getElementById(projectId);
  const toggleBtn = project.querySelector('.toggle-info-btn');

  if (!toggleBtn) return;
  
  toggleBtn.addEventListener('click', () => {
    project.classList.toggle('show-info');

    // 更新按钮文本
    const span = toggleBtn.querySelector('span');
    if (span) {
      span.textContent = project.classList.contains('show-info') ? '隐藏详情' : '查看详情';
    }
  });
}
