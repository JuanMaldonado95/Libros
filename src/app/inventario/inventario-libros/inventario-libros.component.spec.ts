import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioLibrosComponent } from './inventario-libros.component';

describe('InventarioLibrosComponent', () => {
  let component: InventarioLibrosComponent;
  let fixture: ComponentFixture<InventarioLibrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventarioLibrosComponent]
    });
    fixture = TestBed.createComponent(InventarioLibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
