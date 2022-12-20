import { Component, OnInit } from '@angular/core';
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
    ) { }

    ngOnInit(): void {
        this.diskonService.getFirst().subscribe((res: any) => {
            this.allDiskon = res.diskon;
            this.allCustomer = res.customer;
            console.log(this.allCustomer);
        }, (err: any) => {
            console.log(err);
        }
        )
    }

    checkIfDiskonIncluded(diskon, diskonList){
        let allIds = diskonList.map((item) => {return item.id_promo; });
        return allIds.includes(diskon.id_promo);
    }

}
