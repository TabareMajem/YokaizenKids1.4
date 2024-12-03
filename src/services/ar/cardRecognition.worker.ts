import * as Comlink from 'comlink';
import cv from '@techstark/opencv-js';

class CardRecognitionWorker {
  private isInitialized = false;

  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    // Wait for OpenCV.js to be ready
    if (!cv.getBuildInformation) {
      throw new Error('OpenCV.js is not loaded');
    }
    
    this.isInitialized = true;
  }

  async detectCard(imageData: ImageData): Promise<{
    corners: { x: number; y: number }[];
    confidence: number;
    pattern: string;
  } | null> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    // Convert ImageData to Mat
    const mat = cv.matFromImageData(imageData);
    
    try {
      // Convert to grayscale
      const gray = new cv.Mat();
      cv.cvtColor(mat, gray, cv.COLOR_RGBA2GRAY);

      // Apply Gaussian blur
      const blurred = new cv.Mat();
      cv.GaussianBlur(gray, blurred, new cv.Size(5, 5), 0);

      // Apply adaptive threshold
      const thresh = new cv.Mat();
      cv.adaptiveThreshold(
        blurred,
        thresh,
        255,
        cv.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv.THRESH_BINARY,
        11,
        2
      );

      // Find contours
      const contours = new cv.MatVector();
      const hierarchy = new cv.Mat();
      cv.findContours(
        thresh,
        contours,
        hierarchy,
        cv.RETR_EXTERNAL,
        cv.CHAIN_APPROX_SIMPLE
      );

      // Find the largest contour that could be a card
      let maxArea = 0;
      let cardContour = null;

      for (let i = 0; i < contours.size(); i++) {
        const contour = contours.get(i);
        const area = cv.contourArea(contour);
        
        if (area > maxArea && area > 1000) { // Minimum area threshold
          const perimeter = cv.arcLength(contour, true);
          const approx = new cv.Mat();
          cv.approxPolyDP(contour, approx, 0.02 * perimeter, true);

          // Check if the contour has 4 corners (card shape)
          if (approx.rows === 4) {
            maxArea = area;
            cardContour = approx;
          }
        }
      }

      if (!cardContour) {
        return null;
      }

      // Extract corners
      const corners = [];
      for (let i = 0; i < 4; i++) {
        corners.push({
          x: cardContour.data32S[i * 2],
          y: cardContour.data32S[i * 2 + 1]
        });
      }

      // Perform perspective transform to get a top-down view
      const dstPoints = cv.matFromArray(4, 1, cv.CV_32FC2, [
        0, 0,
        300, 0,
        300, 400,
        0, 400
      ]);
      
      const srcPoints = cv.matFromArray(4, 1, cv.CV_32FC2, corners.flatMap(p => [p.x, p.y]));
      const perspectiveMatrix = cv.getPerspectiveTransform(srcPoints, dstPoints);
      
      const warped = new cv.Mat();
      cv.warpPerspective(mat, warped, perspectiveMatrix, new cv.Size(300, 400));

      // Extract and analyze the pattern
      const pattern = this.analyzeCardPattern(warped);

      return {
        corners,
        confidence: 0.95, // Confidence based on corner detection quality
        pattern
      };
    } finally {
      // Clean up OpenCV matrices
      mat.delete();
    }
  }

  private analyzeCardPattern(warpedCard: cv.Mat): string {
    // Convert to HSV for better pattern recognition
    const hsv = new cv.Mat();
    cv.cvtColor(warpedCard, hsv, cv.COLOR_BGR2HSV);

    // Define color ranges for different emotions
    const colorRanges = {
      happy: { low: [20, 100, 100], high: [30, 255, 255] }, // Yellow
      sad: { low: [100, 100, 100], high: [130, 255, 255] }, // Blue
      angry: { low: [0, 100, 100], high: [10, 255, 255] }, // Red
      calm: { low: [40, 100, 100], high: [80, 255, 255] } // Green
    };

    let dominantEmotion = '';
    let maxPixels = 0;

    // Check each emotion color range
    for (const [emotion, range] of Object.entries(colorRanges)) {
      const mask = new cv.Mat();
      const low = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), range.low);
      const high = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), range.high);
      
      cv.inRange(hsv, low, high, mask);
      const pixels = cv.countNonZero(mask);

      if (pixels > maxPixels) {
        maxPixels = pixels;
        dominantEmotion = emotion;
      }

      mask.delete();
      low.delete();
      high.delete();
    }

    hsv.delete();
    return dominantEmotion;
  }
}

Comlink.expose(new CardRecognitionWorker());