# Collect rows in batches with Clickcache Server

This repository contains a server application that utilizes the [clickcache](https://github.com/bytadaniel/clickcache) package for efficient caching and a ClickHouse client for persisting data. The server receives requests with a variable number of rows, collects these rows in large batches, and then inserts them into a ClickHouse database. To simplify deployment and testing, a Docker Compose implementation is provided.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Cloning the Repository](#cloning-the-repository)
  - [Docker Compose Setup](#docker-compose-setup)
  - [Configuring the Server](#configuring-the-server)
- [Usage](#usage)
  - [Starting the Server](#starting-the-server)
  - [Sending Data to the Server](#sending-data-to-the-server)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you can use this server, ensure you have the following installed on your system:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/) (typically included with Docker)

## Getting Started

### Cloning the Repository

Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/bytadaniel/clickcache-server.git
cd clickcache-server
```

### Docker Compose Setup

This repository includes a Docker Compose configuration for the server and ClickHouse client. To set up the environment, follow these steps:

1. Navigate to the root directory of the repository.
2. Build and start the Docker containers:

```bash
docker-compose up -d
```

This command will download necessary Docker images and start the server and ClickHouse client.

### Configuring the Server

Before starting the server, you can configure it by editing the `.env` file located in the root directory. Adjust the settings to match your requirements, such as the port the server listens on and the ClickHouse connection details.

## Usage

### Starting the Server

To start the ClickCache server, run the following command from the root directory of the repository:

```bash
docker-compose up clickcache-server
```

This command will start the server, and it will begin listening for incoming requests.

### Sending Data to the Server

You can send data to the server by making HTTP POST requests. The server expects data in a specific format, so make sure to follow the server's API documentation for sending data.
```ts
  const response = await fetch('http://localhost:<port>/insert/<table>/jsoneachrow', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rows)
  })
```

## Customization
### [@clickhouse/client](https://clickhouse.com/docs/en/integrations/language-clients/javascript)
You can customize the clickhouse connection details by following these steps:
1. Add environment variables in `.env`
2. Extend clickhouse config with your variables in `env.ts` file
3. Extend clickhouse client options with your config in `clickhouse.ts`
### [clickcache](https://github.com/bytadaniel/clickcache)
You can customize the clickcache options by editing these env variables:
- `CLICKCACHE_CHUNK_SIZE`
- `CLICKCACHE_CHUNK_LIFE_MS`
- `CLICKCACHE_CHECK_INTERVAL_MS`
- `CLICKCACHE_DATA_WATCHER`
- `CLICKCACHE_DISK_OUTPUT_DIRECTORY`

## Run a demo
To run a demo please follow these steps:

1. Run clickcache-server and clickchouse-server
```bash
  docker-compose up -d
```

2. Start data sampler
```bash
  ts-node src/test.ts
```

3. Follow the clickcache-server container logs
4. Check out your dataset in the clickhouse database table

## Contributing

If you would like to contribute to this project, please open an issue or submit a pull request with your proposed changes. We welcome contributions and improvements from the community.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
