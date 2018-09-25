import { Component, OnInit } from '@angular/core';
import { RRule, RRuleSet, rrulestr } from 'rrule';
import { PersistenceService } from '../core/persistence.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plans-add',
  templateUrl: './plans-add.page.html',
  styleUrls: ['./plans-add.page.scss'],
  providers: [PersistenceService]
})
export class PlansAddPage implements OnInit {

  constructor(
    private persistenceService: PersistenceService,
    private router: Router
  ) { }


  addSavingsPlan() {
    this.router.navigate(["/tabs/(plans:plans)"]);
  }

  ngOnInit() {
  }

}
