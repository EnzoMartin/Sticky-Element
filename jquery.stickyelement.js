;(function($, window, undefined) {

    "use strict";

    var Sticky = function(ele, par, options) {
        this.ele = ele;
        this.par = par;
        this.scrolling = false;
        this.options = $.extend({
            animate: false
        }, options);
        this.init();
    };
    
    Sticky.prototype.Update = function(){
        //This will handle any resizing of the container the sticky scroll is in andupdate the boundaries if necessary
    };
    
    Sticky.prototype.init = function() {
        var self = this;
        var win = $(window);
        self.SetBoundaries();
        
    };
    
    Sticky.prototype.MoveIt = function(){
        // This will move the stickied item
        console.log('test');
    };
    
    Sticky.prototype.SetBoundaries = function(){
        // This will set the boundaries the stickied item can move between and it's left position
        this.xPos = this.ele.offset().left;
        this.yLimitTop = this.par.offset().top;
        this.yLimitBtm = this.yLimitTop + this.par.height() - this.ele.height();
        console.log(this.xPos,this.yLimitTop,this.yLimitBtm);
    };
    
    Sticky.prototype.Freeze = function(){
        // This will freeze the stickied item in place wherever it is
    };
    
    Sticky.prototype.Unfreeze = function(){
        // This will unfreeze the stickied item and resume it's movement if necessary
    };
    
    $.stickies = [];

    $.fn.sticky = function(par) {
        var method, args, ret;
        if (!par){
            par = $(document);
        }
        if(typeof par === 'object'){
            this.each(function() {
                var self = $(this);
                    var instance = self.data("stickyInstance");
                instance = new Sticky(self, par);
                self.data("stickyInstance", instance);
                $.stickies.push(instance);
            });
        } else {
            throw new Error('Parameter needs to be a jQuery object, or leave blank to target the Document');
        }
        return ret || this;
    };
    
    // Update the position/offset changed on resize and move
    $(window).on('resize',function(){
        $.each($.stickies, function(){
            this.SetBoundaries();
            this.MoveIt();
        });
    });
    
    // Move those suckers on scroll
    $(window).on('scroll', function(){
        $.each($.stickies, function(){
            this.MoveIt();
        });
    });

    $(function() {
        console.log('Sup. U sexy ;)');
    });

}(jQuery, window));

$(function(){
    $('.sidebar').sticky($('.container'));
});