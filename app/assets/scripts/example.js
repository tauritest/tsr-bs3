/**
 * Example scripts
 * Created by taurni on 7.10.2014.
 *
 */

/** Example of init Dynamic content loading on progress steps **/
$(document).ready(function(){
$('#demo3 .progress-steps[data-update="progress"]').progress({
    loadContent: function(id,callback){
        console.log("WORKING...");
        //do your thing...
        callback('Loading step '+id+' data'); //returns data, when ready
    }
});
});