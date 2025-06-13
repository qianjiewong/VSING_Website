import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { RegionService } from './services/region.service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    HttpClientModule

  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  currentRegion = this.regionService.getRegion();
  menuOpen = false;
  isLanguageSidebarOpen = false;
  selectedLang: 'en' | 'zh-HK' | 'zh-CN' = 'en';
  selectedLocation = '';
  showLocationPopup = false;
  regions = [
    { name: 'Malaysia', code: 'MY' },
    { name: 'Hong Kong', code: 'HK' },
    { name: 'Singapore', code: 'SG' },
    { name: 'Japan', code: 'JP' },
    { name: 'Thailand', code: 'TH' },
    { name: 'Taiwan', code: 'TW' }
  ];
  regionLabels: { [key: string]: string } = {
    MY: 'Malaysia',
    HK: 'Hong Kong',
    SG: 'Singapore',
    JP: 'Japan',
    TH: 'Thailand',
    TW: 'Taiwan'
  };
  showEventPanel = false;
  events: any[] = [];
  // events = [
  //   {
  //     id: 'event-1',
  //     title: 'event-1',
  //     image: '/assets/images/event1.png',
  //     description: 'Experience an electrifying karaoke battle night where vocal talent, fun games, and crowd cheers collide in one thrilling event.'
  //   },
  //   {
  //     id: 'event-2',
  //     title: 'event-2',
  //     image: '/assets/images/event2.png',
  //     description: 'Join our retro night party featuring old-school hits, disco vibes, and unforgettable moments with friends new and old alike.'
  //   },
  //   {
  //     id: 'event-3',
  //     title: 'event-3',
  //     image: '/assets/images/event3.png',
  //     description: 'Step into the spotlight for a talent showcase event filled with music, magic, and creative surprises to entertain all guests.'
  //   },
  //   {
  //     id: 'event-4',
  //     title: 'event-4',
  //     image: '/assets/images/event4.png',
  //     description: 'Celebrate cultural fusion with live DJs, traditional performances, and themed drinks in an unforgettable music lounge celebration.'
  //   },
  //   {
  //     id: 'event-5',
  //     title: 'event-5',
  //     image: '/assets/images/event5.png',
  //     description: 'Dance through decades with themed rooms, nostalgic music, and immersive decorations spanning the 80s, 90s, and early 2000s.'
  //   },
  //   {
  //     id: 'event-6',
  //     title: 'event-6',
  //     image: '/assets/images/event6.png',
  //     description: 'A night of luxury karaoke and gourmet experiences featuring premium booths, personalized service, and elite entertainment packages.'
  //   },
  //   {
  //     id: 'event-7',
  //     title: 'event-7',
  //     image: '/assets/images/event1.png',
  //     description: 'Sing for a cause in this charity concert night where every note and every guest helps fund local creative community programs.'
  //   },
  //   {
  //     id: 'event-8',
  //     title: 'event-8',
  //     image: '/assets/images/event2.png',
  //     description: 'Get ready for an epic cosplay karaoke party with prizes, themed cocktails, and performances straight out of your favorite anime.'
  //   },
  //   {
  //     id: 'event-9',
  //     title: 'event-9',
  //     image: '/assets/images/event3.png',
  //     description: 'Test your knowledge and vocals in our trivia and karaoke fusion event, perfect for music lovers and quiz fans alike.'
  //   }
  // ];

  get selectedLangLabel(): string {
    switch (this.selectedLang) {
      case 'zh-HK': return '繁體中文';
      case 'zh-CN': return '简体中文';
      default: return 'English';
    }
  }

  get eventRows() {
    const rows = [];
    for (let i = 0; i < this.events.length; i += 3) {
      rows.push(this.events.slice(i, i + 3));
    }
    return rows;
  }

  constructor(
    private regionService: RegionService, 
    private router: Router,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd ))
      .subscribe(() => {
        if (isPlatformBrowser(this.platformId)) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });

    const region = this.regionService.getRegion();
    this.selectedLang = region === 'HK' ? 'zh-HK' : region === 'SG' ? 'zh-CN' : 'en';
  }

  ngOnInit(): void {
    this.loadEventsFromJSON();
  }

  loadEventsFromJSON(): void {
    this.http.get<any[]>('assets/data/event.json').subscribe({
      next: (data) => {
        this.events = data;
      },
      error: (err) => {
        console.error('Failed to load events.json:', err);
        this.events = [];
      }
    })
  }

  changeRegion(region: 'MY' | 'HK' | 'SG' | 'JP' | 'SG' | 'TH' | 'TW') {
    this.regionService.setRegion(region);
    this.currentRegion = region;

    const currentUrl = this.router.url;
    const parts = currentUrl.split('/');
    const currentPath = parts.slice(2).join('/');

    this.router.navigate([`/${region.toLowerCase()}/${currentPath}`]);
  }
    
  getAboutPath(): string {
    const region = this.regionService.getRegion();
    return `/${region.toLowerCase()}/about`;
  }

  getHomePath(): string {
    const region = this.regionService.getRegion();
    return `/${region.toLowerCase()}/home`;
  }

  getEventPath(): string {
    const region = this.regionService.getRegion();
    return `/${region.toLowerCase()}/event`;
  }

  getOutletsPath(): string {
    const region = this.regionService.getRegion();
    return `/${region.toLowerCase()}/outlets`;
  }

  getDownloadPath(): string {
    const region = this.regionService.getRegion();
    return `/${region.toLowerCase()}/download`;
  }

  getContactUsPath(): string {
    const region = this.regionService.getRegion();
    return `/${region.toLowerCase()}/contact-us`;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    document.body.style.overflow = this.menuOpen ? 'hidden' : '';
  }

  closeMenu() {
    this.menuOpen = false;
    document.body.style.overflow = '';
  }

  toggleLanguageSidebar() {
    this.isLanguageSidebarOpen = !this.isLanguageSidebarOpen;
  }

  setLanguage(lang: 'en' | 'zh-HK' | 'zh-CN') {
    this.selectedLang = lang;
    localStorage.setItem('lang', lang);
    this.toggleLanguageSidebar();
    console.log('Language selected:', lang);
  }

  toggleLocationPopup(): void {
    this.showLocationPopup = !this.showLocationPopup;
  }

  selectLocation(regionName: string): void {
    const region = this.regions.find(r => r.name === regionName);
    if (region) {
      this.selectedLocation = region.name;
      this.showLocationPopup = false;
      this.changeRegion(region.code as 'MY' | 'HK' | 'SG' | 'JP' | 'SG' | 'TH' | 'TW');
    }
  }

  toggleEventPanel() {
    this.showEventPanel = !this.showEventPanel;

    if (this.showEventPanel) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }

  
}