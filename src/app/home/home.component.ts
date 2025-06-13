import { Component, ElementRef, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  region: 'MY' | 'HK' | 'JP' | 'TH' | 'TW' | 'SG' = 'MY';
  countryName: string = 'Malaysia';
  isARPanelVisible = false;
  private scrollWrapper: HTMLElement | null = null;
  private cardTrack: HTMLElement | null = null;
  private isDown = false;
  private startX = 0;
  private scrollLeft = 0;
  private originalCards: HTMLElement[] = [];
  private cardWidth = 0;
  private totalWidth = 0;
  isBrowser: boolean;
  outlets: any[] = [];
  events: any[] = [];
  regions = [
    { name: 'Malaysia', code: 'my' },
    { name: 'Hong Kong', code: 'hk' },
    { name: 'Taiwan', code: 'tw' },
    { name: 'Singapore', code: 'sg' },
    { name: 'Japan', code: 'jp' },
    { name: 'Thailand', code: 'th' },
    
  ];
  groupedOutlets: {
    code: string;
    name: string;
    outlets: any[];
  }[] = [];

  @ViewChild('arVideo') arVideoRef!: ElementRef<HTMLVideoElement>;

  // events = [
  //   {
  //     id: 'event-1',
  //     title: 'Event One',
  //     image: '/assets/images/event1.png',
  //   },
  //   {
  //     id: 'event-2',
  //     title: 'Event Two',
  //     image: '/assets/images/event2.png',
  //   },
  //   {
  //     id: 'event-3',
  //     title: 'Event Three',
  //     image: '/assets/images/event3.png',
  //   },
  //   {
  //     id: 'event-4',
  //     title: 'Event Four',
  //     image: '/assets/images/event4.png',
  //   },
  //   {
  //     id: 'event-5',
  //     title: 'Event Five',
  //     image: '/assets/images/event5.png',
  //   },
  //   {
  //     id: 'event-6',
  //     title: 'Event Six',
  //     image: '/assets/images/event6.png',
  //   },
  // ];

  // regions = [
  //   {
  //     name: 'Malaysia',
  //     code: 'my',
  //     outlets: [
  //       { name: 'VSING Icon City', id: 'vsing-icon-city' },
  //       { name: 'VSING Ipoh Soho', id: 'vsing-ipoh-soho' },
  //       { name: 'VSING Kota Damansara', id: 'vsing-kota-damansara' },
  //       { name: 'VSINGX Mount Austin JB', id: 'vsing-mount-austin-jb' },
  //       { name: 'VSING Cheras Traders Square', id: 'vsign-cheras-traders' },
  //       { name: 'VOLTZ by VSING', id: 'vsing-voltz' },
  //       { name: 'VSING Batu Pahat', id: 'vsing-batu-pahat' },
  //       { name: '觅 mi 酒馆 @Sri Petaling', id: 'mi-sri-petaling' },
  //     ],
  //   },
  //   {
  //     name: 'Hong Kong',
  //     code: 'hk',
  //     outlets: [
  //       { name: '花椒子 Peppercorn', id: 'peppercorn' },
  //       { name: 'PONGLIVE', id: 'ponglive' },
  //       { name: 'VSING Prince Edward', id: 'prince-edward' },
  //       { name: 'VSING KNUTSFORD V10', id: 'knutsford-v10' },
  //       { name: 'Beats By VSING', id: 'beats-by-vsing' },
  //     ],
  //   },
  //   {
  //     name: 'Singapore',
  //     code: 'sg',
  //     outlets: [{ name: 'KARA KARA', id: 'kara-kara' }],
  //   },
  //   {
  //     name: 'Taiwan',
  //     code: 'tw',
  //     outlets: [{ name: 'KARA KARA', id: 'kara-kara' }],
  //   },
  //   {
  //     name: 'Japan',
  //     code: 'jp',
  //     outlets: [{ name: 'KARA KARA', id: 'kara-kara' }],
  //   },
  //   {
  //     name: 'Thailand',
  //     code: 'th',
  //     outlets: [{ name: 'VSING Thailand', id: 'vsing-thailand' }],
  //   },
  // ];

  // selectedStores = [
  //   {
  //     name: 'VSING Icon City',
  //     region: 'my',
  //     hours: 'MON - SUN',
  //     time: '5pm - 3am',
  //     phone: '60182312120',
  //     address: `Icon City, 49-2,
  //             Jln Icon City,
  //             14000 Bukit Mertajam, Pulau Pinang`,
  //     mapUrl:
  //       'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11303.135178999366!2d100.42555790714003!3d5.341065657641191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304ac7fefa5b4df5%3A0xbb1880ac36e9508f!2sVSING%20Icon%20City!5e0!3m2!1sen!2smy!4v1747996915916!5m2!1sen!2smy',
  //   },
  //   {
  //     name: 'VSING Ipoh Soho',
  //     region: 'my',
  //     hours: 'MON - SUN',
  //     time: '5pm - 3am',
  //     phone: '60182312555',
  //     address: `B-2-15, Soho Ipoh,
  //             Jalan Sultan Iskandar, Soho Ipoh,
  //             30000 Ipoh, Perak`,
  //     mapUrl:
  //       'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3977.0068915090997!2d101.08688257530086!3d4.592785195381843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31caedaf05d70265%3A0xf9318c6e4dfe1241!2sVSING%20Ipoh%20Soho!5e0!3m2!1sen!2smy!4v1747997561726!5m2!1sen!2smy',
  //   },
  //   {
  //     name: 'VSING Kota Damansara',
  //     region: 'my',
  //     hours: 'MON - SUN',
  //     time: '5pm - 3am',
  //     phone: '60183675877',
  //     address: `3rd Floor. 2 Jalan PJU 5/11 Dataran Sunway,
  //             Kota Damansara,
  //             47810, Selangor`,
  //     mapUrl:
  //       'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.778663165749!2d101.58998487529391!3d3.152985796822414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4f64ced627db%3A0x107c9cb2ff364aaf!2sVSING%20Kota%20Damansara!5e0!3m2!1sen!2smy!4v1748229311945!5m2!1sen!2smy',
  //   },
  //   {
  //     name: 'VSINGX Mount Austin JB',
  //     region: 'my',
  //     hours: 'MON - SUN',
  //     time: '5pm - 3am',
  //     phone: '60182119666',
  //     address: `1, Jalan Austin Heights 8/5,
  //             Taman Austin Heights,
  //             81100 Johor Bahru, Johor Darul Ta'zim`,
  //     mapUrl:
  //       'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.3317746792577!2d103.77476377528926!3d1.5640969984212962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da6fda93457b09%3A0x7099e7ca12cecef4!2sSing%20V%20Austin!5e0!3m2!1sen!2smy!4v1748416443013!5m2!1sen!2smy',
  //   },
  //   {
  //     name: 'VSING Cheras Traders Square',
  //     region: 'my',
  //     hours: 'MON - SUN',
  //     time: '5pm - 3am',
  //     phone: '60183680807',
  //     address: `No 162-1, Jalan Dataran Cheras 9 Dataran Perniagaan Cheras,
  //             Balakong, Balakong,
  //             43200 Cheras, Selangor`,
  //     mapUrl:
  //       'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.227436546167!2d101.76042967529345!3d3.0335560969423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc35d54d04ad69%3A0x9e14963a8f319d87!2sVSING%20Cheras%20Traders%20Square!5e0!3m2!1sen!2smy!4v1748416906763!5m2!1sen!2smy',
  //   },
  //   {
  //     name: 'VOLTZ by VSING',
  //     region: 'my',
  //     hours: 'MON - SUN',
  //     time: '5pm - 3am',
  //     phone: '60127092013',
  //     address: `1-1, Jalan Remia 3,
  //             Bandar Botanik,
  //             41200 Klang, Selangor`,
  //     mapUrl:
  //       'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3984.353665542051!2d101.4441161!3d2.9991073999999998!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cdad072eba0047%3A0x16b4d77021be8b1d!2sVOLTZ!5e0!3m2!1sen!2smy!4v1748417444372!5m2!1sen!2smy',
  //   },
  //   {
  //     name: 'Beats By VSING',
  //     region: 'hk',
  //     hours: 'MON - SUN',
  //     time: '5pm - 3am',
  //     phone: '85260942847',
  //     address: `G/F, 16 Knutsford Terrace,
  //             Tsim Sha Tsui,
  //             Hong Kong`,
  //     mapUrl:
  //       'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.3848593318185!2d114.17155107559164!3d22.301280079685895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x340401b23e7fe111%3A0xad6a0d343f830cb1!2sVSING%20Beats!5e0!3m2!1sen!2smy!4v1747997861176!5m2!1sen!2smy',
  //   },
  //   {
  //     name: 'VSING KNUTSFORD V10',
  //     region: 'hk',
  //     hours: 'MON - SUN',
  //     time: '5pm - 3am',
  //     phone: '885262347679',
  //     address: `VSING Knutsford 10F, 
  //             Knutsford Terrace, 
  //             Tsim Sha Tsui, Hong Kong`,
  //     mapUrl:
  //       'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.3883474280915!2d114.17054287559156!3d22.30114807968597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3404016f41fc0e9b%3A0xbb83a5c31cc1f082!2sVSING%20Knutsford%2010F!5e0!3m2!1sen!2smy!4v1747997912148!5m2!1sen!2smy',
  //   },
  //   {
  //     name: 'KARA KARA',
  //     region: 'tw',
  //     hours: 'MON - SUN',
  //     time: '6pm - 3am',
  //     phone: '886905553822',
  //     address: `110, Taiwan, Taipei City,
  //             Xinyi District, 
  //             Songshou Rd, 12號10 樓`,
  //     mapUrl:
  //       'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.9472694687283!2d121.56594499999999!3d25.0358635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abf7024df337%3A0xc81b71731f9604fd!2sKARA%20KARA!5e0!3m2!1sen!2smy!4v1748415598593!5m2!1sen!2smy',
  //   },
  // ];

  

  constructor(
    private title: Title,
    private meta: Meta,
    public router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    public sanitizer: DomSanitizer,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    // if (this.isBrowser) {
    //   this.router.events
    //     .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
    //     .subscribe(() => {
    //       window.scrollTo({ top: 0, behavior: 'smooth'});
    //     });
    // }

    const url = this.router.url;
    if (url.includes('/hk')) {
      this.region = 'HK';
      this.countryName = 'Hong Kong';
    } else if (url.includes('/sg')) {
      this.region = 'SG';
      this.countryName = 'Singapore';
    } else if (url.includes('/jp')) {
      this.region = 'JP';
      this.countryName = 'Japan';
    } else if (url.includes('/th')) {
      this.region = 'TH';
      this.countryName = 'Thailand';
    } else if (url.includes('/tw')) {
      this.region = 'TW';
      this.countryName = 'Taiwan';
    } else {
      this.region = 'MY';
    }
    this.setMetaForRegion(this.region);
    // this.outlets = this.selectedStores.filter(
    //   (outlet) => outlet.region.toLowerCase() === this.region.toLowerCase()
    // );
  }

  // ngOnInit(): void {  
  //   this.http.get<any[]>('../assets/data/event.json').subscribe({
  //     next: (data) => {
  //       console.log(data)
  //       this.events = data;
  //     }
  //   });
  // }

  ngOnInit(): void {
    forkJoin ({
      events: this.http.get<any[]>('../assets/data/event.json'),
      outlets: this.http.get<any[]>('../assets/data/outlets.json')
    }).subscribe ({
      next: ({ events, outlets }) => {
        console.log('Events:', events);
        console.log('Outlets:', outlets);
        this.events = events;
        this.outlets = outlets;
        this.groupedOutlets = this.regions.map(region => ({
          ...region,
          outlets:outlets.filter(outlet => outlet.region === region.code)
        }));
      },
      error: (err) => {
        console.error('Failed to load JSON data:', err);
      }
    });
  }

    goToOutlet(region: string, id: string) {
    this.router.navigate([`/${region.toLowerCase()}/outlets`], { fragment: id }).then(() => {
      setTimeout(()=> {
        const el=document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  );
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      setTimeout(() => {
        this.setupInfiniteScroll();
        this.setupDragScroll();
      }, 0);
    }
  }

  getRegionPath() {
    const region = this.router.url.split('/')[1];
    return `/${region}/outlets`;
  }

  navToAR() {
    const region = this.router.url.split('/')[1];
    return `/${region}/ar-viewer`;
  }

  showARPanel() {
    this.isARPanelVisible = true;
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      const video = this.arVideoRef?.nativeElement;
      if (video) {
        video.play().catch(err => console.warn('Autoplay blocked', err));
      }
    }, 300);
  }

  hideARPanel() {
    const video = this.arVideoRef?.nativeElement;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    document.body.style.overflow = '';
    this.isARPanelVisible = false;
  }

  toggleStoreInfo(outlet: any): void {
    outlet.expanded = !outlet.expanded;
  }

  setupInfiniteScroll(): void {
    if (!this.isBrowser) return;

    this.scrollWrapper = document.getElementById('cardScrollWrapper');
    this.cardTrack = document.getElementById('cardTrack');

    if (!this.scrollWrapper || !this.cardTrack) return;

    // Get all original cards
    this.originalCards = Array.from(
      this.cardTrack.querySelectorAll('.card-category')
    );

    if (this.originalCards.length === 0) return;

    // Calculate card width (including margins)
    const firstCard = this.originalCards[0];
    this.cardWidth = firstCard.offsetWidth + 10; // Adding gap

    // Clone cards to create infinite effect
    this.cloneCards();

    // Set up scroll event to check boundaries
    this.scrollWrapper.addEventListener('scroll', () => this.checkScroll());
  }

  cloneCards(): void {
    if (!this.cardTrack || this.originalCards.length === 0) return;

    // Clone all cards and append to the track
    this.originalCards.forEach((card) => {
      const clone = card.cloneNode(true) as HTMLElement;
      this.cardTrack!.appendChild(clone);
    });

    // Clone again to ensure enough cards for smooth infinite scroll
    this.originalCards.forEach((card) => {
      const clone = card.cloneNode(true) as HTMLElement;
      this.cardTrack!.appendChild(clone);
    });

    // Calculate total width
    this.totalWidth = this.originalCards.length * this.cardWidth;
  }

  checkScroll(): void {
    if (!this.scrollWrapper || !this.cardTrack) return;

    const scrollLeft = this.scrollWrapper.scrollLeft;
    const scrollWidth = this.scrollWrapper.scrollWidth;
    const clientWidth = this.scrollWrapper.clientWidth;

    // If scrolled near the end, jump back to the first set of cloned cards
    if (scrollLeft + clientWidth >= scrollWidth - this.cardWidth) {
      // Smoothly reset to the first clone set (after original cards)
      this.scrollWrapper.scrollLeft = this.totalWidth;
    }

    // If scrolled to the beginning, jump to the last set of cloned cards
    if (scrollLeft <= 0) {
      // Smoothly reset to the second clone set
      this.scrollWrapper.scrollLeft = this.totalWidth;
    }
  }

  setupDragScroll(): void {
    if (!this.scrollWrapper) return;

    // Mouse events for desktop
    this.scrollWrapper.addEventListener('mousedown', (e) =>
      this.startDragging(e)
    );
    this.scrollWrapper.addEventListener('mouseleave', () =>
      this.stopDragging()
    );
    this.scrollWrapper.addEventListener('mouseup', () => this.stopDragging());
    this.scrollWrapper.addEventListener('mousemove', (e) => this.drag(e));

    // Touch events for mobile
    this.scrollWrapper.addEventListener('touchstart', (e) =>
      this.startTouchDragging(e)
    );
    this.scrollWrapper.addEventListener('touchend', () => this.stopDragging());
    this.scrollWrapper.addEventListener('touchmove', (e) => this.touchDrag(e));

    // Smooth scroll behavior for wheel events
    this.scrollWrapper.addEventListener(
      'wheel',
      (e: WheelEvent) => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
          // Let natural horizontal scroll happen (trackpad swipe)
          return;
        }

        // Convert vertical scroll to horizontal
        e.preventDefault();
        this.scrollWrapper!.scrollLeft += e.deltaY;
        this.checkScroll();
      },
      { passive: false }
    );
  }

  startDragging(e: MouseEvent): void {
    this.isDown = true;
    this.scrollWrapper!.classList.add('active');
    this.startX = e.pageX - this.scrollWrapper!.offsetLeft;
    this.scrollLeft = this.scrollWrapper!.scrollLeft;
  }

  startTouchDragging(e: TouchEvent): void {
    this.isDown = true;
    this.scrollWrapper!.classList.add('active');
    this.startX = e.touches[0].pageX - this.scrollWrapper!.offsetLeft;
    this.scrollLeft = this.scrollWrapper!.scrollLeft;
  }

  stopDragging(): void {
    this.isDown = false;
    this.scrollWrapper!.classList.remove('active');
  }

  drag(e: MouseEvent): void {
    if (!this.isDown) return;
    e.preventDefault();
    const x = e.pageX - this.scrollWrapper!.offsetLeft;
    const walk = (x - this.startX) * 2; // Scroll speed multiplier
    this.scrollWrapper!.scrollLeft = this.scrollLeft - walk;
    this.checkScroll();
  }

  touchDrag(e: TouchEvent): void {
    if (!this.isDown) return;
    const x = e.touches[0].pageX - this.scrollWrapper!.offsetLeft;
    const walk = (x - this.startX) * 2; // Scroll speed multiplier
    this.scrollWrapper!.scrollLeft = this.scrollLeft - walk;
    this.checkScroll();
  }

  setMetaForRegion(region: 'MY' | 'HK' | 'SG' | 'JP' | 'TH' | 'TW') {
    const metaData: Record<
      'MY' | 'HK' | 'SG' | 'JP' | 'TH' | 'TW',
      {
        title: string;
        description: string;
        keywords: string;
        geo: string;
        placename: string;
        language: string;
        ogDescription: string;
      }
    > = {
      MY: {
        title: 'VSING - Premium Concert Bar in Malaysia',
        description:
          'VSING offers a premium concert bar experience across Malaysia. Discover top-tier sound systems and vibrant entertainment in KL and beyond.',
        keywords:
          'VSING, concert bar Malaysia, KL concert bar, Premium concert bar, Malaysia karaoke bar',
        geo: 'MY',
        placename: 'Malaysia',
        language: 'en',
        ogDescription:
          'Experience VSING — Malaysia’s best concert bar with top audio, live shows and great vibes.',
      },
      HK: {
        title: 'VSING 香港 - 頂級演唱會酒吧體驗',
        description:
          'VSING 是香港的頂級演唱會酒吧，提供最先進的音響和娛樂設施。',
        keywords: 'VSING, 香港酒吧, 演唱會酒吧, 高級娛樂, 唱K, 香港KTV',
        geo: 'HK',
        placename: 'Hong Kong',
        language: 'zh',
        ogDescription: '走進 VSING 香港，享受非凡的演唱會式娛樂體驗。',
      },
      SG: {
        title: 'VSING Singapore - Elite Concert Bar Experience',
        description:
          'Enjoy VSING in Singapore — the go-to concert bar for immersive audio and nightlife.',
        keywords:
          'VSING, Singapore concert bar, SG nightlife, karaoke bar Singapore',
        geo: 'SG',
        placename: 'Singapore',
        language: 'en',
        ogDescription:
          'Join VSING Singapore — where concerts meet nightlife in a premium atmosphere.',
      },
      JP: {
        title: 'VSING Japan - Elite Concert Bar Experience',
        description:
          'Enjoy VSING in Japan — the go-to concert bar for immersive audio and nightlife.',
        keywords: 'VSING, Japan concert bar, SG nightlife, karaoke bar Japan',
        geo: 'JP',
        placename: 'Japan',
        language: 'en',
        ogDescription:
          'Join VSING Japan — where concerts meet nightlife in a premium atmosphere.',
      },
      TH: {
        title: 'VSING Thailand - Elite Concert Bar Experience',
        description:
          'Enjoy VSING in Thailand — the go-to concert bar for immersive audio and nightlife.',
        keywords:
          'VSING, Thailand concert bar, SG nightlife, karaoke bar Thailand',
        geo: 'TH',
        placename: 'Thailand',
        language: 'en',
        ogDescription:
          'Join VSING Thailand — where concerts meet nightlife in a premium atmosphere.',
      },
      TW: {
        title: 'VSING 台湾- Elite Concert Bar Experience',
        description:
          'VSING 是台湾的頂級演唱會酒吧，提供最先進的音響和娛樂設施。',
        keywords: 'VSING, 台湾酒吧, 演唱會酒吧, 高級娛樂, 唱K',
        geo: 'TW',
        placename: 'Taiwan',
        language: 'en',
        ogDescription:
          'Join VSING Taiwan — where concerts meet nightlife in a premium atmosphere.',
      },
    };

    const meta = metaData[region];

    this.title.setTitle(meta.title);
    this.meta.addTags([
      { name: 'description', content: meta.description },
      { name: 'keywords', content: meta.keywords },
      { name: 'author', content: 'VSING Team' },
      { name: 'robots', content: 'index, follow' },
      { name: 'language', content: meta.language },
      { name: 'geo.region', content: meta.geo },
      { name: 'geo.placename', content: meta.placename },

      { property: 'og:title', content: meta.title },
      { property: 'og:description', content: meta.ogDescription },
      { property: 'og:type', content: 'website' },
      {
        property: 'og:url',
        content: `https//vsing.my/${region.toLocaleLowerCase()}/home`,
      },
      {
        property: 'og:image',
        content: `https://vsing.my/assets/vsing-og-home.jpg`,
      },
    ]);
  }
}
