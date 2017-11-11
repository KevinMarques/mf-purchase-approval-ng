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
    @ViewChild('newPurchaseModal') public modalNewPurchase: ModalDirective;
    @ViewChild('showDetailModal') public modalPurchaseDetail: ModalDirective;

    public purchases: Array<Purchase> = [];
    public newPurchase: Purchase = new Purchase();
    public newItem: Item = new Item();
    public listLoading = true;
    public selectedPurchase: Purchase;
    public creatingNewPurchase = false;

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

    showNewPurchaseModal() {
        this.modalNewPurchase.show();
    }

    showPurchaseDetailModal(purchase: Purchase) {
        this.selectedPurchase = purchase;
        this.modalPurchaseDetail.show();
    }

    addItem() {
        if (!this.newPurchase.items) {
            this.newPurchase.items = new Array<Item>();
        }
        this.newPurchase.items.push(this.newItem);
        this.newItem = new Item();
    }

    confirmNewPurchase() {
        this.creatingNewPurchase = true;
        this.api.post('/purchase/', this.newPurchase).then(response => {
            this.modalNewPurchase.hide();
            this.resetNewPurchase();
            this.getPurchases();
        });
    }

    resetNewPurchase() {
        this.newPurchase = new Purchase();
        this.creatingNewPurchase = false;
    }
}
