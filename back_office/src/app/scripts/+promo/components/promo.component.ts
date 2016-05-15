import {Component, OnInit} from 'angular2/core';
import {DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {PromoService} from '../../shared/promo.service';

import * as moment from 'moment';


@Component({
  selector: 'promos',
  templateUrl: 'scripts/+promo/components/promo.component.html',
  providers: [PromoService],
  directives: [DATEPICKER_DIRECTIVES],
  pipes: []
})
export class PromoCmp implements OnInit{
  private editPromo: any;
  private promos: any;
  private minDate: any = new Date();

  constructor(private promo_service: PromoService){
  }

  ngOnInit() {
    this.getPromotions();
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
