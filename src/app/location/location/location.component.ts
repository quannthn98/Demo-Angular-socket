import {Component, OnInit} from '@angular/core';
import * as NodeGeocoder from 'node-geocoder';
import {LocationService} from '../../service/location.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  searchForm = new FormGroup({
    address: new FormControl()
  });

  lat1;
  lng1;
  lat2;
  lng2;

  constructor(private locationService: LocationService) {
  }

  ngOnInit() {
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat1 = position.coords.latitude;
        this.lng1 = position.coords.longitude;
        console.log(this.lat1);
        console.log(this.lng1);
      }, this.showError);
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }


  showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log('User denied the request for Geolocation.');
        break;
      case error.POSITION_UNAVAILABLE:
        console.log('User denied the request for Geolocation.');
        break;
      case error.TIMEOUT:
        console.log('The request to get user location timed out.');
        break;
      case error.UNKNOWN_ERROR:
        console.log('An unknown error occurred.');
        break;
    }
  }

  submit() {
    this.locationService.forwardConvert(this.searchForm.value.address).subscribe(data => {
      console.log(data.results[0].geometry);
      this.lat2 = data.results[0].geometry.lat;
      this.lng2 = data.results[0].geometry.lng;
      const distance = this.getDistanceFromLatLonInKm(this.lat1, this.lng1, this.lat2, this.lng2);
      console.log('distance: ' + distance);
    });
  }

  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    let dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    let dLon = this.deg2rad(lon2 - lon1);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }


}
