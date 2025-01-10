import { Component, Input, OnInit } from '@angular/core';
import { ICallers } from 'src/app/model/ICallers';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'callers-item-full',
  templateUrl: './callers-item-full.component.html',
  styleUrls: ['./callers-item-full.component.scss'],
})
export class CallersItemFullComponent implements OnInit {
  constructor(public dashboardService: DashboardService) { }
  ngOnInit() {
    // console.log("sonido", this.dashboardService.keyboardEventCallCaller?.number);
    // console.log("----", this.dashboardService.keyboardEventCallCaller)
    this.synthesizeText(`${this.dashboardService.keyboardEventCallCaller.name} número ${this.dashboardService.keyboardEventCallCaller.number}` , "es-AR");
  }

  synthesizeText(text: string, lang: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    // Puedes listar todas las voces disponibles y elegir la que prefieras
    const voices = window.speechSynthesis.getVoices();

    // console.log(voices);

    const selectedVoice = voices.find(voice => voice.lang === lang && voice.name.includes("Lucia"));
    // Ajusta según las voces disponibles
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    window.speechSynthesis.speak(utterance);
  }
}
