import type { JSX as JSXNamespace } from "react";

declare global {
  namespace JSX {
    /* eslint-disable @typescript-eslint/no-empty-object-type */
    interface Element extends JSXNamespace.Element {}
    interface IntrinsicElements extends JSXNamespace.IntrinsicElements {}
    interface ElementClass extends JSXNamespace.ElementClass {}
    interface LibraryManagedAttributes extends JSXNamespace.LibraryManagedAttributes {}
  }
}
