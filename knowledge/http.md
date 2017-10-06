# Http
http (Hypertext Transfer Protocol) is a stateless, application-layer protocol for communicating between distributed systems.

It assumes very little about a system and does not keep any state between different message exchanges.

## The Three Pillars of http
http is essentially built and ran by three main components: URL structure, Verbs, and Status Codes.

### URL Structure
a URL (Uniform Resource Locator) is normally used to reference web pages.

```
http://www.domain.com:8000/path/value?fake=true
```
* `http`: protocol
* `www.domain.com`: host
* `:8000`: port
* `/path/value`: path to the resource
* `?fake=true`: query


### Verbs
`GET`: fetch an existing resource. The URL contains all the necessary information the server needs to location and return the resource.

`POST`: create a new resource. POST request usually carry a payload/body that specifies the data for the new resource.

`PUT`: updating an existing resource. The Payload may contain the updated data for the resource.

`DELETE`: delete and existing resource.

### Status Codes
Every HTTP request that the server receives, should be responded with an HTTP status code.

Status code classes
* `1xx`: Information
* `2xx`: Successful
* `3xx`: Redirection
* `5xx`: Server Error

#### 2xx: Successful
This tells the client that the request was successfully processed

* `200` OK: the request was successful
* `202` Accepted: the request was accepted but may not include the resource in the response. This is useful for async processing on the server side. The server may choose to send information for monitoring.
* `204` No Content: there is no message body in the response.
* `205` Reset Content: indicates to the client to reset its document view.
* `206` Partial Content: indicates that the response only contains partial content. Additional headers indicate the exact range and content expiration information.

##### 3xx: Redirection
This requires the client to take additional action. The most common use-case is to jump to a different URL in order to fetch the resource.

* `301` Moved Permanently: the resource is now located at a new URL.
* `303` See Other: the resource is temporarily located at a new URL. The Location response header contains the temporary URL.
* `304` Not Modified: the server has determined that the resource has not changed and the client should use its cached copy.

##### 4xx: Client Error
These codes are used when the server thinks that the client is at fault, either by requesting an invalid resource or making a bad request.

* `404` Not Found: indicates that the resource is invalid and does not exist on the server.
* `400` Bad Request: the request was malformed.
* `401` Unauthorized: request requires authentication. The client can repeat the request with the Authorization header. If the client already included the Authorization header, then the credentials were wrong.
* `403` Forbidden: server has denied access to the resource.
* `405` Method Not Allowed: invalid HTTP verb used in the request line, or the server does not support that verb.
* `409` Conflict: the server could not complete the request because the client is trying to modify a resource that is newer than the client's time stamp.

##### 5xx: Server Error
This class of codes are used to indicate a server failure while processing the request. The most commonly used error code is 500 Internal Server Error. The others in this class are:

* `500` Internal Server Error: the server cannot process the request for an unknown reason.
* `501` Not Implemented: the server does not yet support the requested functionality.
* `503` Service Unavailable: this could happen if an internal system on the server has failed or the server is overloaded. Typically, the server won't even respond and the request will timeout.


# Resources
* https://code.tutsplus.com/tutorials/http-the-protocol-every-web-developer-must-know-part-1--net-31177
* https://www.digitalocean.com/community/tutorials/how-to-troubleshoot-common-http-error-codes
