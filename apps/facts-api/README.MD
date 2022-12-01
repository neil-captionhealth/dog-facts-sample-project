# Dog Facts API

## Get a random fact

Returns a single random fact about dogs.

**URL** : `GET /api/fact`

### Parameters

| Name       | Description                                | Type    | Default |
|------------|--------------------------------------------|---------|---------|
| max_length | Maximum string length of facts             | int     |         |

### Response

```js
{
    "fact": string,
    "length": int
}
```

-----

## Get a list of facts

Returns a collection of facts about dogs.

**URL** : `GET /api/facts`

### Parameters

| Name       | Description                                         | Type    | Default |
|------------|-----------------------------------------------------|---------|---------|
| max_length | Maximum string length of facts                      | int     |         |
| limit      | Number of facts returned per page. Maximum of 1000. | int     | 10      |
| page       | Page number of facts                                | int     | 1       |

### Response

```js
{
    "total": int,
    "per_page": int,
    "current_page": int,
    "last_page": int,
    "from": int,
    "to": int,
    "first_page_url": string,
    "last_page_url": string,
    "next_page_url": string | null,
    "prev_page_url": string | null,
    "path": string,
    "data": [
        {
            "fact": string,
            "length": int
        }
    ]
}
```
