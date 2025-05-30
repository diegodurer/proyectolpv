import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MateriaEditPage } from './materia-edit.page';

describe('MateriaEditPage', () => {
  let component: MateriaEditPage;
  let fixture: ComponentFixture<MateriaEditPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MateriaEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
