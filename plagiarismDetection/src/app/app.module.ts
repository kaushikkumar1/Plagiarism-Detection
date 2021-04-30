import { FormControl, FormGroup, FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient,HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateFileComponent } from './create-file/create-file.component';
import { CreatePlagiarismDataComponent } from './create-plagiarism-data/create-plagiarism-data.component';
import { GeneratePlagiarismReportComponent } from './generate-plagiarism-report/generate-plagiarism-report.component';
import { PlagiarismDataComponent } from './plagiarism-data/plagiarism-data.component';
import { AuthModule } from './auth/auth.module';
import { NavComponent } from './nav/nav.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SubmissionComponent } from './submission/submission.component';
import { ProfileComponent } from './profile/profile.component';
import { BatchDataComponent } from './batch-data/batch-data.component';
import { CodeEditorComponent } from './virtual-judge/code-editor/code-editor.component';
import { ProblemComponent } from './virtual-judge/problem/problem.component';
import { VirtualJudgeModule } from './virtual-judge/virtual-judge.module';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';
import { MyContestComponent } from './my-contest/my-contest.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateFileComponent,
    CreatePlagiarismDataComponent,
    GeneratePlagiarismReportComponent,
    PlagiarismDataComponent,
    NavComponent,
    LeaderboardComponent,
    SubmissionComponent,
    ProfileComponent,
    BatchDataComponent,
    MyContestComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AuthModule,
    VirtualJudgeModule,
    NgMultiSelectDropDownModule,
    MonacoEditorModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
