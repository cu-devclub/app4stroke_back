# Upload to Google Cloud Storage

## Import

```typescript
import upload from '../middlewares/upload';

```

## Usage
`
upload(buffer, path, name)
`

- buffer : any
- path : string
- name : string (no need for file extension)

## Example
```typescript
import upload from '../middlewares/upload';

const URI = await upload(buffer, "folder1/folder2", "testfile");
console.log(URI); // { "url": "https://storage.cloud.google.com/stroke_images_3/folder1/folder2/testfile.ext", "gsutilURI": "gs://stroke_images_3/folder1/folder2/testfile.ext" }
```
