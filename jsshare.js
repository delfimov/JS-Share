JSShare = {
    /**
     * JS-Share - vanilla javascript social networks and messengers sharing
     * https://github.com/delfimov/JS-Share
     *
     * Copyright (c) 2017 by Dmitry Elfimov
     * Released under the MIT License.
     * http://www.opensource.org/licenses/mit-license.php
     *
     * Minimum setup example:
     *
    <div>Share:
        <button class="social_share" data-type="vk">VK.com</button>
        <button class="social_share" data-type="fb">Facebook</button>
        <button class="social_share" data-type="tw">Twitter</button>
        <button class="social_share" data-type="lj">LiveJournal</button>
        <button class="social_share" data-type="ok">ok.ru</button>
        <button class="social_share" data-type="mr">Mail.Ru</button>
        <button class="social_share" data-type="gg">Google+</button>
        <button class="social_share" data-type="telegram">Telegram</button>
        <button class="social_share" data-type="whatsapp">Whatsapp</button>
        <button class="social_share" data-type="viber">Viber</button>
        <button class="social_share" data-type="email">Email</button>
    </div>

    $(document).on('click', '.social_share', function(){
        return JSShare.go(this);
    });

     *
     * Inline example:
     *
    <a href="#" onclick="return JSShare.go(this)" data-type="fb" data-fb-api-id="123">I like it</a>

     *
     * @param element Object - DOM element
     * @param options Object - optional
     */
    go: function(element, options) {
        var self = JSShare,
            withoutPopup = [
                'unknown',
                'viber',
                'telegram',
                'whatsapp',
                'email'
            ],
            tryLocation = true, // should we try to redirect user to share link
            link,
            defaultOptions = {
                type:        'vk',           // share type
                fb_api_id:   '',             // Facebook API id
                url:         '',             // url to share
                title:       document.title, // title to share
                image:       '',             // image to share
                text:        '',             // text to share
                utm_source:  '',
                utm_medium:  '',
                utm_campaign:'',
                popup_width: 626,
                popup_height:436
            };

        options = self._extend(
            defaultOptions,                         // default options - low priority
            self._getData(element, defaultOptions), // options from data-* attributes
            options                                 // options from method call - highest proprity
        );

        if (typeof self[options.type] == 'undefined') {
            options.type = 'unknown'
        }

        link = self[options.type](options);

        if (withoutPopup.indexOf(options.type) == -1) {        // if we must try to open a popup window
            tryLocation = self._popup(link, options) === null; // we try, and if we succeed, we will not redirect user to share link location
        }

        if (tryLocation) {                                          // ...otherwise:
            if (element.tagName == 'A' && element.tagName == 'a') { // if element is <a> tag
                element.setAttribute('href', link);                 // set attribute href
                return true;                                        // and return true, so this tag will behave as a usual link
            } else {
                location.href = link;                               // if it's not <a> tag, change location to redirect
                return false;
            }
        } else {
            return false;
        }
    },

    unknown: function(options) {
        return encodeURIComponent(JSShare._getURL(options));
    },

    // vk.com - ВКонтакте
    vk: function(options) {
        return 'http://vkontakte.ru/share.php?'
            + 'url='          + encodeURIComponent(JSShare._getURL(options))
            + '&title='       + encodeURIComponent(options.title)
            + '&description=' + encodeURIComponent(options.text)
            + '&image='       + encodeURIComponent(options.image)
            + '&noparse=true';
    },

    // ok.ru - Одноклассники
    ok: function(options) {
        return 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1'
            + '&st.comments=' + encodeURIComponent(options.text)
            + '&st._surl='    + encodeURIComponent(JSShare._getURL(options));
    },

    // Facebook
    fb: function(options) {
        var url = JSShare._getURL(options);
        return 'https://www.facebook.com/dialog/share?'
            +'app_id=' + options.fb_api_id
            +'&display=popup'
            +'&href='         + encodeURIComponent(url)
            +'&redirect_uri=' + encodeURIComponent(url);
    },

    // Livejournal
    lj: function(options) {
        return 'http://livejournal.com/update.bml?'
            + 'subject='      + encodeURIComponent(options.title)
            + '&event='       + encodeURIComponent(options.text + '<br/><a href="' + JSShare._getURL(options) + '">' + options.title + '</a>')
            + '&transform=1';
    },

    // Twitter
    tw: function(options) {
        var url = JSShare._getURL(options);
        return 'http://twitter.com/share?'
            + 'text='         + encodeURIComponent(options.title)
            + '&url='         + encodeURIComponent(url)
            + '&counturl='    + encodeURIComponent(url);
    },

    // Mail.ru
    mailru: function(options) {
        return 'http://connect.mail.ru/share?'
            + 'url='          + encodeURIComponent(JSShare._getURL(options))
            + '&title='       + encodeURIComponent(options.title)
            + '&description=' + encodeURIComponent(options.text)
            + '&imageurl='    + encodeURIComponent(options.image);
    },


    // Google+
    gplus: function (options) {
        return 'https://plus.google.com/share?url='
            + encodeURIComponent(JSShare._getURL(options));
    },

    telegram: function (options) {
        return 'tg://msg_url?url=' + encodeURIComponent(JSShare._getURL(options));
    },

    whatsapp: function (options) {
        return 'whatsapp://send?text=' + encodeURIComponent(JSShare._getURL(options));
    },

    viber: function (options) {
        return 'viber://forward?text=' + encodeURIComponent(JSShare._getURL(options));
    },

    email: function(options) {
        return 'mailto:?'
            + 'subject=' + encodeURIComponent(options.title)
            + '&body='   + encodeURIComponent(JSShare._getURL(options))
                         + encodeURIComponent("\n" + options.text);
    },

    _getURL: function(options) {
        if (options.url == '') {
            options.url = location.href;
        }
        var url = options.url,
            utm = '';
        if (options.utm_source != '') {
            utm += '&utm_source=' + options.utm_source;
        }
        if (options.utm_medium != '') {
            utm += '&utm_medium=' + options.utm_medium;
        }
        if (options.utm_campaign != '') {
            utm += '&utm_campaign=' + options.utm_campaign;
        }
        if (utm != '') {
            url = url + '?' + utm;
        }
        return url;
    },

    // Open popup window for sharing
    _popup: function(url, _options) {
        return window.open(url,'','toolbar=0,status=0,scrollbars=1,width=' + _options.popup_width + ',height=' + _options.popup_height);
    },

    /**
     * Object Extending Functionality
     */
    _extend: function(out) {
        out = out || {};
        for (var i = 1; i < arguments.length; i++) {
            if (!arguments[i])
                continue;

            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key))
                    out[key] = arguments[i][key];
            }
        }
        return out;
    },

    /**
     * Get data-attributes
     */
    _getData: function(el, defaultOptions) {
        var data = {};
        for (var key in defaultOptions) {
            var value = el.getAttribute('data-' + key);
            if (value !== null && typeof value != 'undefined') {
                data[key] = value;
            }
        }
        return data;
    }
};
