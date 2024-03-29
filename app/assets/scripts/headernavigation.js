// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight();
var interval;

(function() {

    'use strict';

    function headernavigation() {

        console.log('headernavigation js loaded');

        var newStickies = new stickyTitles(jQuery(".followMeBar"));
        newStickies.load();
        jQuery(window).on("scroll", function() {
            newStickies.scroll();
        });
        
        // check is main menu open
        $('#menu__main').on('show.bs.collapse', function () {
            stopCheck();
            setPosToRelative();
        })

        $('#menu__main').on('hide.bs.collapse', function () {
            startCheck();
            rvPosToRelative();
        });

        /* check main menu */
        $('#menu__personal').on('show.bs.collapse', function (e) {
            console.log(e);
        });
        $('#menu__guide').on('show.bs.collapse', function (e) {
            console.log(e);
        });
        $('#menu__basket').on('show.bs.collapse', function (e) {
            console.log(e);
        });
        $('#menu__search').on('show.bs.collapse', function (e) {
            console.log(e);
        });
        /* end / check main menu */

    }

    headernavigation();

}());

/* hide / show logic */
$(window).scroll(function(event){
    didScroll = true;
});

startCheck();

function setPosToRelative(){
    $('body > header').css('position','relative');
}
function rvPosToRelative(){
    $('body > header').removeAttr('style');
}

function startCheck(){
    interval = setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);
}
function stopCheck(){
    clearInterval(interval);
}

function hasScrolled() {
    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        /*if( navbarMenuIsOpen == 0 )$('header').removeClass('nav-down').removeClass('nav-top').addClass('nav-up');
        else $('header').removeClass('nav-down').removeClass('nav-top').addClass('nav-up');*/
        $('header').removeClass('nav-down').removeClass('nav-top').addClass('nav-up');
    }
    else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('header').removeClass('nav-up').addClass('nav-down');
        }
        if(st == 0) {
            $('header').removeClass('nav-down nav-up').addClass('nav-top');
        }

    }

    lastScrollTop = st;
}

/* sticky title */
function stickyTitles(stickies) {

    this.load = function() {
        stickies.each(function(){
            var thisSticky = jQuery(this).wrap('<div class="followWrap" />');
            thisSticky.parent().height(thisSticky.outerHeight());
            jQuery.data(thisSticky[0], 'pos', thisSticky.offset().top);
        });
    }

    this.scroll = function() {
        stickies.each(function(i){
            var thisSticky = jQuery(this),
                nextSticky = stickies.eq(i+1),
                prevSticky = stickies.eq(i-1),
                pos = jQuery.data(thisSticky[0], 'pos');

            if (pos <= jQuery(window).scrollTop()) {
                thisSticky.addClass("fixed");
                if (nextSticky.length > 0 && thisSticky.offset().top >= jQuery.data(nextSticky[0], 'pos') - thisSticky.outerHeight()) {
                    thisSticky.addClass("absolute").css("top", jQuery.data(nextSticky[0], 'pos') - thisSticky.outerHeight());
                }
            } else {
                thisSticky.removeClass("fixed");
                if (prevSticky.length > 0 && jQuery(window).scrollTop() <= jQuery.data(thisSticky[0], 'pos')  - prevSticky.outerHeight()) {
                    prevSticky.removeClass("absolute").removeAttr("style");
                }
            }
        });
    }
}
