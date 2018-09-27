import { Component } from '@angular/core';
import { SavingsPlan } from '../core/savings-plan';
import { User } from '../core/user';
import { PersistenceService } from '../core/persistence.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../core/auth.service';
import 'rxjs/add/operator/first';

interface UISavingPlan {
  uid: string,
  purpose: string;
  amount: number;
  kontoName: String;
}

@Component({
  selector: 'app-plans',
  templateUrl: './plans.page.html',
  styleUrls: ['./plans.page.scss'],
})

export class PlansPage {

  savingPlansList: UISavingPlan[] = [];
  user: User;

  constructor(private persistenceService: PersistenceService, private authService: AuthService, private alertCtrl: AlertController) {
    authService.user.subscribe((user) => {
      this.user = user;
      if (user) {
        persistenceService.getSavingsPlans(user).subscribe(async (savingsPlans: SavingsPlan[]) => {
          this.savingPlansList = [];
          for (let savingPlan of savingsPlans) {
            const accountName: String = (await persistenceService.getAccount(this.user, savingPlan.accountUid).first().toPromise()).name;
            const uiSavingPlan: UISavingPlan = {
              uid: savingPlan.uid,
              purpose: savingPlan.purpose,
              amount: savingPlan.amount,
              kontoName: accountName
            }
            this.savingPlansList.push(uiSavingPlan);
          }
        });
      }
    });
  }

  async delete(planUid: string) {
    const alert = await this.alertCtrl.create({
      header: 'Diesen Sparplan wirklich löschen?',
      buttons: [
        {
          text: 'Abbrechen',
          handler: (cancel) => {
          }
        },
        {
          text: 'OK',
          handler: (submit) => {
            this.persistenceService.deleteSavingsPlan(this.user, planUid);
          }
        }]
    });
    await alert.present();

  }

}
