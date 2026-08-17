import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AI Productivity Ecosystem - 199+ Free Tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #DC2626 0%, #EC4899 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 90,
            fontWeight: 900,
            color: "white",
            textAlign: "center",
            padding: "0 60px",
            letterSpacing: "-2px",
            display: "flex",
          }}
        >
          AI Productivity
        </div>
        <div
          style={{
            fontSize: 90,
            fontWeight: 900,
            color: "white",
            textAlign: "center",
            padding: "0 60px",
            letterSpacing: "-2px",
            display: "flex",
          }}
        >
          Ecosystem
        </div>
        <div
          style={{
            fontSize: 36,
            color: "rgba(255,255,255,0.95)",
            marginTop: 30,
            textAlign: "center",
            display: "flex",
          }}
        >
          199+ Free Tools + AI Prompts
        </div>
        <div
          style={{
            marginTop: 50,
            padding: "20px 50px",
            background: "white",
            borderRadius: 60,
            fontSize: 32,
            color: "#DC2626",
            fontWeight: 700,
            display: "flex",
          }}
        >
          🚀 100% Free Forever
        </div>
      </div>
    ),
    { ...size }
  );
}