import { Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  region: 'MY' | 'HK' | 'JP' | 'TH' | 'TW' | 'SG' = 'MY';
  eventId: string = '';
  eventData: any;
  events: any[] = [];
  
  // events = [
  // {
  //   id: 'event-1',
  //   title: 'event-1',
  //   image: '/assets/images/demo_details.png',
  //   description: 'Experience an electrifying karaoke battle night where vocal talent, fun games, and crowd cheers collide in one thrilling event. Join our retro night party featuring old-school hits, disco vibes, and unforgettable moments with friends new and old alike.Step into the spotlight for a talent showcase event filled with music, magic, and creative surprises to entertain all guests.'
  // },
  // {
  //   id: 'event-2',
  //   title: 'event-2',
  //   image: '/assets/images/demo_details2.png',
  //   description: 'Join our retro night party featuring old-school hits, disco vibes, and unforgettable moments with friends new and old alike.'
  // },
  // {
  //   id: 'event-3',
  //   title: 'event-3',
  //   image: '/assets/images/demo_details.png',
  //   description: 'Step into the spotlight for a talent showcase event filled with music, magic, and creative surprises to entertain all guests.'
  // },
  // {
  //   id: 'event-4',
  //   title: 'event-4',
  //   image: '/assets/images/demo_details.png',
  //   description: 'Celebrate cultural fusion with live DJs, traditional performances, and themed drinks in an unforgettable music lounge celebration.'
  // },
  // {
  //   id: 'event-5',
  //   title: 'event-5',
  //   image: '/assets/images/demo_details.png',
  //   description: 'Dance through decades with themed rooms, nostalgic music, and immersive decorations spanning the 80s, 90s, and early 2000s.'
  // },
  // {
  //   id: 'event-6',
  //   title: 'event-6',
  //   image: '/assets/images/demo_details.png',
  //   description: 'A night of luxury karaoke and gourmet experiences featuring premium booths, personalized service, and elite entertainment packages.'
  // },
  // {
  //   id: 'event-7',
  //   title: 'event-7',
  //   image: '/assets/images/demo_details.png',
  //   description: 'Sing for a cause in this charity concert night where every note and every guest helps fund local creative community programs.'
  // },
  // {
  //   id: 'event-8',
  //   title: 'event-8',
  //   image: '/assets/images/demo_details.png',
  //   description: 'Get ready for an epic cosplay karaoke party with prizes, themed cocktails, and performances straight out of your favorite anime.'
  // },
  // {
  //   id: 'event-9',
  //   title: 'event-9',
  //   image: '/assets/images/demo_details.png',
  //   description: 'Test your knowledge and vocals in our trivia and karaoke fusion event, perfect for music lovers and quiz fans alike.'
  // }
  // ];
  
    constructor(
      private title: Title, 
      private meta: Meta, 
      private route: ActivatedRoute, 
      private router: Router, 
      private location: Location,
      private http: HttpClient
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
        this.http.get<any[]>('../assets/data/event.json').subscribe({
          next: (data) => {
            console.log(data)
            this.events = data;
            
            this.route.paramMap.subscribe(params => {
              this.eventId = params.get('id') || '';
              this.eventData = this.events.find(e => e.id === this.eventId);
            });
          },
          error: (err) => {
            console.error('Failed to load events:', err);
          }
        });
      //   this.route.paramMap.subscribe(params => {
      //   this.eventId = params.get('id') || '';
      //   this.eventData = this.events.find(e => e.id === this.eventId);
      // });
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
          title: 'VSING Malaysia - Events',
          description: 'Learn about VSING Malaysia Events',
          geo: 'MY',
          placename: 'Malaysia',
          language: 'en',
          keywords: 'VSING, Concert Bar, Malaysia, Premium Entertainment, Malaysia Bar'
        },
        HK: {
          title: 'VSING 香港 - 活动',
          description: '了解 VSING 香港活动',
          geo: 'HK',
          placename: 'Hong Kong',
          language: 'zh',
          keywords: 'VSING, Concert Bar, Malaysia, Premium Entertainment, 唱歌， hongkong酒吧'
        },
        SG: {
          title: 'VSING Singapore - Event',
          description: 'Learn about VSING Singapore Events',
          geo: 'SG',
          placename: 'Singapore',
          language: 'en',
          keywords: 'VSING, Concert Bar, Singapore, Premium Entertainment'
        },
        JP: {
          title: 'VSING Japan - Event',
          description: 'Learn about VSING Japan Events',
          geo: 'JP',
          placename: 'Japan',
          language: 'en',
          keywords: 'VSING, Concert Bar, Japan, Premium Entertainment'
        },
        TH: {
          title: 'VSING Thailand - Event',
          description: 'Learn about VSING Thailand Events',
          geo: 'TH',
          placename: 'Thailand',
          language: 'en',
          keywords: 'VSING, Concert Bar, Thailand, Premium Entertainment'
        },
        TW: {
          title: 'VSING 台湾 - 活动',
          description: '了解 VSING 台湾活动',
          geo: 'TW',
          placename: 'Taiwan',
          language: 'en',
          keywords: 'VSING, Concert Bar, Taiwan, Premium Entertainment'
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
        { property: 'og:url', content: `https://vsing.my/${region.toLowerCase()}/about` },
        { property: 'og:image', content: 'https://vsing.my/assets/vsing-og-image.jpg' }, // Replace with actual image path
      ]);
    }

  closeEvent() {
    this.location.back();
  }

}
