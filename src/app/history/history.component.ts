import { Component, OnInit } from '@angular/core';
import {CodeHistoryService} from "../code-history.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  selectedActionTypes: Array<string> = [];

  constructor(public codeHistoryManager: CodeHistoryService) { }

  ngOnInit(): void {
  }

  isActionTypeSelected(actionType: string){
    if(this.selectedActionTypes.length > 0){
      return this.selectedActionTypes.includes(actionType);
    }
    return true;
  }

  getSelectedActions(): Array<any>{
    let selectedActions: Array<any> = [];
    this.codeHistoryManager.actions.forEach(action =>{
      if(this.isActionTypeSelected(action["type"])){
        selectedActions.push(action);
      }
    });
    return selectedActions;
  }
  addSelectedType(actionType: string){
    if(this.selectedActionTypes.includes(actionType)){
      let index = this.selectedActionTypes.indexOf(actionType);
      this.selectedActionTypes.splice(index, 1);
    }
    else{
      this.selectedActionTypes.push(actionType);
    }
  }
}
