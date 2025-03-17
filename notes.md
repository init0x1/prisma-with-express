## working with prisma

### installing prisma

```bash
npm install -D prisma
```
### installing prisma client

```bash
npm install @prisma/client
```

### creating a new prisma project (prisma init )

```bash
npx prisma init
```

### creating a prisma schema for User model 

### generating prisma client

- we need to generate prisma client for prisma schema to use in our application 

```bash
npx prisma generate
```

### pushing schema to database

- we can push schema to database using ` npx prisma db push`  Or we can create a migration using `npx prisma migrate dev` and then push it to database using `npx prisma migrate deploy`

