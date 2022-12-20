import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss']
})
export class PromoComponent implements OnInit {

  formModel = {
    nama: '',
    type: '',
    nominal: 0,
    diskon: 0,
    kadaluarsa: 0,
    syarat_ketentuan: '',
    foto: ''
  };

  constructor() { }

  ngOnInit(): void {
  }

  save() {
    console.log(this.formModel);
  }

}
