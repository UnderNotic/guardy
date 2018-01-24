function guardy(obj) {
    return new Proxy(obj, {
        get: function (target, name) {
            var t = target[name];
            if (typeof t !== Object && t !== undefined) {
                return t;
            }
            return guardy(t || {});
        },

        // set: function (target, property, value) {
        //     target[property] = value;
        // },

        isEmpty: function () {
            
        },

        original: function () {

        }
    });
}

