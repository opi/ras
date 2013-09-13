/* [URL] */
;(function($, window, document, undefined) {

  var r = $.ras.slideshow;
  
  r.nav = {
    options : {}
  };
  
  $.fn.nav = function(options) {
    
    options = $.extend({}, r.nav.options, options);
    return this.each(function(){
      var container = $(this),
          navigation = container.closest('.allRas').find('#navRAS'),
          childs = container.children(),
          dataW = container.data('width'),
          numberChild = childs.length;
      container.addClass('navRas');
      container.find('li:first-child').addClass('activeSlide');
      container.children().each(function(e){
        $(this).attr('data-left', dataW*e);
      });
      
      navigation.prepend('<div id="navMultiple"/>');
      
      for(var i = numberChild; i>=1; i--) {
        $('#navMultiple').prepend('<button data-slide="'+(i-1)+'">'+i+'</button>');
      }
      
      $('#navMultiple').find('button:eq(0)').addClass('active');
      
      $('#navMultiple').find('button').each(function(e){
        var slide = $(this).data('slide');
        $(this).click(function(){
          $('#navMultiple').find('.active').removeClass('active');       
          $(this).addClass('active');
          var childSelected = container.find('li:eq('+slide+')'),
              leftContainer = childSelected.data('left');
          
          container.find('.activeSlide').removeClass('activeSlide');
          childSelected.addClass('activeSlide');
          container.animate({
            'margin-left': -leftContainer
          })
        })
      });
      
    });
    
  };
  
})(jQuery, window, document);