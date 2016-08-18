;(function($,win){
    'use strict';

    var requestFrame = (function(){
        var raf = win.requestAnimationFrame ||
            win.mozRequestAnimationFrame ||
            win.webkitRequestAnimationFrame ||
            function(fn){ return win.setTimeout(fn,20); };
        return function(fn){ return raf(fn); };
    })();

    // Check if the browser supports the transition CSS property
    var style = (win.document.body || win.document.documentElement).style;
    var prop = 'transition';
    var supportsTransition = typeof style[prop] == 'string';

    var events = {
        created:'sticky-created',
        update:'sticky-update',
        top:'sticky-hit-top',
        bottom:'sticky-hit-bottom',
        frozen:'sticky-frozen',
        unfrozen:'sticky-unfrozen'
    };

    /**
     * Sticky Element constructor
     * @param elm {String}
     * @param par {String}
     * @param [options] {Object}
     * @constructor
     */
    var Sticky = function(elm,par,options){
        this.element = elm;
        this.parent = par;
        this._frozen = false;
        this._stopped = true;
        this.options = $.extend({
            useTransition:true,
            animate:true,
            animTime:200,
            animDelay:300
        },options);

        var offset = parseInt(options.offset, 10);
        this.options.offset = isNaN(offset) ? 0 : offset;

        this.init();
    };

    Sticky.prototype.init = function(){
        var transition = '';
        if(this.options.useTransition && supportsTransition){
            transition = 'top ' + this.options.animTime + 'ms ease-in-out';
            this.options.animate = false;
        }

        this.parent.css({'position':'relative'});
        this.element
            .addClass('sticky-scroll')
            .css({
                'transition':transition,
                'position':'relative'
            });

        this.element.trigger(events.created);
        this.update();
    };

    /**
     * This will handle any resizing of the container the sticky scroll is in and update the boundaries if necessary
     */
    Sticky.prototype.update = function(){
        this.setBoundaries(0);
        this.moveIt();
        this.element.trigger(events.update);
    };

    /**
     * This will decide whether to move the stickied item
     */
    Sticky.prototype.moveIt = function(){
        var scrollTop = (win.document.documentElement.scrollTop || win.document.body.scrollTop) + this.options.offset;
        var height = this.element.outerHeight(true);
        var realStop = this._stop - height;

        if(this._parentHeight - this._offset > height && !this._frozen){
            if(scrollTop >= this._start && scrollTop <= realStop){
                // Element is between top and bottom
                this.updateOffset(scrollTop - this._start);
                this._stopped = false;
            } else {
                if(scrollTop < this._start){
                    // Element is at top
                    this.updateOffset(0);

                    if(!this._stopped){
                        this.element.trigger(events.top);
                    }
                    this._stopped = true;
                } else if(scrollTop > realStop){
                    // Element is at bottom
                    this.updateOffset(this._parentHeight - height - this._offset);
                    if(!this._stopped){
                        this.element.trigger(events.bottom);
                    }
                    this._stopped = true;
                }
            }
        }
    };

    /**
     * This will set the boundaries the stickied item can move between and it's left position
     * @param [offset] {Number} Manually set the element offset
     */
    Sticky.prototype.setBoundaries = function(offset){
        this._offset = typeof offset === 'undefined' ? this.element.position().top : offset;
        this._start = this.parent.offset().top + this._offset;
        this._parentHeight = this.parent[0].offsetHeight;
        this._stop = this._start + this._parentHeight - this._offset;
    };

    /**
     * Update the Y offset to calculate against
     * @param newOffset {Number}
     */
    Sticky.prototype.setOffset = function(newOffset){
        newOffset = parseInt(newOffset, 10);
        if(!isNaN(newOffset)){
            this.options.offset = newOffset;
            this.moveIt();
        }
    };

    /**
     * Update Stickied Element's offset thereby moving it up/down the page
     * @param yOffset {Number}
     */
    Sticky.prototype.updateOffset = function(yOffset){
        if(this._lastPosition !== yOffset){
            if(this.options.animate){
                this.element.stop(true,false).delay(this.options.animDelay).animate({
                    'top':yOffset
                },this.animTime);
            } else {
                this.element.css('top',yOffset);
            }

            this._lastPosition = yOffset;
        }
    };

    /**
     * This will freeze/unfreeze the stickied item
     */
    Sticky.prototype.toggleFreeze = function(){
        this._frozen = !this._frozen;
        this.element.stop(true,false);
        if(!this._frozen){
            this.element.trigger(events.unfrozen);
            this.moveIt();
        } else {
            this.element.trigger(events.frozen);
        }
    };

    $.fn.sticky = function(parentName,options){
        var method = parentName;
        var ret = false;

        this.each(function(){
            var self = $(this);
            var instance = self.data('stickyInstance');

            if(instance && (options || method)){
                if(typeof options === 'object'){
                    ret = $.extend(instance.options,options);
                } else if(options === 'options'){
                    ret = instance.options;
                } else if(typeof instance[method] === 'function'){
                    ret = instance[method].call(instance,options);
                } else {
                    console.error('Sticky Element has no option/method named ' + method);
                }
            } else {
                var parent = null;
                if(parent){
                    parent = self.parent().closest(parent);
                } else {
                    parent = self.parent();
                }

                instance = new Sticky(self,parent,options || {});
                self.data('stickyInstance',instance);
                $.fn.sticky._instances.push(instance);
            }
        });
        return ret || this;
    };

    /**
     * Update the position/offset changed on resize and move, applies to all instances
     */
    var updateAll = function(){
        var len = $.fn.sticky._instances.length;
        for(var i = 0; i < len; i++){
            $.fn.sticky._instances[i].update();
        }
    };

    $.fn.sticky._instances = [];
    $.fn.sticky.updateAll = updateAll;

    $(win).on({
        'resize':function(){
            // Update the boundaries is the browser window is resized
            updateAll();
        },
        'scroll':function(){
            // Move each unfrozen instance on scroll
            var len = $.fn.sticky._instances.length;
            for(var i = 0; i < len; i++){
                var element = $.fn.sticky._instances[i];
                if(!element._frozen){
                    element.moveIt();
                }
            }
        }
    });

    $(win.document).on({
        'ready':function(){
            // Start an interval to check the heights of sticky elements and update boundaries if necessary
            win.setInterval(function(){
                requestFrame(function(){
                    var len = $.fn.sticky._instances.length;
                    for(var i = 0; i < len; i++){
                        var element = $.fn.sticky._instances[i];
                        if(element._parentHeight !== element.parent[0].offsetHeight){
                            element.update();
                        }
                    }
                });
            },1000);
        }
    })
}(jQuery,window));