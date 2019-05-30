"use strict";

var ip = require('ip');

var self = null,
    library = null,
    modules = null;

function Transport(r, e) {
    library = e, r(null, self = this)
}
Transport.prototype.message = function(r, e, t) {
    e = {
        call: "transport#message",
        args: {
            message: e,
            topic: r
        }
    };
    t || (t = function() {}), library.sandbox.sendMessage(e, t)
}, Transport.prototype.getRandomPeer = function(r, e, t, s) {
    var peer = {
        ip: "0.0.0.0",
        port: 9305
    };
    app.config.peers && Array.isArray(app.config.peers) && app.config.peers.length && (peer = app.config.peers[0]);
    var o = {
        call: "transport#request",
        args: {
            peer: {
                ip: ip.toLong(peer.ip),
                port: peer.port
            },
            method: r,
            path: e,
            query: t
        }
    };
    library.sandbox.sendMessage(o, s)
}, Transport.prototype.getPeer = function(r, e, t, s, o) {
    // console.log("calling getPeer peer r: ", r);
    // console.log("calling getPeer method e: ", e);
    // console.log("calling getPeer path t: ", t);
    // console.log("calling getPeer i s: ", s);
    // console.log("calling getPeer callback o: ", o);
    var a = {
        call: "transport#request",
        args: {
            peer: {
                ip: r.ip,
                port: r.port
            },
            method: e,
            path: t,
            query: s
        }
    };
    library.sandbox.sendMessage(a, o)
}, Transport.prototype.onBind = function(r) {
    modules = r
}, module.exports = Transport;
