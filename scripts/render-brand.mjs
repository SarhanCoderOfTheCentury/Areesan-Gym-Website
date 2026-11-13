import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdir } from "node:fs/promises";
import sharp from "sharp";
import BrandFrameModule from "../components/remotion/BrandFrame.tsx";
const BrandFrame = BrandFrameModule.default ?? BrandFrameModule;
// Rasterize the same SVG timeline used in BrandIntroComposition. This makes
// production assets reproducible without running a browser or a render server.
await mkdir("public/media", { recursive: true });
const raster = (frame) =>
  sharp(
    Buffer.from(
      renderToStaticMarkup(React.createElement(BrandFrame, { frame })),
    ),
  );
await raster(205).jpeg({ quality: 85 }).toFile("public/media/brand-poster.jpg");
const encoder = spawn(
  "ffmpeg",
  [
    "-y",
    "-loglevel",
    "error",
    "-f",
    "image2pipe",
    "-vcodec",
    "png",
    "-framerate",
    "30",
    "-i",
    "pipe:0",
    "-an",
    "-c:v",
    "libx264",
    "-preset",
    "fast",
    "-crf",
    "23",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    "public/media/areesan-brand.mp4",
  ],
  { stdio: ["pipe", "inherit", "inherit"] },
);
const ended = once(encoder, "close");
for (let frame = 0; frame < 240; frame++) {
  const png = await raster(frame).png().toBuffer();
  if (!encoder.stdin.write(png)) await once(encoder.stdin, "drain");
  if (frame % 60 === 0) console.log(`Rendered brand frame ${frame}/240`);
}
encoder.stdin.end();
const [code] = await ended;
if (code !== 0) throw new Error(`FFmpeg failed: ${code}`);
const webm = spawn(
  "ffmpeg",
  [
    "-y",
    "-loglevel",
    "error",
    "-i",
    "public/media/areesan-brand.mp4",
    "-an",
    "-c:v",
    "libvpx-vp9",
    "-crf",
    "35",
    "-b:v",
    "0",
    "-deadline",
    "good",
    "-cpu-used",
    "4",
    "public/media/areesan-brand.webm",
  ],
  { stdio: "inherit" },
);
const [webmCode] = await once(webm, "close");
if (webmCode !== 0) throw new Error(`WebM encoding failed: ${webmCode}`);
console.log("Brand sequence exported to MP4, WebM, and JPEG.");
