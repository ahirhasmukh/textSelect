!(function ($) {

  /**
   * Modules
   */
  var app = {}

  /**
   * Mini Helper Objects
   */
  var _w = {}, // Window
      _s = {}; // Screen

  /**
   * Module Properties
   *
   * config
   * data
   * $el
   *
   */
  app = {

    // Config
    config : {
      environment : window.location.href.match(/(localhost)/g) ? 'development' : 'production',
      debug : window.location.href.match(/(localhost)/g) ? true : false
    },

    // Data
    data : {
      temp : null,
      binds : {}
    },

    // URLs
    urls : {
      social : {
        facebook : '',
        twitter : '',
        youtube : '',
        instagram : '',
        pinterest : '/'
      },

    },

    // Public Keys
    keys : {
      addthis : 'ra-536cbe5438ea26f8'
    },

    // Console (Client)
    console : {
      color : {
        'error'     : '#da1a1a',
        'event'     : '#3d8627',
        'function'  : '#3db330',
        'callback'  : '#6c6c6c',
        'object'    : '#ac07db',
        'animation' : '#c3028f',
        'control'   : '#d2a946',
        'plugin'    : '#e734d0',
        'waypoint'  : '#4e77c1',
        'hash'      : '#ad74ed',
        'number'    : '#1c1c1c',
      }
    },

    // Supports
    supports : {

    },

    // Body Classes
    classes : {
      modal_overlay : 'app--modal-overlay',
    },

    // Elements
    $el : {
      body : $('body'),
      container : $('#app'),

      header : $('#header'),

      menu : {
        header : $('.header__menu'),
      },

      nav : {
        dropdown  : $('#nav-dropdown')
      },

      modals : {
        control : $('*[data-control-modal]'),
        modal : $('.modal'),
        bay : $('#modals'),
        close : $('.modal--close')
      },

      loader : $('#loader'),

      slider : {
        basic    : $('.slider--basic'),
        gallery  : $('.slider--gallery'),
        carousel : $('.slider--carousel'),
        framed   : $('.slider--framed'),
      }
    },

    // Flags
    flag : {
      animating : false
    },

    // Debug
    debug : {
      events : {
        'window' : {
          scroll : false,
          resize : false,
          orientationchange : false
        },
        'DOM' : {
          ready : true
        }
      }
    }

  };



  /**
   * Init
   */
  app.init = function () {

    // Basics
    this.events()
    this.modals.init()

    // Plugins
    this.plugins.init()

    // Animations
    this.animations.init()
    this.scroller.init()
    this.waypoints.init()

    // Compatibility
    this.compatibility.init()

    // App specific
    this.navDropdown.init()
    this.staffTabs()
    this.tabs()
    this.equalMargins()

  }



  /**
   * Equal Margins
   */
  app.equalMargins = {


    $el : {
      container : $('.container--events')
    },

    init: function() {
      this.events()
    },

    events: function() {


    }


  }

  /**
   * Equal Margins Event Post
   */
  //this ver is simply taking a percent and adding it to the top and bottom, need to take the difference instead
  // app.equalMargins = function() {

  //   // var eventHeight = $('.event-post').height();
  //   // console.log(eventHeight);

  //   $('.event-post').each(function() {
  //     var eventHeight = $(this).height();
  //     console.log(eventHeight);

  //     var marginHeight = eventHeight * .174;
  //     console.log(marginHeight);

  //     $(this).find('.event-image').css('margin-top', marginHeight );
  //     $(this).find('.event-image').css('margin-bottom', marginHeight );
  //   });

  // }

  //this verison is taking the difference and using that as the margin top and bottom
  app.equalMargins = function() {
    if ($(window).width() > 960) {
    //wrap in a window load function so the correct height gets calculated
    $(window).load(function() {

      // var eventHeight = $('.event-post').height();
      // console.log(eventHeight);

      // $('.event-post').each(function() {
      $('.event-post_inner').each(function() {

        var eventHeight = $(this).outerHeight();
        // console.log(eventHeight);

        var heightDiff = eventHeight - 227;
        // console.log(heightDiff);

        var marginHeight = heightDiff / 2;
        // console.log(marginHeight);

        $(this).prev('.event-image').css('margin-top', marginHeight );
        $(this).prev('.event-image').css('margin-bottom', marginHeight );
      });

    });

    $(window).resize(function () {

      $('.event-post_inner').each(function() {
        var eventHeight = $(this).outerHeight();
        // console.log(eventHeight);

        var heightDiff = eventHeight - 227;
        // console.log(heightDiff);

        var marginHeight = heightDiff / 2;
        // console.log(marginHeight);

        $(this).prev('.event-image').css('margin-top', '');
        $(this).prev('.event-image').css('margin-bottom', '');
        $(this).prev('.event-image').css('margin-top', marginHeight );
        $(this).prev('.event-image').css('margin-bottom', marginHeight );
      });

    });
  }
}
    /**
    * StaffTabs
    */
    app.staffTabs = function() {

    $(document).delegate('.team--link', 'click', function (event) {
      event.preventDefault();

      var link_id = $(this).attr('id')

      $('.team--section').each(function(){
        $(this).addClass('hidden');

        var section_id = $(this).attr('id')

        if(section_id == link_id) {
          $(this).removeClass('hidden');
        }
      })

    })


    $(document).delegate('.team--link', 'touchstart', function (event) {
      event.preventDefault();

      var link_id = $(this).attr('id')

      $('.mobile--team').each(function(){
        $(this).addClass('mobile-hide');

        var section_id = $(this).attr('id')

        if(section_id == link_id) {
          $(this).removeClass('mobile-hide');
        }
      })
    });





    }

  /**
   * Tabs
   * @depency animate.css
   */
  app.tabs = {


    $el : {
      container : $('.tabs')
    },

    init: function() {
      this.events()
    },

    events: function() {


    }


  }

    /**
   * Tabs
   */
  app.tabs = function() {

    // Hide tabs by default
    // Show first active tab
    $('.tab').hide()
    $('.tab:first-of-type').show()

    // On Click Event
    $('.tabs__menu li').click(function (event, i) {
      var index           = $(this).index(),
          normalizedIndex = index + 1,
          tabsContainer   = $(this).parent().parent().parent('.tabs-container'),
          tabsMenu        = $(this).parent().find('li'),
          tabsContent     = tabsContainer.find('.tab'),
          tabsFirst       = tabsContainer.data('tab-first');

      /**
       * If two tabs are on page (mobile)
       */
      if( tabsFirst ) {
        tabsContainer.attr('data-active-tab', ''+ normalizedIndex +'')
      }
      else {
        tabsContainer.attr('data-active-tab', ''+ normalizedIndex +'')
      }

      /**
       * Mobile tab 'prev','next' classes
       */
      tabsMenu.removeClass('active');
      // tabsMenu.removeClass('prev');
      // tabsMenu.removeClass('next');
      // $(this).removeClass('next');
      // $(this).next().addClass('next');
      // $(this).prev().addClass('prev');
      $(this).addClass('active');

      tabsContent.hide();
      var activeTab = $(this).data('tab-trigger'),
          tabs      = tabsContainer.find('.tab')

      tabs.addClass('animated fadeOutRight')
      $(activeTab).fadeIn().removeClass('fadeOutRight').addClass('fadeInLeft');

      return false;
    });
  }

  $(".tab__faq").click(function() {
    $(this).toggleClass('active');
    $(this).siblings().removeClass('active');
    // $(this).children('.tab__inner').toggleClass('active');
  })



  // /**
  //  * Slides (Sliding Tabs)
  //  */
  // app.tabs = function() {

  //   // Default Action
  //   $('.slideTabs').hide();

  //   // Refactoring for multiple tabs on same page
  //   $('.slideTabss-nav').each( function(index) {
  //     $(this).children('li:first').addClass('active').show();
  //     $(this).siblings('.slideTabss').find('.slideTabs:first').show();
  //   })

  //   $('.slideTabss-nav li').click(function (event, i) {
  //     event.preventDefault();

  //     if ( app.config.debug ) console.log('%cEVENT', 'color:'+app.console.color.event, '- Clicked .slideTabss-nav li')

  //     var index           = $(this).index(),
  //         normalizedIndex = index + 1,
  //         slideTabsContainer   = $(this).parent().parent('.slideTabss-container'),
  //         slideTabsMenu        = $(this).parent().find('li'),
  //         slideTabsContent     = slideTabsContainer.find('.slideTabs'),
  //         slideTabsFirst       = slideTabsContainer.data('tab-first');


  //     /**
  //      * If two slideTabs are on page (mobile)
  //      */
  //     // if( slideTabsFirst ) {
  //       slideTabsContainer.attr('data-active-tab', ''+ normalizedIndex +'')
  //     // }
  //     // else {
  //     //   slideTabsContainer.attr('data-active-tab', ''+ normalizedIndex +'')
  //     // }

  //     /**
  //      * Mobile tab 'prev','next' classes
  //      */
  //     slideTabsMenu.removeClass('active');
  //     slideTabsMenu.removeClass('prev');
  //     slideTabsMenu.removeClass('next');
  //     $(this).removeClass('next');
  //     $(this).next().addClass('next');
  //     $(this).prev().addClass('prev');
  //     $(this).addClass('active');

  //     slideTabsContent.hide();

  //     var activeTab = $(this).find('a').attr('href'),
  //         slideTabs      = slideTabsContainer.find('.tab')

  //     slideTabs.addClass('animated fadeOutLeft')
  //     $(activeTab).fadeIn().removeClass('fadeOutLeft').addClass('fadeInRight');


  //     // if ( $(window).width() < 768 || App.helpers.isUserAgent().mobile ) {
  //     //   $('.slide__menu').each( function(index) {
  //     //     $(this).children('li').removeClass('next')
  //     //     $(this).children('li').removeClass('prev')
  //     //   })
  //     //   $(this).next().addClass('next');
  //     //   $(this).prev().addClass('prev');
  //     // }

  //     return false;
  //   });
  // }


  /**
   * Nav Dropdown
   */
  app.navDropdown = {

    $el : {
      toggle : $('#menu-toggle'),
      // close : $('.nav-dropdown__close'),
      container : app.$el.menu.header
    },

    init: function() {

      this.events()
    },

    events: function() {
      $(document).delegate('#menu-toggle', 'click', function (event) {
        event.preventDefault()

        var $this = $(this),
            $body = $('body')

        $this.toggleClass('menu-toggle--x')
        $('#header').toggleClass('header--sticky-show')
        $('#header-two').toggleClass('header--sticky-show')

        // $('#nav').toggleClass('nav--open')

        // $this.toggleClass('nav-toggle--open')
        // $body.toggleClass('body--visible-nav')

        // @todo prevent #app scrolling on nav open
      })

    }


  }


  /**
   * Collapsed Header
   */
    app.stickyHeader = {


    }
      /**
       * Header scroll (default)
       */

      var previousScroll = 0;

        if ($(window).width() > 960) {

          $(window).scroll(function(){

            var currentScroll = $(this).scrollTop();

          //   /*
          //     If the current scroll position is greater than 0 (the top) AND the current scroll position is less than the document height minus the window height (the bottom) run the navigation if/else statement.
          //   */
            if( currentScroll <= 700 ) {
              $('.header').removeClass('header--sticky')
              $('.header').removeClass('header--sticky-show')
              // $('.menu-toggle').removeClass('visible')
              // $('.btn--sticky').removeClass('visible')

            }

            if (currentScroll > 700 && currentScroll < $(document).height() - $(window).height()){
              $('.header').addClass('header--sticky')
              // $('.menu-toggle').addClass('visible')
              // $('.btn--sticky').addClass('visible')
            }

            if (currentScroll > 700 && currentScroll < $(document).height() - $(window).height()){
              $('.header').addClass('header--sticky-show')
            }
          });
        }


      var previousScroll = 0;

        if ($(window).width() < 960) {

          $(window).scroll(function(){

            var currentScroll = $(this).scrollTop();

          //   /*
          //     If the current scroll position is greater than 0 (the top) AND the current scroll position is less than the document height minus the window height (the bottom) run the navigation if/else statement.
          //   */
            if( currentScroll <= 100 ) {
              $('.header').removeClass('header--sticky')
              $('.menu-toggle').removeClass('visible')
              $('.btn--sticky').removeClass('visible')

            }
            if (currentScroll > 100 && currentScroll < $(document).height() - $(window).height()){
              $('.header').addClass('header--sticky')
              $('.menu-toggle').addClass('visible')
              $('.btn--sticky').addClass('visible')
            }
          });
        }





  /**
   * Plugins
   */
  app.plugins = {

    /**
     * Plugin object name
     * @example (window.<NAME>)
     */
    plugin : [
      { name : 'slick', jquery : true },
      { name : 'WOW' },
    ],


    /**
     * Init
     */
    init: function() {

      // this.slick()
      // this.polyfills()

    },


    /**
     * Slick Slider
     */
    slick: function() {

      var _this = app.plugins;

      // if ( !$.slick ) return false;

      /**
       * Slider Options
       * @type {Object}
       */
      var options = {
        // Basic (Default)
        basic : {
          fade: true,
          arrows: true,
          appendArrows: $('.slick-arrow-container'),
          nextArrow: '<a class="icon icon-angle-right slick-arrow--next"></a>',
          prevArrow: '<a class="icon icon-angle-left  slick-arrow--prev"></a>',
          dots: true,
          responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: true,
                arrows: false,
              }
            },
          ]
        },

        // Gallery (used with carousel as controlNav )
        gallery : {

        },

      }


      /**
       * Event Listener: window onload
       */
      window.addEventListener('load', function (event) {

        $('.slider--basic').slick( options['basic'])

        // app.$el.slider.basic.flexslider( options['basic'] )

      })

    },


    /**
     * Polyfills
     */
    polyfills: function() {

      // Object-fit
      objectFit.polyfill({
        selector: '.slide__bg img', // this can be any CSS selector
        fittype: 'cover',           // either contain, cover, fill or none
        // disableCrossDomain: 'true'  // either 'true' or 'false' to not parse external CSS files.
      })
    },


  }





  /**
   * Events
   */
  app.events = function () {


    /**
     * Sample
     */
    $(document).delegate('.class-name', 'click', function (event) {

      // code here

    })


  }


