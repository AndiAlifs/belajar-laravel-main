import { Injectable } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';

@Injectable({
  providedIn: 'root'
})
export class PromoService {

  constructor(
    private landaService: LandaService
    ) { }
    
    createPromo(payload) {
      return this.landaService.DataPost('/v1/promo', payload);
    }
}
