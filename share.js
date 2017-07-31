Share = {
    /**
     * Показать пользователю дилог шаринга в сооветствии с опциями
     * Метод для использования в inline-js в ссылках
     * При блокировке всплывающего окна подставит нужный адрес и ползволит браузеру перейти по нему

    // Minimum setup example:
    <p>Поделиться:
        <button class="social_share" data-type="vk">ВКонтакте</button>
        <button class="social_share" data-type="fb">Facebook</button>
        <button class="social_share" data-type="tw">Twitter</button>
        <button class="social_share" data-type="lj">LiveJournal</button>
        <button class="social_share" data-type="ok">Одноклассники</button>
        <button class="social_share" data-type="mr">Mail.Ru</button>
        <button class="social_share" data-type="gg">Google+</button>
    </p>

    $(document).on('click', '.social_share', function(){
        Share.go(this);
    });

    // Inline example:
    <a href="#" onclick="return share.go(this)" data-type="fb" data-fb-api-id="123">I like it</a>

     *
     * @param element Object - DOM element
     * @param options Object - optional
     */
    go: function(element, options) {
        var self = Share,
            $element = $(element),
            withoutPopup = [
                'unknown',
                'viber',
                'telegram',
                'whatsapp',
                'email'
            ],
            tryLocation = true,
            link,
            defaultOptions = {
                type:        'vk',           // тип соцсети
                fb_api_id:   '',             // Facebook API id
                url:         '',             // url для шаринга
                count_url:   location.href,  // для какой ссылки крутим счётчик
                title:       document.title, // заголовок шаринга
                image:       '',             // картинка шаринга
                text:        '',             // текст шаринга
                utm_source:  '',
                utm_medium:  '',
                utm_campaign:'',
                popup_width: 626,
                popup_height:436
            };
        options = $.extend(
            defaultOptions,
            $element.data(), // Если параметры заданы в data, то читаем их
            options          // Параметры из вызова метода имеют наивысший приоритет
        );

        if (typeof self[options.type] == 'undefined') {
            options.type = 'unknown'
        }

        link = self[options.type](options);

        if (withoutPopup.indexOf(options.type) == -1) {
            tryLocation = self._popup(link, options) === null;
        }

        if (tryLocation) {
            // не надо открывать или не удалось открыть попап
            if ( $element.is('a') ) {
                // Если это <a>, то подставляем адрес и просим браузер продолжить переход по ссылке
                $element.prop('href', link);
                return true;
            } else {
                // Если это не <a>, то пытаемся перейти по адресу
                location.href = link;
                return false;
            }
        } else {
            // Попап успешно открыт, просим браузер не продолжать обработку
            return false;
        }
    },

    unknown: function(options) {
        return encodeURIComponent(Share._getURL(options));
    },

    // vk.com - ВКонтакте
    vk: function(options) {
        return 'http://vkontakte.ru/share.php?'
            + 'url='          + encodeURIComponent(Share._getURL(options))
            + '&title='       + encodeURIComponent(options.title)
            + '&description=' + encodeURIComponent(options.text)
            + '&image='       + encodeURIComponent(options.image)
            + '&noparse=true';
    },

    // ok.ru - Одноклассники
    ok: function(options) {
        return 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1'
            + '&st.comments=' + encodeURIComponent(options.text)
            + '&st._surl='    + encodeURIComponent(Share._getURL(options));
    },

    // Facebook
    fb: function(options) {
        var url = Share._getURL(options);
        return 'https://www.facebook.com/dialog/share?'
            +'app_id=' + options.fb_api_id
            +'&display=popup'
            +'&href='        + encodeURIComponent(url)
            +'&redirect_uri='+ encodeURIComponent(url);
    },

    // Livejournal
    lj: function(options) {
        return 'http://livejournal.com/update.bml?'
            + 'subject='        + encodeURIComponent(options.title)
            + '&event='         + encodeURIComponent(options.text + '<br/><a href="' + Share._getURL(options) + '">' + options.title + '</a>')
            + '&transform=1';
    },

    // Твиттер
    tw: function(options) {
        return 'http://twitter.com/share?'
            + 'text='      + encodeURIComponent(options.title)
            + '&url='      + encodeURIComponent(Share._getURL(options))
            + '&counturl=' + encodeURIComponent(options.count_url);
    },

    // Mail.ru
    mailru: function(options) {
        return 'http://connect.mail.ru/share?'
            + 'url='          + encodeURIComponent(Share._getURL(options))
            + '&title='       + encodeURIComponent(options.title)
            + '&description=' + encodeURIComponent(options.text)
            + '&imageurl='    + encodeURIComponent(options.image);
    },


    // Google+
    gplus: function (options) {
        return 'https://plus.google.com/share?url='
            + encodeURIComponent(Share._getURL(options));
    },

    telegram: function (options) {
        return 'tg://msg_url?url=' + encodeURIComponent(Share._getURL(options));
    },

    whatsapp: function (options) {
        return 'whatsapp://send?text=' + encodeURIComponent(Share._getURL(options));
    },

    viber: function (options) {
        return 'viber://forward?text=' + encodeURIComponent(Share._getURL(options));
    },

    email: function(options) {
        return 'mailto:?'
            + 'subject=' + encodeURIComponent(options.title)
            + '&body='   + encodeURIComponent(Share._getURL(options)) + " \n"
                         + encodeURIComponent(options.text);
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

    // Открыть окно шаринга
    _popup: function(url, _options) {
        return window.open(url,'','toolbar=0,status=0,scrollbars=1,width=' + _options.width + ',height=' + _options.height);
    }

};
