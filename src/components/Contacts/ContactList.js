import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { phoneOperations, phoneSelectors } from 'redux/phonebook';

import { MdAccountCircle } from 'react-icons/md';
import { CgCloseO } from 'react-icons/cg';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state =>
    phoneSelectors.getVisibleContacts(state),
  );

  useEffect(() => dispatch(phoneOperations.fetchContacts()), [dispatch]);

  return (
    <ul className="contacsList">
      {contacts.map(({ id, name, number }) => (
        <li key={id} className="contactItem">
          <MdAccountCircle id="mdAccount" className="box1" />
          <span className="contactName box2">{name}</span>
          <span className="contactNumber box3">{number}</span>
          <button
            type="button"
            className="closeBtn box4"
            onClick={() => dispatch(phoneOperations.deleteContacts(id))}
          >
            <CgCloseO />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;