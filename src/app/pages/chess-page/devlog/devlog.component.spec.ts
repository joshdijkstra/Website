import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevlogComponent } from './devlog.component';

describe('DevlogComponent', () => {
  let component: DevlogComponent;
  let fixture: ComponentFixture<DevlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevlogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
