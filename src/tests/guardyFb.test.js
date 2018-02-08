var { guardyFb } = require("../index");
const testObj = require("./testObj");

describe("Guardy with fallback", () => {
  test("should return correct __value__ for primitive value", () => {
    expect(guardyFb(testObj).s1.__value__).toBe(testObj.s1);
    expect(guardyFb(testObj).n1.__value__).toBe(testObj.n1);
  });

  test("should return correct  __value__ for object", () => {
    expect(guardyFb(testObj).obj1.__value__).toEqual(testObj.obj1);
    expect(guardyFb(testObj).obj1.obj2.__value__).toEqual(
      testObj.obj1.obj2
    );
  });

  test("should return correct  __value__ for custom object", () => {
    expect(guardyFb(testObj).customObj.s3.__value__).toEqual(
      testObj.customObj.s3
    );
    expect(guardyFb(testObj).customObj.func3.__value__).toEqual(
      testObj.customObj.func3
    );
    expect(guardyFb(testObj).customObj.func3.__value__()).toEqual(
      testObj.customObj.func3()
    );
  });

  test("should return correct  __value__ for function", () => {
    expect(guardyFb(testObj).func1.__value__).toEqual(testObj.func1);
    expect(guardyFb(testObj).func1.__value__()).toEqual(
      testObj.func1()
    );
    expect(guardyFb(testObj).obj1.obj2.func2.__value__).toEqual(
      testObj.obj1.obj2.func2
    );
    expect(guardyFb(testObj).obj1.obj2.func2.__value__()).toEqual(
      testObj.obj1.obj2.func2()
    );
  });

  test("should return correct  __value__ for lambda function", () => {
    expect(guardyFb(testObj).l1.__value__).toEqual(testObj.l1);
    expect(guardyFb(testObj).l1.__value__()).toEqual(testObj.l1());
  });

  test("should return correct  __value__ for array", () => {
    expect(guardyFb(testObj).arr1.__value__).toEqual(testObj.arr1);
  });

  test("should fallback to null (default)", () => {
    expect(Object.keys(guardyFb(testObj).a.b.c)).toEqual([
      "__value__"
    ]);
    expect(guardyFb(testObj).a.b.c.__value__).toBe(null);
    expect(Object.keys(guardyFb(testObj).obj1.a.b.c)).toEqual([
      "__value__"
    ]);
    expect(guardyFb(testObj).obj1.a.b.c.__value__).toBe(null);
    expect(Object.keys(guardyFb(testObj).obj1.obj2.a.b.c.d)).toEqual([
      "__value__"
    ]);
    expect(guardyFb(testObj).obj1.obj2.a.b.c.d.__value__).toBe(null);
  });

  test("should fallback to null (default) when trying to access property of primitive", () => {
    expect(guardyFb(testObj).s1.a.b.__value__).toBe(null);
    expect(guardyFb(testObj).obj1.obj2.n2.a.b.c.d.__value__).toBe(
      null
    );
  });

  test("should fallback to null (default) when trying to access property of custom object", () => {
    expect(guardyFb(testObj).customObj.a.b.__value__).toBe(null);
    expect(guardyFb(testObj).customObj.a.b.c.__value__).toBe(null);
  });

  test("should fallback to null (default) when trying to access property of function", () => {
    expect(guardyFb(testObj).func1.a.b.__value__).toBe(null);
  });

  test("should fallback to null (default) when trying to access property of array", () => {
    expect(guardyFb(testObj).arr1.a.b.__value__).toBe(null);
  });

  test("should fallback to defaulty", () => {
    expect(guardyFb(testObj, "a").arr1.a.b.__value__).toBe("a");
    expect(guardyFb(testObj, 0).obj1.obj2.n2.a.b.c.d.__value__).toBe(
      0
    );
    expect(guardyFb(testObj, 1).customObj.a.__value__).toBe(1);
  });

  test("returned and original are not the same", () => {
    expect(guardyFb(testObj)).not.toBe(testObj);
  });

  test("should work only with objects", () => {
    expect(() => guardyFb("")).toThrow(
      "Guardy works only with objects!"
    );
    expect(() => guardyFb(1)).toThrow(
      "Guardy works only with objects!"
    );
    expect(() => guardyFb([])).toThrow(
      "Guardy works only with objects!"
    );
    expect(() => guardyFb(() => {})).toThrow(
      "Guardy works only with objects!"
    );
    expect(() => guardyFb(function() {})).toThrow(
      "Guardy works only with objects!"
    );
  });
});
