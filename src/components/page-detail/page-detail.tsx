import { Component, Fragment, h, Prop } from '@stencil/core';

@Component({
  tag: 'page-detail',
  styleUrl: 'page-detail.css',
  // shadow: true,
})
export class PageDetail {
  @Prop() item: string;
  @Prop() productName: string;
  @Prop() productDescription: string;
  @Prop() productPromo: string;
  @Prop() productId: string;
  @Prop() productPrice: string;
  @Prop() productImage: string;

  connectedCallback() {
    fetch(`https://api.winnerheads.com/api/shopitems/${this.item}`)
      .then((res: Response) => res.json())
      .then(data => {
        this.addProductInfo(data);
      });
  }

  addProductInfo(input) {
    this.productName = input.name;
    this.productDescription = input.description;
    this.productPromo = input.promoSpace.content[0].description;
    this.productId = input.id;
    this.productPrice = input.price[0].value.toString();

    console.log('productpromo', this.productPromo);
  }

  render() {
    return (
      <Fragment>
        <ion-header>
          <ion-toolbar color="primary">
            <ion-buttons slot="start">
              <ion-icon name="menu-outline"></ion-icon>
              <ion-back-button defaultHref="/home" text="" icon="arrow-back-outline"></ion-back-button>
            </ion-buttons>
            <ion-buttons slot="end">
              <ion-icon name="refresh-outline"></ion-icon>
              <ion-icon name="cart-outline"></ion-icon>
              <ion-icon name="notifications-outline"></ion-icon>
              <ion-icon name="ellipsis-vertical-outline"></ion-icon>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-grid>
            <ion-row class="hero">
              <ion-col col-12></ion-col>
            </ion-row>
          </ion-grid>
          <ion-card>
            <ion-card-header>
              <ion-card-title>{this.productName}</ion-card-title>
              <ion-card-subtitle>
                {this.productDescription} {this.productPrice} SEK
              </ion-card-subtitle>
            </ion-card-header>

            <ion-card-content>
              <ion-item>
                <ion-label innerHTML={this.productPromo}> </ion-label>
              </ion-item>
            </ion-card-content>
          </ion-card>
        </ion-content>
      </Fragment>
    );
  }
}
