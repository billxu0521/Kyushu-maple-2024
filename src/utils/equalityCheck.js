import * as deepEqualModule from 'fast-deep-equal'
const deepEqual = deepEqualModule.default || deepEqualModule

// 使用 deepEqual 函数
export function checkEquality(obj1, obj2) {
  return deepEqual(obj1, obj2)
}
