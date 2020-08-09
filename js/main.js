Splitting({ target: $("h1") });

paceOptions = { ajax: true };

function animatePreloader() {
    const preloader = new TimelineMax();
    preloader.fromTo(
        "#overlay-1",
        2,
        { top: 0, ease: Power2.easeInOut },
        { top: "-110%", ease: Expo.easeInOut },
        "+=1"
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

    let controller = new ScrollMagic.Controller();
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

        let scene = new ScrollMagic.Scene({
            triggerElement: this,
            reverse: false,
        })
            .addIndicators()
            .setTween(animateIn)
            .addTo(controller);
    });
});
