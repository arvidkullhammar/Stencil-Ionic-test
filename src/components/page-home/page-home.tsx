import { Component, Fragment, h, Prop } from '@stencil/core';

@Component({
  tag: 'page-home',
  styleUrl: 'page-home.css',
  // shadow: true,
})
export class PageHome {
  @Prop() products: Array<any>;

  constructor() {}

  connectedCallback() {
    fetch('https://api.winnerheads.com/api/marketplace/getMarketplaceByIdString/winnerheads')
      .then((res: Response) => res.json())
      .then(data => {
        this.fetchProducts(data.space.content);
      });
  }

  fetchProducts(data) {
    this.products = [...data];
  }

  render() {
    const productList = this.products;
    console.log('products', this.products);

    return (
      <Fragment>
        <ion-header>
          <ion-toolbar color="primary">
            <ion-buttons slot="start">
              <ion-icon name="menu-outline"></ion-icon>
              <ion-back-button disabled={true} text=""></ion-back-button>
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
              <ion-col col-12>hero</ion-col>
            </ion-row>
            <ion-row class="video">
              <ion-col col-12>video</ion-col>
            </ion-row>
          </ion-grid>
          <ion-list>
            {!productList ? (
              <div>loading...</div>
            ) : (
              productList.map(item => {
                if (item.shoppingItem) {
                  const product = item.shoppingItem;
                  return (
                    <ion-item href={`/detail/${product.id.toString()}`}>
                      <ion-label>
                        <h2>{product.name} </h2>
                        <p>{product.description}</p>
                        <p>{product.price[0].value} SEK</p>
                      </ion-label>
                    </ion-item>
                  );
                }
              })
            )}
          </ion-list>
        </ion-content>
      </Fragment>
    );
  }
}
