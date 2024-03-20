import "./App.css";
import { Header } from "./components/Header";
import { OverviewContainer } from "./components/OverviewContainer";
import { OverviewTodayContainer } from "./components/OverviewTodayContainer";

function App() {
  return (
    <>
      <Header />

      <div className="max-w-[1440px] mx-auto px-5 mt-[-45px] mb-10 md:mt-[-55px]">
        <OverviewContainer />
        <OverviewTodayContainer />
      </div>
    </>
  );
}

export default App;
