import { ImageResponse } from "next/og";

export const alt = "Amine Mabrouk — Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#0c0a0b",
          backgroundImage:
            "radial-gradient(circle at 25% 20%, #221a1a 0%, #0c0a0b 60%)",
          color: "#e8ecf4",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            letterSpacing: -1,
            display: "flex",
          }}
        >
          Amine Mabrouk
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 32,
            color: "#ff6b47",
            display: "flex",
          }}
        >
          Full Stack Developer
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 24,
            color: "#8b93a7",
            display: "flex",
          }}
        >
          Angular · Next.js · Node.js · Laravel
        </div>
      </div>
    ),
    { ...size }
  );
}
