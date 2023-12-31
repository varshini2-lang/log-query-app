// LogQuery.js
import React, { useState } from "react";
import axios from "axios";

const LogQuery = () => {
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:8000/access-logs/", {
        params: {
          start_time: startDateTime,
          end_time: endDateTime,
        },
      });
      setLogs(response.data.access_logs);
    } catch (err) {
      setError("Error fetching logs");
    }
  };

  return (
    <div>
      <h2>Access Log Query</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Start Time:
          <input
            type="datetime-local"
            value={startDateTime}
            onChange={(e) => setStartDateTime(e.target.value)}
          />
        </label>
        <br />
        <label>
          End Time:
          <input
            type="datetime-local"
            value={endDateTime}
            onChange={(e) => setEndDateTime(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Query Logs</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h3>Access Logs</h3>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>
            {JSON.stringify(log)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LogQuery;
