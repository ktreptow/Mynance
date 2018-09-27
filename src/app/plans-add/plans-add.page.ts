import { Component } from '@angular/core';
import { RRule } from 'rrule';

import * as moment from 'moment';
import { PersistenceService } from '../core/persistence.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-plans-add',
  templateUrl: './plans-add.page.html',
  styleUrls: ['./plans-add.page.scss'],
})
export class PlansAddPage {

  inputForm = new FormGroup({
    gesamtbetrag: new FormControl({ value: '', disabled: false }),
    intervall: new FormControl({ value: '', disabled: false })
  });

  tag
  monat
  jahr

  myDate: Date;
  rule: RRule;

  constructor(
    private persistenceService: PersistenceService,
    private router: Router,
    private alertCtrl: AlertController,
  ) { }


  async presentSavingsPlan() {
    const gesamtbetrag = this.inputForm.value['gesamtbetrag'];
    const intervall = this.inputForm.value['intervall'];

    console.log(moment().toISOString());
    console.log(this.myDate.toISOString());

    this.rule = new RRule({
      freq: RRule.MONTHLY,
      interval: +intervall,
      count: 0,
      until: new Date(Date.UTC(this.jahr, (this.monat - 1), this.tag, 12, 0, 0))
    })

    const anzahlSparen = this.rule.all().length;

    const monatlSparen = Math.round(gesamtbetrag * 100.0 / anzahlSparen) / 100;

    const alert = await this.alertCtrl.create({
      header: 'Diesen Sparplan hinzufügen?',
      message: '<p>Gesamtbetrag: ' + gesamtbetrag + '</p><p>Enddatum: ' + this.myDate + '</p><p>Intervall: ' + intervall + '</p><p>Wie oft: ' + anzahlSparen + '</p><p>Betrag pro Intervall: ' + monatlSparen + '</p>',
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

    this.jahr = $event.year.value;
    this.monat = $event.month.value;
    this.tag = $event.day.value;
    this.myDate = moment([$event.year.value, ($event.month.value - 1), $event.day.value]).toDate();
  }

  addSavingsPlan() {

    this.router.navigate(["/tabs/(plans:plans)"]);
  }

  ngOnInit() {
  }

}
