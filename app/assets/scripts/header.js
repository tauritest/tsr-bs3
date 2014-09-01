(function() {

    'use strict';

    function header() {

        $("body").on("cloneComplete", function(){
            //put your code here
        });
        cloneRightSideMainMenu();
        collapseOtherContent();
        collapsableMenuForMobile();
        initDropMenu();
        cloneThirdLevelMenu();

        // close all mainmenu opened layers and content top margin when screen size changed
        var closeAllOpenLayersResetContentMargin = function(){
            $('#collapsibleMainMenu-Pages .dropdown').removeClass('open');
            
            //console.log( $('.navbar:nth-child(2) a.navbar-toggle.active'), $('.navbar:nth-child(2) a.navbar-toggle.active').attr('href'));
            var _selector = $('.navbar:nth-child(2) a.navbar-toggle.active').attr('href');
            if( _selector != '#collapsibleMainMenu-Pages') {
                $(_selector).collapse('hide');
            }
            //$('.navbar:nth-child(2) .navbar-toggle').attr('href');
            $('.navbar:nth-child(2)').css({marginTop:0+'px'});
            $('section.content, section.hero').css({marginTop:0+'px'});
            $('section.content, section.hero, .navbar:nth-child(2)').css({marginTop:0+'px'});

        };
        //reCallFuncs.push(closeAllOpenLayersResetContentMargin,collapsableMenuForMobile);
    }
    function collapsableMenuForMobile(){
        if(Modernizr.mq('only screen and (max-width: 767px)')) {
            var _parent = '';
            $('.list-group .has-child > h6').click(function(e){
                var _el = $(e.currentTarget).closest('li');
                if( _parent !== '' ) {
                    if ( _parent.hasClass('open') &&  _parent[0] != _el[0] ) {
                        _parent.toggleClass('open');
                    }
                }
                _el.toggleClass('open');
                _parent = _el;
                e.stopPropagation();
                e.preventDefault();
            });
        }

    }

    function cloneRightSideMainMenu(){
        $('#collapsibleMainMenu-Search').html( $('.collapsibleMainMenu-Search').clone() ).promise().done( function(){ $("body").trigger("cloneComplete"); });
        $('#collapsibleMainMenu-Basket').html( $('.collapsibleMainMenu-Basket').clone() );
        $('#collapsibleMainMenu-Guide').html( $('.collapsibleMainMenu-Guide').clone() );
    }

    /**
        Generating third menu from main menu
    */
    function cloneThirdLevelMenu(){
        var _thrd = $('#collapsibleMainMenu-Pages').find('.navbar-nav').eq(0).find('li.active .dropdown-header');
        var _level3 = $('<nav class="sub-menu hidden-xs" />');
        
        _level3.append($('<div class="container"><h3 class="sr-only">Alamlehed</h3><ul class="list-inline"/></div>'));

        var _list= _level3.find('ul');           
        $.each(_thrd,function(){
            var _a = $(this).find('a').clone();

            $.each(_a, function(i, el) {
                _list.append($('<li />').append(el));
            });

        });

        $('nav.navbar.navbar-default').after(_level3); 
    }

    
    function collapseOtherContent(){

        var _elDrop = $('header div[id*="collapsibleMainMenu"]');
       
        _elDrop.on('show.bs.collapse', function (e) {
            /*if( $('[id^="collapsibleMainMenu-"]').hasClass('in') ){
                $('[id^="collapsibleMainMenu-"]').removeClass('in').addClass('collapse');
                $('[href*="collapsibleMainMenu-"]').removeClass('active');
            }*/
            if( $('[id^="collapsibleMainMenu-Pages"]').hasClass('in') ) {
                $('[id^="collapsibleMainMenu-Pages"]').removeClass('in').addClass('collapse');
                $('[href*="collapsibleMainMenu-"]').removeClass('active');
            }
            $('header .navbar-header').find('[href*="'+this.id+'"]').addClass('active');
            console.log("length:", $('header .navbar-header .pull-right > a.active').length );
            if ( $('header .navbar-header .pull-right > a.active').length > 1 ) {
                console.log('dont rush');
            }
        });
        _elDrop.on('shown.bs.collapse', function (e) {
           // drop code here
        });
        _elDrop.on('hidden.bs.collapse', function (e) {
            $('header .navbar-header').find('[href*="'+this.id+'"]').removeClass('active');
        });
    }

    // 
    function initDropMenu() {
        if(Modernizr.mq('only screen and (max-width: 767px)')) {
            var _activeEl;
            $('header .collapsibleMainMenu h2:not(.title)').each(function(i, el) {
                var _el = $(el);
                _el.click(function(e){

                    $(this).toggleClass('active');
                    $(this).next().toggleClass('active');

                    if( ( _activeEl ) && _activeEl[0] != $(this)[0]) {
                        _activeEl.removeClass('active');
                        _activeEl.next().removeClass('active');    
                    }
                    _activeEl = $(this);
                    e.preventDefault();
                });
            });  
        }
    }
    
    header();

}());