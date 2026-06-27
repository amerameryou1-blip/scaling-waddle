// Frontend-only newsletter signup (mock). Validates the email and returns
// success. Nothing is persisted.
//
// When you add a database later, insert the subscriber here.

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let email: string;
  try {
    const body = await req.json();
    email = (body?.email ?? "").toString().trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
