import { Body, Controller, Get, Post, Query, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import CreateProductDto from './CreateProduct.dto.js';
import Product from './Product.js';

@Controller()
export class AppController {
  adatok = [
    {
      "name": "Vezeték nélküli egér",
      "category": "elektronika",
      "price": 8990,
      "stock": 12
    },
    {
      "name": "Programozás kezdőknek",
      "category": "könyv",
      "price": 6490,
      "stock": 4
    },
    {
      "name": "Mechanikus billentyűzet",
      "category": "elektronika",
      "price": 24990,
      "stock": 3
    },
    {
      "name": "Fekete kapucnis pulóver",
      "category": "ruházat",
      "price": 12990,
      "stock": 8
    },
    {
      "name": "Catan társasjáték",
      "category": "játék",
      "price": 11990,
      "stock": 0
    },
    {
      "name": "USB-C töltőkábel",
      "category": "elektronika",
      "price": 4990,
      "stock": 25
    },
    {
      "name": "Adidas sportcipő",
      "category": "ruházat",
      "price": 27990,
      "stock": 2
    },
    {
      "name": "A kis herceg",
      "category": "könyv",
      "price": 3990,
      "stock": 15
    },
    {
      "name": "LEGO City rendőrségi állomás",
      "category": "játék",
      "price": 34990,
      "stock": 5
    },
    {
      "name": "Bluetooth hangszóró",
      "category": "elektronika",
      "price": 15990,
      "stock": 7
    }
  ]

  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getTermekek() {
    return {
      adatok: this.adatok.toSorted((a,b) => a.price - b.price)
    }
  }

  @Get("filter")
  @Render("filter")
  filter(@Query("category") category: string) {
    return {
      adatok: this.adatok.filter(a => a.category == category).toSorted((a,b) => b.stock - a.stock)
    }
  }

  @Get("new")
  @Render("new")
  new() {}

  @Post("new")
  @Render("new")
  newPost(@Body() body: CreateProductDto) {
    if(!body.name || !body.category || !body.price || !body.stock) {
      return {}
    }

    const newProduct: Product = {
      name: body.name,
      category: body.category,
      price: parseInt(body.price),
      stock: parseInt(body.stock)
    }

    this.adatok.push(newProduct);
    
    return {
      success: true
    }
  }

  @Get("stats")
  @Render("stats")
  getStats() {
    return {
      darab: this.adatok.length,
      atlag: this.adatok.map(adat => adat.price).reduce((sum, price) => sum + price, 0) / this.adatok.length,
      max: this.adatok.toSorted((a,b) => b.price - a.price)[0].price,
      min: this.adatok.toSorted((a,b) => a.price - b.price)[0].price
    }
  }
}
