import { Routes } from '@angular/router';
import { EventComponent } from './event/event.component';
import { OutletsComponent } from './outlets/outlets.component';
import { AdminOutletsComponent } from './admin-outlets/admin-outlets.component';
import { AdminEventComponent } from './admin-event/admin-event.component';
import { ArViewerComponent } from './ar-viewer/ar-viewer.component';

export const routes: Routes = [
  {
    path: 'admin/outlets',
    component: AdminOutletsComponent
  },
  {
    path: 'admin/event',
    component: AdminEventComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'my/home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'hk/home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'sg/home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'jp/home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'th/home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'tw/home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  // {
  //   path: 'ar',
  //   loadChildren: () =>
  //     import('./ar-viewer/ar-viewer-wrapper.module').then(m => m.ArViewerWrapperModule)
  // },
  {
    path: 'my/ar-viewer',
     loadComponent: () =>
      import('./ar-viewer/ar-viewer.component').then((m) => m.ArViewerComponent),
  },
  {
    path: ':region/outlets',
    component: OutletsComponent
  },
  {
    path: 'my/about',
    loadComponent: () =>
      import('./about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'hk/about',
    loadComponent: () =>
      import('./about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'sg/about',
    loadComponent: () =>
      import('./about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'jp/about',
    loadComponent: () =>
      import('./about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'th/about',
    loadComponent: () =>
      import('./about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'tw/about',
    loadComponent: () =>
      import('./about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: ':region/event/:id',
    loadComponent: () => import('./event/event.component').then(m => m.EventComponent)
  },
  {
    path: ':region/event/:id',
    component: EventComponent
  },
  {
    path: 'event/:id',
    component: EventComponent
  },
  {
    path: 'my/outlets',
    loadComponent: () =>
      import('./outlets/outlets.component').then((m) => m.OutletsComponent),
  },
  {
    path: 'hk/outlets',
    loadComponent: () =>
      import('./outlets/outlets.component').then((m) => m.OutletsComponent),
  },
  {
    path: 'sg/outlets',
    loadComponent: () =>
      import('./outlets/outlets.component').then((m) => m.OutletsComponent),
  },
  {
    path: 'jp/outlets',
    loadComponent: () =>
      import('./outlets/outlets.component').then((m) => m.OutletsComponent),
  },
  {
    path: 'th/outlets',
    loadComponent: () =>
      import('./outlets/outlets.component').then((m) => m.OutletsComponent),
  },
  {
    path: 'tw/outlets',
    loadComponent: () =>
      import('./outlets/outlets.component').then((m) => m.OutletsComponent),
  },
  {
    path: 'my/download',
    loadComponent: () =>
      import('./download/download.component').then((m) => m.DownloadComponent),
  },
  {
    path: 'hk/download',
    loadComponent: () =>
      import('./download/download.component').then((m) => m.DownloadComponent),
  },
  {
    path: 'sg/download',
    loadComponent: () =>
      import('./download/download.component').then((m) => m.DownloadComponent),
  },
  {
    path: 'jp/download',
    loadComponent: () =>
      import('./download/download.component').then((m) => m.DownloadComponent),
  },
  {
    path: 'th/download',
    loadComponent: () =>
      import('./download/download.component').then((m) => m.DownloadComponent),
  },
  {
    path: 'tw/download',
    loadComponent: () =>
      import('./download/download.component').then((m) => m.DownloadComponent),
  },
  {
    path: 'my/contact-us',
    loadComponent: () =>
      import('./contact-us/contact-us.component').then((m) => m.ContactUsComponent),
  },
  {
    path: 'hk/contact-us',
    loadComponent: () =>
      import('./contact-us/contact-us.component').then((m) => m.ContactUsComponent),
  },
  {
    path: 'sg/contact-us',
    loadComponent: () =>
      import('./contact-us/contact-us.component').then((m) => m.ContactUsComponent),
  },
  {
    path: 'jp/contact-us',
    loadComponent: () =>
      import('./contact-us/contact-us.component').then((m) => m.ContactUsComponent),
  },
  {
    path: 'th/contact-us',
    loadComponent: () =>
      import('./contact-us/contact-us.component').then((m) => m.ContactUsComponent),
  },
  {
    path: 'tw/contact-us',
    loadComponent: () =>
      import('./contact-us/contact-us.component').then((m) => m.ContactUsComponent),
  },
  
];

