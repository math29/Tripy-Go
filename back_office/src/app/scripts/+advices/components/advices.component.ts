import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import {MarkdownPipe} from '../../tripy-lib/pipes/marked';
import {MdEditor} from '../../tripy-lib/components/md-editor/md-editor';
import {AdviceService} from './advices.service';

declare var to_markdown:any;

@Component({
    selector: 'advices',
    templateUrl: 'scripts/+advices/components/main.html',
    directives: [MdEditor],
    providers: [AdviceService],
    styleUrls: [],
    pipes: [MarkdownPipe]
})

export class AdvicesComponent implements OnInit, OnDestroy {
    private newAdvice : any = null;
    private advices : any = [];

  constructor(private adviceService: AdviceService) {}

  ngOnInit() {
      this.adviceService.getAdvices().subscribe(res => this.advices = res, error => alert('error'));
  }

  ngOnDestroy() {
  }


  public editAdvice(){
      console.log('edit advice');
      this.newAdvice = {
          description: "",
          url: "",
          img:""
      };
  }

  public addAdvice() {
      this.adviceService.saveAdvice(this.newAdvice).subscribe(res => {
          this.advices.push(this.newAdvice);
          this.newAdvice = null;
      }, error => console.log('error: ' + JSON.stringify(error)));
  }

  public deleteAdvice(advice) {
      this.adviceService.deleteAdvice(advice).subscribe(res=>{
          for(var i = 0; i < this.advices.length; i++) {
              if(this.advices[i]._id === advice._id) {
                  this.advices.splice(i, 1);
                  return;
              }
          }
      });
  }

  public descriptionChanged(event){
      this.newAdvice.description = to_markdown.toMarkdown(event);
  }

}
