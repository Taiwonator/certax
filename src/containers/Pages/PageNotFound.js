import React, { Component } from 'react';
import './PageNotFound.scss';
import ContentButton from '../../components/ContentButton/ContentButton';
import { Link } from 'react-router-dom';

const PageNotFound = (props) => {
    return ( 
        <div className='page-not-found-container'>
            <h2>404</h2>
            <h3>Page Not Found</h3>
            <p>We're sorry but we can't find the page you were looking for. Please go back to the homepage</p>
            <Link to='/'>
                <ContentButton text={'Go to homepage'} color={'rgb(226, 170, 96)'} inverse={true} />
            </Link>
        </div>
    );
}
 
export default PageNotFound;