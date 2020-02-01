/**
 * A deep copy means that all of the values of the new variable are copied and disconnected from the original variable.
 * A shallow copy means that certain (sub-)values are still connected to the original variable.
 */
/**
 * coping objects
 * 1. equal: shallow copy
 * 2. spread operator: shallow copy
 * 3. Object.assign: shallow copy
 * 4. manually nested properties spread operator: deep copy
 * 5. copy by string form: deep copy
 */
const a = {
  name: 'Lily',
  toys: {
    model: 'car',
    group: {
      barbie: 'Anna',
      house: ['castle', 'cabin']
    }
  }
}

// equal
// eslint-disable-next-line no-unused-vars
const b = a

// spread operation: copy the properties, name and toys of a to c. The nested properties are still connected with the original variable.
const c = { ...a }
c.addByC = null
c.toys.model = 'changeByC'
console.log('after C a = ', a)
console.log('c = ', c)

// Object.assign: just like spread operation, it is not pure deep copy.
const d = Object.assign({}, a)
d.addByD = null
d.toys.model = 'changeByD'
console.log('after d a = ', a)
console.log('d = ', d)

// Deep copy above
// eslint-disable-next-line no-unused-vars
const e = {
  name: a.name,
  toys: {
    model: a.toys && a.toys.model,
    group: {
      barbie: a.group && a.group.barbie,
      house: [...a.toys.group.house]
    }
  }
}
console.log('e = ', e)

// We should consider one way to prevent that is manually copying all nested objects.
// JSON.stringify and JSON.parse
// Attention: It can't deal the function properties.
const f = JSON.parse(JSON.stringify(a))
f.addByF = null
f.toys.model = 'changedByF'
console.log('after f a = ', a)
console.log('f = ', f)

/**
 * copyping arrays
 * 1. spread operator: shallow copy
 * 2. Array functions, map, filter, reduce, slice, concat: shallow
 */

const m = [1, 2, [3, 4]]

const n = [...m]
n[1] = 'n'
n[2][1] = 'n'
console.log('m = ', m)
console.log('n = ', n)

const o = m.slice(0)
o[1] = 'o'
o[2][1] = 'o'
console.log('m = ', m)
console.log('o = ', o)

const s = m.concat()
s[1] = 's'
s[2][1] = 's'
console.log('m = ', m)
console.log('s = ', s)

/**
 * All of above is skills, but how can we make it in a function.
 */

function shallowCopy (obj) {
  if (typeof obj !== 'object') return obj
  const newObj = obj instanceof Array ? [] : {}
  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key]
    }
  }
  return newObj
}

const u = shallowCopy(a)
console.log('u', u)

function deepCopy (obj) {
  if (typeof obj !== 'object') return obj
  const newObj = obj instanceof Array ? [] : {}
  // Iterate all the enumerable properties in prototype chain. And all the returned index is string, not number.
  // If we use Object.keys, there is no need to judge if object's own properties.
  // If we use 'for of', it can't support object except array like object.
  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      newObj[key] = deepCopy(obj[key])
    }
  }
  return newObj
}
const w = deepCopy(a)
w.toys.group.house = null
console.log('a = ', a)
console.log('w = ', w)
