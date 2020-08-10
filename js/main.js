function pointerPos(elem, e) {
    let mousePosX = e.clientX;
    let mousePosY = e.clientY;

    $(elem).css({
        left: mousePosX - elem.getBoundingClientRect().width * 0.5 + "px",
        top: mousePosY - elem.getBoundingClientRect().height * 0.5 + "px",
    });
}

function mouseMove(elem) {
    $(document).on("mousemove", function (e) {
        pointerPos(elem, e);
    });
}

function trailPointer() {
    let pointer = $(".pointer");
    pointer.each(function (index, elem) {
        mouseMove(elem);
    });
}

function headerAnimations() {
    const header = new TimelineMax();
    header

        .fromTo(
            ".logo",
            1,
            { x: -100, autoAlpha: 0 },
            { x: 0, autoAlpha: 1 },
            "+=2.5"
        )
        .staggerFromTo(
            ".menu li",
            0.5,
            { autoAlpha: 0, y: 30 },
            { autoAlpha: 1, y: 0 },
            0.03,
            "-=0.5"
        )
        .staggerFromTo(
            ".hero-title .char",
            0.3,
            { y: 20, opacity: 0, scale: 0 },
            { y: 0, opacity: 1, scale: 1, ease: Back.easeOut.config(3) },
            0.05,
            "-=1"
        )
        .fromTo(
            ".hero-top p",
            1,
            { y: 20, autoAlpha: 0 },
            { y: 0, autoAlpha: 1 },
            "-=1"
        );
}

function projectsAnimation() {
    let controller = new ScrollMagic.Controller();
    $(".project").each(function () {
        let picOverlay = $(this).find(".overlay");
        let projectInfo = $(this).find(".project-info");
        let smallTitle = $(this).find(".small-title");
        let projectLink = $(this).find(".project-link");
        let animateIn = new TimelineMax();
        animateIn
            .fromTo(
                picOverlay,
                2,
                { skewX: 30, scale: 1.5 },
                {
                    skewX: 0,
                    xPercent: 100,
                    transformOrigin: "0% 100%",
                    ease: Power4.easeOut,
                }
            )
            .from(
                projectInfo,
                1,
                {
                    scaleY: 0,
                    transformOrigin: "bottom left",
                },
                "-=1.5"
            )
            .from(
                smallTitle,
                0.3,
                { autoAlpha: 0, y: 30, ease: Power4.easeOut },
                "-=1.2"
            )
            .from(
                projectLink,
                0.3,
                { autoAlpha: 0, y: 30, ease: Power4.easeOut },
                "-=0.9"
            );

        // Scroll Magic

        new ScrollMagic.Scene({
            triggerElement: this,
            reverse: false,
        })
            .addIndicators()
            .setTween(animateIn)
            .addTo(controller);
    });
}

trailPointer();
Splitting({ target: $("h1") });

function animatePreloader() {
    const preloader = new TimelineMax();
    preloader
        .fromTo(
            "#overlay-1 h1",
            1,
            { y: 0, autoAlpha: 1 },
            { y: -40, autoAlpha: 0 }
        )
        .fromTo(
            "#overlay-1",
            2,
            { top: 0, ease: Power2.easeInOut },
            { top: "-110%", ease: Expo.easeInOut }
        );
    preloader.fromTo(
        "#overlay-2",
        2,
        { top: 0, ease: Power2.easeInOut },
        { top: "-110%", ease: Expo.easeInOut },
        "-=1.5"
    );
}

Pace.on("done", function () {
    animatePreloader();
    headerAnimations();
    projectsAnimation();

    new hoverEffect({
        parent: document.querySelector(".distortion"),
        intensity1: 1,
        intensity2: 1,
        image1: "https://source.unsplash.com/user/erondu",
        image2: "https://source.unsplash.com/user/jeffs",
        displacementImage: "https://source.unsplash.com/random",
    });
});

let lastScrollTop = 0;
$(window).scroll(function () {
    let st = $(this).scrollTop();
    if (st > lastScrollTop) {
        $(".header-top").removeClass("fixed").addClass("hide");
    } else {
        $(".header-top").addClass("fixed").removeClass("hide");
    }
    lastScrollTop = st;
});
