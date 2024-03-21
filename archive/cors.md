# Cors

首先说一点，跨域是浏览器同源策略的限制!

> CORS，全称是 "Cross-Origin Resource Sharing"（跨源资源共享），是一种允许在一个网页上被请求自别的域（协议 + 域名 + 端口）的资源（例如字体，JavaScript 等）的机制。

举个 🌰：
打开网站 `https://doxas.dev`后，改网站请求了其他域名下的资源，比如 `https://xxx.com/test.js`, 这里就需要`https://xxx.com`所在的服务允许来自`https://doxas.dev`的请求。

为什么说是浏览器的限制呢？因为浏览器会问`https://xxx.com`：我是来自`https://doxas.dev`的请求，你允许我访问不？不允许我就溜了.... 。而来自服务端的请求，不会有这种询问，直接就请求了。

> 默认情况下，浏览器的同源策略会阻止不同源的 HTTP 请求，例如，使用 XMLHttpRequest 或 Fetch API 发出的请求。为了增加网页的安全性，这是必要的。然而，有时我们确实需要进行跨域请求。

怎么允许跨域呢？主要有下面几种方法：

## jsonp

利用浏览器的 `script` 标签，在请求数据的时候把回调函数名添加到 `query` 里面

> [!TIP]
> 浏览器标签，比如 `img` `script`不受 cors 限制。但是这并不意味着这些资源的服务器允许跨域操作。例如，如果直接通过 Ajax 或 Fetch API 获取这些资源，还是需要服务器设置正确的 CORS 策略。

> [!TIP]
> 只能是 `Get` 请求

```js
// 客户端代码
function jsonp() {
  var script = document.createElement('script');
  script.type = 'text/javascript';

  // 传参并指定回调执行函数为backFn
  script.src = 'http://localhost:8100/getUserInfo?uid=100&callback=backFn';
  document.head.appendChild(script);
}

// 回调执行函数
function backFn(res) {
  alert(JSON.stringify(res));
}

document.getElementById('btn_get_data').addEventListener('click', () => {
  jsonp();
});
```

```js
let uid = ctx.query.uid;
let callback = ctx.query.callback;
ctx.body = 'backFn({"code": 0, "user": "admin"})';
```

当浏览器加载完成服务端返回的数据后，会执行`backFn({"code": 0, "user": "admin"})`这段代码

补充一下，`jsonp`的方式已经很老了，目前业务开发中一般不会采用这种方式了。但目前流行的一些框架，会通过 `jsonp` 的方式实现按需加载

## CORS

浏览器将 `CORS` 请求分成两类：简单请求（`simple request`）和非简单请求（预检请求）（`not-so-simple request`）

简单请求：

(1) 请求方法是以下三种方法之一: `HEAD` `GET` `POST`

(2)`HTTP` 请求头信息不超出以下几种字段：

`Accept`
`Accept-Language`
`Content-Language`
`Last-Event-ID`
`Content-Type`：只限于三个值 `application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`

不满足简单请求的就是复杂请求了

### 简单请求

对于简单请求，浏览器直接发出 `CORS` 请求。具体来说，就是在头信息之中，增加一个 `Origin` 字段

服务器会检查 `Origin`字段，如果允许，服务器返回的响应，会多出几个头信息字段：

```js
Access-Control-Allow-Origin: BROWSER-ORIGIN || * //必须
Access-Control-Allow-Credentials: true //可选, 是否允许发送Cookie.如果服务器不允许发送Cookie，删除即可
Access-Control-Expose-Headers: YOUR-HEADER-KEY //可选  CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定
Content-Type: text/html;
charset=utf-8
```

### withCredentials

如果要把 Cookie 发到服务器，一方面要服务器同意，指定 Access-Control-Allow-Credentials 字段。客户端也要打开 withCredentials:

```js
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
```

如果要发送 Cookie，Access-Control-Allow-Origin 就不能设为星号，必须指定明确的、与请求网页一致的域名

如果服务端不允许跨域，则不返回 Access-Control-Allow-Origin 字段 ，客户端不会报错（status 可能是 200），但会被 XHR 的 onerror 捕获

## 服务端代理

因为 cors 是浏览器的限制，服务端本身并没有这种限制。所以可以通过服务代理的方式实现跨域。

原始访问过程：

浏览器打开 https://doxas.dev -> 网页上请求 `https://xxx.com/api`

代理后的访问过程:

浏览器打开 https://doxas.dev -> 网页上请求 `https://doxas.dev/api`(这个代理服务也是我们拥有的) -> 发现是需要代理的请求 -> 请求到真实服务器`https://xxx.com/api` -> 真实服务器返回结果到代理服务 -> 返回浏览器

代理服务一般可以通过 Nginx 实现，给一段 Nginx 配置:

```nginx
server {
    listen 80;
    server_name ep.lanma-inc.com;
    client_max_body_size 100M;

    location /api/ {
      proxy_pass http://xxsdf.com:8087;  # 真实服务器地址
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_hide_header 'Access-Control-Allow-Origin'; # 这一行的作用是什么?

      add_header 'Access-Control-Allow-Origin' '*' always;
      add_header 'Access-Control-Allow-Methods' 'GET, DELETE, POST, OPTIONS' always;
      add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range' always;
      if ($request_method = 'OPTIONS') {
        return 200;
      }
    }
}
```

在开发过程中，一般会通过 vite 或 webpack 启动一个 devserver，即开发页面前端请求打到我们本地的开发服务器上，再请求到真实的服务器上，也就避免了跨域.

举个 🌰：

```ts
// vite.config.ts

export default {
  // others
  server: {
    proxy: {
      '/api': {
        target: 'http://xxxxxx.com', // 要代理的目标接口地址
        changeOrigin: true,
      },
    },
  },
};
```

### 注意

1. 服务端返回可能有多层代理，比如 nginx -> gateway -> 后端服务，只能设置一层 header，重复设置也会导致失败
2. cors 先发起 Option 请求，有些后端服务里并没有处理 Option, 导致失败
3. 一些后端服务会返回 201 等状态码，这种情况下浏览器不识别，也会报 cors 错误。 Option 必须要是 200 才行
