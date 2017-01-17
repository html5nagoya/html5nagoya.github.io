jQuery(function() {

    'use strict';

    var OFFSET  = $('#header').height(),
        $win    = $(window),
        $doc    = $(document),
        $scroll = $('body, html'),
        $body   = $('body');

    /**
     * Anchor link
     */
    $doc.on('click', 'a[href^="#"], area[href^="#"]', function(e) {
        var $this = $(this), target;
        if ($this.is('.pagetop, .print')) {
            return;
        }
        if (target = $($this.attr('href')).offset()) {
            var wh = $win.height(),
                dh = $doc.height(),
                st = Math.floor(dh - target.top + OFFSET > wh ? target.top - OFFSET + 1 : dh - wh);
            if ($win.scrollTop() !== st) {
                $scroll.animate({scrollTop: st}, 500, 'easeOutExpo');
            }
            return false;
        }
    });

    /**
     * pagetop
     */
    $doc.on('click', 'a.pagetop', function(e) {
        if ($win.scrollTop() !== 0) {
            $scroll.animate({scrollTop: 0}, 500, 'easeOutExpo');
        }
        return false;
    });

    /**
     * scrollspy
     */
    $win.on('resize', function() {
        OFFSET = $('#header').height();
        var scrollspy = $body.data('bs.scrollspy');
        if (!scrollspy) {
            $body.css('padding-top', OFFSET).scrollspy({target: '#header', offset: OFFSET});
        } else {
            scrollspy.options.offset = OFFSET;
            $body.css('padding-top', OFFSET).scrollspy('refresh').scrollspy('process');
        }
    }).trigger('resize');
});
