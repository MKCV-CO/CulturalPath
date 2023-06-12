'use strict'
import { alterColor } from './header-footer.js';

import './router.js'

document.addEventListener('DOMContentLoaded', function () {
  const navbarCheckbox = document.getElementById('navbar__checkbox');
  const navbarCloseButton = document.querySelector('.navbar__close');

  navbarCloseButton.addEventListener('click', function () {
    navbarCheckbox.checked = false;
  });
});
