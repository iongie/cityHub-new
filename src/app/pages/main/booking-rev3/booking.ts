export class AddBooking {
    arrivalDate = new Date();
    departureDate = new Date();
    duration = 0;
    guestId = 0;
    sourceId = 0;
    createdBy = '';
    roomInformation = false;
    roomTypeId = [];
    numberOfRoom = [];
}

export class RoomInformation {
    roomInfo = [{
        roomTypeId: 0,
        roomTypeName: '',
        available: 0,
        check: false,
    } ];
}

export class Guest {
    guestId = 0;
    guestName = '';
    countryId = '';
    address = '';
    city = '';
    email = '';
    phoneNumber = '';
    guestFileScan = '';
}

export class Source {
    businnessSourceId = 0;
    businnessSourceName = '';
}

export class ListBooking {
    bookingId = 0;
    guestId = 0;
    businessSourceId = 0;
    bookingNumber = '';
    bookingCreatedAt = '';
    bookingCreatedBy = '';
    bookingUpdatedAt = '';
    bookingUpdatedBy = '';
    cancelAt = '';
    cancelBy = '';
    cancelReason = '';
    bookingStatusName = '';
}

export class DetailBookingByBookingId {
    bookingInformation = {
        bookingId: 0,
        bookingNumber: '',
        bookingCreatedAt: '',
        bookingCreatedBy: '',
        bookingUpdatedAt: '',
        bookingUpdatedBy: '',
        cancelAt: '',
        cancelBy: '',
        cancelReason: '',
        bookingStatusId: 0,
        bookingStatusName: '',
        countryId: 0,
        guestId: 0,
        guestName: 0,
        address: '',
        city: '',
        email: '',
        phoneNumber: '',
        guestFileScan: '',
        guestCreatedAt: '',
        guestUpdatedAt: '',
        businessSourceId: 0,
        businessSourceName: '',
        businessSourceDescription: '',
        businessSourceCreatedAt: '',
        businessSourceUpdatedAt: '',
    };
    roomInformation = [{
        bookingRoomId: 0,
        bookingId: 0,
        roomTypeId: 0,
        roomTypeName: '',
        roomId: '',
        bookingRoomStatusId: '',
        arrivalDate: '',
        departureDate: '',
        checkInAt: '',
        checkInBy: '',
        checkOutBy: '',
        cancelAt: '',
        cancelBy: '',
        baseAdult: '',
        baseChild: '',
        maxAdult: '',
        maxChild: '',
        baseRate: 0,
        increaseRate: 0,
        totalRoom: 0,
        roomDescription: '',
        createdAt: '',
        createdBy: '',
        updatedAt: '',
        updatedBy: '',
    }];
    chargeTotal = {
        discountTotal: 0,
        rateTotal: 0,
        taxTotal: 0,
        total: 0,
    };
}

export class DetailBookingByBookingRoomId {
    roomInformation = {
        bookingRoomId: 0,
        bookingId: 0,
        roomTypeId: 0,
        roomTypeName: '',
        roomId: '',
        bookingRoomStatusId: 0,
        arrivalDate: '',
        departureDate: '',
        checkInAt: '',
        checkInBy: '',
        checkOutBy: '',
        cancelAt: '',
        cancelBy: '',
        baseAdult: 0,
        baseChild: 0,
        maxAdult: 0,
        maxChild: 0,
        baseRate: 0,
        increaseRate: 0,
        totalRoom: 0,
        roomDescription: '',
        createdAt: '',
        createdBy: '',
        updatedAt: '',
        updatedBy: '',
        bookingRoomStatusName: '',
    };
    room = {
        floorName: '',
        roomName: '',
    };
    charge = [{
        chargeId: 0,
        taxId: 0,
        seasonId: 0,
        bookingRoomId: 0,
        roomReservationId: 0,
        paymentForDate: '',
        discount: '',
        chargeRate: 0,
        chargeTax: 0,
        chargeTotal: 0,
        chargeNote: '',
        chargeStatus: '',
        chargeCategory: '',
        chargeCreatedAt: '',
        chargeCreatedBy: '',
        chargeUpdatedAt: '',
        chargeUpdatedBy: '',
        taxName: '',
        taxRate: 0,
        taxStatus: '',
        createdAt: '',
        createdBy: '',
        updatedBy: '',
        seasonTypeId: '',
        seasonName: '',
        fromDate: '',
        toDate: '',
        startDate: '',
        endDate: '',
        seasonStatus: '',
        seasonDescription: '',
        roomTypeId: '',
        reservedDate: '',
        reservationStatus: '',
        reservationCreatedAt: '',
        reservationUpdatedAt: '',
        seasonTypeName: '',
        seasonTypeDescription: '',
    }];
    chargeTotal = {
        discountTotal: 0,
        rateTotal: 0,
        taxTotal: 0,
        total: 0,
    };
    payment = [{
        paymentId: 0,
        bookingRoomId: 0,
        paymentTypeId: 0,
        paymentNumber: '',
        billingNumber: '',
        paymentDate: new Date(),
        rateTotal: 0,
        taxTotal: 0,
        paidTotal: 0,
        paymentNote: '',
        paymentRemark: '',
        paymentStatus: '',
        paymentCategory: '',
        paymentCreatedAt: new Date(),
        paymentUpdatedAt: new Date(),
        paymentCreatedBy: '',
        paymentUpdatedBy: '',
        paymentTypeName: '',
        paymentTypeDbStatus: '',
    }];
    extraCharge = [{
        bookingRoomId: 0,
        createdAt: '',
        createdBy: '',
        updatedAt: '',
        updatedBy: '',
        extraChargeCategoryId: 0,
        extraChargeCategoryName: '',
        extraChargeDescription: 0,
        extraChargeId: '',
        extraChargeName: '',
        extraChargeRate: 0,
        extraChargeStatus: '',
        extraPaymentAmount: 0,
        extraPaymentCreatedAt: '',
        extraPaymentCreatedBy: '',
        extraPaymentDate: '',
        extraPaymentId: 0,
        extraPaymentNote: '',
        extraPaymentNumber: '',
        extraPaymentStatus: '',
        extraPaymentUpdatedAt: '',
        extraPaymentUpdatedBy: '',
        paymentTypeDbStatus: '',
        paymentTypeId: 0,
        paymentTypeName: '',
    }];
}

export class AddPayment {
    bookingRoomId = 0;
    paymentTypeId = 0;
    totalPaid = 0;
    paymentNote = '';
    createdBy = '';
    paymentRemark = '';
}

export class ExtraCharge {
    createAt= '';
    createBy= '';
    extraChargeCategoryId= 0;
    extraChargeCategoryName= '';
    extraChargeId= 0;
    extraChargeName= '';
    extraChargeRate= 0;
    extraChargeStatus= '';
    uploadAt= '';
    uploadBy= '';
}

export class AddExtraPayment {
    bookingRoomId = 0;
    extraChargeId = 0;
    paymentTypeId = 0;
    extraPaymentNote = '';
    createdBy = '';
}

export class Room {
    createdAt = new Date();
    createdBy = '';
    floorId = 0;
    roomDbStatus = '';
    roomId = 0;
    roomName = '';
    roomStatusId = 0;
    roomTypeId = 0;
    updatedAt = new Date();
    updatedBy = '';
}

export class AssignRoom {
    roomId = 0;
}
