export class AddBooking {
    arrivalDate = new Date();
    departureDate = new Date();
    duration = 0;
    guestId = 0;
    sourceId = 0;
    createdBy = '';
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
        bookingRoomStatusId: '',
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
    };
    charge = {
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
    };
    chargeTotal = {
        discountTotal: 0,
        rateTotal: 0,
        taxTotal: 0,
        total: 0,
    };
    payment = {

    };
    extraCharge = {

    };
}
