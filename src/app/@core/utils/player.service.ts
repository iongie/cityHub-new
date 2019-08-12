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
      name: 'On My Way',
      artist: 'Alan Walker',
      url: '/assets/data/onmyway.mp3',
      cover: '/assets/images/alanwalker.jpg',
    },
    {
      name: 'Lily',
      artist: 'Alan Walker',
      url: '/assets/data/Lily.mp3',
      cover: '/assets/images/alanwalker.jpg',
    },
    {
      name: 'Faded',
      artist: 'Alan Walker',
      url: '/assets/data/Faded.mp3',
      cover: '/assets/images/alanwalker.jpg',
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
