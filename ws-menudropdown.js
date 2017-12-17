/**
 * Ham Dropdown Menu - version BETA 1 - 25/11/2016
 * @param {resolution} $ [Do phan giai de chay - (value: number [default: full])]
 * @param {animate} [Hieu ung truot. menu - (value: 'slide', 'fade', [defalt: null])]
 * @param {padLeft} [PaddingLeft cho href - (value: bool [defalt: false])]
 * @param {padLeftVal} [Gia tri padding - (value: number [defalt: 15])]
 */
(function($){
    $.fn.wsMeMo = function(options) {
        var win = $(window);
        var doc = $(document);
        var _this = $(this);
        var bod = $('body');
        var selec = this.selector;
        var plugin = $(selec).children('ul');
        var opt = $.extend({
            resolution: '',
            animate: '',
            padLeft: false,
            padLeftVal: 15
        }, options);
        if (bod.find(selec).length) {
            // Neu nhu tim thay Element dc chon
            if ($(selec).find('ul').length) {
            // Neu nhu tim thay thuoc tinh ul trong Element dc chon
                init = function() {
                    if ( (opt.resolution+"").match(/^\d+$/) ) {
                            if ($(window).width() <= parseInt(opt.resolution)) {
                                pluginStyle();
                                pluginClick();
                                if (opt.padLeft) {
                                    pluginPaddingLeft();
                                }
                            }
                    } else {
                        pluginStyle();
                        pluginClick();
                        if (opt.padLeft) {
                            pluginPaddingLeft();
                        }
                    }
                };
                pluginPaddingLeft = function() {
                    $(selec).find('ul').each(function(key, el) {
                    // console.log($(this));
                        //$(this).find('a').css('paddingLeft', opt.padLeftVal * key);
                    });
                };
                pluginStyle = function() {
                    $(selec).find('li ul').hide().parent().addClass('ws-hassub');
                    plugin.each(function(ey, el) {

                        var mar_top = ($('li.ws-hassub').children('a').outerHeight() / 2) - 8;

                        var hei = $('li.ws-hassub').children('a').outerHeight() - mar_top;

                        $('li.ws-hassub').css({
                            'position': 'relative',
                            'display': 'block',
                            'height': 'auto'
                        });

                        if (!$('li.ws-hassub').children('i').length) {
                            $('li.ws-hassub').append(`
                                <i class="fa fa-chevron-down"></i>
                            `);
                        }

                        $('li.ws-hassub.active').children('i.fa').removeClass('fa-chevron-down').addClass('fa-chevron-up');

                        $('li.ws-hassub').children('a').css('display', 'table');
                        $('li.ws-hassub').children('i.fa').css({
                            'position': 'absolute',
                            'right': '0',
                            'top': '0',
                            'padding-left': '10px',
                            'padding-right': '10px',
                            'cursor': 'pointer',
                            'height': hei,
                            'margin-top': mar_top
                        });
                    });
                };
                pluginClick = function() {
                    $("body").find(selec).each(function(key, item) {
                        $(item).find('li.ws-hassub > i.fa').on("click", function() {
                            if ($(this).hasClass('fa-chevron-down')) {
                                $(this).removeClass('fa-chevron-down').addClass('fa-chevron-up');
                            } else {
                                $(this).removeClass('fa-chevron-up').addClass('fa-chevron-down');
                            }
                            // Set Animate
                            switch(opt.animate) {
                                case 'slide':
                                    if ($(this).parent().children("ul").is(':hidden')) {
                                        $(this).parent().children("ul").slideDown(400);
                                    } else {

                                        if (  $(this).parent().hasClass('active') ) {
                                            $(this).parent().removeClass('active');
                                        }

                                        $(this).parent().children("ul").slideUp(400);
                                    }
                                    break;
                                case 'fade':
                                    $(this).parent().children("ul").fadeToggle(400);
                                    break;
                                default:
                                    if ($(this).parent().children("ul").is(':visible')) {
                                        $(this).parent().children("ul").hide();
                                    } else {
                                        $(this).parent().children("ul").show();
                                    }
                                    break;
                            };
                        });
                    });
                }
                resizeFix = function() {
                    if ((opt.resolution+"").match(/^\d+$/) && $(window).width() > parseInt(opt.resolution)) {
                        plugin.each(function() {
                            $('li.ws-hassub').remove('i');
                        });
                    }
                }
                return init();
                return $(window).on('resize', resizeFix);
            }
        }
    }
})(jQuery);