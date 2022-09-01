CLISeperator = "-------------------------------------------------------"

start = () => {
    console.log(CLISeperator);
    console.log("Method invocation pattern:");
    var person = {
        name: "Toni",
        age: 32,
        greet: function() {
            console.log(`My name is ${ this.name } and I am ${ this.age } years old.`);
        }
    };
    person.greet();

    console.log(CLISeperator);
    console.log("Function invocation pattern:");
    person.calcAge = function(yearsFromNow) {
        function yearsOld() {
            return this.age + yearsFromNow;
        }
        console.log(`I will be ${ yearsOld() } years old in ${ yearsFromNow } years.`);
    }
    person.calcAge(5);

    console.log("Let's fix this.");
    person.calcAgeFixed = function(yearsFromNow) {
        function yearsOld() {
            return this.age + yearsFromNow;
        }
        yearsOld = yearsOld.bind(this);
        console.log(`I will be ${ yearsOld() } years old in ${ yearsFromNow } years.`);
    }
    person.calcAgeFixed(10);
    
    console.log("Let's fix this again.");
    person.calcAgeFixedAgain = function(yearsFromNow) {
        const yearsOld = () => {
            return this.age + yearsFromNow;
        }
        console.log(`I will be ${ yearsOld() } years old in ${ yearsFromNow } years.`);
    }
    person.calcAgeFixedAgain(15);

    console.log(CLISeperator);
    console.log("Constructor invocation pattern:");

    var person2 = function(name) {
        this.name = name;
    }
    person2.prototype.greet = function() {
        return `My name is ${ this.name }.`;
    }
    console.log(new person2("Toni").greet());

    console.log(CLISeperator);
    console.log("Apply invocation pattern:");
    person2.prototype.waveTo = function(who) {
        return `Hi ${ who.name }, my name is ${ this.name }.`;
    }
    let calvin = new person2("Calvin");
    let hobbes = new person2("Hobbes");
    let temp = Object.create({ name: "Temp object" });

    console.log(calvin.waveTo.apply(hobbes, [calvin]));
    console.log(hobbes.waveTo.apply(temp, [calvin]));

    console.log(CLISeperator);
    console.log("Call invocation pattern:");
    console.log(calvin.waveTo.call(hobbes, calvin));
    console.log(hobbes.waveTo.call(temp, calvin)); 
}
