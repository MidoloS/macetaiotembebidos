import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  return NextResponse.json({ error: "ID is required" }, { status: 400 });
}

export async function POST(request: Request) {
  const body = await request.json();

  console.log(body);

  return NextResponse.json({ message: JSON.stringify(body) });
}
