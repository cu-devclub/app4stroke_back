# Error Handler
Easy handle http error

## Import

```typescript
import httpError from '../errorHandler/httpError/httpError';

```

httpError path is `src/errorHandler/httpError/httpError`
```
src/errorHandler/
└── httpError
    ├── Component
    │   ├── BadRequestError.ts
    │   ├── ForbiddenError.ts
    │   ├── InternalServerError.ts
    │   ├── NotFoundError.ts
    │   ├── RequestTimeoutError.ts
    │   ├── TooManyRequestError.ts
    │   ├── UnauthorizedError.ts
    │   ├── UnprocessableEntityError.ts
    │   ├── baseError.ts
    │   ├── conflictError.ts
    │   └── httpStatus.ts
    └── httpError.ts
```

## Usage
`
httpError(statusCode,description)
`

- status : number
- description (Optional) : string

## Example
```typescript
import httpError from '../errorHandler/httpError/httpError';

const = Auth = (req: Request, res: Response) => {
    res.status(401).send(httpError(401,"you don't have permission"))
};
```
