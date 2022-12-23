import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LandaService } from 'src/app/core/services/landa.service';
import { DiskonService } from './diskon.service';

@Component({
    selector: 'app-diskon',
    templateUrl: './diskon.component.html',
    styleUrls: ['./diskon.component.scss']
})
export class DiskonComponent implements OnInit {

    allDiskon: any = [];
    allCustomer: any = [];

    constructor(
        private diskonService: DiskonService,
        private form: FormsModule,
        private landaService: LandaService
    ) { }

    ngOnInit(): void {
        this.diskonService.getFirst().subscribe((res: any) => {
            this.allDiskon = res.diskon;
            this.allCustomer = res.customer;
        }, (err: any) => {
            console.log(err);
        }
        )
    }

    checkIfDiskonIncluded(diskon, diskonList) {
        let allIds = diskonList.map((item) => { return item.id_promo; });
        return allIds.includes(diskon.id_promo);
    }

    changeValue(event, diskon, customer) {
        let payload = {
            status: event.target.checked,
            id_promo: diskon.id_promo,
            id_user: customer.id_user
        }
        this.diskonService.updateDiskonStatus(payload).subscribe((res: any) => {
            console.log(res);
            this.landaService.alertSuccess('Berhasil', res.message);
        }, (err: any) => {
            console.log(err);
        }
        )
    }
}
