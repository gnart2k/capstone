# This is a capstone project of group G4 K24CNTTA.
## Getting Started

Clone this project 

Run command to install all dependency

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```


Add .env file 

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Note
#### actions/booking
- Calculate distance using haversine formula
- AddressCode = provinceId + districtId + wardId in string
- Signature of payment using information in body hash with checksum key in file .env

#### action
- folder contain server code, start with "use server", use for logic handling and access data from database use prisma
#### api
- folder contain REST API route, use for server too.
#### provider
- folder contain provider to wrap application to using util over all file/folder
#### prisma
- contain all database schema and prisma ORM configuration
#### lib
- custom library = utils 
#### initialData
- contain inital data for web site, landing page,...
#### components at root
- contain custom and generated UI component
#### app/store
- contain zustand store,
#### naming convention
- folder in app use for url, use kebab-case ex: (user-name), other: use camelCase or PascalCase 
