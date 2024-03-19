import { CheckboxTheme } from "./CheckboxTheme";

export const Header = () => {
  return (
    <header className="bg-Very-Pale-Blue dark:bg-Very-Dark-Blue h-[235px] rounded-b-[20px] pt-8 px-6 ">
      <h1 className="text-Very-Dark-Blue dark:text-Very-Pale-Blue text-2xl font-bold mb-1">
        Social Media Dashboard
      </h1>
      <p className="text-Dark-Grayish-Blue dark:text-Desaturated-Blue font-bold mb-5">
        Total Followers: 23,004
      </p>

      <hr className="border-slate-500 mb-5" />

      <CheckboxTheme />
    </header>
  );
};
