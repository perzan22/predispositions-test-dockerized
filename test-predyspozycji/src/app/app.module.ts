import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page/main-page.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AngularMaterialModule } from './angular-material.module';
import { HeaderComponent } from './header/header/header.component';
import { FooterComponent } from './footer/footer/footer.component';
import { SelectQuestionComponent } from './questions/select-question/select-question.component';
import { EmailFormComponent } from './questions/email-form/email-form.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './admin/auth/login/login.component';
import { MainPanelComponent } from './admin/main-panel/main-panel.component';
import { QuestionSelectComponent } from './admin/questions/question-select/question-select.component';
import { QuestionFormComponent } from './admin/questions/question-form/question-form.component';
import { StudyFieldsSelectComponent } from './admin/study-fields/study-fields-select/study-fields-select.component';
import { StudyFieldsFormComponent } from './admin/study-fields/study-fields-form/study-fields-form.component';
import { CandidatesListComponent } from './admin/candidates/candidates-list/candidates-list.component';
import { AuthInterceptor } from './admin/auth/auth.interceptor';
import { SettingsComponent } from './admin/account/settings/settings.component';
import { HexagonComponent } from './hexagon/hexagon/hexagon.component';
import { DialogComponent } from './dialog/dialog/dialog.component';
import { RodoComponent } from './rodo/rodo/rodo.component';

// Deklaracja komponentów
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HeaderComponent,
    FooterComponent,
    SelectQuestionComponent,
    EmailFormComponent,
    LoginComponent,
    MainPanelComponent,
    QuestionSelectComponent,
    QuestionFormComponent,
    StudyFieldsSelectComponent,
    StudyFieldsFormComponent,
    CandidatesListComponent,
    SettingsComponent,
    HexagonComponent,
    DialogComponent,
    RodoComponent
  ],
  // Import potrzebnych modułów
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  // Zależności, z których można korzystać we wszystkich komponentach
  providers: [
    provideAnimationsAsync(),
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  // Określenie komponentu do uruchomienia na start
  bootstrap: [AppComponent]
})
export class AppModule { }
