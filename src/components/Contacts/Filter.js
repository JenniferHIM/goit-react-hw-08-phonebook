import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { phoneActions, phoneSelectors } from 'redux/phonebook';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const Filter = () => {
  const value = useSelector(state => phoneSelectors.getFilter(state));
  const [formIsOpen, setFormIsOpen] = useState(false);
  const dispatch = useDispatch();

  const openFormToggle = () => {
    setFormIsOpen(prevState => !prevState);
  };

  return (
    <div className="subForm">
      <div className="openSubFormBox" onClick={openFormToggle}>
        <h2 className="subFormTitle">Search contacts:</h2>
        <div className="arrowBox">
          {!formIsOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </div>
      </div>

      {formIsOpen && (
        <div className="subFormsBox">
          <label className="subFormLabel">
            <input
              className="subFormInput"
              type="text"
              onChange={evt =>
                dispatch(phoneActions.changeFilter(evt.target.value))
              }
              value={value}
              name="filter"
              placeholder="input name"
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default Filter;