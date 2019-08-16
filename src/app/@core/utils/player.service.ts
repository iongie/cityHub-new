import { Injectable } from '@angular/core';

export class Track {
  name: string;
  artist: string;
  url: string;
  cover: string;
}

@Injectable()
export class PlayerService {
  current: number;
  playlist: Track[] = [
    {
      name: 'Prambors FM',
      artist: 'Jakarta ',
      url: 'http://masima.rastream.com/masima-pramborsjakarta?',
      cover: '/assets/images/prambors.jpg',
    },
    {
      name: 'Hard Rock FM',
      artist: 'Jakarta',
      url: 'http://cloudstreaming.mramedia.com:8001/live',
      cover: '/assets/images/hardrock.jpg',
    },
    {
      name: 'RDI FM',
      artist: 'Jakarta',
      url: 'http://202.147.199.99:8000/;',
      cover: '/assets/images/dangdut.png',
    },
  ];

  random(): Track {
    this.current = Math.floor(Math.random() * this.playlist.length);
    return this.playlist[this.current];
  }

  next(): Track {
    return this.getNextTrack();
  }

  prev() {
    return this.getPrevTrack();
  }

  private getNextTrack(): Track {
    if (this.current === this.playlist.length - 1) {
      this.current = 0;
    } else {
      this.current++;
    }

    return this.playlist[this.current];
  }

  private getPrevTrack(): Track {
    if (this.current === 0) {
      this.current = this.playlist.length - 1;
    } else {
      this.current--;
    }

    return this.playlist[this.current];
  }
}
