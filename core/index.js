import { effectWatch } from "../core/reactivity/index.js";
import mountedDom from "../core/mountedDom.js";
import diff from "../core/diff.js";
export function createApp(rootComponent) {
  return {
    mounted(rootContainer) {
      const context = rootComponent.setup();
      const isMounted = false;
      let prevSubTree;
      effectWatch(() => {
        if (!isMounted) {
          rootContainer.innerHTML = "";
          const subTree = rootComponent.render(context);
          // rootContainer.append(el);
          mountedDom(subTree, rootContainer);
        } else {
          const subTree = rootComponent.render(context);
          diff(prevSubTree, subTree);
          prevSubTree = subTree;
        }
      });
    },
  };
}
