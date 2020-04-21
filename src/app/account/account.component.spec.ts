import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountComponent } from './account.component';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Account Setting `, () => {
    const fixture = TestBed.createComponent(AccountComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('account setting');
  });
});
