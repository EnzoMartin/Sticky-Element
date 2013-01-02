;(function($, window, undefined) {

    "use strict";

    /**
     * Sticky Element constructor
     * @param elm
     * @param par
     * @param options
     * @constructor
     */
    var Sticky = function(elm, par, options) {
        this.element = elm;
        this.parent = par;
        this._frozen = false;
        this.options = $.extend({
            animate: false,
            useFixed: true,
            animTime: 300
        }, options);
        this.init();
    };

    Sticky.prototype.init = function() {
        this.element.addClass("sticky-scroll");
        this.update();
    };

    Sticky.prototype.update = function() {
        //This will handle any resizing of the container the sticky scroll is in and update the boundaries if necessary
        this.setBoundaries();
        this.moveIt();
    };

    Sticky.prototype.moveIt = function() {
        // This will decide whether to move the stickied item
        var scrollTop = $(window).scrollTop();
        var height = this.element.outerHeight(true);
        var realStop = this._stop - height;

        if (this._parentHeight - this._offset > height && !this._frozen) {
            if (scrollTop >= this._start && scrollTop <= realStop) {
                if(this.options.useFixed){
                    this.element.css({'position':'fixed','top':0,'left':this.element.offset().left});
                } else {
                    this.updateOffset(scrollTop - this._start);
                }
            } else {
                this.element.css({'position':'relative','left':0});
                if (scrollTop < this._start) {
                    this.updateOffset(0);
                } else if (scrollTop > realStop) {
                    this.updateOffset(this._parentHeight - height - this._offset);
                }
            }
        }
    };

    Sticky.prototype.setBoundaries = function() {
        // This will set the boundaries the stickied item can move between and it's left position
        this._offset = this.element.position().top;
        this._start = this.parent.offset().top + this._offset;
        this._parentHeight = this.parent.outerHeight();
        this._stop = this._start + this._parentHeight - this._offset;
    };

    /**
     * Update Stickied Element's offset
     * @param yOffset
     */
    Sticky.prototype.updateOffset = function(yOffset) {
        if (!this._lastPosition !== yOffset) {
            // This moves the item
            if (this.animate) {
                this.element.stop().animate({
                    'top': yOffset
                }, this.animTime);
            } else {
                this.element.css('top', yOffset);
            }
            this._lastPosition = yOffset;
        }
    };

    Sticky.prototype.toggleFreeze = function() {
        // This will freeze the stickied item in place wherever it is
        this._frozen = !this._frozen;
    };

    $.fn.sticky = function(par, options) {
        var method, args, ret = false;
        if (typeof options === "string") {
            args = [].slice.call(arguments, 0);
        }

        this.each(function() {
            var self = $(this);
            var parent = par;
            if (parent) {
                parent = self.parent().closest(parent);
            } else {
                parent = self.parent();
            }
            parent.css({'position':'relative'}); // Set parent position to relative
            self.css({'position':'relative'}); // Set item position to relative
            var instance = self.data("stickyInstance");

            if (instance && options) {
                if (typeof options === "object") {
                    ret = $.extend(instance.options, options);
                } else if (options === "options") {
                    ret = instance.options;
                } else if (typeof instance[options] === "function") {
                    ret = instance[options].apply(instance, args.slice(1));
                } else {
                    throw new Error("Sticky Element has no option/method named " + method);
                }
            } else {
                instance = new Sticky(self, parent, options || {});
                self.data("stickyInstance", instance);
                $.fn.sticky._instances.push(instance);
            }
        });
        return ret || this;
    };

    $.fn.sticky._instances = [];

    $(window).on({
        'resize': function(e) {
            // Update the position/offset changed on resize and move
            $.each($.fn.sticky._instances, function() {
                this.update();
            });
        },
        'scroll': function() {
            // Move all those suckers on scroll
            $.each($.fn.sticky._instances, function() {
                if (!this._frozen) {
                    this.moveIt();
                }
            });
        }
    });
}(jQuery, window));