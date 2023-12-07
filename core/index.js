import { effectWatch } from "../core/reactivity/index.js";
import mountedDom from "../core/mountedDom.js";
import diff from "../core/diff.js";
export function createApp(rootComponent) {
  return {
    mounted(rootContainer) {
      const context = rootComponent.setup();
      let isMounted = false;
      let prevSubTree;
      effectWatch(() => {
        if (!isMounted) {
          // init
          rootContainer.innerHTML = "";
          const subTree = rootComponent.render(context);
          // rootContainer.append(el);
          mountedDom(subTree, rootContainer);
          prevSubTree = subTree;
          isMounted = true;
        } else {
          // updated
          const subTree = rootComponent.render(context);
          diff(prevSubTree, subTree);
          prevSubTree = subTree;
        }
      });
    },
  };
}
