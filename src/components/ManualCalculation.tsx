import React from "react";

interface ManualCalculationProps {
  details: {
    meanX: number;
    meanY: number;
    numerator: number;
    denominator: number;
    deviationsX: number[];
    deviationsY: number[];
    squaredDeviationsX: number[];
    squaredDeviationsY: number[];
    products: number[];
  };
}

const ManualCalculation: React.FC<ManualCalculationProps> = ({ details }) => {
  // Ensure data is valid before rendering
  if (!details || !details.deviationsX || details.deviationsX.length === 0) {
    return <p>No detailed calculation available.</p>;
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Manual Calculation Breakdown</h3>
      <p>
        <b>Mean of X:</b> {details.meanX}
      </p>
      <p>
        <b>Mean of Y:</b> {details.meanY}
      </p>

      <h4>Step-by-Step Values</h4>
      <table border={1} style={{ width: "100%", textAlign: "center" }}>
        <thead>
          <tr>
            <th>X</th>
            <th>Deviation (X - MeanX)</th>
            <th>(X - MeanX)^2</th>
            <th>Y</th>
            <th>Deviation (Y - MeanY)</th>
            <th>(Y - MeanY)^2</th>
            <th>Product (X Deviation * Y Deviation)</th>
          </tr>
        </thead>
        <tbody>
          {details.deviationsX.map((dx, i) => (
            <tr key={i}>
              <td>{dx + details.meanX}</td>
              <td>{dx}</td>
              <td>{details.squaredDeviationsX[i]}</td>
              <td>{details.deviationsY[i] + details.meanY}</td>
              <td>{details.deviationsY[i]}</td>
              <td>{details.squaredDeviationsY[i]}</td>
              <td>{details.products[i]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Final Values</h4>
      <p>
        <b>Numerator:</b> {details.numerator}
      </p>
      <p>
        <b>Denominator:</b> {details.denominator}
      </p>
    </div>
  );
};

export default ManualCalculation;
