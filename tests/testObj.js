class Test{
    constructor(){
        this.s3 = "s3";
    }

    func3(){
        return "func3";
    }
}

module.exports = {
    s1: "s1",
    n1: 1,
    arr1: [],
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
    },
    customObj: new Test()
}
