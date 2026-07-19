function MetricCard({ title, value, color }) {
  return (
    <div
      style={{
        background: "#111827",
        padding: "20px",
        borderRadius: "12px",
        borderLeft: `4px solid ${color}`,
        boxShadow: "0 10px 25px rgba(0,0,0,0.5)"
      }}
    >
      <h4 style={{ color: "#94a3b8" }}>{title}</h4>
      <h2 style={{ marginTop: "5px", color: color }}>{value}</h2>
    </div>
  );
}

export default MetricCard;