////////////////////////
// APP ROUTING MODULE //
////////////////////////

// import app components to which routes will be declared
// guards which will accept routes

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page/main-page.component';
import { SelectQuestionComponent } from './questions/select-question/select-question.component';
import { EmailFormComponent } from './questions/email-form/email-form.component';
import { MainPanelComponent } from './admin/main-panel/main-panel.component';
import { QuestionSelectComponent } from './admin/questions/question-select/question-select.component';
import { QuestionFormComponent } from './admin/questions/question-form/question-form.component';
import { StudyFieldsSelectComponent } from './admin/study-fields/study-fields-select/study-fields-select.component';
import { StudyFieldsFormComponent } from './admin/study-fields/study-fields-form/study-fields-form.component';
import { CandidatesListComponent } from './admin/candidates/candidates-list/candidates-list.component';
import { LoginComponent } from './admin/auth/login/login.component';
import { AuthGuard } from './admin/auth/guards/auth.guard';
import { SettingsComponent } from './admin/account/settings/settings.component';
import { RodoComponent } from './rodo/rodo/rodo.component';
import { FormAccessGuard } from './admin/auth/guards/form-access.guard';

// initialize routes to specific components
// routes contains url path, target component and 
// optional guards to specific url

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'test', component: SelectQuestionComponent },
  { path: 'poznaj-wynik', component: EmailFormComponent, canActivate: [FormAccessGuard] },
  { path: 'zgoda-przetwarzania', component: RodoComponent },
  { 
    path: 'admin', 
    component: MainPanelComponent, 
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'pytania', pathMatch: 'full' },
      { path: 'pytania', component: QuestionSelectComponent },
      { path: 'pytania/form/:id', component: QuestionFormComponent },
      { path: 'pytania/form', component: QuestionFormComponent },
      { path: 'kierunki', component: StudyFieldsSelectComponent },
      { path: 'kierunki/form/:id', component: StudyFieldsFormComponent },
      { path: 'kierunki/form', component: StudyFieldsFormComponent },
      { path: 'kandydaci', component: CandidatesListComponent },
      { path: 'konto', component: SettingsComponent }
    ]
  },
  { path: 'admin/login', component: LoginComponent }
];

// module declaration exports routes to routermodule
// which allows to manage app-flow

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
