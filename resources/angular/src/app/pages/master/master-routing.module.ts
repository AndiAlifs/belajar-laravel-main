import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DaftarCustomerComponent } from './customers/components/daftar-customer/daftar-customer.component';
import { DaftarItemComponent } from './items/components/daftar-item/daftar-item.component';
import { DaftarRolesComponent } from './roles/components/daftar-roles/daftar-roles.component';
import { DaftarUserComponent } from './users/components/daftar-user/daftar-user.component';
import { ProfileComponent } from './profile/profile.component';
import { DiskonComponent } from './diskon/diskon.component';
import { PromoComponent } from './promo/promo.component';
import { VoucherComponent } from './voucher/voucher.component';

const routes: Routes = [
    { path: 'users', component: DaftarUserComponent },
    { path: 'roles', component: DaftarRolesComponent },
    { path: 'customers', component: DaftarCustomerComponent },
    { path: 'items', component: DaftarItemComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'diskon', component: DiskonComponent },
    { path: 'promo', component: PromoComponent },
    { path: 'voucher', component: VoucherComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MasterRoutingModule { }
