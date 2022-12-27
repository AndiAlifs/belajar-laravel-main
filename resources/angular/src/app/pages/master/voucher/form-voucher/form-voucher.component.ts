import { Component, OnInit } from '@angular/core';
import { VoucherService } from '../voucher.service';
import { LandaService } from 'src/app/core/services/landa.service';

@Component({
  selector: 'form-voucher',
  templateUrl: './form-voucher.component.html',
  styleUrls: ['./form-voucher.component.scss']
})
export class FormVoucherComponent implements OnInit {

  availableVoucher: any;
  allCustomer: any;

  formModel = {
    id: 0,
    id_promo: 0,
    nominal: 0,
  }

  constructor(
    private voucherService: VoucherService,
    private LandaService: LandaService
  ) { }

  ngOnInit(): void {
    this.voucherService.getAvailableVoucher().subscribe((res: any) => {
      this.availableVoucher = res.data;
    }, (error) => {
      this.LandaService.alertError("Terjadi Kesalahan", error.message);
    });

    
  }

  updateNominal() {
    this.formModel.nominal = this.availableVoucher.find(x => x.id_promo == this.formModel.id_promo).nominal;
  }

  save() {
    console.log(this.formModel);
  }
}
