import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';

/**
 * Generated class for the MusicPlayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-music-player',
  templateUrl: 'music-player.html',
})
export class MusicPlayerPage {

  public music = {}; //create an empty object
  private songMedia : MediaObject = null;
  private isMusicPaused = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private media: Media) {
    this.music = this.navParams.get("music"); //get music from last page as prerameter
  }

  ionViewDidLoad() {
   
  }
 
  playMusic(){
    if(this.songMedia === null){ //check weather songmedia is null or not
    this.songMedia = this.media.create(this.music["music_url"]); //play song get from url
    this.songMedia.play(); // play songmedia
    }
    else{
      if(this.isMusicPaused === true){
        this.songMedia.play();
      }
    }
  }

  pauseMusic(){
    if(this.songMedia !== null){
      this.songMedia.pause();
      this.isMusicPaused = true;
    }

  }

  stopMusic(){
    if(this.songMedia !== null){
      this.songMedia.stop();
      this.songMedia.release(); //free songmedia 
      this.songMedia = null;
    }
  }

}
