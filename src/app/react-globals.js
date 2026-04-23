// The original 2016 build shipped React and ReactDOM as separate <script> tags
// and the rest of the app referred to them as implicit globals. We now bundle
// everything through Browserify, so this module restores those globals once,
// up-front, before any component modules are evaluated.
import React from 'react';
import ReactDOM from 'react-dom';

window.React = React;
window.ReactDOM = ReactDOM;

export { React, ReactDOM };
