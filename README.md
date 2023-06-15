# Firestore Sync - Template Repository

Firestore Sync is an open-source project template that provides a Firebase Cloud Function for automatically importing JSON data into Firestore based on Storage events.

Preview: https://www.loom.com/share/d87de9717ada431e805c9b6f5107a32e?sid=edb1fa92-2a98-4897-9f85-8eb22c117548

## Overview

Firestore Sync allows you to easily set up a Cloud Function that monitors a specified storage bucket and automatically imports JSON files into Firestore as documents. You can define middleware functions to modify the data before uploading it to Firestore, making it flexible to adapt to your specific data structure and requirements.

## Features

- Automatically import JSON data into Firestore based on Storage events.
- Apply middleware functions to modify the JSON data before uploading to Firestore.
- Folder-based mapping: JSON files in specific folders are uploaded to corresponding collections in Firestore.
- Customizable document ID generation based on data fields or random IDs.
- Easy integration with Firebase projects.

## Getting Started

To get started with Firestore Sync, make sure you have the following requirements in place:

- Cloud Firestore API, Cloud Functions API, and Cloud Storage API should be enabled for your Google Cloud project.
- Default Project Resource Location should be configured for your project.

To configure Firestore Sync for your project, follow these steps:

1. Click the "Use this template" button to create a new repository based on this template.
2. Clone the newly created repository to your local machine.
3. Install the necessary dependencies by running `npm install` in the project directory.
4. Update the project ID in the `.firebaserc` file with your Firebase project ID.
5. Customize the middleware functions in the `middlewares` directory to suit your data processing needs.

### Testing Locally

You can test the Firestore Sync function locally using Firebase emulators. Follow these steps:

1. Make sure you have the Firebase CLI installed globally on your machine.
2. Run `firebase emulators:start` in the project directory.
3. The emulators will start, including the Firestore emulator and the Functions emulator.
4. Trigger the function locally by uploading a JSON file to your configured storage bucket.

### Deployment

Deploy the Cloud Function to your Firebase project by running `firebase deploy --only functions`.

## Contributing

Contributions to Firestore Sync are welcome! If you would like to contribute to the project, please review the [contribution guidelines](CONTRIBUTING.md) for more information.

## License

Firestore Sync is released under the [MIT License](LICENSE).
