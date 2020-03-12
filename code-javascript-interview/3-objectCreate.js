/**
 * 创建一个新对象，使用现有的对象提供新创建的对象的 __proto__
 * Object.create(proto[, propertiesObject])
 * @param proto 新创建对象的原型
 * @param propertiesObject 可选。没有指定，则为 undefined， 添加新创建对象的不可枚举（默认）属性
 */

function create (proto, propertiesObject) {
  if (typeof proto !== 'object' && typeof proto !== 'function') {
    throw new TypeError('Object prototype may only be an Object: ' + proto);
  } else if (proto === null) {
    throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");
  }

  function F () {}
  F.prototype = proto

  return new F()
}
create()
