import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VirtualJudgeComponent } from './virtual-judge.component'
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { ProblemComponent } from './problem/problem.component';

const routes: Routes = [
  {
    path: '',
    component: VirtualJudgeComponent,
    children: [
        {
            path:'code-editor',
            component:CodeEditorComponent
        },
        {
            path:'problem',
            component:ProblemComponent
        }
        
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VirtualJudgeRoutingModule { }