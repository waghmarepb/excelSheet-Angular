import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '../../_shared/services/utils.service';
import { AuthService } from 'src/app/_shared/services/auth.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ADMIN_MENUS: RouteInfo[] = [
  {
    path: '/dashboard/default',
    title: 'Dashboard',
    icon: 'ni-tv-2 text-primary',
    class: '',
  },
  {
    path: '/users/list',
    title: 'Users',
    icon: 'ni-single-02 text-primary',
    class: '',
  },
  // {
  //   path: '/people/list',
  //   title: 'People',
  //   icon: 'ni-circle-08 text-primary',
  //   class: '',
  // },
  // {
  //   path: '/glc/pending',
  //   title: 'Pending checks',
  //   icon: 'ni-bell-55 text-primary',
  //   class: '',
  // },
  {
    path: '/glc/list',
    title: 'List',
    icon: 'ni-bell-55 text-primary',
    class: '',
  },
];
export const USER_MENUS: RouteInfo[] = [
  {
    path: '/dashboard/default',
    title: 'Dashboard',
    icon: 'ni-tv-2 text-primary',
    class: '',
  },
  // {
  //   path: '/people/list',
  //   title: 'People',
  //   icon: 'ni-circle-08 text-primary',
  //   class: '',
  // },
  {
    path: '/glc/list',
    title: 'List',
    icon: 'ni-bell-55 text-primary',
    class: '',
  },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;
  public user;

  constructor(
    private router: Router,
    private utilService: UtilsService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.user = this.auth.currentUser;
    if (this.user.admin) {
      this.menuItems = ADMIN_MENUS.filter((menuItem) => menuItem);
    } else {
      this.menuItems = USER_MENUS.filter((menuItem) => menuItem);
    }

    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
}
