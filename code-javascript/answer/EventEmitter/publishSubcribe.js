/**
 * 参考：https://www.jianshu.com/p/594f018b68e7
 * 在观察者模式中，观察者是知道Subject的，Subject一直保持对观察者进行记录。然而，在发布订阅模式中，发布者和订阅者不知道对方的存在。它们只有通过消息代理进行通信。
 * 在发布订阅模式中，组件是松散耦合的，正好和观察者模式相反。
 * 观察者模式大多数时候是同步的，比如当事件触发，Subject就会去调用观察者的方法。而发布-订阅模式大多数时候是异步的（使用消息队列）。
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
 * // 所以订阅者的内容是：订阅了 type 类型的活动（状态），需要执行操作 A、B、C 事件。从观察者 1 对 多 的模式进化到多对多。
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

const person2 = new PubSub()
person2.publish('come')
person2.publish('leave')
