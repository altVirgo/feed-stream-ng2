import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DialogService } from '../shared/services/modal.service';

import { AppRoutingModule } from './router.module';
import { DashboardComponent } from './dashboard.component';

import { PickPicComponent } from '../pickPic/pickPic.component';
import { MyPicComponent } from '../myPic/myPic.component';

import { EditPicComponent } from '../editPic/editPic.component';
import { EditSizeComponent } from '../editPic/editSize/editSize.component';
import { EditTemplateComponent } from '../editPic/editTemplate/editTemplate.component';
import { EditImageComponent } from '../editPic/editImage/editImage.component';
import { EditTextComponent } from '../editPic/editText/editText.component';
import { EditGraphComponent } from '../editPic/editGraph/editGraph.component';
import { EditBgComponent } from '../editPic/editBg/editBg.component';
import { EditOwnedComponent } from '../editPic/editOwned/editOwned.component';
import { Page404Component } from '../errorPage/404/404Page.component';

import { SharedModule } from '../shared/modules/shared.module';
import { AdvCanvasModule } from '../canvas/canvas.module';
import { EditPicService } from '../editPic/defaultData.service';
import { IntPipe } from '../editPic/editPic.pipe';
import { EditPicNameComponent } from '../editPic/dialog/editPicName/editPicName.component';
import { PreviewComponent } from '../editPic/dialog/preview/preview.component';

@NgModule({
  imports: [
    NgZorroAntdModule,
    AppRoutingModule,
    SharedModule,
    AdvCanvasModule
  ],
  declarations: [
    DashboardComponent,
    PickPicComponent,
    MyPicComponent,
    EditPicComponent,
    EditSizeComponent,
    EditTemplateComponent,
    EditImageComponent,
    EditTextComponent,
    EditGraphComponent,
    EditBgComponent,
    EditOwnedComponent,
    IntPipe,
    EditPicNameComponent,
    PreviewComponent
  ],
  entryComponents: [EditPicNameComponent, PreviewComponent],
  providers: [EditPicService, DialogService],
  bootstrap: [
  ]
})
export class DashboardModule { }
