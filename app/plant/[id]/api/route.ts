import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  return NextResponse.json({ error: "ID is required" }, { status: 400 });
}

export async function POST(request: Request) {
  const body = await request.json();

  const req = await fetch(
    "https://macetaiot-9f532-default-rtdb.firebaseio.com/chat/.json",
    {
      method: "POST",
      body: JSON.stringify(body),
    }
  );

  const res = await req.json();

  console.log({ res });

  return NextResponse.json({ message: JSON.stringify(body) });
}
