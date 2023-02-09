# はじめに
当サンプルコードは 2023 年 2 月 5 日現在の Amazon Pay Checkout v2(API version2)に対してものとなります。新バージョンリリース時に一部の仕様が変更される可能性があります。その旨ご理解の上、お取り扱いいただけますようお願いいたします。

# この資料の位置づけ
この資料はAmazon Pay CV2実装サンプルコードを利用する為のガイドです。なお、サンプルコードは React.js および Node.js が利用できる環境をお持ちであることを前提条件といたします。またCV2 に関する全体の概要や開発時のよくあるご質問（FAQ）については、開発者向け情報ページにまとまっておりますので、以下開発者向け情報ページをご参照ください。  
https://developer.amazon.com/ja/docs/amazon-pay/intro.html

# 当サンプルコードで確認できること
当サンプルコードを利用することで、基本的な Amazon Pay の購入フローの確認をすることができます。  
 
 
# 環境準備
## サンプルコードの取得
git cloneなどにてサンプルコードを取得してください。

```sh
│ .env
│ package.json
│ package-lock.json
│
├─client //当ディレクトリ内の構成物は省略
└─server //当ディレクトリ内の構成物は省略

```

## 設定に必要な情報の取得
この後のステップで使用する以下の情報をセラーセントラルから取得してください。

1. Public Key Id
2. Private Key
3. Client Id (別名:Store ID) 
4. Merchant Id (出品者 ID) 


取得方法の詳細について、ご不明な点がある場合は、[FAQ](http://amazonpay-integration.amazon.co.jp/amazonpay-faq-v2/detail.html?id=QA-59) にてご確認ください。

## 初期設定
### ①Private Key の配置
SANDBOX用のPrivate Key を ディレクトリ直下に配置してください。
※このキーは厳重に管理し、漏洩しているリスクがある秘密キーは絶対に使わないでください。
### ②.env の更新
.env ファイルを開き、取得された各値を設定します。以下サンプルです。

```
PORT=8080
PUBLIC_KEY_ID="SANDBOX-AGH2Y6VC2VAUJ27GG6VDFOTD" 
PRIVATE_KEY="AmazonPay_SANDBOX-AGH2Y6VC2VAUJ27GG6VDFOTD.pem"
REGION="jp"
CURRENCY_CODE="JPY"
CLIENT_ID="amzn1.application-oa2-client.242a859efb5f47f09847f3f0aebd50ca"

REACT_APP_PORT=8080
REACT_APP_MERCHANT_ID="A23YM23UEBY8FM"
REACT_APP_PUBLIC_KEY_ID="SANDBOX-AGH2Y6VC2VAUJ27GG6VDFOTD"
```

### ③client
③-1: cd client にて clientディレクトリに移動して以下を実行してください。  
③-2: npm install  
③-3: npm run build  


### ④server
④-1: cloneなどしたディレクトリ直下に戻り以下を実行してください。  
④-2: npm install  
④-3: npm start  

### ⑤テストアカウントの用意
動作を確認するためにSANDBOX環境のテスト用購入者アカウントを用意します。
テストアカウントの作成方法が不明な場合は [FAQ](http://amazonpay-integration.amazon.co.jp/amazonpay-faq-v2/detail.html?id=QA-10) にてご確認ください。
テスト用IDとPWもご利用可能です: （IDとPWは同じ） jp-amazonpay-tester@amazon.co.jp

## 疎通確認
①～⑤の設定が完了しましたら、[http://localhost:8080/](http://localhost:8080/) (デフォルト)をブラウザなどで開いてください。Amazon Pay の購入フローが完了できましたら、設定は完了となります。

## Signature 設定
当サンプルでは設定を簡易化するため都度ボタンレンダー用のSignatureを生成しておりますがpayloadが固定であれば、一度生成したものを利用し続けられますので、実運用では負荷軽減のため固定値を用いることを推奨いたします。[FAQ](http://amazonpay-integration.amazon.co.jp/amazonpay-faq-v2/detail.html?id=QA-63) もご参照ください。

