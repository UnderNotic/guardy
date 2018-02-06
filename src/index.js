function guardy(obj) {
    return new Proxy(obj, {
        get: function (target, name) {
            var t = target[name];

            if (isNotObject(t) && t !== undefined && t !== null) {
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
                return target.__value__ || defaulty;
            }

            var t = target[name];
            if (isNotObject(t)) {
                return guardyWithFallback({ __value__: t }, defaulty);
            }

            t.__value__ = t;
            return guardyWithFallback(t, defaulty);
        }
    });
}

function initialCheck(obj, cb){
    if(isNotObject(obj)){
        throw new Error("Guardy works only with objects!");
    }
    return cb();
}

function isNotObject(value){
    return Object.prototype.toString.call(value) !== "[object Object]";
}

if (process.env.BUNDLE_FORMAT === "IIFE") {
    window.guardy = guardy;
    window.guardyWithFallback = guardyWithFallback;
} else {
    module.exports = {
        guardy: (obj) => initialCheck(obj, guardy.bind(null, obj)),
        guardyWithFallback: (obj, defaulty) => initialCheck(obj, guardyWithFallback.bind(null, obj, defaulty))
    }
}
