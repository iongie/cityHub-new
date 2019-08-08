import { Component, OnInit, OnDestroy } from '@angular/core';
import { PropertyInformationService } from '../../../services/property-information/property-information.service';
import { Router } from '@angular/router';
import { UserRoleService } from '../../../services/user-role/user-role.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Subject } from 'rxjs';
import { NotificationService } from '../../../services/notification/notification.service';
import { takeUntil } from 'rxjs/operators';
import { CountryService } from '../../../services/country/country.service';

@Component({
  selector: 'ngx-property-information',
  templateUrl: './property-information.component.html',
  styleUrls: ['./property-information.component.scss']
})
export class PropertyInformationComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  // propertyInfo = {
  //   address: '',
  //   city: '',
  //   countryId: '',
  //   phoneNumber: 0,
  //   propertyId: '',
  //   propertyName: '',
  //   updatedBy: '',
  //   website: '',
  // }
  propertyInfo: any;
  country: any;
  show: any;
  forRole: any;
  userCityHub: any;
  constructor(
    public countryServ: CountryService,
    public propertyInfoServ: PropertyInformationService,
    public router: Router,
    public userRoleServ: UserRoleService,
    public authServ: AuthService,
    public notifServ: NotificationService,
  ) { }

  ngOnInit() {
    this.refreshPropertyInformation();
    this.getPropertyInformation();
    this.getCountry();
    this.detailAccount();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  refreshPropertyInformation() {
    this.propertyInfoServ.refresh.subscribe(() => {
      this.getPropertyInformation();
    });
  }

  getPropertyInformation() {
    const data = {
      token: localStorage.getItem('p_l1oxt'),
    };
    this.authServ.detailAfterLogin(data).pipe(takeUntil(this.subs)).subscribe(res => {
      this.forRole = {
        id : res[0].privilege_id,
      };
      this.userRoleServ.getByPrivilegeId(this.forRole).pipe(takeUntil(this.subs)).subscribe(resUserRole => {
        const filter = resUserRole.filter((forResUserRole) => {
          return forResUserRole.module_name === 'room_type_module';
        });

        if (filter[0].create_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].create_permision === 'not allowed') {
          this.show = false;
        }if (filter[0].read_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].read_permision === 'not allowed') {
          this.show = false;
        }if (filter[0].update_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].update_permision === 'not allowed') {
          this.show = false;
        }if (filter[0].delete_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].delete_permision === 'not allowed') {
          this.show = false;
        }

        this.propertyInfoServ.get().pipe(takeUntil(this.subs)).subscribe(resPropertyInformation => {
          this.countryServ.get().pipe(takeUntil(this.subs)).subscribe(resCountry => {
            this.propertyInfo = resPropertyInformation.map((forResPropertyInformation) => {
              const country = resCountry.filter((forResCountry) => {
                return  forResCountry.country_id = forResPropertyInformation.country_id;
              });
              console.log(country);
              const dataResPropertyInformation = {
                address: forResPropertyInformation.address,
                city: forResPropertyInformation.city,
                countryId: forResPropertyInformation.country_id,
                countryName: country[0].country_name,
                createdAt: forResPropertyInformation.address,
                createdBy: forResPropertyInformation.created_by,
                phoneNumber: forResPropertyInformation.phone_number,
                propertyId: forResPropertyInformation.property_id,
                propertyName: forResPropertyInformation.property_name,
                updatedAt: forResPropertyInformation.updated_at,
                updatedBy: forResPropertyInformation.updated_by,
                website: forResPropertyInformation.website,
              };
              return dataResPropertyInformation;
            });
            console.log(this.propertyInfo);
          });
        });
      });
    });
  }

  getCountry() {
    this.countryServ.get().pipe(takeUntil(this.subs)).subscribe(resCountry => {
      this.country = resCountry.map((forResCountry) => {
        const dataResCountry = {
          countryId : forResCountry.country_id,
          countryName : forResCountry.country_name,
        };
        return dataResCountry;
      });
    });
  }

  detailAccount() {
    const data = {
      token: localStorage.getItem('p_l1oxt'),
    };
    this.authServ.detailAfterLogin(data).pipe(takeUntil(this.subs)).subscribe(res => {
      this.userCityHub = {
        name : res[0].full_name,
      };
      console.log(this.userCityHub.name);
    });
  }

  updatePropertyInformation() {
    const data = {
      address: this.propertyInfo[0].address,
      city: this.propertyInfo[0].city,
      countryId: this.propertyInfo[0].phoneNumber,
      phoneNumber: this.propertyInfo[0].phoneNumber,
      propertyId: this.propertyInfo[0].propertyId,
      propertyName: this.propertyInfo[0].propertyName,
      updatedBy: this.userCityHub.username,
      website: this.propertyInfo[0].website,
    };

    this.propertyInfoServ.update(data).pipe(takeUntil(this.subs)).subscribe(res => {
      const title = 'Property Information';
      const content = 'Data has been updated';
      this.notifServ.showSuccessTypeToast(title, content);
      this.router.navigate(['pages/property-information']);
    }, err => {
      const title = 'Property Information';
      const content = 'Error';
      this.notifServ.showInfoTypeToast(title, content);
    });
  }

}
