import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

import { User } from './user';
import { Account } from './account';
import { RepeatingTransaction } from './repeating-transaction';
import { Transaction } from './transaction';
import { SavingsPlan } from './savings-plan';

import { Observable } from 'rxjs';

import { RRule } from 'rrule';

@Injectable()
export class PersistenceService {

  constructor(private afs: AngularFirestore) { }

  /**
   * @param user
   *    Der Nutzer, dessen Konto erstellt oder verändert werden soll.
   * @param account
   *    Konto-Objekt, das persistiert werden soll.
   */
  setAccount(user: User, account: Account) {
    if (!account.uid) {
      account.uid = this.afs.createId();
    }
    this.afs.collection('users/' + user.uid + '/accounts').doc(account.uid).set(account);
  }

  /**
   * @param user
   *    Der Nutzer, dessen Konten ausgegeben werden sollen.
   * @returns
   *    Observable eines Arrays von Konten
   */
  getAccounts(user: User): Observable<Account[]> {
    return this.afs.collection<Account>('users/' + user.uid + '/accounts').valueChanges();
  }

  /**
   * @param user
   *    Der Nutzer, dessen Konto ausgegeben werden soll.
   * @returns
   *    Observable des angeforderten Kontos
   */
  getAccount(user: User, accountUid: string): Observable<Account> {
    return this.afs.doc<Account>('users/' + user.uid + '/accounts/' + accountUid).valueChanges();
  }

  /**
   * @param user
   *    Der Nutzer, für den eine Transaktion erstellt oder geändert werden soll.
   * @param transaction
   *    Die Transaktion, die persistiert werden soll.
   */
  setTransaction(user: User, transaction: Transaction) {
    // Wenn die Transaktion noch nicht in der Datenbank vorhanden ist, besitzt sie noch keine ID,
    // in diesem Fall wird ihr eine ID zugewiesen.
    if (!transaction.uid) {
      transaction.uid = this.afs.createId();
    }
    this.afs.collection('users/' + user.uid + '/accounts/' + transaction.accountUid + '/transactions')
      .doc(transaction.uid).set(transaction);
  }

  /**
   * @param user
   *    Nutzer, dessen Transaktion gelöscht werden soll
   * @param accountUid
   *    ID, des Kontos, aus dem die Transaktion gelöscht werden soll
   * @param transactionUid
   *    ID der Transaktion, die gelöscht werden soll
   */
  async deleteTransaction(user: User, accountUid: string, transactionUid: string) {
    const account = await this.getAccount(user, accountUid).first().toPromise();
    const transaction = await this.getTransaction(user, account, transactionUid).first().toPromise();
    // Wenn die Transaktion bereits durchgeführt worden ist, wird sie annuliert. Daher muss der Saldo angepasst werden.
    if (transaction.executionDate < new Date()) {
      account.balance -= transaction.amount;
      this.setAccount(user, account);
    }
    this.afs.collection('users/' + user.uid + '/accounts/' + accountUid + '/transactions').doc(transactionUid).delete();
  }

  /**
   * @param user
   *    Nutzer, dessen Transaktionen ausgegeben werden sollen.
   * @param account
   *    Konto, aus dem die Transaktionen ausgegeben werden sollen.
   * @returns
   *    Observable einer Liste von Transaktionen
   */
  getTransactions(user: User, account: Account): Observable<Transaction[]> {
    return this.afs.collection<Transaction>('users/' + user.uid + '/accounts/' + account.uid + '/transactions').valueChanges();
  }

  /**
   * @param user
   *    Nutzer, dessen Transaktion ausgegeben werden soll.
   * @param account
   *    Konto, aus dem die Transaktion ausgegeben werden soll.
   * @param transactionUid
   *    ID der Transaktion, die ausgegeben werden soll.
   * @returns
   *    Observable einer Transaktion
   */
  getTransaction(user: User, account: Account, transactionUid: string): Observable<Transaction> {
    return this.afs.doc<Transaction>('users/' + user.uid + '/accounts/' + account.uid + '/transactions/' + transactionUid).valueChanges();
  }

  /**
   * @param user
   *    Nutzer, dessen Transaktionen ausgegeben werden sollen.
   * @param account
   *    Konto, aus dem die Transaktionen ausgegeben werden sollen
   * @param date
   *    Frühestes Ausführdatum der auszugebenen Transaktionen
   * @returns
   *    Observable einer Liste von Transaktionen
   */
  getTransactionsSince(user: User, account: Account, date: Date): Observable<Transaction[]> {
    return this.afs.collection<Transaction>(
      'users/' + user.uid + '/accounts/' + account.uid + '/transactions', ref => ref.where('executionDate', '>=', date)
    ).valueChanges();
  }