/**
 * Slick Slider
 */

  //BASIC SLIDER
  // $(document).ready(function(){
    $('.slider').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      dots: true,
      // appendArrows: $('.slick-arrow-container') ,
      nextArrow: '<i class="fa fa-angle-right fa slick-arrow--next" aria-hidden="true"></i>',
      prevArrow: '<i class="fa fa-angle-left fa slick-arrow--prev" aria-hidden="true"></i>',
    });
  // });


  //VERTICAL SLIDER
  // $(document).ready(function(){
    $('.slider--vertical').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      dots: false,
      vertical: true,
      centerMode: true,
      centerPadding: '100px',
      focusOnSelect: true, //if you want the clickable elements to allow the content to scroll
      // appendArrows: $('.slick-arrow-container') ,
      // nextArrow: '<i class="fa fa-angle-up fa slick-arrow--next" aria-hidden="true"></i>',
      // prevArrow: '<i class="fa fa-angle-down fa slick-arrow--prev" aria-hidden="true"></i>',
      nextArrow: '<i class="fa fa-angle-down fa slick-arrow--next" aria-hidden="true"></i>',
      prevArrow: '<i class="fa fa-angle-up fa slick-arrow--prev" aria-hidden="true"></i>',
    });
  // });

  //STATS SLIDER
  // $(document).ready(function(){
    $('.slider--stats').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      dots: true,
      vertical: true,
      // appendArrows: $('.slick-arrow-container') ,
      nextArrow: '<i class="fa fa-angle-right fa slick-arrow--next" aria-hidden="true"></i>',
      prevArrow: '<i class="fa fa-angle-left fa slick-arrow--prev" aria-hidden="true"></i>',
    });
  // });

