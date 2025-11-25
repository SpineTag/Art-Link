const items = document.querySelectorAll(".item img");
const viewer = document.querySelector(".viewer");
const viewerImg = document.getElementById("viewer-img");
const closeBtn = document.querySelector(".close");

items.forEach(img => {
  img.addEventListener("click", () => {
    viewerImg.src = img.src;
    viewer.classList.add("show");
  });
});

closeBtn.addEventListener("click", () => {
  viewer.classList.remove("show");
});
