import { z } from "zod";
import { defineTool } from "../utils/func-tool.js";

function calculate({ expression }) {
  try {
    const result = eval(expression);
    return {
      expression,
      result,
    };
  } catch (error) {
    return {
      expression,
      error: "計算式無法執行",
    };
  }
}

export const calculatorTool = defineTool({
  name: "calculate",
  description: "進行數學計算，例如加減乘除與括號運算",
  fn: calculate,
  parameters: z.object({
    expression: z.string().describe('數學算式，例如 "10 + 5 * 2"'),
  }),
});