$(document).ready(()=>{
    $(".hamburger").click(function(){
      $(this).toggleClass("is-active");
      $(".nav-list").toggleClass("is-open");
      $(`.nav-list a[name=${getPageName(window.location.pathname)}]`).addClass('active');
    });
  });

 const getPageName = (pathname) => {
   switch(pathname){
      case '/': return 'home';
      case '/blog/': return 'blog';
      case '/project/': return 'project';
      case '/team/': return 'team';
      default: return 'none';
   }
 }