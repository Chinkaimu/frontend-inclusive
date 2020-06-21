## What is Charles ?
https://www.charlesproxy.com/
Charles is a web proxy(HTTP proxy / HTTP monitor) that runs on your own computer.

## The useful tools used in debugging.
Use following tools to change the request location. So I can use it to test local code or some test environment is working for the product environment, debug for product environment. It even could be a bridge to see the phone's behavior by recording the internet request (This requests that the phone and PC in the same WiFi and set the phone's proxy).
	* Map local
  * Map remote

## Some problems occurred to me.
	• There is a import thing, if we want to record SSL/HTTPS requests, we need install SSL certificate and trust it. Here is the document https://www.charlesproxy.com/documentation/using-charles/ssl-certificates/.  Here, I will list some errors occurred to me in Windows.
		• After I install the certificate, it doesn't work. Resolve: don't use the default selection, save the certificate to the "Trusted Root Certification Authorities" and trust it. Maybe this is what's the meaning "import to the 'Trusted Root Certification Authorities'" in document. I got this thinking when you failed in one way, use another way.
[Save to Trusted Root Certification Authorities](./img/cer.png)