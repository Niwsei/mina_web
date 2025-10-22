// app/api/og/route.ts
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";
export const alt = "YourCafe Open Graph";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// tiny decoder (ป้องกัน error จากค่า null/undefined)
function getParam(sp: URLSearchParams, key: string, fallback = ""): string {
  const val = sp.get(key);
  if (!val) return fallback;
  try {
    return decodeURIComponent(val);
  } catch {
    return val;
  }
}

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;

  const title = getParam(sp, "title", "YourCafe").slice(0, 100);
  const subtitle = getParam(sp, "subtitle", "Specialty Coffee • Bangkok").slice(
    0,
    140
  );

  // Optional theme params
  const bg = getParam(
    sp,
    "bg",
    "radial-gradient(1200px 600px at 10% 0%, rgba(185,28,28,.35), transparent 60%), radial-gradient(900px 600px at 100% 10%, rgba(234,88,12,.35), transparent 60%), #0b0b0c"
  );
  const brand = getParam(sp, "brand", "yourcafe.example.com");

  return new ImageResponse(
    //  👇 ลบวงเล็บเปิดตรงนี้
    <div
      style={{
        width: `${size.width}px`,
        height: `${size.height}px`,
        display: "flex",
        background: bg,
        color: "white",
        padding: "64px",
        fontFamily: "Inter, Noto Sans Thai, system-ui, Arial",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 18,
          alignSelf: "flex-end",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.05 }}>
          {title}
        </div>
        <div style={{ fontSize: 28, opacity: 0.9 }}>{subtitle}</div>
        <div
          style={{
            height: 4,
            width: 360,
            background: "linear-gradient(to right,#b91c1c,#ea580c)",
            borderRadius: 999,
            marginTop: 6,
          }}
        />
        <div style={{ marginTop: 10, fontSize: 22, opacity: 0.8 }}>
          {brand}
        </div>
      </div>
    </div>,
    // 👆 และลบวงเล็บปิดตรงนี้
    { ...size }
  );
}