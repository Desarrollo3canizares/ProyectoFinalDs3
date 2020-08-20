import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductosAdminComponent } from './list-productos-admin.component';

describe('ListProductosAdminComponent', () => {
  let component: ListProductosAdminComponent;
  let fixture: ComponentFixture<ListProductosAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProductosAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
