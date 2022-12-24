const notFound = (req, res, next) => {
  res.status(404).send(`Route <b>${req.url}</b> doesnot exist...`);
};

export default notFound;
