// Health check — frontend-only. No database required.
export function GET() {
  return Response.json({ ok: true });
}
