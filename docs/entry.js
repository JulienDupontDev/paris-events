
    window.reactComponents = {};

    window.vueComponents = {};

  
      import React from "react";

      import ReactDOM from "react-dom";


      import ReactWrapper from '../node_modules/better-docs/lib/react-wrapper.js';

      window.React = React;

      window.ReactDOM = ReactDOM;

      window.ReactWrapper = ReactWrapper;

    
    import './styles/reset.css';

    import './styles/iframe.css';

  import Component0 from '../src/components/TableSearch/subComponents/Categories.js';
reactComponents['Categories'] = Component0;

import Component1 from '../src/components/TableSearch/subComponents/Switch.js';
reactComponents['CustomSwitch'] = Component1;

import Component2 from '../src/components/TableSearch/subComponents/EventDatePicker.js';
reactComponents['EventDatePicker'] = Component2;

import Component3 from '../src/components/EventDetails/index.js';
reactComponents['EventDetails'] = Component3;

import Component4 from '../src/components/EventsMap/index.js';
reactComponents['EventsMap'] = Component4;

import Component5 from '../src/components/Home/index.js';
reactComponents['Home'] = Component5;

import Component6 from '../src/components/Navbar/index.js';
reactComponents['Navbar'] = Component6;

import Component7 from '../src/components/ResultItemsList/index.js';
reactComponents['ResultItemsList'] = Component7;

import Component8 from '../src/components/Pagination/index.js';
reactComponents['ResultPagination'] = Component8;

import Component9 from '../src/components/TableSearch/subComponents/Search.js';
reactComponents['SearchInput'] = Component9;

import Component10 from '../src/components/TableSearch/subComponents/SimpleSelect.js';
reactComponents['SimpleSelect'] = Component10;

import Component11 from '../src/components/TableSearch/index.js';
reactComponents['Sorting'] = Component11;