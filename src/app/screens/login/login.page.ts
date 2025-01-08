import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AppConfigService } from 'src/app/services/app-config.service';
import { FirebaseService } from 'src/app/services/firestore.service';
import { SecurityService } from 'src/app/services/security.service';
import { SpeechService } from 'src/app/services/speech-synthesis-utterance';
import { toStorage } from 'src/app/util/storage';
import { DEFAULT_XSecretKey } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formLogin!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public appConfigService: AppConfigService,
    public securityService: SecurityService,
    public firebaseService: FirebaseService,
    private speechService: SpeechService
  ) {}

  ionViewWillEnter(): void {
    if (this.securityService.isAuth) this.router.navigate(['/dashboard']);
  }

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      key: [
        '',
        Validators.compose([Validators.maxLength(50), Validators.required]),
      ],
      name: [
        '',
        Validators.compose([Validators.maxLength(100), Validators.required]),
      ],
    });
  }

  handleLogin() {
    this.speechService.start('Iniciando sesion!');
    if (this.formLogin.valid) {
      this.securityService.login(this.formLogin.value.key).subscribe(
        (response) => {
          toStorage('X-Secret-Key', DEFAULT_XSecretKey);
          toStorage('X-Device-ID', response.token);
          toStorage('X-Api-Key', this.formLogin.value.key);
          toStorage('X-Device-Name', this.formLogin.value.name);
          this.securityService.pending = false;

          this.router.navigate(['/dashboard']);
        },
        (e) => {
          this.securityService.pending = false;
          this.securityService.presentToast(e.error.error);
        }
      );
    }
  }
}
