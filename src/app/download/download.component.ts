import { Component, AfterViewInit, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-download',
  standalone: true,
  imports: [],
  templateUrl: './download.component.html',
  styleUrl: './download.component.css'
})
export class DownloadComponent implements AfterViewInit {
  region: 'MY' | 'HK' | 'JP' | 'TH' | 'TW' | 'SG' = 'MY';
  
  constructor(
    private title: Title, 
    private meta: Meta, 
    private route: ActivatedRoute, 
    private router: Router, 
    @Inject(PLATFORM_ID) private platformId: Object,
    private elRef: ElementRef
  ) {
      
      const url = this.router.url;
      if (url.includes('/hk')) {
      this.region = 'HK';
    } else if (url.includes('/sg')) {
      this.region = 'SG';
    } else if (url.includes('/jp')) {
    this.region = 'JP';
    } else if (url.includes('/th')) {
    this.region = 'TH';
    } else if (url.includes('/tw')) {
    this.region = 'TW';
    } else {
      this.region = 'MY';
    }

  
      this.setMetaForRegion(this.region);
    }
  
    setMetaForRegion(region: 'MY' | 'HK' | 'SG' | 'JP' | 'TH' | 'TW') {
       const metaData: Record<'MY' | 'HK' | 'SG' | 'JP' | 'TH' | 'TW', {
        title: string;
        description: string;
        geo: string;
        placename: string;
        language: string;
        keywords: string;
      }> = {
        MY: {
          title: 'VSING Malaysia - Download',
          description: 'Learn about VSING APP',
          geo: 'MY',
          placename: 'Malaysia',
          language: 'en',
          keywords: 'VSING, Concert Bar, Malaysia, Premium Entertainment, Malaysia Bar'
        },
        HK: {
          title: 'VSING 香港 - 下载 VSING',
          description: '下载 VSING APP 香港',
          geo: 'HK',
          placename: 'Hong Kong',
          language: 'zh',
          keywords: 'VSING, Concert Bar, Malaysia, Premium Entertainment, 唱歌， hongkong酒吧'
        },
        SG: {
          title: 'VSING Singapore - Download',
          description: 'Learn about VSING APP',
          geo: 'SG',
          placename: 'Singapore',
          language: 'en',
          keywords: 'VSING, Concert Bar, Singapore, Premium Entertainment, Singapore Bar'
        },
        JP: {
          title: 'VSING Japan - Download',
          description: 'Learn about VSING APP',
          geo: 'JP',
          placename: 'Japan',
          language: 'en',
          keywords: 'VSING, Concert Bar, Japan, Premium Entertainment, Japan Bar'
        },
        TH: {
          title: 'VSING Thailand - Download',
          description: 'Learn about VSING APP',
          geo: 'TH',
          placename: 'Thailand',
          language: 'en',
          keywords: 'VSING, Concert Bar, Thailand, Premium Entertainment, Thailand Bar'
        },
        TW: {
          title: 'VSING 台湾 - 下载 APP',
          description: '下载 VSING APP 台湾',
          geo: 'TW',
          placename: 'Taiwan',
          language: 'en',
          keywords: 'VSING, Concert Bar, Taiwan, Premium Entertainment, Taiwan Bar'
        }
      };
  
      const meta = metaData[region];
  
      this.title.setTitle(meta.title);
      this.meta.addTags([
        { name: 'description', content: meta.description },
        { name: 'keywords', content: meta.keywords },
        { name: 'author', content: 'Vsing Team' },
        { name: 'robots', content: 'index, follow' },
        { name: 'language', content: meta.language },
        { name: 'geo.region', content: meta.geo },
        { name: 'geo.placename', content: meta.placename },
  
        // Open Graph tags
        { property: 'og:title', content: meta.title },
        { property: 'og:description', content: meta.description },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: `https://vsing.my/${region.toLowerCase()}/download` },
        { property: 'og:image', content: 'https://vsing.my/assets/vsing-og-image.jpg' }, // Replace with actual image path
      ]);
    }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId) && typeof IntersectionObserver !== 'undefined') {
      const labels = this.elRef.nativeElement.querySelectorAll('.label');

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1
      });

      labels.forEach((label: HTMLElement) => observer.observe(label));
    }
  }


  
}
