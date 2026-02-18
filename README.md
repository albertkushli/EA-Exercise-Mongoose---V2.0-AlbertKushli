# EA Node.js + TypeScript + Mongoose

## 📋 Requisits Previs

Abans de començar, assegura't de tenir instal·lat:
- **Node.js**: Versió 18.x o superior (recomanada v20 per compatibilitat amb ESM).
- **MongoDB**: Una instància local en funcionament (port 27017) o una connexió a MongoDB Atlas.
- **npm**: Gestor de paquets de Node.
- **TypeScript**

Instalar TypeScript
```
npm install -g typescript
```

## Instal·lar dependències


```
npm install
```

## Tecnologías utilizadas

- **Node.js**: Un entorno de ejecución de JavaScript que permite ejecutar JavaScript en el lado del servidor.
- **TypeScript**: Lenguaje de programación de alto nivel gratuito y de código abierto que añade tipado estático a JavaScript.
- **Git**: Un sistema de control de versiones para el seguimiento de los cambios en el proyecto.
- **Mongoose**: Una libreria para usar MondoDB.
- **Pino**: Una librería para hacer logs


## Estructura 

```
├── models/
│   ├── user.ts          # Esquema i Interfície d'Usuari
│   └── organization.ts  # Esquema i Interfície d'Organització
├── services/
│   └── userService.ts   # Lògica de negoci, CRUD i Aggregations
├── config.ts            # Configuració centralitzada i Logger Pino
├── main.ts              # Punt d'entrada (Seeding i Demo)
├── package.json         # Scripts i dependències
└── tsconfig.json        # Configuració de TypeScript
```

## Execució

### Mode Desenvolupament

Executa el projecte directament en TypeScript sense compilació manual utilitzant tsx:

```
npm run dev
```

### Mode Producció

Transpila el codi a JavaScript i executa des de la carpeta dist:

```
npm run build  # Executa 'tsc'
npm start      # Executa 'node dist/main.js'
```
