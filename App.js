import { reactive } from "./core/reactivity/index.js";
export default {
  render(context) {
    // 将响应式数据渲染到页面上
    const div = document.createElement("div");
    div.innerText = context.state.count;
    return div;
  },
  setup() {
    const state = reactive({
      count: 0,
    });
    window.state = state;
    return { state };
  },
};
// App.render(App.setup());
