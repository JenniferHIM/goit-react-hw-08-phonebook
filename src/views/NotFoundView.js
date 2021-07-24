import { ContactPhone } from '@material-ui/icons';
import image from 'images/unknown-page.jpg';

const NotFoundView = () => {
  return (
    <div className="unknownViewBox">
      <h2 className="unknownTitle">
        4
        <span className="unknownLogo">
          <ContactPhone className="logo" style={{ fontSize: 25 }} />
        </span>
        4
      </h2>
      <img
        src={image}
        className="unknownImage"
        aria-label="unknown page image"
      />
      <h3 className="unknownDescription">Didn't find anything here!</h3>
    </div>
  );
};

export default NotFoundView;