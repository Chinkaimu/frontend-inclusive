/**
 * 参考：https://www.jianshu.com/p/594f018b68e7
 */
class PubSub {
  constructor () {
    this.subscribers = {}
  }

  subscribe (type, fn) {
    if (!Object.prototype.hasOwnProperty.call(this.subscribers, type)) {
      this.subscribers[type] = []
    }

    this.subscribers[type].push(fn)
  }

  unsubscribe (type, fn) {
    const listeners = this.subscribers[type]
    if (!listeners || !listeners.length) return
    this.subscribers[type] = listeners.filter(v => v !== fn)
  }

  publish (type, ...args) {
    const listeners = this.subscribers[type]
    if (!listeners || !listeners.length) return
    listeners.forEach(fn => fn(...args))
  }
}

/**
 * subscribers = {
 * // come 是目标的活动，目标的活动可以是多种多样了。
 * // 观察者观察到目标事务活动以后的操作
 * // 所以订阅者的内容是：订阅了 type 类型的活动，需要执行操作 A、B、C。从观察者 1对1的模式进化到多对多。
 * // 2个数据结构上的变化，观察者是数组存储，订阅者是对象存储；观察者的回调是一个函数，订阅者的回调是一个函数数组
 *  come: [
 *    () => {console.log('狗叫')},
 *    () => {console.log('猫叫')}
 *  ],
 *  leave: [
 *    () => {console.log('狗不叫')},
 *    () => {console.log('猫不叫')}
 *  ]
 * }
 */
const person = new PubSub()
person.subscribe('come', () => { console.log('dog echo') })
person.subscribe('leave', () => { console.log('dog not echo') })

person.publish('come')
person.publish('leave')
