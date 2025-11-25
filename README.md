🛒 React Shop — Documentación Completa y Organizada
**************
* Importante *
************** 
los datos son válidos
************************************************************************************************
*** admin / 1234 (Admin Puede generar cambio dentro del Ecmmers agregar eliminar y editar); ****
*** emasz / 4226 (cliente que puede realizar las compras dentro del carrito);               ****
************************************************************************************************

Un proyecto de ecommerce desarrollado con React, Context API, React Router, custom hooks y una arquitectura modular orientada a escalabilidad.

📑 Índice

✔️ Introducción

📂 Estructura del Proyecto

🧱 Layout y Navegación

🔐 Sistema de Autenticación

🛒 Carrito de Compras

📦 Módulo de Productos

🧩 Hooks Personalizados

🔧 Utilidades (validateProduct, processProduct)

🧪 Componentes UI Relevantes

1️⃣ Introducción

Este proyecto usa una arquitectura modular basada en:

Context API

Custom Hooks

Componentes desacoplados

Rutas públicas, privadas y administrativas

Todo esto es orquestado desde un archivo especial llamado AppProviders, que centraliza:

AuthProvider

CartProvider

ProductsProvider

React Router

2️⃣ 📂 Estructura del Proyecto
App.jsx — Rutas principales

Define todas las rutas usando react-router-dom.

Incluye:

Rutas públicas: /, /login, /product/:id

Rutas privadas: /cart, /dashboard

Rutas admin: /admin/products

Todas se renderizan dentro del componente Layout.

3️⃣ 🧱 Layout y Navegación
Layout.jsx

Estructura visual global del sitio.

Incluye:

Navbar

Contenido dinámico (<Outlet />)

Footer

Evita duplicar código y mantiene una UI consistente.

Navbar.jsx

Sistema de navegación con comportamiento dinámico:

Cambia según usuario logueado o no

Cambia si el usuario es admin

Navbar transparente en Home, sólido en el resto

Menú responsive con hamburguesa

Opciones según rol:

Usuario	Admin	Invitado
Home, Cart	Manage Products	Login
4️⃣ 🔐 Sistema de Autenticación
AuthContext.js

Define el contexto global de autenticación.

AuthProvider.js

Maneja:

user (persistido en localStorage)

login(username)

logout()

Normaliza el nombre del usuario (trim + lowercase).

ProtectedRoute.jsx

Protege rutas para usuarios logueados.

Flujo:

Si no hay usuario → redirige a /login

Si hay usuario → muestra el contenido

AdminRoute.jsx

Protege rutas solo para administradores.

Validación:

Usuario autenticado

Usuario === "admin" (normalizado)

Si no cumple → redirige a /dashboard.

5️⃣ 🛒 Carrito de Compras
CartContext.js

Crea el contexto del carrito.

CartProvider.js

Maneja:

cart (array de productos)

addCart(item, cant)

deleteItem(id)

emptyCart()

getTotalElements()

totalQuantityOfItem()

checkout()

Centraliza toda la lógica del carrito.

6️⃣ 📦 Módulo de Productos

Gestionado por ProductsContext, con funcionalidades:

getProducts()

getProductById()

createProduct()

updateProduct()

deleteProduct()

Usado por vistas como:

Home

ProductDetail

AdminProducts

Products.jsx

Obtiene la lista de productos del contexto y la prepara para CardProducts.

Controla:

loading

error

productos

CardProducts.jsx

Componente central de visualización.

Modos:

Lista → Home / Admin / Categorías

Detalle → Página individual

Admin → Editar / Eliminar

Incluye subcomponentes:

ProductImage

ProductInformation

ProductButtons

7️⃣ 🧩 Hooks Personalizados
useHandleCart

Centraliza la lógica de:

Verificar autenticación

Agregar productos al carrito

Usa:

useCartContext()

useRequireAuthCount()

Evita repetir validaciones en cada componente.

useRequireAuthCount

Verifica autenticación antes de una acción.

Flujo:

Si no hay usuario → confirm() → redirigir a /login

Si hay usuario → permite continuar

Ideal para:

Agregar al carrito

Comprar

Guardar cambios

useProductFormContainer

Maneja toda la lógica del formulario de productos:

Estados: product, file, loading, errors

handleChange

handleFileChange

handleSubmit

Integración con processProduct

Permite separar lógica y UI.

8️⃣ 🔧 Utilidades
validateProduct

Valida campos:

name → requerido

price → mayor que 0

description → mínimo 10 caracteres

Retorna:

{
  name: "...",
  price: "...",
  description: "..."
}

processProduct

Procesa un producto antes del envío:

Valida con validateProduct

Mantiene imagen existente si no hay nueva

Sube imagen a imgbb si corresponde

Devuelve:

{
  finalProduct: {...},
  error: {}
}

9️⃣ 🧪 Componentes UI Relevantes
ProductFormUI

Formulario visual para crear/editar productos.

Props:

product

errors

loading

handleChange

handleFileChange

handleSubmit

mode ("create" | "edit")

onCancel

FormProduct

Conecta UI + lógica.

Determina modo automático

Ejecuta onSuccess y onCancel

Reutilizado por AdminProducts

🔐 Login Component — Overview

El componente Login maneja el inicio de sesión del panel administrativo del E-commerce.

Características principales

✔ Formulario accesible y estilizado

✔ Íconos reactivos para usuario y contraseña

✔ Validación local (usuario, password, longitud mínima)

✔ Posibilidad de mostrar/ocultar la contraseña

✔ Manejo de errores con mensajes claros

✔ Uso del contexto global de autenticación

✔ Redirección automática al Dashboard cuando el login es correcto

✔ Auto-focus en el campo del usuario

✔ Botón “Remember me” y “Forgot password?”

⚙ Cómo funciona

El usuario ingresa un username y password

El componente ejecuta la función validate():

Verifica campos vacíos

Verifica longitud mínima de password

Si los datos son válidos, handleSubmit() compara las credenciales con valores permitidos:

admin / 1234
emasz / 4226


Si coinciden:

Se llama a login(username) del AuthContext

Se redirige a /dashboard

Si fallan, se muestra un mensaje de error en pantalla.

🔍 Accesibilidad

Campos con aria-label

Errores con role="alert"

autoFocus usando useRef

Alternancia de contraseña con descripción accesible



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


