import SixCities from "../../pages/six-cities/six-cities";

type AppProps = {
  placesCount: number
}

function App({ placesCount }: AppProps): JSX.Element {
  return <SixCities placesCount={placesCount} />;
}

export default App;
