import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

import { LandaService } from 'src/app/core/services/landa.service';
import { ItemService } from '../../services/item.service';

@Component({
    selector: 'item-daftar',
    templateUrl: './daftar-item.component.html',
    styleUrls: ['./daftar-item.component.scss']
})
export class DaftarItemComponent implements OnInit {

    listItems: [];
    titleCard: string;
    modelId: number;
    isOpenForm: boolean = false;

    findItem: string = '';

    pagination = {
        nowPage: 1,
        totalData: 0,
    };

    constructor(
        private itemService: ItemService,
        private landaService: LandaService,
        private modalService: NgbModal
    ) { }

    ngOnInit(): void {
        this.getItem();
    }

    trackByIndex(index: number): any {
        return index;
    }

    getItem() {
        this.itemService.getItems({
            page: this.pagination.nowPage
        }).subscribe((res: any) => {
            this.listItems = res.data.list;
            this.pagination.totalData = res.data.meta.total;
        }, (err: any) => {
            console.log(err);
        });
    }

    findItemByFilter() {
        this.itemService.getItems({
            nama: this.findItem
        }).subscribe((res: any) => {
            this.listItems = res.data.list;
        },(err: any) => {
            console.log(err);
            }
        );
    }

    showForm(show) {
        this.isOpenForm = show;
    }

    showModal(modal) {
        this.modalService.open(modal, { size: 'lg', backdrop: 'static' });
    }

    createItem() {
        this.titleCard = 'Tambah Item';
        this.modelId = 0;
        this.showForm(true);
    }

    updateItem(itemModel) {
        this.titleCard = 'Edit Item: ' + itemModel.nama;
        this.modelId = itemModel.id;
        this.showForm(true);
    }

    deleteItem(userId) {
        Swal.fire({
            title: 'Apakah kamu yakin ?',
            text: 'Item tidak dapat melakukan pesanan setelah kamu menghapus datanya',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#34c38f',
            cancelButtonColor: '#f46a6a',
            confirmButtonText: 'Ya, Hapus data ini !',
        }).then((result) => {
            if (result.value) {
                this.itemService.deleteItem(userId).subscribe((res: any) => {
                    this.landaService.alertSuccess('Berhasil', res.message);
                    this.getItem();
                }, err => {
                    console.log(err);
                });
            }
        });
    }

    onPaginationChange(event) {
        this.pagination.nowPage = event;
        this.getItem();
    }

}
