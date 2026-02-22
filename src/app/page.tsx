import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full flex flex-col px-3 my-6">
      <section className="w-full flex flex-col px-3">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">個人記事</h2>
          <Morebutton href="/individuals" />
        </div>
        <ArticleList articles={articles} />
      </section>
    </div>
  );
}
