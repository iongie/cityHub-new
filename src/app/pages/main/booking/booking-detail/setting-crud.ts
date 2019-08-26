export class DefaultCrud {
    notFound = {
        deposit: true,
        charge: true,
        extraCharge: true,
        payment: true,
        extraPayment: true,
    };
    add = {
        deposit: false,
        charge: false,
        extraCharge: false,
        payment: false,
        extraPayment: false,
        assignRoom: false,
    };
    edit = {
        deposit: false,
        charge: false,
        extraCharge: false,
        payment: false,
        extraPayment: false,
    };
    view = {
        deposit: false,
        charge: false,
        extraCharge: false,
        payment: false,
        extraPayment: false,
        assignRoom: false,
    }
}