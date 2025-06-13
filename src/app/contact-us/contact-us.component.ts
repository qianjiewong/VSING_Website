import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  region: 'MY' | 'HK' | 'JP' | 'TH' | 'TW' | 'SG' = 'MY';
  
    constructor(
      private title: Title, 
      private meta: Meta, 
      private route: ActivatedRoute, 
      private router: Router,
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

    ngOnInit(): void {
        this.route.fragment.subscribe(fragment => {
          if (fragment) {
            const el = document.getElementById(fragment);
            if (el) {
              setTimeout(() => {
                el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }
          }
        })
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
          title: 'VSING Malaysia - Contact Us',
          description: 'Contact VSING Malaysia',
          geo: 'MY',
          placename: 'Malaysia',
          language: 'en',
          keywords: 'VSING, Concert Bar, Malaysia, Premium Entertainment, Malaysia Bar'
        },
        HK: {
          title: 'VSING 香港 - 联系我們',
          description: '联系 VSING 香港',
          geo: 'HK',
          placename: 'Hong Kong',
          language: 'zh',
          keywords: 'VSING, Concert Bar, Hong Kong, Premium Entertainment, 唱歌， hongkong酒吧'
        },
        SG: {
          title: 'VSING Singapore - Contact Us',
          description: 'Contact VSING Singapore',
          geo: 'SG',
          placename: 'Singapore',
          language: 'en',
          keywords: 'VSING, Concert Bar, Singapore, Premium Entertainment, Singapore Bar'
        },
        JP: {
          title: 'VSING Japan - Contact Us',
          description: 'Contact VSING Japan',
          geo: 'JP',
          placename: 'Japan',
          language: 'en',
          keywords: 'VSING, Concert Bar, Japan, Premium Entertainment, Japan Bar'
        },
        TH: {
          title: 'VSING Thailand - Contact Us',
          description: 'Contact VSING Thailand',
          geo: 'TH',
          placename: 'Thailand',
          language: 'en',
          keywords: 'VSING, Concert Bar, Thailand, Premium Entertainment, Thailand Bar'
        },
        TW: {
          title: 'VSING 台湾 - 联系我們',
          description: '联系 VSING 香港',
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
        { property: 'og:url', content: `https://vsing.my/${region.toLowerCase()}/contact-us` },
        { property: 'og:image', content: 'https://vsing.my/assets/vsing-og-image.jpg' }, // Replace with actual image path
      ]);
    }

    submitApplicationForm() {
      console.log("Form submitted!");
    }
}
