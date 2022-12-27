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

    pagination = {
        nowPage: 1,
        totalData: 0,
    };

    findStr = '';

    constructor(
        private diskonService: DiskonService,
        private form: FormsModule,
        private landaService: LandaService
    ) { }

    ngOnInit(): void {
        this.getCustomer();

        this.diskonService.getAllAvailableDiskon().subscribe((res: any) => {
            this.allDiskon = res.data;
        }, (err: any) => {
            console.log(err);
        });
    }

    getCustomer() {
        this.diskonService.getIndex({
            page: this.pagination.nowPage,
            nama: this.findStr
        }).subscribe((res: any) => {
            this.allCustomer = res.data.customer;
            this.pagination.totalData = res.data.meta.total;

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
            this.landaService.alertSuccess('Berhasil', res.message);
        }, (err: any) => {
            console.log(err);
        }
        )
    }

    onPaginationChange(event) {
        this.pagination.nowPage = event;
        this.getCustomer();
    }

    onSearch(event) {
        console.log(event);
        this.getCustomer();
    }
}
