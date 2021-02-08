import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MonacoEditorComponent } from '@materia-ui/ngx-monaco-editor';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit {
  findform: FormGroup;
  findtheme: FormGroup;
  editorOptions = { theme: 'vs-dark', language: 'cpp' };
  curCode: any;
  input;
  submitInProgress;
  supportedLanguages = [];
  languages = [
    { value: 'C', label: 'C' },
    { value: 'cpp', label: 'CPP' },
    { value: 'JAVA', label: 'JAVA' },
    { value: 'PYTHON3', label: 'PYTHON 3' },
    { value: 'C#', label: 'C#' },
    { value: 'Node JS', label: 'NODEJS' }
  ];
  languageToEditorMap = {
    C: 'c',
    'C++': 'cpp',
    JAVA: 'java',
    'PYTHON3': 'python',
    'C#': 'csharp',
    'NODEJS': 'javascript'
  };
  themes = [
    { value: 'vs-dark', label: 'VS Dark' },
    { value: 'vs', label: 'VS Light' }
  ];
  selectedLanguage = 'C++';
  selectedTheme = 'vs-dark';
  constructor() {


    this.curCode = "#include<bits/stdc++.h> \nusing namespace std; \n\nint main(){ \n //write your code here \n\nreturn 0;\n}";

  }



  ngOnInit(): void {


    this.findform = new FormGroup({
      language_name: new FormControl({ default: "CPP" }, { validators: Validators.required })
    })

    this.findtheme = new FormGroup({
      theme_name: new FormControl({ default: "CPP" }, { validators: Validators.required })
    })

    this.onChanges();


  }



  onChanges(): void {
    this.findform.valueChanges.subscribe(val => {
      console.log(val.language_name);
      this.editorOptions = {
        ...this.editorOptions,
        language: val.language_name,
      };

    });
    this.findtheme.valueChanges.subscribe(val => {
      console.log(val.theme_name);


      this.editorOptions = {
        ...this.editorOptions,
        theme: val.theme_name,
      };


    });


  }



  onFind() {

  }

  onSubmit(){
   console.log(this.curCode);
  }

  onTest(){
    console.log(this.curCode);
   }
 



}
