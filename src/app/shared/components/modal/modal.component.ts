import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { DynamicComponentDirective } from '../../directives/dynamic-component.directive';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @ViewChild(DynamicComponentDirective, { static: true })
  private host!: DynamicComponentDirective;

  @ViewChild('modal') private modal!:ElementRef<HTMLDivElement>;

  private isOpen: boolean = false;

  private listener: any;

  get opend(): boolean {
    return this.isOpen;
  }

  constructor(private renderer:Renderer2) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.stop_modal_propagation();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.modal.nativeElement.removeEventListener('click', this.listener);
  }

  private stop_modal_propagation() {
    this.listener = this.modal.nativeElement.addEventListener('click',(ev)=>{
      ev.stopPropagation();
    });
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
