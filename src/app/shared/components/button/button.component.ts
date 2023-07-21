import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'costume-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() public type: 'submit' | 'reset' | 'button' = 'button';
  @Input() public disabled: boolean = false;
  @Input() public title: string = 'submit';
  @ViewChild('btn') private button!: ElementRef<HTMLButtonElement>;

  constructor(private renderer: Renderer2, private host: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.disable();
  }

  public set_style_on_mouse_event(event?: string): void {
    if (!this.disabled) {
      switch (event) {
        case 'mousedown':
          this.renderer.removeClass(this.button.nativeElement, 'mouseenter');
          this.renderer.addClass(this.button.nativeElement, 'mousedown');
          break;
        case 'mouseup':
          this.renderer.removeClass(this.button.nativeElement, 'mousedown');
          this.renderer.addClass(this.button.nativeElement, 'mouseenter');
          break;
        case 'mouseenter':
          this.renderer.addClass(this.button.nativeElement, 'mouseenter');
          break;
        case 'mouseleave':
          this.renderer.removeClass(this.button.nativeElement, 'mouseenter');
      }
    } else {
      this.renderer.addClass(this.button.nativeElement, 'disabled_animation');
      setTimeout(() => {
        this.renderer.removeClass(
          this.button.nativeElement,
          'disabled_animation'
        );
      }, 400);
    }
  }

  private disable() {
    if (this.disabled)
      this.renderer.addClass(this.button.nativeElement, 'disabled');
  }
}
