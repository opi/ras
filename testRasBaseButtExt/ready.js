$.fn.ready(function(){      
  
  $('#slider').RAS();
  $('#slider2').RAS();
  
  var $slider = $('#slider'),
      parentElement = $slider.parent();
  
  //console.log(parentElement);
  
  $("#PrevSlide").click(function(){
    $.fn.RAS.slide($slider, 'prev', 400, 'null');
  });
  
  $("#NextSlide").click(function(){
    $.fn.RAS.slide($slider, 'next', 400, 'null');
  });
});