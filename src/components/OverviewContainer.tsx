import fakeData from "../data/data.json";
import { Overview } from "../interfaces/data.interfaces";
import { OverviewCard } from "./OverviewCard";

export const OverviewContainer = () => {
  return (
    <section className="flex flex-col gap-6 mt-[-45px] mb-6">
      {fakeData.overview.map((element: Overview) => (
        <OverviewCard key={element.id} overviewInfo={element} />
      ))}
    </section>
  );
};
