import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/CartService';
import { Cart } from '../../entity/Cart';
import { UserService } from '../../services/UserService';


@Component({
  selector: 'app-cart-banner',
  templateUrl: './cart-banner.component.html',
  styleUrls: ['./cart-banner.component.css']
})
export class CartBannerComponent implements OnInit {

  constructor(private cartService : CartService,
  	public user_service: UserService) { 
		cartService.refreshCart();
  }

  ngOnInit() {
  }

}
