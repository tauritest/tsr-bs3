/*
Select Box
By Tauri Nikkari
 */
(function ($) {
    'use strict';

    // sb CLASS DEFINITION
    // ====================
    var Sb = function (element, options) {
        //Global vars
        this.options =
        this.$element = null;
        this.init(element, options);
    };


    Sb.DEFAULTS = {
        value:   null //Default value
    };


    Sb.prototype.init = function (element, options) {
        this.options = this.getOptions(options);
        this.$element = $(element);

        if(this.$element.hasClass('selected')){
            this.isSelected = true;
        }

        this.options.value = this.$element.data('default');
    };


    Sb.prototype.toggle = function () {
        return this.isSelected ? this.clear() : this.select();
    };

    Sb.prototype.select = function(){
        var e = $.Event('selecting.ts.sb');
        this.$element.trigger(e);
        if(this.isSelected || e.isDefaultPrevented() ) return;
        //clear
        this.$element.siblings().sb('clear');

        //this.parent('[data-toggle="sb"]').value = this.$element.data('value');
        this.isSelected = true;
        this.$element.addClass('selected');
        this.$element.trigger('selected.ts.sb');
    };

    Sb.prototype.clear = function(){
        var e = $.Event('deselecting.ts.sb');
        this.$element.trigger(e);
        this.$element.removeClass('selected');
        this.isSelected = false;
        this.$element.trigger('deselected.ts.sb');
    };

    Sb.prototype.value = function(){
        var selected = this.$element.find('.selected');
        if(selected.length == 0){
            return this.options.value;
        }else{
            return selected.data('value');
        }
    };

    //---------------------- //
    Sb.prototype.getDefaults = function () {
        return Sb.DEFAULTS;
    };

    Sb.prototype.getOptions = function (options) {
        options = $.extend({}, this.getDefaults(), options); //this.$element.data(), options);
        return options;
    };

    // sb this DEFINITION
    // ===================

    var old = $.fn.sb;

    $.fn.sb = function (option, value) {
        var selectedValue = null;
        this.each(function () {

            var $this = $(this);
            var data = $this.data('ts.sb');
            if (!data) $this.data('ts.sb', (data = new Sb(this, option)));
            if (typeof option == 'string') {
                selectedValue = data[option](value);
            }
        });

        if(option == 'value'){
            //Return value instead of object
            return selectedValue;
        }else{
            return this
        }
    };

    $.fn.sb.Constructor = Sb;

    // sb NO CONFLICT
    // ===============
    $.fn.sb.noConflict = function () {
        $.fn.sb = old;
        return this;
    };

    // sb DATA-API
    // ============
    $(document).on('click.ts.sb.data-api', '[data-toggle="sb"]>li', function (e) {
        e.preventDefault();
        $(this).sb('toggle');
    });

})(jQuery);

