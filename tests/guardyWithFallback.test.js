var { guardyWithFallback } = require("../index");
const testObj = require("./testObj");

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

    test("should fallback to null (default) when trying to access property of primitive", () => {
        expect(guardyWithFallback(testObj).s1.a.b.__value__).toBe(null);
        expect(guardyWithFallback(testObj).obj1.obj2.n2.a.b.c.d.__value__).toBe(null);
    });

    test("should fallback to null (default) when trying to access property of function", () => {
        expect(guardyWithFallback(testObj.func1.a.b.__value__)).toBe(null);
    });

    test("should fallback to null (default) when trying to access property of array", () => {
        expect(guardyWithFallback(testObj.arr1.a.b.__value__)).toBe(null);
    });

    test("returned and original are not the same", () => {
        expect(guardyWithFallback(testObj)).not.toBe(testObj);
    });
});