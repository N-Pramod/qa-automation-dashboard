import { useEffect, useState } from "react";
import axios from "axios";
import "../dashboard.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [passAnalytics, setPassAnalytics] = useState(null);
  const [failureAnalytics, setFailureAnalytics] = useState(null);
  const [trend, setTrend] = useState([]);
  const [projectWise, setProjectWise] = useState([]);
  const [testCaseSummary, setTestCaseSummary] = useState(null);

  // ✅ Recent runs (dynamic rendering)
  const [recentRuns, setRecentRuns] = useState([]);

  useEffect(() => {

  const fetchData = () => {

    // 🔹 Summary
    axios.get("http://localhost:8080/executions/summary")
      .then(res => setSummary(res.data));

    // 🔹 Recent Runs
    axios.get("http://localhost:8080/executions/recent")
      .then(res => setRecentRuns(res.data));

    // 🔹 Other APIs (keep if already there)
    axios.get("http://localhost:8080/executions/analytics/pass-percentage")
      .then(res => setPassAnalytics(res.data));

    axios.get("http://localhost:8080/executions/analytics/failure-frequency")
      .then(res => setFailureAnalytics(res.data));

    axios.get("http://localhost:8080/executions/analytics/trend")
      .then(res => setTrend(res.data));

    axios.get("http://localhost:8080/executions/analytics/project-wise")
      .then(res => setProjectWise(res.data));

    axios.get("http://localhost:8080/testcases/analytics/summary")
      .then(res => setTestCaseSummary(res.data));
  };

  // 🔹 Call immediately
  fetchData();

  // 🔹 Call every 5 seconds
  const interval = setInterval(fetchData, 5000);

  // 🔹 Cleanup (important)
  return () => clearInterval(interval);

}, []);
  if (!summary || !passAnalytics || !failureAnalytics) {
    return <p style={{ padding: "20px" }}>Loading dashboard...</p>;
  }

  const trendData = {
    labels: trend.map((_, index) => `Run ${index + 1}`),
    datasets: [
      {
        label: "Failed Tests",
        data: trend.map(t => t.failedTests),
        borderColor: "red",
      },
      {
        label: "Passed Tests",
        data: trend.map(t => t.passedTests),
        borderColor: "green",
      },
    ],
  };

  const projectData = {
    labels: projectWise.map(p => p.projectName),
    datasets: [
      {
        label: "Pass Percentage",
        data: projectWise.map(p => p.passPercentage),
        backgroundColor: "steelblue",
      },
    ],
  };

  return (
    <div className="dashboard">

      <h1>QA Automation Dashboard</h1>
      <p style={{ color: "#666", marginBottom: "20px" }}>
        Monitor automation performance and recent executions
      </p>

      {/* Cards */}
      <div className="cards">
        <Card title="Total Runs" value={summary.totalRuns} type="info" />
        <Card title="Passed Runs" value={summary.passedRuns} type="pass" />
        <Card title="Failed Runs" value={summary.failedRuns} type="fail" />
        <Card
          title="Pass %"
          value={`${(passAnalytics.passPercentage ?? 0).toFixed(2)}%`}
          type="pass"
        />
        <Card
          title="Failure Rate"
          value={`${(failureAnalytics.failureRate ?? 0).toFixed(2)}%`}
          type="fail"
        />
      </div>

      {/* Test Case Summary */}
      {testCaseSummary && (
        <div className="cards">
          <Card title="Requirements" value={testCaseSummary.totalRequirements} type="info" />
          <Card title="Manual Test Cases" value={testCaseSummary.manualTestCases} type="pass" />
          <Card title="Automation Test Cases" value={testCaseSummary.automationTestCases} type="info" />
        </div>
      )}

      <div className="charts-grid">

        {/* Execution Trend */}
        <div className="section">
          <h2>Execution Trend</h2>
          <Line data={trendData} />
        </div>

        {/* Recent Test Runs */}
        <div className="section">
          <h2>Recent Test Runs</h2>

          <table className="runs-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Project</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>

            <tbody>
  {recentRuns.map(run => (
    <tr key={run.id}>
      <td>{run.id}</td>
      <td>{run.project}</td>
      <td>{run.duration}</td>
      <td>
        <span className={run.status === "PASSED" ? "badge-pass" : "badge-fail"}>
          {run.status}
        </span>
      </td>
      <td>{run.executedAt}</td>
    </tr>
  ))}
</tbody>
          </table>
        </div>

        {/* Project-wise Chart */}
        <div className="section">
          <h2>Project-wise Pass Percentage</h2>
          <Bar data={projectData} />
        </div>

      </div>
    </div>
  );
}

function Card({ title, value, type }) {
  return (
    <div className={`card ${type}`}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}

export default Dashboard;