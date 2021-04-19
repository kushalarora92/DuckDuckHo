function errorHandler(err, req, res) {
  if (typeof (err) === 'string') {
    // custom application error
    return res.status(400).json({ message: err });
  }

  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    return res.status(401).json({ message: 'Invalid Token' });
  }

  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ message: 'CSRF ::: Form Tampered' });
  }

  // default to 500 server error
  return res.status(500).json({ message: err.message });
}

module.exports = errorHandler;
