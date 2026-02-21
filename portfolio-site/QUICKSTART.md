# 🚀 Quick Start Guide

Follow these simple steps to customize your portfolio with your information.

## Step 1: Update Your Personal Information

Edit `src/index.html` and find these sections:

### Navigation Logo
```html
<div class="logo">
    <a href="#home">YourName</a>  ← Change this
</div>
```

### Hero Section
```html
<h1 class="hero-title">Hi, I'm <span class="gradient-text">Your Name</span></h1>
<p class="hero-subtitle">Full Stack Developer | Problem Solver | Creative Thinker</p>
<p class="hero-description">
    Your bio here...
</p>
```

### Footer
```html
<p>&copy; 2024 Your Name. All rights reserved.</p>
```

## Step 2: Update About Section

```html
<div class="about-text">
    <p>I'm a passionate developer with X years of experience...</p>
    <p>When I'm not coding, you can find me [Your hobbies/interests].</p>
</div>

<div class="stat">
    <h3>5+</h3>  ← Update numbers
    <p>Years Experience</p>
</div>
```

## Step 3: Add Your Projects

For each project, update:
- **Project Title**: `<h3 class="project-title">Your Project Name</h3>`
- **Description**: `<p class="project-description">Your description</p>`
- **Technologies**: Replace React, Node.js, MongoDB with your tech stack
- **Links**: Update GitHub and live demo URLs

Example:
```html
<h3 class="project-title">AI Chat Application</h3>
<p class="project-description">
    Built a real-time chat app using AI integration
</p>
<div class="project-tags">
    <span class="tag">React</span>
    <span class="tag">Node.js</span>
    <span class="tag">MongoDB</span>
</div>
<div class="project-links">
    <a href="https://your-project.com" class="link-btn">
        <i class="fas fa-external-link-alt"></i> Live
    </a>
    <a href="https://github.com/yourname/project" class="link-btn">
        <i class="fas fa-github"></i> Code
    </a>
</div>
```

## Step 4: Update Your Skills

Replace skill items in each category:

```html
<div class="skill-category">
    <h3>Frontend</h3>
    <div class="skill-list">
        <span class="skill-item">HTML5</span>
        <span class="skill-item">CSS3</span>
        <span class="skill-item">JavaScript</span>
        <!-- Add your skills -->
    </div>
</div>
```

## Step 5: Update Your Experience

Replace job information:

```html
<div class="timeline-item">
    <div class="timeline-dot"></div>
    <div class="timeline-content">
        <h3 class="job-title">Your Job Title</h3>
        <p class="company-name">Company Name</p>
        <p class="job-duration">2021 - 2023</p>
        <p class="job-description">
            Your job responsibilities and achievements
        </p>
    </div>
</div>
```

## Step 6: Update Social Links

```html
<div class="social-links">
    <a href="https://github.com/YOUR-USERNAME" target="_blank" class="social-link">
        <i class="fab fa-github"></i>
    </a>
    <a href="https://linkedin.com/in/YOUR-PROFILE" target="_blank" class="social-link">
        <i class="fab fa-linkedin"></i>
    </a>
    <a href="https://twitter.com/YOUR-HANDLE" target="_blank" class="social-link">
        <i class="fab fa-twitter"></i>
    </a>
    <a href="mailto:your.email@example.com" class="social-link">
        <i class="fas fa-envelope"></i>
    </a>
</div>
```

## Step 7: Test Locally

```bash
# Install dependencies (optional)
npm install

# Start local server
npm start

# Open http://localhost:8000 in your browser
```

## Step 8: Customize Colors (Optional)

Edit `assets/css/styles.css`:

```css
:root {
    --primary-color: #6366f1;      /* Change to your brand color */
    --secondary-color: #8b5cf6;    /* Secondary accent */
    --accent-color: #ec4899;       /* Additional accent */
    /* ... rest of colors ... */
}
```

## Step 9: Add Your Photo (Optional)

Replace the avatar placeholder with your image:

1. Add your photo to `assets/images/` folder
2. Replace this in `src/index.html`:
```html
<div class="avatar-placeholder">
    <i class="fas fa-code"></i>
</div>
```

With:
```html
<img src="../assets/images/your-photo.jpg" alt="Your Name" class="avatar">
```

Add this CSS to `assets/css/styles.css`:
```css
.avatar {
    width: 300px;
    height: 300px;
    border-radius: 20px;
    object-fit: cover;
    box-shadow: var(--shadow-lg);
}
```

## Step 10: Deploy Your Portfolio

### Option 1: Vercel (Recommended - Free)
```bash
npm install -g vercel
vercel
```

### Option 2: Netlify (Free)
- Drag and drop your `src` folder to [Netlify](https://netlify.com)

### Option 3: GitHub Pages (Free)
1. Push to GitHub
2. Enable GitHub Pages in repository settings
3. Set source to `main` branch, `/ (root)` folder

### Option 4: Traditional Hosting
- Upload via FTP to your hosting provider

## Commonly Updated Sections

### Change Your Name (4 places)
1. Navigation logo
2. Hero title
3. Footer copyright
4. SEO meta title

### Add Projects (3 fields each)
1. Title
2. Description
3. Technologies
4. GitHub link
5. Live demo link

### Update Skills
Just add/remove `<span class="skill-item">Skill Name</span>`

### Add Work Experience
Copy a timeline item and update all fields

## Tips for Success

✅ **Do:**
- Use clear, professional language
- Add real project links
- Keep descriptions concise
- Use proper grammar
- Test on mobile devices

❌ **Don't:**
- Leave placeholder text
- Use placeholder images
- Add too many projects (3-5 is ideal)
- Break HTML structure
- Forget to test links

## Need Help?

- Check the full README.md for detailed information
- Review the HTML comments in index.html
- Test in browser DevTools (F12)
- Check browser console for errors

## Next Steps

1. ✅ Customize all content
2. ✅ Test locally (npm start)
3. ✅ Check on mobile
4. ✅ Deploy to production
5. ✅ Share your portfolio!

---

**Ready to launch? Follow the 10 steps above and you'll have an amazing portfolio! 🎉**