/**
 * Set the slider buttons href
 */

// var link_href = $('slick-current').attr('href');
// console.log(link_href);


if($('.slider--vertical').length >0 ){

   $('.slick-center').mouseenter(function(){
    $('.link-btn').addClass('hovered');
   })

   $('.slick-center').mouseleave(function() {
    $('.link-btn').removeClass('hovered');
   })
}



/**
 * BAR CHART
 */
$('.horizontal .progress-fill span').each(function(){
  var percent = $(this).html();
  $(this).parent().css('width', percent);
});



/**
 * PIE CHART
 */
$(function(){

  var $ppc = $('.progress-pie-chart');

  $ppc.each(function(i, item) {

    var $this = $(this);

    var percent = parseInt($this.data('percent'))
    var deg = 360*percent/100;


    if (percent > 50) {
      $this.addClass('gt-50');
    }

    $this.find('.ppc-progress-fill').css('transform','rotate('+ deg +'deg)');
    $this.find('.ppc-percents span').html(percent+'%');
  })
});



/**
 * WANT LINKS
 */
$( ".want-link" ).hover(
  function() {
    $( this ).addClass( "choice" );
  }, function() {
    $( this ).removeClass( "choice" );
  }
);



  /**
   * Equal heights
   *
   *
   * HTML example
   * Parent element has attribute [data-equal-height=".selector"]
   * Won't set height on mobile, unless the following is set: [data-equal-mobile="true"]
   *
   * <div class="parent" data-equal-height=".selector">
   *   <div class="selector"></div>
   *   <div class="selector"></div>
   * </div>
   */
  app.equalHeights = {

    init: function() {

      var _this = app.equalHeights;

      if ($('[data-equal-height]').length < 1 )
        return;

      _this.onLoad();

    },


    onLoad: function() {

      var _this = app.equalHeights;


      $('[data-equal-height]').each(function(){

        // _this.setHeights();

        var eqSelectors  = $(this).data('equal-height'),
            $eqSelectors = $(this).find(eqSelectors)

        // Cache the highest
        var highestBox = 0;

        // Select and loop the elements you want to equalise
        $($eqSelectors, this).each(function(){

          // Remove height if set from before to account for resize
          $(this).css('height', '')

          // If this box is higher than the cached highest then store it
          if($(this).height() > highestBox) {
            highestBox = $(this).height();
          }

        });

        // Set the height of all those children to whichever was highest
        $($eqSelectors,this).height(highestBox);

      })

    },


    onResize: function() {

      var _this = app.equalHeights;

      if ($('[data-equal-height]').length < 1 )
        return;


      $('[data-equal-height]').each(function(){
        var equalMobile  = $(this).data('equal-mobile') ? true : false;

        var eqSelectors  = $(this).data('equal-height'),
            $eqSelectors = $(this).find(eqSelectors)


        if( ($(window).width() < 768 ) &&  equalMobile != true  ) {

          $($eqSelectors, this).each(function(){

            $(this).css('height', '')

          });

        }
        else {

          // Cache the highest
          var highestBox = 0;

          // Select and loop the elements you want to equalise
          $($eqSelectors, this).each(function(){

            // Remove height if set from before to account for resize
            $(this).css('height', '')

            // If this box is higher than the cached highest then store it
            if($(this).height() > highestBox) {
              highestBox = $(this).height();
            }

          });

          // Set the height of all those children to whichever was highest
          $($eqSelectors,this).height(highestBox);
        }

        // _this.setHeights();

      })
    },


    setHeights: function() {

      // console.log('setHeights')



    },


  }


  /**
   * List Click
   */

    $('.list-pin').click(function() {
    var targetModal = event.target.getAttribute('data-target-modal')
    var targetPin = event.target.getAttribute('data-target-pin')


    if ( targetModal ) {
      // console.log('Trigger '+targetModal+' here.')
      // console.log('Trigger '+targetPin+' here.' )

      $( targetModal ).fadeIn(350).siblings().fadeOut(400);
      $( targetPin ).addClass('active').siblings().removeClass('active');
      // target pin add class active...class of active changes the color


      //----- CLOSE
      $('[data-popup-close]').on('click', function(e)  {
          var targeted_popup_class = jQuery(this).attr('data-popup-close');
          $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
          $( targetPin ).removeClass('active');
          e.preventDefault();
      });

    }

    //------ SCROLL PAST MAP- CLOSE OPEN MODAL
    $(window).scroll(function() {
       var hT = $('#work-map-section').offset().top,
           hH = $('#work-map-section').outerHeight(),
           wH = $(window).height(),
           wS = $(this).scrollTop();
        // console.log((hT-wH) , wS);
       if (wS > (hT+hH-wH)){
          $( targetModal ).fadeOut(500);
          $( targetPin ).removeClass('active');
       }
    }); 

  });


  /**
   * Scroll into testimonials, close any remaining map modals
   */ 
  
  if ($("#work-map-section").length > 0) {  
    if ($(window).width() > 960) {   
      $(window).scroll(function() {
         var hT = $('#work-map-close').offset().top,
             hH = $('#work-map-close').outerHeight(),
             wH = $(window).height(),
             wS = $(this).scrollTop();
          // console.log((hT-wH) , wS);
         if (wS > (hT+hH-wH)){
          $('.map-modal').css("display", "none");
          $('.data-target-pin').removeClass('active');
         }
      }); 
    }
  }



  /**
   * Modals
   */
  app.modals = {

    init: function() {

      var modal = app.$el.modals.modal;

      // Move all modals on page into modal bay
      modal.appendTo(app.$el.modals.bay)

      // Bind events
      this.events()
    },

    events: function() {

      var _this = app.modals;

      // Click event
      $(document).delegate(app.$el.modals.control.selector, 'click', function (event) {
        event.preventDefault()

        var modalID   = $(this).data('control-modal'),
            videoURL  = $(this).data('video-url')

        // If video
        if ( videoURL ) {

          // Detect video player
          var url_vimeo   = /(?:http?s?:\/\/)?(?:www\.)?(?:vimeo\.com)\/?(.+)/g
          var url_youtube = /(?:http?s?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g
          var url_image   = /([-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?(?:jpg|jpeg|gif|png))/gi

          if( url_vimeo.test(videoURL) ) {
            var detected_embed  = '<iframe width="1400" height="788" src="//player.vimeo.com/video/$1?autoplay=1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
            var embed           = videoURL.replace(url_vimeo, detected_embed);
          }

          if( url_youtube.test(videoURL) ) {
            var detected_embed  = '<iframe width="1400" height="788" src="https://www.youtube.com/embed/$1?autoplay=1" frameborder="0" allowfullscreen></iframe>'
            var embed           = videoURL.replace(url_youtube, detected_embed)
          }

          if( url_image.test(videoURL) ) {
            var detected_embed  = '<a href="$1" target="_blank"><img class="sml" src="$1" /></a><br />'
            var embed           = videoURL.replace(url_image, detected_embed)
          }

          // $(modalID).append(embed)
          $(modalID).children('.iframe-container').append(embed)
        }

        _this.modalShow(modalID);
      })

      // Add close event listener - ESC
      $(document).on('keyup', function (event) {

        event.preventDefault()

        var activeModal = $('.modal.show').attr('id'),
            activeModalID = '#'+activeModal;

        if ( activeModal !== undefined ) {
          // Check if ESC key
          if ( event.keyCode == 27 ) {
            _this.modalClose(activeModalID)
          }

          if ( app.config.debug ) console.log('%cEVENT', 'color:'+app.console.color.event, '- toggle '+activeModalID+' by keyup ESC')
        }
      })

      // Add close event listener - .modal--close
      $(document).delegate(app.$el.modals.close.selector, 'click', function (event) {

        event.preventDefault()

        var activeModal = $('.modal.show').attr('id'),
            activeModalID = '#'+activeModal;

        if ( activeModal !== undefined ) {
          _this.modalClose(activeModalID)
        }

        if ( app.config.debug ) console.log('%cEVENT', 'color:'+app.console.color.event, '- toggle '+activeModalID+' by click on '+app.$el.modals.close.selector)
      })

      // Close modal by clicking on overlay
      $(document).delegate('#app.app--modal-overlay', 'click', function (event) {
        var activeModal = $('.modal.show').attr('id'),
            activeModalID = '#'+activeModal

        if ( !$(event.target).closest('.modal').length) {
          // Clicked outside of modal
          _this.modalClose(activeModalID)
        }
      })

    },



    modalShow: function(targetID) {

      var targetID = targetID || null;

      // console.log('targetID',targetID)

      // Toggle body class
      app.$el.container.toggleClass(app.classes.modal_overlay)

      // Load any videos



      // Toggle modal class
      $(targetID).toggleClass('show')

      // Wrap event binding
      app.$el.container.bind('click', function (event) {

        var activeModal = $('.modal.show').attr('id'),
            activeModalID = '#'+activeModal;

        if ( activeModal !== undefined ) { _this.modalClose(activeModalID) }

      })


      if ( app.config.debug ) console.log('%cDATA-CONTROL', 'color:'+app.console.color.control, '- modalShow with ID '+targetID)

    },


    /**
     * modalClose
     *
     * @param  {String} targetID
     */
    modalClose: function(targetID) {

      var targetID = targetID || null;

      // Toggle body class
      app.$el.container.toggleClass(app.classes.modal_overlay)

      // Toggle modal class
      $(targetID).toggleClass('show')

      // Remove any videos
      $(targetID).find('iframe').remove()

      // Unbind wrap event
      app.$el.container.unbind('click')

      if ( app.config.debug ) console.log('%cDATA-CONTROL', 'color:'+app.console.color.control, '- modalClose ID '+targetID)
    }



  }



/*!
 * JavaScript Cookie v2.1.3
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
  var registeredInModuleLoader = false;
  if (typeof define === 'function' && define.amd) {
    define(factory);
    registeredInModuleLoader = true;
  }
  if (typeof exports === 'object') {
    module.exports = factory();
    registeredInModuleLoader = true;
  }
  if (!registeredInModuleLoader) {
    var OldCookies = window.Cookies;
    var api = window.Cookies = factory();
    api.noConflict = function () {
      window.Cookies = OldCookies;
      return api;
    };
  }
}(function () {
  function extend () {
    var i = 0;
    var result = {};
    for (; i < arguments.length; i++) {
      var attributes = arguments[ i ];
      for (var key in attributes) {
        result[key] = attributes[key];
      }
    }
    return result;
  }

  function init (converter) {
    function api (key, value, attributes) {
      var result;
      if (typeof document === 'undefined') {
        return;
      }

      // Write

      if (arguments.length > 1) {
        attributes = extend({
          path: '/'
        }, api.defaults, attributes);

        if (typeof attributes.expires === 'number') {
          var expires = new Date();
          expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
          attributes.expires = expires;
        }

        try {
          result = JSON.stringify(value);
          if (/^[\{\[]/.test(result)) {
            value = result;
          }
        } catch (e) {}

        if (!converter.write) {
          value = encodeURIComponent(String(value))
            .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
        } else {
          value = converter.write(value, key);
        }

        key = encodeURIComponent(String(key));
        key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
        key = key.replace(/[\(\)]/g, escape);

        return (document.cookie = [
          key, '=', value,
          attributes.expires ? '; expires=' + attributes.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
          attributes.path ? '; path=' + attributes.path : '',
          attributes.domain ? '; domain=' + attributes.domain : '',
          attributes.secure ? '; secure' : ''
        ].join(''));
      }

      // Read

      if (!key) {
        result = {};
      }

      // To prevent the for loop in the first place assign an empty array
      // in case there are no cookies at all. Also prevents odd result when
      // calling "get()"
      var cookies = document.cookie ? document.cookie.split('; ') : [];
      var rdecode = /(%[0-9A-Z]{2})+/g;
      var i = 0;

      for (; i < cookies.length; i++) {
        var parts = cookies[i].split('=');
        var cookie = parts.slice(1).join('=');

        if (cookie.charAt(0) === '"') {
          cookie = cookie.slice(1, -1);
        }

        try {
          var name = parts[0].replace(rdecode, decodeURIComponent);
          cookie = converter.read ?
            converter.read(cookie, name) : converter(cookie, name) ||
            cookie.replace(rdecode, decodeURIComponent);

          if (this.json) {
            try {
              cookie = JSON.parse(cookie);
            } catch (e) {}
          }

          if (key === name) {
            result = cookie;
            break;
          }

          if (!key) {
            result[name] = cookie;
          }
        } catch (e) {}
      }

      return result;
    }

    api.set = api;
    api.get = function (key) {
      return api.call(api, key);
    };
    api.getJSON = function () {
      return api.apply({
        json: true
      }, [].slice.call(arguments));
    };
    api.defaults = {};

    api.remove = function (key, attributes) {
      api(key, '', extend(attributes, {
        expires: -1
      }));
    };

    api.withConverter = init;

    return api;
  }

  return init(function () {});
}));


// /**
//  * Hello Bar
//  * Moved to separate hellobar.js, so that script could be deregistered on 211 pages
//  */

// $(window).load(function() {

//   // console.log('Cookies.get', Cookies.get('hellobar')); //find out if hello bar is set, if true it's been set if undefined it has not

//   if ( !Cookies('hellobar')) { // if hellobar cookies is now set then run this function
//     setTimeout(function() {
//       $('body').addClass('lowered');
//       $('.hello-bar').addClass('visible');
//     }, 500);
//   }

//   $('.close-hello-bar').click( function () {
//     $('body').removeClass('lowered');
//     $('.hello-bar').removeClass('visible');
//     Cookies.set('hellobar', 'true'); // after close of the hellobar, set hellobar cookie to true
//   });

// });


  /**
   * Compatibility
   */
  app.compatibility = {

    init: function() {

      this.setBrowserBodyClass()

    },

    setBrowserBodyClass: function() {

      var browser = getBrowserName()

      // console.log('browser: ', browser)
      // app.$el.body.addClass(browser)

      $('body').addClass(browser)
    }

  }










  /**
   * Waypoint
   *
   * @param  {Object}   element  jQuery selector
   * @param  {Function} callback
   */
  app.waypoint = function(element, offset, callback) {

    if ( !element || element.length <= 0 ) return false;
    var waypoint_passed = false;

    window.addEventListener('scroll', function (event) {

      var element_offset_top = element.offset().top,
          window_offset_top  = document.documentElement.scrollTop || document.body.scrollTop;

      // If unflagged and below waypoint
      if ( waypoint_passed == false && (window_offset_top > (element_offset_top - offset)) ) {

        callback({
          element        : element,
          position       : 'below',
          element_offset : element_offset_top,
          window_offset  : window_offset_top
        })

        waypoint_passed = true;

        // Reset waypoint firing flag
        // setTimeout(function() { waypoint_passed = false; }, 5000)
      }

      // If unflagged and above waypoint
      if ( waypoint_passed == true && (window_offset_top < (element_offset_top - offset)) ) {

        callback({
          element        : element,
          position       : 'above',
          element_offset : element_offset_top,
          window_offset  : window_offset_top
        })

        waypoint_passed = false;
      }

    })

  }

  /**
   * Waypoints
   */
  app.waypoints = {

    init: function() {
      this.example()
    },

    example: function() {

      var $waypoint = $('.example-waypoint');

      if ( !$waypoint || $waypoint.length == 0 ) return;

      app.waypoint( $waypoint, 200, function (data) {

        if ( data.position == 'below' ) {
          // Do stuff here
        }
        if ( data.position == 'above' ) {
          // Do stuff here
        }

        if ( app.config.debug ) console.log('%cWAYPOINT', 'color:'+app.console.color.waypoint, $waypoint.selector, data )

      })

    }
  }




  /**
   * Scroller
   *
   * init
   * onScroll
   * requestTick
   * update
   */
  app.scroller = {

    debug : false,
    last_known_y : 0,
    previous_y   : 0,
    stage_height : 0,
    ticking : false,

    /**
     * Init
     */
    init: function() {
      var _this = app.scroller;

      window.addEventListener('scroll', _this.onScroll.bind(this), false)
      window.addEventListener('resize', function() {
        _this.stage_height = $(window).height()
      }, false)
    },

    /**
     * On Scroll
     */
    onScroll: function() {
      var _this = app.scroller;

      _this.last_known_y = window.pageYOffset;
      _this.requestTick()
    },

    /**
     * Request Tick
     */
    requestTick: function() {

      var _this = app.scroller;

      if( !_this.ticking ) {
        window.requestAnimationFrame( _this.update.bind(this) )
      }
      _this.ticking = true;
    },

    /**
     * Update
     */
    update: function() {

      var _this     = app.scroller,
          direction = {},
          y         = _this.last_known_y;

      _this.ticking = false;

      direction.down = ( _this.previous_y > y ) ? false : true;
      direction.up   = ( _this.previous_y < y ) ? false : true;


      /**
       * Animation Functions
       * Call animation frame functions here
       */



      // Log {direction} and posY
      if ( _this.debug ) console.log('%cEVENT', 'color:'+app.console.color.event, ' requestAnimationFrame', {
        'up'     : direction.up,
        'down'   : direction.down,
        'pageY'  : y
      } )

      // Increment Y Pos
      _this.previous_y = y;
    }

  }


  /**
   * Animations
   */
  app.animations = {

    $el : {

    },

    /**
     * Initialize
     */
    init: function() {
     },

    /**
     * Animations to fire on window.load
     * Calls in the window.onload event
     */
    onWindowLoad: function() {


    },


  }




  /**
   * Nav scroll
   */
  // app.stickyHeader = {


  // }

  /**
   * Sticky header - hide on scroll down
   */
  var didScroll;
  var lastScrollTop = 0;
  var delta         = 50;
  var navbarHeight  = $('.hero').outerHeight();

  $(window).scroll(function(event){
    didScroll = true;
  });

  setInterval(function() {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  function hasScrolled() {
    var st = $(this).scrollTop()
    var navbarHeight  = $('#nav').outerHeight();

    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
      return;

    // console.log('st', st)
    // console.log('navbarHeight', navbarHeight)

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.

    if( $('#nav').hasClass('nav--open') )
      return;

    if (st > lastScrollTop && st > navbarHeight){
      // Scroll Down
      $('#nav').removeClass('nav--show').addClass('nav--hide');
    } else {
      // Scroll Up
      if(st + $(window).height() < $(document).height()) {
        $('#nav').removeClass('nav--hide').addClass('nav--show');
      }
    }

    lastScrollTop = st;


    if( st == 0 ) {
      $('#nav').removeClass('nav--show')
    }
  }



  /**
   * Loader
   */
  app.loader = {

    show : function() {
      app.$el.body.addClass('body--loading')
    },

    hide: function() {
      app.$el.body.removeClass('body--loading')
    }
  }





















  /**
   *
   *
   * ---------------
   * Private Methods
   * ---------------
   *
   *
   */


  /**
   * Inject Script
   *
   * @param  {String} url
   */
  function injectScript(url) {

    var script        = document.createElement('script');
        script.async  = true;
        script.src    = url;

    document.body.appendChild(script);
  }


  /**
   * Scroll To Element
   *
   * @param  {Object} options
   */
  function scrollToElement(options){

    var duration  = options.duration || 250,
        easing    = options.easing || 'swing',
        offset    = options.offset || 0;

    var target    = options.target || false;

    if(target){
      if(/(iPhone|iPod)\sOS\s6/.test(navigator.userAgent)){
        $('html, body').animate({
          scrollTop: $(target).offset().top
        }, duration, easing);
      } else {
        $('html, body').animate({
          scrollTop: $(target).offset().top - (offset)
        }, duration, easing);
      }
    }
  }

  /**
   * Get Browser Name
   *
   * @return {String}
   */
  function getBrowserName() {
    var ua= navigator.userAgent, tem,
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\bOPR\/(\d+)/)
        if(tem!= null) return 'Opera '+tem[1];
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);

    if ( M[0].length > 0 ) {
      return M[0].toLowerCase();
    } else {
      return false;
    }

  }

  /**
   * Detect if IE
   *
   * @return {Boolean}
   */
  function isIE() {

    var undef,rv = -1; // Return value assumes failure.
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var trident = ua.indexOf('Trident/');

    if (msie > 0) {
      // IE 10 or older => return version number
      rv = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
      console.log( rv )
    } else if (trident > 0) {
      // IE 11 (or newer) => return version number
      var rvNum = ua.indexOf('rv:');
      rv = parseInt(ua.substring(rvNum + 3, ua.indexOf('.', rvNum)), 10);
      console.log( rv )
    } else {
      return false;
    }

    return ((rv > -1) ? rv : undef);
  }

  /**
   * Prevent Default Shim
   *
   * @param  {Object} e event
   */
  function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
    e.preventDefault();
    e.returnValue = false;
  }

  /**
   * Add Event Listeners
   * Add multiple event listeenrs
   *
   * @param {Object}   el - element (window, document)
   * @param {String}   s  - selector
   * @param {Function} fn - function to call
   */
  function addEventListeners(el, s, fn) {
    var evts = s.split(' ');
    for (var i=0, iLen=evts.length; i<iLen; i++) {
      el.addEventListener(evts[i], fn, false);
    }
  }


  /**
   * Remove Class Prefix
   *
   * @param  {String} prefix
   */
  $.fn.removeClassPrefix = function(prefix) {
    this.each(function(i, el) {
      var classes = el.className.split(" ").filter(function(c) {
          return c.lastIndexOf(prefix, 0) !== 0;
      });
      el.className = $.trim(classes.join(" "));
    });
    return this;
  };

  function isMobile() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      return true;

      console.log('is mobile')
    }
  }






  /**
   * Sticky header - hide on scroll down
   */
  var didScroll;
  var lastScrollTop = 0;
  var delta         = 50;
  var navbarHeight  = $('.hero').outerHeight();

  $(window).scroll(function(event){
    didScroll = true;
  });

  setInterval(function() {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  function hasScrolled() {
    var st = $(this).scrollTop()
    var navbarHeight  = $('#header').outerHeight();

    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
      return;

    // console.log('st', st)
    // console.log('navbarHeight', navbarHeight)

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
      // Scroll Down
      $('header').removeClass('header--show').addClass('header--hide');
    } else {
      // Scroll Up
      if(st + $(window).height() < $(document).height()) {
          $('header').removeClass('header--hide').addClass('header--show');
      }
    }

    lastScrollTop = st;


    if( st == 0 ) {
      $('header').removeClass('header--show')
    }
  }


  /**
   * Hero White - color header 
   */

  if ( $( '.hero' ).hasClass( "hero--alt" ) ) {
    $('body').addClass('body--header-gray');
  }

  if ( $( '.single-content' ).hasClass( "single-header" ) ) {
    $('body').addClass('body--header-gray');
  }


// Thank you modal
//    $(function() {
//       //----- OPEN
//       $('[data-popup-open]').on('click', function(e)  {
//           var targeted_popup_class = $(this).attr('data-popup-open');
//           $('[data-popup="' + targeted_popup_class + '"]').fadeIn(10);
   
//           e.preventDefault();
//       });
   
//       //----- CLOSE
//       $('[data-popup-close]').on('click', function(e)  {
//           var targeted_popup_class = $(this).attr('data-popup-close');
//           $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
//           e.preventDefault();
//       });

//   }); 

// /**
//  * Move all .popups to a #modal-bay on page load to combat z-index bullshit
//  */
// var $modalBay = $('#modal-bay');
// var $popups   = $('.popup');

// $.each( $popups, function(i, item) {
//   console.log(i, item)
//   $(item).appendTo( $modalBay )
// })


   $(function() {
      //----- OPEN
        $( ".donately-submit" ).click(function(e) {
          $(".pop-1").fadeIn(100);
          e.preventDefault();
        });
   
      //----- CLOSE
      $('[data-popup-close]').on('click', function(e)  {
          var targeted_popup_class = $(this).attr('data-popup-close');
          $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
          e.preventDefault();
      });

  }); 



// $( ".donately-submit" ).click(function() {
//   $(".pop-1").fadeIn(100);
// });
  /**
   *
   *
   * ---------------
   * Event Listeners
   * ---------------
   *
   *
   */







  /**
   * EVENT: Document Ready
   * @jquery - $(document).ready(function(){  })
   */
  document.addEventListener('DOMContentLoaded', function (event) {

    app.init()


  })

  /**
   * EVENT: Window Load
   * @jquery - $(window).load(function(){  })
   */
  window.addEventListener('load', function (event) {

    app.animations.onWindowLoad()

  })


  /**
   * EVENT(S): Window Scroll, Window Resize, Window OrientationChange
   * Set _w vars in a multi-listener
   */
  addEventListeners(window, 'scroll resize orientationchange', function (event) {

    _w.w = window.outerWidth,
    _w.h = window.outerHeight,
    _w.t = document.documentElement.scrollTop || document.body.scrollTop,
    _w.l = document.documentElement.scrollLeft || document.body.scrollLeft;

  })

  /**
   * EVENT(S): Window Scroll, Window Resize
   * @jquery - $(window).scroll(function(){  })
   */

  window.addEventListener('scroll', function (event) {

    if ( app.debug.events['window'].scroll && app.config.debug ) {
      console.log('%cEVENT', 'color:'+app.console.color.event, ' window.scroll ', _w)
    }

  })


  /**
   * EVENT: Document Ready
   * $(window).resize(function(){   }).trigger('resize')
   */
  window.addEventListener('resize', function (event) {

    if ( app.debug.events['window'].resize && app.config.debug ) {
      console.log('%cEVENT', 'color:'+app.console.color.event, ' window.resize ', _w)
    }

  })




  /**
   * EVENT: Window Orientation Change
   * $(window).on('orientationchange', function(){   })
   */
  if ( screen ) {
    window.addEventListener('orientationchange', function (event) {

      _s.w = screen.availWidth,
      _s.h = screen.availHeight,
      _s.o = screen.orientation.type;

    })
  }






  return app;
})(jQuery);





