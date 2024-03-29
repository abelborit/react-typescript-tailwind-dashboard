import { CheckboxTheme } from "./CheckboxTheme";

export const Header = () => {
  return (
    <header className="bg-Very-Pale-Blue dark:bg-Very-Dark-Blue h-[260px] md:h-[240px] rounded-b-[20px] pt-8 shadow-md">
      <div className="max-w-[1440px] mx-auto px-5">
        <h1 className="text-Very-Dark-Blue dark:text-Very-Pale-Blue text-3xl font-bold mb-1">
          Social Media Dashboard
        </h1>
        <p className="text-Dark-Grayish-Blue dark:text-Desaturated-Blue text-sm font-bold">
          Total Followers: 23,004
        </p>
        <hr className="border-slate-500 my-5" />
        <CheckboxTheme />
      </div>
    </header>
  );
};
