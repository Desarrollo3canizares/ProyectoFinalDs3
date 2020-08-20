import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarPedidosAdminComponent } from './asignar-pedidos-admin.component';

describe('AsignarPedidosAdminComponent', () => {
  let component: AsignarPedidosAdminComponent;
  let fixture: ComponentFixture<AsignarPedidosAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarPedidosAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarPedidosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
