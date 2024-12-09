import React, { useState } from "react";

interface DataInputProps {
  onSubmit: (dataX: number[], dataY: number[]) => void;
}

const DataInput: React.FC<DataInputProps> = ({ onSubmit }) => {
  const [inputX, setInputX] = useState<string>("");
  const [inputY, setInputY] = useState<string>("");
  const [error, setError] = useState<string>("");

  const validateInputs = (x: string, y: string): string | null => {
    if (x.trim() === "" || y.trim() === "") {
      return "Both datasets must be non-empty.";
    }

    const dataX = x.split(",").map(Number);
    const dataY = y.split(",").map(Number);

    if (dataX.some(isNaN) || dataY.some(isNaN)) {
      return "Datasets must contain only numeric values.";
    }

    if (dataX.length !== dataY.length) {
      return "Datasets must have the same length.";
    }

    return null; // No errors
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateInputs(inputX, inputY);
    if (validationError) {
      setError(validationError);
      return;
    }

    // Parse valid data
    const dataX = inputX.split(",").map(Number);
    const dataY = inputY.split(",").map(Number);

    // Submit the data to the parent component
    onSubmit(dataX, dataY);

    // Clear the input fields and error
    setInputX("");
    setInputY("");
    setError("");
  };

  const handleInputChange = (x: string, y: string) => {
    const validationError = validateInputs(x, y);
    setError(validationError || "");
  };

  return (
    <form
      onSubmit={handleSubmit}
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
        value={inputX}
        onChange={(e) => {
          setInputX(e.target.value);
          handleInputChange(e.target.value, inputY);
        }}
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
        value={inputY}
        onChange={(e) => {
          setInputY(e.target.value);
          handleInputChange(inputX, e.target.value);
        }}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          resize: "none",
        }}
      />

      {error && (
        <p
          style={{
            color: "red",
            fontSize: "14px",
            margin: "10px 0",
            fontStyle: "italic",
          }}
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#007BFF",
          color: "#ffffff",
          border: "none",
          borderRadius: "5px",
          marginTop: "10px",
        }}
      >
        Calculate Correlation
      </button>

      <p style={{ color: "#888", fontSize: "12px", marginTop: "10px" }}>
        Please enter numeric values separated by commas.
      </p>
    </form>
  );
};

export default DataInput;
