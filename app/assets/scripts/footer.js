(function() {

    'use strict';
    
    function footer() {
        console.log('footer js');

        // social block
		$('.social-block .media > a , footer .list-group > .list-group-item > a').each(function(i, el){
			var _link = $(el).attr('href');
			$(el).parent().click(function(){
                document.location.href=_link;
			});
		});

        //
        reCallFuncs.push( function(){var i = new FooterLinks(); i.init();} );
    }

    footer();
    
}());

// footer links manager
function FooterLinks(){

    this.maxWidth = 'only screen and (max-width: 767px)';
    this.selector = 'footer h2';
    this.init = function(){
        if( Modernizr.mq( this.maxWidth ) ) {
            this.setLinks();
        } else {
            this.unsetLinks();
        }
    };

    this.setLinks = function() {
        var _activeEl;
        $(this.selector).each(function(i, el) {
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
    };

    this.unsetLinks = function() {
        $(this.selector).each(function(i, el){
            $(el).unbind('click');
            $(el).removeClass('active');
            $(el).next().removeClass('active');
        });
    };
}
