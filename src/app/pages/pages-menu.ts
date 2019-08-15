import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  // {
  //   title: 'E-commerce',
  //   icon: 'nb-e-commerce',
  //   link: '/pages/dashboard',
  //   home: true,
  // },
  // {
  //   title: 'IoT Dashboard',
  //   icon: 'nb-home',
  //   link: '/pages/iot-dashboard',
  // },
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
  },
  {
    title: 'FEATURES',
    group: true,
  }, {
    title: 'User Setting',
    icon: 'fa fa-user',
    children: [
      {
        title: 'User',
        link: '/pages/user',
      },
      {
        title: 'User Role',
        link: '/pages/user-role',
      },
    ],
  },
  {
    title: 'App Setting',
    icon: 'fa fa-cogs',
    children: [
      {
        title: 'Extra Charge',
        link: '/pages/extra-charge',
      },
      {
        title: 'Extra Charge Category',
        link: '/pages/extra-charge-category',
      },
      {
        title: 'Floor',
        link: '/pages/floor',
      },
      {
        title: 'Payment Type',
        link: '/pages/payment-type',
      },
      {
        title: 'Property Information',
        link: '/pages/property-information',
      },
      {
        title: 'Room Operation',
        link: '/pages/room-operation',
      },
      {
        title: 'Room Tariff',
        link: '/pages/room-tariff',
      },
      {
        title: 'Room Type',
        link: '/pages/room-type',
      },
      {
        title: 'Season',
        link: '/pages/season',
      },
      {
        title: 'Season Type',
        link: '/pages/season-type',
      },
      {
        title: 'Tax',
        link: '/pages/tax',
      },
    ],
  }, {
    title: 'Sales Operational',
    icon: 'fa fa-hotel',
    children: [
      {
        title: 'Booking',
        link: '/pages/booking',
      },
      {
        title: 'Misc.sales',
        link: '/pages/miscellaneous-sales',
      },
    ],
  },
  {
    title: 'Report',
    icon: 'fa fa-database',
    children: [
      {
        title: 'Daily Report',
        link: '/pages/report',
      },
    ],
  },
  
];
