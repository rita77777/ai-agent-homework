import { searchCities } from "../lib/qdrant.js";

const queries = [
  "我想去一個有很多古蹟和傳統小吃的城市",
  "哪個城市適合欣賞山海自然風景？",
  "我想去有港口、藝術特區和輕軌的地方",
];

for (const query of queries) {
  console.log("\n==============================");
  console.log(`查詢：${query}`);
  console.log("==============================");

  const results = await searchCities(query, 3);

  results.forEach((result, index) => {
    console.log(
      `${index + 1}. ${result.name} | similarity: ${result.score.toFixed(4)}`,
    );
    console.log(`   ${result.description}`);
  });
}