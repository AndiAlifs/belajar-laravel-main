import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { RoleService } from '../roles/services/role-service.service';
import { UserService } from '../users/services/user-service.service';
import { LandaService } from 'src/app/core/services/landa.service';
@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    userLogin;
    fileToUpload: File;
    listAkses = [];

    formModel : {
        id: number,
        nama: string,
        email: string,
        password: string,
        user_roles_id: number,
        akses: any
    }

    aksesModel ={
        id: 0,
        nama: '',
    }

    constructor(
        private authService: AuthService,
        private roleService: RoleService,
        private userService: UserService,
        private landaService: LandaService
    ) { }

    ngOnInit(): void {
        this.authService.getProfile().subscribe(
            (res: any) => {
                this.userLogin = res;
            }
        );
        this.roleService.getRoles([]).subscribe(
            (res: any) => {
                this.listAkses = res.data.list;
                this.listAkses.forEach(element => {
                    if (element.nama == this.userLogin.akses)
                        this.aksesModel = element;
                });
            }
        );
    }

    onFileChange(event) {
        this.fileToUpload = event.target.files[0];
    }

    submit() {
        this.formModel = {
            id: this.userLogin.id,
            nama: this.userLogin.nama,
            email: this.userLogin.email,
            password: this.userLogin.password,
            user_roles_id: this.aksesModel.id,
            akses : this.aksesModel
        }
        this.userService.updateUser(this.formModel).subscribe(
            (res: any) => {
                this.authService.getProfile().subscribe(
                    (res: any) => {
                        this.userLogin = res;
                    }
                );
                this.landaService.alertSuccess('Berhasil', res.message);
            }, (err: any) => {
                this.landaService.alertError('Error', err.error.message);
            }
        );

    }
}
