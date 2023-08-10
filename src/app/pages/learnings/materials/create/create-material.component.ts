import { Component } from '@angular/core'
import { FormArray, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FileDto } from '@dto/file/file.dto';
import { LearningMaterialService } from '@service/learning-material.service';

@Component({
    selector: 'create-material',
    templateUrl: './create-material.component.html'
})
export class CreateMaterialComponent {

    fileDto!: FileDto

    constructor(private materialService: LearningMaterialService,
        private activatedRoute: ActivatedRoute,
        private fb: NonNullableFormBuilder) { }

    materialForm = this.fb.group({
        learningMaterialTitle: ['', Validators.required],
        learningMaterialBody: ['', Validators.required],
        learnId: [0, Validators.required],
        files: this.fb.array([this.fileDto])
    })

    createMaterial() {
        const data = this.materialForm.getRawValue()
        this.activatedRoute.params.subscribe(result => {
            data.learnId = result['id']
        })
        
        this.materialService.createMaterial(data, true).subscribe()
    }
    
    get fileLists() {
        return this.materialForm.get('files') as FormArray
    }

    fileUpload(event: any) {
        this.fileLists.clear()
        const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (typeof reader.result === "string") resolve(reader.result)
            };
            reader.onerror = error => reject(error);
        });

        for (let file of event.target.files) {
            toBase64(file).then(result => {
                this.fileLists.push(this.fb.control({
                    files: result.substring(result.indexOf(",") + 1, result.length),
                    fileFormat: file.name.substring(file.name.indexOf(".") + 1, file.name.length)
                }))
            })
        }
    }
}