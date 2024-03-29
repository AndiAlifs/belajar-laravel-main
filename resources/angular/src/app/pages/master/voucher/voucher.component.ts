import { Component, OnInit } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';
import { VoucherService } from './voucher.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-voucher',
    templateUrl: './voucher.component.html',
    styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnInit {

    listVoucher: any;
    titleModal: string;
    modelId: number = 0;

    pagination = {
        nowPage: 1,
        totalData: 0,
    };

    constructor(
        private LandaService: LandaService,
        private voucherService: VoucherService,
        private fb: FormBuilder,
        private modalService: NgbModal
    ) { }

    ngOnInit(): void {
        this.getData();
    }

    editVoucher(modal, id_voucher) {
        this.titleModal = 'Edit Voucher';
        this.modelId = id_voucher;
        this.modalService.open(modal, { size: 'lg', backdrop: 'static' });
    }

    addVoucher(modal) {
        this.titleModal = 'Tambah Voucher';
        this.modelId = 0;
        this.modalService.open(modal, { size: 'lg', backdrop: 'static' });
    }

    getData() {
        this.voucherService.getVoucher({
            page: this.pagination.nowPage
        }).subscribe((res: any) => {
            this.listVoucher = res.data.list;
            this.pagination.totalData = res.data.meta.total;
        }, (error) => {
            this.LandaService.alertError("Terjadi Kesalahan", error.message);
        });
    }

    onPaginationChange(event) {
        this.pagination.nowPage = event;
        this.getData();
    }

    deleteVoucher(id_voucher) {
        Swal.fire({
            title: 'Apakah Anda Yakin?',
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.voucherService.deleteVoucher(id_voucher).subscribe((res: any) => {
                    this.LandaService.alertSuccess('Berhasil', 'Data berhasil dihapus');
                    this.getData();
                }, (error) => {
                    this.LandaService.alertError("Terjadi Kesalahan", error.message);
                });
            }
        });
    }
}
