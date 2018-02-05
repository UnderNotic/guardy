var { guardy } = require("../index");
const testObj = require("./testObj");

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
        expect(guardy(testObj).a.b.c).toMatchObject({});
        expect(Object.keys(guardy(testObj).obj1.a.b.c)).toEqual([]);
        expect(guardy(testObj).obj1.a.b.c).toMatchObject({});
        expect(Object.keys(guardy(testObj).obj1.obj2.a.b.c.d)).toEqual([]);
        expect(guardy(testObj).obj1.obj2.a.b.c.d).toMatchObject({});
    });

    test("should throw when trying to access property of non-object", () => {
        expect(() => guardy(testObj).s1.a.b).toThrow();
        expect(() => guardy(testObj.func1.a.b)).toThrow();
        expect(() => guardy(testObj.obj1.obj2.n2.a.b.c.d)).toThrow();
    });

    test("returned and original are not the same", () => {
        expect(guardy(testObj)).not.toBe(testObj);
    });

    test("should work only with objects", () => {
        expect(() => guardy("")).toThrow("Guardy works only with objects!");
        expect(() => guardy(1)).toThrow("Guardy works only with objects!");
        expect(() => guardy([])).toThrow("Guardy works only with objects!");
        expect(() => guardy(() => {})).toThrow("Guardy works only with objects!");
        expect(() => guardy(function(){})).toThrow("Guardy works only with objects!");
    });
});