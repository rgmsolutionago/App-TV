import { Component, Input, OnInit } from '@angular/core';
import { INews } from 'src/app/model/INews';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss'],
})
export class NewsItemComponent implements OnInit {
  @Input() item!: INews;
  @Input() DISPLAY!: number;

  constructor(public appConfigService: AppConfigService) {}

  ngOnInit() {}

  getImage() : any{
    if (this.item?.newspaper_name === 'Comeca')
      return './assets/news/comeca.png';
    if (this.item?.newspaper_name === 'El País')
      return './assets/news/El_Pais_Uruguay.png';
    if (this.item?.newspaper_name === 'El Observador')
      return './assets/news/subrayado.svg';
    if (this.item?.newspaper_name === 'Subrayado')
      return './assets/news/subrayado.svg';
  }
}
