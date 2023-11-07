import { effectWatch } from "../core/reactivity/index.js";
import mountedDom from "../core/mountedDom.js";
export function createApp(rootComponent) {
  return {
    mounted(rootContainer) {
      const context = rootComponent.setup();
      effectWatch(() => {
        rootContainer.innerHTML = "";
        const subTree = rootComponent.render(context);
        // rootContainer.append(el);
        mountedDom(subTree, rootContainer);
        console.log({ subTree });
      });
    },
  };
}
