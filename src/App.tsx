import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Layout from "./View/Pages/Layout"
import StaticGraphs from "./View/Pages/StaticGraphs"
import CustomGraphs from "./View/Pages/CustomGraphs"
import NoPage from "./View/Pages/NoPage";
import { NewStaticGraphs } from "./View/Pages/newStaticGraphs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route path="/static-graphs" element={<StaticGraphs />}/>
            <Route path="/custom-graphs" element={<CustomGraphs />}/>
            <Route path="/beta-static-graphs" element={<NewStaticGraphs />} />
            <Route path="/" element={<Navigate replace={true} to="/static-graphs" />} />
            <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;