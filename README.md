# prefectures-population-spa

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

### 環境変数設定

#### RESAS_API_KEY

RESAS APIのAPIキー。

https://opendata.resas-portal.go.jp/ でユーザ登録の上、APIキーを取得

#### RESAS_BASE_URL

RESAS APIのベースURL。

デフォルト値は `https://opendata.resas-portal.go.jp`
