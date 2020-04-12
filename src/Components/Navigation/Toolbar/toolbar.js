import React from 'react';
import classes from './toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = (props) =>(
    <header className = {classes.Toolbar}>
        <DrawerToggle click = {props.menuClick}/>
        <Logo height = "80%"/>
        <nav className = {classes.DesktopOnly}>
            <NavigationItems isAuthenticated = {props.isLoggedIn}  />
        </nav>
    </header>
);

export default Toolbar;