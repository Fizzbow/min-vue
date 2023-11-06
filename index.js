// 1.要解决的问题是不用（实现响应式的时候需要多次调用update函数）
// let a = 10;
// updated();
// function updated() {
//   b = a + 10;
//   console.log({ b });
// }

// a = 20;
// updated();

const { reactive, effect } = require("@vue/reactivity");
let a = reactive({ value: 10 });
let b;
// effect函数实现当变量a发生改变的时候，effect函数会自动触发
effect(() => {
  b = a.value + 10;
  console.log({ a, b });
});

a.value = 30;
