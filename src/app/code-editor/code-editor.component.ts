import {Component, OnInit} from '@angular/core';
import {CodeModel} from "@ngstack/code-editor";
import {FormBuilder} from "@angular/forms";
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {CodeHistoryService} from "../code-history.service";

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent {
  theme = 'vs-dark';
  fileURL: SafeResourceUrl = '';
  showSuccessfulRun = false;
  showMessage = false;
  isHypothesisCollapsed = true;
  isProcessingCollapsed = true;
  showResultHypothesis = false;
  hypothesisForm = this.formBuilder.group({
    name: '',
    description: ''
  });
  processingForm = this.formBuilder.group({
    name: '',
    description: ''
  });
  resultsForm = this.formBuilder.group({
    results: '',
  });
  message = "";
  codeModel: CodeModel = {
    language: 'python',
    uri: 'main.json',
    value: ''
  };

  options = {
    contextmenu: false,
    minimap: {
      enabled: true
    }
  };

  constructor(
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    public codeHistoryManager: CodeHistoryService
  ) {
    this.codeModel.value = this.codeHistoryManager.currentActionContent ? this.codeHistoryManager.currentActionContent['code-content'] : '';
  }

  onCodeChanged(value: any) {
    console.log()
    if (!this.codeHistoryManager.hasActionStarted) {
      this.message = 'We noticed you started adding some new code. What describes best what you are trying to do?'
      this.showMessage = true;

    }
  }

  runCode() {
    if (this.codeHistoryManager.hasActionStarted) {
      this.showSuccessfulRun = true;
    }
  }

  addNewStep(step: string) {
    this.showMessage = false;
    this.codeHistoryManager.startNewAction(step);
    console.log(step)
    if (step === 'hypothesis') {
      this.isHypothesisCollapsed = false;
    } else if (step == 'loading') {
    } else if (step == 'refactoring') {
    } else if (step == 'processing') {
      this.isProcessingCollapsed = false;
    } else if (step == 'none') {
    }
  }

  showActionMessage() {
    this.hideMessages();
    this.showMessage = true;
  }

  hideMessages() {
    this.showSuccessfulRun = false;
    this.showMessage = false;
    this.isHypothesisCollapsed = true;
    this.showResultHypothesis = false;
    this.isProcessingCollapsed = true;
  }

  addNewHypothesis(): void {
    this.codeHistoryManager.currentActionContent["name"] = this.hypothesisForm.value["name"];
    this.codeHistoryManager.currentActionContent["description"] = this.hypothesisForm.value["description"];
    this.hypothesisForm.reset();
    this.hideMessages();
  }

  addNewProcessingStep(){
    this.codeHistoryManager.currentActionContent["name"] = this.processingForm.value["name"];
    this.codeHistoryManager.currentActionContent["description"] = this.processingForm.value["description"];
    this.processingForm.reset();
    this.hideMessages();
  }

  validateStepCode() {
    this.codeHistoryManager.currentActionContent["code-content"] = this.codeModel.value;
    this.showSuccessfulRun = false;
    if (this.codeHistoryManager.currentActionType == 'hypothesis') {
      this.showResultHypothesis = true;
    } else {
      this.codeHistoryManager.hasActionStarted = false;
      this.codeHistoryManager.currentActionType = '';
    }
  }

  validateHypothesisResults() {
    this.codeHistoryManager.currentActionContent["results"] = this.resultsForm.value["results"];
    const blob = new Blob([JSON.stringify(this.codeHistoryManager.actions, null, "\t")], {type: 'application/octet-stream'});
    this.fileURL = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
    this.codeHistoryManager.hasActionStarted = false;
    this.codeHistoryManager.currentActionContent = {};
    this.hideMessages();
  }
}


