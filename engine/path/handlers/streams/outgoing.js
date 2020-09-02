class OutgoingHTTPData {
    constructor(res) {
        this.res = res;
        this.ended = false;
    }

    status(n) { this.res.statusCode = n; return this; };

    header(name, value) { this.res.setHeader(name, value); return this; };

    getHeader(name) { return this.res.getHeader(name) };

    write(data) { this.res.write(data); return this; };

    end(data) { this.res.end(data); this.ended = true; return this; };
}

module.exports = OutgoingHTTPData;