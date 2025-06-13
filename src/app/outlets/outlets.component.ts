import { CommonModule, ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-outlets',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './outlets.component.html',
  styleUrl: './outlets.component.css'
})
export class OutletsComponent {
   region: 'MY' | 'HK' | 'JP' | 'TH' | 'TW' | 'SG' = 'MY';
   countryName: string = 'Malaysia';
   outlets: any[] = [];
   
   allOutlets = [
    {
      id: 'vsing-icon-city',
      name: 'VSING Icon City',
      address: 'VSING Icon City, Jalan Icon City, Bukit Mertajam, Penang, Malaysia',
      region: 'my',
      image: '/assets/images/Malaysia_outlet1.png',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11303.135178999366!2d100.42555790714003!3d5.341065657641191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304ac7fefa5b4df5%3A0xbb1880ac36e9508f!2sVSING%20Icon%20City!5e0!3m2!1sen!2smy!4v1747996915916!5m2!1sen!2smy', 
      phone: '60182312120',
      hours: [
        { day: 'THU', time: '5:00PM - 3:00AM' },
        { day: 'FRI', time: '5:00PM - 3:00AM' },
        { day: 'SAT', time: '5:00PM - 3:00AM' },
        { day: 'SUN', time: '5:00PM - 3:00AM' },
        { day: 'MON', time: '5:00PM - 3:00AM' },
        { day: 'TUE', time: '5:00PM - 3:00AM' },
        { day: 'WED', time: '5:00PM - 3:00AM' }
      ],
      description: [
        'Imagine a world where anyone, no matter where they come from or who they are, everyone can stand on a stage and share their voice to the world. That’s the vision that drives VSING every single day. We’re not just a business; we’re a movement. Imagine a world where anyone, no matter where they come from or who they are, everyone can stand on a stage and share their voice to the world. That’s the vision that drives VSING every single day. We’re not just a business; we’re a movement.'

      ],
      gallery: [
        '/assets/outlet1_gallery1.png',
        '/assets/outlet1_gallery2.png',
        '/assets/outlet1_gallery3.png',
        '/assets/outlet1_gallery4.png'
      ]
    },
    {
      id: 'vsing-ipoh-soho',
      name: 'VSING Ipoh Soho',
      address: 'VSING Ipoh Soho, Jalan Sultan Iskandar, Soho Ipoh, Ipoh, Perak, Malaysia',
      region: 'my',
      image: '/assets/images/Malaysia_outlet2.png',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3977.0068915090997!2d101.08688257530086!3d4.592785195381843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31caedaf05d70265%3A0xf9318c6e4dfe1241!2sVSING%20Ipoh%20Soho!5e0!3m2!1sen!2smy!4v1747997561726!5m2!1sen!2smy', 
      phone: '60182312555',
      hours: [
        { day: 'THU', time: '5:00PM - 3:00AM' },
        { day: 'FRI', time: '5:00PM - 3:00AM' },
        { day: 'SAT', time: '5:00PM - 3:00AM' },
        { day: 'SUN', time: '5:00PM - 3:00AM' },
        { day: 'MON', time: '5:00PM - 3:00AM' },
        { day: 'TUE', time: '5:00PM - 3:00AM' },
        { day: 'WED', time: '5:00PM - 3:00AM' }
      ],
      description: [
        'Imagine a world where anyone, no matter where they come from or who they are, everyone can stand on a stage and share their voice to the world. That’s the vision that drives VSING every single day. We’re not just a business; we’re a movement. Imagine a world where anyone, no matter where they come from or who they are, everyone can stand on a stage and share their voice to the world. That’s the vision that drives VSING every single day. We’re not just a business; we’re a movement.'

      ],
      gallery: [
        '/assets/ipoh1.jpg',
        '/assets/ipoh2.jpg',
        '/assets/ipoh3.jpg',
        '/assets/ipoh4.jpg',
        '/assets/ipoh5.jpg'
      ]
    },
    {
      id: 'vsing-kota-damansara',
      name: 'VSING Kota Damansara',
      address: '3rd Floor. 2 Jalan PJU 5/11 Dataran Sunway, Kota Damansara, 47810, Selangor',
      region: 'my',
      image: '/assets/images/Malaysia_outlet3.png',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.778663165749!2d101.58998487529391!3d3.152985796822414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4f64ced627db%3A0x107c9cb2ff364aaf!2sVSING%20Kota%20Damansara!5e0!3m2!1sen!2smy!4v1748229311945!5m2!1sen!2smy', 
      phone: '60183675877',
      hours: [
        { day: 'THU', time: '5:00PM - 3:00AM' },
        { day: 'FRI', time: '5:00PM - 3:00AM' },
        { day: 'SAT', time: '5:00PM - 3:00AM' },
        { day: 'SUN', time: '5:00PM - 3:00AM' },
        { day: 'MON', time: '5:00PM - 3:00AM' },
        { day: 'TUE', time: '5:00PM - 3:00AM' },
        { day: 'WED', time: '5:00PM - 3:00AM' }
      ],
      description: [
        'Imagine a world where anyone, no matter where they come from or who they are, everyone can stand on a stage and share their voice to the world. That’s the vision that drives VSING every single day. We’re not just a business; we’re a movement. Imagine a world where anyone, no matter where they come from or who they are, everyone can stand on a stage and share their voice to the world. That’s the vision that drives VSING every single day. We’re not just a business; we’re a movement.'

      ],
      gallery: [
        '/assets/ipoh1.jpg',
        '/assets/ipoh2.jpg',
        '/assets/ipoh3.jpg',
        '/assets/ipoh4.jpg',
        '/assets/ipoh5.jpg'
      ]
    },
    { 
      id: 'vsing-mount-austin-jb',
      name: 'VSINGX Mount Austin JB',
      address: '1, Jalan Austin Heights 8/5, Taman Austin Heights, 81100 Johor Bahru, Johor Darul Tazim',
      region: 'my',
      image: '/assets/images/Malaysia_outlet4.png',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.3317746792577!2d103.77476377528926!3d1.5640969984212962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da6fda93457b09%3A0x7099e7ca12cecef4!2sSing%20V%20Austin!5e0!3m2!1sen!2smy!4v1748416443013!5m2!1sen!2smy', 
      phone: '60183675877',
      hours: [
        { day: 'THU', time: '5:00PM - 3:00AM' },
        { day: 'FRI', time: '5:00PM - 3:00AM' },
        { day: 'SAT', time: '5:00PM - 3:00AM' },
        { day: 'SUN', time: '5:00PM - 3:00AM' },
        { day: 'MON', time: '5:00PM - 3:00AM' },
        { day: 'TUE', time: '5:00PM - 3:00AM' },
        { day: 'WED', time: '5:00PM - 3:00AM' }
      ],
      description: [
        'Imagine a world where anyone, no matter where they come from or who they are, everyone can stand on a stage and share their voice to the world. That’s the vision that drives VSING every single day. We’re not just a business; we’re a movement. Imagine a world where anyone, no matter where they come from or who they are, everyone can stand on a stage and share their voice to the world. That’s the vision that drives VSING every single day. We’re not just a business; we’re a movement.'

      ],
      gallery: [
        '/assets/ipoh1.jpg',
        '/assets/ipoh2.jpg',
        '/assets/ipoh3.jpg',
        '/assets/ipoh4.jpg',
        '/assets/ipoh5.jpg'
      ]
    },
    {
      id: 'vsign-cheras-traders',
      name: 'VSING Cheras Traders Square',
      address: 'No 162-1, Jalan Dataran Cheras 9 Dataran Perniagaan Cheras, Balakong, Balakong, 43200 Cheras, Selangor',
      region: 'my',
      image: '/assets/images/Malaysia_outlet5.png',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.227436546167!2d101.76042967529345!3d3.0335560969423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc35d54d04ad69%3A0x9e14963a8f319d87!2sVSING%20Cheras%20Traders%20Square!5e0!3m2!1sen!2smy!4v1748416906763!5m2!1sen!2smy', 
      phone: '60183680807',
      hours: [
        { day: 'THU', time: '5:00PM - 3:00AM' },
        { day: 'FRI', time: '5:00PM - 3:00AM' },
        { day: 'SAT', time: '5:00PM - 3:00AM' },
        { day: 'SUN', time: '5:00PM - 3:00AM' },
        { day: 'MON', time: '5:00PM - 3:00AM' },
        { day: 'TUE', time: '5:00PM - 3:00AM' },
        { day: 'WED', time: '5:00PM - 3:00AM' }
      ],
      description: [
        'Imagine a world where anyone, no matter where they come from or who they are, everyone can stand on a stage and share their voice to the world. That’s the vision that drives VSING every single day. We’re not just a business; we’re a movement. Imagine a world where anyone, no matter where they come from or who they are, everyone can stand on a stage and share their voice to the world. That’s the vision that drives VSING every single day. We’re not just a business; we’re a movement.'

      ],
      gallery: [
        '/assets/ipoh1.jpg',
        '/assets/ipoh2.jpg',
        '/assets/ipoh3.jpg',
        '/assets/ipoh4.jpg',
        '/assets/ipoh5.jpg'
      ]
    },
    {
      id: 'vsing-voltz',
      name: 'VOLTZ by VSINGs',
      address: '1-1, Jalan Remia 3, Bandar Botanik, 41200 Klang, Selangor',
      region: 'my',
      image: '/assets/images/Malaysia_outlet6.png',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3984.353665542051!2d101.4441161!3d2.9991073999999998!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cdad072eba0047%3A0x16b4d77021be8b1d!2sVOLTZ!5e0!3m2!1sen!2smy!4v1748417444372!5m2!1sen!2smy', 
      phone: '60183680807',
      hours: [
        { day: 'THU', time: '5:00PM - 3:00AM' },
        { day: 'FRI', time: '5:00PM - 3:00AM' },
        { day: 'SAT', time: '5:00PM - 3:00AM' },
        { day: 'SUN', time: '5:00PM - 3:00AM' },
        { day: 'MON', time: '5:00PM - 3:00AM' },
        { day: 'TUE', time: '5:00PM - 3:00AM' },
        { day: 'WED', time: '5:00PM - 3:00AM' }
      ],
      description: [
        'Imagine a world where anyone, no matter where they come from or who they are, everyone can stand on a stage and share their voice to the world. That’s the vision that drives VSING every single day. We’re not just a business; we’re a movement. Imagine a world where anyone, no matter where they come from or who they are, everyone can stand on a stage and share their voice to the world. That’s the vision that drives VSING every single day. We’re not just a business; we’re a movement.'

      ],
      gallery: [
        '/assets/ipoh1.jpg',
        '/assets/ipoh2.jpg',
        '/assets/ipoh3.jpg',
        '/assets/ipoh4.jpg',
        '/assets/ipoh5.jpg'
      ]
    },
    {
      id: 'vsing-batu-pahat',
      name: 'VSING Batu Pahat',
      address: '35, 37, Jalan Flora Utama 6, Taman Flora Utama, 83000 Batu Pahat, Johor Darul Tazim',
      region: 'my',
      image: '/assets/images/Malaysia_outlet7.png',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.706277942354!2d102.94768137528997!3d1.8643675981186083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d0513ea7528acd%3A0xf71cf5750b0ac60f!2sVSING%20Batu%20Pahat!5e0!3m2!1sen!2smy!4v1748422454220!5m2!1sen!2smy', 
      phone: '60183680807',
      hours: [
        { day: 'THU', time: '5:00PM - 3:00AM' },
        { day: 'FRI', time: '5:00PM - 3:00AM' },
        { day: 'SAT', time: '5:00PM - 3:00AM' },
        { day: 'SUN', time: '5:00PM - 3:00AM' },
        { day: 'MON', time: '5:00PM - 3:00AM' },
        { day: 'TUE', time: '5:00PM - 3:00AM' },
        { day: 'WED', time: '5:00PM - 3:00AM' }
      ],
      description: [
        'Imagine a world where anyone, no matter where they come from or who they are, everyone can stand on a stage and share their voice to the world. That’s the vision that drives VSING every single day. We’re not just a business; we’re a movement. Imagine a world where anyone, no matter where they come from or who they are, everyone can stand on a stage and share their voice to the world. That’s the vision that drives VSING every single day. We’re not just a business; we’re a movement.'

      ],
      gallery: [
        '/assets/ipoh1.jpg',
        '/assets/ipoh2.jpg',
        '/assets/ipoh3.jpg',
        '/assets/ipoh4.jpg',
        '/assets/ipoh5.jpg'
      ]
    },
    {
      id: 'mi-sri-petaling',
      name: '觅 mì 酒馆 @Sri Petaling',
      address: '29-2, Jln Radin Bagus 3, Bandar Baru Sri Petaling, 57000 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur',
      region: 'my',
      image: '/assets/images/Malaysia_outlet8.png',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.0920270816505!2d101.69123057529357!3d3.070080896905636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4bb959c2be3b%3A0xf763bd44f7483c5f!2sVSING%20Mi%20Bar%20-%20Sri%20Petaling!5e0!3m2!1sen!2smy!4v1748428803173!5m2!1sen!2smy', 
      phone: '60183680807',
      hours: [
        { day: 'THU', time: '5:00PM - 3:00AM' },
        { day: 'FRI', time: '5:00PM - 3:00AM' },
        { day: 'SAT', time: '5:00PM - 3:00AM' },
        { day: 'SUN', time: '5:00PM - 3:00AM' },
        { day: 'MON', time: '5:00PM - 3:00AM' },
        { day: 'TUE', time: '5:00PM - 3:00AM' },
        { day: 'WED', time: '5:00PM - 3:00AM' }
      ],
      description: [
        'Imagine a world where anyone, no matter where they come from or who they are, everyone can stand on a stage and share their voice to the world. That’s the vision that drives VSING every single day. We’re not just a business; we’re a movement. Imagine a world where anyone, no matter where they come from or who they are, everyone can stand on a stage and share their voice to the world. That’s the vision that drives VSING every single day. We’re not just a business; we’re a movement.'

      ],
      gallery: [
        '/assets/ipoh1.jpg',
        '/assets/ipoh2.jpg',
        '/assets/ipoh3.jpg',
        '/assets/ipoh4.jpg',
        '/assets/ipoh5.jpg'
      ]
    },
    {
      id: 'beats-by-vsing',
      name: 'Beats By VSING',
      address: 'Beats by VSING, Knutsford Terrace, Tsim Sha Tsui, Hong Kong',
      region: 'hk',
      image: '/assets/images/HongKong_outlet1.png',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.3848593318185!2d114.17155107559164!3d22.301280079685895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x340401b23e7fe111%3A0xad6a0d343f830cb1!2sVSING%20Beats!5e0!3m2!1sen!2smy!4v1747997861176!5m2!1sen!2smy', 
      phone: '85260942847',
      hours: [
        { day: 'MON', time: '5:00PM - 2:30AM' },
        { day: 'TUE', time: '5:00PM - 2:30AM' },
        { day: 'WED', time: '5:00PM - 4:00AM' },
        { day: 'THU', time: '5:00PM - 4:00AM' },
        { day: 'FRI', time: '5:00PM - 5:00AM' },
        { day: 'SAT', time: '5:00PM - 5:00AM' },
        { day: 'SUN', time: '5:00PM - 2:30AM' }
      ],
      description: [
        'Imagine a world where anyone, no matter where they come from or who they are, everyone can stand on a stage and share their voice to the world. That’s the vision that drives VSING every single day. We’re not just a business; we’re a movement. Imagine a world where anyone, no matter where they come from or who they are, everyone can stand on a stage and share their voice to the world. That’s the vision that drives VSING every single day. We’re not just a business; we’re a movement.'

      ],
      gallery: [
        '/assets/outlet1_gallery1.png',
        '/assets/outlet1_gallery2.png',
        '/assets/outlet1_gallery3.png',
        '/assets/outlet1_gallery4.png'
      ]
    },
    {
      id: 'knutsford-v10',
      name: 'VSING KNUTSFORD V10',
      address: 'VSING Knutsford 10F, Knutsford Terrace, Tsim Sha Tsui, Hong Kong',
      region: 'hk',
      image: '/assets/images/HongKong_outlet2.png',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.3883474280915!2d114.17054287559156!3d22.30114807968597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3404016f41fc0e9b%3A0xbb83a5c31cc1f082!2sVSING%20Knutsford%2010F!5e0!3m2!1sen!2smy!4v1747997912148!5m2!1sen!2smy', 
      phone: '85262347679',
      hours: [
        { day: 'MON', time: '5:00PM - 2:30AM' },
        { day: 'TUE', time: '5:00PM - 2:30AM' },
        { day: 'WED', time: '5:00PM - 4:00AM' },
        { day: 'THU', time: '5:00PM - 4:00AM' },
        { day: 'FRI', time: '5:00PM - 5:00AM' },
        { day: 'SAT', time: '5:00PM - 5:00AM' },
        { day: 'SUN', time: '5:00PM - 2:30AM' }
      ],
      description: [
        'Imagine a world where anyone, no matter where they come from or who they are, everyone can stand on a stage and share their voice to the world. That’s the vision that drives VSING every single day. We’re not just a business; we’re a movement. Imagine a world where anyone, no matter where they come from or who they are, everyone can stand on a stage and share their voice to the world. That’s the vision that drives VSING every single day. We’re not just a business; we’re a movement.'

      ],
      gallery: [
        '/assets/outlet1_gallery1.png',
        '/assets/outlet1_gallery2.png',
        '/assets/outlet1_gallery3.png',
        '/assets/outlet1_gallery4.png'
      ]
    },
    {
      id: 'prince-edward',
      name: 'VSING Prince Edward',
      address: 'V223號 Tung Choi St, Mong Kok, Hong Kong',
      region: 'hk',
      image: '/assets/images/HongKong_outlet3.png',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.7328837531554!2d114.16645507559225!3d22.325939779668218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x340401ffa6b44ec5%3A0x99cc71481baf82dd!2zVnNpbmflpKrlrZDlupc!5e0!3m2!1sen!2smy!4v1748588001351!5m2!1sen!2smy', 
      phone: '85251357782',
      hours: [
        { day: 'MON', time: '5:00PM - 3:00AM' },
        { day: 'TUE', time: '5:00PM - 3:00AM' },
        { day: 'WED', time: '5:00PM - 3:00AM' },
        { day: 'THU', time: '5:00PM - 3:00AM' },
        { day: 'FRI', time: '5:00PM - 4:30AM' },
        { day: 'SAT', time: '5:00PM - 4:30AM' },
        { day: 'SUN', time: '5:00PM - 3:00AM' }
      ],
      description: [
        'Imagine a world where anyone, no matter where they come from or who they are, everyone can stand on a stage and share their voice to the world. That’s the vision that drives VSING every single day. We’re not just a business; we’re a movement. Imagine a world where anyone, no matter where they come from or who they are, everyone can stand on a stage and share their voice to the world. That’s the vision that drives VSING every single day. We’re not just a business; we’re a movement.'

      ],
      gallery: [
        '/assets/outlet1_gallery1.png',
        '/assets/outlet1_gallery2.png',
        '/assets/outlet1_gallery3.png',
        '/assets/outlet1_gallery4.png'
      ]
    },
    {
      id: 'ponglive',
      name: 'PONGLIVE',
      address: '3/F, One Knutsford, Knutsford Terrace, Tsim Sha Tsui, Hong Kong',
      region: 'hk',
      image: '/assets/images/HongKong_outlet4.png',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.3877475826284!2d114.17055517559162!3d22.301170779685908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x340401028f3174fd%3A0xe19fc8095855e0a8!2sVSING%20Ponglive!5e0!3m2!1sen!2smy!4v1748588261316!5m2!1sen!2smy', 
      phone: '885246617465',
      hours: [
        { day: 'MON', time: '6:00PM - 3:00AM' },
        { day: 'TUE', time: '6:00PM - 3:00AM' },
        { day: 'WED', time: '6:00PM - 3:00AM' },
        { day: 'THU', time: '6:00PM - 3:00AM' },
        { day: 'FRI', time: '6:00PM - 4:30AM' },
        { day: 'SAT', time: '6:00PM - 4:30AM' },
        { day: 'SUN', time: '6:00PM - 3:00AM' }
      ],
      description: [
        'Imagine a world where anyone, no matter where they come from or who they are, everyone can stand on a stage and share their voice to the world. That’s the vision that drives VSING every single day. We’re not just a business; we’re a movement. Imagine a world where anyone, no matter where they come from or who they are, everyone can stand on a stage and share their voice to the world. That’s the vision that drives VSING every single day. We’re not just a business; we’re a movement.'

      ],
      gallery: [
        '/assets/outlet1_gallery1.png',
        '/assets/outlet1_gallery2.png',
        '/assets/outlet1_gallery3.png',
        '/assets/outlet1_gallery4.png'
      ]
    },
    {
      id: 'peppercorn',
      name: '花椒子 Peppercorn',
      address: '彌敦道639號雅蘭中心地庫B102號, Mong Kok, Hong Kong',
      region: 'hk',
      image: '/assets/images/HongKong_outlet5.png',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15118089.548438089!2d94.65764825!3d22.31811520000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x340401434f5f8be5%3A0xdaec8a843e643e53!2z6Iqx5qSS5a2QIFBlcHBlcmNvcm4!5e0!3m2!1sen!2smy!4v1748588864196!5m2!1sen!2smy', 
      phone: '85226250199',
      hours: [
        { day: 'MON', time: '12:00PM - 4:00PM  5:30PM - 12AM' },
        { day: 'TUE', time: '12:00PM - 4:00PM   5:30PM - 12AM' },
        { day: 'WED', time: '12:00PM - 4:00PM   5:30PM - 12AM' },
        { day: 'THU', time: '12:00PM - 4:00PM   5:30PM - 12AM' },
        { day: 'FRI', time: '12:00PM - 4:00PM   5:30PM - 12AM' },
        { day: 'SAT', time: '12:00PM - 4:00PM   5:30PM - 12AM' },
        { day: 'SUN', time: '12:00PM - 4:00PM   5:30PM - 12AM' }
      ],
      description: [
        'Imagine a world where anyone, no matter where they come from or who they are, everyone can stand on a stage and share their voice to the world. That’s the vision that drives VSING every single day. We’re not just a business; we’re a movement. Imagine a world where anyone, no matter where they come from or who they are, everyone can stand on a stage and share their voice to the world. That’s the vision that drives VSING every single day. We’re not just a business; we’re a movement.'

      ],
      gallery: [
        '/assets/outlet1_gallery1.png',
        '/assets/outlet1_gallery2.png',
        '/assets/outlet1_gallery3.png',
        '/assets/outlet1_gallery4.png'
      ]
    },
    {
      id: 'kara-kara',
      name: 'KARA KARA',
      address: '110, Taiwan, Taipei City, Xinyi District, Songshou Rd, 12號10 樓',
      region: 'tw',
      image: '/assets/images/Taiwan_outlet1.png',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.9472694687283!2d121.56594499999999!3d25.0358635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abf7024df337%3A0xc81b71731f9604fd!2sKARA%20KARA!5e0!3m2!1sen!2smy!4v1748415598593!5m2!1sen!2smy', 
      phone: '886905553822',
      hours: [
        { day: 'MON', time: '6:00PM - 3:00AM' },
        { day: 'TUE', time: '6:00PM - 3:00AM' },
        { day: 'WED', time: '6:00PM - 3:00AM' },
        { day: 'THU', time: '6:00PM - 3:00AM' },
        { day: 'FRI', time: '6:00PM - 4:00AM' },
        { day: 'SAT', time: '6:00PM - 3:00AM' },
        { day: 'SUN', time: '6:00PM - 3:00AM' }
      ],
      description: [
        'Imagine a world where anyone, no matter where they come from or who they are, everyone can stand on a stage and share their voice to the world. That’s the vision that drives VSING every single day. We’re not just a business; we’re a movement. Imagine a world where anyone, no matter where they come from or who they are, everyone can stand on a stage and share their voice to the world. That’s the vision that drives VSING every single day. We’re not just a business; we’re a movement.'

      ],
      gallery: [
        '/assets/outlet1_gallery1.png',
        '/assets/outlet1_gallery2.png',
        '/assets/outlet1_gallery3.png',
        '/assets/outlet1_gallery4.png'
      ]
    },
  ];
  
