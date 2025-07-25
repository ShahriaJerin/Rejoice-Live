function LocoScroll() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}
LocoScroll()

function CursorEffect() {
    var page1Content = document.querySelector(".page1Content")
    var cursor = document.querySelector(".cursor")

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    page1Content.addEventListener("mousemove", function (dets) {
        gsap.to(cursor, {
            x: dets.x,
            y: dets.y,
            duration: 1,
            ease: "back.out"
        })
    })

    page1Content.addEventListener("mouseenter", function (dets) {
        gsap.to(cursor, {
            scale: 1,
            opacity: 1,
        })
    })

    page1Content.addEventListener("mouseleave", function (dets) {
        gsap.to(cursor, {
            scale: 0,
            opacity: 0,
        })
    })
}
CursorEffect()

function Page2Animation() {
    var para = document.querySelector(".elem2 p")

    gsap.from(para, {
        y: 150,
        duration: 1.5,
        opacity: 0,
        scrollTrigger: {
            trigger: ".page2",
            scroller: ".main",
            start: "top 47%",
            end: "top 46%",
            scrub: 2,
        }
    })
}
Page2Animation()

function SwiperPage() {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 50,  // More space between slides for smoother transitions
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: true,
        },
        speed: 800,  // Transition duration
        easing: 'ease-in-out',  // Smooth easing
    });

}
SwiperPage()

function LoaderFinal() {
    var tl = gsap.timeline()

    tl.from(".loader h3", {
        x: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
    })

    tl.to(".loader h3", {
        x: -40,
        opacity: 0,
        duration: .5,
        stagger: -0.1,
    })

    tl.to(".loader", {
        opacity: 0,
        duration: 0.5,
    })

    // Hide the loader after the animation is complete
    tl.set(".loader", { display: "none" });

    tl.from(".page1Content h1 span", {
        y: 100,
        opacity: 0,
        stagger: .2,
        duration: 0.5,
    });

    // Ensure cursor visibility and position is reset after loader
    tl.call(function () {
        document.querySelector(".cursor").style.display = "flex";  // Ensure cursor is visible
    });

    tl.call(function () {
        // Call your CursorEffect function again to reset after loader
        CursorEffect();
    });
}
LoaderFinal();

