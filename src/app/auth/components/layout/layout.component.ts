import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import { unsubscribe } from 'src/app/shared/utils/unsubscriber';
import { getLocaleMonthNames } from '@angular/common';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  @ViewChild('container') private container!: ElementRef<HTMLDivElement>;

  public route_link!: string;
  private subscriptions: Subscription[] = [];

  constructor(private renderer: Renderer2, private router: Router) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.set_router();
    this.change_router();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.change_background();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.change_background(false);
    unsubscribe(this.subscriptions);
  }

  private change_background(mode: boolean = true) {
    let i: number = Math.floor(Math.random() * 10);
    if (i > 5 || i === 0) i = 1;

    this.renderer.addClass(this.container.nativeElement, `background-${i}`);
    const Interval = setInterval(() => {
      if (mode) {
        i === 5 || i === 0 ? (i = 1) : i++;
        this.renderer.addClass(this.container.nativeElement, `background-${i}`);
        this.renderer.removeClass(
          this.container.nativeElement,
          i === 1 ? 'background-5' : `background-${i - 1}`
        );
      } else {
        clearInterval(Interval);
      }
    }, 30000);
  }

  private set_router() {
    switch (this.router.url.split('/')[2]) {
      default:
        this.route_link = 'login';
        break;
      case 'login':
        this.route_link = 'register';
        break;
      case 'register':
      case 'forgot-password':
        this.route_link = 'login';
        break;
    }
  }

  private change_router() {
    let subscription: Subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.set_router();
      }
    });
    this.subscriptions.push(subscription);
  }
}
