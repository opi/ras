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
      
      container.children().each(function(e){
        $(this).attr('data-left', dataW*e);
      });
      
      navigation.prepend('<div id="navMultiple"/>');
      
      for(var i = numberChild-1; i>=0; i--) {
        $('#navMultiple').prepend('<button data-slide="'+i+'">'+i+'</button>');
      }
      
      $('#navMultiple').find('button').each(function(e){
        var slide = $(this).data('slide');
        $(this).click(function(){
          $('#navMultiple').find('active').removeClass('active');       
          $(this).addClass('active');
          var childSelected = container.children().eq(slide),
              leftContainer = childSelected.data('left');
          container.animate({
            'margin-left': -leftContainer
          })
        })
      });
      
    });
    
  };
  
})(jQuery, window, document);