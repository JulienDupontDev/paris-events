
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

  import Component0 from '../src/components/tableSearch/subComponents/Categories.js';
reactComponents['Categories'] = Component0;

import Component1 from '../src/components/tableSearch/subComponents/Switch.js';
reactComponents['CustomSwitch'] = Component1;

import Component2 from '../src/components/tableSearch/subComponents/EventDatePicker.js';
reactComponents['EventDatePicker'] = Component2;

import Component3 from '../src/components/eventDetails/index.js';
reactComponents['EventDetails'] = Component3;

import Component4 from '../src/components/eventsMap/index.js';
reactComponents['EventsMap'] = Component4;

import Component5 from '../src/components/home/index.js';
reactComponents['Home'] = Component5;

import Component6 from '../src/components/navbar/index.js';
reactComponents['Navbar'] = Component6;

import Component7 from '../src/components/resultItemsList/index.js';
reactComponents['ResultItemsList'] = Component7;

import Component8 from '../src/components/pagination/index.js';
reactComponents['ResultPagination'] = Component8;

import Component9 from '../src/components/tableSearch/subComponents/search.js';
reactComponents['SearchInput'] = Component9;

import Component10 from '../src/components/tableSearch/subComponents/SimpleSelect.js';
reactComponents['SimpleSelect'] = Component10;

import Component11 from '../src/components/tableSearch/index.js';
reactComponents['Sorting'] = Component11;