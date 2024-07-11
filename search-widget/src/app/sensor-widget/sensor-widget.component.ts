import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sensor-widget',
  templateUrl: './sensor-widget.component.html',
  styleUrls: ['./sensor-widget.component.css']
})
export class SensorWidgetComponent implements OnInit {
  zones = [
    {
      name: 'Zone 1',
      cameras: [
        { name: 'Camera 1', connection: 'stable' },
        { name: 'Camera 2', connection: 'unstable' }
      ]
    },
    {
      name: 'Zone 2',
      cameras: [
        { name: 'Camera 1', connection: 'disconnected' },
        { name: 'Camera 2', connection: 'stable' }
      ]
    }
  ];

  sites = [
    { name: 'Site 1' },
    { name: 'Site 2' }
  ];

  placemarks = [
    { name: 'Placemark 1' },
    { name: 'Placemark 2' }
  ];

  layers = [
    { name: 'Layer 1' },
    { name: 'Layer 2' }
  ];

  filteredZones = this.zones;
  filteredSites = this.sites;
  filteredPlacemarks = this.placemarks;
  filteredLayers = this.layers;

  constructor() { }

  ngOnInit(): void { }

  filterSensors(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.toLowerCase();
    this.filteredZones = this.zones.filter(zone => 
      zone.name.toLowerCase().includes(value) || 
      zone.cameras.some(camera => camera.name.toLowerCase().includes(value))
    );
    this.filteredSites = this.sites.filter(site => site.name.toLowerCase().includes(value));
    this.filteredPlacemarks = this.placemarks.filter(placemark => placemark.name.toLowerCase().includes(value));
    this.filteredLayers = this.layers.filter(layer => layer.name.toLowerCase().includes(value));
  }

  getConnectionClass(connection: string): string {
    switch (connection) {
      case 'stable':
        return 'sensor-stable';
      case 'unstable':
        return 'sensor-unstable';
      case 'disconnected':
        return 'sensor-disconnected';
      default:
        return '';
    }
  }

  getConnectionColor(connection: string): string {
    switch (connection) {
      case 'stable':
        return 'green';
      case 'unstable':
        return 'orange';
      case 'disconnected':
        return 'red';
      default:
        return 'black';
    }
  }
}
