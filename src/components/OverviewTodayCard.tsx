import { OverviewToday } from "../interfaces/data.interfaces";
import facebookIcon from "../assets/images/icon-facebook.svg";
import twitterIcon from "../assets/images/icon-twitter.svg";
import instagramIcon from "../assets/images/icon-instagram.svg";
import youtubeIcon from "../assets/images/icon-youtube.svg";
import upIcon from "../assets/images/icon-up.svg";
import downIcon from "../assets/images/icon-down.svg";

interface OverviewTodayCardProps {
  overviewTodayInfo: OverviewToday;
}

// export const OverviewTodayCard: React.FC<OverviewTodayCardProps> = ({ overviewTodayInfo }) => {
export const OverviewTodayCard = ({
  overviewTodayInfo,
}: OverviewTodayCardProps) => {
  const { isUp, network, porcentage, stats, statsType } = overviewTodayInfo;

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

  const convertNumberToShortScale = (stats: number) => {
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
    const numberToString = stats.toString();
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
    <div className="bg-Light-Grayish-Blue dark:bg-Dark-Desaturated-Blue w-full max-w-[300px] h-[115px] rounded-lg overflow-hidden mx-auto shadow-md hover:brightness-95 hover:dark:brightness-125 hover:scale-105 transition-transform cursor-pointer">
      {/* borde superior (se está añadiendo clases de forma dinámica) */}
      <div className={`${networkColor} h-1`}></div>

      {/* contenido (se está añadiendo la ruta de la imagen de forma dinámica) */}
      <div className="flex items-center justify-between p-4 w-full h-full">
        <div className="flex flex-col items-start justify-between h-full">
          <p className="text-sm font-bold text-Dark-Grayish-Blue dark:text-Desaturated-Blue">
            {statsType}
          </p>

          <span className="text-[10px] tracking-[2px] text-Dark-Grayish-Blue dark:text-Desaturated-Blue mt-[-12px]">
            {convertNumberToShortScale(stats).separatedNumber}
          </span>

          <p className="text-3xl font-bold text-Very-Dark-Blue dark:text-Light-Grayish-Blue">
            {convertNumberToShortScale(stats).shortScale}
          </p>
        </div>

        <div className="flex flex-col items-end justify-center h-full gap-[6px]">
          <img src={networkIcon} alt={`Logo ${network}`} />

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
              {porcentage}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
