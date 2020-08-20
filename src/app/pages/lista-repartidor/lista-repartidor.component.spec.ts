import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRepartidorComponent } from './lista-repartidor.component';

describe('ListaRepartidorComponent', () => {
  let component: ListaRepartidorComponent;
  let fixture: ComponentFixture<ListaRepartidorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaRepartidorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaRepartidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
