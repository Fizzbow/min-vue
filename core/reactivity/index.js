let currentEffect;
class Dep {
  constructor(val) {
    this.effects = new Set();
    this._val = val;
  }
  get value() {
    return this._val;
  }
  // 收集依赖
  depend() {
    if (currentEffect) {
      this.effects.add(currentEffect);
    }
  }
  // 触发依赖
  notice() {}
}
function effectWatch(effect) {
  currentEffect = effect;
  dep.depend();
  currentEffect = null;
}

// 实例中传入的值相当于需要响应式的变量
const dep = new Dep(10);

let b;
effectWatch(() => {
  console.log("hahah");
  b = dep.value + 20;
});
