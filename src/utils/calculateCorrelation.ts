// export function calculateCorrelationDetailed(
//   x: number[],
//   y: number[]
// ): {
//   correlation: number | null;
//   details: {
//     meanX: number;
//     meanY: number;
//     numerator: number;
//     denominator: number;
//     deviationsX: number[];
//     deviationsY: number[];
//     squaredDeviationsX: number[];
//     squaredDeviationsY: number[];
//     products: number[];
//   };
// } {
//   const defaultDetails = {
//     meanX: 0,
//     meanY: 0,
//     numerator: 0,
//     denominator: 0,
//     deviationsX: [],
//     deviationsY: [],
//     squaredDeviationsX: [],
//     squaredDeviationsY: [],
//     products: [],
//   };

//   if (x.length !== y.length || x.length === 0) {
//     return { correlation: null, details: defaultDetails }; // Return defaults for invalid input
//   }

//   const n = x.length;
//   const meanX = x.reduce((sum, val) => sum + val, 0) / n;
//   const meanY = y.reduce((sum, val) => sum + val, 0) / n;

//   const deviationsX = x.map((xi) => xi - meanX);
//   const deviationsY = y.map((yi) => yi - meanY);

//   const squaredDeviationsX = deviationsX.map((dx) => dx ** 2);
//   const squaredDeviationsY = deviationsY.map((dy) => dy ** 2);

//   const products = x.map((_, i) => deviationsX[i] * deviationsY[i]);

//   const numerator = products.reduce((sum, val) => sum + val, 0);
//   const denominator = Math.sqrt(
//     squaredDeviationsX.reduce((sum, val) => sum + val, 0) *
//       squaredDeviationsY.reduce((sum, val) => sum + val, 0)
//   );

//   const correlation = denominator === 0 ? null : numerator / denominator;

//   return {
//     correlation,
//     details: {
//       meanX,
//       meanY,
//       numerator,
//       denominator,
//       deviationsX,
//       deviationsY,
//       squaredDeviationsX,
//       squaredDeviationsY,
//       products,
//     },
//   };
// }
import { jStat } from "jstat";

export function calculateCorrelationDetailed(
  x: number[],
  y: number[]
): {
  correlation: number | null;
  pValue: number | null;
  significant: boolean | null;
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
} {
  const defaultDetails = {
    meanX: 0,
    meanY: 0,
    numerator: 0,
    denominator: 0,
    deviationsX: [],
    deviationsY: [],
    squaredDeviationsX: [],
    squaredDeviationsY: [],
    products: [],
  };

  if (x.length !== y.length || x.length === 0) {
    return {
      correlation: null,
      pValue: null,
      significant: null,
      details: defaultDetails,
    };
  }

  const n = x.length;
  const meanX = x.reduce((sum, val) => sum + val, 0) / n;
  const meanY = y.reduce((sum, val) => sum + val, 0) / n;

  const deviationsX = x.map((xi) => xi - meanX);
  const deviationsY = y.map((yi) => yi - meanY);

  const squaredDeviationsX = deviationsX.map((dx) => dx ** 2);
  const squaredDeviationsY = deviationsY.map((dy) => dy ** 2);

  const products = x.map((_, i) => deviationsX[i] * deviationsY[i]);

  const numerator = products.reduce((sum, val) => sum + val, 0);
  const denominator = Math.sqrt(
    squaredDeviationsX.reduce((sum, val) => sum + val, 0) *
      squaredDeviationsY.reduce((sum, val) => sum + val, 0)
  );

  const correlation = denominator === 0 ? null : numerator / denominator;

  if (correlation === null) {
    return {
      correlation,
      pValue: null,
      significant: null,
      details: defaultDetails,
    };
  }

  // Compute the t-statistic
  const tStatistic =
    (correlation * Math.sqrt(n - 2)) / Math.sqrt(1 - correlation ** 2);

  // Compute the p-value
  const pValue = 2 * (1 - jStat.studentt.cdf(Math.abs(tStatistic), n - 2));

  // Determine significance
  const alpha = 0.05; // Significance level
  const significant = pValue < alpha;

  return {
    correlation,
    pValue,
    significant,
    details: {
      meanX,
      meanY,
      numerator,
      denominator,
      deviationsX,
      deviationsY,
      squaredDeviationsX,
      squaredDeviationsY,
      products,
    },
  };
}
