# Professional Portfolio Website

A modern, responsive, and feature-rich portfolio website built with vanilla HTML, CSS, and JavaScript. No frameworks required!

## 🚀 Features

- **Fully Responsive Design** - Works perfectly on all devices (mobile, tablet, desktop)
- **Modern Aesthetics** - Beautiful gradient colors and smooth animations
- **Fast Performance** - Optimized for speed with minimal dependencies
- **SEO Friendly** - Proper semantic HTML and meta tags
- **Smooth Scrolling** - Elegant scroll effects and transitions
- **Contact Form** - Integrated contact form with validation
- **Mobile Navigation** - Touch-friendly hamburger menu
- **Social Links** - Easy integration with social media profiles
- **Accessibility** - WCAG compliant with proper ARIA labels
- **Dark Mode Ready** - Foundation for dark mode implementation

## 📁 Project Structure

```
portfolio-site/
├── src/
│   └── index.html           # Main HTML file
├── assets/
│   ├── css/
│   │   └── styles.css       # All styles (no external frameworks)
│   ├── js/
│   │   └── script.js        # JavaScript functionality
│   └── images/              # Image assets (add your images here)
├── package.json             # Project metadata
└── README.md               # This file
```

## 🎨 Customization Guide

### 1. Personal Information

Edit `src/index.html` and replace these placeholders:

```html
<!-- Navigation Logo -->
<div class="logo">
    <a href="#home">YourName</a>  <!-- Change to your name -->
</div>

<!-- Hero Section -->
<h1 class="hero-title">Hi, I'm <span class="gradient-text">Your Name</span></h1>
<p class="hero-subtitle">Full Stack Developer | Problem Solver | Creative Thinker</p>
<p class="hero-description">Your bio here...</p>

<!-- Footer -->
<p>&copy; 2024 Your Name. All rights reserved.</p>
```

### 2. Add Your Projects

Replace the placeholder projects in the Projects section:

```html
<article class="project-card">
    <div class="project-image">
        <div class="image-placeholder">
            <i class="fas fa-laptop-code"></i>
        </div>
    </div>
    <div class="project-content">
        <h3 class="project-title">Your Project Name</h3>
        <p class="project-description">Project description here</p>
        <div class="project-tags">
            <span class="tag">Technology1</span>
            <span class="tag">Technology2</span>
        </div>
        <div class="project-links">
            <a href="https://your-live-project.com" class="link-btn">
                <i class="fas fa-external-link-alt"></i> Live
            </a>
            <a href="https://github.com/yourname/project" class="link-btn">
                <i class="fas fa-github"></i> Code
            </a>
        </div>
    </div>
</article>
```

### 3. Update Your Skills

Find the Skills section and update:

```html
<div class="skill-category">
    <h3>Frontend</h3>
    <div class="skill-list">
        <span class="skill-item">Your Skill 1</span>
        <span class="skill-item">Your Skill 2</span>
        <!-- Add more skills -->
    </div>
</div>
```

### 4. Add Your Work Experience

Update the Experience section with your jobs:

```html
<div class="timeline-item">
    <div class="timeline-dot"></div>
    <div class="timeline-content">
        <h3 class="job-title">Your Job Title</h3>
        <p class="company-name">Company Name</p>
        <p class="job-duration">Start Year - End Year</p>
        <p class="job-description">Your job description</p>
    </div>
</div>
```

### 5. Update Social Links

Replace social media URLs in the Contact section:

```html
<a href="https://github.com/yourname" target="_blank" class="social-link">
    <i class="fab fa-github"></i>
</a>
<a href="https://linkedin.com/in/yourname" target="_blank" class="social-link">
    <i class="fab fa-linkedin"></i>
</a>
<a href="https://twitter.com/yourname" target="_blank" class="social-link">
    <i class="fab fa-twitter"></i>
</a>
<a href="mailto:your.email@example.com" class="social-link">
    <i class="fas fa-envelope"></i>
</a>
```

### 6. Update Contact Form Email

You'll need a backend service for the contact form. Popular options:
- [Formspree](https://formspree.io/)
- [EmailJS](https://www.emailjs.com/)
- [Basin](https://usebasin.com/)

Or add your backend endpoint in `script.js`:

```javascript
// Replace the form submission section with your backend call
fetch('/your-backend-endpoint', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
})
```

## 🎨 Color Customization

Edit the CSS variables in `assets/css/styles.css`:

```css
:root {
    --primary-color: #6366f1;      /* Main brand color */
    --secondary-color: #8b5cf6;    /* Secondary accent */
    --accent-color: #ec4899;       /* Additional accent */
    --dark-bg: #0f172a;            /* Dark background */
    --light-bg: #f8fafc;           /* Light background */
    --text-dark: #1e293b;          /* Dark text */
    --text-light: #64748b;         /* Light text */
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js (optional, only for local server)
- Modern web browser

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio-site
```

2. Install dependencies (optional):
```bash
npm install
```

3. Start local server:
```bash
npm start
# or
npx http-server src -p 8000
```

4. Open your browser and navigate to `http://localhost:8000`

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🎯 Performance Tips

1. Optimize your images before uploading
2. Use web-friendly formats (WebP, JPEG, PNG)
3. Minify CSS and JavaScript for production
4. Enable gzip compression on your server
5. Use a CDN for faster content delivery

## 📦 Deployment Options

### Vercel (Recommended - Free)
```bash
npm install -g vercel
vercel
```

### Netlify (Free)
Drag and drop your `src` folder to Netlify

### GitHub Pages (Free)
Push your code to GitHub and enable GitHub Pages in settings

### Traditional Hosting
Upload files via FTP to your hosting provider

## 🔐 Security Considerations

- Never commit sensitive information (API keys, passwords)
- Use environment variables for configuration
- Validate form inputs on the backend
- Use HTTPS for deployment
- Keep dependencies updated

## 📧 Contact Form Integration

To make the contact form functional, integrate with:

1. **Formspree** (Simplest):
   - Visit [formspree.io](https://formspree.io/)
   - Create a form
   - Update the form `action` attribute

2. **Backend Service**:
   - Create an API endpoint
   - Update the form submission handler in `script.js`

## 🎓 Learning Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)
- [JavaScript Info](https://javascript.info/)
- [Web Accessibility](https://www.w3.org/WAI/)

## 📝 License

This project is open source and available under the MIT License.

## 🙋 Support

If you have questions or issues:
1. Check the FAQ section
2. Review the customization guide above
3. Check browser console for errors
4. Open an issue on GitHub

## 🚀 Next Steps

1. **Customize Content**: Update all placeholder text with your information
2. **Add Your Image**: Replace avatar placeholder with your photo
3. **Update Colors**: Modify CSS variables to match your brand
4. **Test Responsiveness**: Check on different devices
5. **Deploy**: Choose a hosting platform and go live
6. **Optimize**: Run your site through Lighthouse for improvements

---

**Built with ❤️ | Made with vanilla HTML, CSS & JavaScript**
