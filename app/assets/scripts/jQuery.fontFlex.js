// jQuery extension for dynamic font sizes
// Source: github.com/NathanRutzky/jQuery.fontFlex
// Version: 1.0
(function($) {
    $.fn.fontFlex = function(min, max, mid) {
        var $this = this;
        $(window).resize(function() {
            var size = Math.floor(window.innerWidth / mid);
            console.log('size < min ' , size < min, ' use: min', min);
            console.log('size > max ' , size > max, ' use: min', max);
            if (size < min) size = min;
            if (size > max) size = max;
            console.log('use: size', size);
            $this.css('font-size', size + 'px');
        }).trigger('resize');
    };
})(jQuery);