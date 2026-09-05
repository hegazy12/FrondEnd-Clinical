import {Component, ElementRef, ViewChild, signal, output, afterNextRender, OnDestroy, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Callapi} from '../../services/callapi/callapi';
import {VerfivationToken} from '../../services/verfivationToken/verfivation-token';
import {UploadPhotoRequest} from '../../interfaces/upload-photo-request';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-camera',
  imports: [],
  templateUrl: './camera.html',
  styleUrl: './camera.css',
})
export class Camera implements OnDestroy, OnChanges {

  @ViewChild('video', { static: true }) videoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  @Input({ required: true }) createBy!: string;
  @Input() examinationIdInput: string | null  |undefined= null;   
  
  photoCaptured = output<string>();
  errorMessage  = signal<string>('');
  isStreaming   = signal<boolean>(false);
  capturedPhoto = signal<string | null>(null);
  public examinationId = signal<string | undefined | null>(null);  
  
  public takePhotoMood = signal<boolean>(true);
  
  private stream: MediaStream | null = null;

  constructor(private Callapi: Callapi, private Verfication: VerfivationToken) {
    afterNextRender(() => {
      this.startCamera();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['examinationIdInput']) {
      this.examinationId.set(this.examinationIdInput);
    }
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
    
    this.takePhotoMood.set(false);
    
    const examId = this.examinationId();

    if (!examId) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Examination ID not found. Please retake.',
      });
      return;
    }

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

    const base64Data = dataUrl.split(',')[1];
    const uploadRequest: UploadPhotoRequest = { photoBase64: base64Data, createBy: this.createBy };

    this.Callapi.uploadPhotoExamination(examId, uploadRequest).subscribe({
      next: (res) => {
        console.log('Photo uploaded successfully:', res);
        Swal.fire({ icon: 'success', title: 'Success', text: 'Photo uploaded successfully!' });
        this.takePhotoMood.set(true);
      },
      error: (err) => {
        console.error('Error uploading photo:', err);
        Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to upload photo.' });
         this.takePhotoMood.set(true);
      }
    });

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