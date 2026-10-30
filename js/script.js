// Mobile navigation toggle + scroll fade-in animations
(function () {
    var toggle = document.querySelector('.nav-toggle');
    var links = document.querySelector('.nav-links');

    if (toggle && links) {
        toggle.addEventListener('click', function () {
            var open = links.classList.toggle('open');
            toggle.classList.toggle('open', open);
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            document.body.classList.toggle('menu-open', open);
        });

        links.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function () {
                links.classList.remove('open');
                toggle.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('menu-open');
            });
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 992) {
                links.classList.remove('open');
                toggle.classList.remove('open');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // Fade-in on scroll
    var els = document.querySelectorAll('.fade-up, .fade-left, .fade-right');
    if ('IntersectionObserver' in window) {
        document.documentElement.classList.add('js');
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.1 });
        els.forEach(function (el) { io.observe(el); });
    }
})();
