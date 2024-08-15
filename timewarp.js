// Initialize Locomotive Scroll and ScrollTrigger
function initLocoScroll() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
}

initLocoScroll();

// GSAP animations
function animatePage(trigger, target, start = 'top top', end = 'bottom top', scrub = 1, pin = true) {
    gsap.timeline({
        scrollTrigger: {
            trigger: trigger,
            start: start,
            end: end,
            scrub: scrub,
            scroller: `#main`,
            pin: pin
        }
    }).to(target, {
        top: `-50%`
    });
}

// Apply animations
animatePage('#page6', '#page6 > h1');
animatePage('#newPage6', '#newPage6 > h1');
animatePage('#page21', '#page21>#troff', 'top top', 'bottom top', 1, true);
animatePage('#page22', '#page22>#snroff', 'top top', 'bottom top', 1, true);

// Canvas rendering functionality
function setupCanvas(pageId, imageUrls, endScroll = '600% top') {
    const canvas = document.querySelector(`${pageId} > canvas`);
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render();
    });

    const frameCount = imageUrls.length;
    const images = [];
    const imageSeq = { frame: 1 };

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = imageUrls[i];
        images.push(img);
    }

    gsap.to(imageSeq, {
        frame: frameCount - 1,
        snap: "frame",
        ease: `none`,
        scrollTrigger: {
            scrub: 0.15,
            trigger: pageId,
            start: `top top`,
            end: endScroll,
            scroller: `#main`,
        },
        onUpdate: render,
    });

    images[1].onload = render;

    function render() {
        scaleImage(images[imageSeq.frame], context);
    }

    function scaleImage(img, ctx) {
        var hRatio = canvas.width / img.width;
        var vRatio = canvas.height / img.height;
        var ratio = Math.min(hRatio, vRatio);
        var centerShift_x = (canvas.width - img.width * ratio) / 2;
        var centerShift_y = (canvas.height - img.height * ratio) / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    }

    ScrollTrigger.create({
        trigger: pageId,
        pin: true,
        scroller: `#main`,
        start: `top top`,
        end: endScroll,
    });
}

// Setup canvas rendering for different pages
setupCanvas("#page7", [
    "https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0000.jpg",
    "https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0001.jpg",
    // Add more URLs here...
]);

setupCanvas("#newPage7", [
    "https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0000.jpg",
    "https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0001.jpg",
    // Add more URLs here...
], '80% top');

// Setup canvas rendering for page20
setupCanvas("#page20", [
    "https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0000.jpg",
    "https://www.apple.com/105/media/us/apple-vision-pro/2023/7e268c13-eb22-493d-a860-f0637bacb569/anim/360/large/0001.jpg",
    // Add more URLs here...
], '600% top');
