import { TestBed } from '@angular/core/testing';

import { PlaceAndWeatherService } from './place-and-weather.service';

describe('PlaceAndWeatherService', () => {
  let service: PlaceAndWeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaceAndWeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
