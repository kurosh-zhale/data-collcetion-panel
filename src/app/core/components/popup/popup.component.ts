import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PopupService } from '../../services/popup.service';
import { Subscription } from 'rxjs';
import { Popup } from '../../models/popup.model';
import { NavigationStart, Router } from '@angular/router';
import { unsubscribe } from 'src/app/shared/utils/unsubscriber';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {
  @ViewChild('popup_container')
  public popup_container!: ElementRef<HTMLDivElement>;

  public popup_list: Popup[] = [];

  private subscriptions: Subscription[] = [];

  constructor(public popupServ: PopupService, private router: Router) {}

  ngOnInit(): void {
    this.subscribeToPopups();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    unsubscribe(this.subscriptions);
  }

  private subscribeToPopups() {
    const popup_subscription: Subscription = this.popupServ.popup.subscribe(
      (popup: Popup) => {
        if (popup.message) {
          this.popup_list.push(popup);
        }

        if (popup.options?.autoClose) {
          this.set_popup_timer(popup);
        }

        if (!popup.options?.keepAfterRouteChange) {
          const router_subscription: Subscription =
            this.router.events.subscribe((event) => {
              if (event instanceof NavigationStart) {
                this.close_popup(popup);
              }
            });
          this.subscriptions.push(router_subscription);
        }
      }
    );

    this.subscriptions.push(popup_subscription);
  }

  close_popup(popup: Popup) {
    document.getElementById(popup.id)?.classList.remove('appear');
    document.getElementById(popup.id)?.classList.add('disappear');

    setTimeout(() => {
      this.popup_list = this.popup_list.filter((x) => x.id !== popup.id);
    }, 500);
  }

  private set_popup_timer(popup: Popup) {
    setTimeout(() => {
      this.close_popup(popup);
    }, 5300);
  }
}
