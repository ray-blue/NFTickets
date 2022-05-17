import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-buy-crypto-transak',
  templateUrl: './buy-crypto-transak.component.html',
  styles: [
  ]
})
export class BuyCryptoTransakComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit(): void {
  }

  back(){
    this.modalController.dismiss()
  }

}
