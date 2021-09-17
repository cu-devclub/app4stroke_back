# Upload to AWS S3

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
console.log(URI); // { "url": "s3://app4stroke/folder1/folder2/testfile.ext", "gsutilURI": "https://app4stroke.s3.ap-southeast-1.amazonaws.com/folder1/folder2/testfile.ext" }
```

# Download from AWS S3

## Import

```typescript
import download from '../middlewares/download';

```

## Usage
`
download(filePath, req, res)
`

- filePath : string

## Example
```typescript
import download from '../middlewares/download';

await download("folder1/folder2/testfile.ext", req, res);
```