/**
 * Donate Form REFACTORING
 * @note   - this is incomplete according to note in UWD, where this is based from
 * @author -  Alexander Zizzo
 */
!(function ($) {



  /**
   * Donate
   * @type {Object}
   */
  var donate = {}


  /**
   * Elements
   */
  var $forms = {
    interval : $('#intervalDonateForm')
  }
  var $el = {

  }



  /**
   * Init
   */
  donate.init = function() {

  }

  donate.init()

  return donate;

})(jQuery);


/* DONATION FORMS
 - This is needed on any page that has a donately form...
 - /donate
  */


if(typeof jQuery == 'undefined') {
    console.log('%cERROR', 'color:red', ' - jQuery not found.')
} else {


!(function ($) {
     var priceInterval ='#intervalDonateForm .input-price-options label',
     inputAmountID ='#donationAmount',
     priceCircle ='.info .circle';


     //Update Amount input when price is clicked
     $(priceInterval).click(function() {
               var newAmount = $(this).prev('input').val();
               $(inputAmountID).val(newAmount);
     });

     //Update Amount input when circle is clicked
     $(priceCircle).click( function() {

          var newAmount = $(this).find('.stat-center span').html(),
          newInt = parseInt(newAmount);

          //change donation amount
          $(inputAmountID).val(newInt);

          //check all radio options
          $('.input-price-options input').each( function() {
               if ( $(this).val() == newAmount){
                    //highlight the one that matches the circle value
                    $(this).prop('checked', true);
               }
          });

          //remove circle highlight
          $(priceCircle).removeClass('active');
          $(this).addClass('active');
     });

     //remove selected state of Price Interval box
     function removePriceSelection(){
          $('.input-price-options input').prop('checked', false);
     }

     //when Enter Amount is clicked
     $(inputAmountID).click( function(){
          removePriceSelection()
     });

     //Updates stats bases on which row is clicked (Education, Health, Income)
     $('#tabs .options li').click( function(){

          var $this         = $(this),

          stat1         = $this.data('stat-1'),
          label1         = $this.data('label-1'),

          stat2         = $this.data('stat-2'),
          label2         = $this.data('label-2'),

          stat3         = $this.data('stat-3'),
          label3         = $this.data('label-3'),

          donately_id = $this.data('donately-id');

          //remove highlight
          $('#tabs .options li').removeClass('active');

          //highlight option
          $(this).addClass('active');


          //Unhighlight Price selected intervals
          removePriceSelection();


          //Update title, stats and labels on lefthand side
          $('#stat-1').text(stat1);
          $('#stat-2').text(stat2);
          $('#stat-3').text(stat3);

          $('#label-1').text(label1);
          $('#label-2').text(label2);
          $('#label-3').text(label3);

          //Update Price Interval boxes
          $('#priceInterval1 input').val(stat1);
          $('#priceInterval1 label').text('$'+stat1);

          $('#priceInterval2 input').val(stat2);
          $('#priceInterval2 label').text('$'+stat2);

          $('#priceInterval3 input').val(stat3);
          $('#priceInterval3 label').text('$'+stat3);
     });

/**
 * Recording Form Entries
 */
    //Set amount variable to initial load amount
     var amount         = (''),
         firstName      = (''),
         lastName       = (''),
         emailAddress   = (''),
         newFrequency   = $('input[name="recurring"]:checked').val(),
         duration       = (1),
         frequency      = ('only_recurring')

    //Record Amount Choice
    $('input[name="donate-amount"]').click(function(){
      amount = $(this).val()
      // console.log(amount);
    });

    //Record Custom Amount Choice
    $('#donationAmount').keyup(function (event) {
      var customPrice = $(this).val()
      amount = customPrice
      // console.log('keyup', customPrice)
      // console.log(amount);
    });

    //Record Name Entry
    $('#firstName').keyup(function (event) {
        firstName = $(this).val()
        // console.log(firstName);
    });

    $('#lastName').keyup(function (event) {
        lastName = $(this).val()
        // console.log(lastName);
    });

    //Record Email Entry
    $('#emailAddress').keyup(function (event) {
        emailAddress = $(this).val()
        // console.log(emailAddress);
    });

    //Record Duration Selection
    $('input[name="recurring"]').click(function(){
        // duration = $(this).val()
        // console.log(duration);

        // if (duration == 1) {
        //   frequency = ('only_recurring')
        // }else {
        //   frequency = ('only_onetime')
        // }

        // console.log(frequency);

    });

    //Submit form to donately and load donately form
    $('.btn--enter').click(function(e) {
      e.preventDefault();
      // console.log('init');
      $(".form--donate").addClass('hidden');
      $(".donation--form").removeClass('hidden');
      $(".donation--form").addClass('show');

      //Update amount with the most recent amount
      var newAmount = $('#donationAmount').val()
      amount = newAmount
      console.log(amount);


        // console.log('Donately', amount, firstName, lastName, emailAddress, frequency)
        Donately.init({
          selector: '.donation--form',
          options: {
            'donately-id':'act_0d5c691b436d',
            'stripe-publishable-key': 'pk_live_muntVyKjL66TXN2qi0E4LrLK', 
            'donately-amount': amount,
            // 'donately-duration': frequency,
            'donately-billing-zip': true,
            'donately-custom-css': '{"label.donately-label[for=donately-first-name]":{"display": "none"},"label.donately-label[for=donately-zip-code]":{"display": "none"},"label.donately-label[for=donately-last-name]":{"display": "none"},"label.donately-label[for=donately-email]":{"display": "none"}, "input.donately-text-input":{"box-shadow": "none", "border": "2px solid #ebeaed", "border-top-color": "none", "border-left-color": "none", "border-right-color": "none", "border-radius": "none"},"#fees_description":{"font-size":"1.1em","font-weight":"bold"},".donately-btn":{"background-color": "#f36e57 !important;", "text-transform":"uppercase","font-family":"roboto","font-size":"13px","font-weight":"700","border-radius":"0px","padding":"20px 50px"},".donately-btn:hover":{"background-color": "#f36e57 !important;"},".donately-radio-option:last-child input":{"margin-left":"0px"},".donately-donation-form":{"padding":"20px"},"label.donately-label, .donately-custom-fields section":{"font-size":"1em","font-family":"roboto"},".donately-donation-form":{"font-family":"roboto", "padding-top": "60px", "padding-bottom": "51px", "padding-left": "45px", "padding-right": "45px"}, "donately-donation-form":{"height": "728px !important"}}'
          },

          afterFormLoad: function() {
            Donately.thank_you_message    = "Thank you for your {{formatted_amount}} donation! Your donation changes the odds for everyone around us.";
            Donately.social_share_message = "Keep up the good work by sharing your contribution!";

            $('#donately-first-name').val(firstName)
            $('#donately-last-name').val(lastName)
            $('#donately-email').val(emailAddress)
            // $('donately-duration').val(frequency)
            if(newFrequency == 1){
                 $('#donately-recurring-donation').prop('checked', true);
                 $('#donately-one-time-donation').prop('checked', false);
            } else{
                 $('#donately-one-time-donation').prop('checked', true);
                 $('#donately-recurring-donation').prop('checked', false);
            }   
          }
        })

    });


})(jQuery);





};
