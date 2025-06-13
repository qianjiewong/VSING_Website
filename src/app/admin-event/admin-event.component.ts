import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Event {
  id?: string;
  title: string;
  image: string;
  description: string;
  isExpanded?: boolean;
}

@Component({
  selector: 'app-admin-event',
  templateUrl: './admin-event.component.html',
  styleUrls: ['./admin-event.component.css'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
  ],
})
export class AdminEventComponent implements OnInit {
  eventData: any[] = [];
  isLoading = false;
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // Only load data when in browser environment
    if (this.isBrowser) {
      this.loadEvents();
    }
    // During SSR/prerendering: do nothing, keep eventData as empty array
  }

  toggleEvent(index: number): void {
    if(this.eventData[index]) {
      this.eventData[index].isExpanded =!this.eventData[index].isExpanded;
    }
  }

  addEvent(): void {
    const newEvent: Event = {
      title: '',
      image: '',
      description: '',
      isExpanded: true
    };

    this.eventData.push(newEvent);
  }

  private loadEvents(): void {
    if (!this.isBrowser) return;

    this.http.get<any[]>('../assets/data/event.json').subscribe({
      next: (data) => {
        this.eventData = (data || []).map(event => ({
          ...event,
          isExpanded: false
        }));

        if (this.eventData.length === 0) {}
      },
      error: (err) => {
        console.error('Failed to load events:', err);
        this.eventData = [];
      }
    });
  }

  deleteEvent(eventId: string): void {
    const confirmDelete = confirm('Are you sure you want to delete this event?');
    if (!confirmDelete) return;

    this.eventData = this.eventData.filter(event => event.id !== eventId);
  }

  save(): void {
    if (!this.isBrowser) {
      console.warn('Save called in non-browser environment');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': 'Bearer yourSecretAdminToken123',
      'Content-Type': 'application/json'
    });
    
    console.log('Saving event data:', this.eventData);
    
    this.http.put('../assets/data/event.json', this.eventData, { headers }).subscribe({
      next: (response) => {
        console.log('Save successful:', response);
        alert('Events Updated Successfully!');
      },
      error: (err) => {
        console.error('Failed to update JSON:', err);
        alert('Failed to update events. Please try again.');
      }
    });
  }
}