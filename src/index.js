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
                return target.__value__ || defaulty;
            }

            var t = target[name];
            if (typeof t !== "object") {
                return guardyWithFallback({ __value__: t }, defaulty);
            }

            t.__value__ = t;
            return guardyWithFallback(t, defaulty);
        }
    });
}

function handleInput(input){
    if(Object.prototype.toString.call(input) !== "[object Object]"){
        throw new Error("Guardy works only with objects!");
    }
}

if (process.env.BUNDLE_FORMAT === "IIFE") {
    window.guardy = guardy;
    window.guardyWithFallback = guardyWithFallback;
} else {
    module.exports = {
        guardy,
        guardyWithFallback
    }
}
