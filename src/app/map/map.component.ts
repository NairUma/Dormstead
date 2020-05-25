import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  directionsService: google.maps.DirectionsService = new google.maps.DirectionsService();
  directionRenderer: google.maps.DirectionsRenderer = new google.maps.DirectionsRenderer();

  lat = 33.1294983;
  lng = -117.1617594;

  ngAfterViewInit(): void {
    this.mapInitializer();
    this.directionRenderInit();
  }

  mapInitializer(): void {
    //Coordinates to set the center of the map
    let coordinates = new google.maps.LatLng(this.lat, this.lng);

    let mapOptions: google.maps.MapOptions = {
      center: coordinates,
      zoom: 12,
    };

    //Default marker
    let marker = new google.maps.Marker({
      position: coordinates,
      map: this.map,
      title: "Hello CSUSM!"
    });

    this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);

    //Adding Click event to default marker
    marker.addListener("click", () => {
      const infoWindow = new google.maps.InfoWindow({
        content: marker.getTitle()
      });
      infoWindow.open(marker.getMap(), marker);
    });

    //Adding default marker to map
    marker.setMap(this.map);
  }

  directionServiceInit(): void {

  }

  directionRenderInit(): void {
    this.directionRenderer.setMap(this.map);

    let start = "California State University San Marcos";
    let end = "San Diego";

    let request = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.DRIVING
    };

    this.directionsService.route(request, (result, status) => {
      if (status == google.maps.DirectionsStatus.OK) {
        this.directionRenderer.setDirections(result);
      }
    });
  }
}
