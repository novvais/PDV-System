# PDV-System
#### A API foi desenvolvida baseada em um PDV (Frente de caixa), isso é um projeto piloto, no futuro será implementado outras funcionalidades.
#
**COMO USAR**
<details>
<summary><b>Como Funciona as Rotas</b></summary>

**Para o código funcionar você precisa adicionar uma senha entre '' da sua escolha no `.env`**

<img src="./src/assets/env_jwt.png"/>

1. Route **`GET` "listCategories"** - _Bearer Token required_

   - Add domain and API path:
     ```bash
     http://localhost:3000/categorie
     ```

   <div><img src="./src/Assets/Categories/list_categories.png"/></div>

   - Example answer:
   <div><img src="./src/Assets/Categories/res_list_categorie.png"/></div>

2. Route **`POST` "registerUser"** - _Body request required_

   - Add the domain and the API path:
     ```bash
     http://localhost:3000/user
     ```

   <div><img src="./src/Assets/Users/register_user.png"/></div>

3. Route **`POST` "login"** _Body request required_

   - Add the domain and the API path:
     ```bash
     http://localhost:3000/login
     ```
   - Add the user data to the body:
   <div><img src="./src/assets/route_login.png"/></div>

   - Example answer:
   <div><img src="./src/assets/res_route_login.png"/></div>

   **Important: Use the token generated in the response to carry out the other route tests!**

4. Route **`GET` "detailUserProfile"** - _Bearer Token required_

   - Add the domain and the API path:
     ```bash
     http://localhost:3000/user
     ```

   <div><img src="./src/Assets/Users/detail_user.png"/></div>

   - Example answer:

5. Route **`PUT` "editUser"** - _Bearer Token required_

   - Add domain and API path:
     ```bash
     http://localhost:3000/user
     ```

   <div><img src="./src/Assets/Users/edit_user.png"/></div>

6. Route **`POST` "registerProduct"** - _Bearer Token required_

   - Add domain and API path:
     ```bash
     http://localhost:3000/product
     ```

   <div><img src="./src/Assets/Products/register_product.png"/></div>

7. Route **`PUT` "editProductData"** - _Bearer Token required_

   - Add domain and API path:
     ```bash
     http://localhost:3000/product/1
     ```

   <div><img src="./src/Assets/Products/edit_product.png"/></div>

8. Route **`GET` "listProduct"** - _Bearer Token required_

   - Add domain and API path:
     ```bash
     http://localhost:3000/product
     ```

   <div><img src="./src/Assets/Products/list_product.png"/></div>

9. Route **`GET` "porductDetail"** - _Bearer Token required_

   - Add domain and API path:
     ```bash
     http://localhost:3000/product/1
     ```

   <div><img src="./src/Assets/Products/product_detail.png"/></div>

10. Route **`DEL` "deleteProduct"** - _Bearer Toke required_

    - Add domain and API path:
      ```bash
      http://localhost:3000/product/1
      ```

    <div><img src="./src/Assets/Products/delete_product.png"/></div>

11. Route **`POST` "file"** - _Bearer Toke required_

    - Add domain and API path:
      ```bash
      http://localhost:3000/upload
      ```
    - Click on "Body" and select "Multipart" to add your image.
    <div><img src="./src/Assets/Upload/upload.png"/></div>

12. Route **`POST` "registerClient"** - _Bearer Toke required_

    - Add domain and API path:
      ```bash
      http://localhost:3000/client
      ```

    <div><img src="./src/Assets/Clients/register_client.png"/></div>

13. Route **`PUT` "editClientData"** - _Bearer Toke required_

    - Add domain and API path:
      ```bash
      http://localhost:3000/client/1
      ```

    <div><img src="./src/Assets/Clients/edit_client.png"/></div>

14. Route **`GET` "listClient"** - _Bearer Toke required_

    - Add domain and API path:
      ```bash
      http://localhost:3000/client
      ```

    <div><img src="./src/Assets/Clients/list_client.png"/></div>

    - Example answer:
    <div><img src="./src/Assets/Clients/res_list_client.png"/></div>

15. Route **`GET` "detailClient"** - _Bearer Toke required_

    - Add domain and API path:
      ```bash
      http://localhost:3000/client/1
      ```

    <div><img src="./src/Assets/Clients/detail_client.png"/></div>

    - Example answer:
    <div><img src="./src/Assets/Clients/res_detail_client.png"/></div>

16. Route **`POST` "registerOrder"** - _Bearer Toke required_

    - Add domain and API path:
      ```bash
      http://localhost:3000/order
      ```

    <div><img src="./src/Assets/Orders/register_order.png"/></div>

17. Route **`GET` "listOrder"** - _Bearer Toke required_

    - Add domain and API path:
      ```bash
      http://localhost:3000/order
      ```

    <div><img src="./src/Assets/Orders/list_order.png"/></div>

    - Example answer:
    <div><img src="./src/Assets/Orders/res_list_order.png"/></div>

</details>
