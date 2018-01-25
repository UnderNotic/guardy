function guardy(obj, defaulty = null) {
    return new Proxy(obj, {
        get: function (target, name) {
            var t = target[name];
            if (typeof t !== Object && t !== undefined) {
                return t;
            }
            if (t !== undefined) {
                t.value = t;
            }
            return guardy(t || { __isEmpty: true, value: defaulty });
        }
    });
}

