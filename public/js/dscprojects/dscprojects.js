const projects = document.getElementsByClassName("project-card");
const projectCards = []; // 2D Array, each row is a card, each column is a section of card -> intro, info, members, tech-stack
for (let i = 0; i<projects.length; i++) {
  projectCards.push([]);
  
  let card = projects[i];
  let subCards = card.getElementsByClassName("sub-card");

  for(let j = 0; j<subCards.length; j++) {
    projectCards[i][j] = subCards[j];
  }
}

const activeIconHoverColors = ["#FAB9B9", "#FFF3CA", "#D0E699"];
function toggle(index, subCard) {

  let iconHover = projects[index].getElementsByClassName("icon-hover")[0];
  for(let i = 0; i<projectCards[index].length; i++) {

    if (i == subCard) {
      projectCards[index][i].style.zIndex = +1;
      projectCards[index][i].style.opacity = 1;
    } else {
      projectCards[index][i].style.zIndex = -1;
      projectCards[index][i].style.opacity = 0;
    }

    if (subCard == 0) {
      iconHover.style.display = "none";
    } else {
      iconHover.style.display = "block";
      iconHover.style.left = `${25 * (subCard - 1)}%`;
      iconHover.style.backgroundColor = activeIconHoverColors[subCard - 1];
    }

  }

}

const observer1 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting == true) {
      entry.target.classList.add("animate");
    } else {
      entry.target.classList.remove("animate");
    }
  });
});

[...projects].forEach((project) => {
  observer1.observe(project);
});