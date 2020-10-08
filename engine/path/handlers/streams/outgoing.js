class OutgoingHTTPData {
    constructor(res) {
        this.res = res;
        this.ended = false;
    }

    status(n) { this.res.statusCode = n; return this; };

    header(name, value) { this.res.setHeader(name, value); return this; };

    cookie(name, value, { secure, expires, max_age, domain, path, same_site, http_only }) { this.header('Set-Cookie', `${name}=${value}${expires ? `; Expires=${expires}` : ''}${max_age ? `; Max-Age=${max_age}` : ''}${domain ? `; Domain=${domain}` : ''}${path ? `; Path=${path}` : ''}${same_site ? `; SameSite=${same_site}` : ''}${secure ? '; Secure' : ''}${http_only ? `; HttpOnly` : ''}`); return this };

    getHeader(name) { return this.res.getHeader(name) };

    write(data) { this.res.write(data); return this; };

    end(data) { this.res.end(data); this.ended = true; return this; };
}

module.exports = OutgoingHTTPData;