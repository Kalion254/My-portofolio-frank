// Page transition
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("a");
    const body = document.body;

    // Fade in page
    body.classList.add("page-enter");

    links.forEach(link => {
        const target = link.getAttribute("href");
        if (target && target.endsWith(".html")) {
            link.addEventListener("click", e => {
                e.preventDefault();
                body.classList.add("page-exit");
                setTimeout(() => {
                    window.location = target;
                }, 300);
            });
        }
    });

    // Theme toggle
    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
        const currentTheme = localStorage.getItem("theme");
        if (currentTheme === "light") document.body.classList.add("light-mode");

        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");
            const theme = document.body.classList.contains("light-mode") ? "light" : "dark";
            localStorage.setItem("theme", theme);
            themeToggle.textContent = theme === "light" ? "🌙" : "☀️";
        });

        themeToggle.textContent = document.body.classList.contains("light-mode") ? "🌙" : "☀️";
    }

    // Hero image parallax
    const heroBg = document.querySelector(".hero-bg");
    if (heroBg) {
        document.addEventListener("mousemove", e => {
            const x = (e.clientX / window.innerWidth - 0.5) * 30;
            const y = (e.clientY / window.innerHeight - 0.5) * 30;
            heroBg.style.transform = `scale(1.1) translate(${x}px, ${y}px)`;
        });
    }

    // Hero particles
    const canvas = document.getElementById('heroParticles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray = [];
        let w = canvas.width = window.innerWidth;
        let h = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            initParticles();
        });

        class Particle {
            constructor() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.color = 'rgba(56, 189, 248, 0.7)';
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > w) this.speedX *= -1;
                if (this.y < 0 || this.y > h) this.speedY *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        function initParticles() {
            particlesArray = [];
            for (let i = 0; i < 80; i++) {
                particlesArray.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, w, h);
            particlesArray.forEach(p => { p.update();
                p.draw(); });
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();
    }
});