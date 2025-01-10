import Labs from "./Labs";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
export default function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="Labs" />} />
          <Route path="/Labs/*" element={<Labs />} />
        </Routes>

      </div>
    </HashRouter>
  );
}
