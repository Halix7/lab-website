const scroll = new LocomotiveScroll({
    el: document.querySelector('body'),
    smooth: true
});
gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

const tl = gsap.timeline();
tl.from("#nav h1",{
  y:-400,
  opacity:0,
  duration:0.5,
 
 
});
tl.from("#nav-part1 li",{
  y:-400,
  opacity:0,
  duration:0.3,
  stagger:0.1
});
tl.from("#main #left #left1",{
  x:-300,
  opacity:0,
  duration:0.2
});
tl.from("#main #left #left2",{
  y:300,
  opacity:0,
  duration:0.2
});
tl.from("#right1,#right2,#right4,#left3",{
  y:-200,
  opacity:0,
  duration:0.3,
});
tl.from("#right3 img",{
  y:100,
  opacity:0,
  duration:0.5
});
tl.from("#right5",{
  x:1000,
  opacity:0
})
gsap.from("#main2 .video,#main2 #mid-lab",{
  x:-100,
  opacity:0,
  duration:1.3,
  opacity:0,
  scrollTrigger:{
    trigger:"#main2 .video",
    scroller:"body",
    starts:"top 60%",
    ends:"top bottom",
    // scrub:true
    // markers:true
  }
});
gsap.from("#main2 .imgbox ",{
  scale:0,
  opacity:0,
  duration:1,
  opacity:0,
  scrollTrigger:{
    trigger:"#main2 .video",
    scroller:"body",
    starts:"top center",
    ends:"top bottom",
    // markers:true
  }
});
gsap.from("#main2 .doc,#main2 #one , #main2 .under ",{
  y:-100,
  opacity:0,
  duration:1,
  opacity:0,
  scrollTrigger:{
    trigger:"#main2 .video",
    scroller:"body",
    starts:"top center",
    ends:"top center",
    // markers:true
  }
});

