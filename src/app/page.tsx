import { ArticleList } from "@/components/ArticleList";
import { Pagination } from "@/components/Paginqtion";
import { getQiitaArticles } from "@/lib/qiita";
import type { Article } from "@/types/Article";

type PageProps = {
  searchParams: {
    page?: string;
  };
};

export default async function Home({ searchParams }: PageProps) {
  const perPage = 8;
  const params = await searchParams;
  const parsedPage = Number.parseInt(params.page ?? "1", 10);
  const safePage = Number.isNaN(parsedPage) ? 1 : Math.max(1, parsedPage);

  let articles: Article[] = [];
  let hasNextPage = false;

  try {
    const result = await getQiitaArticles({
      page: safePage,
      perPage,
    });
    articles = result.articles;
    hasNextPage = result.hasNextPage;
  } catch {
    return <div className="my-6 flex w-full justify-center">記事の取得に失敗しました。</div>;
  }

  return (
    <div className="my-6 flex w-full flex-col px-3">
      <section className="flex w-full flex-col px-3">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">個人記事一覧</h2>
        </div>
        <ArticleList articles={articles} />
      </section>

      <div className="mt-6 px-3">
        <Pagination currentPage={safePage} hasNextPage={hasNextPage} />
      </div>
    </div>
  );
}
