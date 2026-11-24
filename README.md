# Frontend Restaurante

Página web de un restaurante hecha en Angular: menú de platos, reservas, domicilios, ubicación, contacto e información del negocio. Proyecto final de Técnicas de Programación Frontend.

## Integrantes

- Juan Sebastián López Guzmán
- Juan Esteban Hernandez
- Mateo Quintero

## Cómo ejecutar

Requisitos: Node.js (versión LTS) y Angular CLI (`npm install -g @angular/cli`).

```bash
git clone https://github.com/JuanSebastianLopez15/Proyecto-FinalFrontend.git
cd Proyecto-FinalFrontend
npm install
ng serve -o
```

La app queda en http://localhost:4200. Para comprobar que compila: `ng build`.

## Ramas (GitFlow)

- `main`: versión de entrega.
- `develop`: integración.
- `feature/lopez`, `feature/juanes`, `feature/mateo`: una rama de trabajo por integrante. Los cambios llegan a `develop` con Pull Request.

```bash
git fetch
git checkout feature/su-nombre
```

## Requisitos implementados

| Requisito | Ruta o componente | Estado |
|---|---|---|
| 4 menús con rutas, navbar y footer | `app.routes.ts`, `componentes/navbar`, `componentes/footer` | Base |
| Ruta 404 y enlace activo | `paginas/no-encontrado`, `routerLinkActive` en `navbar` | Base |
| Menú de platos | `/` · `paginas/menu` | Pendiente |
| Reservas | `/reservar` · `paginas/reservar` | Pendiente |
| Domicilio (drag and drop, pedido, mapa de Manizales) | `/domicilio` · `paginas/domicilio` | Pendiente |
| Geolocalización | `/ubicacion` · `paginas/ubicacion` | Pendiente |
| Contacto | `/contacto` · `paginas/contacto` | Pendiente |
| Sobre nosotros | `/nosotros` · `paginas/nosotros` | Pendiente |
| Términos y condiciones | `/terminos` · `paginas/terminos` | Pendiente |
| Formulario de registro | `/registro` · `paginas/registro` | Pendiente |
| Login, sesión y guard | `/login` · `paginas/login` · `guards/` | Pendiente |
| Cookies | `componentes/banner-cookies` · `servicios/` | Pendiente |
| Diseño responsive | `componentes/navbar` y todas las vistas | Pendiente |
| Buenas prácticas | `servicios/`, `modelos/`, `validadores/` | En curso |

## Acuerdos entre integrantes

- Las coordenadas del restaurante (junto al estadio Palogrande, Manizales) están en `src/app/modelos/restaurante.ts`.
- Todas las rutas ya están definidas en `app.routes.ts`.
- La lógica va en servicios (`src/app/servicios`), los tipos en `src/app/modelos`.

## Mockup

El mockup original está en `docs/mockup.pdf`.