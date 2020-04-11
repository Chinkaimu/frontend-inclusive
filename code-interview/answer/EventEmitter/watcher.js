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

class ObserverList {
  constructor () {
    this.observerList = []
  }

  add (observer) {
    this.observerList.push(observer)
  }

  remove (observer) {
    this.observerList = this.observerList.filter(ob => ob !== observer)
  }

  count () {
    return this.observerList.length
  }

  get (index) {
    return this.observerList[index]
  }
}

class Subject {
  constructor () {
    this.observers = new ObserverList()
  }

  addObserver (observer) {
    this.observers.add(observer)
  }

  removeObserver (observer) {
    this.observers.remove(observer)
  }

  notify (...args) {
    const obCount = this.observers.count()
    for (let index = 0; index < obCount; index++) {
      this.observers.get(index).echo(...args)
    }
  }
}

const person = new Subject()
person.addObserver(new DogObserver())
person.addObserver(new CatObserver())
person.notify('Liming')

const dog = new Subject()
dog.addObserver(new DogObserver())
dog.notify('Tutu')
