import { input } from "@inquirer/prompts";
import { client, DEFAULT_MODEL } from "./lib/openai.js";
import { spinner } from "./utils/spinner.js";
import { toOpenAITool } from "./utils/func-tool.js";
import * as allTools from "./tools/index.js";

const toolList = Object.values(allTools);
const tools = toolList.map(toOpenAITool);

const TOOLS_BY_NAME = Object.fromEntries(
  toolList.map((tool) => [tool.name, tool]),
);

const MAX_TOOL_ROUNDS = 8;

const history = [
  {
    role: "developer",
    content:
      "你是一位生活資訊助理，可以使用工具查詢目前台灣時間與指定城市的即時天氣。當使用者詢問現在時間時，請呼叫時間工具；詢問天氣時，請呼叫天氣工具；若使用者同時詢問時間與天氣，請分別呼叫兩個工具，並將取得的結果整合成繁體中文回答。即時資訊必須以工具查詢結果為準，不要自行猜測。",
  },
];

while (true) {
  const userQuestion = (
    await input({
      message: "請輸入你的問題：",
    })
  ).trim();

  if (!userQuestion) {
    continue;
  }

  if (userQuestion.toLowerCase() === "exit") {
    console.log("再會！");
    break;
  }

  history.push({
    role: "user",
    content: userQuestion,
  });

  let completed = false;

  for (let round = 1; round <= MAX_TOOL_ROUNDS; round += 1) {
    const spin = spinner("思考中...").start();

    const response = await client.responses.create({
      model: DEFAULT_MODEL,
      input: history,
      tools,
      tool_choice: "auto",
    });

    spin.stop();

    history.push(...response.output);

    const functionCalls = response.output.filter(
      (item) => item.type === "function_call",
    );

    if (functionCalls.length === 0) {
      console.log(`\n${response.output_text}\n`);
      completed = true;
      break;
    }

    for (const functionCall of functionCalls) {
      const fnName = functionCall.name;
      const tool = TOOLS_BY_NAME[fnName];

      if (!tool) {
        throw new Error(`模型要求了未註冊的工具：${fnName}`);
      }

      const args = tool.parameters.parse(
        JSON.parse(functionCall.arguments),
      );

      console.log(
        `\n[呼叫 tool] ${fnName}(${JSON.stringify(args)})`,
      );

      const result = await tool.fn(args);

      history.push({
        type: "function_call_output",
        call_id: functionCall.call_id,
        output: JSON.stringify(result),
      });
    }
  }

  if (!completed) {
    console.log(
      `Tool calling 超過 ${MAX_TOOL_ROUNDS} 輪，已停止執行`,
    );
  }
}