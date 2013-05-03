$.fn.ready(function(){
  $("#slideshow").ras({
    textPrev:'‹',
    textNext:'›'
  });
  $("#slideshowAuto").ras({
    textPrev:'‹',
    textNext:'›'  
  }).autoslide({
    time:4000
  });
  $("#slideshowCarousel").ras({
    textPrev:'‹',
    textNext:'›'  
  }).carousel();
});

