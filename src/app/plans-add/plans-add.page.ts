import { Component } from '@angular/core';
import { RRule } from 'rrule';
import * as moment from 'moment';
import { PersistenceService } from '../core/persistence.service';
import { AuthService } from '../core/auth.service';
import { User } from '../core/user';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Account } from '../core/account';
import { SavingsPlan } from '../core/savings-plan';

@Component({
  selector: 'app-plans-add',
  templateUrl: './plans-add.page.html',
  styleUrls: ['./plans-add.page.scss'],
})
export class PlansAddPage {

  kontoList: Account[];
  user: User;

  constructor(
    private persistenceService: PersistenceService,
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
  ) {
    authService.user.subscribe((user) => {
      this.user = user;
      persistenceService.getAccounts(this.user).subscribe((kontoList) => {
        this.kontoList = kontoList;
      })

    });
  }

  inputForm = new FormGroup({
    konto: new FormControl({ value: '', disabled: false }),
    gesamtbetrag: new FormControl({ value: '', disabled: false }),
    beschreibung: new FormControl({ value: '', disabled: false }),
    intervall: new FormControl({ value: '', disabled: false })
  });


  tag
  monat
  jahr

  myDate: Date;
  rule: RRule;

  async presentSavingsPlan() {
    const gesamtbetrag: number = this.inputForm.value['gesamtbetrag'];
    const intervall: number = this.inputForm.value['intervall'];
    const konto: Account = this.inputForm.value['konto'];
    const beschreibung: string = this.inputForm.value['beschreibung'];
    const startDatum: Date = new Date(Date.UTC(this.jahr, (this.monat - 1), this.tag, 12, 0, 0));

    this.rule = new RRule({
      freq: RRule.MONTHLY,
      interval: +intervall,
      count: 0,
      until: startDatum
    })

    const anzahlSparen = this.rule.all().length;

    const monatlSparen = Math.round(gesamtbetrag * 100.0 / anzahlSparen) / 100;

    const alert = await this.alertCtrl.create({
      //TODO Ausgabe anpassen
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
            const savingsPlan: SavingsPlan = {
              accountUid: konto.uid,
              amount: gesamtbetrag,
              endDate: this.myDate,
              purpose: beschreibung,
              startDate: startDatum,
            }

            this.persistenceService.addSavingsPlan(this.user, savingsPlan, this.rule);
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
