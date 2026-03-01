import { useState, useEffect } from "react";
import axios from "axios";

function TestCaseGenerator() {
  const [requirementText, setRequirementText] = useState("");
  const [requirements, setRequirements] = useState([]);
  const [testCases, setTestCases] = useState([]);

  // Load requirements on page load
  useEffect(() => {
    fetchRequirements();
  }, []);

  // ✅ FIXED – now reading res.data.data
  const fetchRequirements = () => {
    axios.get("http://localhost:8080/requirements")
      .then(res => {
        setRequirements(res.data.data || []);
      })
      .catch(err => console.error("Error loading requirements:", err));
  };

  const createRequirement = () => {
    if (!requirementText.trim()) return;

    axios.post("http://localhost:8080/requirements", {
      description: requirementText
    })
    .then(res => {
      setRequirementText("");
      fetchRequirements();
    })
    .catch(err => console.error("Error creating requirement:", err));
  };

  const generateManual = (id) => {
    setTestCases([]);

    axios.post(`http://localhost:8080/testcases/generate/${id}`)
      .then(res => {
        const data = res.data.data || res.data;

        if (Array.isArray(data)) {
          setTestCases(data);
        } else {
          setTestCases([data]);
        }
      })
      .catch(err => console.error("Manual generation error:", err));
  };

  const generateAutomation = (id) => {
    setTestCases([]);

    axios.post(`http://localhost:8080/automation/generate/${id}`)
      .then(res => {
        const data = res.data.data || res.data;

        if (Array.isArray(data)) {
          setTestCases(data);
        } else {
          setTestCases([data]);
        }
      })
      .catch(err => console.error("Automation generation error:", err));
  };

  const exportTestCases = () => {
    window.open("http://localhost:8080/testcases/export", "_blank");
  };

  const deleteRequirement = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/requirements/${id}`);

      setRequirements(prev =>
        prev.filter(req => req.id !== id)
      );

      setTestCases([]);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const generateSmartAI = (requirementDescription) => {
  console.log("Smart AI button clicked");

  axios.post(
    "http://localhost:8080/smart-ai/generate",
    requirementDescription,
    { headers: { "Content-Type": "text/plain" } }
  )
  .then(res => {
    const data = res.data.data || res.data;

    setTestCases(
      data.map((tc, index) => ({
        id: index,
        description: tc.description,
        category: tc.category,
        priority: tc.priority
      }))
    );
  })
  .catch(err => {
    console.error("Smart AI error:", err);
  });
};

  const updateRequirement = async (id, newText) => {
    try {
      await axios.put(`http://localhost:8080/requirements/${id}`, {
        description: newText
      });
      fetchRequirements();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className="dashboard">

      <h1>Test Case Generator</h1>

      {/* Requirement Input */}
      <div style={{ marginBottom: "20px" }}>
        <textarea
          rows="3"
          placeholder="Enter Requirement..."
          value={requirementText}
          onChange={(e) => setRequirementText(e.target.value)}
          style={{ width: "100%", padding: "10px" }}
        />
        <button onClick={createRequirement} style={{ marginTop: "10px" }}>
          Create Requirement
        </button>
      </div>

      {/* Requirements List */}
      <h3>Saved Requirements</h3>
      {requirements.length === 0 && <p>No requirements yet.</p>}

      {requirements.map(req => (
        <div key={req.id} style={{
          marginBottom: "15px",
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          background: "white"
        }}>
          <strong>{req.description}</strong>
          <br /><br />

          <button onClick={() => generateManual(req.id)}>
            Generate Manual
          </button>

          <button
            onClick={() => generateAutomation(req.id)}
            style={{ marginLeft: "10px" }}
          >
            Generate Automation
          </button>

          <button
            onClick={() => {
              const newText = prompt("Edit Requirement:", req.description);
              if (newText) updateRequirement(req.id, newText);
            }}
            style={{ marginLeft: "10px" }}
          >
            Edit
          </button>

          <button
  onClick={() => generateSmartAI(req.description)}
  style={{ marginLeft: "10px" }}
>
  Generate Smart AI Test Cases
</button>

          <button
            onClick={() => deleteRequirement(req.id)}
            style={{ marginLeft: "10px", color: "red" }}
          >
            Delete
          </button>
        </div>
      ))}

      {/* Generated Test Cases */}
      <h3 style={{ marginTop: "30px" }}>Generated Test Cases</h3>

      {testCases.length === 0 && <p>No test cases generated.</p>}

      {testCases.map(tc => (
  <div
    key={tc.id}
    style={{
      background: "#f4f4f4",
      padding: "12px",
      borderRadius: "6px",
      marginBottom: "10px"
    }}
  >
    {tc.code && <pre>{tc.code}</pre>}

    {tc.steps && <pre>{tc.steps}</pre>}

    {tc.description && (
      <>
        <strong>Test Case:</strong> {tc.description} <br />
        <strong>Category:</strong> {tc.category} <br />
        <strong>Priority:</strong> {tc.priority}
      </>
    )}
  </div>
))}

      {/* Export */}
      <button
        onClick={exportTestCases}
        style={{ marginTop: "20px" }}
      >
        Export Test Cases (Excel)
      </button>
    </div>
  );
}

export default TestCaseGenerator;
