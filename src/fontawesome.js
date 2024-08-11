// src/fontawesome.js
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

// Add the icons you want to use
library.add(faSearch, faShoppingCart, faFacebook, faTwitter, faInstagram);

// Ensure the icons are loaded and available in the DOM
dom.watch();

