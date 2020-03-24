import { foo } from './a1.js'

export function bar () {
  if (Math.random() > 0.5) {
    foo()
  }
}