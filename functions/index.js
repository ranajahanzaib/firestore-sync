const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { Storage } = require("@google-cloud/storage");
const { applyMiddleware, getDocId } = require("./middlewares");

admin.initializeApp();

const storage = new Storage();

const DEFAULT_COLLECTION_NAME = "unsorted-data";

exports.uploadJSONToFirestore = functions.storage
  .object()
  .onFinalize(async (object) => {
    const filePath = object.name;
    const bucket = storage.bucket(object.bucket);
    const file = bucket.file(filePath);

    try {
      const [fileContent] = await file.download();
      const json = JSON.parse(fileContent.toString());
      const collectionName = getParentFolderName(filePath);

      // Apply your middleware logic to modify the JSON data as needed
      const modifiedData = applyMiddleware(json, getDocId);

      const firestore = admin.firestore();
      const collectionRef = firestore.collection(
        collectionName || DEFAULT_COLLECTION_NAME
      );

      const documentId = modifiedData.firestoreDocId;
      delete modifiedData.firestoreDocId;

      await collectionRef.doc(documentId).set(modifiedData);

      console.log(
        `Uploaded modified JSON data from ${filePath} to Firestore collection "${
          collectionName || DEFAULT_COLLECTION_NAME
        }"`
      );
    } catch (error) {
      console.error("Error uploading JSON to Firestore:", error);
    }
  });

// Helper function to extract parent folder name from the file path
function getParentFolderName(filePath) {
  const parentPath = filePath.substring(0, filePath.lastIndexOf("/"));
  const parentFolderName = parentPath.substring(
    parentPath.lastIndexOf("/") + 1
  );
  return parentFolderName;
}
