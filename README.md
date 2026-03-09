# Exercici Mongoose V2.0 - Capa de Servei i Relacions

Aquest projecte és una extensió de l'exercici de Mongoose per al seminari d'Arquitectura d'Entrega (EA). S'ha implementat una arquitectura de **Capa de Servei (Service Layer)** per gestionar la persistència de dades en una base de dades MongoDB, posant èmfasi en el tipat fort amb TypeScript i la gestió de relacions entre col·leccions.

Link de Vídeo explicatiu: https://drive.google.com/file/d/1VMGVzfbAravKk_59y2FpkS-uuBuwqpU1/view?usp=sharing


## Descripció del Projecte

L'objectiu principal ha estat implementar una nova entitat anomenada **Project** (Projecte), la qual està vinculada a una organització existent. S'han seguit els següents principis:

- **Model de Dades:** Definició d'un esquema de Mongoose amb validacions (Enums per a l'estat del projecte) i una referència (`ref`) cap a la col·lecció d'Organitzacions.
- **Service Layer:** Separació de la lògica de base de dades en funcions exportades, evitant que la lògica de control tingui accés directe als models.
- **Optimització:** Ús del mètode `.lean()` en les consultes de llistat per millorar el rendiment i reduir el consum de memòria.
- **Relacions:** Implementació de `.populate()` per recuperar la informació de l'organització vinculada a un projecte de forma automàtica.

## Estructura de fitxers afegits

- `src/models/project.ts`: Definició de la interfície `IProject` i el model `ProjectModel`.
- `src/services/projectService.ts`: Lògica CRUD (Create, Read, Update, Delete) per a l'entitat Project.
- `src/main.ts`: Punt d'entrada modificat per demostrar el funcionament del flux complet.

---

## Documentació i Referències

Per al desenvolupament d'aquest exercici s'han consultat les següents fonts:

1.  **Mongoose Documentation:** [Mongoose Models & Schemas](https://mongoosejs.com/docs/models.html) per a la definició de relacions.
2.  **TypeScript Handbook:** [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html) per a la gestió de tipus `Partial` en els serveis.
3.  **MongoDB University:** Conceptes sobre l'Aggregation Pipeline i el mètode `.populate()`.
4.  **Material del Seminari:** Apunts i exemples proporcionats a classe sobre l'arquitectura de Capa de Servei.

---

## Ús de la IA Generativa

S'ha utilitzat **IA generativa (Gemini/ChatGPT)** com a assistent de programació durant el projecte. El detall de l'assistència és el següent:

- **Depuració de Tipus:** Assistència en la resolució d'errors de TypeScript, específicament en la conversió de tipus `ObjectId` a `string` per complir amb les restriccions del compilador.
- **Estructuració del Service Layer:** Ajuda en la definició de l'estructura de les funcions asíncrones per seguir el patró de disseny de la capa de servei.
- **Optimització de Codi:** Suggeriment de l'ús de `.lean()` per a operacions de lectura massiva i la millora de la configuració del `.populate()`.
- **Documentació:** Suport en la redacció de comentaris tècnics i en la generació d'aquest fitxer README.

---

## Com executar el projecte

1. Assegura't de tenir MongoDB instal·lat i funcionant al port `27017`.
2. Instal·la les dependències: `npm install`.
3. Executa la demo: `npx tsx src/main.ts`.



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
