import * as Comlink from 'comlink';
import type { EmotionCard } from '../../components/ar/types';
import { emotionCards } from '../../components/ar/EmotionCards';

// Create a type for the worker
type CardRecognitionWorker = {
  initialize(): Promise<void>;
  detectCard(imageData: ImageData): Promise<{
    corners: { x: number; y: number }[];
    confidence: number;
    pattern: string;
  } | null>;
};

export class CardRecognitionService {
  private worker: Comlink.Remote<CardRecognitionWorker>;
  private videoElement: HTMLVideoElement | null = null;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private isProcessing = false;

  constructor() {
    // Create worker and wrap with Comlink
    const worker = new Worker(
      new URL('./cardRecognition.worker.ts', import.meta.url),
      { type: 'module' }
    );
    this.worker = Comlink.wrap<CardRecognitionWorker>(worker);

    // Set up canvas for video processing
    this.canvas = document.createElement('canvas');
    const context = this.canvas.getContext('2d');
    if (!context) {
      throw new Error('Failed to get 2D context');
    }
    this.context = context;
  }

  async initialize(videoElement: HTMLVideoElement): Promise<void> {
    this.videoElement = videoElement;
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      this.videoElement.srcObject = stream;
      await this.videoElement.play();

      // Set canvas size to match video
      this.canvas.width = this.videoElement.videoWidth;
      this.canvas.height = this.videoElement.videoHeight;

      // Initialize OpenCV worker
      await this.worker.initialize();
    } catch (error) {
      console.error('Camera initialization error:', error);
      throw new Error('Failed to initialize camera');
    }
  }

  async detectCard(): Promise<{
    card: EmotionCard;
    confidence: number;
    corners: { x: number; y: number }[];
  } | null> {
    if (!this.videoElement || this.isProcessing) {
      return null;
    }

    this.isProcessing = true;

    try {
      // Draw current video frame to canvas
      this.context.drawImage(
        this.videoElement,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );

      // Get image data for processing
      const imageData = this.context.getImageData(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );

      // Process frame in worker
      const result = await this.worker.detectCard(imageData);

      if (!result) {
        return null;
      }

      // Match detected pattern to emotion card
      const card = emotionCards.find(c => c.id === result.pattern);
      if (!card) {
        return null;
      }

      return {
        card,
        confidence: result.confidence,
        corners: result.corners
      };
    } finally {
      this.isProcessing = false;
    }
  }

  stop(): void {
    if (this.videoElement?.srcObject) {
      const stream = this.videoElement.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  }
}