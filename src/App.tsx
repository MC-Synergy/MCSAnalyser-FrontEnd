import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Layout from "./View/Pages/Layout"
import ProductionGraphs from "./View/Pages/ProductionGraphs"
import StorageGraphs from "./View/Pages/StorageGraphs"
import CustomGraphs from "./View/Pages/CustomGraphs"
import NoPage from "./View/Pages/NoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route path="/production-graphs" element={<ProductionGraphs />}/>
            <Route path="/storage-graphs" element={<StorageGraphs />} />
            <Route path="/custom-graphs" element={<CustomGraphs />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/portal" element={<Portal></Portal>} />
            <Route path="/" element={<Navigate replace={true} to="/production-graphs" />} />
            <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function About() {
  window.location.replace('https://github.com/MC-Synergy/MCSAnalyser-FrontEnd#readme');
  return null;
}

function Portal() {
  window.location.replace('https://portal.mcsynergy.nl');
  return null;
}