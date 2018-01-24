export default function guardy(obj) {
    return new Proxy(obj, {
        get: function (target, name) {
            var t = target[name];
            return guardy(t || {});
        },

        set: function () { 
    
        },

        isEmpty: function () {
            if (Object.keys(this.somethis).length === 0) {

                return true

            }
            return false
        }
    });

}
