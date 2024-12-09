import React from "react";

interface DataInputProps {
  onChangeX: (data: number[]) => void;
  onChangeY: (data: number[]) => void;
}

const DataInput: React.FC<DataInputProps> = ({ onChangeX, onChangeY }) => (
  <div
    style={{
      maxWidth: "600px",
      margin: "20px auto",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#ffffff",
      textAlign: "center",
      fontFamily: "'Arial', sans-serif",
    }}
  >
    <h2 style={{ marginBottom: "20px", color: "#333" }}>
      Correlation Calculator
    </h2>
    <p style={{ marginBottom: "10px", fontStyle: "italic", color: "#555" }}>
      Created by Salmaan Mushtaq
    </p>

    <label
      htmlFor="datasetX"
      style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
    >
      Enter Dataset X
    </label>
    <textarea
      id="datasetX"
      placeholder="Enter Dataset X (comma-separated)"
      rows={4}
      cols={30}
      onChange={(e) => onChangeX(e.target.value.split(",").map(Number))}
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        resize: "none",
      }}
    />

    <label
      htmlFor="datasetY"
      style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
    >
      Enter Dataset Y
    </label>
    <textarea
      id="datasetY"
      placeholder="Enter Dataset Y (comma-separated)"
      rows={4}
      cols={30}
      onChange={(e) => onChangeY(e.target.value.split(",").map(Number))}
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        resize: "none",
      }}
    />

    <p style={{ color: "#888", fontSize: "12px" }}>
      Please enter numeric values separated by commas.
    </p>
  </div>
);

export default DataInput;
