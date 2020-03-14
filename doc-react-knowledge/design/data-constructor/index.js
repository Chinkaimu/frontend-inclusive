/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// 1. Object React，对外统一接口
const React = {
  Children: {
    map,
    forEach,
    count,
    toArray,
    only
  },

  createRef,
  Component,
  PureComponent,

  createContext,
  forwardRef,
  lazy,
  memo,

  // React hooks 方法
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useDebugValue,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,

  Fragment: REACT_FRAGMENT_TYPE,
  Profiler: REACT_PROFILER_TYPE,
  StrictMode: REACT_STRICT_MODE_TYPE,
  Suspense: REACT_SUSPENSE_TYPE,

  // 通过 ReactElement 实现
  createElement: __DEV__ ? createElementWithValidation : createElement,
  cloneElement: __DEV__ ? cloneElementWithValidation : cloneElement,
  createFactory: __DEV__ ? createFactoryWithValidation : createFactory,
  isValidElement: isValidElement,

  version: ReactVersion,

  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactSharedInternals
}

// 原型方法 setState
React.prototype.setState = () => {}

// 2. ReactElement
const element = {
  // This tag allows us to uniquely identify this as a React Element
  $$typeof: REACT_ELEMENT_TYPE,

  // Built-in properties that belong on the element
  type: type,
  key: key,
  ref: ref,
  props: props,

  // Record the component responsible for creating this element.
  _owner: owner
}
