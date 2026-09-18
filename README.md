# AI Agent Homework

本 Repository 為 AI Agent 開發實戰課程課後作業。

## 作業列表

### Homework 1：打造專屬角色聊天機器人

路徑：`homework/homework-1/`

- 角色：英文單字小老師
- 從 `1.4-openai-api-with-memory` 開始實作
- 支援多輪對話與對話記憶
- 可記住使用者先前提供的學習需求

### Homework 2：新增 Function Calling 工具

路徑：`homework/homework-2/`

- 新增 `calculate` 計算機工具
- 從 `2.5-tool-calling-current-time` 開始實作
- 使用 `defineTool` 與 Zod 定義工具參數
- 可由 AI 自動判斷並呼叫計算工具

### Homework 3：建立迷你知識庫

路徑：`homework/homework-3/`

- 主題：台灣城市介紹
- 從 `3.2-rag-search-text` 開始實作
- 使用 OpenAI Embedding + Qdrant
- 建立 5 筆城市知識資料
- 使用 3 種不同問法測試語意搜尋

### Homework 4：整合時間與天氣工具

路徑：`homework/homework-4/`

- 從 `2.5-tool-calling-current-time` 開始實作
- 整合目前時間與即時天氣工具
- AI 可根據問題自動選擇正確工具
- 同時詢問時間與天氣時，可呼叫兩個工具並整合回答

### Homework 5：新增 SQL 老師 Agent

路徑：`homework/homework-5/`

- 從 `5.1-agents-md` 開始實作
- 新增 `SQL 老師`
- 設定獨立的 `instructions` 與 `handoffDescription`
- 在 `AGENTS.md` 新增 SQL 問題的轉交規則
- 驗證班導師可將不同問題轉交給正確的 Agent

## 專案結構

```text
homework/
├── homework-1/
├── homework-2/
├── homework-3/
├── homework-4/
└── homework-5/
```