type elementChildren = ElementProps<keyof HTMLElementTagNameMap | any>
  | Element<keyof HTMLElementTagNameMap | any>;

interface ElementProps<K> {
  tag: K;

  attributes?: Partial<HTMLElementTagNameMap[keyof HTMLElementTagNameMap]>;

  style?: Partial<CSSStyleDeclaration>;

  childrens?: elementChildren[];
}

class Element<K extends keyof HTMLElementTagNameMap> {
  element: HTMLElementTagNameMap[K];

  constructor(props: ElementProps<K>) {
    this.element = this.render(props);
  }

  render(props: ElementProps<K>) {
    const { tag, attributes, style, childrens } = props;
    this.element = document.createElement(tag);

    if (attributes) {
      Object.assign(this.element, attributes);
    }
    if (style) {
      Object.assign(this.element.style, style);
    }
    if (Array.isArray(childrens)) {
      childrens.forEach((children) => {
        if (children instanceof Element) {
          this.element.appendChild(children.element);
        } else {
          this.element.appendChild(new Element(children).element);
        }
      });
    }
    return this.element;
  }
}

export {
  Element,
  ElementProps,
}
export default Element;
