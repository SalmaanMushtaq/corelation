import React, { useState } from "react";
import DataInput from "./components/DataInput";
import CorrelationResult from "./components/CorrelationResult";
import ScatterPlot from "./components/ScatterPlot";
import ManualCalculation from "./components/ManualCalculation";
import { calculateCorrelationDetailed } from "./utils/calculateCorrelation";

const App: React.FC = () => {
  const [x, setX] = useState<number[]>([]);
  const [y, setY] = useState<number[]>([]);
  const [result, setResult] = useState<{
    correlation: number | null;
    pValue: number | null;
    significant: boolean | null;
    details: any;
  }>({ correlation: null, pValue: null, significant: null, details: {} });

  const handleCalculate = () => {
    if (x.length !== y.length || x.length === 0) {
      alert("Datasets must have the same length and not be empty.");
      return;
    }
    const correlationResult = calculateCorrelationDetailed(x, y);
    setResult(correlationResult);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <DataInput onChangeX={setX} onChangeY={setY} />
      <div style={{ textAlign: "center" }}>
        <button
          onClick={handleCalculate}
          style={{
            padding: "10px 20px",
            margin: "10px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Calculate Correlation
        </button>
      </div>
      <CorrelationResult
        correlation={result.correlation}
        pValue={result.pValue}
        significant={result.significant}
      />
      {x.length && y.length && x.length === y.length && result.details ? (
        <>
          <ScatterPlot data={x.map((xi, i) => ({ x: xi, y: y[i] }))} />
          <ManualCalculation details={result.details} />
        </>
      ) : null}
    </div>
  );
};

export default App;
