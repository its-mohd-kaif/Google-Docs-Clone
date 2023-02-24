import LandingPage from "./component/LandingPage";
import "./App.css";
import { createContext, useState } from "react";
// Make a context state that holds data of input forms
export const DataContext = createContext();
function App() {
  const [data, setData] = useState([]);
  return (
    <div>
      <DataContext.Provider value={{ data, setData }}>
        <LandingPage />
      </DataContext.Provider>
    </div>
  );
}

export default App;
