/*
 **DroptdownLayer By: Tauri Nikkari**

 # initsialiseerimine
 $('#ddlTest > a').ddl({
   loadContent: function(e,callback){
     //andmete kogumiene..
     callback(send); //returns data, when ready
     // andmeid oodatakse läib callback(data) funktsiooni
     // ootab kuni andmed laetud lisab sisu ja avab DDLi
   }
 });

 */
(function ($) {
  'use strict';
  
  // DDL CLASS DEFINITION
  // ====================
  var Ddl = function (element, options) {
    this.options =
    this.$ddlContainer =
    this.$element = null;

    this.init(element, options);
  };

  Ddl.DEFAULTS = {
    ddlContainerAttrs: {
      'class': "clearfix"
    },
    ddlContainerCss: {
      width: "100%",
      clear: "left"
    },
    loadContent: function() {}, //must return layer inner html!
    loader:{
      show: true,
      style:{
        'min-height':'200px;',
        'padding':'100px 0',
        'text-align': 'center'
      },
      image:"/img/loaders/transparent_big.gif"
    },
    activeClass: "in",      //todo: chande "in" -> "open"
    blockedClass: "blocked",
    preventDefaultClick: "noDropdown",
    parent: false,          //todo: is it nessasary?
    slideSpeed: 150,
    scrollSpeed: 250,
    angularTemplate: false, //todo: remoove or make more general
    maxWidth: "100%",       //todo: remoove
    pluginClass: "ddl"      //todo: not needed
  };


  Ddl.prototype.init = function (element, options) {
    this.options = this.getOptions(options);
    this.$element = $(element);
    
    //if some ddl is open add 'inactive' class
    if(this.$element.siblings('.ddl.'+this.options.activeClass).length){
      this.$element.siblings('.ddl:not(.'+this.options.activeClass+')').addClass('inactive');
    }

    /* Conteaier for ddl content */
    this.$ddlContainer = $('<div />')
      .attr(this.options.ddlContainerAttrs)
      .css(this.options.ddlContainerCss)
      .addClass('ddl-container');
  };


  Ddl.prototype.toggle = function () {
    return this.isShown ? this.hide() : this.show();
  };


  Ddl.prototype.show = function () {
    var that = this;
    var e = $.Event('show.ts.ddl');
    this.$element.trigger(e);

    if (this.isShow || e.isDefaultPrevented()) return;
    if (preventDefaultClick(this)) {
      activeOff(this);
      return;
    }

    //relocate ddl on window resize
    $(window).resize(function() {
        var _container = that.$ddlContainer.detach();
        //console.log(_container);
        //console.log(that.$ddlContainer.html());
        getContainer();
        that.$ddlContainer = _container;
    });

    this.isShown = true;

    //remooove active state
    activeOff(this);

    //add active state to current element
    this.$element.addClass(this.options.activeClass).removeClass('inactive');
    this.$element.siblings('.ddl').addClass('inactive');

    //scroll top - scroll animation
    /*
    $("html, body").animate({ scrollTop: this.$element.offset().top }, this.options.scrollSpeed);
    */

    //scroll
    var newLocation = this.$element.offset().top;
    var currentLocation = window.pageYOffset;
    var newLocationOffset = 20;
    var speed = this.options.scrollSpeed;

    window.setTimeout(function() {
       var toTravel = ( currentLocation <= newLocation ) ? (currentLocation - newLocation ) * -1 : (( currentLocation - newLocation ) + newLocationOffset )  * -1;
       $("html, body").animate({ scrollTop: (  currentLocation + toTravel ) - newLocationOffset }, speed);
    }, 200);

    
    //get container
    getContainer();

    //loader
    if(this.options.loader.show){
      var loader = $('<div class="ddl-loader" />').css(this.options.loader.style);
      loader.append('<img src="'+this.options.loader.image+'">');

      this.$ddlContainer.append(loader);
      this.$element.trigger($.Event('loader.shown.ts.ddl'));
    }

    if(this.$element.attr('data-target')){
      //static content
      loadContentReady($(this.$element.data("target")));
      //$(this.$element.data("target")).detach();
    }else{
      //laod async contetn
      this.options.loadContent.call(this, this.$element, loadContentReady);
    }

    /* Makes a container and plases it to the right place */
    function getContainer(){
      var _tmp = getLastInRow(that);
      var next = _tmp.next();

      if (!next.hasClass(that.options.ddlContainerAttrs['class'])) {
        _tmp.after(that.$ddlContainer);
      }
      else { //conteiner is alredy inserted
        that.$ddlContainer = next; //return the existing container
      }
    }

    /* Callback function is called to add data into ddl contaier */
    function loadContentReady(html) {
      that.$ddlContainer.empty().append(html);
      that.$element.trigger($.Event('loader.hidden.ts.ddl'));
      that.$ddlContainer.children().data('ts.ddl', that);
      openDdlWithEffect();

    }

    function openDdlWithEffect(){
      setTimeout(function () {
        var x = 30;
        that.$ddlContainer.css({"margin-top": "-" + x + "px"}).show().animate({"margin-top": 0}, 100);
        fireDropdownRenderedEvent();
        that.$element.trigger('shown.ts.ddl');
      }, 100);
    }

    var fireDropdownRenderedEvent = function() {
      $(document).trigger("dropdownRendered");
    };

    /* Find Last element in row */
    function getLastInRow(el) {
      var _tmp,comp;
       _tmp = comp = el.$element;
      if (el.options.angularTemplate) {
        _tmp = el.$element.parent();
      }

      while (comp.position().top == nextTop(_tmp)) {
        _tmp = _tmp.next();
      }

      //last element do not have the nex sibling
      function nextTop(t) {
          var el = $(t);
          var nxt;
          var i = 0;
        try {
          nxt = $(t).next();

          while(true){
            if (nxt.hasClass('ddl-data')){
              nxt = nxt.next();
            }else{
              break;
            }   
          }
          return nxt.position().top;
        }

        catch (e) {
          return null;
        }
      }

      return _tmp;
    }

    /*Remoove active state */
    function activeOff() {
      var active, blocked;
      if (that.options.parent) {
        active = $(that.options.parent).find("." + that.options.activeClass);
        //blocked = $(e.el).children(":not(."+e.options.activeClass+")").removeClass("."+e.options.blockedClass);
      }
      else {
        active = that.$element.parent().find("." + that.options.activeClass);
      }

      if (active.length) {
        active.ddl("hide");
      }
    }
  };


  Ddl.prototype.hide = function () {
    this.$element.trigger('hide.ts.ddl');

    if (!this.isShown) return;

    this.isShown = false;

    //close ddl
    this.$ddlContainer.slideUp(this.options.slideSpeed);
    if(this.$element.attr('data-target')){
      this.$element.after(this.$ddlContainer.children());
    }
    
    this.$ddlContainer.detach();

    //activeOff
    this.$element.removeClass(this.options.activeClass);
    this.$element.trigger('hidden.ts.ddl');
  };


  // Show Aside
  Ddl.prototype.showAside = function() {
    var $self = $(this);
    var e = $.Event('aside.show.ts.ddl');
    $self.parents('.ddl-container').addClass('aside-open');
    $(document).one('click.ts.ddl.aside', '.ddl-trigger-aside_back', Ddl.prototype.hideAside);
  };


  // Hide Aside
  Ddl.prototype.hideAside = function() {
      var $self = $(this);
      var e = $.Event('aside.hide.ts.ddl');
      $self.parents('.ddl-container').removeClass('aside-open');
  };


  var preventDefaultClick = function (e) {
    if (e.options.angularTemplate) {
      return e.$element.children().hasClass(e.options.preventDefaultClick);
    }
    else {
      return e.$element.hasClass(e.options.preventDefaultClick);
    }
  };

  

  //---------------------- //
  Ddl.prototype.getDefaults = function () {
    return Ddl.DEFAULTS;
  };

  Ddl.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), options); //this.$element.data(), options);
    return options;
  };

  // DDL this DEFINITION
  // ===================

  var old = $.fn.ddl;

  $.fn.ddl = function (option, value) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('ts.ddl');

      if (!data) $this.data('ts.ddl', (data = new Ddl(this, option)));
      if (typeof option == 'string') data[option](value);
    });
  };

  $.fn.ddl.Constructor = Ddl;

  // DDL NO CONFLICT
  // ===============

  $.fn.ddl.noConflict = function () {
    $.fn.ddl = old;
    return this;
  };

  // DDL DATA-API
  // ============
  $(document).on('click.ts.ddl.data-api', '[data-toggle="ddl"]', function (e) {
    e.preventDefault();
    $(this).ddl('toggle');
  });

  $(document).on('click.ts.ddl.aside', '.ddl-trigger-aside', Ddl.prototype.showAside);

})(jQuery);
	