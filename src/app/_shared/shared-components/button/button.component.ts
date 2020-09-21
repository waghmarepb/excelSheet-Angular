import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit{
  @Input('loading') loading: boolean = true;
  @Input('btnClass') btnClass = 'btn btn-primary';
  @Input('loadingText') loadingText = 'Loading';
  @Input('btnType') type = 'button';

  constructor() { }

  ngOnInit() {
  }

}
