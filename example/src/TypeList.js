import React from 'react';

export default ({types, drug, onCheck, colorByType}) => <div style={{width: '200px'}} className='category'>
  <ol>
    {types.map((subType, i) => {
      const termsByType = [...drug].filter(drugData => {
        return drugData.type === subType
      }).map(drugData => drugData.term)
      return (<li key={subType + i}>
        <input type='checkbox' onChange={onCheck} value={subType} defaultChecked={true} /> <mark  style={{backgroundColor: colorByType[subType]}}>{subType}</mark>
        <ul>
          {termsByType && termsByType.map((subItem, j) => <li key={subItem + j}><a href={'#'+subItem.replace(/[^a-zA-Z0-9]/g, '')}>{subItem}</a></li>)}
        </ul>
      </li>)
    })}
  </ol>
</div>
