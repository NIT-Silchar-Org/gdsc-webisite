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