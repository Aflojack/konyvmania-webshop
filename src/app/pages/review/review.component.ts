import { Component, EventEmitter, OnInit } from '@angular/core';
import { Review } from 'src/app/shared/models/review';
import { CommentDatabaseService } from 'src/app/shared/services/comment-database.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit{
  reviews?:Array<Review>;

  constructor(private commentDatabaseService:CommentDatabaseService){

  }

  ngOnInit(){
    this.loadReview();
  }

  loadReview(){
    this.commentDatabaseService.getAll().subscribe((data: Array<Review>)=>{
      this.reviews=data;
    },error=>{
      console.error(error);
    });
  }
}
