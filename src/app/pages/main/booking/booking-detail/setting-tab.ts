export class DefaultTab {
    show = {
        generalInformation: true,
        roomList: true,
        roomInformation: false,
        deposit: false,
        charge: false,
        extraCharge: false,
        payment: false,
        extraPayment: false,
        addStay: false,
        lessStay: false,
        moveRoom: false,
    };
    active = {
        generalInformation: true,
        roomList: false,
        roomInformation: false,
        deposit: false,
        charge: false,
        extraCharge: false,
        payment: false,
        extraPayment: false,
        addStay: false,
        lessStay: false,
        moveRoom: false,
    }
}

export class DetailRoomTab {
    show = {
        generalInformation: false,
        roomList: false,
        roomInformation: true,
        deposit: true,
        charge: true,
        extraCharge: true,
        payment: true,
        extraPayment: true,
        addStay: false,
        lessStay: false,
        moveRoom: false,
    };
    active = {
        generalInformation: false,
        roomList: false,
        roomInformation: true,
        deposit: false,
        charge: false,
        extraCharge: false,
        payment: false,
        extraPayment: false,
        addStay: false,
        lessStay: false,
        moveRoom: false,
    }
}

export class DetailAddStay {
    show = {
        generalInformation: false,
        roomList: false,
        roomInformation: false,
        deposit: false,
        charge: false,
        extraCharge: false,
        payment: false,
        extraPayment: false,
        addStay: true,
        lessStay: false,
        moveRoom: false,
    };
    active = {
        generalInformation: false,
        roomList: false,
        roomInformation: false,
        deposit: false,
        charge: false,
        extraCharge: false,
        payment: false,
        extraPayment: false,
        addStay: true,
        lessStay: false,
        moveRoom: false,
    }
}

export class DetailLessStay {
    show = {
        generalInformation: false,
        roomList: false,
        roomInformation: false,
        deposit: false,
        charge: false,
        extraCharge: false,
        payment: false,
        extraPayment: false,
        addStay: false,
        lessStay: true,
        moveRoom: false,
    };
    active = {
        generalInformation: false,
        roomList: false,
        roomInformation: false,
        deposit: false,
        charge: false,
        extraCharge: false,
        payment: false,
        extraPayment: false,
        addStay: false,
        lessStay: true,
        moveRoom: false,
    }
}

export class DetailMoveRoom {
    show = {
        generalInformation: false,
        roomList: false,
        roomInformation: false,
        deposit: false,
        charge: false,
        extraCharge: false,
        payment: false,
        extraPayment: false,
        addStay: false,
        lessStay: false,
        moveRoom: true,
    };
    active = {
        generalInformation: false,
        roomList: false,
        roomInformation: false,
        deposit: false,
        charge: false,
        extraCharge: false,
        payment: false,
        extraPayment: false,
        addStay: false,
        lessStay: false,
        moveRoom: true,
    }
}

