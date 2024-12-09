// import React from "react";

// interface CorrelationResultProps {
//   correlation: number | null;
// }

// const CorrelationResult: React.FC<CorrelationResultProps> = ({
//   correlation,
// }) => {
//   if (correlation === null) return null;

//   const interpretation =
//     correlation > 0.8
//       ? "Strong Positive Correlation"
//       : correlation > 0.5
//       ? "Moderate Positive Correlation"
//       : correlation > -0.5
//       ? "Weak or No Correlation"
//       : "Negative Correlation";

//   return (
//     <div style={{ textAlign: "center", marginTop: "20px" }}>
//       <h2>Correlation Coefficient: {correlation.toFixed(2)}</h2>
//       <p>{interpretation}</p>
//     </div>
//   );
// };

// export default CorrelationResult;
import React from "react";

interface CorrelationResultProps {
  correlation: number | null;
  pValue: number | null;
  significant: boolean | null;
}

const CorrelationResult: React.FC<CorrelationResultProps> = ({
  correlation,
  pValue,
  significant,
}) => {
  if (correlation === null) return <p>No correlation calculated yet.</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Correlation Coefficient: {correlation.toFixed(5)}</h2>
      <p>
        <b>p-Value:</b> {pValue !== null ? pValue.toExponential(5) : "N/A"}
      </p>
      <p>
        <b>Significance:</b>{" "}
        {significant === true
          ? "Significant (Reject Null Hypothesis)"
          : "Not Significant (Fail to Reject Null Hypothesis)"}
      </p>
    </div>
  );
};

export default CorrelationResult;
