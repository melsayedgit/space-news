window.addEventListener("scroll", function () {
  const layers = document.querySelectorAll(".parallax-layer");
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  layers.forEach((layer) => {
    const depth = layer.getAttribute("data-depth") || 0;
    layer.style.transform = `translateY(${scrollTop * depth}px)`;
  });
});
