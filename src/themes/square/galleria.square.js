/**
 * @preserve Galleria Square Theme
 *
 * Copyright (c) 2012 Mike Chowla
 *
 * Based on Galleria Classic Theme
 *   Copyright (c) 2011, Aino
 *
 * Licensed under the MIT license.
 */

/*global jQuery, Galleria */

Galleria.requires(1.25, 'This version of Square theme requires Galleria 1.2.5 or later');

(function($) {

Galleria.addTheme({
    name: 'square',
    version: 1.5,
    author: 'Mike Chowla',
    css: 'galleria.square.css',
    defaults: {
        transition: 'slide',
        thumbCrop:  'width',
        carousel: true,
		    carouselVertical: true,
        imageMargin: 20,
    },
    init: function(options) {

	 this.addElement("bar");
	 this.append({
	               bar: ["counter", "info"]
	            });
	 this.prependChild('container', 'bar');

        // cache some stuff
        touch = Galleria.TOUCH,
        click = touch ? 'touchstart' : 'click';

        // some stuff for non-touch browsers
        if (! touch ) {
            this.addIdleState( this.get('image-nav-left'), { left:-50 });
            this.addIdleState( this.get('image-nav-right'), { right:-50 });
        }

        // bind some stuff
        this.bind('thumbnail', function(e) {

            if (! touch ) {
                // fade thumbnails
                $(e.thumbTarget).css('opacity', 0.6).parent().hover(function() {
                    $(this).not('.active').children().stop().fadeTo(100, 1);
                }, function() {
                    $(this).not('.active').children().stop().fadeTo(400, 0.6);
                });

                if ( e.index === this.getIndex() ) {
                    $(e.thumbTarget).css('opacity',1);
                }
            } else {
                $(e.thumbTarget).css('opacity', this.getIndex() ? 1 : 0.6);
            }
        });

        this.bind('loadstart', function(e) {
            if (!e.cached) {
                this.$('loader').show().fadeTo(200, 0.4);
            }

            this.$('info').toggle( this.hasInfo() );

            $(e.thumbTarget).css('opacity',1).parent().siblings().children().css('opacity', 0.6);
        });

        this.bind('loadfinish', function(e) {
            this.$('loader').fadeOut(200);
        });

        this.bind('image', function(e) {

            // lets make galleria open a lightbox when clicking the main image:
            $(e.imageTarget).click(this.proxy(function() {
               this.openLightbox();
            }));
        });

        this.bind('fullscreen_enter', function(e) {
			this.$('thumbnails-container').hide();
        });

        this.bind('fullscreen_exit', function(e) {
			this.$('thumbnails-container').show();
			this.updateCarousel()
        });
    }
});

}(jQuery));
