import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Layout from "./Pages/Layout"
import StaticGraphs from "./Pages/StaticGraphs"
import CustomGraphs from "./Pages/CustomGraphs"
import NoPage from "./Pages/NoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route path="/static-graphs" element={<StaticGraphs />}/>
            <Route path="/custom-graphs" element={<CustomGraphs />}/>
            <Route path="/" element={<Navigate replace={true} to="/static-graphs" />} />
            <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;