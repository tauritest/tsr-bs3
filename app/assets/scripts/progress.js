/*
*  Progress Steps
*  ==============
*  Author: Tauri  Nikkari
*
*/
(function ($) {
    //Class definition
    var Progress = function(element, options){
        this.options =
        this.$element =
        this.tabs =
        this.$active = null;

        this.init(element, options);
    };

    Progress.DEFAULTS = {
        activeClass: "progress-active",
        dynamicContainer: '<div class="progress-pane dynamic"></div>',
        loadContent: function() {} //must return html!
    };

    Progress.prototype.init = function(element, options){
        console.info('INIT',options);
        this.options = this.getOptions(options);
        this.$element = $(element);
        this.tabs = this.$element.find('.progress-tabs ol li');
        this.tabs.count = this.tabs.length;
        this.$active = this.$element.find('.progress-active');
        this.tabs.activeIndex = this.$active.index();
        this.update();
    };
    /* Updates content and content position */
    Progress.prototype.update = function(){
        this.$element.trigger("update.ts.progress");
        var that = this;
        var tabs = this.$element.find('.progress-tabs');
        var content = this.$element.find('.progress-content').detach();
        this.$active = this.$element.find('.progress-active');
        this.tabs.activeIndex = this.$active.index();

        placeContent();
        this.activateContent();

        this.$element.trigger("updated.ts.progress");
        //if one row
        function placeContent(){
            var last = tabs.find('ol li:last');
            var first = tabs.find('ol li:first');
            try {
                if(that.$active.offset().top == last.offset().top && that.$active.offset().top == first.offset().top ){
                    tabs.after(content);
                }else{
                    that.$active.after(content);
                }
            }catch(e){
                tabs.after(content);
            }
        }
         //Window resize listener
        $(window).resize(function() {
            placeContent()
        });
    };

    /* Activates next step */
    Progress.prototype.next = function(){
        this.$element.trigger("next.ts.progress");
        // kas on järgmine?
        if(this.tabs.activeIndex == -1 || this.tabs.count - 1  == this.tabs.activeIndex){
            console.info("No seps left: end");
            return;
        }
        activateStep(this.tabs[this.tabs.activeIndex + 1],this);
        this.update();
    };

    /* Activates previous step */
    Progress.prototype.prev = function(){
        this.$element.trigger("prev.ts.progress");
        // kas on järgmine?
        if(this.tabs.activeIndex == -1 ||this.tabs.activeIndex   == 0 ){
            console.info("No steps left:Start");
            return;
        }
        activateStep(this.tabs[this.tabs.activeIndex -1 ],this);
        this.update();
    };

    /* Make step content block visible and hide others*/
    Progress.prototype.activateContent = function(){
        var selector = this.$active.data('target');
        //if no data try dynamic loading
        if(selector === "dynamic"){
            loadDynamicContent(this);
        }

        switchActive(selector);
    };

    /* Switch active step state styles */
    var activateStep = function(e, that){
        clearActive(that);
        $(e).addClass(that.options.activeClass);
    };

    /* Removes active style from step */
    var clearActive = function(step){
        step.$active.removeClass(step.options.activeClass);
    };

    /* Laod content with callback function */
    var loadDynamicContent = function(that){
        console.log("test:laodDyn",that.options);
        that.$element.trigger("content.load.ts.progress");
        var id = that.tabs.activeIndex;
        that.options.loadContent.call(this, id, loadContentReady);

        /*Callback function*/
        function loadContentReady(html){
            var $content = that.$element.find('.progress-content');
            var selector = ".progress-pane.dynamic";
            var $container =  $content.find(selector);
            if(! $container.length){
                $container = $(that.options.dynamicContainer);
                $content.prepend($container);
            }
            $container.empty().append(html);
            that.$element.trigger("content.loaded.ts.progress");
            switchActive(selector);
        }
    };

    function switchActive(selector) {
        $(selector).siblings().removeClass('active');
        $(selector).addClass('active');
    }

    Progress.prototype.getDefaults = function () {
        return Progress.DEFAULTS;
    };

    Progress.prototype.getOptions = function (options) {
        options = $.extend({}, this.getDefaults(), options); //this.$element.data(), options);
        return options;
    };

    // PROGRESS DEFINITION
    // ===================
    var old = $.fn.progress;
    $.fn.progress =  function (option, value){
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('ts.progress');
            if(!data) $this.data('ts.progress', (data = new Progress(this,option)));
            if(typeof option == 'string') data[option](value);
       });
    };
    $.fn.progress.Constructor = Progress;

    // NO CONFLICT
    // ===========
    $.fn.progress.noConflict = function(){
        $.fn.progress = old;
        return this;
    };

    // DATA API
    // ========
    //Auto initialing
   $('.progress-steps[data-update="progress"]').each(function(){
       console.log(this);
      if(! $(this).find('li[data-target="dynamic"]').length){
          $(this).progress();
      }
   })

    $(document).on('click.ts.progress.data-api', '[data-action="next"]', function(e){
        e.preventDefault();
        $(this).parents('.progress-steps').progress('next');
    });

    $(document).on('click.ts.progress.data-api', '[data-action="prev"]', function(e){
        e.preventDefault();
        $(this).parents('.progress-steps').progress('prev');
    })


})(jQuery);