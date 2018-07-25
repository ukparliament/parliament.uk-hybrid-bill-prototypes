// Polyfill to enable 'forEach' in non ES6 supported browser
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

// Add aria attritube to <noscript> tags
UK_Parliament.nsAria = function () {
  if (document.querySelector('body.has-js')) {
    if (document.getElementsByTagName('noscript')) {

      // Grab all <noscript> tags
      var nsTags = (document.getElementsByTagName('noscript'));

      // Loop through collected tags and add aria attribute
      for (var i = 0; i < nsTags.length; i++) {
        nsTags[i].setAttribute('aria-hidden', 'true');
      }

    }
  }
};

UK_Parliament.nsAria();

// Function to show/hide petition completion message when radio checked
UK_Parliament.petitionCheck = function () {
  if (document.getElementById('petitionCheckStatus')) {
    var radioYes = document.getElementById('petition-check-yes');
    var radioNo = document.getElementById('petition-check-no');
    var message = document.getElementById('petitionCheckStatus');

    message.style.display = 'block';

    radioYes.addEventListener('click', function () {
      message.style.display = 'none';
    });

    radioNo.addEventListener('click', function () {
      message.style.display = 'block';
    });
  }
};

UK_Parliament.petitionCheck();

// Function to enable/disable form submit buttons using form elements
UK_Parliament.enableSubmit = function () {

  if (document.querySelector('[data-submit="disabled"]')) {

    var forms = document.querySelectorAll('form');

    // Enabled button attribute and styling
    var styleEnable = function (userButton, userButtonClass) {
      userButton.disabled = false;
      userButton.className = userButtonClass;
      userButton.setAttribute('aria-live', 'assertive');
    };

    // Disabled button attribute and styling
    var styleDisable = function (userButton) {
      userButton.disabled = true;
      userButton.className = 'btn--disabled';
      if (userButton.hasAttribute('aria-live')) userButton.removeAttribute('aria-live');
    };

    forms.forEach(function (elements, index) {

      if (elements.querySelector('[data-submit="disabled"]')) {

        // Grab form submit button and button classes
        var userButton = elements.querySelector('button[type="submit"]');
        var userButtonClass = userButton.className;

        // Disable form submit button
        styleDisable(userButton);

        // Grab all elements that has required data attributes
        var inputChecks = elements.querySelectorAll('[data-submit="disabled"]');

        inputChecks.forEach(function (element, index) {

          // Handle checkbox element
          if (element.type == 'checkbox') {
            element.addEventListener('click', function () {
              if (this.checked) {
                styleEnable(userButton, userButtonClass);
              } else {
                styleDisable(userButton);
              }
            });
          }

          // Handle radio button group
          if (element.type == 'radio') {

            // Grab name of radio group and then collection of same name
            var inputCheckName = element.name;
            var inputCheckNamesArray = document.getElementsByName(inputCheckName);

            // function to set submit button type from radio selection
            var styleSetRadio = function () {
              if (this.dataset.submit == 'disabled' && this.checked) {
                styleDisable(userButton);
              } else {
                styleEnable(userButton, userButtonClass);
              }
            };

            // Loop radio group and grab clicked radio button
            for (var x = 0; x < inputCheckNamesArray.length; x++) {
              inputCheckNamesArray[x].addEventListener('click', styleSetRadio, false);
            }
          }
        });
      }
    });
  }
};

UK_Parliament.enableSubmit();

// Function to listen for checked radio buttons and change form action
UK_Parliament.radioRouting = function () {
  if (document.getElementById('submitterType')) {

    var radios = document.querySelectorAll('input[type=radio]');

    for (var i = 0; i < radios.length; i++) {
      radios[i].onclick = function () {
        var route = getCheckedRadioIndex(radios);
        document.getElementById('submitterType').action = route;
      };
    }
  }

  function getCheckedRadioIndex(radios) {
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        var r = radios[i].dataset.route;
        return r;
      }
    }
  }
};

UK_Parliament.radioRouting();

// Function to show/hide content for representative details
UK_Parliament.representativeToggle = function () {
  if (document.getElementById('repDetails')) {
    var selectRep = document.getElementById('repDetails');
    var checkRep = document.getElementById('ext-rep');
    var checkInd = document.getElementById('ind-only');

    selectRep.style.display = 'none';

    checkRep.addEventListener('click', function () {
      selectRep.style.display = 'block';
    });

    checkInd.addEventListener('click', function () {
      selectRep.style.display = 'none';
    });
  }
};

