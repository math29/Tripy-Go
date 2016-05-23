import {Component, OnInit, OnDestroy} from '@angular/core';
import {DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {PromoService} from '../../shared/promo.service';
import { SocketService } from '../../services/socket.service';

import * as moment from 'moment';
import * as _ from 'lodash';


@Component({
  selector: 'promos',
  styleUrls: ['scripts/+promo/components/promo.component.css'],
  templateUrl: 'scripts/+promo/components/promo.component.html',
  providers: [PromoService],
  directives: [DATEPICKER_DIRECTIVES],
  pipes: []
})
export class PromoCmp implements OnInit{
  private editPromo: any;
  private promos: any;
  private minDate: any = new Date();

  constructor(private promo_service: PromoService,private socketService: SocketService){
  }

  ngOnInit() {
    this.getPromotions();
    this.socketService.addListener('promo:save');
    this.socketService.addListener('promo:remove');

    this.socketService.socketObservable$.subscribe(updateCompany => {
      let response = updateCompany;
      switch(response.channel){
        case 'promo:save':
          this.onPromoSave(response.data);
          break;
        case 'promo:remove':
          this.onPromoRemove(response.data);
          break;
        default:

      }
    });
  }

  onPromoSave(data:any) {
    data.promo = _.find(this.promos, { '_id': data.promo });
    let index = this.findPromoIndex(data._id);

    if(index > -1){
      this.promos[index] = data;
    }else{
    this.promos.push(data);
    }
  }

  notifyFb(){
    this.promo_service.notifyFb().subscribe(success => {}, error => {});
  }

  /**
   * Retourne l'index d'une entreprise dans la liste des entreprises
   *
   * @param id: id de l'entreprise à trouver
   *
   * @return index: index de l'entreprise ou -1 si non trouvée
   */
  findPromoIndex(id:string):number{
    for(let i = 0; i < this.promos.length; i++){
      if(this.promos[i]._id == id){
        return i;
      }
    }
    return -1;
  }

  onPromoRemove(data:any) {
    for(let i = 0; i < this.promos.length; i++){
      if(this.promos[i]._id == data._id){
        this.promos.splice(i,1);
        break;
      }
    }
  }

  ngOnDestroy(){
    this.socketService.removeListener('promo:remove', 'promo:save');
  }

  createPromo() {
    this.editPromo = {
      type: "Transports",
      url: "",
      vendor: "",
      discount: 0,
      initial_price: 0,
      end_date: new Date(),
      img: "",
      active: true,
      archived: false
    }
  }

  savePromo() {
    // delete clicks to reduce transfers time
    delete this.editPromo.clicks;
    console.log(this.editPromo);
    this.promo_service.savePromo(this.editPromo).subscribe(success => {
      console.log('OK');
      this.editPromo = null;
    }, error => {
      console.log('fail');
    })
  }

  archivePromo(promo: any) {
      this.promo_service.archivePromo(promo._id).subscribe(success => {
        this.onPromoRemove(promo);
      }, error => {

      })
  }

  /**
   * Edit a promotion
   *
   * @param promo: promotion to edit or {} to create a new one
   */
  editAPromo(promo) {
    this.editPromo = promo;
  }

  getPromotions() {
    this.promo_service.getPromos().subscribe(
      success => {
          this.promos = success;
      },
      error => {
        alert('error');
      }
    );
  }

}
