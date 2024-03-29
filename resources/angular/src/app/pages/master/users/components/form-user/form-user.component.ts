import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Component, Input, OnInit, Output, SimpleChange, EventEmitter } from '@angular/core';

import { LandaService } from 'src/app/core/services/landa.service';
import { RoleService } from '../../../roles/services/role-service.service';
import { UserService } from '../../services/user-service.service';

@Component({
    selector: 'user-form',
    templateUrl: './form-user.component.html',
    styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {
    @Input() userId: number;
    @Output() afterSave  = new EventEmitter<boolean>();
    mode: string;
    listAkses: [];
    fileToUpload: File = null;
    formModel : {
        id: number,
        nama: string,
        akses: {
            id: number,
            nama: string
        },
        foto: string,
        fotoUrl: string,
        email: string,
        password: string,
        user_roles_id: number
    }
    cardImageBase64: string = null;

    constructor(
        private userService: UserService,
        private roleService: RoleService,
        private landaService: LandaService
    ) {}

    ngOnInit(): void {
       this.getRole();
    }
    
    ngOnChanges(changes: SimpleChange) {
        this.emptyForm();
    }

    emptyForm() {
        this.mode = 'add';
        this.formModel = {
            id: 0,
            nama: '',
            akses: {
                id: 0,
                nama: ''
            },
            foto: '',
            fotoUrl: '',
            email: '',
            password: '',
            user_roles_id: 0
        }

        if (this.userId > 0) {
            this.mode = 'edit';
            this.getUser(this.userId);
        }
    }

    save() {
        // set akses id
        this.formModel.user_roles_id = this.formModel.akses.id; 
        this.formModel.fotoUrl = this.cardImageBase64;
        console.log(this.formModel);
        if(this.mode == 'add') {
            this.userService.createUser(this.formModel).subscribe((res : any) => {
                this.landaService.alertSuccess('Berhasil', res.message);
                this.afterSave.emit();
            }, err => {
                this.landaService.alertError('Mohon Maaf', err.error.errors);
            });
        } else {
            this.userService.updateUser(this.formModel).subscribe((res : any) => {
                this.landaService.alertSuccess('Berhasil', res.message);
                this.afterSave.emit();
            }, err => {
                this.landaService.alertError('Mohon Maaf', err.error.errors);
            });
        }
    }

    getRole() {
        this.roleService.getRoles([]).subscribe((res: any) => {
            this.listAkses = res.data.list;
        }, err => {
            console.log(err);
        })
    }

    getUser(userId) {
        this.userService.getUserById(userId).subscribe((res: any) => {
            this.formModel = res.data;
        }, err => {
            console.log(err);
        });
    }

    onFileChange($event) {
        this.fileToUpload = $event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
                const imgBase64Path = e.target.result;
                this.cardImageBase64 = imgBase64Path;
            }
        }
        reader.readAsDataURL(this.fileToUpload);
    }

}
