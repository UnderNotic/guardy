function guardys(obj) {
    return new Proxy(obj, {
        get: function (target, name) {
            var t = target[name];

            if (typeof t !== "object" && t !== undefined && t !== null) {
                return t;
            }

            return guardys(t || {});
}
    });
}

function guardy(obj, defaulty) {
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

            return guardy(t || { __exists__: false, __value__: defaulty });
        }
    });
}


let x = {
    name: {
        first: "Peter"
    }
};

var x2 = guardy(x).name.first.a.b;
console.log(x2);
