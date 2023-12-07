/**
 *
 * @param {*} n1 oldVnode
 * @param {*} n2 newVnode
 */
export default function diff(n1, n2) {
  // 1.tag
  if (n1.tag !== n2.tag) {
    n1.el.replaceWith(document.createElement(n2.tag));
  } else {
    n2.el = n1.el;
    // 2.props
    // new: { id:"foo",class:"bar",a }
    // old: { id:"foo",class:"bar1",a,b}
    const { attribute: oldAttr } = n1;
    const { attribute: newAttr } = n2;

    console.log(oldAttr, newAttr);
    if (newAttr && oldAttr) {
      Object.keys(newAttr).forEach((key) => {
        const newVal = newAttr[key];
        const oldVal = oldAttr[key];

        if (newVal !== oldVal) {
          n1.el.setAttribute(key, newVal);
        }
      });
    }

    if (oldAttr) {
      Object.keys(oldAttr).forEach((key) => {
        if (!newAttr[key]) {
          n1.el.removeAttribute(key);
        }
      });
    }
  }
}
