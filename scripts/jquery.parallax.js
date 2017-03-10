https: //github.com/jquery-boilerplate/jquery-boilerplate/blob/master/src/jquery.boilerplate.js


    // the semi-colon before function invocation is a safety net against concatenated
    // scripts and/or other plugins which may not be closed properly.
;
(function ($, window, document, undefined) {

    "use strict";

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variables rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "parallax",
        defaults = {
            className: "parallax-plugin",
            imgSelector: '.image',
            contentSelector: '.content'
        };

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }
    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        init: function () {

            var elm = $(this.element);
            elm.addClass(this.settings.className);

            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            var bgDiv = elm.find(this.settings.imgSelector);
            var content = elm.find(this.settings.contentSelector);

            var bgOffset = parseInt(bgDiv.offset().top);
            var yPos;
            var coords;
            var speed = bgDiv.data('speed') || 0;

            var fOffset = parseInt(content.offset().top);
            var fYPos;
            var fSpeed = content.data('speed') || 1;

            function scroll() {

                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                yPos = -((scrollTop - bgOffset) / speed);
                coords = '50% ' + yPos + 'px';

                bgDiv.css('background-position', coords);

                fYPos = fOffset - scrollTop / fSpeed;
                content.css('top', fYPos);







            }

           $(window).on('scroll resize', scroll);





        }
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" +
                    pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);
