const { v4: uuidv4 } = require("uuid"); // Import the uuid package for generating random IDs

function applyMiddleware(json, ...middlewares) {
  let modifiedData = json;

  for (const middleware of middlewares) {
    modifiedData = middleware(modifiedData);
  }

  return modifiedData;
}

function getDocId(data) {
  const brand = data.brand ? data.brand.toLowerCase() : "";
  let documentName = data.name ? data.name.trim().toLowerCase() : "";

  if (!documentName && brand) {
    documentName = uuidv4(); // Generate random ID if brand exists but name doesn't
  } else if (!documentName && !brand) {
    documentName = uuidv4(); // Generate random ID if both brand and name don't exist
  }

  const modifiedDocumentName = `${brand}-${documentName}`.replace(/\s+/g, "-");

  return { ...data, firestoreDocId: modifiedDocumentName };
}

module.exports = {
  applyMiddleware,
  getDocId,
};
