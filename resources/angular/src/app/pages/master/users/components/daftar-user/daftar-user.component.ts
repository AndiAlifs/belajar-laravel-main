import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LandaService } from 'src/app/core/services/landa.service';
import Swal from 'sweetalert2';

import { UserService } from '../../services/user-service.service';

@Component({
    selector: 'user-daftar',
    templateUrl: './daftar-user.component.html',
    styleUrls: ['./daftar-user.component.scss']
})
export class DaftarUserComponent implements OnInit {

    listUser: [];
    titleModal: string;
    modelId: number;
    findUser: string;
    findEmail: string;

    pagination = {
        nowPage: 1,
        totalData: 0,
    }

    
    constructor(
        private userService: UserService,
        private landaService: LandaService,
        private modalService: NgbModal,
    ) { }

    ngOnInit(): void {
        this.getUser();

    }

    trackByIndex(index: number): any {
        return index;
    }

    getUser() {
        this.findUser = '';
        this.findEmail = '';
        this.userService.getUsers({
            page: this.pagination.nowPage,
        }).subscribe((res: any) => {
            this.listUser = res.data.list;
            this.pagination.totalData = res.data.meta.total;
        }, (err: any) => {
            console.log(err);
        });
    }

    createUser(modal) {
        this.titleModal = 'Tambah User';
        this.modelId = 0;
        this.modalService.open(modal, { size: 'lg', backdrop: 'static' });
    }

    pencarianUser(modal) {
        this.titleModal = 'Pencarian User';
        this.modelId = 0;
        this.modalService.open(modal, { size: 'lg', backdrop: 'static' });
    }

    updateUser(modal, userModel) {
        this.titleModal = 'Edit User: ' + userModel.nama;
        this.modelId = userModel.id;
        this.modalService.open(modal, { size: 'lg', backdrop: 'static' });
    }

    deleteUser(userId) {
        Swal.fire({
            title: 'Apakah kamu yakin ?',
            text: 'User ini tidak dapat login setelah kamu menghapus datanya',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#34c38f',
            cancelButtonColor: '#f46a6a',
            confirmButtonText: 'Ya, Hapus data ini !',
        }).then((result) => {
            if (result.value) {
                this.userService.deleteUser(userId).subscribe((res: any) => {
                    this.landaService.alertSuccess('Berhasil', res.message);
                    this.getUser();
                }, err => {
                    console.log(err);
                });
            }
        });
    }

    findUserByFilter() {
        this.userService.getUsers({
            nama: this.findUser,
            email: this.findEmail
        }).subscribe((res: any) => {
            this.listUser = res.data.list;
        }, (err: any) => {
            console.log(err);
        });
    }

    onPaginationChange(page) {
        this.pagination.nowPage = page;
        this.getUser();
    }
}
