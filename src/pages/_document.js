import Document, { Html, Head, Main, NextScript } from 'next/document'
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <meta name="facebook-domain-verification" content="63zvanycz01c5njw5jrt0op3hb06ij" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://tytademo.devmds.com/toyota-lunay-feature-you.png" />
        <meta property="og:title" content="Featuring You Lunay X Toyota" />

        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument