function guardy(obj) {
    return new Proxy(obj, {
        get: function (target, name) {
            var t = target[name];

            if (typeof t !== "object" && t !== undefined && t !== null) {
                return t;
            }

            return guardy(t || {});
        }
    });
}

function guardyWithFallback(obj, defaulty = null) {
    return new Proxy(obj, {
        get: function (target, name) {
            if (name === "__value__") {
                return target.__value__;
            }

            var t = target[name];
            if (typeof t !== "object" && t !== undefined && t !== null) {
                return t;
            }
            if (typeof t === "object" && t !== defaulty) {
                t.__value__ = t || defaulty;
            }

            return guardyWithFallback(t || { __exists__: false, __value__: defaulty });
        }
    });
}

module.exports = {
    guardy,
    guardyWithFallback
}