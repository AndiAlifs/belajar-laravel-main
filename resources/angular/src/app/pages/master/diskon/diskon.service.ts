import { Injectable } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';

@Injectable({
  providedIn: 'root'
})
export class DiskonService {

  constructor(
    private landaService: LandaService,
  ) { }

  public getFirst() {
    return this.landaService.DataGet('/v1/diskon')
  }

  public updateDiskonStatus(payload) {
    return this.landaService.DataPost('/v1/diskon/', payload)
  }
}
