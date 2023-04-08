import {
  Component,
  OnInit,
  Input,
  ViewContainerRef,
  ViewChild,
  ComponentFactory,
} from '@angular/core';
import { DynamicComponentDirective } from '../../directives/dynamic-component.directive';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @ViewChild(DynamicComponentDirective, { static: true })
  private host!: DynamicComponentDirective;

  private modal: HTMLElement | null = null;

  private isOpen: boolean = false;

  private listener: any;

  get opend(): boolean {
    return this.isOpen;
  }

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.modal = document.getElementById('modal');
    this.stop_modal_propagation();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.modal?.removeEventListener('click', this.listener);
  }

  private stop_modal_propagation() {
    this.listener = this.modal?.addEventListener('click', (ev: MouseEvent) =>
      ev.stopPropagation()
    );
  }

  private load_component(component: any) {
    const viewContainerRef: ViewContainerRef = this.host.viewContainerRef;

    viewContainerRef.createComponent<DynamicComponentDirective>(component);
  }

  private destroy_component() {
    const viewContainerRef: ViewContainerRef = this.host.viewContainerRef;

    viewContainerRef.clear();
  }

  open(component: any | undefined = undefined) {
    this.isOpen = true;
    if (component) this.load_component(component);
  }

  close() {
    this.isOpen = false;
    setTimeout(() => this.destroy_component(), 300);
  }
}
