import { Injectable } from "@angular/core";
import { Transaction } from "./transaction";
import { RepeatingTransaction } from "./repeating-transaction";
import { Account } from '../core/account';
import { User } from '../core/user';
import { SavingsPlan } from '../core/savings-plan';


@Injectable({
    providedIn: 'root'
})

export class DataPassing {
    account: Account;
    transaction: Transaction;
    repeatingTransaction: RepeatingTransaction;
    user: User;
    savingsplan: SavingsPlan
}