import '../style.scss';

(function () {
    // init controller
    var fadingElements = document.querySelectorAll('.fading');
    var controller = new ScrollMagic.Controller();

    var parallaxMasthead = new ScrollMagic.Scene({
            triggerElement: '.bgc-parallax',
            triggerHook: 0,
            duration: '100%',
        })
        .setTween(TweenMax.to('.masthead', 1, {
            y: '-50%',
            ease: Power0.easeNone
        }))
        .addTo(controller);
    
    var parallaxCar = new ScrollMagic.Scene({
            triggerElement: '.bgc-parallax.car',
            triggerHook: 0.6,
            duration: '100%',
        })
        .setTween(TweenMax.to('.old-car', 1, {
            y: '-30%',
            ease: Power0.easeNone
        }))
        .addTo(controller);

    fadingElements.forEach(function (element) {
        new ScrollMagic.Scene({
                triggerElement: element,
                // duration: '100%',
                // offset: -50 // start this scene after scrolling for 50px
                triggerHook: 0.8,
                reverse: false,
            })
            .setClassToggle(element, 'fade-active')
            // .addIndicators({
            //     name: 'fade scene',
            //     color: 'black',
            //     // indent: 200,
            //     colorStart: '#75C695',
            //     colorEnd: 'pink',
            // })
            .addTo(controller);
    }, this);
})();