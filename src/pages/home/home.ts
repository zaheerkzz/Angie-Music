import { MusicPlayerPage } from './../music-player/music-player';
import { SocialSharing } from '@ionic-native/social-sharing';
import { MusicsProvider } from './../../providers/musics/musics';
import { Component, } from '@angular/core';
import { NavController, LoadingController, ActionSheetController } from 'ionic-angular';
import { Icon } from 'ionic-angular/components/icon/icon';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public allMusic = [];
  constructor(private musicProvider: MusicsProvider, public navCtrl: NavController,
              private socialSharing: SocialSharing,
              public loadingController: LoadingController, 
              private actionSheetController: ActionSheetController) {
      //ActionSheetController & SocialSharing using for sharing on social media
  }

  ionViewDidLoad(){  //fire once in page lifecycle, when all internal data set(ready for operation),
    //when it fires load all data at once

    let allMusicLoadingController = this.loadingController.create({
      content: "getting songs from server"
      
    }); //create an instant of loadingController
      allMusicLoadingController.present(); //present display to screen

    this.musicProvider.getMusic()
    .subscribe((musicList) => 
    {
      allMusicLoadingController.dismiss(); //dismiss loading message once data loaded from server
      this.allMusic = musicList}); //push all music data into array
  }


  shareMusic(music){
    //create an instance of ActionSheetController
    let shareMusicSheetInstance = this.actionSheetController.create({
      title: "share song",
      buttons: [  //create buttons to share on differnt social media
        {
          text: "facebook",
          icon: "logo-facebook",
          handler:()=>{
            this.socialSharing.shareViaFacebook(music.name, music.image, music.music_url);
          }
        },
        {
          text: "whatsapp",
          icon: "logo-whatsapp",
          handler:()=>{
            this.socialSharing.shareViaWhatsApp(music.name, music.image, music.music_url);
          }

        },
        {
          text: "instagram",
          icon: "logo-instagram",
          handler:()=>{
            this.socialSharing.shareViaInstagram(music.name, music.image);
          }
        },
        {
          text: "share",
          icon: "share",
          handler: ()=>{
            this.socialSharing.share(music.name, "", music.image, music.music_url);
          }
        },
        {
          text: "cancel",
          role: "distructive"
        }

      ]
    });
    shareMusicSheetInstance.present(); // present on screen
  }

  playMusic(music){
    this.navCtrl.push(MusicPlayerPage, {    //open MusicPlayerPage on button click..
      music: music    //pass music as perameter
    }); 
    

  }

}

