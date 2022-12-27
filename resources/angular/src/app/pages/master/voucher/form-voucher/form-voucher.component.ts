import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { VoucherService } from '../voucher.service';
import { LandaService } from 'src/app/core/services/landa.service';

@Component({
    selector: 'form-voucher',
    templateUrl: './form-voucher.component.html',
    styleUrls: ['./form-voucher.component.scss']
})
export class FormVoucherComponent implements OnInit {
    @Input() voucherId: any;
    @Output() afterSave = new EventEmitter<boolean>();

    availableVoucher: any;
    allCustomer: any;

    formModel = {
        model_id: 0,
        id_promo: 0,
        id_user: 0,
        nominal: 0,
        periode_mulai: '',
        periode_selesai: '',
    }

    constructor(
        private voucherService: VoucherService,
        private LandaService: LandaService
    ) { }

    emptyForm() {
        this.formModel = {
            model_id: 0,
            id_promo: 0,
            id_user: 0,
            nominal: 0,
            periode_mulai: '',
            periode_selesai: '',
        }
    }

    ngOnInit(): void {

        this.voucherService.getAvailableVoucher().subscribe((res: any) => {
            this.availableVoucher = res.data;
        }, (error) => {
            this.LandaService.alertError("Terjadi Kesalahan", error.message);
        });

        this.voucherService.getAllCustomer().subscribe((res: any) => {
            this.allCustomer = res.data;
        }, (error) => {
            this.LandaService.alertError("Terjadi Kesalahan", error.message);
        });

        if (this.voucherId != 0) {
            this.formModel.model_id = this.voucherId;
            this.voucherService.getVoucherById(this.formModel.model_id).subscribe((res: any) => {
                this.formModel = res.data;
                console.log(this.formModel);
            }, (error) => {
                this.LandaService.alertError("Terjadi Kesalahan", error.message);
            });
        } else {
            this.emptyForm();
        }


    }

    updateNominal() {
        this.updateDateSelesai();
        this.formModel.nominal = this.availableVoucher.find(x => x.id_promo == this.formModel.id_promo).nominal;
    }

    updateUser() {
        this.formModel.id_user = this.allCustomer.find(x => x.id_user == this.formModel.id_user).id_user;
    }

    updateDateSelesai() {
        if (this.formModel.id_promo != 0 && this.formModel.periode_mulai != '') {
            let waktuKadaluarsa = this.availableVoucher.find(x => x.id_promo == this.formModel.id_promo).kadaluarsa;
            let periodeMulai = new Date(this.formModel.periode_mulai);
            let periodeSelesai = new Date(periodeMulai);
            periodeSelesai.setDate(periodeSelesai.getDate() + waktuKadaluarsa);
            this.formModel.periode_selesai = periodeSelesai.toISOString().slice(0, 10);
        }
    }

    save() {
        console.log(this.formModel);
        this.voucherService.createVoucher(this.formModel).subscribe((res: any) => {
            this.LandaService.alertSuccess("Berhasil", "Voucher berhasil dibuat");
            this.afterSave.emit();
        }
            , (error) => {
                this.LandaService.alertError("Terjadi Kesalahan", error.message);
            }
        );
    }
}
