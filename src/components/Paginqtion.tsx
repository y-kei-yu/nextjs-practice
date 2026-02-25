import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  hasNextPage: boolean;
};

export const Pagination = ({
  currentPage,
  hasNextPage,
}: PaginationProps) => {
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const isPrevDisabled = currentPage <= 1;

  return (
    <div className="my-6 flex w-full justify-center">
      {isPrevDisabled ? (
        <button className="btn btn-disabled">前へ</button>
      ) : (
        <Link href={`/?page=${prevPage}`} className="btn">
          前へ
        </Link>
      )}

      {hasNextPage ? (
        <Link href={`/?page=${nextPage}`} className="btn ml-4">
          次へ
        </Link>
      ) : (
        <button className="btn btn-disabled ml-4">次へ</button>
      )}
    </div>
  );
};
