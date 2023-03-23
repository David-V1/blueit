import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityPageCreatePostComponent } from './community-page-create-post.component';

describe('CommunityPageCreatePostComponent', () => {
  let component: CommunityPageCreatePostComponent;
  let fixture: ComponentFixture<CommunityPageCreatePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityPageCreatePostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityPageCreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
