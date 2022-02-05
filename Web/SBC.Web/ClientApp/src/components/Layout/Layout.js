﻿import React, { Component } from 'react';
import NavBar from './NavBar';

export class Layout extends Component {

    render(){
     return (
        <>
            <NavBar />
            <main>
                {this.props.children}
             </main>

        </>
       );
    }
}
