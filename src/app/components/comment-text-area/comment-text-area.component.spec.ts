import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentTextAreaComponent } from './comment-text-area.component';

describe('CommentTextAreaComponent', () => {
  let component: CommentTextAreaComponent;
  let fixture: ComponentFixture<CommentTextAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentTextAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentTextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
