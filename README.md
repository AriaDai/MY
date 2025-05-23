# Aria的个人网站

这是一个简洁、现代的个人网站模板，可用于展示个人作品集、技能和联系信息。

## 特点

- 响应式设计，适配各种屏幕尺寸
- 现代、简洁的UI设计
- 平滑滚动和动画效果
- 移动端友好的导航菜单
- 联系表单

## 项目结构

```
个人网站/
├── index.html          # 主HTML文件
├── css/
│   └── style.css       # 样式文件
├── js/
│   └── script.js       # JavaScript功能
└── img/                # 图片目录（当前使用CSS替代）
```

## 使用说明

1. 克隆或下载此仓库
2. 打开 `index.html` 文件预览网站
3. 根据个人需求修改内容：
   - 在 `index.html` 中更新个人信息、项目和技能
   - 在 `css/style.css` 中自定义颜色和样式
   - 如需添加真实图片，请将图片放在 `img/` 目录中

## 自定义指南

### 更改颜色主题

在 `css/style.css` 文件中编辑 `:root` 下的变量：

```css
:root {
  --primary-color: #3a86ff;    /* 主色调 */
  --secondary-color: #8338ec;  /* 次要色调 */
  --accent-color: #ff006e;     /* 强调色 */
  --dark-color: #14213d;       /* 深色 */
  --light-color: #f8f9fa;      /* 浅色 */
  --text-color: #333;          /* 文本颜色 */
}
```

### 添加新项目

在 `index.html` 中的项目部分添加新的项目卡片：

```html
<div class="project-card">
  <div class="img"></div>  <!-- 替换为 <img src="img/your-image.jpg" alt="项目描述"> -->
  <div class="project-info">
    <h3>项目名称</h3>
    <p>项目描述</p>
    <div class="project-links">
      <a href="#" class="btn">查看项目</a>
      <a href="#" class="btn">源代码</a>
    </div>
  </div>
</div>
```

## 未来计划

- 添加黑暗模式切换
- 整合博客功能
- 添加作品集图库
- 多语言支持

## 许可

MIT © Aria #   M Y  
 #   M Y  
 