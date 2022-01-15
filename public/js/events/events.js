const setCardSize = ()=>{
    const height = window.innerHeight;
    const width = window.innerWidth;
    document.querySelectorAll(".past-events-list-item").forEach((item)=>{
        if((height/width)<0.6) item.style.width = '20vw';
        else if((height/width)<0.8) item.style.width = '30vw';
        else if((height/width)<1.6) item.style.width = '40vw';
        else item.style.width = '80vw';
        
    })    
};
window.onload = setCardSize; 
window.onresize = setCardSize;



//FILTERS
const activeTagsList =  document.querySelector('.active-tags');

let activeTags = [];
document.querySelector('main select').addEventListener('change', (e)=>{
        if(!activeTags.some(aTag => aTag == e.target.value)) addActiveTag(e.target.value);
        e.target.value = "";

});

const addActiveTag = (tag)=>{
    activeTags.push(tag);
    const tagItem = document.createElement('li');
    tagItem.innerHTML = `${tag} <span>X</span>`
    tagItem.addEventListener('click', (e)=>{
        activeTags.splice(activeTags.indexOf(tag), 1);
        e.target.remove();
    });
    
    activeTagsList.appendChild(tagItem);
}