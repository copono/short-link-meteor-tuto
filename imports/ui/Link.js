import React from 'react';

import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinkListFilter from './LinkListFilter.js'

export default () => {
    return (
        <div>
            <PrivateHeader title="Short Lnk Links"/>
            <div className="page-content">
                <LinkListFilter/>
                <AddLink/>
                <LinksList/>
            </div>  
        </div>
    );
}
