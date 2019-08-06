import { Component, OnInit } from '@angular/core';
import { imageLinks } from '../../../extra-components/chat/bot-replies';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'ngx-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  users: { name: string, title: string,  picture: string;  }[] = [
    { name: 'Nano Type', title: 'Avilable', picture:'/assets/images/bedroom.png', },
    { name: 'Nano Type', title: 'Avilable', picture:'/assets/images/bedroom.png', },
    { name: 'Nano Type', title: 'Avilable', picture:'/assets/images/bedroom.png', },
    { name: 'Nano Type', title: 'Avilable', picture:'/assets/images/bedroom.png', },
    { name: 'Nano Type', title: 'Avilable', picture:'/assets/images/bedroom.png', },
    { name: 'Nano Type', title: 'Avilable', picture:'/assets/images/bedroom.png', },
    { name: 'Nano Type', title: 'Avilable', picture:'/assets/images/bedroom.png', },
    { name: 'Nano Type', title: 'Avilable', picture:'/assets/images/bedroom.png', },
    { name: 'Nano Type', title: 'Avilable', picture:'/assets/images/bedroom.png', },
    { name: 'Nano Type', title: 'Avilable', picture:'/assets/images/bedroom.png', },
    { name: 'Nano Type', title: 'Avilable', picture:'/assets/images/bedroom.png', },
    { name: 'Nano Type', title: 'Avilable', picture:'/assets/images/bedroom.png', },
  ];
  constructor() { }

  ngOnInit() {
  }

}
