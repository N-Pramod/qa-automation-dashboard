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

  useEffect(() => {
    axios.get("http://localhost:8080/executions/summary")
      .then(res => setSummary(res.data));

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

      {/* Version 1 cards */}
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

      {/* Version 2 cards */}
      {testCaseSummary && (
        <div className="cards">
          <Card title="Requirements" value={testCaseSummary.totalRequirements} type="info" />
          <Card title="Manual Test Cases" value={testCaseSummary.manualTestCases} type="pass" />
          <Card title="Automation Test Cases" value={testCaseSummary.automationTestCases} type="info" />
        </div>
      )}

      <div className="charts-grid">
        <div className="section">
          <h2>Execution Trend</h2>
          <Line data={trendData} />
        </div>

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
