import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { Post } from "@prisma/client";

type RouteParams = {
  params: {
    id: string;
  };
};

export const DELETE = async (req: NextRequest, routeParams: RouteParams) => {
  try {
    const id = routeParams.params.id;
    const post: Post = await prisma.post.delete({
      where: { id },
    });
    return NextResponse.json({ msg: `「${post.title}」を削除しました。` });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "投稿記事の削除に失敗しました" },
      { status: 500 }
    );
  }
};
