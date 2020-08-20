import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEntRepartidorComponent } from './detalle-ent-repartidor.component';

describe('DetalleEntRepartidorComponent', () => {
  let component: DetalleEntRepartidorComponent;
  let fixture: ComponentFixture<DetalleEntRepartidorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleEntRepartidorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleEntRepartidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
