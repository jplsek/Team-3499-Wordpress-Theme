/**
 * Theme functions file
 *
 * Contains handlers for navigation, accessibility, header sizing
 * footer widgets and Featured Content slider
 *
 */
( function( $ ) {
	var body    = $( 'body' ),
		_window = $( window );

	// Enable menu toggle for small screens.
	( function() {
		var nav = $( '#primary-navigation' ), button, menu;
		if ( ! nav ) {
			return;
		}

		button = nav.find( '.menu-toggle' );
		if ( ! button ) {
			return;
		}

		// Hide button if menu is missing or empty.
		menu = nav.find( '.nav-menu' );
		if ( ! menu || ! menu.children().length ) {
			button.hide();
			return;
		}

		$( '.menu-toggle' ).on( 'click.twentyfourteen', function() {
			nav.toggleClass( 'toggled-on' );
		} );
	} )();

	/*
	 * Makes "skip to content" link work correctly in IE9 and Chrome for better
	 * accessibility.
	 *
	 * @link http://www.nczonline.net/blog/2013/01/15/fixing-skip-to-content-links/
	 */
	_window.on( 'hashchange.twentyfourteen', function() {
		var element = document.getElementById( location.hash.substring( 1 ) );

		if ( element ) {
			if ( ! /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) {
				element.tabIndex = -1;
			}

			element.focus();

			// Repositions the window on jump-to-anchor to account for header height.
			window.scrollBy( 0, -80 );
		}
	} );

	$( function() {
        
		// Search toggle. - Still slightly buggy, but works most 90% of the time.
    
        function openDiv(div){
            $(div).stop().slideDown(200);
            $('#search-container .search-field').focus();
        }
        function closeDiv(div){
            $('#search-toggle').removeClass('active');
            $(div).stop().slideUp(200);
        }
        
        $(document).ready(function(){
            
            var sopen = true;
            
            $('#search-container').hide(); //Fixes "double slide" when combined with display:none.
            
            $('#search-container .search-field').blur(function(){
                ///console.log("blur close div   ----- Setting sopen to false at blur -----");
                closeDiv('#search-container');
                sopen = false;
                setTimeout(function(){
                    ///console.log("                                         true");
                    sopen = true;
                }, 100);
            });
            
            $('#search-toggle').mouseup(function(){
                ///console.log("click button");
                if($('#search-toggle').hasClass('active') && sopen == true){
                    closeDiv('#search-container');
                    ///console.log("blur close div 1");
                } else if(sopen == false) {
                    ///console.log("SOPEN == FALSE");
                    sopen = true;
                } else if(!$('#search-toggle').hasClass('active')){
                    $(this).addClass('active');
                    ///console.log("blur open div 1");
                } else if(sopen == true) {
                    ///console.log("SOPEN == True");
                    sopen = true;
                }
                
                if($('#search-toggle').hasClass('active')){
                    openDiv('#search-container');
                }
            });

        });

		/*
		 * Fixed header for large screen.
		 * If the header becomes more than 48px tall, unfix the header.
		 *
		 * The callback on the scroll event is only added if there is a header
		 * image and we are not on mobile.
		 */
		if ( _window.width() > 781 ) {
			var mastheadHeight = $( '#masthead' ).height(),
				toolbarOffset, mastheadOffset;

			if ( mastheadHeight > 48 ) {
				body.removeClass( 'masthead-fixed' );
			}

			if ( body.is( '.header-image' ) ) {
				toolbarOffset  = body.is( '.admin-bar' ) ? $( '#wpadminbar' ).height() : 0;
				mastheadOffset = $( '#masthead' ).offset().top - toolbarOffset;

				_window.on( 'scroll.twentyfourteen', function() {
					if ( ( window.scrollY > mastheadOffset ) && ( mastheadHeight < 49 ) ) {
						body.addClass( 'masthead-fixed' );
					} else {
						body.removeClass( 'masthead-fixed' );
					}
				} );
			}
		}

		// Focus styles for menus.
		$( '.primary-navigation, .secondary-navigation' ).find( 'a' ).on( 'focus.twentyfourteen blur.twentyfourteen', function() {
			$( this ).parents().toggleClass( 'focus' );
		} );
	} );

	// Arrange footer widgets vertically.
	if ( $.isFunction( $.fn.masonry ) ) {
		$( '#footer-sidebar' ).masonry( {
			itemSelector: '.widget',
			columnWidth: function( containerWidth ) {
				return containerWidth / 4;
			},
			gutterWidth: 0,
			isResizable: true,
			isRTL: $( 'body' ).is( '.rtl' )
		} );
	}

	// Initialize Featured Content slider.
	_window.load( function() {
		if ( body.is( '.slider' ) ) {
			$( '.featured-content' ).featuredslider( {
				selector: '.featured-content-inner > article',
				controlsContainer: '.featured-content'
			} );
		}
	} );

    // Menubar Effects - Not ready
    /*$('[class^="page_item page-item-"]').hover(function(){
        $('.children').stop().hide().slideDown(200);
    });*/
    
} )( jQuery );
