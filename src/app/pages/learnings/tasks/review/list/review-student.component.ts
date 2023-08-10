import { Component, OnInit } from '@angular/core'
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReviewResDto } from '@dto/review/review.res.dto';
import { AuthService } from '@service/auth.service';
import { ReviewService } from '@service/review.service';

@Component({
    selector: 'review-student',
    templateUrl: './review-student.component.html'
})
export class ReviewStudentComponent implements OnInit {

    taskId!: number
    teacherId!: number
    reviews!: ReviewResDto[]

    constructor(private reviewService: ReviewService,
        private activatedRoute: ActivatedRoute,
        private auth: AuthService,
        private fb: NonNullableFormBuilder) { }

    editReviewForm = this.fb.group({
        reviewId: [0, Validators.required],
        taskId: [0, Validators.required],
        studentId: [0, Validators.required],
        essayScore: [0, Validators.required],
        fileScore: [0, Validators.required],
        notes: ['', Validators.required]
    })

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(result => {
            this.taskId = result['taskId']
        })
        const profile = this.auth.getProfile()
        if (profile) {
            this.teacherId = profile.userId
        }

        this.getReviews()
    }

    getReviews() {
        this.reviewService.getReviewList(this.teacherId, this.taskId, true).subscribe(result => {
            this.reviews = result
        })
    }

    setId(reviewId: number, studentId: number){
        this.editReviewForm.patchValue({
            reviewId: reviewId,
            studentId: studentId
        })
    }

    editReview(){
        const data = this.editReviewForm.getRawValue()
        data.taskId = this.taskId
        this.reviewService.updateReview(data, true).subscribe(result => {
            this.getReviews()
        })
    }
}