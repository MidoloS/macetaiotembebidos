import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const req = await fetch(
    "https://macetaiot-9f532-default-rtdb.firebaseio.com/chat/.json"
  );

  const res = await req.json();

  return NextResponse.json(res);
}

export async function POST(request: Request) {
  const body = await request.json();

  const req = await fetch(
    "https://macetaiot-9f532-default-rtdb.firebaseio.com/chat/.json",
    {
      method: "POST",
      body: JSON.stringify({
        ...body,
        createdAt: new Date().toISOString(),
      }),
    }
  );

  const res = await req.json();

  console.log({ res });

  return NextResponse.json({ message: JSON.stringify(body) });
}
