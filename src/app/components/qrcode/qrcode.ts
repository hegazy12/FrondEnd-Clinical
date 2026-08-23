import {
  Component,
  ElementRef,
  ViewChild,
  input,
  effect,
  afterNextRender,
} from '@angular/core';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-qrcode',
  imports: [],
  standalone: true,
  templateUrl: './qrcode.html',
  styleUrl: './qrcode.css',
})
export class Qrcode {
  // Data to encode (url, text, id, json string, etc.)
  value = input.required<string>();

  // Optional customization
  size = input<number>(200);
  colorDark = input<string>('#000000');
  colorLight = input<string>('#ffffff');
  margin = input<number>(2);

  @ViewChild('qrCanvas', { static: true })
  private canvasRef!: ElementRef<HTMLCanvasElement>;

  private isBrowserReady = false;

  constructor() {
    // Canvas APIs don't exist during SSR, so only render once
    // we're guaranteed to be running in the browser.
    afterNextRender(() => {
      this.isBrowserReady = true;
      this.renderQr();
    });

    // Re-render automatically whenever any input signal changes.
    effect(() => {
      // Read the signals so the effect tracks them as dependencies.
      this.value();
      this.size();
      this.colorDark();
      this.colorLight();
      this.margin();

      if (this.isBrowserReady) {
        this.renderQr();
      }
    });
  }

  private renderQr(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) {
      return;
    }

    QRCode.toCanvas(canvas, this.value(), {
      width: this.size(),
      margin: this.margin(),
      color: {
        dark: this.colorDark(),
        light: this.colorLight(),
      },
    }).catch((err) => console.error('QR generation failed:', err));
  }
}
