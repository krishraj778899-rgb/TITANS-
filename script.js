document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            navLinks.classList.toggle("show");

            if (navLinks.classList.contains("show")) {
                menuToggle.textContent = "✕";
                menuToggle.setAttribute(
                    "aria-label",
                    "Close Menu"
                );
            } else {
                menuToggle.textContent = "☰";
                menuToggle.setAttribute(
                    "aria-label",
                    "Open Menu"
                );
            }

        });


        /* Close menu after clicking a link */

        const mobileLinks =
            navLinks.querySelectorAll("a");

        mobileLinks.forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("show");

                menuToggle.textContent = "☰";

                menuToggle.setAttribute(
                    "aria-label",
                    "Open Menu"
                );

            });

        });

    }



    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navItems =
        document.querySelectorAll(".nav-links a");


    function updateActiveNav() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 180;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                    sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navItems.forEach(link => {

            link.classList.remove("active");

            const target =
                link.getAttribute("href");

            if (
                target ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNav
    );

    updateActiveNav();



    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    const navbar =
        document.querySelector(".navbar");


    function navbarEffect() {

        if (!navbar) return;


        if (window.scrollY > 50) {

            navbar.style.background =
                "rgba(5, 5, 9, 0.92)";

            navbar.style.borderBottomColor =
                "rgba(167, 139, 250, 0.16)";

            navbar.style.boxShadow =
                "0 10px 40px rgba(0,0,0,0.18)";

        } else {

            navbar.style.background =
                "rgba(8, 8, 12, 0.72)";

            navbar.style.borderBottomColor =
                "rgba(255,255,255,0.09)";

            navbar.style.boxShadow =
                "none";

        }

    }


    window.addEventListener(
        "scroll",
        navbarEffect
    );

    navbarEffect();



    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section-heading, " +
            ".about-main, " +
            ".stat-box, " +
            ".team-card, " +
            ".skill-box, " +
            ".project-card, " +
            ".timeline-item, " +
            ".contact-content"
        );


    revealElements.forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(35px)";

        element.style.transition =
            "opacity 0.75s ease, " +
            "transform 0.75s ease";

    });


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });



    /* =====================================================
       TEAM CARD STAGGER ANIMATION
    ===================================================== */

    const teamCards =
        document.querySelectorAll(
            ".team-card"
        );


    teamCards.forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 100}ms`;

    });



    /* =====================================================
       SKILL CARD STAGGER
    ===================================================== */

    const skillBoxes =
        document.querySelectorAll(
            ".skill-box"
        );


    skillBoxes.forEach((box, index) => {

        box.style.transitionDelay =
            `${index * 80}ms`;

    });



    /* =====================================================
       PROJECT CARD STAGGER
    ===================================================== */

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    projectCards.forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 100}ms`;

    });



    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ===================================================== */

    const allAnchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    allAnchorLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) return;


                event.preventDefault();


                const navbarHeight =
                    navbar
                        ? navbar.offsetHeight
                        : 80;


                const targetPosition =
                    target.getBoundingClientRect()
                        .top
                    +
                    window.scrollY
                    -
                    navbarHeight
                    -
                    10;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    });



    /* =====================================================
       HERO CARD 3D EFFECT
    ===================================================== */

    const heroRight =
        document.querySelector(
            ".hero-right"
        );


    const heroCard =
        document.querySelector(
            ".hero-card"
        );


    function enableHeroParallax() {

        if (
            !heroRight ||
            !heroCard ||
            window.innerWidth <= 800
        ) {

            return;

        }


        heroRight.addEventListener(
            "mousemove",
            heroMouseMove
        );


        heroRight.addEventListener(
            "mouseleave",
            heroMouseLeave
        );

    }


    function heroMouseMove(event) {

        const rect =
            heroRight.getBoundingClientRect();


        const x =
            event.clientX - rect.left;


        const y =
            event.clientY - rect.top;


        const centerX =
            rect.width / 2;


        const centerY =
            rect.height / 2;


        const rotateX =
            ((y - centerY) / centerY) * -4;


        const rotateY =
            ((x - centerX) / centerX) * 4;


        heroCard.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-5px)`;

    }


    function heroMouseLeave() {

        if (!heroCard) return;

        heroCard.style.transform = "";

    }


    enableHeroParallax();



    /* =====================================================
       PROJECT VISUAL 3D EFFECT
    ===================================================== */

    const visualWindow =
        document.querySelector(
            ".visual-window"
        );


    if (
        visualWindow &&
        window.innerWidth > 800
    ) {

        visualWindow.addEventListener(
            "mousemove",
            event => {

                const rect =
                    visualWindow.getBoundingClientRect();


                const x =
                    event.clientX - rect.left;


                const y =
                    event.clientY - rect.top;


                const rotateY =
                    ((x / rect.width) - 0.5) * 8;


                const rotateX =
                    ((y / rect.height) - 0.5) * -8;


                visualWindow.style.transform =
                    `perspective(700px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            }
        );


        visualWindow.addEventListener(
            "mouseleave",
            () => {

                visualWindow.style.transform =
                    "perspective(700px) " +
                    "rotateY(-8deg) " +
                    "rotateX(3deg)";

            }
        );

    }



    /* =====================================================
       TEAM PHOTO HOVER EFFECT
    ===================================================== */

    const teamPhotos =
        document.querySelectorAll(
            ".team-photo"
        );


    teamPhotos.forEach(photo => {

        photo.addEventListener(
            "mousemove",
            event => {

                if (window.innerWidth <= 800) {
                    return;
                }


                const rect =
                    photo.getBoundingClientRect();


                const x =
                    event.clientX - rect.left;


                const y =
                    event.clientY - rect.top;


                const rotateX =
                    ((y / rect.height) - 0.5) * -8;


                const rotateY =
                    ((x / rect.width) - 0.5) * 8;


                photo.style.transform =
                    `perspective(500px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     scale(1.04)`;

            }
        );


        photo.addEventListener(
            "mouseleave",
            () => {

                photo.style.transform = "";

            }
        );

    });



    /* =====================================================
       BUTTON CLICK EFFECT
    ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".main-button, " +
            ".outline-button, " +
            ".project-actions a, " +
            ".nav-talk"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                button.style.transform =
                    "scale(0.97)";


                setTimeout(() => {

                    button.style.transform = "";

                }, 120);

            }
        );

    });



    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                if (navLinks) {

                    navLinks.classList.remove(
                        "show"
                    );

                }


                if (menuToggle) {

                    menuToggle.textContent =
                        "☰";

                    menuToggle.setAttribute(
                        "aria-label",
                        "Open Menu"
                    );

                }

            }

        }
    );



    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 800 &&
                navLinks
            ) {

                navLinks.classList.remove(
                    "show"
                );

                if (menuToggle) {

                    menuToggle.textContent =
                        "☰";

                }

            }

        }
    );



    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const currentYear =
        document.getElementById(
            "currentYear"
        );


    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }



    /* =====================================================
       HERO FLOATING EFFECT
    ===================================================== */

    const floatingCards =
        document.querySelectorAll(
            ".floating-card"
        );


    floatingCards.forEach((card, index) => {

        card.style.animationDelay =
            `${index * -1.5}s`;

    });



    /* =====================================================
       IMAGE ERROR HANDLING
    ===================================================== */

    const teamImages =
        document.querySelectorAll(
            ".team-photo img"
        );


    teamImages.forEach(img => {

        img.addEventListener(
            "error",
            () => {

                img.style.display = "none";

                const parent =
                    img.parentElement;


                if (parent) {

                    parent.innerHTML =
                        `<span style="
                            width:100%;
                            height:100%;
                            display:flex;
                            align-items:center;
                            justify-content:center;
                            font-family:'Space Grotesk',sans-serif;
                            font-size:28px;
                            font-weight:800;
                            color:#ffffff;
                        ">
                        ${getInitials(img.alt)}
                        </span>`;

                }

            }
        );

    });


    function getInitials(name) {

        if (!name) return "T";


        const words =
            name.trim().split(" ");


        if (words.length === 1) {

            return words[0]
                .substring(0, 2)
                .toUpperCase();

        }


        return (
            words[0][0] +
            words[words.length - 1][0]
        ).toUpperCase();

    }



    /* =====================================================
       CONSOLE
    ===================================================== */

    console.log(
        "%c TITANS ",
        "background:#8b5cf6;" +
        "color:white;" +
        "padding:8px 14px;" +
        "border-radius:7px;" +
        "font-size:14px;" +
        "font-weight:bold;"
    );


    console.log(
        "%c Elite Hackathon Team 🚀",
        "color:#a78bfa;" +
        "font-size:13px;" +
        "font-weight:bold;"
    );


    console.log(
        "Welcome to the TITANS portfolio."
    );

});