import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription, map } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { unsubscribe } from 'src/app/shared/utils/unsubscriber';
import { SettingsService } from '../../services/settings.service';

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

  constructor(
    private sharedServ: SharedService,
    private settingsServ: SettingsService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.get_user();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    unsubscribe(this.subscriptions);
  }

  private get_user() {
    let subscription = this.sharedServ
      .get_user_by_token()
      .pipe(
        map((user: any) => {
          return {
            ...user,
            birth_date: new Date(user.date_of_birth).toLocaleDateString(),
          };
        })
      )
      .subscribe((user) => (this.user = user));
    this.subscriptions.push(subscription);
  }

  private show_profile_image(image: string) {
    this.renderer.removeClass(
      this.image_container.nativeElement,
      'account-image'
    );
    this.renderer.addClass(this.image_container.nativeElement, 'profile-image');
    this.renderer.setStyle(
      this.image_container.nativeElement,
      'background-image',
      `url(${image})`
    );
 
  }

  display_image() {
    const profilePic: HTMLInputElement = this.profile_pic.nativeElement;
    const file_reader: FileReader = new FileReader();

    file_reader.readAsDataURL(profilePic.files![0]);

    file_reader.onload = () => {
      this.show_profile_image(String(file_reader.result));
    };
  }

  update_user() {
    this.user = this.update_user_form.value;
    let subscription = this.settingsServ.update_user(this.user).subscribe();
    this.subscriptions.push(subscription);
  }
}
