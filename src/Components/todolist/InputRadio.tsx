import React, { useState } from 'react';

export default function InputRadio({ radios }: any) {
  const [checkboxClick, setCheckboxClick] = useState(radios[0].value);

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxClick(e.target.value)
    console.log(checkboxClick)
  }

  return (
    <>
      {radios.map((v: any) => (
        <div className="radioWrap" key={v.value}>
          <label className={`box radio ${checkboxClick === v.value ? 'checkedRadio' : ''}`} >
            <input
              type='radio'
              name='repeat'
              value={v.value}
              className="displayNone"
              onChange={handleCheckbox}
            />
            {v.text}
          </label>
        </div>
      ))}
    </>
  )
}