# Upload to Google Cloud Storage

## Import

```typescript
import upload from '../middlewares/upload';

```

## Usage
`
upload(base64, path, name)
`

- base64 : string
- path : string
- name : string (no need for file extension)

## Example
```typescript
import upload from '../middlewares/upload';

const base64 = "somestring"; // DICOM file

const URI = await upload(base64, "folder1/folder2", "testfile");
console.log(URI); // gs://stroke_images_3/folder1/folder2/testfile.dcm
```
