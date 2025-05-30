import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MateriaListPage } from './materia-list.page';

describe('MateriaListPage', () => {
  let component: MateriaListPage;
  let fixture: ComponentFixture<MateriaListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MateriaListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
