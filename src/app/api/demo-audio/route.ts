import { NextRequest, NextResponse } from "next/server";

/*
  Generates a WAV demo audio file for a given station.
  Each station has a different tone frequency so they sound distinct.

  Query params:
    station  - 1..6  (default 1)
    lang     - en | es | de (unused for tone, but logged)

  The generated WAV is a short sine-wave tone with fade-in/out,
  lasting `duration` seconds at 22 050 Hz mono 16-bit PCM.
*/

const STATION_TONES: Record<number, { freq: number; duration: number }> = {
  1: { freq: 440, duration: 30 },   // A4
  2: { freq: 494, duration: 30 },   // B4
  3: { freq: 523, duration: 30 },   // C5
  4: { freq: 587, duration: 30 },   // D5
  5: { freq: 659, duration: 30 },   // E5
  6: { freq: 698, duration: 30 },   // F5
};

function generateWav(freq: number, durationSec: number): Buffer {
  const sampleRate = 22050;
  const numSamples = sampleRate * durationSec;
  const amplitude = 0.35;

  // WAV header = 44 bytes, data = numSamples * 2 bytes (16-bit mono)
  const dataSize = numSamples * 2;
  const fileSize = 44 + dataSize;
  const buf = Buffer.alloc(fileSize);

  // RIFF header
  buf.write("RIFF", 0);
  buf.writeUInt32LE(fileSize - 8, 4);
  buf.write("WAVE", 8);

  // fmt sub-chunk
  buf.write("fmt ", 12);
  buf.writeUInt32LE(16, 16);          // sub-chunk size
  buf.writeUInt16LE(1, 20);           // PCM
  buf.writeUInt16LE(1, 22);           // mono
  buf.writeUInt32LE(sampleRate, 24);
  buf.writeUInt32LE(sampleRate * 2, 28); // byte rate
  buf.writeUInt16LE(2, 32);           // block align
  buf.writeUInt16LE(16, 34);          // bits per sample

  // data sub-chunk
  buf.write("data", 36);
  buf.writeUInt32LE(dataSize, 40);

  const fadeLen = Math.min(sampleRate * 2, numSamples / 2); // 2-sec fade

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;

    // Main tone + subtle harmonics for richness
    let sample =
      Math.sin(2 * Math.PI * freq * t) * 0.7 +
      Math.sin(2 * Math.PI * freq * 2 * t) * 0.15 +
      Math.sin(2 * Math.PI * freq * 3 * t) * 0.08 +
      Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.07;

    // Add gentle tremolo
    sample *= 1 + 0.08 * Math.sin(2 * Math.PI * 4 * t);

    // Fade in/out envelope
    let envelope = 1;
    if (i < fadeLen) envelope = i / fadeLen;
    if (i > numSamples - fadeLen) envelope = (numSamples - i) / fadeLen;

    const value = Math.round(sample * amplitude * envelope * 32767);
    const clamped = Math.max(-32768, Math.min(32767, value));
    buf.writeInt16LE(clamped, 44 + i * 2);
  }

  return buf;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const station = Math.max(1, Math.min(6, Number(searchParams.get("station") || 1)));
  const tone = STATION_TONES[station] ?? STATION_TONES[1];

  const wav = generateWav(tone.freq, tone.duration);

  return new NextResponse(new Uint8Array(wav), {
    status: 200,
    headers: {
      "Content-Type": "audio/wav",
      "Content-Length": String(wav.length),
      "Cache-Control": "public, max-age=86400",
    },
  });
}
