// import { useEffect, useRef, useState } from "react";

// type AudioBarsProps = {
//   stream: MediaStream | null;
// };

// const BAR_COUNT = 42;

// function AudioBars({ stream }: AudioBarsProps) {
//   const [bars, setBars] = useState<number[]>(Array(BAR_COUNT).fill(10));
//   const volumeRef = useRef(10);

//   useEffect(() => {
//     if (!stream) return;

//     const audioContext = new AudioContext();
//     const analyser = audioContext.createAnalyser();
//     const source = audioContext.createMediaStreamSource(stream);

//     analyser.fftSize = 512;
//     source.connect(analyser);

//     const dataArray = new Uint8Array(analyser.fftSize);
//     let animationId: number;
//     let frame = 0;

//     const draw = () => {
//       animationId = requestAnimationFrame(draw);
//       frame++;

//       // slow it down: update every 4 frames
//       if (frame % 4 !== 0) return;

//       analyser.getByteTimeDomainData(dataArray);

//       let sum = 0;

//       for (let i = 0; i < dataArray.length; i++) {
//         const value = dataArray[i] - 128;
//         sum += Math.abs(value);
//       }

//       const average = sum / dataArray.length;

//       // make quiet voice more visible
//       const targetVolume = Math.min(180, Math.max(40, average * 12));

//       // smooth movement
//       volumeRef.current = volumeRef.current * 0.8 + targetVolume * 0.2;

//       const nextBars = Array.from({ length: BAR_COUNT }, (_, i) => {
//         const center = BAR_COUNT / 2;
//         const distanceFromCenter = Math.abs(i - center) / center;
//         const shapeFactor = 1 - distanceFromCenter * 0.75;

//         const randomMovement = Math.sin(frame * 0.08 + i) * 8;

//         return Math.max(40, volumeRef.current * shapeFactor + randomMovement);
//       });

//       setBars(nextBars);
//     };

//     draw();

//     return () => {
//       cancelAnimationFrame(animationId);
//       try {
//         source.disconnect();
//       } catch {}
//       audioContext.close();
//     };
//   }, [stream]);

//   return (
//     <>
//       <div className="audio-bars">
//         {bars.map((height, index) => (
//           <span
//             key={index}
//             className="audio-bar"
//             style={{ height: `${height}px` }}
//           />
//         ))}
//       </div>
//     </>
//   );
// }

// export default AudioBars;
