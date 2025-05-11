// 获取DOM元素
const header = document.querySelector('header');
const navMenu = document.querySelector('nav ul');
const scrollLinks = document.querySelectorAll('nav a');
const contactForm = document.querySelector('.contact-form');
const hamburger = document.querySelector('.hamburger');

// 滚动相关变量
let lastScrollTop = 0;
let scrollTimer;
const scrollThreshold = 10; // 滚动阈值

// 初始设置导航栏样式
header.classList.add('fixed-nav');

// 滚动事件处理
window.addEventListener('scroll', () => {
  const currentScrollTop = window.scrollY;
  
  // 滚动方向检测
  if (!header.classList.contains('mobile-menu-open')) {
    if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
      // 向下滚动，隐藏导航栏
      header.classList.add('scroll-down');
      header.classList.remove('scroll-up');
    } else {
      // 向上滚动，显示导航栏
      header.classList.remove('scroll-down');
      header.classList.add('scroll-up');
    }
  }
  
  // 更新背景样式
  if (currentScrollTop > 50) {
    header.classList.remove('fixed-nav');
  } else {
    header.classList.add('fixed-nav');
  }
  
  lastScrollTop = currentScrollTop;
  
  // 清除之前的定时器
  clearTimeout(scrollTimer);
  
  // 添加新的定时器，处理滚动停止时的行为
  scrollTimer = setTimeout(() => {
    if (currentScrollTop <= 10) {
      header.classList.remove('scroll-down');
      header.classList.add('scroll-up');
    }
  }, 150);
});

// 平滑滚动到锚点
scrollLinks.forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    
    // 检查是否是页内链接（带有#的链接）
    if (href.includes('#') && !href.startsWith('http')) {
      // 如果链接格式是 "index.html#section"，而当前页面就是 index.html，则阻止默认行为
      // 或者如果链接就是纯锚点 "#section"，也阻止默认行为
      if ((href.includes('index.html#') && window.location.pathname.endsWith('index.html')) || 
          href.startsWith('#')) {
        e.preventDefault();
        
        // 关闭移动端菜单
        if (navMenu.classList.contains('show')) {
          navMenu.classList.remove('show');
          hamburger.classList.remove('active');
          header.classList.remove('mobile-menu-open');
        }
        
        // 提取锚点ID
        const targetId = href.includes('#') ? '#' + href.split('#')[1] : href;
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const headerHeight = header.offsetHeight;
          
          window.scrollTo({
            top: targetSection.offsetTop - headerHeight,
            behavior: 'smooth'
          });
        }
      }
    } else {
      // 对于非锚点链接（如"index.html"），不阻止默认行为，正常跳转
      // 仅关闭移动端菜单
      if (navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
        hamburger.classList.remove('active');
        header.classList.remove('mobile-menu-open');
      }
    }
  });
});

// 切换菜单显示/隐藏
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('show');
  header.classList.toggle('mobile-menu-open');
  
  // 当菜单打开时，确保导航栏可见
  if (hamburger.classList.contains('active')) {
    header.classList.remove('scroll-down');
  }
});

// 处理联系表单提交
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 显示加载状态
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = '发送中...';
    submitButton.disabled = true;

    // 准备邮件参数
    const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        to_name: '邓正文', // 你的名字
    };

    // 发送邮件
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            // 发送成功
            alert('留言已发送成功！');
            document.getElementById('contactForm').reset();
        }, function(error) {
            // 发送失败
            alert('发送失败，请稍后重试。');
            console.error('发送失败:', error);
        })
        .finally(function() {
            // 恢复按钮状态
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
});

// 添加页面加载动画
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// 添加滚动显示动画
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.animate-on-scroll');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementPosition < windowHeight - 100) {
      element.classList.add('animated');
    }
  });
};

// 添加动画类到各个部分
document.querySelectorAll('section').forEach(section => {
  section.classList.add('animate-on-scroll');
});

// 监听滚动事件
window.addEventListener('scroll', animateOnScroll);

// 初始触发一次
animateOnScroll(); 