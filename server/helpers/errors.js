const InvalidIdError = id => new Error(`invalid id: ${id}`);
const InvalidInputError = id => new Error(`invalid id: ${id}`);
const UrlNotFoundError = id => new Error(`No url found with id: ${id}`);
const InvalidUrlError = url => new Error(`invalid url: ${url}`);

export {
  ErrInvalidId,
  ErrUrlNotFound,
  ErrInvalidUrl,
};