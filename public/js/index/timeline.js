const left = document.querySelector(".navigation .go-left");
const right = document.querySelector(".navigation .go-right");
const timeline = document.getElementById("timeline-wrapper");

const scrollAmount = 500;

left.addEventListener('click', () => {
  timeline.scrollLeft -= scrollAmount;
})

right.addEventListener('click', () => {
  timeline.scrollLeft += scrollAmount;
})
