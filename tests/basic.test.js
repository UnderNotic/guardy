var { guardy, guardyWithFallback } = require("../index");

const testObj = {
    s1: "s1",
    n1: 1,
    func1: function () {
        return "func1result";
    },
    l1: () => "l1",
    obj1: {
        s2: "s2",
        obj2: {
            n2: 2,
            func2: function () {
                return "fun2result"
            }
        }
    }
}

test("basic", () => {
    expect(guardy(testObj).s1).toBe(testObj.s1);
    expect(guardy(testObj).n1).toBe(testObj.n1);
});


test("Guardy and original are not the same", () => {
    expect(guardy(testObj)).not.toBe(testObj);    
});


test("basic with fallback", () => {
    expect(guardyWithFallback(testObj).s1).toBe(testObj.s1);
    expect(guardyWithFallback(testObj).n1).toBe(testObj.n1);
});