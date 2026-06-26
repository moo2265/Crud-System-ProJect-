// Main Timeline
 
const tl = gsap.timeline();

// Navbar Animation
tl.from(".navbar", {
  y: -100,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
})

  // Title Animation
  .from(".title", {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: "back.out(1.7)",
  })

  // Form Inputs Animation
  .from(".custom-input", {
    x: -50,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out",
  })

  // Add Button Animation
  .to(
    ".custom-btn",
    {
      opacity: 1,
      y: 0,
      rotation: 360,
      duration: 2,
      ease: "power2.out",
    } 
   
  )

  // Search Box Animation
  .from(".search-box", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  })

  // Table Rows Animation
  .to("tbody tr", {
    x:0 ,
    opacity: 1,
    stagger: 0.15,
    duration: 1,
    ease: "power2.out",
  });

// Floating Background Shape 1
gsap.to(".shape1", {
  x: 50,
  y: 30,
  duration: 1,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
});

// Floating Background Shape 2
gsap.to(".shape2", {
  x: -50,
  y: -30,
  duration: 1,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
});

// Floating Card Effect
gsap.to(".crud-card", {
  y: -10,
  duration: 2,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut",
});

// Title Continuous Glow Effect
gsap.to(".title h1", {
  scale: 1.03,
  duration: 1,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
});

 
gsap.fromTo(
  ".product-img",
  {
    scale: 0,
    opacity: 0,
  },
  {
    scale: 1,
    opacity: 1,
    duration: 1,
    stagger: 0.2,
    delay: 2,
  }
);
// gsap.set(".custom-btn", {
//   scale: 1,
// });
