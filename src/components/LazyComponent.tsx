/* Este componente de LazyComponent se encarga de cargar sus hijos de manera diferida, es decir, solo carga los elementos hijos que están en la ventana visible del navegador, lo que mejora el rendimiento al reducir la carga inicial de la página. */
import { useEffect, useMemo, useRef, useState } from "react";

interface LazyComponentProps {
  children: React.ReactNode[];
}

export const LazyComponent: React.FC<LazyComponentProps> = ({ children }) => {
  const [visibleIndex, setVisibleIndex] = useState<number>(0); // para rastrear el índice del último elemento visible
  const ref = useRef<HTMLDivElement>(null); // para acceder al elemento raíz del componente
  const observer = useRef<IntersectionObserver | null>(null); // para observar la intersección de los elementos hijos con el área visible del navegador

  useEffect(() => {
    /* Se inicializa un IntersectionObserver que observa la intersección de los elementos hijos con el área visible del navegador. */
    observer.current = new IntersectionObserver(
      (entries) => {
        // console.log("entries");
        entries.forEach((entry) => {
          /* Verificar si el elemento observado está intersectando con el área visible del navegador. */
          if (entry.isIntersecting) {
            // console.log("entry.isIntersecting");
            const index = parseInt(entry.target.id); // Obtener el índice del elemento que se está volviendo visible convirtiendo el ID del elemento en un número entero.
            setVisibleIndex((prevIndex) => Math.max(prevIndex, index)); // Actualiza el estado visibleIndex con el índice del elemento visible más grande encontrado.
            observer.current?.unobserve(entry.target); // El IntersectionObserver deja de observar los elementos una vez que se vuelven visibles lo que reduce la carga en el navegador.
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.5 } // Configurar las opciones del IntersectionObserver para que se active cuando al menos la mitad del elemento esté visible.
    );

    /* Se seleccionan los elementos hijos utilizando querySelectorAll y se agregan al observador. La búsqueda de elementos con querySelectorAll se realiza una sola vez en el montaje del componente. */
    const targets = ref.current?.querySelectorAll(".lazy-child");
    if (targets) {
      // console.log("targets");
      /* Observa cada uno de los elementos hijos encontrados utilizando el IntersectionObserver. */
      targets.forEach((target) => {
        observer.current?.observe(target);
      });
    }

    /* Se devuelve una función de limpieza que desconecta el observador cuando el componente se desmonta. */
    return () => {
      // console.log("return");
      observer.current?.disconnect();
    };
  }, []);

  /* Se memoizan los elementos hijos usando useMemo para evitar el renderizado innecesario de los hijos cuando cambia visibleIndex. */
  const memoizedChildren = useMemo(() => {
    // console.log("useMemo");
    /* Mapea los elementos hijos y envuélvelos en divs con una clase .lazy-child. Solo se muestran los hijos cuyo índice sea menor o igual al visibleIndex más uno. */
    return children.map((child, index) => (
      <div className="lazy-child" key={index} id={index.toString()}>
        {index <= visibleIndex + 1 && child}
      </div>
    ));
  }, [children, visibleIndex]);

  /* Retorna un div que contiene los hijos memoizados y establece la referencia ref al elemento raíz del componente. */
  return <div ref={ref}>{memoizedChildren}</div>;
};

/* ************************************************************************************************************************ */
/* EJEMPLO DE: JSX.Element vs ReactNode vs ReactElement

- Los elementos son los más fáciles de entender, ya que son solo elementos HTML como una etiqueta div, span o body. Generalmente, cuando se trabaja con el DOM, estarás trabajando con elementos, ya que la mayoría de las veces se desea interactuar con elementos HTML.

- Los nodos, en cambio, son la versión más genérica de un elemento. Un nodo podría ser un elemento HTML, pero también podría ser cualquier otra cosa en un documento HTML, como texto o comentarios. 

<div> // <- ReactElement
  <Component> // <- ReactElement
    {condition && 'text'} // <- ReactNode
  </Component>
</div>


- El Component.render de las clases devuelve un ReactNode:

    class Component<P, S> {
      // …
      render(): ReactNode;
      // …
    }


- Un FunctionComponent devuelve un ReactElement<any, any> | null:

    interface FunctionComponent<P = {}> {
      (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
      propTypes?: WeakValidationMap<P> | undefined;
      contextTypes?: ValidationMap<any> | undefined;
      defaultProps?: Partial<P> | undefined;
      displayName?: string | undefined;
    }


- ReactElement y JSX.Element son el resultado de invocar React.createElement directamente o mediante transpilación JSX. Es un objeto con type, props y key. JSX.Element es ReactElement, cuyo props y type tienen tipo any, por lo que son más o menos iguales.

    const jsx = <div>hello</div>
    const ele = React.createElement("div", null, "hello");

    
- ReactNode se utiliza como tipo de retorno para render() en los componentes de clase. También es el tipo predeterminado para atributos children con PropsWithChildren.

    // children?: React.ReactNode
    const Comp: FunctionComponent = props => <div>{props.children}</div> 
*/
