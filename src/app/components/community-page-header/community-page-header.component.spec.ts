import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityPageHeaderComponent } from './community-page-header.component';

describe('CommunityPageHeaderComponent', () => {
  let component: CommunityPageHeaderComponent;
  let fixture: ComponentFixture<CommunityPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityPageHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