    constructor(
      private title: Title, 
      private meta: Meta, 
      private route: ActivatedRoute, 
      private router: Router, 
      public sanitizer: DomSanitizer,
      private ViewportScroller: ViewportScroller
    ) {}
  
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
          title: 'VSING Malaysia - Outlets',
          description: 'Learn about VSING Malaysia Outlets',
          geo: 'MY',
          placename: 'Malaysia',
          language: 'en',
          keywords: 'VSING, Concert Bar, Malaysia, Premium Entertainment, Malaysia Bar'
        },
        HK: {
          title: 'VSING 香港 - 酒吧分行',
          description: 'VSING 香港酒吧分行',
          geo: 'HK',
          placename: 'Hong Kong',
          language: 'zh',
          keywords: 'VSING, Concert Bar, Malaysia, Premium Entertainment, 唱歌， hongkong酒吧'
        },
        SG: {
          title: 'VSING Singapore - Outlets',
          description: 'Learn about VSING Singapore Outlets',
          geo: 'SG',
          placename: 'Singapore',
          language: 'en',
          keywords: 'VSING, Concert Bar, Singapore, Premium Entertainment'
        },
        JP: {
          title: 'VSING Japan - Outlets',
          description: 'Learn about VSING Japan Outlets',
          geo: 'JP',
          placename: 'Japan',
          language: 'en',
          keywords: 'VSING, Concert Bar, Japan, Premium Entertainment'
        },
        TH: {
          title: 'VSING Thailand - Outlets',
          description: 'Learn about VSING Thailand Outlets',
          geo: 'TH',
          placename: 'Thailand',
          language: 'en',
          keywords: 'VSING, Concert Bar, Thailand, Premium Entertainment'
        },
        TW: {
          title: 'VSING 台湾 - 酒吧分行',
          description: 'VSING 台湾酒吧分行',
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
        { property: 'og:url', content: `https://vsing.my/${region.toLowerCase()}/outlets` },
        { property: 'og:image', content: 'https://vsing.my/assets/vsing-og-image.jpg' }, 
      ]);
    }

    scrollToOutlet() {
      const outletSection = document.getElementById('outlet-section');
      if (outletSection) {
        outletSection.scrollIntoView({ behavior: 'smooth'});
      }
    }

    ngOnInit() {
    this.route.url.subscribe(() => {
      const url = this.router.url;

      if(url.includes('/hk')) {
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
        this.countryName = 'Malaysia';
      }

      this.setMetaForRegion(this.region);
      this.outlets = this.allOutlets.filter(outlet => outlet.region.toLowerCase() === this.region.toLowerCase());
    });

    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        setTimeout(() => {
          this.ViewportScroller.scrollToAnchor(fragment);
        }, 100);
      }
    });
  }
}


