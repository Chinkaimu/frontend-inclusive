# HTTP

## 描述一下 csrf 和 xss 的网络攻击及防范。
  * CSRF：
    * 跨站请求伪造，可以理解为攻击者盗用了用户的身份，以用户的名义发送了恶意请求，比如用户登录了一个网站后，立刻在另一个tab页面访问量攻击者用来制造攻击的网站，这个网站要求访问刚刚登陆的网站，并发送了一个恶意请求，这时候 CSRF 就产生了，比如这个制造攻击的网站使用一张图片，但是这种图片的链接却是可以修改数据库的，这时候攻击者就可以以用户的名义操作这个数据库.
    * 防御方式的话：使用验证码，检查https头部的refer，使用token
    * token方式：可以在 HTTP 请求中以参数的形式加入一个随机产生的 token，并在服务器端建立一个拦截器来验证这个 token，如果请求中没有 token 或者 token 内容不正确，则认为可能是 CSRF 攻击而拒绝该请求。
    * 更详细的内容参考[文档](https://blog.csdn.net/stpeace/article/details/53512283)
  * XSS：跨站脚本攻击，是说攻击者通过注入恶意的脚本，在用户浏览网页的时候进行攻击，比如获取cookie，或者其他用户身份信息，可以分为存储型和反射型，存储型是攻击者输入一些数据并且存储到了数据库中，其他浏览者看到的时候进行攻击，反射型的话不存储在数据库中，往往表现为将攻击代码放在url地址的请求参数中，防御的话为cookie设置httpOnly属性，对用户的输入进行检查，进行特殊字符过滤。转义后再传给后端。
  * 参考文档：
    * [前端安全系列（一）：如何防止XSS攻击？](https://tech.meituan.com/2018/09/27/fe-security.html)
    * [前端安全系列（二）：如何防止CSRF攻击？](https://tech.meituan.com/2018/10/11/fe-security-csrf.html)

## 什么是 CSP ？
* Content Security Policy 网页安全政策：白名单制度，开发者明确告诉浏览器，哪些外部资源可以加载和执行，等同于提供白名单。它的实现和执行全部由浏览器完成，开发者只需要提供配置。
* 启用方式：
  * HTTP 头信息的 Content-Security-Policy 字段，
  ```
    Content-Security-Policy: script-src 'self'; object-src 'none';
      style-src cdn.example.org third-party.org; child-src https:;
  ```
  * 通过网页的 <meta> 标签
  ```
    <meta http-equiv="Content-Security-Policy" content="script-src 'self'"; object-src 'none'; style-src cdn.example.org; child-src https:">
  ```
* 限制选项：
  * script-src, style-src, img-src, media-src, font-src, object-src, child-src, worker-src, manifest-src。 script-src 和 object-src（flash 可以执行外部脚本） 必须设置，除非设置了 default-src。
  * default-src 设置上面各个选项的默认选项
  * report-uri 还可以告诉浏览器把注入行为报告给哪个网址
* Content-Security-Policy-Report-Only： 仅报告不限制

## 从输入 URL 发生了什么？
  * DNS 域名解析：将域名解析成 IP 地址。
    * 域名：因特网使用的命名系统。[四级域名.]三级域名.二级域名.顶级域名
    * 两种查询方式：
      * 本地域名服务器去联系根域名服务器、顶级域名服务器、权限域名服务器：主机请求本地域名服务器；本地域名服务器查询根域名服务器；根域名服务器返回顶级域名服务器；顶级域名服务器返回权限域名服务器IP。权限域名服务器告诉本地域名服务器查询主机的 IP 地址，本地域名服务器返回给主机。
      * 主机 - 本地域名服务器 - 根域名服务器 - 权限域名服务器，递归查询，然后一层层返回。
      * 域名服务器广泛使用了高速缓存，需要考虑存在缓存的情况。
      * 总共 8 个步骤，要使用 8 个 UDP 用户数据报的报文。
  * TCP 连接： 三次握手连接。客户端和服务器总共发送 3 个包，最后进入到 BESTABLISHED 状态，握手结束。握手目的是连接服务器指定端口，建立 TCP 连接，并同步连接双方的序列号和确认号，交换 TCP 窗口大小信息。socket 编程中，客户端执行 connect() 时触发。
    * 三次握手的目的“为了防止已失效的链接请求报文段突然又传送到了服务端，因而产生错误。”
    * 参考链接：https://hit-alibaba.github.io/interview/basic/network/TCP.html
  * 发送HTTP请求：三次握手成功后发送 HTTP 请求：请求头、请求行、请求体。
  * 服务器处理请求并返回报文。
  * 浏览器解析渲染页面。
    * 根据 HTML 解析出 DOM 树；
    * 根据 CSS 解析出 CSS 规则树；
    * 结合 DOM 树和 CSS 规则树，生成渲染树；
    * 根据渲染树计算每一个节点的信息；
    * 根据计算好的信息绘制页面。
  * 断开连接： TCP 四次挥手。TCP 的连接拆除需要发送 4 个包，客户端或者服务端均可以作为发起方发起挥手动作。在 socket 编程中，使用 close() 产生挥手操作，4 次挥手后进入 closed 状态。
    * 例如客户端发起端来请求，表示自己已经没有数据可以发送了，但是仍然可以接收数据。请求关闭连接。
    * 服务端接收到了关闭连接的请求，发送客户端确认收到了关闭请求。但自己还没有准备好关闭。
    * 服务端准备好关闭时，向客户端发送结束请求。发送完毕后进入等待客户端最后一个 ACK 的状态。3
    * 客户端接收到服务器的关闭请求，发送一个确认包，并进入 TIME_WAIT 状态。等待可能出现的要求重传 ACK 包。服务端接收到包以后关闭连接。客户端等待了某个固定时间，没有收到服务端的 ACK，认为服务端已经这个奶茶给你关闭连接了，于是自己也关闭连接，进入 CLOSED 状态。
  * 参考文档：[从URL输入到页面展现到底发生什么？](https://segmentfault.com/a/1190000017184701)

## TCP 和 UDP 的区别
* TCP 面向连接的运输层协议，提供可靠交付。应用于要求数据准确传输，时延可以容忍的场景。如浏览器。
* UDP 无连接，尽最大努力交付。应用于对通讯质量要求不高，但是速度尽量快。如IP电话、QQ语音等。
* 参考连接：[传输层TCP和UDP的区别分析与应用场景【转载】](https://blog.csdn.net/u013777351/article/details/49226101)

## HTTP2.0 的优点？
* 服务端推送：唯一一个需要开发者配置的功能。指的是没有收到浏览器的请求，服务器就把各种资源推送给服务点。例如浏览器只请求了 index.html 资源，但是服务器会把 index.html, style.css, example.png 全部发送给浏览器。这样只需要一轮 HTTP 通信，浏览器就得到了全部资源，提高了性能。对于浏览器已有缓存的资源，推送有点浪费贷款。所以可以根据 cookie 判断是不是第一次访问，只给第一次访问的用户推送资源。或者只推送 CSS 资源。
  * 参考资料：[HTTP/2 服务器推送（Server Push）教程](http://www.ruanyifeng.com/blog/2018/03/http2_server_push.html)
* 多路复用，允许同时通过单一的 HTTP/2 链接发起多重的请求-响应消息：一次 TCP 链接，多次请求。
* 二进制分帧
* 首部压缩：gzip 只会压缩 body。轮训请求抽不特别是 cookie 占用很大部分空间，首部压缩能使整个 HTTP 数据包小很多，传输也能更快。

## HTTP3.0 的优点？
* 引进了快速 UDP 互联网链接，使用 UDP 进行多路并发传输的协议。
* 参考文档：[科普：QUIC协议原理分析](https://zhuanlan.zhihu.com/p/32553477)

## HTTP报文的请求和返回会有几个部分（请求行、请求头、请求体）；每部分具体都有什么（常见的请求头）
* 请求行：方法、请求 URL、HTTP 协议及版本
* 空行
* 请求头：accept, cache-control, cookie, referer, user-agent
* 请求体：数据

## GET 和 POST 的区别
* 目的：GET 向指定资源请求数据，POST 向指定的资源提交要被处理的数据
* 传参方式：GET 放URL中，且有长度限制，POST 放请求体中
* 对数据长度的限制：GET 参数受 URL 长度限制制约，URL 最大长度是 2048 个字符； POST 无限制
* 对数据类型的限制： GET 只允许 ASCII 字符；POST 没有限制，也允许二进制
* 安全性：GET 发送数据是 URL 的一部分，会被保存在浏览器历史或服务器日志中，不安全。 POST 相对安全。
* 缓存： GET 能被缓存，POST 不能缓存。
* 刷新造成的影响：GET 请求无害；POST 数据刷新会被重新提交
* 编码格式：GET application/x-www-form-urlencoded。 POST application/x-www-form-urlencoded 或 multipart/form-data。二进制使用多重编码。
* 参考文档：[HTTP 方法：GET 对比 POST](https://www.w3school.com.cn/tags/html_ref_httpmethods.asp)

## 有哪些请求类型，分别是什么含义
* HTTP1.0 有 3 种: GET， POST， HEAD
* HTTP1.1新增了 6 种：PUT、DELETE、CONNECT、OPTIONS（从服务器种获得更多信息）、TRACE、PATCH
* 参考资料：
  * [HTTP 请求方法](https://www.runoob.com/http/http-methods.html)

## HTTP 缓存控制
* 强缓存以及协商缓存

## 缓存相关的 HTTP 请求头
* cache-control
* last-modified-since
* etag
* if-match

## 介绍 HTTP 和 HTTPS 的区别
* HTTPS 其实是在 HTTP 上又加了一层处理加密信息的模块。 HTTP + SSL/TLS （TLS 是 SSL 的最新版本）。
* HTTPS 主要包含内容加密、CA身份验证、MD5等散列值防止信息篡改特性。

## HTTPS 加密过程
* 参考文档：
  * [HTTPS加密过程/原理 理解](https://www.jianshu.com/p/2b89b7ac7c9d)

## HTTPS 增加了耗时，该怎么解决呢？
* 使用 HSTS 策略，告诉浏览器这个网站用 https 访问。响应请求头 script-transport-security
* 使用专门的加解密硬件处理加解密，减轻 CPU 负担。
* 减少证书链，减少 CA 请求时间
* 使用 HTTP/2，多路复用、头部压缩、服务器推送
* 参考文档：
  * [大话HTTPS：探讨优缺点及性能优化](https://segmentfault.com/a/1190000015788627)
  * [Web 性能优化与 HTTP/2](https://www.kancloud.cn/digest/web-performance-http2/74825)

## 跨域的了解和解决。
* 浏览器的同源策略规定了只能在同协议、接口、域名的情况下才能访问。否则无法读取 cookie, localstorage, IndexDB，DOM。ajax 请求无法发送。
* 解决方法：
  * CORS 跨域资源共享： 请求头部会加上 origin，响应头部会加上 Access-Control-Allow-Origin。
  * JSONP：利用了 <script> 标签不受同源限制的特性。
  * HTML 5 的 iframeB.postMessage('data', 'http://B.com'), windowB.addEventListener('message')。存在安全隐患，其他模块也可以去监听得到数据。
  * document.domain 设置相同的父域名，实现不同子域名自建的跨域通信。
  * Hash： 利用“hash 的变动不会触发页面刷新”的原理。父页面获取 iframe 的 src，将哈希数据加入。子页面 window.onhashchange = function () {} 进行监听。
  * 服务端代理，nginx 反向代理或者 nodejs 代理请求。开发环境下 webpack 有 http-proxy-middleware 可以在 devServer 中配置 proxy，config.dev.proxyTable 实现代理跨域。
  * websocket 服务端主动推送


## CORS 的返回头、CORS 预请求，什么时候会出发预请求。
* CORS 跨域资源共享：浏览器识别 ajax 发送了跨域请求的时候，会将其拦截并在 http 头中加一个 origin 字段，允许跨域通信。 实现 CORS 通信的关键是服务器，实现 CORS 接口。
* 可能对服务器数据产生副作用的 HTTP 请求方法（特别是 GET 以外的请求，或者搭配某些 MIME 类型的 POST 请求），浏览器首先使用 OPTIONS 发起一个预检请求，从而获知服务器是否允许该跨域请求。服务器确认允许之后，才发起实际的 HTTP 请求。在预检请求的返回中，服务器也可以通知客户端是否需要携带身份凭证。
* 简单请求不会触发 CORS 预检请求。
* 参考文档：
  * [HTTP 访问控制（CORS）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)