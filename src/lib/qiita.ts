import type { Article } from "@/types/Article";

type QiitaItem = {
  id: string;
  title: string;
  url: string;
  created_at: string;
  thumbnail?: string;
};

export type GetQiitaArticlesParams = {
  page?: number;
  perPage?: number;
};

const DEFAULT_QIITA_API_URL =
  "https://qiita.com/api/v2/authenticated_user/items";

export async function getQiitaArticles({
  page = 1,
  perPage = 8,
}: GetQiitaArticlesParams = {}) {
  const apiUrl = process.env.QIITA_API_URL ?? DEFAULT_QIITA_API_URL;
  const apiToken = process.env.QIITA_ACCESS_TOKEN;

  if (!apiToken) {
    throw new Error("QIITA_ACCESS_TOKEN is not configured");
  }

  const requestUrl = new URL(apiUrl);
  requestUrl.searchParams.set("page", String(page));
  requestUrl.searchParams.set("per_page", String(perPage));

  const res = await fetch(requestUrl.toString(), {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch articles from Qiita API: ${res.status}`);
  }

  const data = (await res.json()) as QiitaItem[];

  const articles: Article[] = data.map((item) => ({
    id: item.id,
    title: item.title,
    url: item.url,
    date: item.created_at,
    thumbnail: item.thumbnail ?? "",
  }));

  return {
    articles,
    hasNextPage: articles.length === perPage,
  };
}
