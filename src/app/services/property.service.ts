import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PropertyList } from '../models/property-list';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http: HttpClient) { }
  private get AuthHeader() {
    return { 'Authorization': `Bearer ${environment.airtable}` }
  }

  getProperty(maxRecords = 4) {
    return this.http.get<PropertyList>('https://api.airtable.com/v0/appXC9L1b78GSse6a/property', { headers: this.AuthHeader, params: { maxRecords, view: 'Grid view' } });
  }

  addProperty(propertyDetails: { name: string, description: string, size: number }) {
    return this.http.post<PropertyList>('https://api.airtable.com/v0/appXC9L1b78GSse6a/property', { records: [{ fields: propertyDetails }] }, { headers: this.AuthHeader });
  }

  deleteProperty(id: string) {
    return this.http.delete('https://api.airtable.com/v0/appXC9L1b78GSse6a/property', { params: { 'records[]': id }, headers: this.AuthHeader })
  }
}
