## next.jsを起動する
```bash
npm run dev
# or
yarn dev
```

## docker-composeでDBを作成
```bash
docker-compose up -d
docker-compose down && docker-compose build && docker-compose up -d
```

## prismaの設定
```bash
npx prisma init
npx prisma migrate dev --name init
yarn prisma studio
```

## mysqlのコマンド
```bash
mysql -utest -ptest
mysql -uroot -padmin
```

```sql
select user, host from mysql.user;
grant create, alter, drop, references on *.* to 'test'@'%' identified by 'test';
```
