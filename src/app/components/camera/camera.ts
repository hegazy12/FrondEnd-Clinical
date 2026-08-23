import {Component,ElementRef,ViewChild,signal,output,afterNextRender, OnDestroy} from '@angular/core';


@Component({
  selector: 'app-camera',
  imports: [],
  templateUrl: './camera.html',
  styleUrl: './camera.css',
})
export class Camera implements OnDestroy {

  @ViewChild('video', { static: true }) videoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  photoCaptured = output<string>();

  errorMessage = signal<string>('');
  isStreaming = signal<boolean>(false);
  capturedPhoto = signal<string | null>(null);

  private stream: MediaStream | null = null;

  constructor() 
  {
    afterNextRender(() => {
      this.startCamera();
    });
  }

  async startCamera(): Promise<void> {
    this.errorMessage.set('');

    if (!navigator.mediaDevices?.getUserMedia) {
      this.errorMessage.set('Camera API not supported in this browser.');
      return;
    }

    try {
       this.stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }, 
        audio: false,
      });

      this.videoRef.nativeElement.srcObject = this.stream;
      this.isStreaming.set(true);
    } catch (err) {
   console.error('Camera access error:', err);
  const error = err as DOMException;
  this.errorMessage.set(`${error.name}: ${error.message}`);
    }
  }

  capturePhoto(): void {
    const video = this.videoRef.nativeElement;
    const canvas = this.canvasRef.nativeElement;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/png');
    this.capturedPhoto.set(dataUrl);
    this.photoCaptured.emit(dataUrl);
  }

  retake(): void {
    this.capturedPhoto.set(null);
  }

  stopCamera(): void {
    this.stream?.getTracks().forEach(track => track.stop());
    this.stream = null;
    this.isStreaming.set(false);
  }

  ngOnDestroy(): void {
    this.stopCamera();
  }
}
