import { createPicture, findPictureById } from "@/database/pictureRepo";
import { PictureStatus } from "@/prisma/enums";
import { Picture } from "@/prisma/types";
import { Insertable } from "kysely";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const picture: Insertable<Picture> = {
    userId: body.userId,
    prompt: body.prompt,
    tags: body.tags,
    status: PictureStatus.ONLINE,
    url: body.url,
  };
  await createPicture(picture);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") || "";

  if (!id) {
    return new NextResponse("Picture ID is required", { status: 400 });
  }

  try {
    const picture = await findPictureById(id);

    if (!picture) {
      return new NextResponse("Picture not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(picture), { status: 200 });
  } catch (error) {
    console.error("Error fetching picture:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

