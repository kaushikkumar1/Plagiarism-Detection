import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient,HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateFileComponent } from './create-file/create-file.component';
import { CreatePlagiarismDataComponent } from './create-plagiarism-data/create-plagiarism-data.component';
import { GeneratePlagiarismReportComponent } from './generate-plagiarism-report/generate-plagiarism-report.component';
import { PlagiarismDataComponent } from './plagiarism-data/plagiarism-data.component';
import { AuthModule } from './auth/auth.module';
import { NavComponent } from './nav/nav.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import{NgxPaginationModule } from 'ngx-pagination';
import { SubmissionComponent } from './submission/submission.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateFileComponent,
    CreatePlagiarismDataComponent,
    GeneratePlagiarismReportComponent,
    PlagiarismDataComponent,
    NavComponent,
    LeaderboardComponent,
    SubmissionComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AuthModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
