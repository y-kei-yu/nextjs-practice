import { NextRequest, NextResponse } from "next/server";

import { getQiitaArticles } from "@/lib/qiita";

export async function GET(req: NextRequest) {
  const page = Number.parseInt(req.nextUrl.searchParams.get("page") ?? "1", 10);
  const perPage = Number.parseInt(req.nextUrl.searchParams.get("per_page") ?? "8", 10);

  const safePage = Number.isNaN(page) ? 1 : Math.max(1, page);
  const safePerPage = Number.isNaN(perPage) ? 8 : Math.max(1, perPage);

  try {
    const result = await getQiitaArticles({
      page: safePage,
      perPage: safePerPage,
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Failed to fetch articles from Qiita API",
      },
      { status: 500 },
    );
  }
}
