import { Component, OnInit } from '@angular/core';
import {Tag} from '../../interfaces/tag';
import {TagService} from '../../services/tag.service';

@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.scss']
})
export class NewCompanyComponent implements OnInit {

  latitude: number;
  longitude: number;
  tags: Tag[];
  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.tagService.getTags().then(response => this.tags = response);
  }

  getPosition($event) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
  }

}
