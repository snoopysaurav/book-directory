const errorHandlerMiddleware = (err, req, res, next) => {
  return res.satus(500).json({ msg: `Something went wrong....` });
};

export default errorHandlerMiddleware;
