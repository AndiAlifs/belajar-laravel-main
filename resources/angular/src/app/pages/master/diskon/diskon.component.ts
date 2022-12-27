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
            this.allCustomer = res.customer;

            this.allCustomer.forEach(cust => {
                this.diskonService.getDiskonByCustomer(cust.id_user).subscribe((res: any) => {
                    cust.diskon = res.data;
                }, (err: any) => {
                    console.log(err);
                });
            });
            
        }, (err: any) => {
            console.log(err);
        });

        this.diskonService.getAllAvailableDiskon().subscribe((res: any) => {
            this.allDiskon = res.data;
        }, (err: any) => {
            console.log(err);
        });
    }

    checkIfDiskonIncluded(diskon, diskonList) {
        try {
            let allIds = diskonList.map(diskon => diskon.id_promo);
            return allIds.includes(diskon.id_promo);
        }
        catch (err) {
            return false;
        }
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
