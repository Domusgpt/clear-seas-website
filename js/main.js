import "../css/styles.css";
import VisualEffects from "./visual-effects";
import { services } from "./services-config";

function createServiceCard(service) {
    const card = document.createElement("div");
    card.className = "service-card fade-in";
    
    card.innerHTML = `
        <div class="service-icon">${service.icon}</div>
        <h3>${service.title}</h3>
        <p>${service.description}</p>
        <ul class="service-highlights">
            ${service.highlights.map(highlight => `<li>${highlight}</li>`).join("")}
        </ul>
    `;
    
    return card;
}

document.addEventListener("DOMContentLoaded", () => {
    // Initialize visual effects
    window.visualEffects = new VisualEffects();

    // Render service cards
    const serviceGrid = document.querySelector(".service-grid");
    if (serviceGrid) {
        services.forEach(service => {
            serviceGrid.appendChild(createServiceCard(service));
        });
    }

    // Initialize scroll animations
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
});
