import { Injectable } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  constructor(
    private landaService: LandaService,
  ) { }

  getVoucher(payload) {
    return this.landaService.DataGet('/v1/voucher', payload);
  }

  getAvailableVoucher() {
    return this.landaService.DataGet('/v1/promo_voucher');
  }

  getAllCustomer() {
    return this.landaService.DataGet('/v1/voucher/customer');
  }

  createVoucher(payload) {
    return this.landaService.DataPost('/v1/voucher', payload);
  }
}
