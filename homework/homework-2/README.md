# AI Agent Homework 2

## 作業內容
新增 Function Calling 計算機工具

本作業從 `2.5-tool-calling-current-time` 分支開始實作，
新增一個可以讓 AI 進行數學運算的 `calculate` 工具。

## 實作方式

新增：

`tools/calculator.js`

使用 `defineTool()` 定義計算機工具，並使用 zod 定義輸入參數：

- Tool name：`calculate`
- Parameter：`expression`
- Type：string

## 測試結果

測試算式：

```text
10 + 5 * 2
```

AI 成功呼叫 `calculate` 工具，計算結果為 `20`。

### 執行截圖

![Calculator Tool Test](./images/calculator-test.png)
