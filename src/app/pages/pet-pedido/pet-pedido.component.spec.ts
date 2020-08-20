import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetPedidoComponent } from './pet-pedido.component';

describe('PetPedidoComponent', () => {
  let component: PetPedidoComponent;
  let fixture: ComponentFixture<PetPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetPedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
