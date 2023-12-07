export default function mountedDom(vnode, contain) {
  let { tag, attribute, children } = vnode;
  let el = (vnode.el = document.createElement(tag));

  if (attribute) {
    for (let attr in attribute) {
      el.setAttribute(attr, attribute[attr]);
    }
  }

  if (typeof children === "string") {
    el.innerHTML = children;
  } else if (typeof children === "number") {
    el.innerHTML = children.toString();
    el.innerHTML = children;
  } else if (Array.isArray(children)) {
    children.forEach((v) => {
      mountedDom(v, el);
    });
  }

  contain.append(el);
}
