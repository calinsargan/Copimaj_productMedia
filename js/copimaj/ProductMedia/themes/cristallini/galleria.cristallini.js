/**
 * Galleria_V Classic version 1.2.2.1 2011-05-23 
 *
 * Galleria_V is a modification of Aino's JavaScript Image Gallery "Galleria" and the "Classic" theme. 
 * Galleria_V allows for a vertical carousel and enables fullscreen viewing capability. 
 * Galleria_V is not compatible with Galleria themes, however themes could be modified or created to function with Galleria_V.
 * Galleria_V retains most of the functionality of Galleria but is not provided or supported by Aino.
 *
 * www.aaronpsullivan.com
 */

/**
 * @preserve Galleria Classic Theme 2011-02-14
 * http://galleria.aino.se
 *
 * Copyright (c) 2011, Aino
 * Licensed under the MIT license.
 */
 
/*global jQuery, Galleria */

(function($) {

Galleria.addTheme({
    name: 'cristallini', /* hacked version of the classic theme that has a vertical carousel and a fullscreen button */
    author: 'Copimaj',
    css: 'galleria.cristallini.css',
    defaults: {
        transition: 'slide',
        thumbCrop:  'height',
		showFullscreen: true,
		showInfo: true,
		thumbNavArea: 30, /* pixel amount to offset the height of thumbnail-list to create the illusion of a margin at the top and bottom. This margin allows for the thumbnavs to appear above and below the thumbnails */
        
		// set this to false if you want to show the caption all the time:
        _toggleInfo: true
    },
    init: function(options) {
        
        // add some elements
        this.addElement('info-link','info-close', 'fullscreen');
				
        this.append({
            'info' : ['info-link','info-close'],
			'container' : ['fullscreen']
        });        				
					
		var fullscreen = this.$('fullscreen'),
            touch = Galleria.TOUCH,
            click = touch ? 'touchstart' : 'click';
			
		fullscreen.bind( click, function() {
				//e.preventDefault();
				var gallery = Galleria.get(0); 
				gallery.toggleFullscreen();
            }).text("View large image");
		
		/* hide if set by user */
		if ( this._options['showFullscreen'] === false ) {
                fullscreen.css({ display:'none' });
           }
				
        // cache some stuff
        var info = this.$('info-link,info-close,info-text'),
            touch = Galleria.TOUCH,
            click = touch ? 'touchstart' : 'click';
        
        // show loader & counter with opacity
        this.$('loader,counter').show().css('opacity', 0.4);

        // some stuff for non-touch browsers
       
		if (! touch ) {
            this.addIdleState( this.get('image-nav-left'), { left:-50 });
            this.addIdleState( this.get('image-nav-right'), { right:-50 });
            this.addIdleState( this.get('counter'), { opacity:0 });
        }
        
        // toggle info
        if ( options._toggleInfo === true ) {
            info.bind( click, function() {
                info.toggle();
            });
        } else {
			info.show();
			this.$('info-link, info-close').hide();
		}
        
        // bind some stuff
        this.bind('thumbnail', function(e) {
            
            if (! touch ) {
                // fade thumbnails on mouseover - The current image is left at 100% not sure why at this point, but this is what I wanted anyway.
                $(e.thumbTarget).css('opacity', 1).parent().hover(function() {
                    $(this).not('.active').children().stop().fadeTo(100, .6);
                }, function() {
                    $(this).not('.active').children().stop().fadeTo(400, 1);
                });
                
                if ( e.index === options.show ) {
                    $(e.thumbTarget).css('opacity',1);
                }
            }
        });
        
        this.bind('loadstart', function(e) {
            if (!e.cached) {
                this.$('loader').show().fadeTo(200, 0.4);
            }
            
            this.$('info').toggle( this.hasInfo() );
            
            $(e.thumbTarget).css('opacity',1).parent().siblings().children().css('opacity', 1);
        });
        
        this.bind('loadfinish', function(e) {
            this.$('loader').fadeOut(200);
        });
    }
});

}(jQuery));
