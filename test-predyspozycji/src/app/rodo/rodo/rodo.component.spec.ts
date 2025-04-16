import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RodoComponent } from './rodo.component';

describe('RodoComponent', () => {
  let component: RodoComponent;
  let fixture: ComponentFixture<RodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RodoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
