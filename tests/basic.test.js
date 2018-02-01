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

describe("Guardy", () => {
    test("should return correct primitive value", () => {
        expect(guardy(testObj).s1).toBe(testObj.s1);
        expect(guardy(testObj).n1).toBe(testObj.n1);
    });

    test("should return correct object value", () => {
        expect(Object.keys(guardy(testObj).obj1)).toEqual(["s2", "obj2"]);
        expect(Object.keys(guardy(testObj).obj1.obj2)).toEqual(["n2", "func2"]);
    });

    test("should fallback to empty object", () => {
        expect(Object.keys(guardy(testObj).a.b.c)).toEqual([]);
        expect(Object.keys(guardy(testObj).obj1.a.b.c)).toEqual([]);
        expect(Object.keys(guardy(testObj).obj1.obj2.a.b.c.d)).toEqual([]);
    });

    test("should throw when trying access property of primitive", () => {
        expect(() => guardy(testObj).s1.a.b).toThrow();
        expect(() => guardy(testObj.func1.a.b)).toThrow();
    });

    test("returned and original are not the same", () => {
        expect(guardy(testObj)).not.toBe(testObj);
    });
});

describe("Guardy with fallback", () => {
    test("should return correct __value__ for primitive value", () => {
        expect(guardyWithFallback(testObj).s1.__value__).toBe(testObj.s1);
        expect(guardyWithFallback(testObj).n1.__value__).toBe(testObj.n1);
    });

    test("should return correct  __value__ for object", () => {
        expect(guardyWithFallback(testObj).obj1.__value__).toEqual(testObj.obj1);
        expect(guardyWithFallback(testObj).obj1.obj2.__value__).toEqual(testObj.obj1.obj2);
    });

    test("should return correct  __value__ for function", () => {
    });

    test("should return correct  __value__ for array", () => {
    });

    test("should fallback to null (default)", () => {
        expect(Object.keys(guardyWithFallback(testObj).a.b.c)).toEqual(["__value__"]);
        expect(guardyWithFallback(testObj).a.b.c.__value__).toBe(null);
        expect(Object.keys(guardyWithFallback(testObj).obj1.a.b.c)).toEqual(["__value__"]);
        expect(guardyWithFallback(testObj).obj1.a.b.c.__value__).toBe(null);
        expect(Object.keys(guardyWithFallback(testObj).obj1.obj2.a.b.c.d)).toEqual(["__value__"]);
        expect(guardyWithFallback(testObj).obj1.obj2.a.b.c.d.__value__).toBe(null);
    });

    test("returned and original are not the same", () => {
        expect(guardyWithFallback(testObj)).not.toBe(testObj);
    });
});