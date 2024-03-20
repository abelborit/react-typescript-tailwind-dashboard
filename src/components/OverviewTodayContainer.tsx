import fakeData from "../data/data.json";
import { OverviewToday } from "../interfaces/data.interfaces";
import { OverviewTodayCard } from "./OverviewTodayCard";

export const OverviewTodayContainer = () => {
  return (
    <section className="flex flex-col gap-6 mt-[45px]">
      <h3 className="text-Very-Dark-Blue dark:text-Light-Grayish-Blue text-[22px] font-bold mb-[-8px]">
        Overview - Today
      </h3>

      <div className="flex flex-wrap gap-6">
        {fakeData.overviewToday.map((element: OverviewToday) => (
          <OverviewTodayCard key={element.id} overviewTodayInfo={element} />
        ))}
      </div>
    </section>
  );
};
