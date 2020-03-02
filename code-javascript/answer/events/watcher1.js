class Observer {
  echo (val) {
    console.log('Original Observer', val)
  }
}

class DogObserver extends Observer {
  echo (val) {
    console.log('Wang wang ', val)
  }
}

class CatObserver extends Observer {
  echo (val) {
    console.log('Miao Miao ', val)
  }
}

class Subject {
  constructor () {
    this.observers = []
  }

  addObserver (observer) {
    this.observers.push(observer)
  }

  removeObserver (observer) {
    this.observers.filter((item) => item !== observer)
  }

  notify (...args) {
    const obCount = this.observers.length
    for (let index = 0; index < obCount; index++) {
      // 显式调用另一个对象的接口
      this.observers[index].echo(...args)
    }
  }
}

// 人的观察者有狗和猫，人来了两者都要叫
const person = new Subject()
person.addObserver(new DogObserver())
person.addObserver(new CatObserver())
person.notify('Liming')

// 狗的观察者只有狗，所以只有狗叫
const dog = new Subject()
dog.addObserver(new DogObserver())
dog.notify('Tutu')

/**
 * 总结：目标只有一个活动，很多观察者根据这个活动做出响应，响应接口是一致的，响应的内容是各类观察者自定义的
 */
