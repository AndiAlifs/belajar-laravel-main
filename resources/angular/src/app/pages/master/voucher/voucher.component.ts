import { Component, OnInit } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';
import { VoucherService } from './voucher.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-voucher',
    templateUrl: './voucher.component.html',
    styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnInit {

    listVoucher: any;
    titleModal: string;

    constructor(
        private LandaService: LandaService,
        private voucherService: VoucherService,
        private fb: FormBuilder,
        private modalService: NgbModal
    ) { }

    ngOnInit(): void {
        this.getData();
    }

    addVoucher(modal) {
        this.titleModal = 'Tambah Voucher';
        this.modalService.open(modal, { size: 'lg', backdrop: 'static' });
    }

    getData() {
        this.voucherService.getVoucher().subscribe((res: any) => {
            this.listVoucher = res.data;
        }, (error) => {
            this.LandaService.alertError("Terjadi Kesalahan", error.message);
        });
    }
}
