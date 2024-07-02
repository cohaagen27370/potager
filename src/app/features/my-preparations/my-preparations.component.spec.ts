import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPreparationsComponent } from './my-preparations.component';

describe('MyPreparationsComponent', () => {
  let component: MyPreparationsComponent;
  let fixture: ComponentFixture<MyPreparationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPreparationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPreparationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
