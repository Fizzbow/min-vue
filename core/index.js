import { effectWatch } from "../core/reactivity/index.js";

export function createApp(rootComponent) {
  return {
    mounted(rootContainer) {
      const context = rootComponent.setup();
      effectWatch(() => {
        rootContainer.innerHTML = "";
        const el = rootComponent.render(context);
        rootContainer.append(el);
      });
    },
  };
}
