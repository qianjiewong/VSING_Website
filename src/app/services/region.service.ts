import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private region: 'MY' | 'HK' | 'SG' | 'JP' | 'TH' | 'TW' = 'MY';
  
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);

    // Only use localStorage in the browser
    if (this.isBrowser) {
      const stored = localStorage.getItem('region') as 'MY' | 'HK' | 'SG' | 'JP' | 'TH' | 'TW';
      if (stored) {
        this.region = stored;
      } else {
        const browserLang = navigator.language;
        if (browserLang.includes('zh')) this.region = 'HK';
        else if (browserLang.includes('en-SG')) this.region = 'SG';
        else this.region = 'MY';
        localStorage.setItem('region', this.region);
      }
    }
  }

  setRegion(region: 'MY' | 'HK' | 'SG' | 'JP' | 'TH' | 'TW') {
    this.region = region;
    if (this.isBrowser) localStorage.setItem('region', region);
  }

  getRegion(): 'MY' | 'HK' | 'SG' | 'JP' | 'TH' | 'TW' {
    return this.region;
  }
}
