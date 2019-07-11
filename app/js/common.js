$(function () {

    // Custom JS

    $(document).ready(function () {

/////////////////////////////////////////////////////////////////////////////


        //START CAROUSEL OWL
        $('#owl-events-1').owlCarousel({
            loop: true, //Зацикливаем слайдер
            margin: 50, //Отступ от элемента справа в 50px
            dots: false,
            nav: true, //Отключение навигации
            navText: ['<div class="owl-nav__prev"></div>', '<div class="owl-nav__next"></div>'],
            autoplay: false, //Автозапуск слайдера
            smartSpeed: 1000, //Время движения слайда
            autoplayTimeout: 2000, //Время смены слайда
            responsive: { //Адаптивность. Кол-во выводимых элементов при определенной ширине.
                0: {
                    items: 1,
                    nav: false,
                    margin: 0
                },
                992: {
                    items: 1,
                    nav: false,
                    margin: 0
                },
                1000: {
                    items: 1,
                    margin: 0,

                }
            }
        });
        //END CAROUSEL OWL

/////////////////////////////////////////////////////////////////////////////

        //START TIMER
        function get_timer() {

            var newDate = "October 6,2019 00:00";
            ////////////////////////////////////
            ////////////////////////////////////

            var targetDate = new Date(newDate);

            var date = new Date();

            var timer = targetDate - date;

            if (targetDate > date) {

                var day = parseInt(timer / (60 * 60 * 1000 * 24));

                if (day < 10) {
                    day = '0' + day;
                }

                day = day.toString();

                var hour = parseInt(timer / (60 * 60 * 1000)) % 24;

                if (hour < 10) {
                    hour = '0' + hour;
                }

                hour = hour.toString();

                var min = parseInt(timer / (1000 * 60)) % 60;

                if (min < 10) {
                    min = '0' + min;
                }

                min = min.toString();


                var sec = parseInt(timer / 1000) % 60;

                if (sec < 10) {
                    sec = '0' + sec;
                }

                sec = sec.toString();

                $('.day').text(day);
                $('.hour').text(hour);
                $('.min').text(min);
                $('.sec').text(sec);

                setTimeout(get_timer, 1000);
            } else {
            }

        }

        get_timer();
        // END TIMER

/////////////////////////////////////////////////////////////////////////////

        //START SMOOTH SCROLLSPY
        // var navHeight;
        // if ($('.header-top')) {
        //     navHeight = ($('.header-top').css('height').slice(0, -2)) * (-1);
        // }
        // if ($("#nav")) {
        //     $("#nav").scrollspy({
        //         activeClass: 'active-li',
        //         offset: navHeight,
        //         animate: true,
        //         duration: 500,
        //
        //     });
        //     window.onscroll = function () {
        //         if (document.scrollingElement.scrollTop === 0) {
        //             $('nav ul li').removeClass('active-li');
        //         }
        //
        //     }
        // }
        //END SMOOTH SCROLLSPY

/////////////////////////////////////////////////////////////////////////////

        //START WOW JS
        var wow = new WOW(
            {
                boxClass: 'wow',      // animated element css class (default is wow)
                animateClass: 'animated', // animation css class (default is animated)
                offset: 0,          // distance to the element when triggering the animation (default is 0)
                mobile: true,       // trigger animations on mobile devices (default is true)
                live: true,       // act on asynchronously loaded content (default is true)
                callback: function (box) {
                    // the callback is fired every time an animation is started
                    // the argument that is passed in is the DOM node being animated
                },
                scrollContainer: null // optional scroll container selector, otherwise use window
            }
        );
        wow.init();
        //END WOW JS

/////////////////////////////////////////////////////////////////////////////

        //START LAZY JS
        $('.lazy').Lazy({
            // your configuration goes here
            scrollDirection: 'vertical',
            effect: 'fadeIn',
            visibleOnly: true,
            onError: function (element) {
                console.log('error loading ' + element.data('src'));
            }
        });
        //END LAZY JS

//////////////////////////////////////////////////////////////////////////////


    });//end ready

});//end main



