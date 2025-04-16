import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyFieldsFormComponent } from './study-fields-form.component';

describe('StudyFieldsFormComponent', () => {
  let component: StudyFieldsFormComponent;
  let fixture: ComponentFixture<StudyFieldsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyFieldsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudyFieldsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
