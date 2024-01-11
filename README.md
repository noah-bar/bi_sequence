# BI Sequence Readme
## Description 
BI Sequence is a temporary project designed to demonstrate the functioning of [Label Detector](https://github.com/noah-bar/bi_label_detector) and [DataObject](https://github.com/noah-bar/bi_data_object) by interpreting the following sequence: 

1. **Image Upload**: The script starts by uploading an image (`cat.jpg`) to a data storage service. This is achieved through an API call to the `DataObject` service, where the image is sent as a multipart form data request.

2. **URL Retrieval**: Once the image is uploaded, the script retrieves a publicly accessible URL for the uploaded image from the `DataObject` service.

3. **Label Detection**: The image URL is then sent to the `Label Detector` service. This service analyzes the image and returns a set of labels describing the contents of the image. 

4. **Label Conversion**: These labels are then converted into an SQL format using `LabelConvertor`, which translates the label data into a structured query language format for database integration.

5. **SQL File Upload**: Finally, the generated SQL file is uploaded back to the `DataObject` service. This file contains the structured label data derived from the image, making it suitable for further data analysis or integration into a database.

This sequence encapsulates the process of image uploading, label detection, and data conversion, showcasing the capabilities of both `Label Detector` and `DataObject` services in a practical application.
## Getting started
### Prerequisites
List all dependencies and their version needed by the project as :
- Node V21.1+
- Npm V10.2+
- Typescript V5.3+

### Test the sequence
1. Rename `.env.example` file to `.env`.
2. Complete the following variables in the `.env` file:
   - `LABEL_DETECTOR_API_URL` (localhost by default)
   - `DATA_OBJECT_API_URL`  (localhost by default)
3. Install dependencies:
  ```
  npm i
  ```
4. Try the sequence:
  ```
  npm run start
  ```

## Directory structure
```console
bi_sequence
├── data                    //contains the data used by the application.
│   └── cat.jpg
├── package-lock.json
├── package.json
├── src                      //contains the source code
│   ├── LabelConvertor.ts
│   └── app.ts
└── tsconfig.json
```
## Collaborate
### Commit Message Guidelines
To maintain clarity and consistency in our repository's history, we adhere to the following commit guidelines:
- **Descriptive Messages**: Ensure each commit message clearly describes the changes made.
- **Conventional Commits**: Follow the [Conventional Commits](https://www.conventionalcommits.org/) format, using types like `feat`, `fix`, `refactor`, `style`, `docs`, `test`, `chore`, etc.
### Branching Strategy
We use [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/) as our branching strategy. Please create feature, hotfix, or release branches as appropriate and merge them back into the main branches as per Git Flow guidelines.
### Pull Requests
Open a pull request with a clear title and description for your changes. Link any relevant issues in the pull request description.
## License
This project is open source and available under the [MIT License].
