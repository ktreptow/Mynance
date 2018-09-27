import { Component } from '@angular/core';
import { SavingsPlan } from '../core/savings-plan';
import { User } from '../core/user';
import { PersistenceService } from '../core/persistence.service';
import { AuthService } from '../core/auth.service';
import 'rxjs/add/operator/first';

interface UISavingPlan {
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

  constructor(private persistenceService: PersistenceService, private authService: AuthService) {
    authService.user.subscribe((user) => {
      this.user = user;
      if (user) {
        persistenceService.getSavingsPlans(user).subscribe(async (savingsPlans: SavingsPlan[]) => {
          this.savingPlansList = [];
          for (let savingPlan of savingsPlans) {
            const accountName: String = (await persistenceService.getAccount(this.user, savingPlan.accountUid).first().toPromise()).name;
            const uiSavingPlan: UISavingPlan = {
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

}
