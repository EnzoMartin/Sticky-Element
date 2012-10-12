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
		this.elm = elm;
		this.par = par;
		this._frozen = false;
		this.options = $.extend({
			animate: false,
			animTime: 300
		}, options);
		this.init();
	};

	Sticky.prototype.init = function() {
		this.setBoundaries();
		this.elm.css({'position': 'relative'});
		this.par.css({'position': 'relative'});
		this.moveIt();
	};

	Sticky.prototype.update = function() {
		//This will handle any resizing of the container the sticky scroll is in and update the boundaries if necessary
		this.setBoundaries();
		this.moveIt();
	};

	Sticky.prototype.moveIt = function() {
		// This will decide whether to move the stickied item
		var winOffset = window.pageYOffset;
		if (winOffset >= this.yLimitTop && winOffset <= this.yLimitBtm) {
			this.updateOffset(winOffset - this.yLimitTop);
		} else if (winOffset < this.yLimitTop) {
			this.updateOffset(0);
		}
	};

	Sticky.prototype.setBoundaries = function() {
		// This will set the boundaries the stickied item can move between and it's left position
		this.xPos = this.elm.offset().left;
		this.yLimitTop = this.par.offset().top;
		var parHeight = this.par.height();
		var offsetDiff = (this.elm.offset().top - this.elm.css('marginTop').replace('px','')) - this.yLimitTop;
		if(offsetDiff === 0){
			this.yLimitBtm = this.yLimitTop + parHeight - this.elm.outerHeight();
		} else {
			this.yLimitBtm = this.yLimitTop + parHeight - (this.elm.outerHeight() + offsetDiff);
		}
	};

	/**
	 * Update Stickied Element's offset
	 * @param yOffset
	 */
	Sticky.prototype.updateOffset = function(yOffset) {
		// This moves the item
		if (this.animate) {
			this.elm.stop().animate({'top': yOffset}, this.animTime);
		} else {
			this.elm.css({'top': yOffset});
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
		'resize': function() {
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

	// Deathstar death beam
	$(document).on("pageleave", function () {
		$(window).unbind('scroll resize');
		$.fn.sticky._instances = [];
	});
}(jQuery, window));