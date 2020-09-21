import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateFileComponent } from './create-file/create-file.component';
import { CreatePlagiarismDataComponent } from './create-plagiarism-data/create-plagiarism-data.component';
import { GeneratePlagiarismReportComponent } from './generate-plagiarism-report/generate-plagiarism-report.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { PlagiarismDataComponent } from './plagiarism-data/plagiarism-data.component';
import { SubmissionComponent } from './submission/submission.component';

const routes: Routes = [
  { path: '', component: GeneratePlagiarismReportComponent },
  { path: 'create/file', component: CreateFileComponent },
  { path: 'auth', loadChildren: 'src/app/auth/auth.module#AuthModule' },
  { path: 'create/plagiarism/data/:id/:id2/:p1/:p2', component: CreatePlagiarismDataComponent },
  { path: 'generate/plagiarism/report', component: GeneratePlagiarismReportComponent },
  { path: 'plagiarism/result/:cn', component: PlagiarismDataComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'submission/:user_handle', component:SubmissionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
