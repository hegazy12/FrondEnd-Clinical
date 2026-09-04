import {Component,ElementRef,ViewChild,signal,output,afterNextRender, OnDestroy} from '@angular/core';
import {Callapi} from '../../services/callapi/callapi';
import {VerfivationToken} from '../../services/verfivationToken/verfivation-token';
import {Router,ActivatedRoute} from '@angular/router';
import {UploadPhotoRequest } from '../../interfaces/upload-photo-request';
import Swal from 'sweetalert2';

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

  constructor( private Callapi     : Callapi ,
               private Verfication : VerfivationToken ,
               private router      : Router,
               private route       : ActivatedRoute)
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
    console.log('Captured photo data URL:', dataUrl); 
    this.capturedPhoto.set(dataUrl);
    this.photoCaptured.emit(dataUrl);
    let base64Data = dataUrl.split(',')[1];
    let createBy = this.Verfication.GetLoginID();
    let UploadPhotoRequest: UploadPhotoRequest = { photoBase64: base64Data, createBy: createBy };

    const examinationId = '92C9DCDE-52F3-4D79-9C18-B8F35ABE5BFB';
    if (examinationId) {
      this.Callapi.uploadPhotoExamination(examinationId, UploadPhotoRequest).subscribe({
        next: (res) => {
          console.log('Photo uploaded successfully:', res);
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Photo uploaded successfully!',
          });
        },
        error: (err) => {
          console.error('Error uploading photo:', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to upload photo.',
          });
        }
      });
    } else {
      console.error('Examination ID not found in route parameters.');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Examination ID not found.',
      });
    }
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

  // onSubmit(){
  //    this.isLoading = true; 
  //    let Create : createDoctors ={firstName :this.fristName , 
  //                                 lastName : this.lastName , 
  //                                 specialization : this.specialization ,
  //                                 Userid : this.Userid };
  //     let sub =this.Callapi.createDoctor(Create).subscribe({
  //         next:(res)=>{
  //             sub.unsubscribe();
  //             this.swal.showSuccess();
  //             this.isLoading = false;
  //         },
  //         error :(err)=>{
  //             sub.unsubscribe();
  //             this.isLoading = false;   
  //         }
  //     });
  // }
}
