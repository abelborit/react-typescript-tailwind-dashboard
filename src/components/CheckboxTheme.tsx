import { useEffect, useState } from "react";

export const CheckboxTheme = () => {
  const [isThemeDark, setIsThemeDark] = useState<boolean>(() => {
    /* Comprobar si el tema oscuro está activado inicialmente. Se hace mediante función porque se hará una inicialización lazy del estado porque la necesitamos solo en el render inicial y como usar o llamar algo del localStorage es un recurso un poco pesado entre comillas (porque es como que se hiciera una solicitud a una basa de datos pero del navegador) entonces se hace mediante una función en el useState */
    const isDark: string | null = localStorage.getItem("isThemeDark");
    return isDark ? JSON.parse(isDark) : false;
  });

  const handleChangeTheme = (): void => {
    const newTheme: boolean = !isThemeDark;
    setIsThemeDark(newTheme);
    /* Guardar la selección del usuario en el localStorage */
    localStorage.setItem("isThemeDark", JSON.stringify(newTheme));
  };

  /* Se usa useEffect para aplicar los cambios de tema en el elemento document.documentElement cuando cambia el estado isThemeDark. Esto garantiza que el tema cambie correctamente incluso después de la recarga de la página. */
  useEffect(() => {
    if (isThemeDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("isThemeDark");
    }

    /* se podría incluir una limpieza para eliminar la clase dark del elemento document.documentElement cuando el componente se desmonte y como se tiene guardada la referencia en el localStorage entonces cada que se monte solo se pediría desde el localStorage */
    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, [isThemeDark]);

  return (
    <div className="flex justify-between sm:justify-end sm:gap-4">
      <p className="text-Dark-Grayish-Blue dark:text-Desaturated-Blue font-bold">
        Dark Mode
      </p>
      <label
        htmlFor="darkmode"
        className="flex items-center p-1 border bg-Toggle w-12 h-6 rounded-full overflow-hidden cursor-pointer border-none relative"
      >
        {/* cuando se necesite diseñar un elemento según el estado de un elemento hermano hay que marcar el hermano con la clase peer y usar modificadores peer-* para diseñar el elemento de destino */}
        {/* usar el sr-only son clases para mantener como oculto el elemento, en este caso el checkbox */}
        <input
          onChange={handleChangeTheme}
          type="checkbox"
          id="darkmode"
          className="peer sr-only"
          checked={isThemeDark} // Se usa la prop checked en el <input> para mantener el estado del checkbox sincronizado con el estado isThemeDark
        />
        {/* para la gradiente */}
        <div className="w-full h-full rounded-full peer-checked:bg-Toggle-Gradient absolute top-0 left-0"></div>
        {/* para la bolita del checkbox */}
        <div className="w-[18px] h-[18px] bg-Light-Grayish-Blue dark:bg-Very-Dark-Blue rounded-full peer-checked:translate-x-5 transition-all"></div>
      </label>
    </div>
  );
};
