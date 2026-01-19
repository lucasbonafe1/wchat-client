import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessComponent } from './acess.component';

describe('AcessComponent', () => {
  let component: AcessComponent;
  let fixture: ComponentFixture<AcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
