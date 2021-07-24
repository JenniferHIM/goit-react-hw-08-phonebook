import { ContactForm, ContactList, Filter } from 'components';

const Contacts = () => {
  return (
    <div className="myPhonebook">
      <h2 className="bigHeader">My phonebook</h2>
      <ContactForm />
      <Filter />
      <h2 className="smallHeader">My contacts:</h2>
      <ContactList />
    </div>
  );
};

export default Contacts;