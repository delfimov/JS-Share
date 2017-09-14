# JS-Share - social and messengers sharing 

Easy to use social networks and messenger apps sharing javascript library.
 
## Key features
* Small size
* Vanilla javascript, no any dependencies
* IE9+, Chrome, Safari, Firefox support
* Only a single responsibility - sharing
* CSS styling is up to you


## How to install

The easiest way:
```bash
npm install js-share
```


## How to use

HTML code:
```javascript
    <script src="jsshare.js"></script>

    <div>Share:
        <button class="social_share" data-type="vk">VK.com</button>
        <button class="social_share" data-type="fb" data-fb_api_id="1234567890">Facebook</button>
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
```

Javascript code:

```javascript
    document.addEventListener("DOMContentLoaded", function(event) {
        var buttons = document.querySelectorAll(".social_share");
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function() {
                return JSShare.go(this);
            }, false);
        }
    });
```

or 

```javascript
    document.addEventListener("DOMContentLoaded", function(event) {
        var buttons = document.querySelectorAll(".social_share"),
            options = {
                url: 'http://www.example.com/fancy/url',
                fb_api_id: '1234567890'
            };
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function() {
                return JSShare.go(this, options);
            }, false);
        }
    });
```

Data attributes:
* `data-type` - where to share. Required. 
* `data-fb_api_id` - Facebook API id. Required for Facebook (can be set on initialization). 
* `data-url` - URL to share. Default is current page location (`location.href`).
* `data-title` - title to share. Default is current page title (`document.title`). 
* `data-text` - share description, only for vk, ok, lj, twitter, mailru, email. 
* `data-utm_source` - utm_source for links. Default is none.
* `data-utm_medium` -  utm_medium for links. Default is none.
* `data-utm_campaign` - utm_campaign for links. Default is none.
* `data-popup_width` - popup width. Default is `626` pixels.
* `data-popup_height` - popup height. Default is `436` pixels.

Same options could be used on script initialization.

`data-title` and `data-text` are optional and will be ignored by some services. 
Social networks usually get all required info from [Open Graph](http://ogp.me/) metadata (`og:*` tags).


## More examples

```html
    <button class="social_share" utm_source="messengers" data-utm_medium="telegram" data-type="telegram">Telegram</button>
    <button class="social_share" utm_source="messengers" data-utm_medium="whatsapp" data-type="whatsapp">Whatsapp</button>
    <button class="social_share" utm_source="messengers" data-utm_medium="viber" data-type="viber">Viber</button>
```

or

```html
    <button class="social_share" utm_source="messengers" data-utm_medium="vk" data-url="http://www.example.com/fancy/url" data-type="vk">VK.com</button>
    <button class="social_share" utm_source="messengers" data-utm_medium="fb" data-url="http://www.example.com/fancy/url" data-type="fb" data-fb_api_id="1234567890">Facebook</button>
    <button class="social_share" utm_source="messengers" data-utm_medium="ok" data-url="http://www.example.com/fancy/url" data-type="ok">OK.ru</button>
```


See working demo `example.html`.


## License

MIT © Dmitry Elfimov.
