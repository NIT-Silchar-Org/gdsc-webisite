const cards = document.getElementsByClassName("project-card");

//TODO: Make them in 2D array
// Initialise Styles
for(let i = 0; i<cards.length; i++) {
  cards[i].getElementsByClassName("top")[0].style.display = "flex";
  cards[i].getElementsByClassName("mid")[0].style.display = "flex";
  cards[i].getElementsByClassName("go-back")[0].style.display = "none";
}


// Background Colors
const colors = ["#FFFFFF", "#FFE9E9", "#F1FCFF", "#FFFADD"];
const activeColor = "#FFF3CA"; // Active Icon Color



/**
 * toggle(n, m) takes in n as the card number, m as:
 * 0 -> Original View
 * 1 -> More Info
 * 2 -> Members
 * 3 -> Tech Stack
 */
function toggle(n, m) {
  const topList = cards[n].getElementsByClassName("top");
  const midList = cards[n].getElementsByClassName("mid");

  // Refresh Display Style
  for(let i = 0; i<topList.length; i++) {
    topList[i].style.display = "none";
    midList[i].style.display = "none";
  }

  
  // Information Display Related to Value of m
  topList[m].style.display = "flex";
  midList[m].style.display = "flex";

  // Background Color of Card respective to icon selected
  cards[n].style.backgroundColor = colors[m];
  

  // Changing Icon Colors
  const iconClicks = cards[n].getElementsByClassName("icon-click");
  for(let i = 0; i<iconClicks.length; i++) {
    if(i+1 == m)
      iconClicks[i].style.backgroundColor = activeColor;
    else
      iconClicks[i].style.backgroundColor = colors[m];
  }


  // Go Back Icon Display
  if(m == 0)
    cards[n].getElementsByClassName("go-back")[0].style.display = "none";
  else
    cards[n].getElementsByClassName("go-back")[0].style.display = "block";
}