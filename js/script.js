document.addEventListener('DOMContentLoaded', () => {

    // 1. Scene Reveal on Scroll
    // We observe the .chapter elements. When they enter the viewport, we fade them in.
    const chapters = document.querySelectorAll('.chapter');

    const observerOptions = {
        root: null, // viewport
        threshold: 0.15, // Trigger when 15% is visible
        rootMargin: "0px"
    };

    const sceneObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    chapters.forEach(chapter => {
        sceneObserver.observe(chapter);
    });

    // 2. Optional: Parallax or other effects can be added here
    // For "The Boat" style, simple CSS transitions often suffice, 
    // but we can add subtle scroll triggers if needed later.

});
