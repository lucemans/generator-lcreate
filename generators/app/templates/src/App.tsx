import * as React from 'react';
import { useEffect, useState } from 'react';
import { logger } from '.';
import react_logo from '../assets/react_logo.png';

export default function App(props: any) {
   
   useEffect(() => {
      logger.success('Successfully rendered App Component! Hooray 🎉');
   }, [0]);

   return (
      <div className="app">
         <pre>
            <img className="react" src={react_logo} alt=""/>
            <div className="line">Welcome to the wonderfull world of <span className="blue">react</span></div>
            <span className="luc">~Luc</span>
         </pre>
      </div>
   );
}