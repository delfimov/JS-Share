# JS-Share - social and messengers sharing 

Easy to use social media share library. This project is intended to help you integrate sharing within your code.
 
## Key features
* Small size
* Vanilla javascript
* No dependency
* IE9+, Chrome, Safari, Firefox support
* CSS styling is up to you
* Supports AMD/CommonJS

## Installation

### Package Managers

JavaScript Share supports [npm](https://www.npmjs.com/package/js-share) under the name `js-share`.

```bash
npm install js-share --save
```

### Direct download

Download the script [here](https://github.com/delfimov/JS-Share/blob/master/src/jsshare.js) and include it (unless you are packaging scripts somehow else):

```html
<script src="/path/to/jsshare.js"></script>
```

**Do not include the script directly from GitHub (http://raw.github.com/...).** The file is being served as text/plain and as such being blocked
in Internet Explorer on Windows 7 for instance (because of the wrong MIME type). Bottom line: GitHub is not a CDN.


### Module Loaders

JavaScript Share can also be loaded as an AMD or CommonJS module.

## Supported sharing platforms
 * Facebook
 * Twitter
 * LinkedIn
 * VK
 * OKru
 * Google+
 * GoogleBookmarks
 * Reddit
 * Tumblr
 * Pinterest
 * Weibo
 * Baidu
 * Mail.Ru
 * Line.me
 * Telegram
 * WhatsApp
 * Viber
 * Skype
 * Email


## Basic Usage

HTML code:
```html
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
import JSShare from "js-share";
var shareItems = document.querySelectorAll('.social_share');
for (var i = 0; i < shareItems.length; i += 1) {
  shareItems[i].addEventListener('click', function share(e) {
    return JSShare.go(this);
  });
}

```

or 

```javascript
import JSShare from "js-share";
var shareItems = document.querySelectorAll('.social_share');
JSShare.options.url = "http://www.example.com/fancy/url";
for (var i = 0; i < shareItems.length; i += 1) {
  shareItems[i].addEventListener('click', function share(e) {
    return JSShare.go(this);
  });
}
```

See working demo `example.html`.

Data attributes:
* `data-type` - where to share. Required. 
* `data-url` - URL to share. Default value is the current page location (`location.href`).
* `data-title` - title to share. Default is the current page title (`document.title`). 
* `data-text` - share description. Only for vk, ok, googlebookmarks, lj, tumblr, linkedin, mailru, email. 
* `data-utm_source` - utm_source for links. Default is none.
* `data-utm_medium` -  utm_medium for links. Default is none.
* `data-utm_campaign` - utm_campaign for links. Default is none.
* `data-popup_width` - popup width. Default is `626` pixels.
* `data-popup_height` - popup height. Default is `436` pixels.

Same options could be used on script initialization.

`data-title` and `data-text` are optional and will be ignored by some services. 
Social networks usually get all required data from [Open Graph](http://ogp.me/) metadata (`og:*` tags).


## More examples

```html
    <button class="social_share" utm_source="messengers" data-utm_medium="telegram" data-type="telegram">Telegram</button>
    <button class="social_share" utm_source="messengers" data-utm_medium="whatsapp" data-type="whatsapp">Whatsapp</button>
    <button class="social_share" utm_source="messengers" data-utm_medium="viber" data-type="viber">Viber</button>
```

or

```html
    <button class="social_share" utm_source="messengers" data-utm_medium="vk" data-url="http://www.example.com/fancy/url" data-type="vk">VK.com</button>
    <button class="social_share" utm_source="messengers" data-utm_medium="fb" data-url="http://www.example.com/fancy/url" data-type="fb">Facebook</button>
    <button class="social_share" utm_source="messengers" data-utm_medium="ok" data-url="http://www.example.com/fancy/url" data-type="ok">OK.ru</button>
```


## License

MIT © Dmitry Elfimov.
