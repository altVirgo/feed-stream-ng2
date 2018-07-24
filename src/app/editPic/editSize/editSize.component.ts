import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
    selector: 'app-edit-size',
    templateUrl: './editSize.component.html',
    styleUrls: ['./editSize.component.css']
})
export class EditSizeComponent implements OnInit {
    // @Input() picSize: number;
    @Output() picSize: EventEmitter<any> = new EventEmitter();

    private abc: string;
    private validateForm: FormGroup;
    constructor(private translate: TranslateService, private fb: FormBuilder) {
        translate.stream(translate.getBrowserLang()).subscribe((event: TranslationChangeEvent) => {
            // debugger;
            this.abc = translate.instant('welcome');
        });
        translate.getTranslation(translate.getBrowserLang()).subscribe((value) => {
            // debugger;
            this.abc = translate.instant('welcome');
        });
    }
    public enableCustomize = false;

    private customizeSize: any = {
        type: 0,
        width: 0,
        height: 0
    };
    private sizeOption: any[] = [
        {
            title: '手机百度',
            class: 'mobile-baidu-size',
            option: [
                {
                    title: '单图、极景',
                    type: 0, // 0：单图  1：三图
                    width: 370,
                    height: 245
                },
                {
                    title: '三图',
                    type: 1,
                    width: 370,
                    height: 245
                }
            ]
        },
        {
            title: '浏览器',
            class: 'browser-size',
            option: [
                {
                    title: 'APP下载、大图',
                    type: 0,
                    width: 660,
                    height: 370
                }, {
                    title: '浏览器单图',
                    type: 0,
                    width: 218,
                    height: 146
                }, {
                    title: '浏览器三图',
                    type: 1,
                    width: 218,
                    height: 146
                }
            ]
        }, {
            title: '贴吧列表（移动）',
            class: 'tieba-yidong-size',
            option: [
                {
                    title: '单图1',
                    type: 0,
                    width: 644,
                    height: 280
                }, {
                    title: '单图2',
                    type: 0,
                    width: 660,
                    height: 248
                }, {
                    ps: '占位用,无意义',
                    type: 2,
                    width: 400,
                    height: 60
                }, {
                    title: '三图1',
                    type: 1,
                    width: 190,
                    height: 190
                }, {
                    title: '三图2',
                    type: 1,
                    width: 220,
                    height: 220
                }
            ]
        }, {
            title: '贴吧内容（PC）',
            class: 'tieba-pc-size',
            option: [
                {
                    title: '单图',
                    type: 0,
                    width: 629,
                    height: 90
                }, {
                    title: '三图',
                    type: 1,
                    width: 120,
                    height: 90
                }
            ]
        }, {
            title: '贴吧列表（PC）',
            class: 'tieba-pc-size',
            option: [
                {
                    title: '单图',
                    type: 0,
                    width: 560,
                    height: 170
                }
            ]
        }
    ];

    ngOnInit() {
        // this.translate.use(this.translate.getBrowserLang());

        this.validateForm = this.fb.group({
            width: [null, [Validators.required, Validators.min(40), Validators.max(1200)]],
            height: [null, [Validators.required, Validators.min(40), Validators.max(1200)]]
        });
    }

    getFormControl(name) {
        console.log(this.validateForm.controls[name]);
        return this.validateForm.controls[name];
    }

    userSetSizeFunc(item) {
        this.picSize.emit({
            plabel: '自定义',
            label: '单图',
            type: 0,
            width: item.width,
            height: item.height
        });
    }

    setSizeFunc(sizeInfo, plabel: string) {
        this.picSize.emit({
            plabel: plabel,
            label: sizeInfo.title,
            type: sizeInfo.type,
            width: sizeInfo.width,
            height: sizeInfo.height
        });
    }



}
