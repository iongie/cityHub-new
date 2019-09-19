import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { MiscellaneousSalesService } from '../../../../services/miscellaneous-sales/miscellaneous-sales.service';
import { BusinessSourceService } from '../../../../services/business-source/business-source.service';
import { GuestService } from '../../../../services/guest/guest.service';
import { NotificationService } from '../../../../services/notification/notification.service';
import { UserRoleService } from '../../../../services/user-role/user-role.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { RoomTypeService } from '../../../../services/room-type/room-type.service';
import { RoomOperationService } from '../../../../services/room-operation/room-operation.service';
import { CountryService } from '../../../../services/country/country.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ExtraChargeService } from '../../../../services/extra-charge/extra-charge.service';
import { ExtraChargeCategoryService } from '../../../../services/extra-charge-category/extra-charge-category.service';
import { PaymentTypeService } from '../../../../services/payment-type/payment-type.service';
import { NbDialogService } from '@nebular/theme';
import { takeUntil } from 'rxjs/operators';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'ngx-miscellaneous-sales-nota',
  templateUrl: './miscellaneous-sales-nota.component.html',
  styleUrls: ['./miscellaneous-sales-nota.component.scss'],
})
export class MiscellaneousSalesNotaComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  notaMiscSales = {
    guest: {
      guestId: 0,
      countryId: 0,
      guestName: '',
      address: '',
      city: '',
      email: '',
      phoneNumber: '',
      guestFileScan: '',
      guestCreatedAt: '',
      guestUpdatedBy: '',
      countryName: '',
    },
    property: {
      propertyId: 0,
        countryId: 0,
        propertyName: '',
        address: '',
        city: '',
        phoneNumber: '',
        website: '',
        createdAt: '',
        createdBy: '',
        updatedAt: '',
        updatedBy: '',
        countryName: '',
    },
    miscSales: {
      miscSalesId: 0,
        guestId: 0,
        paymentTypeId: 0,
        miscSalesNumber: '',
        miscSalesTotal: 0,
        miscSalesDate: '',
        miscSalesNote: '',
        miscSalesStatus: '',
        miscSalesCreatedAt: '',
        miscSalesCreatedBy: '',
        miscSalesUpdatedAt: '',
        miscSalesUpdatedBy: '',
        miscSalesCancelAt: '',
        miscSalesCancelBy: '',
        miscSalesCancelReason: '',
        paymentTypeName: '',
        paymentTypeDbStatus: '',
        datePrint: new Date(),
    },
    miscSalesDetails: [
      {
        miscSalesDetailsId: 0,
        extraChargeId: 0,
        miscSalesId: 0,
        quantity: 0,
        price: 0,
        subtotal: 0,
        miscSalesDetailsStatus: '',
        extraChargeCategoryId: 0,
        extraChargeName: '',
        extraChargeRate: 0,
        extraChargeDescription: '',
        extraChargeStatus: '',
        createdAt: '',
        createdBy: '',
        updatedAt: '',
        updatedBy: '',
        extraChargeCategoryName: '',
      },
    ],
    particular: [
      {
        particular: '',
      },
    ],
    miscSalesTotal: {
      totalMiscSales: 0,
      amountToWord: '',
      paymentType: 0,
    },
  };
  constructor(
    public miscellaneousSalesServ: MiscellaneousSalesService,
    public businessSourceServ: BusinessSourceService,
    public guestServ: GuestService,
    public notificationServ: NotificationService,
    public userRoleServ: UserRoleService,
    public authServ: AuthService,
    public roomTypeServ: RoomTypeService,
    public roomOperationServ: RoomOperationService,
    public countryServ: CountryService,
    public datepipe: DatePipe,
    public router: Router,
    private activeRoute: ActivatedRoute,
    public extraChargeServ: ExtraChargeService,
    public extraChargeCategoryServ: ExtraChargeCategoryService,
    public paymentTypeServ: PaymentTypeService,
    private dialogService: NbDialogService,
    public notifServ: NotificationService,
  ) { }

  ngOnInit() {
    this.getNotaMiscSales();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getNotaMiscSales() {
    this.activeRoute.params.subscribe(params => {
      const data = {
        id: params.id,
      };
      this.miscellaneousSalesServ.getMiscNota(data)
      .pipe(takeUntil(this.subs))
      .subscribe(resNotaMiscSales => {
        const writtenForm = require('written-number');
        this.notaMiscSales.guest = {
          guestId: resNotaMiscSales.guest.guest_id,
          countryId: resNotaMiscSales.guest.country_id,
          guestName: resNotaMiscSales.guest.guest_name,
          address: resNotaMiscSales.guest.address,
          city: resNotaMiscSales.guest.city,
          email: resNotaMiscSales.guest.email,
          phoneNumber: resNotaMiscSales.guest.phone_number,
          guestFileScan: resNotaMiscSales.guest.guest_file_scan,
          guestCreatedAt: resNotaMiscSales.guest.guest_created_at,
          guestUpdatedBy: resNotaMiscSales.guest.guest_updated_at,
          countryName: resNotaMiscSales.guest.country_name,
        };

        this.notaMiscSales.property = {
          propertyId: resNotaMiscSales.property.property_id,
          countryId: resNotaMiscSales.property.country_id,
          propertyName: resNotaMiscSales.property.property_name,
          address: resNotaMiscSales.property.address,
          city: resNotaMiscSales.property.city,
          phoneNumber: resNotaMiscSales.property.phone_number,
          website: resNotaMiscSales.property.website,
          createdAt: resNotaMiscSales.property.created_at,
          createdBy: resNotaMiscSales.property.created_by,
          updatedAt: resNotaMiscSales.property.updated_at,
          updatedBy: resNotaMiscSales.property.updated_by,
          countryName: resNotaMiscSales.property.country_name,
        };

        this.notaMiscSales.miscSales = {
          miscSalesId: resNotaMiscSales.misc_sales.misc_sales_id,
          guestId: resNotaMiscSales.misc_sales.guest_id,
          paymentTypeId: resNotaMiscSales.misc_sales.payment_type_id,
          miscSalesNumber: resNotaMiscSales.misc_sales.misc_sales_number,
          miscSalesTotal: resNotaMiscSales.misc_sales.misc_sales_total,
          miscSalesDate: resNotaMiscSales.misc_sales.misc_sales_date,
          miscSalesNote: resNotaMiscSales.misc_sales.misc_sales_note,
          miscSalesStatus: resNotaMiscSales.misc_sales.misc_sales_status,
          miscSalesCreatedAt: resNotaMiscSales.misc_sales.misc_sales_created_at,
          miscSalesCreatedBy: resNotaMiscSales.misc_sales.misc_sales_created_by,
          miscSalesUpdatedAt: resNotaMiscSales.misc_sales.misc_sales_updated_at,
          miscSalesUpdatedBy: resNotaMiscSales.misc_sales.misc_sales_updated_by,
          miscSalesCancelAt: resNotaMiscSales.misc_sales.misc_sales_cancel_at,
          miscSalesCancelBy: resNotaMiscSales.misc_sales.misc_sales_cancel_by,
          miscSalesCancelReason: resNotaMiscSales.misc_sales.misc_sales_cancel_reason,
          paymentTypeName: resNotaMiscSales.misc_sales.payment_type_name,
          paymentTypeDbStatus: resNotaMiscSales.misc_sales.payment_type_db_status,
          datePrint: new Date (Date.now()),
        };

        this.notaMiscSales.miscSalesDetails = resNotaMiscSales.misc_sales_detail.map(x => {
          const datax = {
            miscSalesDetailsId: x.misc_sales_details_id,
            extraChargeId: x.extra_charge_id,
            miscSalesId: x.misc_sales_id,
            quantity: x.quantity,
            price: x.price,
            subtotal: x.subtotal,
            miscSalesDetailsStatus: x.misc_sales_details_status,
            extraChargeCategoryId: x.extra_charge_category_id,
            extraChargeName: x.extra_charge_name,
            extraChargeRate: x.extra_charge_rate,
            extraChargeDescription: x.extra_charge_description,
            extraChargeStatus: x.extra_charge_status,
            createdAt: this.datepipe.transform( x.created_at, 'yyyy-MM-dd'),
            createdBy: x.created_by,
            updatedAt: this.datepipe.transform( x.updated_at, 'yyyy-MM-dd'),
            updatedBy: x.updated_by,
            extraChargeCategoryName: x.extra_charge_category_name,
          };
          return datax;
        });

        this.notaMiscSales.particular = resNotaMiscSales.particular.map(x => {
          const datax = {
            particular: x.particular,
          };
          return datax;
        });

        this.notaMiscSales.miscSalesTotal = {
          totalMiscSales: resNotaMiscSales.misc_total.total_misc_sales,
          amountToWord: writtenForm(resNotaMiscSales.misc_total.total_misc_sales),
          paymentType: resNotaMiscSales.misc_total.payment_type,
        };
        console.log('this.notaMiscSales', this.notaMiscSales);
      });
    });
  }
  public makePdfMS()
  // tslint:disable-next-line: one-line
  {
    const data = document.getElementById('demoMS');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('doc/pdf');
      const pdf = new jsPDF ('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PDF', 0, position, imgWidth, imgHeight);
      pdf.save('Nota_' + this.notaMiscSales.miscSales.miscSalesNumber + '_Misc.Sales.pdf'); // Generated PDF
    });
  }
}
