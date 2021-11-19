let allBlogs;
let displayableBlogs;


fetch('http://localhost:8080/blog/allBlogData')
    .then(res=>{
        if(!res.ok) console.log('blogs load failure');
        return res.json();
    })
    .then(data=>{
        allBlogs=data;
        displayableBlogs = shuffle(data);
        updateBlogListBox(displayableBlogs);
    });



//SEARCH BLOGS
const searchFor = (searchText)=>{
    searchText = searchText.toLowerCase();
    let search = searchText.split(' ');
    //remove empty strings
   search = search.filter(Boolean);
    console.log(search);
    let result = [];
    allBlogs.forEach((blog)=>{
        let compoundData = '';
        blog.tags.forEach(tag=>{compoundData+=tag.toLowerCase()});
        compoundData+=blog.title.toLowerCase();   
        compoundData+=blog.author.name.toLowerCase();
        compoundData+=blog.category.toLowerCase();

        if(search.some((word)=>{
            const regex = new RegExp(word);
            return regex.test(compoundData); 
        })) result.push(blog);  
    });
    return result;
}

//search box
document.addEventListener('keydown', (e)=>{
    const searchBox = document.querySelector('.blog-search-bar input');
    if((e.code==='Enter') && (document.activeElement == searchBox)){
        displayableBlogs = searchFor(searchBox.value);
        updateBlogListBox(displayableBlogs);
        window.scrollTo(0,document.querySelector(".blog-container").scrollHeight);
    }
});

//SEARCH BY TAGS
let tagButtons = document.querySelectorAll('.blog-tags ul li button');
let activeTags = []
tagButtons.forEach(button=>{
    button.addEventListener('click', ()=>{
        const tag = button.innerText;

        //css changes
        if(activeTags.includes(tag)){
            let newActiveTags = [];
            activeTags.forEach(aTag=>{
                if(aTag!=tag) newActiveTags.push(aTag);
            });
            activeTags = newActiveTags;
            button.style.background = '#00000000';
            button.style.color='#8D8D8D';
            button.style.border='2px solid #E9E9E9';
        }
        else {
            activeTags.push(tag);
            button.style.background = '#bbbbbb';
            button.style.color='#ffffff';
            button.style.border='2px solid #aaaaaa';
        }


        //blog results
        if(!activeTags.length){
            displayableBlogs = shuffle(allBlogs);
        }
        else{
            let searchText = '';
            displayableBlogs='';
            activeTags.forEach((tag)=>{
                searchText+= tag + ' ';
            });
            console.log(searchText);
            displayableBlogs = searchFor(searchText);
            
        }
        
        if(!displayableBlogs.length){
            
        };

        updateBlogListBox(displayableBlogs);
    });
    
})

//SORTING BLOGS
let blogSortBox = document.querySelector('.blog-sort');
let mostPopularButton = blogSortBox.querySelector('.blog-sort ul button[name=most-popular]');
mostPopularButton.addEventListener('click', ()=>{
        displayableBlogs.sort((a,b)=>{
            return b.appreciateCount - a.appreciateCount;
        });
    updateBlogListBox(displayableBlogs);
});


let mostViewedButton = blogSortBox.querySelector('.blog-sort ul button[name=most-viewed]');
mostViewedButton.addEventListener('click', ()=>{
        displayableBlogs.sort((a,b)=>{
            return b.views - a.views;
        });
    updateBlogListBox(displayableBlogs);
});


let latestButton = blogSortBox.querySelector('.blog-sort ul button[name=latest]');
latestButton.addEventListener('click', ()=>{
        displayableBlogs.sort((a,b)=>{
            aDate = timestampToDate(a.createdAt);
            bDate = timestampToDate(b.createdAt);
            if((bDate.year-aDate.year) != 0) return bDate.year-aDate.year;
            else if((bDate.monthNum-aDate.monthNum) !=0) return bDate.monthNum-aDate.monthNum;
            else return bDate.day-aDate.day;
        });
    updateBlogListBox(displayableBlogs);
});

let oldestButton = blogSortBox.querySelector('.blog-sort ul button[name=oldest]');
oldestButton.addEventListener('click', ()=>{
        displayableBlogs.sort((b,a)=>{
            aDate = timestampToDate(a.createdAt);
            bDate = timestampToDate(b.createdAt);
            if((bDate.year-aDate.year) != 0) return bDate.year-aDate.year;
            else if((bDate.monthNum-aDate.monthNum) !=0) return bDate.monthNum-aDate.monthNum;
            else return bDate.day-aDate.day;
        });
    updateBlogListBox(displayableBlogs);
});


//UPDATE BLOGS
const updateBlogListBox = (data)=>{
    let blogListBox = document.querySelector('.blog-list-box');
    blogListBox.innerHTML ='';
    if(!data.length) {
        blogListBox.innerHTML =
        `<div class="blog-list-item">
        <div class="blog-title"><a>No Blogs Found</a></div>
      </div>`
        return;
    }
    data.forEach((blog)=>{
       const date = timestampToDate(blog.createdAt);
     blogListBox.innerHTML += 
        `<div class="blog-list-item">
        <div class="blog-profile">
          <img src="${blog.author.profileImageLocation  || '/img/profile/profile_demo.png'}">
          <a>${blog.author.name}</a>
        </div>
        <div class="blog-title"><a>${blog.title.slice(0,50) + (blog.title.length>50?'...':'')}</a></div>
        <div class="blog-text">${blog.body.slice(0,100) + (blog.body.length>100?'...':'')}</div>
        <div class="blog-date">${date.day} ${date.month} ${date.year}</div>
        <img src = "${blog.cover}" class="blog-thumbnail">
      </div>`
    });

}

const timestampToDate = (timestamp)=>{
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = Number(timestamp.slice(0,4));
    const month = months[Number(timestamp.slice(5, 7))];
    const day = Number(timestamp.slice(8,10));
    
    return {day, month, year, monthNum:Number(timestamp.slice(5, 7))};
}

// misc functions

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

