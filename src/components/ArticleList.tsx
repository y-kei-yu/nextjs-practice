import { Article } from "@/types/Article";
import { ArticleCard } from "./ArticleCard";

type ArticleListProps = {
    articles: Article[];
};

export const ArticleList = ({ articles }: ArticleListProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
            ))}
        </div>
    )
}