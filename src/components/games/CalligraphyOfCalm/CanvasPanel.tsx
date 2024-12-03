import React, { forwardRef, useEffect, useRef, useImperativeHandle } from 'react';
import { fabric } from 'fabric';
import type { Kanji } from './types';

type Props = {
  kanji: Kanji;
  onStrokeComplete: (path: number[][]) => void;
};

const CanvasPanel = forwardRef<HTMLCanvasElement, Props>(({ kanji, onStrokeComplete }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);

  useImperativeHandle(ref, () => ({
    getContext: () => canvasRef.current?.getContext('2d') || null
  }));

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize Fabric.js canvas
    fabricRef.current = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: true,
      width: 800,
      height: 600,
      backgroundColor: '#f8f8f8'
    });

    const canvas = fabricRef.current;

    // Configure brush
    canvas.freeDrawingBrush.width = 10;
    canvas.freeDrawingBrush.color = '#000';
    
    // Add template
    if (kanji.template) {
      fabric.Image.fromURL(kanji.template, (img) => {
        if (!canvas.width || !canvas.height) return;
        
        img.set({
          left: canvas.width / 2 - (img.width || 0) / 2,
          top: canvas.height / 2 - (img.height || 0) / 2,
          selectable: false,
          opacity: 0.3
        });
        canvas.add(img);
        canvas.renderAll();
      });
    }

    // Handle path creation
    canvas.on('path:created', (e) => {
      const path = e.path;
      if (!path?.path) return;

      const points = path.path.map((cmd: any[]) => [cmd[1], cmd[2]]);
      onStrokeComplete(points);
    });

    // Cleanup function
    return () => {
      if (fabricRef.current) {
        // Remove all event listeners
        fabricRef.current.off();
        // Clear all objects
        fabricRef.current.clear();
        // Dispose of the canvas
        fabricRef.current.dispose();
        fabricRef.current = null;
      }
    };
  }, [kanji, onStrokeComplete]);

  return (
    <div className="absolute inset-0">
      <canvas ref={canvasRef} />
    </div>
  );
});

CanvasPanel.displayName = 'CanvasPanel';

export default CanvasPanel;