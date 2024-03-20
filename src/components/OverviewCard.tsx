// import { useCallback } from "react";
import { Overview } from "../interfaces/data.interfaces";
import facebookIcon from "../assets/images/icon-facebook.svg";
import twitterIcon from "../assets/images/icon-twitter.svg";
import instagramIcon from "../assets/images/icon-instagram.svg";
import youtubeIcon from "../assets/images/icon-youtube.svg";
import upIcon from "../assets/images/icon-up.svg";
import downIcon from "../assets/images/icon-down.svg";

interface OverviewCardProps {
  overviewInfo: Overview;
}

// export const OverviewCard: React.FC<OverviewCardProps> = ({ overviewInfo }) => {
export const OverviewCard = ({ overviewInfo }: OverviewCardProps) => {
  const { user, audience, audienceType, today, network, isUp } = overviewInfo;

  /* FORMA 1: usando una función con un switch y también del hook useCallback */
  /* useCallback para evitar que se cree una nueva instancia en cada renderizado del componente OverviewCard */
  // const getNetworkIcon = useCallback((network: string): string => {
  //   console.log("getNetworkIcon");
  //   switch (network.toLowerCase()) {
  //     case "facebook":
  //       return facebookIcon;
  //     case "twitter":
  //       return twitterIcon;
  //     case "instagram":
  //       return instagramIcon;
  //     case "youtube":
  //       return youtubeIcon;
  //     default:
  //       return ""; // Icono por defecto o manejo de error
  //   }
  // }, []);
  // const networkIcon = getNetworkIcon(network);

  /* FORMA 2: utilizar un objeto para mapear las redes sociales a sus respectivos íconos y luego obtener el ícono correspondiente directamente del objeto */
  const networkIcons: { [key: string]: string } = {
    facebook: facebookIcon,
    twitter: twitterIcon,
    instagram: instagramIcon,
    youtube: youtubeIcon,
  };
  const networkIcon = networkIcons[network.toLowerCase()] || ""; // Icono por defecto o manejo de error

  const networkColors: { [key: string]: string } = {
    /* se coloca de esa manera con bg- porque Tailwind no nos deja cambiar solo una parte de forma dinámica (no nos permitiría colocar algo como bg-${Facebook} o algo similar), se tendría que colocar toda la clase como tal y esa clase es la que cambiará de forma dinámica (en este caso es el bg- y lo que se desea colocar) */
    facebook: "bg-Facebook",
    twitter: "bg-Twitter",
    instagram: "bg-Instagram-Gradient",
    youtube: "bg-YouTube",
  };
  const networkColor = networkColors[network.toLowerCase()] || ""; // Icono por defecto o manejo de error

  const convertNumberToShortScale = (audience: number) => {
    // console.log("convertNumberToShortScale");
    // 1000 -> 1000 (3 ceros)
    // 10000 -> 10K
    // 100000 -> 100K
    // 1000000 -> 1M (6 ceros)
    // 10000000 -> 10M
    // 100000000 -> 100M
    // 1000000000 -> 1B (9 ceros)
    // 10000000000 -> 10B
    // 100000000000 -> 100B
    const numberToString = audience.toString();
    const numberToStringLength = numberToString.split("").length;

    const conditionB9 = numberToStringLength > 9;
    const conditionK6 = numberToStringLength > 6;
    const conditionK3 = numberToStringLength > 4; // si es 10000 será 10K si es 9999 será 9999

    let resultNumber = "";
    if (conditionB9) {
      resultNumber = resultNumber = numberToString.slice(0, -9) + "B";
    } else if (conditionK6) {
      resultNumber = numberToString.slice(0, -6) + "M";
    } else if (conditionK3) {
      resultNumber = numberToString.slice(0, -3) + "K";
    } else {
      resultNumber = numberToString;
    }

    /* expresión regular para insertar comas (,) como separadores de miles en un número. En resumen, la expresión regular busca cada dígito que esté seguido por grupos de tres dígitos consecutivos hacia adelante y los reemplaza insertando una coma después de cada grupo de tres dígitos. Esto proporciona el efecto de agregar comas como separadores de miles en el número. */
    /* 
      \d: Coincide con un solo dígito del 0 al 9.
      (?=(\d{3})+$): Este es un grupo de mirada adelante positivo que busca asegurarse de que después del dígito actual, hay grupos de tres dígitos consecutivos (\d{3}) seguidos hasta el final del número ($). Esto asegura que coincida con un dígito que esté seguido por grupos de tres dígitos hacia adelante sin consumir esos dígitos.
      /g: Esto indica que la búsqueda debe hacerse de manera global en todo el número, no solo en la primera coincidencia.
      "$1,": Esto es lo que se reemplazará cuando se encuentre una coincidencia. $1 hace referencia al primer grupo capturado por paréntesis en la expresión regular, que en este caso es un solo dígito (\d). Entonces, $1, básicamente agrega una coma después de cada grupo de tres dígitos.
    */
    const separatedNumber = numberToString.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
    const shortScale = resultNumber;

    return { shortScale, separatedNumber };
  };

  return (
    <div className="bg-Light-Grayish-Blue dark:bg-Dark-Desaturated-Blue w-full max-w-[300px] h-[215px] rounded-lg overflow-hidden mx-auto shadow-md hover:brightness-95 hover:dark:brightness-125 hover:scale-105 transition-transform cursor-pointer">
      {/* borde superior (se está añadiendo clases de forma dinámica) */}
      <div className={`${networkColor} h-1`}></div>

      {/* contenido (se está añadiendo la ruta de la imagen de forma dinámica) */}
      <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
        <div className="flex items-center justify-center gap-2">
          <img src={networkIcon} alt={`Logo ${network}`} />
          <p className="text-sm font-bold text-Dark-Grayish-Blue dark:text-Desaturated-Blue">
            {user}
          </p>
        </div>
        <p className="text-5xl font-bold text-Very-Dark-Blue dark:text-Light-Grayish-Blue">
          {convertNumberToShortScale(audience).shortScale}
        </p>
        <span className="text-[12px] tracking-[2px] text-Dark-Grayish-Blue dark:text-Desaturated-Blue mt-[-12px]">
          {convertNumberToShortScale(audience).separatedNumber}
        </span>
        <p className="text-xs uppercase tracking-[4px] text-Dark-Grayish-Blue dark:text-Desaturated-Blue mt-[-12px]">
          {audienceType}
        </p>
        <div className="flex items-center justify-center gap-1">
          <img
            className="w-2 h-[6px]"
            src={isUp ? upIcon : downIcon}
            alt={`Arrow ${isUp ? "Up" : "Down"}`}
          />
          <p
            className={`text-xs font-bold ${
              isUp ? "text-Lime-Green" : "text-Bright-Red"
            }`}
          >
            {today} Today
          </p>
        </div>
      </div>
    </div>
  );
};
