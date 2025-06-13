import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ar-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ar-viewer.component.html',
  styleUrls: ['./ar-viewer.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArViewerComponent implements OnInit, AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    console.log('AR Viewer Component Initialized');
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.waitForAFrame().then (()=> {
        console.log('A-Frame is loaded and ready');
        this.setupVideo();
      });
    }
  }

  private waitForAFrame(): Promise<void> {
    return new Promise((resolve) => {
      if ((window as any).AFRAME) {
        resolve();
        return;
      }

      const checkAFrame = () => {
        if ((window as any).AFRAME) {
          console.log('A-Frame loaded');
          resolve();
        } else {
          console.log('A-Frame not loaded');
          setTimeout(checkAFrame, 100);
        }
      };

      checkAFrame();
    });
  }

  private setupVideo() {
    setTimeout(() => {
      const video = document.getElementById('video360') as HTMLVideoElement;
      if (video) {
        video.addEventListener('loadeddata', () => {
          console.log('video loaded');
          video.muted = true;
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch((e) => console.warn('Autoplay blocked:', e ));
          }
        });

        video.addEventListener('error', (e) => {
          console.error('Video error:');
        });
      } else {
        console.warn('Video element not found');
      }
    }, 1000);
  }
}
