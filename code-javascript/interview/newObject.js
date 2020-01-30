function Dog (name) {
  this.name = name
  this.age = 14
  this.sayName = function () {
    console.log(this.name)
  }
  console.log('Dog echo')
}

function CreateDog () {}
CreateDog.prototype = Object.create(Dog.prototype)
console.log('CreateDog.prototype', CreateDog.prototype)
console.log('CreateDog.prototype.constructor', CreateDog.prototype.constructor)

const newCreatedDog = new CreateDog()
console.log('newCreatedDog.age', newCreatedDog.age)



function CreateDog1 () {}
CreateDog1.prototype = Dog.prototype
console.log('CreateDog1.prototype', CreateDog1.prototype)

const newCreatedDog1 = new CreateDog1()
console.log('newCreatedDog1.age', newCreatedDog1.age)



function NewDog () {}
// Dog instance
NewDog.prototype = new Dog()
console.log('NewDog.prototype', NewDog.prototype)

const newNewDog = new NewDog()
newNewDog.name = 'hello'
console.log('newNewDog.age', newNewDog.age)
