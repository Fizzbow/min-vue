let currentEffect;
class Dep {
  constructor(val) {
    this.effects = new Set();
    this._val = val;
  }
  get value() {
    // 读值的时候收集依赖
    this.depend();
    return this._val;
  }
  set value(newVal) {
    this._val = newVal;
    // 当值发生改变的时候触发依赖
    this.notice();
  }

  // 收集依赖
  depend() {
    if (currentEffect) {
      this.effects.add(currentEffect);
    }
  }
  // 触发依赖
  notice() {
    this.effects.forEach((effect) => {
      effect();
    });
  }
}
export function effectWatch(effect) {
  currentEffect = effect;
  effect();
  currentEffect = null;
}

// 实例中传入的值相当于需要响应式的变量
const dep = new Dep(10);

// let b;
// effectWatch(() => {
//   // 1. 当effectWatch中传入参数,effectWatch执行这个传入的函数
//   b = dep.value + 20;
//   console.log({ b });
// });

// // 2. 当dep.value发生改变的时候赋新的值set(newValue)，通知effectWatch执行（调用notice）
// dep.value = 20;

// 实现reactive
// key 对应 dep

const targetMap = new Map();

function getDep(target, key) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Dep();
    depsMap.set(key, dep);
  }

  return dep;
}

export function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
      const dep = getDep(target, key);
      dep.depend();

      // Reflect.get的优点在于：会代理所有的get
      // 下面代码等同于return target[key]
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      const dep = getDep(target, key);
      const res = Reflect.set(target, key, value);
      dep.notice();
      return res;
    },
  });
}
const user = reactive({ name: "sd" });

// let double;
// effectWatch(() => {
//   double = user.name;
//   console.log("reactive", { double });
// });
// user.name = "cssdsad";
