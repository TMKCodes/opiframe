function Universe() {
    var instance;
    var Universe = function Universe() {
        return instance;
    }
    Universe.prototype = this;
    instance = new Universe();
    instance.size = 0;
    instance.bang = "Big"
    return instance;
}


start = () => {
    let HelloWorld = function() {
        this.name = "World";
        this.message = "Hello";
    }

    let HelloInstance = new HelloWorld();

    HelloWorld.prototype.name = "Jaska";
    HelloWorld.prototype.message2 = "Goodbye";

    console.log(HelloInstance.name);
    console.log(HelloInstance.message);
    console.log(HelloInstance.message2);
    console.log(HelloInstance);

    let functionTest = {
        myvar : 10,
        myfunc : function() {
            return this.myvar + 10;
        }
    }
    console.log(functionTest);

    let object1 = Object.create(functionTest);
    let object2 = Object.create(functionTest);
    object1.myvar = 15;
    object2.myvar = 100;
    console.log(object1.myfunc());
    console.log(object2.myfunc());
    console.log(object1);
    console.log(object2);
    console.log(functionTest.myvar);
    functionTest.myvar = 1000;
    console.log("Function Test myvar changed!");
    console.log(functionTest.myvar);
    console.log(object1);
    console.log(object2);

    Universe.prototype.nothing = true;
    let uni = new Universe();
    console.log(uni.nothing);
    Universe.prototype.everything = false;
    console.log(uni.everything);
    let uni2 = new Universe();
    console.log(uni2.nothing);
    console.log(uni2.everything);
    console.log(uni);
    console.log(uni2);
}