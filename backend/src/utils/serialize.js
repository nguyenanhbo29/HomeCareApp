function toApiItem(doc) {
  if (!doc) {
    return null;
  }

  // Chuyển Mongoose Document -> Object thuần
  const obj = doc.toObject ? doc.toObject() : doc;

  const { _id, __v, ...rest } = obj;

  return {
    id: _id.toString(),
    ...rest,
  };
}

function toApiList(docs) {
  return docs.map(toApiItem);
}

module.exports = {
  toApiItem,
  toApiList,
};
