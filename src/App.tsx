import "./App.css";
import { Header } from "./components/Header";
import { OverviewContainer } from "./components/OverviewContainer";
import { OverviewTodayContainer } from "./components/OverviewTodayContainer";

function App() {
  return (
    <>
      <Header />
      <OverviewContainer />
      <OverviewTodayContainer />
    </>
  );
}

export default App;
