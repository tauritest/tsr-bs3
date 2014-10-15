var reCallFuncs = [];
(function() {

    'use strict';
    function main() {
        console.log('main js loaded');

        scrollPageTop();
        createCustomElement(['header','footer']);
        stopPropagation();

        //reDrawVisual();//if screen changed redraw visual
        var oR = new OnResize();
        oR.init();

        //iframeResizer
        /*try {
            $('iframe').iFrameResize([]);

        } catch(e) {
            console.debug(e); 
        }*/

        /* test start */
       /* $('#myModal').on('show.bs.modal', centerModal);
        $(window).on("resize", function () {
            $('.modal:visible').each(centerModal);
        });*/
        /* end / test start */

    }

    main();

}());


/*function centerModal() {
    $(this).css('display', 'block');
    var $dialog = $(this).find(".modal-dialog");
    var offset = ($(window).height() - $dialog.height()) / 2;
    // Center modal vertically in window
    $dialog.css("margin-top", offset);
}*/

function reDrawVisual() {
    var oR = new OnResize();
    oR.init();
}
jQuery(document).ready(function(){
    //detectScreen();
    //reCallFuncs.push(detectScreen);

    /*windows phone fix */
    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
        var msViewportStyle = document.createElement("style");
        msViewportStyle.appendChild(
            document.createTextNode(
                "@-ms-viewport{width:auto!important}"
            )
        );
        document.getElementsByTagName("head")[0].
            appendChild(msViewportStyle);
    }

});

