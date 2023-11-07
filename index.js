// 1.要解决的问题是不用（实现响应式的时候需要多次调用update函数）
// let a = 10;
// updated();
// function updated() {
//   b = a + 10;
//   console.log({ b });
// }

// a = 20;
// updated();

// const { reactive, effectWatch } = require("./core/reactivity");
import { effectWatch, reactive } from "./core/reactivity/index.js";
let a = reactive({ value: 10 });
let b;
// effect函数实现当变量a发生改变的时候，effect函数会自动触发
effectWatch(() => {
  b = a.value + 10;
  console.log({ b });
});

a.value = 30;
