import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { VsData } from '@pages/dynamic/vs-display/vs-data-object';
import { CreateService } from '@app/pages/dynamic/vs-display/toolbar-items/create/create.service';

@Component({
  selector: 'app-create',
  providers: [CreateService],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  @Input() data: VsData;
  @Output() vsObjectCreated: EventEmitter<any> = new EventEmitter();

  constructor(
    private createService: CreateService,
  ) { }

  ngOnInit() {
  }

  create(data) {
    this.createService.openForm(data).subscribe(res => {
      if (res) { this.vsObjectCreated.emit(res); }
    })
  }
}
