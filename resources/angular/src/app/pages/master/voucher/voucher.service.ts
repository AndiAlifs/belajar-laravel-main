import { Injectable } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  constructor(
    private landaService: LandaService,
  ) { }

  getVoucher() {
    return this.landaService.DataGet('/v1/voucher');
  }

  getAvailableVoucher() {
    return this.landaService.DataGet('/v1/promo_voucher');
  }
}
