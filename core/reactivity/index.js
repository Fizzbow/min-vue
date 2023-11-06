let currentEffect;
class Dep {
  constructor(val) {
    this.effects = new Set();
    this._val = val;
  }
  get value() {
    return this._val;
  }
  set value(newVal) {
    this._val = newVal;
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
function effectWatch(effect) {
  currentEffect = effect;
  effect();
  dep.depend();
  currentEffect = null;
}

// 实例中传入的值相当于需要响应式的变量
const dep = new Dep(10);

let b;
effectWatch(() => {
  // 1. 当effectWatch中传入参数,effectWatch执行这个传入的函数,并且dep.value改变的时候赋新的值set(value)
  b = dep.value + 20;
  console.log({ b });
});

// 2. 当dep.value发生改变的时候，通知effectWatch执行（调用notice）
dep.value = 20;
dep.notice();
