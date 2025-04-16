import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyFieldsSelectComponent } from './study-fields-select.component';

describe('StudyFieldsCreateComponent', () => {
  let component: StudyFieldsSelectComponent;
  let fixture: ComponentFixture<StudyFieldsSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyFieldsSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudyFieldsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
