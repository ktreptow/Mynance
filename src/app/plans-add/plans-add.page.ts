import { Component } from '@angular/core';
import { RRule, RRuleSet, rrulestr } from 'rrule';
import { Moment } from 'moment';
import { PersistenceService } from '../core/persistence.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-plans-add',
  templateUrl: './plans-add.page.html',
  styleUrls: ['./plans-add.page.scss'],
  providers: [PersistenceService]
})
export class PlansAddPage {

  inputForm = new FormGroup({
    gesamtbetrag: new FormControl({ value: '', disabled: false }),
    intervall: new FormControl({ value: '', disabled: false })
  });

  tag;
  monat;
  jahr;
  myDate;


  constructor(
    private persistenceService: PersistenceService,
    private router: Router,
    private alertCtrl: AlertController,
    private moment: Moment
  ) { }


  async presentSavingsPlan() {
    const gesamtbetrag = this.inputForm.value['gesamtbetrag'];
    const intervall = this.inputForm.value['intervall'];

    const alert = await this.alertCtrl.create({
      header: 'Diesen Sparplan hinzufügen?',
      message: 'Gesamtbetrag: ' + gesamtbetrag + '\nEnddatum: ' + this.tag + this.monat + this.jahr + '\nIntervall: ' + intervall,
      buttons: [
        {
          text: 'Abbrechen',
          handler: (cancel) => {
            console.log("Abbrechen gedrückt");
          }
        },
        {
          text: 'OK',
          handler: (submit) => {
            console.log("Submit gedrückt");
          }
        }]
    });
    await alert.present();
  }

  updateMyDate($event) {
    this.tag = $event.day.value;
    this.monat = $event.month.value;
    this.jahr = $event.year.value;
  }

  addSavingsPlan() {

    this.router.navigate(["/tabs/(plans:plans)"]);
  }

  ngOnInit() {
  }

}
