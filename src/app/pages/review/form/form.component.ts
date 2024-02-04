import { CommentDatabaseService } from './../../../shared/services/comment-database.service';
import { Review } from './../../../shared/models/review';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{
  @Output() newReviewEmitter: EventEmitter<any> = new EventEmitter();
  error:string='';
  isError:boolean=false;

  comment=new FormControl('',[Validators.required,Validators.minLength(10)]);

  constructor(private commentDatabaseService:CommentDatabaseService){

  }

  ngOnInit(){
    document.getElementById("felhasznalo")!.innerHTML=JSON.parse(localStorage.getItem("user") as string).email.split("@")[0];
  }

  submit(){
    if(this.comment.valid){
      const user=JSON.parse(localStorage.getItem("user") as string);
      if(user){
        const newReview:Review={
          felhasznalonev:user.email.split("@")[0],
          szoveg:this.comment.value!
        };
        this.commentDatabaseService.create(newReview).then(_=>{
          this.newReviewEmitter.emit();
        }).catch(_=>{
          this.error="Komment kiírás sikertelen!";
          return;
        })
      }
    }
  }


}
