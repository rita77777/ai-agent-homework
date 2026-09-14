import { client } from "../lib/openai.js";
import {
  qdrant,
  TAIWAN_CITIES_COLLECTION,
  EMBEDDING_DIM,
  EMBEDDING_MODEL,
} from "../lib/qdrant.js";

const cities = [
  {
    id: 1,
    name: "台北",
    description:
      "台北是台灣的首都，也是政治、商業與交通中心。著名景點包括台北101、故宮博物院、西門町與士林夜市，捷運系統便利，適合城市觀光與購物。",
  },
  {
    id: 2,
    name: "台中",
    description:
      "台中位於台灣中部，以氣候舒適與美食聞名。著名景點包括國家歌劇院、高美濕地、逢甲夜市與審計新村，也是珍珠奶茶文化的重要發源地之一。",
  },
  {
    id: 3,
    name: "台南",
    description:
      "台南是台灣歷史悠久的城市，以古蹟、寺廟與傳統小吃聞名。著名景點包括赤崁樓、安平古堡、孔廟，特色美食有牛肉湯、蝦捲與擔仔麵。",
  },
  {
    id: 4,
    name: "高雄",
    description:
      "高雄位於台灣南部，是重要的港口城市。著名景點包括駁二藝術特區、愛河、旗津與蓮池潭，城市具有港灣景觀，也有便利的捷運與輕軌系統。",
  },
  {
    id: 5,
    name: "花蓮",
    description:
      "花蓮位於台灣東部，以自然景觀與山海風景聞名。著名景點包括太魯閣、七星潭與東大門夜市，適合喜歡自然、戶外活動與欣賞東部景色的旅客。",
  },
];

async function recreateCollection() {
  const exists = await qdrant.collectionExists(TAIWAN_CITIES_COLLECTION);

  if (exists.exists) {
    await qdrant.deleteCollection(TAIWAN_CITIES_COLLECTION);
  }

  await qdrant.createCollection(TAIWAN_CITIES_COLLECTION, {
    vectors: {
      size: EMBEDDING_DIM,
      distance: "Cosine",
    },
  });
}

async function embedTexts(texts) {
  const response = await client.embeddings.create({
    model: EMBEDDING_MODEL,
    input: texts,
  });

  return response.data.map((item) => item.embedding);
}

async function main() {
  await recreateCollection();

  console.log(`已建立 collection: ${TAIWAN_CITIES_COLLECTION}`);

  const texts = cities.map(
    (city) => `${city.name}：${city.description}`,
  );

  const vectors = await embedTexts(texts);

  const points = cities.map((city, index) => ({
    id: city.id,
    vector: vectors[index],
    payload: {
      name: city.name,
      description: city.description,
    },
  }));

  await qdrant.upsert(TAIWAN_CITIES_COLLECTION, {
    wait: true,
    points,
  });

  console.log(`成功寫入 ${cities.length} 筆城市資料`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});