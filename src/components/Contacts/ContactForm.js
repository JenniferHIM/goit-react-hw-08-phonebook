import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { phoneOperations, phoneSelectors } from 'redux/phonebook';
import { toast } from 'react-toastify';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const ContactForm = () => {
  const [contactName, setContactName] = useState('');
  const [contactNumber, setContactNumber] = useState('+380');
  const [formIsOpen, setFormIsOpen] = useState(false);
  const contacts = useSelector(state => phoneSelectors.getContacts(state));
  const dispatch = useDispatch();

  const handleSubmit = evt => {
    evt.preventDefault();

    if (checkContacts(contacts, contactName)) {
      toast.error(`${contactName} is already in contacts.`);
    } else {
      dispatch(
        phoneOperations.addContacts({
          name: contactName,
          number: contactNumber,
        }),
      );

      reset();
    }
  };

  const checkContacts = (arr, target) => {
    return arr.find(({ name }) => name.toLowerCase() === target.toLowerCase());
  };

  const reset = () => {
    setContactName('');
    setContactNumber('+380');
  };

  const openFormToggle = () => {
    setFormIsOpen(prevState => !prevState);
  };

  return (
    <form className="subForm" onSubmit={handleSubmit} autoComplete="off">
      <div className="openSubFormBox" onClick={openFormToggle}>
        <h2 className="subFormTitle">Add new contacts:</h2>
        <div className="arrowBox">
          {!formIsOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </div>
      </div>

      {formIsOpen && (
        <div className="subFormsBox">
          <label className="subFormLabel">
            <span className="subFormLabelTitle">Name:</span>
            <input
              className="subFormInput"
              type="text"
              value={contactName}
              onChange={evt => setContactName(evt.target.value)}
              placeholder="input name"
              autoComplete="off"
              required
            />
          </label>
          <label className="subFormLabel">
            <span className="subFormLabelTitle">Phone:</span>
            <PhoneInput
              inputClass="phoneNumberClass"
              name="number"
              country={'ua'}
              value={contactNumber}
              placeholder="+38 (111) 111 11 11"
              onChange={setContactNumber}
              enableSearch
              inputProps={{ required: true }}
            />
          </label>

          <button type="submit" className="addBtn">
            Add
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;