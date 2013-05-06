// jQuery Plugin ras - Responsive Accessible Slider
// version 2.0, Avril 30 2013
// by Thomas LEBEAU

;(function ( $, window, document, undefined ) {
    
    $.ras = $.ras || {};
    
    $.ras.slideshow = {
      options : {
        duration: 400,
        textPrev:'prev',
        textNext:'next'
      }
    }

    // The actual plugin constructor
    function PlugRAS(element, options ) {
        this.element = element;
        var self = this,
            $element = $(self.element),
            id = element.id,
            classRas = element.className.split(' '),
            classRas = classRas[0],
            identiant;
            (id ? identiant = id : identiant = classRas )
            
            $element.wrap('<div class="allRas" id="AllRAS-'+identiant+'"/>')
        
        self.init(options, identiant);
        
        //Public functions
        $.fn.ras.slide = function(el, direction, time){
          self.slide(el, direction, time);
        }
    }
    
    PlugRAS.prototype = {
      init: function(options, id){
        // if more than one items
        var self = this,
            $element = $(self.element),
            childs = $element.children(),
            navigation = '<div id="navRAS"><button class="btnSlideRAS prev">'+options.textPrev+'</button><button class="btnSlideRAS next">'+options.textNext+'</button></div>',
            childLength = childs.length,
            $elementParent = $element.parent();
            $element.wrap('<div class="rasContainer" id="RASContainer-'+id+'" style="width:100%; overflow:hidden;"/>'),
            $RASContainer = $element.parent();
        
        if(childLength > 1){
              
          // append navigation for Slide
          $RASContainer.before(navigation); 
          
          var $navRAS = $RASContainer.prev('#navRAS'),
              $RASSlideshow = $navRAS.next().children(),
              elementRAS = $(self.element),
              childs = elementRAS.children(),
              RASparent = elementRAS.parent(),
              WinWidth = $(window).width();
          
          //put display inline block for childs
          childs.css({
            'float':'left',
            'position':'relative'
          }).each(function(e){
            $(this).attr('data-slide',e);
          });
          
          var docWidth = $elementParent.width(),
              childsWidth = docWidth;
          //append Size element RAS   
          elementRAS.css({
              'width':childsWidth*childLength
            }).attr('data-width',childsWidth);
          
          $('img').load(function(){
            self.heightElement(childs, elementRAS);
            elementRAS.css({
              'width':docWidth*childLength
            }).attr('data-width',docWidth);
            childs.css({
              'width':docWidth,
              'position':'relative'
            });
          });
          
          
          
          //Evenement navigation
          $navRAS.find('.prev').bind('click', function(){
            var time = options.duration,
                anim = options.animation;
            
            self.slide($RASSlideshow, 'prev', time, 'null');   
          });
          
          $navRAS.find('.next').bind('click', function(){
            var time = options.duration,
                anim = options.animation;
                
            self.slide($RASSlideshow, 'next', time, 'null');
          });
          
          //if User resize window
          $(window).resize(function(){
            var docWidth = RASparent.width();
            self.resizeMe(elementRAS, docWidth, childLength);
          });
        }
      },
      // Slide Method
      slide: function(el, direction, duration) {
        var dataWidth = el.data('width'),
            elWidth = el.width(),
            firstSlide = el.children(':first'),
            lastSlide = el.children(':last'); 
              
        // Prev Direction
        if(direction == 'prev') {
          el.children().css({'margin-left':0})
          lastSlide.prependTo(el).css({
            'margin-left': '-'+dataWidth+'px'
          }).animate({
            'margin-left': 0
          }, duration);
          
        // Next Direction
        } else if( direction == 'next') {
          firstSlide
            .animate({
             'margin-left': '-'+dataWidth+'px'
            }, duration, function(){
              $(this).css({'margin-left':0}).appendTo(el);
            })
        }   
      },
      //heightElement Method
      heightElement: function(element, parentElement) {
        var h = 0;
        element.each(function(){
          var hTallest = $(this).height();
          if(hTallest > h){
            h = hTallest;
          }
        });
        //Attribute heigth element and Container
        parentElement.height(h);
        parentElement.parent().height(h).attr('data-height', h);
      },
      //Resize Method
      resizeMe: function(element, valueScreen, childLength) {
        var childs = element.children();
        
        var docWidth = valueScreen,
            childsWidth = docWidth;
        element.css({
          'width':valueScreen*childLength
        }).attr('data-width',valueScreen);
        childs.css({
          'width':valueScreen,
          'position':'relative'
        });
        this.heightElement(childs, element);
      }
    }

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn.ras = function (options) {
      options = $.extend({}, $.ras.slideshow.options, options);
        return this.each(function () {
          new PlugRAS(this, options);
        });
    };

})( jQuery, window, document );