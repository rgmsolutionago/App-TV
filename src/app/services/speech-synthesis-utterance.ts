import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpeechService {
  synthesis = window.speechSynthesis;

  start(text: string, rate = 1) {
    const textToSpeech = new SpeechSynthesisUtterance(text);
    textToSpeech.lang = 'es-ES';
    textToSpeech.text = text;
    textToSpeech.rate = rate;
    const voice = speechSynthesis.getVoices().filter((voice) => {
      return voice.name === 'Google español';
    })[0];
    textToSpeech.voice = voice;

    this.synthesis.speak(textToSpeech);
  }
}
