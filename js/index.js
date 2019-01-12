
(function($) {
    "use strict";
    $(function(){

        /* 01: Main menu
        ==============================================*/

        $('.header-menu a[href="#"]').on('click', function(event) {
            event.preventDefault();
        });

        $(".header-menu").menumaker({
            title: '<i class="fa fa-bars"></i>',
            format: "multitoggle"
        });

        var mainHeader = $('.main-header');
        
        if(mainHeader.length) {
            var sticky = new Waypoint.Sticky({
                element: mainHeader[0]
            });
        }

        
        /* 02: Background image
        ==============================================*/

        var bgImg = $('[data-bg-img]');

        bgImg.css('background', function(){
            return 'url(' + $(this).data('bg-img') + ') center center';
        });


        /* 03: Parsley form validation
        ==============================================*/

        $('.parsley-validate, .parsley-validate form').parsley();


        /* 04: Smooth scroll for comment reply
        ==============================================*/
        
        var $commentContent = $('.comment-content > a');
        
        $commentContent.on('click', function(event){
            event.preventDefault();
            var $target = $('.comment-form');
            
            if ( $target.length ) {
                $('html, body').animate({
                    scrollTop: $target.offset().top - 120
                }, 500);

                $target.find('textarea').focus();
            }
        });

        
        /* 05: Main slider
        ==============================================*/
        
            var mainSlider = new Swiper('.main-slider', {
                loop: true,
                spaceBetween: 1,
                speed: 500,
                autoplay: {
                    delay: 5000,
                },
                pagination: {
                    el: '.main-slider-pagination',
                    clickable: true,
                }
            });

            mainSlider.on('slideChangeTransitionStart', function () {
                var $el = $(this.slides[ this.activeIndex ]),
                    $animate = $el.find('[data-animate]');

                $animate.each(function () {
                    var $t = $(this);

                    $t.removeClass( 'animated ' + $t.data('animate') );
                });
            }).on('slideChangeTransitionEnd', function () {
                var $el = $(this.slides[ this.activeIndex ]),
                    $animate = $el.find('[data-animate]');

                $animate.each(function () {
                    var $el = $(this),
                        $duration = $el.data('duration'),
                        $delay = $el.data('delay');

                    $duration = typeof $duration === 'undefined' ? '0.6' : $duration;
                    $delay = typeof $delay === 'undefined' ? '0' : $delay;

                    $el.addClass( 'animated ' + $el.data('animate') ).css({
                        'animation-duration': $duration + 's',
                        'animation-delay': $delay + 's'
                    });
                });
            });

        
        /* 06: Review slider
        ==============================================*/
        
        var reviewSlider = new Swiper('.review-slider', {
            spaceBetween: 30,
            speed: 500,
            autoplay: {
                delay: 5000,
                disableOnInteraction: true,
            },
            navigation: {
                prevEl: '.prev-review',
                nextEl: '.next-review',
            }
        });

        
        /* 07: Team carousel
        ==============================================*/
        
        var reviewSlider = new Swiper('.team-carousel', {
            slidesPerView: 4,
            spaceBetween: 30,
            speed: 500,
            autoplay: {
                delay: 5000,
                disableOnInteraction: true,
            },
            navigation: {
                prevEl: '.prev-member',
                nextEl: '.next-member',
            },
            breakpoints: {
                // when window width is <= 991px
                991: {
                    slidesPerView: 3
                },
                // when window width is <= 767px
                767: {
                    slidesPerView: 2
                },
                // when window width is <= 575px
                575: {
                    slidesPerView: 1
                }
            }
        });

        
        /* 08: News slider
        ==============================================*/
        
        var reviewSlider = new Swiper('.news-carousel', {
            slidesPerView: 3,
            spaceBetween: 30,
            speed: 500,
            autoplay: {
                delay: 5000,
                disableOnInteraction: true,
            },
            pagination: {
                el: '.news-pagination',
                clickable: true,
            },
            breakpoints: {
                // when window width is <= 991px
                991: {
                    slidesPerView: 2
                },
                // when window width is <= 767px
                767: {
                    slidesPerView: 1
                }
            }
        });

        
        /* 09: Pricing carousel
        ==============================================*/
        
        var reviewSlider = new Swiper('.pricing-carousel', {
            slidesPerView: 3,
            spaceBetween: 30,
            speed: 500,
            autoplay: {
                delay: 5000,
                disableOnInteraction: true,
            },
            pagination: {
                el: '.pricing-pagination',
                clickable: true,
            },
            breakpoints: {
                // when window width is <= 991px
                991: {
                    slidesPerView: 2
                },
                // when window width is <= 767px
                767: {
                    slidesPerView: 1
                }
            }
        });

        
        /* 10: Service Carousel
        ==============================================*/
        
        var reviewSlider = new Swiper('.service-carousel', {
            slidesPerView: 4,
            spaceBetween: 30,
            speed: 500,
            autoplay: {
                delay: 5000,
                disableOnInteraction: true,
            },
            navigation: {
                prevEl: '.prev-service',
                nextEl: '.next-service',
            },
            breakpoints: {
                // when window width is <= 991px
                991: {
                    slidesPerView: 3
                },
                // when window width is <= 767px
                767: {
                    slidesPerView: 2
                },
                // when window width is <= 767px
                575: {
                    slidesPerView: 1
                }
            }
        });

        
        /* 11: Service Includes Carousel
        ==============================================*/
        
        var reviewSlider = new Swiper('.includes-carousel', {
            slidesPerView: 5,
            spaceBetween: 30,
            speed: 500,
            autoplay: {
                delay: 5000,
                disableOnInteraction: true,
            },
            navigation: {
                prevEl: '.prev-inc-car',
                nextEl: '.next-inc-car',
            },
            breakpoints: {
                // when window width is <= 1199px
                1199: {
                    slidesPerView: 4
                },
                // when window width is <= 991px
                991: {
                    slidesPerView: 3
                },
                // when window width is <= 767px
                767: {
                    slidesPerView: 2
                },
                // when window width is <= 575px
                575: {
                    slidesPerView: 1
                }
            }
        });

        
        /* 12: Single Product slider
        ==============================================*/
        var $productGallery = $('.product-gallery'),
            $productThumbs = $('.product-thumbs');

        if ( $productGallery.length ) {
            var productPreview = new Swiper($productGallery[0], {
                spaceBetween: 1,
                touchRatio: 0,
                pagination: {
                    el: '.product-gallery-pagination',
                    clickable: false,
                }
            });

            var productThumbs = new Swiper($productThumbs[0], {
                spaceBetween: 10,
                slidesPerView: 3,
                slideToClickedSlide: true
            });

            $productThumbs.on('click', '.swiper-slide', function (e) {
                var $t = $(this);

                productPreview.slideTo( $t.index() );

                $t.addClass('active').siblings().removeClass('active');
            });
        }

        
        /* 13: Google map
        ==============================================*/


                var $map = $('#map'),
            setMap = function () {
                var map = new google.maps.Map($map[0], {
                    center: {lat: $map.data('map-latitude'), lng: $map.data('map-longitude')},
                    zoom: $map.data('map-zoom'),
                    scrollwheel: false,
                    disableDefaultUI: true,
                    zoomControl: true,
                    styles: [{
                                "featureType": "all",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "saturation": 36
                                    },
                                    {
                                        "color": "#000000"
                                    },
                                    {
                                        "lightness": 40
                                    }
                                ]
                            },
                            {
                                "featureType": "all",
                                "elementType": "labels.text.stroke",
                                "stylers": [
                                    {
                                        "visibility": "on"
                                    },
                                    {
                                        "color": "#000000"
                                    },
                                    {
                                        "lightness": 16
                                    }
                                ]
                            },
                            {
                                "featureType": "all",
                                "elementType": "labels.icon",
                                "stylers": [
                                    {
                                        "visibility": "off"
                                    }
                                ]
                            },
                            {
                                "featureType": "administrative",
                                "elementType": "geometry.fill",
                                "stylers": [
                                    {
                                        "color": "#000000"
                                    },
                                    {
                                        "lightness": 20
                                    }
                                ]
                            },
                            {
                                "featureType": "administrative",
                                "elementType": "geometry.stroke",
                                "stylers": [
                                    {
                                        "color": "#000000"
                                    },
                                    {
                                        "lightness": 17
                                    },
                                    {
                                        "weight": 1.2
                                    }
                                ]
                            },
                            {
                                "featureType": "landscape",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#000000"
                                    },
                                    {
                                        "lightness": 20
                                    }
                                ]
                            },
                            {
                                "featureType": "poi",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#000000"
                                    },
                                    {
                                        "lightness": 21
                                    }
                                ]
                            },
                            {
                                "featureType": "road.highway",
                                "elementType": "geometry.fill",
                                "stylers": [
                                    {
                                        "color": "#000000"
                                    },
                                    {
                                        "lightness": 17
                                    }
                                ]
                            },
                            {
                                "featureType": "road.highway",
                                "elementType": "geometry.stroke",
                                "stylers": [
                                    {
                                        "color": "#000000"
                                    },
                                    {
                                        "lightness": 29
                                    },
                                    {
                                        "weight": 0.2
                                    }
                                ]
                            },
                            {
                                "featureType": "road.arterial",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#000000"
                                    },
                                    {
                                        "lightness": 18
                                    }
                                ]
                            },
                            {
                                "featureType": "road.local",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#000000"
                                    },
                                    {
                                        "lightness": 16
                                    }
                                ]
                            },
                            {
                                "featureType": "transit",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#000000"
                                    },
                                    {
                                        "lightness": 19
                                    }
                                ]
                            },
                            {
                                "featureType": "water",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#000000"
                                    },
                                    {
                                        "lightness": 17
                                    }
                                ]
                            }
                         ]
                });
                
                if ( typeof $map.data('map-marker') !== 'undefined' ) {
                    var data = $map.data('map-marker'),
                        i = 0;

                    for ( i; i < data.length; i++ ) {
                        new google.maps.Marker({
                            position: {lat: data[i][0], lng: data[i][1]},
                            map: map,
                            animation: google.maps.Animation.DROP,
                            draggable: true
                        });
                    }
                }
            };
        
        if ( $map.length ) {
            $map.css('height', 400);
            
            setMap();
        }

        
        /* 14: Back to top button
        ==============================================*/

        var $backToTopBtn = $('.back-to-top');

        if ($backToTopBtn.length) {
            var scrollTrigger = 400, // px
            backToTop = function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $backToTopBtn.addClass('show');
                } else {
                    $backToTopBtn.removeClass('show');
                }
            };

            backToTop();

            $(window).on('scroll', function () {
                backToTop();
            });

            $backToTopBtn.on('click', function (e) {
                e.preventDefault();
                $('html,body').animate({
                    scrollTop: 0
                }, 700);
            });
        }

        
        /* 15: Increase/Decrease Product quantity
        ==============================================*/

        $('.plus').on('click',function(){
            var $qty=$(this).parent().find('input');
            var currentVal = parseInt($qty.val());
            if (!isNaN(currentVal)) {
                $qty.val(currentVal + 1);
            }
        });
        $('.minus').on('click',function(){
            var $qty=$(this).parent().find('input');
            var currentVal = parseInt($qty.val());
            if (!isNaN(currentVal) && currentVal > 1) {
                $qty.val(currentVal - 1);
            }
        });

        
        /*16: Isotope for Blog
        ==============================================*/

        $('.isotope').isotope({
            itemSelector: '.isotope > div'
        });


        /* 17: Changing svg color
        ==============================================*/

        jQuery('img.svg').each(function(){
            var $img = jQuery(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');
        
            jQuery.get(imgURL, function(data) {
                // Get the SVG tag, ignore the rest
                var $svg = jQuery(data).find('svg');
        
                // Add replaced image's ID to the new SVG
                if(typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if(typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass+' replaced-svg');
                }
        
                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');
                
                // Check if the viewport is set, else we gonna set it if we can.
                if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                    $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
                }
        
                // Replace image with new SVG
                $img.replaceWith($svg);
        
            }, 'xml');
        });

        /* 18: Ajax Contact Form
        ==============================================*/

        $('.contact-form').on('submit', 'form', function(e) {
            e.preventDefault();

            var $el = $(this);

            $.post($el.attr('action'), $el.serialize(), function(res){
                res = $.parseJSON( res );
                $el.parent('.contact-page-form').find('.form-response').html('<span>' + res[1] + '</span>');
            });
        });

        /* 19: Intro item height
        ==============================================*/

        function pageItemHeight(){
            $('.page-image').height(
                function(){
                    return $(this).width();
                }
            );
        }

        pageItemHeight();
        
        $(window).resize( function(){
            pageItemHeight();
        });

        /* 
        20:partner slider activation
        =======================================================*/

         var partnerSlider = new Swiper('.partner-slider', {
            loop: true,
            slidesPerView: 4,
            spaceBetween: 70,
            speed: 500,
            autoplay: {
                delay: 5000,
                disableOnInteraction: true,
            },
             breakpoints: {
                // when window width is <= 1199px
                1199: {
                    slidesPerView: 3
                },
                // when window width is <= 991px
                991: {
                    slidesPerView: 5
                },
                // when window width is <= 767px
                767: {
                    slidesPerView: 4
                },
                // when window width is <= 767px
                575: {
                    slidesPerView: 1
                }
            }
        });
    });

    
    /* 21: Preloader
    ==============================================*/

    $(window).on('load', function(){

        function removePreloader() {
            var preLoader = $('.preLoader');
            preLoader.fadeOut();
        }
        setTimeout(removePreloader, 250);
    });


    /* 22: Content animation
    ==============================================*/

    $(window).on('load', function(){

        var $animateEl = $('[data-animate]');

        $animateEl.each(function () {
            var $el = $(this),
                $name = $el.data('animate'),
                $duration = $el.data('duration'),
                $delay = $el.data('delay');

            $duration = typeof $duration === 'undefined' ? '0.6' : $duration ;
            $delay = typeof $delay === 'undefined' ? '.1' : $delay ;

            $el.waypoint(function () {
                $el.addClass('animated ' + $name)
                   .css({
                        'animation-duration': $duration + 's',
                        'animation-delay': $delay + 's'
                   });
            }, {offset: '93%'});
        });

    });



        /* 23: Isotope instalation
==================================================*/
    $(window).on('load', function(){
        $('.gallery-item').isotope({
                itemSelector: '.grid-item',
                percentPosition: true,
                masonry: {
                    columnWidth: '.grid-item'
                }
            });

            $('.gallery_filter li').on('click', function () {
                $(this).addClass('active').siblings().removeClass('active');
                var filterValue = $(this).attr('data-filter');
                $('.grid').isotope({
                    filter: filterValue
                });
            });
        }); 


    /*24 filter slider
    =================================================*/
    $( function() {
        $( "#slider-range" ).slider({
          range: true,
          min: 0,
          max: 99,
          values: [ 0, 99 ],
          slide: function( event, ui ) {
            $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
          }
        });
        $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
          " - $" + $( "#slider-range" ).slider( "values", 1 ) );
      } );


       /*25: product Slider activation
       ===========================================*/
         var $productGallery = $('.product-gallery'),
            $productThumbs = $('.product-thumbs');

        if ( $productGallery.length ) {
            var productPreview = new Swiper($productGallery[0], {
                spaceBetween: 1,
                touchRatio: 0,
                pagination: {
                    el: '.product-gallery-pagination',
                    clickable: true,
                }
            });
            var productThumbs = new Swiper($productThumbs[0], {
                spaceBetween: 10,
                slidesPerView: 3,
                slideToClickedSlide: true
            });
            var swiper = new Swiper('.product-gallery', {
                   pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                  },
                  navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                  },
                }); 
            $productThumbs.on('click', '.swiper-slide', function (e) {
                var $t = $(this);

                productPreview.slideTo( $t.index() );

                $t.addClass('active').siblings().removeClass('active');
            });
        };

     /* 26: light-box instalation
    ==================================================*/
          lightbox.option({
              'resizeDuration': 200,
              'wrapAround': true,
              'fixedNavigation': true,
              'alwaysShowNav' : true,
            })
        
    /*27: Product increment Discriment
    ================================================*/

        $('.plus').on('click',function(){
            var $qty=$(this).parent().find('input');
            var currentVal = parseInt($qty.val());
            if (!isNaN(currentVal)) {
                $qty.val(currentVal + 1);
            }
        });
        $('.minus').on('click',function(){
            var $qty=$(this).parent().find('input');
            var currentVal = parseInt($qty.val());
            if (!isNaN(currentVal) && currentVal > 1) {
                $qty.val(currentVal - 1);
            }
        });


        /* 28: Search option Width add
        =====================================================*/

        $('.header-search input').on('focus', function(){
            $(this).css({'width': '170px'});
            $('.header-menu>ul').css('margin-right', "55px")
        }).on("blur", function(){
            $(this).css('width', '82px');
            $('.header-menu>ul').css('margin-right', "0px")
        });

       


})(jQuery);