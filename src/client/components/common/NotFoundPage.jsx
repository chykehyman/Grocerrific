import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

const NotFoundPage = (props) => {
  const style = { fontWeight: 'bold' };
  const { history: { location } } = props;
  const message = ` ${location.pathname} `;

  return (
    <div className="no-items">
      <p className="lead mb-4 mt-4 display-4 text-secondary">404</p>
      <i className="fa fa-exclamation-triangle fa-3x pb-3 d-block text-secondary" />
      <p className="lead text-secondary">
        Ooops!!!.. Page with url
        <span style={style}>{message}</span>
        was not found
      </p>
    </div>
  );
};

NotFoundPage.propTypes = propTypes;

export default NotFoundPage;
