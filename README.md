# SDK Client for Post Management

This project provides a simple SDK client that interacts with a Post API to manage posts. It includes functionalities such as creating, reading, updating, and deleting posts using a REST API. The SDK leverages a service/repository pattern and integrates environment variable management through `.env` files.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
  - [Creating the Client](#creating-the-client)
- [Testing](#testing)

## Overview

This SDK provides a simple interface for interacting with multiple services.

The SDK has only one service for now, `PostsService`, but it's written in a modular way so other modules can be easily added later. The client connects to a REST API, and the base URL for the API is configurable using environment variables.

## Installation

To install and use the SDK, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mvsantos013/sdk-chall
   ```

2. **Navigate to the project directory:**

   ```bash
   cd sdk-chall
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

Set up environment variables: Create a .env and .env.test file in the root of the project and set the API_BASE_URL variable:

```plaintext
API_BASE_URL=https://jsonplaceholder.typicode.com
```

## Usage

### Creating the Client

The SDK client provides a method to instantiate the PostsService. The client uses the Singleton pattern to ensure a single instance of the PostsService is created. You can access the PostsService by calling the postsService method with the apiBaseUrl argument.

```typescript
import sdkClient from "./src/index";

const apiBaseUrl = process.env.API_BASE_URL;
const postsService = sdkClient.postsService(apiBaseUrl);

postsService.getPosts().then((posts) => {
  console.log(posts);
});
```

## Testing

```bash
npm run test
```
