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

    formModel: {
        id: number,
        nama: string,
        email: string,
        password: string,
        user_roles_id: number,
        akses: any,
        fotoUrl: string,
    }

    cardImageBase64: string = null;

    passwordModel = {
        password: '',
        password_confirmation: ''
    }

    aksesModel = {
        id: 0,
        nama: '',
    }

    constructor(
        private authService: AuthService,
        private roleService: RoleService,
        private userService: UserService,
        private landaService: LandaService
    ) { }

    getProfile() {
        this.authService.getProfile().subscribe(
            (res: any) => {
                this.userLogin = res;
            }
        );
    }

    ngOnInit(): void {
        this.getProfile();
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

    checkPassword() {
        if (this.passwordModel.password != this.passwordModel.password_confirmation) {
            this.landaService.alertError('Error', 'Password tidak sama');
            return false;
        } else {
            return true;
        }
    }

    submit() {
        if (this.checkPassword() == true) {
            this.formModel = {
                id: this.userLogin.id,
                nama: this.userLogin.nama,
                email: this.userLogin.email,
                password: this.userLogin.password,
                user_roles_id: this.aksesModel.id,
                akses: this.aksesModel,
                fotoUrl: this.cardImageBase64
            }
            this.userService.updateUser(this.formModel).subscribe(
                (res: any) => {
                    this.landaService.alertSuccess('Berhasil', res.message);
                    window.location.reload();
                }, (err: any) => {
                    this.landaService.alertError('Error', err.error.message);
                }
            );
        }
    }
}
