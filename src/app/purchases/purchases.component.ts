import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Purchase } from '../purchase';
import { Item } from '../item';
import { ApiService } from '../services/api.service';
import { DatePipe } from '@angular/common';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalDirective } from 'ngx-bootstrap/modal/index';

import { trigger, state, animate, style, transition } from '@angular/animations'

@Component({
    selector: 'app-purchases',
    templateUrl: './purchases.component.html',
    styleUrls: ['./purchases.component.scss'],
    animations: [
        trigger('fadeIn', [
            transition(':enter', [
                style({ opacity: '0' }),
                animate('.6s ease-out', style({ opacity: '1' })),
            ]),
        ]),
    ]
})
export class PurchasesComponent implements OnInit {
    @ViewChild('newPurchaseModal') public modal: ModalDirective;
    @ViewChild('showDetailModal') public modalDetail: ModalDirective;

    public purchases: Array<Purchase> = [];
    modalRef: BsModalRef;
    public newPurchase: Purchase = new Purchase();
    public newItem: Item = new Item();
    public listLoading = true;
    public selectedPurchase: Purchase;

    constructor(public api: ApiService, private modalService: BsModalService) {
    }

    ngOnInit() {
        this.getPurchases();
    }

    getPurchases() {
        this.api.get('/purchase/').then(response => {
            this.listLoading = false;
            // Sort purchases by date
            this.purchases = response['purchases'].sort(function (a, b) {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
        });
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    showPurchaseDetailModal(purchase: Purchase) {
        this.selectedPurchase = purchase;
        this.modalDetail.show();
    }

    addItem() {
        if (!this.newPurchase.items) {
            this.newPurchase.items = new Array<Item>();
        }
        this.newPurchase.items.push(this.newItem);
        this.newItem = new Item();
    }

    confirmNewPurchase() {
        this.api.post('/purchase/', this.newPurchase).then(response => {
            this.modal.hide();
            this.getPurchases();
        });
    }
}
