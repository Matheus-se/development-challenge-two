import { useEffect, useRef } from "react";
import { IWaveProps } from "../../data/interfaces/IWaveProps.interface";

const Wave: React.FC<IWaveProps> = ({ theme, className, color1, color2 }) => {
  const canvasRef = useRef(null);
  let c: CanvasRenderingContext2D | null;
  let canvas: HTMLCanvasElement;
  let increment = 0;

  useEffect(() => {
    if (canvasRef.current) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      canvas = canvasRef.current;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      c = canvas.getContext("2d");

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - window.innerHeight / 10;

      animate();
    }
  }, []);

  function animate() {
    if (c) {
      requestAnimationFrame(animate);

      c.clearRect(0, 0, canvas?.width, canvas?.height);

      wave(
        c,
        canvas.height,
        0.001,
        60,
        color1 || theme.palette.secondary.main,
        increment - 1
      );
      wave(c, canvas.height, 0.002, 60, color2 || theme.palette.primary.main, increment);

      increment += 0.02;
    }
  }

  function wave(
    c: CanvasRenderingContext2D,
    y: number,
    amplitude: number,
    frequency: number,
    color: string,
    increment: number,
    scale = 1
  ) {
    c.beginPath();
    c.moveTo(0, canvas.height);
    // c.lineTo(0, y / 8);

    for (let i = 0; i < canvas.width; i++) {
      c.lineTo(
        i,
        (7 * y) / 8 + Math.sin(scale * i * amplitude + increment) * frequency
      );
    }

    c.lineTo(canvas.width, canvas.height);
    c.fillStyle = color;
    c.strokeStyle = color;
    c.fill();
    c.stroke();
  }

  return <canvas className={className} ref={canvasRef}></canvas>;
};

export default Wave;
