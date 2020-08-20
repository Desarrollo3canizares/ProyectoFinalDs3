import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPedidosAdminComponent } from './list-pedidos-admin.component';

describe('ListPedidosAdminComponent', () => {
  let component: ListPedidosAdminComponent;
  let fixture: ComponentFixture<ListPedidosAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPedidosAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPedidosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
