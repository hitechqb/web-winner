export class ProductModel {
  constructor(
    {
      productId = 0,
      productModel = '',
      productName = '',
      price = '',
      discount = 0,
      description = '',
      photo = '',
    } = {}) {
    this.productId = productId;
    this.productModel = productModel;
    this.productName = productName;
    this.price = price;
    this.discount = discount;
    this.description = description;
    this.photo = photo;
  }
}

export function CreateProduct(product) {
  return Object.freeze(new ProductModel(product));
}

export function FetchProducts() {
  return [

    new ProductModel({
      productId: 'TC01',
      productModel: 'Akrapovic 01',
      productName: 'Bô xe Akrapovic',
      price: 2000000,
      description: 'Bô xe Akrapovic cho motor',
      photo: 'akrapovic.png'
    }),
    new ProductModel(
      {
        productId: 'TC02',
        productModel: 'MT 02',
        productName: 'Motor MT 15',
        price: 3500000,
        description: 'Yamaha MT15',
        photo: 'mt15.png'
      }
    ),
    new ProductModel(
      {
        productId: 'TC03',
        productModel: 'NBH 03',
        productName: 'Nón Bảo Hiểm Babe',
        price: 250000,
        description: 'Nón Bảo Hiểm Babe',
        photo: 'mubaohiem.jpg'
      }
    ),
    new ProductModel(
      {
        productId: 'TC04',
        productModel: 'OTO 03',
        productName: 'Range Rover',
        price: 4500000,
        description: 'Siêu Xe Range Rover',
        photo: 'range-rover.png'
      }
    ),
    new ProductModel({
      productId: 'TC05',
      productModel: 'Givi',
      productName: 'Áo mưa GIVI',
      price: 50000,
      description: 'Áo mưa bộ Givi',
      photo: 'givi.jpeg'
    }),
  ]
}
