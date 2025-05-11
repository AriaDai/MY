document.addEventListener('DOMContentLoaded', function() {
  // 初始化轮播图功能
  initCarousel();
});

function initCarousel() {
  // 查找所有具有carousel类的元素
  const carousels = document.querySelectorAll('.carousel');
  
  // 为每个轮播图设置功能
  carousels.forEach(carousel => {
    const slides = carousel.querySelectorAll('.slide');
    const dots = carousel.querySelectorAll('.dot');
    const prevBtn = carousel.querySelector('.prev-btn');
    const nextBtn = carousel.querySelector('.next-btn');
    
    let currentSlide = 0;
    let slideInterval;

    // 显示初始幻灯片
    showSlide(currentSlide);
    
    // 自动轮播
    startAutoSlide();
    
    // 添加事件监听器
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // 为指示点添加事件监听器
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
        resetAutoSlide();
      });
    });
    
    // 暂停自动轮播（当用户悬停在轮播图上时）
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);

    // 显示指定幻灯片的函数
    function showSlide(index) {
      // 隐藏所有幻灯片
      slides.forEach(slide => {
        slide.classList.remove('active');
      });
      
      // 重置所有指示点
      dots.forEach(dot => {
        dot.classList.remove('active');
      });
      
      // 显示当前幻灯片和指示点
      slides[index].classList.add('active');
      if (dots.length > 0) {
        dots[index].classList.add('active');
      }
    }
    
    // 下一张幻灯片函数
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
      resetAutoSlide();
    }
    
    // 上一张幻灯片函数
    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
      resetAutoSlide();
    }
    
    // 开始自动轮播
    function startAutoSlide() {
      slideInterval = setInterval(nextSlide, 5000); // 每5秒切换一次
    }
    
    // 停止自动轮播
    function stopAutoSlide() {
      clearInterval(slideInterval);
    }
    
    // 重置自动轮播计时器
    function resetAutoSlide() {
      stopAutoSlide();
      startAutoSlide();
    }
  });
} 