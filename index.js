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

const App = {
  render(context) {
    // 将响应式数据渲染到页面上
    effectWatch(() => {
      document.body.innerHTML = "";
      const div = document.createElement("div");
      div.innerText = context.state.count;
      document.body.append(div);
    });
  },
  setup() {
    const state = reactive({
      count: 0,
    });
    window.state = state;
    return { state };
  },
};
App.render(App.setup());
