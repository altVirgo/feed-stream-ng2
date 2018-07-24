import { CanvasService } from './canvas.service';
import { CanvasComponent } from './canvas.component';
import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
        // BrowserAnimationsModule
    ],
    declarations: [
        CanvasComponent
    ],
    exports: [
        CanvasComponent
    ],
    providers: [
        CanvasService
    ]
})
export class AdvCanvasModule { }
