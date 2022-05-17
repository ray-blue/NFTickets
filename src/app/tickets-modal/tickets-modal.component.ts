import { Component, Input, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { TicketCard } from '../../models/ticket-card.model';
import { MinterService } from '../../services/minter.service';
import { UserTicketService } from '../../services/user-tickets.service';

@Component({
  selector: 'app-tickets-modal',
  templateUrl: './tickets-modal.component.html',
  styleUrls: [],
})
export class TicketsModalComponent implements OnInit {
  @Input() category: string;
  @Input() ticket: TicketCard;

  title = "Details";

  constructor(private modalController: ModalController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private userTicketService: UserTicketService,
    private minterService: MinterService) { }

  ngOnInit(): void {
  }

  async closeModal(){
    await this.modalController.dismiss();
  }

  async showProgress(){
    let loading = await this.loadingController.create(
      {
        message: "Minting your NFTicket... Please wait.",
        spinner: "bubbles",
        backdropDismiss: false,
        duration: 3000
      }
    )
    await loading.present()
  }

  async showAlert(){
    let alert = await this.alertController.create(
      {
        header: "Yay!",
        message: `Your NFTicket for: ${this.ticket.event} has been minted and added to your wallet.`,
        buttons: ["Ok"],
        backdropDismiss: false
      }
    )
    await alert.present()
  }

  onClick(){
    this.showProgress()
    this.minterService.nftMintExpress().subscribe(async res => {
      console.log(res)
      this.userTicketService.addUserTicket(this.ticket)
      this.showAlert()
      this.closeModal()
      }
    )
  }

}
