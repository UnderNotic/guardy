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

    test("should return correct  __value__ for custom object", () => {
        expect(guardyWithFallback(testObj).customObj.s3.__value__).toEqual(testObj.customObj.s3);
        expect(guardyWithFallback(testObj).customObj.func3.__value__).toEqual(testObj.customObj.func3);
    });

    test("should return correct  __value__ for function", () => {
        expect(guardyWithFallback(testObj).func1.__value__).toEqual(testObj.func1);        
        expect(guardyWithFallback(testObj).obj1.obj2.func2.__value__).toEqual(testObj.obj1.obj2.func2);        
    });

    test("should return correct  __value__ for array", () => {
        expect(guardyWithFallback(testObj).arr1.__value__).toEqual(testObj.arr1);        
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

    test("should fallback to null (default) when trying to access property of custom object", () => {
        expect(guardyWithFallback(testObj).customObj.a.b.__value__).toBe(null);
        expect(guardyWithFallback(testObj).customObj.a.b.c.__value__).toBe(null);
    });

    test("should fallback to null (default) when trying to access property of function", () => {
        expect(guardyWithFallback(testObj).func1.a.b.__value__).toBe(null);
    });

    test("should fallback to null (default) when trying to access property of array", () => {
        expect(guardyWithFallback(testObj).arr1.a.b.__value__).toBe(null);
    });

    test("should fallback to defaulty", () => {
        expect(guardyWithFallback(testObj, "a").arr1.a.b.__value__).toBe("a");
        expect(guardyWithFallback(testObj, 0).obj1.obj2.n2.a.b.c.d.__value__).toBe(0);
        expect(guardyWithFallback(testObj, 1).customObj.a.__value__).toBe(1);
    });

    test("returned and original are not the same", () => {
        expect(guardyWithFallback(testObj)).not.toBe(testObj);
    });

    test("should work only with objects", () => {
        expect(() => guardyWithFallback("")).toThrow("Guardy works only with objects!");
        expect(() => guardyWithFallback(1)).toThrow("Guardy works only with objects!");
        expect(() => guardyWithFallback([])).toThrow("Guardy works only with objects!");
        expect(() => guardyWithFallback(() => {})).toThrow("Guardy works only with objects!");
        expect(() => guardyWithFallback(function(){})).toThrow("Guardy works only with objects!");
    });
});