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
        <meta name="facebook-domain-verification" content="63zvanycz01c5njw5jrt0op3hb06ij" />
        <link rel="icon" href="/favicon.png" />
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