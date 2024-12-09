import React, { useState } from "react";
import DataInput from "./components/DataInput";
import CorrelationResult from "./components/CorrelationResult";
import ScatterPlot from "./components/ScatterPlot";
import ManualCalculation from "./components/ManualCalculation";
import { calculateCorrelationDetailed } from "./utils/calculateCorrelation";

const App: React.FC = () => {
  const [result, setResult] = useState<{
    correlation: number | null;
    pValue: number | null;
    significant: boolean | null;
    details: any;
  }>({ correlation: null, pValue: null, significant: null, details: {} });

  const handleDataSubmit = (x: number[], y: number[]) => {
    const correlationResult = calculateCorrelationDetailed(x, y);
    setResult(correlationResult);
  };
  const isDetailsComplete = (
    details: any
  ): details is {
    meanX: number;
    meanY: number;
    numerator: number;
    denominator: number;
    deviationsX: number[];
    deviationsY: number[];
    squaredDeviationsX: number[];
    squaredDeviationsY: number[];
    products: number[];
  } => {
    return (
      details &&
      typeof details.meanX === "number" &&
      typeof details.meanY === "number" &&
      typeof details.numerator === "number" &&
      typeof details.denominator === "number" &&
      Array.isArray(details.deviationsX) &&
      Array.isArray(details.deviationsY) &&
      Array.isArray(details.squaredDeviationsX) &&
      Array.isArray(details.squaredDeviationsY) &&
      Array.isArray(details.products)
    );
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <DataInput onSubmit={handleDataSubmit} />
      {result.correlation !== null && (
        <>
          <CorrelationResult
            correlation={result.correlation}
            pValue={result.pValue}
            significant={result.significant}
          />
          {isDetailsComplete(result.details) && (
            <>
              <ScatterPlot
                data={result.details.deviationsX.map((_, i) => ({
                  x: result.details.deviationsX[i] + result.details.meanX,
                  y: result.details.deviationsY[i] + result.details.meanY,
                }))}
              />
              <ManualCalculation details={result.details} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default App;
