import { Injectable } from '@angular/core';
import analysisHistoryExample from '../assets/analysisHistoryExample.json';

@Injectable({
  providedIn: 'root'
})

export class CodeHistoryService {
  actions: Array<any> = analysisHistoryExample;
  currentActionContent: any = {};
  hasActionStarted = false;
  currentActionType: string = '';
  actionTypes = ["hypothesis", "loading", "refactoring", "processing", "none"];
  constructor() {
    this.actions.forEach(action => {
      action["datetime"] = new Date(action["datetime"]);
    })
    console.log(this.actions);
  }

  startNewAction(actionType: string): void{
    if(!this.actionTypes.includes(actionType)){
      throw("Wrong action type")
    }
    this.currentActionType = actionType;
    this.currentActionContent = {
      'id': getRandomInt(10000),
      'datetime': new Date(),
      'parent': this.actions.length > 0 ? this.actions[this.actions.length-1]['id']: '',
      'type': this.currentActionType,
      'code-content': this.actions.length > 0 ? this.actions[this.actions.length-1]['code-content'] : ''
    }
    this.actions.push(this.currentActionContent);
    this.hasActionStarted = true;
  }
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
