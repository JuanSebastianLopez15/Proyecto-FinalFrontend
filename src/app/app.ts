import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './componentes/navbar/navbar';
import { Footer } from './componentes/footer/footer';
import { BannerCookies } from './componentes/banner-cookies/banner-cookies';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, BannerCookies],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}