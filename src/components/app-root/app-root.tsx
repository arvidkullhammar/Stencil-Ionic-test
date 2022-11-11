import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  // shadow: true,
})
export class AppRoot {
  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route-redirect from="/" to="/home"></ion-route-redirect>
          <ion-route url="/home" component="page-home"></ion-route>
          <ion-route url="/detail/:item" component="page-detail"></ion-route>
        </ion-router>

        <ion-nav></ion-nav>
      </ion-app>
    );
  }
}
