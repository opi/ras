// jQuery Plugin RAS - Responsive Accessible Slider
// version 1.0, Dec 07 2012
// by Thomas LEBEAU


;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var RAS = "RAS",
        defaults = {
            animation:'slide',
            countNav: false,
            carousel: false,
            carouselNumber:3,
            duration: 400,
            carouselVisibleWidth:"null",
            textPrev:'prev',
            textNext:'next'
        };

    // The actual plugin constructor
    function PlugRAS( element, options ) {
        this.element = element;
        
        var self = this,
            $element = $(self.element),
            childs = $element.children(),
            childLength = childs.length,
            $elementParent = $element.parent();
            $element.wrap('<div id="AllRASContainer"/>');  
        
        this.options = $.extend( {}, defaults, options );

        this._defaults = defaults;
        this._name = RAS;

        this.init();
        
        //Public functions
        $.fn.RAS.slide = function(el, direction, time, point){
          self.slide(el, direction, time, point);
        }
        $.fn.RAS.fade = function(el, direction, time, point){
          self.fade(el, direction, time, point);
        }
    }

    PlugRAS.prototype = {

        init: function() {
            
            // if more than one items
            var self = this,
                $element = $(self.element),
                childs = $element.children(),
                navigation = '<div id="navRAS"><button title="Navigation slider Précédent" class="btnSlideRAS prev">'+this.options.textPrev+'</button><button title="Navigation slider Suivant"  class="btnSlideRAS next">'+this.options.textNext+'</button></div>',
                childLength = childs.length,
                $elementParent = $element.parent();
                $element.wrap('<div id="RASContainer" style="width:100%; overflow:hidden;"/>'),
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
              
              
              // Determine height of $element
              $('img').load(function(){
                self.heightElement(childs, elementRAS);
              })
              
              var docWidth = $elementParent.width(),
                  childsWidth = docWidth;
              //append Size element RAS   
              elementRAS.css({
                  'width':childsWidth*childLength
                }).attr('data-width',childsWidth);
              
              // Carousel is false         
              if(this.options.carousel == false){
              
                $('img').load(function(){
                  elementRAS.css({
                    'width':docWidth*childLength
                  }).attr('data-width',docWidth);
                  childs.css({
                    'width':docWidth,
                    'position':'relative'
                  })
                })
                
              }else{
                
                // Carousel is true
                var countElement = this.options.carouselNumber,
                    childsLength = childs.length,
                    widthCarouselVisible = this.options.carouselVisibleWidth;
                
                if(childsLength > countElement && widthCarouselVisible == 'null'){
                  for(var i = 0; i < childs.length; i=i+countElement) {
                    childs
                      .css({
                        'width':100/countElement + '%'
                      })
                      .slice(i, i+countElement)
                      .wrapAll('<div class="slide" style="float:left; width:'+docWidth+'px;"/>');
                  }
                  
                }else{
                
                  //WinWidth  
                  if(widthCarouselVisible > WinWidth){
                    widthCarouselVisible = WinWidth;
                  }
                  childs
                    .css({
                      'width':widthCarouselVisible,
                      'float':'none',
                      'display':'inline-block',
                      'white-space':'normal',
                      'vertical-align':'top'
                    })
                  elementRAS.css({
                    'width':'100%', 
                    'white-space':'nowrap'
                  }).attr('data-width',widthCarouselVisible);
                }
                
                
                $('img').load(function(){
                  self.heightElement(childs, $('.slide'));
                })
              
              }//end Carousel
              
              // countNav is true
              if(this.options.countNav == true){
                
                var itemsNav = [],
                    idSlide = elementRAS[0].id;
                for(var i = 0; i < childLength; i++){
                  itemsNav[i] = '<button>'+i+'</button>';
                }
                var sliderNav = '<ul id="'+idSlide+'Nav"><li>'+itemsNav.join('</li><li>')+'</li></ul>';
                
                $RASContainer.before(sliderNav);
                $RASSlideshow.children(':first').addClass('active');
                var sliderNavChilds = $('#'+idSlide+'Nav').children();
                
                $('#'+idSlide+'Nav').children(':first').addClass('active');

                sliderNavChilds.each(function(e){
                  $(this).bind('click', function(){
                    sliderNavChilds.removeClass('active');
                    $(this).addClass('active');
                    var text = $(this).text(),
                        slideNumber = $RASSlideshow.children('.active').data('slide'),
                        anim = self.options.animation;
                        
                    if (text == slideNumber){
                    }else{
                      if(anim == 'slide'){
                        self.slide($RASSlideshow, 'next', self.options.duration, text);
                      }else if(anim == 'fade'){
                        self.fade($RASSlideshow, 'next', self.options.duration, text);                      
                      }
                    }
                  });
                });
                
              }//end countNav

              //Evenement navigation
              $navRAS.find('.prev').bind('click', function(){
                var time = self.options.duration,
                    visibleCarousel = self.options.carouselVisibleWidth,
                    anim = self.options.animation;
                    
                //Slide anim   
                if(anim == 'slide'){
                  self.slide($RASSlideshow, 'prev', time, 'null');
                  
                //fade Anim
                }else if (anim == "fade" && visibleCarousel == 'null'){
                  self.fade($RASSlideshow, 'prev', time, 'null');
                }
              });
              
              $navRAS.find('.next').bind('click', function(){
                var time = self.options.duration,
                    visibleCarousel = self.options.carouselVisibleWidth,
                    anim = self.options.animation;
                    
                //Slide anim
                if(anim == 'slide'){
                  self.slide($RASSlideshow, 'next', time, 'null');
                  
                //fade Anim
                }else if (anim == "fade" && visibleCarousel == 'null'){
                  self.fade($RASSlideshow, 'next', time, 'null');
                }
              });
              
              //Gestion KeyBoard 
              $(document).keyup(function(e){
                if(e.keyCode == 37){
                  self.slide($RASSlideshow, 'prev', self.options.duration, 'null');
                }else if (e.keyCode == 39){
                  self.slide($RASSlideshow, 'next', self.options.duration, 'null');
                }
              });
              
              //if User resize window
              $(window).resize(function(){
              
                var docWidth = $elementParent.width();
                self.resizeMe(elementRAS, docWidth);
              });
            }
        },
        
        // Slide Method
        slide: function(el, direction, duration, point) {
            var dataWidth = el.data('width'),
                elWidth = el.width();
                
            if(this.options.carouselVisibleWidth == "null"){
            }else{
              if(dataWidth > elWidth){
                dataWidth = elWidth;
              }else{
                dataWidth = this.options.carouselVisibleWidth;
              }
            }
            if(point == 'null'){
              //Carousel Visible
              
              var firstSlide = el.children(':first'),
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
            // if point is a Number
            }else{
              el.children().removeClass('active');
              var slideElement = el.children('[data-slide="'+point+'"]'),
                  slidePrevElement = slideElement.prevAll(),
                  slideNumber = slidePrevElement.length;
              
              Array.prototype.reverse.call(slidePrevElement);
                  
              slideElement.addClass('active');
              el.animate({
                'margin-left':'-'+dataWidth*slideNumber+'px'
              }, duration, function(){
                slidePrevElement.appendTo(el);
                $(this).css({'margin-left':0})
              });
            }
        },
        
        // Fade Method
        fade: function(el, direction, duration, point){
          var firstSlide = el.children(':first'),
              lastSlide = el.children(':last');
          el.children().show();    
          // Prev Direction
            if(direction == 'prev') {
              firstSlide.fadeOut();
              lastSlide
                .hide().prependTo(el)
                  .fadeIn(duration);
                  
            // Next Direction
            } else if( direction == 'next') {
              firstSlide
                .fadeOut(duration/2, function(){
                  $(this).appendTo(el);
                })
            }
        },
        
        //Resize Method
        resizeMe: function(element, valueScreen) {
          var childs = element.children(),
              childLength = childs.length,
              $navRAS = element.parent().prev();
          
          //normal function
          if(this.options.carouselVisibleWidth == 'null'){
            var docWidth = valueScreen,
                childsWidth = docWidth;
            element.css({
              'width':childsWidth*childLength
            }).attr('data-width',childsWidth);
            childs.css({
              'width':childsWidth,
              'position':'relative'
            })
            
          //one Carousel Visible
          }else{
            var widthElement = this.options.carouselVisibleWidth;
            function changeValue(value){
              element.css({
                'width':value
              }).attr('data-width',value);
              childs.css({
                'width':value,
                'position':'relative'
              }); 
            }
            if(widthElement > valueScreen){
              changeValue(valueScreen);
            }else{
              changeValue(widthElement); 
            }
          }

          this.heightElement(childs, element);
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
        }
        
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[RAS] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + RAS)) {
                $.data(this, "plugin_" + RAS, new PlugRAS( this, options ));
            }
        });
    };

})( jQuery, window, document );