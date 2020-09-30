import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { ProblemComponent } from './problem/problem.component';
import { VirtualJudgeComponent } from './virtual-judge.component';
import { VirtualJudgeRoutingModule } from './virtual-judge-routing.module';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';


@NgModule({
  declarations: [
   VirtualJudgeComponent,
   CodeEditorComponent,
   ProblemComponent
 
  ],
  imports: [
    CommonModule,
    VirtualJudgeRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MonacoEditorModule,
    FormsModule
  ]
})
export class VirtualJudgeModule { }