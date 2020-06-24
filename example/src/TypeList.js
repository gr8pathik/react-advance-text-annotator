import React from 'react';

export default ({types, drug}) => <div style={{width: '200px'}} className='category'>
  <ol>
    {types.map((subType, i) => {
      const termsByType = [...drug].filter(drugData => drugData.type = subType).map(drugData => drugData.term)
      return (<li key={subType + i}>
        {subType}
        <ul>
          {termsByType && termsByType.map((subItem, j) => <li key={subItem + j}><a href={'#'+subItem.replace(/[^a-zA-Z0-9]/g, '')}>{subItem}</a></li>)}
        </ul>
      </li>)
    })}
  </ol>
</div>
