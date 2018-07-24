import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { NzModalSubject } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'app-edit-pic-name',
    templateUrl: './editPicName.component.html',
    styleUrls: ['./editPicName.component.css']
})
export class EditPicNameComponent implements OnInit {
    private docName: string;
    private validateForm: FormGroup;
    constructor(private subject: NzModalSubject, private fb: FormBuilder) {
        this.subject.on('onOk', () => {
            this.subject.next({
                type: 'ok',
                data: { name: this.docName }
            });
        });
    }
    ngOnInit() {
        this.validateForm = this.fb.group({
            docName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(25)]]
        });
    }

    getFormControl(name) {
        console.log(this.validateForm.controls[name]);
        return this.validateForm.controls[name];
    }

    initData() {
        this.docName = '';
    }

}
