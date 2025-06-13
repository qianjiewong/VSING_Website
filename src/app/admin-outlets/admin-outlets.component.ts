import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface OutletHour {
  day: string;
  time: string;
}

interface Outlet {
  id: string;
  name: string;
  address: string;
  region: string;
  image: string;
  mapUrl: string;
  phone: string;
  hours: OutletHour[];
  description: string;
  isExpanded?: boolean;
  isNew?: boolean;
}

@Component({
  selector: 'app-admin-outlets',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule
  ],
  templateUrl: './admin-outlets.component.html',
  styleUrl: './admin-outlets.component.css'
})
export class AdminOutletsComponent implements OnInit {

  outletData: any[] = [];
  loading = true;
  saving = false;
  error = '';
  readonly regionOrder: string[] = ['my','hk','tw','sg','th','jp'];
  timeOptions: string[] = [];
  hours12 = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  minutes = ['00', '15', '30', '45'];
  periods = ['AM','PM'];
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  private regionNames: { [key: string]: string } = {
    'my': 'Malaysia',
    'hk': 'Hong Kong',
    'sg': 'Singpore',
    'tw': 'Taiwan',
    'jp': 'Japan',
    'th': 'Thailand'
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('../assets/data/outlets.json').subscribe({
      next: (data) => {
        this.outletData = data;
        this.loading = false;
        this.generateTimeOptions();
      },
      error: (err) => {
        this.error = 'Failed to load outlet data';
        this.loading = false;
      }
    });
  }

  getRegions(): string[] {
    return this.regionOrder;
  }

  getOutletsByRegion(region: string): any[] {
    return this.outletData.filter(outlet => outlet.region === region);
  }

  getRegionDisplayName(region: string): string {
    return this.regionNames[region] || region.toUpperCase();
  }

  toggleOutlet(outletId: string): void {
    const outlet = this.outletData.find(o => o.id === outletId);
    if (outlet) {
      outlet.isExpanded = !outlet.isExpanded;
    }
  }

  generateTimeOptions() {
    const times: string[] = [];

    for (let h = 0; h < 24; h++ ) {
      for (let m = 0; m < 60; m+= 30) {
        const hour = h.toString().padStart(2, '0');
        const minute = m.toString().padStart(2, '0');
        times.push(`${hour}:${minute}`);
      }
    }

    this.timeOptions = times;
  }

  addHour(displayedIndex: number, region: string) {
    const outlet = this.getOutletsByRegion(region)[displayedIndex];
    const outletIndex = this.outletData.findIndex(o => o.id === outlet.id);

    if (outletIndex !== -1) {
      this.outletData[outletIndex].hours.push({ day: '', time: '' });
    }
  }

  removeHour(outletIndex: number, hourIndex: number) {
    this.outletData[outletIndex].hours.splice(hourIndex, 1);
  }

  addOutletToRegion(region: string): void {
    const regionOutlets = this.getOutletsByRegion(region);
    const newOutletNumber = regionOutlets.length + 1;

    const newOutlet: Outlet = {
      id: '',
      name: '',
      address: '',
      region: region,
      image: '',
      mapUrl: '',
      phone: '',
      hours: [{ day: 'MON', time: ''}],
      description: '',
      isExpanded: true,
      isNew: true
    };

    this.outletData.push(newOutlet);
  }

  generateOutletId(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-]/g, (match)=> match.toLowerCase());
  }

  deleteOutlet(outletId: string): void {
    const confirmDelete = confirm('Are you sure are you want to delete this outlet?');
    if (!confirmDelete) return;

    this.outletData = this.outletData.filter(outlet => outlet.id !== outletId);
  }

  saveOutlets() {
      this.saving = true;

      this.http.put('../assets/data/outlets.json', this.outletData, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer your-secret-token'
        })
      }).subscribe({
        next: () => {
          alert('Outlet Updated Successfully!');
          this.saving = false;
        },
        error: () => {
          alert('Failed to save.');
          this.saving = false;
        }
      });
  }

}
