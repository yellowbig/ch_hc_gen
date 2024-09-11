import { checkUserCredits, consumeUserCredits } from "@/actions/credits";
import { generateImage } from "@/actions/generateImage";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60; // 这个函数可以运行最多60秒（1分钟）
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 59000); // 设置为59秒，留出一些余量

  try {
    const body = await req.json();
    const { prompt, model, aspectRatio, cost } = body;
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const creditsNeed = cost || 10;
    const creditsEnough = await checkUserCredits(userId, creditsNeed);
    if (!creditsEnough) {
      return new NextResponse("Credits not enough", { status: 400 });
    }

    const ret = await generateImage(userId, prompt,);
    await consumeUserCredits(userId, creditsNeed);
    const resp = JSON.stringify({ id: ret.id });
    return new NextResponse(resp, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    const errorResponse = JSON.stringify({
      error: true,
      msg: error instanceof Error ? error.message : "An error occurred while processing your request.",
    });
    return new NextResponse(errorResponse, {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    clearTimeout(timeoutId);
  }
}