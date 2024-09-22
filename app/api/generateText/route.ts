import { checkUserCredits, consumeUserCredits } from "@/actions/credits";
import { generateText } from "@/actions/generateText";
// import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { prompt } = body;
  // const { userId } = auth();
  const userId = "mock-user-id"; // 模拟用户ID

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const creditsNeed = 10;
  const creditsEnough = await checkUserCredits(userId, creditsNeed);
  if (!creditsEnough) {
    return new NextResponse("Credits not enough", { status: 400 });
  }

  try {
    const output = await generateText(userId, prompt);
    await consumeUserCredits(userId, creditsNeed);
    const resp = JSON.stringify({ output });
    return new NextResponse(resp, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    const errorResponse = JSON.stringify({
      error: true,
      msg: "An error occurred while processing your request.",
    });
    return new NextResponse(errorResponse, {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}