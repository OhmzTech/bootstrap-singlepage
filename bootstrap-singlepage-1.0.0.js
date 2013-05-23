/*
Twitter Bootstrap Single Page App Converter
Version: 1.0.0
Tested: Twitter Bootstrap 2+, jQuery 1.8.3+
Author: OhmzTech (www.ohmztech.com)
Documentation: https://github.com/OhmzTech/bootstrap-singlepage
*/

(function ($) {
    $.singlePageApp = function (config) {
        config = $.extend({},{
            refreshScripts: true,
            showLoading: false
        },config);
        if (config.userAgents) {
            var uaReg = new RegExp('//' + config.userAgents.join('|') + '//', 'i');
            if (!uaReg.test(navigator.userAgent)) {
                return false;
            }
        }
        this.loadPage = function(e) {
            var regExp = new RegExp("//" + location.host + "($|/)"),
                href = $(this).attr('href') || $(this).attr('action');
            if(!href || href.indexOf('#') > -1) {
                return;
            }
            if ((href.substring(0, 4) === "http") ? regExp.test(href) : true) {
                e.preventDefault();
                if (config.loadingElement) {
                    $(config.selector).hide();
                    $(config.loadingElement).show();
                }
                $.ajax(href,{
                    type: $(this).attr('method') || 'get',
                    data: $(this).serialize()
                }).done(function (response) {
                    var newEls = $(response);
                    var content = newEls.filter(config.selector);
                    $(config.selector).replaceWith(content);
                    if (config.refreshScripts) {
                        spa.refreshScripts(newEls);
                    }
                    if (config.loadingElement) {
                        $(config.loadingElement).hide();
                    }
                    $('body').scrollTop(0);
                    spa.setLinks();
                });
            }
        };
        this.refreshScripts = function (els) {
            var oldScripts = $.map($('script'), function (script, index) {
                return $(script).attr("src");
            });
            var newScripts = els.filter('script');
            newScripts.each(function (index, script) {
                if ($.inArray($(script).attr("src"), oldScripts) === -1) {
                    $('head').append(script);
                } else if(!$(script).attr("src")) {
                    // TO-DO: copy over inline scripts here as needed
                }
            });
        };
        this.setLinks = $.proxy(function() {
            $('a:not([data-toggle])').on('click',this.loadPage);
            $('form').on('submit',this.loadPage);
        },this);
        if ($('body').has($('meta[name="apple-mobile-web-app-capable"]'))) {
            $('meta[name="apple-mobile-web-app-capable"]').attr('content', 'yes');
        } else {
            $('head').append('<meta name="apple-mobile-web-app-capable" content="yes">');
        }
        this.setLinks();
        var spa = this;
    };
}(jQuery));