  /**
   * @param user
   *    Nutzer, für den der Sparplan erstellt oder verändert werden soll
   * @savingsPlan
   *    Sparplan-Objekt, das persistiert werden soll
   * @rrule?
   *    RRule, die die Sparintervalle angibt. Notwendig, wenn der Sparplan neu erstellt werden soll
   */
  setSavingsPlan(user: User, savingsPlan: SavingsPlan, rrule?: RRule) {
    // Wenn ein neuer Sparplan erstellt wird, werden entsprechend der RRule Transaktionen generiert und persistiert.
    if (!savingsPlan.transactionUids || savingsPlan.transactionUids.length === 0) {
      savingsPlan.transactionUids = [];
      rrule.all().forEach(date => {
        const transaction = {
          uid: this.afs.createId(),
          purpose: savingsPlan.purpose,
          amount: Math.round(savingsPlan.amount * 100.0 / rrule.all().length) / 100,
          creationDate: new Date(),
          executionDate: date,
          category: 'SAVING',
          accountUid: savingsPlan.accountUid
        };
        this.setTransaction(user, transaction);
        savingsPlan.transactionUids.push(transaction.uid);
      });
    }
    // Wenn der Sparplan noch nicht in der Datenbank vorhanden ist, besitzt er noch keine ID,
    // in diesem Fall wird ihm eine ID zugewiesen.
    if (!savingsPlan.uid) {
      savingsPlan.uid = this.afs.createId();
    }
    this.afs.collection('users/' + user.uid + '/savingsPlans')
      .doc(savingsPlan.uid).set(savingsPlan);
  }

  /**
   * @param user
   *    Nutzer, dessen Sparplan ausgegeben werden soll
   * @param savingsPlanUid
   *    ID, des Sparplans, der ausgegeben werden soll
   * @returns
   *    Observable eines Sparplans
   */
  getSavingsPlan(user: User, savingsPlanUid: string): Observable<SavingsPlan> {
    return this.afs.collection('users/' + user.uid + '/savingsPlans').doc<SavingsPlan>(savingsPlanUid).valueChanges();
  }

  /**
   * @param user
   *    Nutzer dessen Sparpläne ausgegeben werden sollen
   * @returns
   *    Observable einer Liste von Sparplänen
   */
  getSavingsPlans(user: User): Observable<SavingsPlan[]> {
    return this.afs.collection<SavingsPlan>('users/' + user.uid + '/savingsPlans').valueChanges();
  }

  /**
   * @param user
   *    Nutzer, dessen Sparplan gelöscht werden soll
   * @param savingsPlanUid
   *    ID, des Sparplans, der gelöscht werden soll
   */
  async deleteSavingsPlan(user: User, savingsPlanUid: string) {
    const savingsPlan = await this.getSavingsPlan(user, savingsPlanUid).first().toPromise();
    const account = await this.getAccount(user, savingsPlan.accountUid).first().toPromise();
    const now = new Date();
    
    // Zunächst die noch nicht ausgeführten Transaktionen des Sparplans löschen
    for (let transactionUid of savingsPlan.transactionUids.reverse()) {
      let transaction = await this.getTransaction(user, account, transactionUid).first().toPromise();
      // Falls die Transaktion bereits gelöscht wurde, weiter machen. TODO: Kann man feiner lösen.
      if (!transaction) {
        continue;
      }
      // Sobald eine Transaktion gefunden wurde, die bereits durchgeführt worden ist, abbrechen.
      if (transaction.executionDate <= now) {
        console.log('continue');
        break;
      }
      this.deleteTransaction(user, transaction.accountUid, transaction.uid);
    }

    this.afs.collection('users/' + user.uid + '/savingsPlans').doc(savingsPlan.uid).delete();
  }

  /**
   * @param user
   *    Nutzer, für den eine wiederholende Transaktion erstellt oder geändert werden soll
   * @param repeatingTransaction
   *    Objekt, das die wiederholende Transaktion repräsentiert, die persistiert werden soll.
   */
  setRepeatingTransaction(user: User, repeatingTransaction: RepeatingTransaction, rrule?: RRule) {

    // Wenn eine neue wiederholende Transaktion erstellt wird, werden entsprechend der RRule Transaktionen generiert und persistiert.
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
        this.setTransaction(user, transaction);
        repeatingTransaction.transactionUids.push(transaction.uid);
      });
    }
    // Wenn die wiederholende Transaktion noch nicht in der Datenbank vorhanden ist, besitzt sie noch keine ID,
    // in diesem Fall wird ihr eine ID zugewiesen.
    if (!repeatingTransaction.uid) {
      repeatingTransaction.uid = this.afs.createId();
    }
    this.afs.collection('users/' + user.uid + '/accounts/' + repeatingTransaction.accountUid + '/repeatingTransactions')
      .doc(repeatingTransaction.uid).set(repeatingTransaction);
  }

  /**
   * @param user
   *    Nutzer, dessen wiederholende Transaktionen ausgegeben werden sollen
   * @param account
   *    Konto, aus dem die wiederholenden Transaktionen ausgegeben werden sollen
   * @returns
   *    Observable einer Liste von wiederholenden Transaktionen
   */
  getRepeatingTransactions(user: User, account: Account): Observable<RepeatingTransaction[]> {
    return this.afs.collection<RepeatingTransaction>('users/' + user.uid + '/accounts/' + account.uid + '/repeatingTransactions')
      .valueChanges();
  }
}
