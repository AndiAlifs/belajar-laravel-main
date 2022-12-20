import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LandaService } from 'src/app/core/services/landa.service';
import { PromoService } from './promo.service';

@Component({
    selector: 'app-promo',
    templateUrl: './promo.component.html',
    styleUrls: ['./promo.component.scss']
})
export class PromoComponent implements OnInit {

    formModel = {
        nama: '',
        type: '',
        nominal: null,
        diskon: null,
        kadaluarsa: 0,
        syarat_ketentuan: '',
        foto: ''
    };

    constructor(
        private formBuilder: FormBuilder,
        private promoService: PromoService,
        private landaService: LandaService
    ) { }

    ngOnInit(): void {
    }

    emptyForm() {
        this.formModel = {
            nama: '',
            type: '',
            nominal: null,
            diskon: null,
            kadaluarsa: 0,
            syarat_ketentuan: '',
            foto: ''
        };
    }

    save() {
        this.promoService.createPromo(this.formModel).subscribe((res:any) => {
            this.landaService.alertSuccess('Berhasil', res.message);
            this.emptyForm();
        }, err => {
            console.log(err);
        }
        );
    }

}
