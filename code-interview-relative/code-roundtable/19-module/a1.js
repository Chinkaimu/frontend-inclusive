import { bar } from './b1.js'

export function foo () {
  bar()
  console.log('foo 执行完毕')
}
foo()