import '../app/globals.css';
import 'tailwindcss/tailwind.css';
import '../fontawesome'; // Make sure this path matches where your fontawesome.js is located

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;



