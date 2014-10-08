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

    }

    main();

}());

function reDrawVisual() {
    var oR = new OnResize();
    oR.init();
}
jQuery(document).ready(function(){
    detectScreen();
    reCallFuncs.push(detectScreen);

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

