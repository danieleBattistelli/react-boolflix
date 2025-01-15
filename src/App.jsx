import MovieSearch from "./components/MovieSearch"
import { AppProvider } from "./context/AppContext";


function App() {
 

  return (
    <AppProvider>
    <div className="App">
      <MovieSearch />
    </div>
    </AppProvider>
  );
}

export default App;