UK_Parliament.representativeToggle();

// Function to show/hide content for country selection (Individual)
UK_Parliament.countryPetitioner = function () {
  if (document.getElementById('countrySelect')) {
    var indCntSl = document.getElementById('countrySelect');
    var indCntUk = document.getElementById('country-uk');
    var indCntRw = document.getElementById('country-row');

    indCntSl.style.display = 'none';

    indCntUk.addEventListener('click', function () {
      indCntSl.style.display = 'none';
    });

    indCntRw.addEventListener('click', function () {
      indCntSl.style.display = 'block';
    });
  }
};

UK_Parliament.countryPetitioner();

// Function to show/hide content for country selection (Representative)
UK_Parliament.countryRepresentative = function () {
  if (document.getElementById('countrySelectRep')) {
    var repCntSl = document.getElementById('countrySelectRep');
    var repCntUk = document.getElementById('country-uk-rep');
    var repCntRw = document.getElementById('country-row-rep');

    repCntSl.style.display = 'none';

    repCntUk.addEventListener('click', function () {
      repCntSl.style.display = 'none';
    });

    repCntRw.addEventListener('click', function () {
      repCntSl.style.display = 'block';
    });
  }
};

UK_Parliament.countryRepresentative();

// Dropdown switch for hiding/showing content using form elements
UK_Parliament.dropdownSwitch = function () {

  if (document.querySelector('[data-dropdown="switch"]')) {

    // Grab all elements which act as content switches
    var dropdownSwitcherList = document.querySelectorAll('[data-dropdown="switch"]');

    // Grab all elements which act as content content blocks
    var dropdownContentList = document.querySelectorAll('[data-dropdown-content]');

    // Find closest parent element function
    var closestParentElement = function (el, fn) {
      return el && (fn(el) ? el : closestParentElement(el.parentElement, fn));
    };

    // Show hidden content blocks function
    var contentShow = function (dc) {
      dc.style.display = 'block';
    };

    // Hide visible content blocks function
    var contentHide = function (dc) {
      dc.style.display = 'none';
    };

    // Set default content visibility state
    dropdownContentList.forEach(function (elements) {

      // Grab visibility state (show/hide) of each content block
      var dropdownContentInitalState = elements.getAttribute('data-dropdown-content');

      if (dropdownContentInitalState === 'show') {
        contentShow(elements);
      } else if (dropdownContentInitalState === 'hide') {
        contentHide(elements);
      }
    });

    // Loop through content switches
    dropdownSwitcherList.forEach(function (elements) {

      // Grab the switch/content holder using closestElement function
      var dropdownHolder = closestParentElement(elements, function (el) {
        return el.querySelector('[data-dropdown-content]');
      });

      // Grab the content block associated with holder and switch
      var dropdownContent = dropdownHolder.querySelector('[data-dropdown-content]');

      // Store reference to content data attribute
      var dropdownContentState = dropdownContent.getAttribute('data-dropdown-content');

      // Handle checkbox switches
      if (elements.type === 'checkbox') {
        elements.addEventListener('click', function () {
          if (this.checked) {
            if (dropdownContentState === 'show') {
              contentHide(dropdownContent);
            } else if (dropdownContentState === 'hide') {
              contentShow(dropdownContent);
            }
          } else {
            if (dropdownContentState === 'show') {
              contentShow(dropdownContent);
            } else if (dropdownContentState === 'hide') {
              contentHide(dropdownContent);
            }
          }
        });
      }

      // Handle radio group switches
      if (elements.type === 'radio') {

        // Grab radio group name
        var inputSwitchName = elements.name;

        // Grab radio group elements with that name
        var inputSwitchNamesArray = document.getElementsByName(inputSwitchName);

        // Loop radio group and grab clicked radio button
        inputSwitchNamesArray.forEach(function (radios, index) {
          radios.addEventListener('click', function () {

            if (this.getAttribute('data-dropdown') === 'switch' && this.checked) {
              if (dropdownContentState === 'show') {
                contentHide(dropdownContent);
              } else if (dropdownContentState === 'hide') {
                contentShow(dropdownContent);
              }
            } else {
              if (dropdownContentState === 'show') {
                contentShow(dropdownContent);
              } else if (dropdownContentState === 'hide') {
                contentHide(dropdownContent);
              }
            }
          });
        });
      }
    });
  }
};

UK_Parliament.dropdownSwitch();
