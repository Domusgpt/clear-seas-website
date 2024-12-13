class VisualEffects {
    constructor() {
        this.initializeThreeJS();
        this.setupCursorEffects();
        this.setupVideoInteraction();
        this.setupGlitchEffects();
    }

    initializeThreeJS() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.querySelector(".background-effects").appendChild(this.renderer.domElement);
        
        this.setupParticleSystem();
        this.animate();
    }

    setupParticleSystem() {
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        const colors = [];

        for (let i = 0; i < 5000; i++) {
            vertices.push(
                Math.random() * 2000 - 1000,
                Math.random() * 2000 - 1000,
                Math.random() * 2000 - 1000
            );
            colors.push(0, 1, 1);
        }

        geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
        this.camera.position.z = 1000;
    }

    setupVideoInteraction() {
        const videoWrapper = document.querySelector(".video-wrapper");
        if (!videoWrapper) return;

        videoWrapper.addEventListener("click", () => {
            const videoId = videoWrapper.dataset.videoId;
            const iframe = document.createElement("iframe");
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            iframe.width = "100%";
            iframe.height = "100%";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;

            const placeholder = videoWrapper.querySelector(".video-placeholder");
            placeholder.replaceWith(iframe);
        });
    }

    setupCursorEffects() {
        const cursor = document.querySelector(".cursor-effect");
        const trail = document.querySelector(".cursor-trail");
        
        document.addEventListener("mousemove", (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1
            });

            gsap.to(trail, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3
            });
        });
    }

    setupGlitchEffects() {
        const glitchTexts = document.querySelectorAll(".glitch-text");
        
        glitchTexts.forEach(text => {
            setInterval(() => {
                if (Math.random() > 0.95) {
                    text.style.textShadow = `
                        2px 2px var(--primary-color),
                        -2px -2px var(--secondary-color)
                    `;
                    
                    setTimeout(() => {
                        text.style.textShadow = "none";
                    }, 100);
                }
            }, 2000);
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        if (this.particles) {
            this.particles.rotation.x += 0.0001;
            this.particles.rotation.y += 0.0001;
        }

        this.renderer.render(this.scene, this.camera);
    }
}

export default VisualEffects;
