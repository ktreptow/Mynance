import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from 'angularfire2/firestore';

import {User} from './user';
import {Account} from './account';
import { RepeatingTransaction } from './repeating-transaction';
import {Transaction} from './transaction';
import {SavingsPlan} from './savings-plan';

import {Observable} from 'rxjs';

import {RRule, RRuleSet, rrulestr} from 'rrule';

@Injectable()
export class PersistenceService {

  constructor(private afs: AngularFirestore) {}

  addAccount(user: User, account: Account) {
    this.afs.collection('users/' + user.uid + '/accounts').doc((account.uid ? account.uid : this.afs.createId())).set(account);
  }

  getAccounts(user: User): Observable<Account[]> {
    return this.afs.collection<Account>('users/' + user.uid + '/accounts').valueChanges();
  }

  getAccount(user: User, accountUid: string): Observable<Account> {
    return this.afs.doc<Account>('users/' + user.uid + '/accounts/' + accountUid).valueChanges();
  }

  addTransaction(user: User, transaction: Transaction) {
    this.afs.collection('users/' + user.uid + '/accounts/' + transaction.accountUid + '/transactions')
      .doc((transaction.uid ? transaction.uid : this.afs.createId())).set(transaction);
  }

  getTransactions(user: User, account: Account): Observable<Transaction[]> {
    return this.afs.collection<Transaction>('users/' + user.uid + '/accounts/' + account.uid + '/transactions').valueChanges();
  }

  getTransaction(user: User, account: Account, transactionUid: string): Observable<Transaction> {
    return this.afs.doc<Transaction>('users/' + user.uid + '/accounts/' + account.uid + '/transactions/' + transactionUid).valueChanges();
  }

  getTransactionsSince(user: User, account: Account, date: Date): Observable<Transaction[]> {
    return this.afs.collection<Transaction>(
      'users/' + user.uid + '/accounts/' + account.uid + '/transactions', ref => ref.where('executionDate', '>=', date)
    ).valueChanges();
  }

  addSavingsPlan(user: User, savingsPlan: SavingsPlan, rrule?: RRule) {
    if (!savingsPlan.transactionUids) {
      savingsPlan.transactionUids = [];
      rrule.all().forEach(date => {
        const transaction = {
          uid: this.afs.createId(),
          purpose: savingsPlan.purpose,
          amount:  Math.round(savingsPlan.amount * 100.0 / rrule.all().length) / 100,
          creationDate: new Date(),
          executionDate: date,
          category: 'SAVING',
          accountUid: savingsPlan.accountUid
        };
        this.addTransaction(user, transaction);
        savingsPlan.transactionUids.push(transaction.uid);
      });
    }
    this.afs.collection('users/' + user.uid + '/savingsPlans')
      .doc(savingsPlan.uid ? savingsPlan.uid : this.afs.createId()).set(savingsPlan);
  }

  getSavingsPlans(user: User): Observable<SavingsPlan[]> {
    return this.afs.collection<SavingsPlan>('users/' + user.uid + '/savingsPlans').valueChanges();
  }

  addRepeatingTransaction(user: User, repeatingTransaction: RepeatingTransaction, rrule?: RRule) {
    if (!repeatingTransaction.transactionUids || repeatingTransaction.transactionUids.length === 0) {
      repeatingTransaction.transactionUids = [];
      rrule.all().forEach(date => {
        const transaction = {
          uid: this.afs.createId(),
          purpose: repeatingTransaction.purpose,
          amount: repeatingTransaction.amount,
          creationDate: new Date(),
          executionDate: date,
          category: repeatingTransaction.category,
          accountUid: repeatingTransaction.accountUid
        };
        this.addTransaction(user, transaction);
        repeatingTransaction.transactionUids.push(transaction.uid);
      });
    }
    this.afs.collection('users/' + user.uid + '/accounts/' + repeatingTransaction.accountUid + '/repeatingTransactions')
      .doc(repeatingTransaction.uid ? repeatingTransaction.uid : this.afs.createId()).set(repeatingTransaction);
  }

  getRepeatingTransactions(user: User, account: Account): Observable<RepeatingTransaction[]> {
    return this.afs.collection<RepeatingTransaction>('users/' + user.uid + '/accounts/' + account.uid + '/repeatingTransactions')
      .valueChanges();
  }
}
