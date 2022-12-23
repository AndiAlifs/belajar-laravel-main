import { Component, OnInit } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';
import { VoucherService } from './voucher.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-voucher',
    templateUrl: './voucher.component.html',
    styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnInit {

    listVoucher: any;

    constructor(
        private LandaService: LandaService,
        private voucherService: VoucherService,
        private fb: FormBuilder,
    ) { }

    ngOnInit(): void {
        this.getData();
    }

    getData() {
        this.voucherService.getVoucher().subscribe((res: any) => {
            this.listVoucher = res.data;
            console.log(this.listVoucher);
        }, (error) => {
            this.LandaService.alertError("Terjadi Kesalahan", error.message);
        });
    }
}
