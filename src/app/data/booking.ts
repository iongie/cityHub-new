export class BookingData {
    bookingId = '';
    guestId = '';
    bookingStatusId = '';
    businessSourceId = '';
    bookingNumber = '';
    arrivalDate = new Date();
    duration = 0;
    departureDate = new Date();
    totalRoom = '';
    bookingCreatedAt = '';
    bookingCreatedBy = '';
    bookingUpdatedAt = '';
    bookingupdatedBy = '';
    checkinAt = '';
    checkinBy = '';
    checkoutAt = '';
    checkoutBy = '';
    cancelAt = '';
    cancelBy = '';
    cancelReason = '';
    countryId = '';
    guestName = '';
    address = '';
    city = '';
    email = '';
    phoneNumber = '';
    guestFileScan = '';
    guestCreatedAt = '';
    guestUpdateAt = '';
    businessSourceName = '';
    businessSourceDescription = '';
    businessSourceCreatedAt = '';
    businessSourceUpdateAt = '';
    bookingStatusName = '';
    countryName = '';
}

export class SelectedRowsRoomList {
    bookingRoomId = '';
    bookingId = '';
    bookingRoomTypeId = '';
    roomId = '';
    bookingRoomStatusId = '';
    roomTypeName = '';
    baseAdult = '';
    baseChild = '';
    maxAdult = '';
    maxChild = '';
    baseRate = '';
    increaseRate = '';
    totalRoom = '';
    roomDescription: '';
    createdAt = '';
    updatedAt = '';
};

export class FilterSelectedRowsRoomList {
    bookingRoomId = '';
};

export class ChargeTotal {
    totalCharge = '';
    totalTax = '';
    totalRate = '';
    discount = '';
};

export class Room  {
    bookingRoomId = '';
    bookingId = '';
    roomTypeId = '';
    roomId = '';
    roomName = '';
    bookingRoomStatusId = '';
    roomTypeName = '';
    baseAdult = '';
    baseChild = '';
    maxAdult = '';
    maxChild = '';
    baseRate = '';
    increaseRate = '';
    totalRoom = '';
    roomDescription = '';
    createdAt = '';
    updateAt = '';
    bookingRoomStatusName = '';
};

export class ChargeList {
    bookingRoomId = '';
    chargeCategory = '';
    chargeCreatedAt = '';
    chargecreatedBy = '';
    chargeId = '';
    chargeNote = '';
    chargeRate = '';

};

export class AddingPayment {
    bookingId = '';
    paymentTypeId = '';
    totalPaid = '';
    paymentNote = '';
    createdBy = '';
    paymentRemark = 'charge';
};

export class AddingDeposit {
    bookingId = '';
    paymentTypeId = '';
    totalPaid = '';
    paymentNote = '';
    createdBy = '';
    paymentRemark = 'add_deposit';
};

export class ReturnDeposit  {
    bookingId = '';
    paymentTypeId = '';
    totalPaid = '';
    paymentNote = '';
    createdBy = '';
    paymentRemark = 'return_deposit';
};

export class AssignRoom  {
    bookingRoomId = '';
    roomId = '';
    roomName= '';
};
export class Deposit {
    bookingRoomId = 0;
    paymentCategory = '';
    paymentCreatedAt = '';
    paymentCreatedBy = '';
    paymentDate = '';
    paymentId = 0;
    paymentNote = '';
    paymentNumber = '';
    paymentRemark = '';
    paymentStatus = '';
    paymentTypeDbStatus = '';
    paymentTypeId = 0;
    paymentTypeName = '';
    paymentUpdatedAt = '';
    paymentUpdatedBy = '';
    totalAmount = 0;
    totalPaid = 0;
    totalRate = 0;
    totalTax = 0;
};
export class Payment {
    bookingRoomId = 0;
    paymentCategory = '';
    paymentCreatedAt = '';
    paymentCreatedBy = '';
    paymentDate = '';
    paymentId = 0;
    paymentNote = '';
    paymentNumber = '';
    paymentRemark = '';
    paymentStatus = '';
    paymentTypeDbStatus = '';
    paymentTypeId = 0;
    paymentTypeName = '';
    paymentUpdatedAt = '';
    paymentUpdatedBy = '';
    totalAmount = 0;
    totalPaid = 0;
    totalRate = 0;
    totalTax = 0;
};

export class FormAddStay {
    bookingId = '';
    duration = '';
    updatedBy = '';
}

export class FormLessStay {
    arrivalDate = new Date();
    departureDate = new Date();
    duration = 0;
    updatedBy = '';
}

export class LessDateArray {
    bookingId = '';
    lessDate = new Date();
}

export class RoomListBooking {
    available = '';
    roomTypeId = '';
    roomTypeName = '';
    check = false;
}

