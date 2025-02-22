<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="#" width="200" alt="Logo proyecto" /></a>
</p>

🥼🧪 GESTIÓN DE EVENTOS

Proyecto de gestión de eventos.

# Ejecutar proyecto

1. Clonar el repositorio

```
https://github.com/helmer9006/eventos.git
```

2. Ejecutar

```
npm install
```

3. Tener Nest CLI instalado

```
npm install -g @nestjs/cli
```

4. Clonar el archivo `.env.template` y renombrar la copia a `.env`

5. Validar variables de entorno para conexión a la base de datos según ambiente.
   Para mejorar proceso de revisión se deja cadena de conexión a base de datos en la nube.

```
DATABASE_URL=postgresql://helmer90:hKEJoRa5JYeSCmsSrLfxIDFwJPK9aiqy@dpg-cusgrfd6l47c73e4mjsg-a.oregon-postgres.render.com/eventos_zz8y
```

6. Llenar las variables de entorno definidas en el `.env`

7. Para la variable de entorno de EMAIL_PASSWORD realizar el siguiente proceso en su cuenta de correo gmail.
   EMAIL_PASSWORD debe llevar el valor de la contraseña creada en gmail

```
1. Ir a Configuración de cuenta > Seguridad > Contraseñas de aplicación
2. Genera una nueva contraseña de aplicación
```

8. Instalar redis para diligencia variable de entorno:

```
docker run --name redis -p 6379:6379 -d redis
```

9. Mantener el valor de la variable JWT_SECRET=S3Cr3t@24$Pass$@Q
   Para garantizar que el usuario test funcione con la db en la nube.
10. Ejecutar aplicación en dev:

    ```
    npm run start:dev
    ```

11. La documentación la pueden ver en el link:

```
http://localhost:3001/cs/docs
```

usuario: admin y la clave es la que se proporcione en el env SWAGGER_PASS

# Build de producción

1. Crear el archivo `.env.prod` y `docker-compose.prod.yaml`
2. Diligenciar los archivos según corresponda con las variables de entorno
3. Crear la nueva imagen

```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

# Stack usado

- PostgreSQL
- NestJS
- Prisma ORM

# Notas

- **Modulo de prisma**:

Para acceso a base de datos, recordar ejecutar el comando de generacion antes de trabajar con los datos y clases del cliente de prisma.

```sh
npx prisma generate
```

importante que cuando se haga cambios al modelo, regenerar las migraciones con los siguiente comandos:

```sh
npx prisma migrate dev
```
