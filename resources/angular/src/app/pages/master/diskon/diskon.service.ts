import { Injectable } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';

@Injectable({
  providedIn: 'root'
})
export class DiskonService {

  constructor(
    private landaService: LandaService,
  ) { }

  public getIndex(payload) {
    return this.landaService.DataGet('/v1/diskon', payload)
  }

  public updateDiskonStatus(payload) {
    return this.landaService.DataPost('/v1/diskon/', payload)
  }

  public getAllAvailableDiskon() {
    return this.landaService.DataGet('/v1/diskon/available')
  }

  public getDiskonByCustomer(id) {
    return this.landaService.DataGet('/v1/diskon/' + id)
  }
}
