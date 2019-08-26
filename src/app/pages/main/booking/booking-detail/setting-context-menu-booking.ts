export class DefaultMenu {
    menuRoomList = [
        {
            title: 'Add Stay',
            icon: 'fa fa-plus',
            status: 'active',
        },
        {
            title: 'Less Stay',
            icon: 'fa fa-minus',
            status: 'active',
        },
        {
            title: 'Move Room',
            icon: 'fa fa-share',
            status: 'active',
        },
        {
            title: 'Go Detail Room',
            icon: 'fa fa-arrow-right',
            status: 'active',
        },
    ];
}

export class AfterSelectRoom {
    menuRoomList = [
        { 
            title: 'Check In',
            icon: 'fas fa-plus-square',
            status: 'active',
        },
        { 
            title: 'Check Out',
            icon: 'fas fa-minus-square',
            status: 'active',
            },
        {
            title: 'Back',
            icon: 'fa fa-arrow-left',
            status: 'active',
        },
    ];
}