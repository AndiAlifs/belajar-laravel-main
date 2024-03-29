import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';
import { ItemService } from '../../services/item.service';

@Component({
    selector: 'item-form',
    templateUrl: './form-item.component.html',
    styleUrls: ['./form-item.component.scss']
})
export class FormItemComponent implements OnInit {
    @Input() itemId: number;
    @Output() afterSave  = new EventEmitter<boolean>();
    mode: string;
    formModel : {
        id: number,
        nama: string,
        kategori: string,
        harga: number,
        deskripsi: string,
        foto: string,
        fotoUrl: string,
        is_available: number,
        detail: [
            {
                id: number,
                m_item_id: number,
                keterangan: string,
                tipe: string,
                harga: number,
            }
        ]
    };
    listTipeDetail: any;
    noImageLink = 'http://127.0.0.1:8000/assets/img/no-image.png';

    fileToUpload: File = null;
    cardImageBase64: string = null;

    constructor(
        private itemService: ItemService,
        private landaService: LandaService
    ) {}

    ngOnInit(): void {
        
    }
    
    ngOnChanges(changes: SimpleChange) {
        this.emptyForm();
    }

    emptyForm() {
        this.mode = 'add';
        this.formModel = {
            id: 0,
            nama: '',
            kategori: '',
            harga: 0,
            deskripsi: '',
            foto: this.noImageLink,
            fotoUrl: '',
            is_available: 1,
            detail: [
                {
                    id: 0,
                    m_item_id: 0,
                    keterangan: '',
                    tipe: 'topping',
                    harga: 0,
                }
            ]
        }
        this.listTipeDetail = [
            {
                id: 'level',
                nama: 'Level'
            },
            {
                id: 'topping',
                nama: 'Topping'
            }
        ];

        if (this.itemId > 0) {
            this.mode = 'edit';
            this.getItem(this.itemId);
        }
    }

    save() {
        if(this.fileToUpload != null) {
            this.formModel.fotoUrl = this.cardImageBase64;
        }
        if(this.mode == 'add') {
            this.itemService.createItem(this.formModel).subscribe((res : any) => {
                this.landaService.alertSuccess('Berhasil', res.message);
                this.afterSave.emit();
            }, err => {
                this.landaService.alertError('Mohon Maaf', err.error.errors);
            });
        } else {
            this.itemService.updateItem(this.formModel).subscribe((res : any) => {
                this.landaService.alertSuccess('Berhasil', res.message);
                this.afterSave.emit();
            }, err => {
                this.landaService.alertError('Mohon Maaf', err.error.errors);
            });
        }
    }

    getItem(itemId) {
        this.itemService.getItemById(itemId).subscribe((res: any) => {
            this.formModel = res.data;
            if(this.formModel.foto == null) {
                this.formModel.foto = this.noImageLink;
            }
        }, err => {
            console.log(err);
        });
    }

    addDetail() {
        const newDet = {
            id: 0,
            m_item_id: this.formModel.id,
            keterangan: '',
            tipe: 'topping',
            harga: 0
        };
        this.formModel.detail.push(newDet);
    }

    removeDetail(detail, paramIndex) {
        detail.splice(paramIndex, 1);
    }

    trackByIndex(index: number): any {
        return index;
    }

    back() {
        this.afterSave.emit();
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
