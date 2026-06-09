import { useEffect, useState } from "react";
import api from "./services/api";
import "./App.css";
import AnalyticsCards from "./components/AnalyticsCards";
import HistoryTable from "./components/HistoryTable";
import UploadForm from "./components/UploadForm";

function App() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const response = await api.get("/history");

    setHistory(response.data.history);
  };

  return (
  <div
    style={{
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "30px"
    }}
  >
    <h1
      style={{
        textAlign: "center",
        marginBottom: "30px"
      }}
    >
      Image Processing Microservice
    </h1>

    <UploadForm
      onUploadSuccess={fetchHistory}
    />

    <AnalyticsCards history={history} />

    <HistoryTable history={history} />
  </div>
);
}


export default App;