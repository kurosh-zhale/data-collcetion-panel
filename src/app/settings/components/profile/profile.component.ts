import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription, map } from 'rxjs';
import { unsubscribe } from 'src/app/shared/utils/unsubscriber';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @ViewChild('profileInput') profile_pic!: ElementRef;
  @ViewChild('output') image_container!: ElementRef;

  update_user_form = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    birth_date: new FormControl(''),
    phone: new FormControl(''),
    fax: new FormControl(''),
  });

  static = true;

  user: any;

  subscriptions: Subscription[] = [];

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    unsubscribe(this.subscriptions);
  }
}
