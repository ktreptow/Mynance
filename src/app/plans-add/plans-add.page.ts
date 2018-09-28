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
    /**
     * Hier wird der momentan angemeldete User und darüber alle diesem User
     * zugehörigen Konten abgerufen und in Variablen gespeichert
     */
    authService.user.subscribe((user) => {
      this.user = user;
      persistenceService.getAccounts(this.user).subscribe((kontoList) => {
        this.kontoList = kontoList;
      })

    });
  }
  //Verbindung zwischen Inputfeldern auf der Oberfläche und der Logik
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

  /**
   * Nach der Berechnung der einzelnen Transaktionen werden die Eckdaten
   * des Sparplans als Alert angezeigt. Dieser kann entweder abgelehnt oder bestätigt werden. 
   * Bei einer Bestätigung wird der Sparplan über den Persistence-Service in die 
   * Datenbank geschrieben und die zugehörigen Transaktionen erstellt. 
   * Anschließend wird man auf die Sparplan-Übersichtsseite weitergeleitet.
   */
  async presentSavingsPlan() {
    //Speichern der Werte aus den Eingabefeldern der Oberfläche in Variablen
    const gesamtbetrag: number = this.inputForm.value['gesamtbetrag'];
    const intervall: number = this.inputForm.value['intervall'];
    const konto: Account = this.inputForm.value['konto'];
    const beschreibung: string = this.inputForm.value['beschreibung'];
    const startDatum: Date = new Date(Date.UTC(this.jahr, (this.monat - 1), this.tag, 12, 0, 0));
    // Die RRule dient der Berechnung von wiederkehrenden Terminen
    this.rule = new RRule({
      freq: RRule.MONTHLY,
      interval: +intervall,
      count: 0,
      until: startDatum
    })
    //Die Länge des Arrays aller Termine entspricht der Transaktionen, die für den Sparplan nötig sind
    const anzahlSparen = this.rule.all().length;
    const monatlSparen = Math.round(gesamtbetrag * 100.0 / anzahlSparen) / 100;

    const accountName: String = (await this.persistenceService.getAccount(this.user, konto.uid).first().toPromise()).name;

    const alert = await this.alertCtrl.create({
      header: 'Diesen Sparplan hinzufügen?',
      message: '<p>Konto: ' + accountName + '</p><p>Beschreibung: ' + beschreibung + '</p><p>Gesamtbetrag: ' + gesamtbetrag + '</p><p>Enddatum: ' + this.myDate + '</p><p>Intervall: ' + intervall + '</p><p>Wie oft: ' + anzahlSparen + '</p><p>Betrag pro Intervall: ' + monatlSparen + '</p>',
      buttons: [
        {
          text: 'Abbrechen',
          handler: (cancel) => {
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

            this.persistenceService.setSavingsPlan(this.user, savingsPlan, this.rule);
            this.router.navigateByUrl("/tabs/(plans:plans)");
          }
        }]
    });
    await alert.present();
  }
  /**
   * Sobald das Datum in der Oberfläche geändert wird, werden auch die Variablen erneuert
   * @param $event Das zu verarbeitende Event
   */
  updateMyDate($event) {

    this.jahr = $event.year.value;
    this.monat = $event.month.value;
    this.tag = $event.day.value;
    this.myDate = moment([$event.year.value, ($event.month.value - 1), $event.day.value]).toDate();
  }
}
