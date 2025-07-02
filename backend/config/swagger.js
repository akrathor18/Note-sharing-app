const swaggerData = {
    openapi: '3.0.0',
    info: {
        title: 'Simple API with Authorization',
        version: '1.0.0',
        description: 'This is a simple API documentation with authorization for login.',
    },
    paths: {},
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
};

function convertPatternToPath(path) {
    // Allow a-z, A-Z, 0-9, /, and -
    path = path.replace(/[^a-zA-Z0-9/:/-]+/g, '');
    // Replace colon-prefixed params (e.g., :id) with {id}
    path = path.replace(/:([a-zA-Z0-9_]+)/g, '{$1}');
    // Remove leading and trailing slashes
    path = path.replace(/^\/|\/$/g, '');

    return path;
}

const generateSwaggerJSONFromRouter = (router, fields, parentPath = '') => {
    const apiVersion = process.env.API_VERSION ? process.env.API_VERSION : 'v1';
    //   const swagger = {
    //     paths: {},
    //   };
    const mainRoute = `/api/${apiVersion}/`;
    // Loop through router.stack to process each route
    router.stack.forEach((layer) => {
        if (layer.route) {
            // Layer is a route
            const path = convertPatternToPath(layer.route.path);
            let fullPath = parentPath + path;

            const methods = layer.route.methods;
            // For each method in the route, generate Swagger entry
            fullPath = mainRoute + fullPath;
            Object.keys(methods).forEach((method) => {
                swaggerData.paths[fullPath] = swaggerData.paths[fullPath] || {};
                let parameters = {};
                if (fields && fields.length > 0) {
                    parameters = fields.find(
                        (item) =>
                            mainRoute + item.route === fullPath &&
                            method.toLowerCase() == item.method.toLowerCase(),
                    );
                }
                const swaggerEntry = {
                    summary: `${method.toUpperCase()} ${fullPath}`,
                    description: `Generated dynamically for ${method.toUpperCase()} ${fullPath}`,
                    tags: parameters && parameters.tag ? [parameters.tag] : ['default'],
                    security:
                        parameters && parameters.authRequired
                            ? [
                                {
                                    bearerAuth: [],
                                },
                            ]
                            : false,
                    responses: {
                        200: {
                            description: 'Successful operation',
                            // content: {
                            //   "application/json": {
                            //     example: {}, // Example response body
                            //   },
                            // },
                        },
                        // 401: {
                        //   description: "Unauthorized",
                        // },
                    },
                };
                swaggerData.paths[fullPath][method];

                if (parameters && parameters.queryParams && parameters.queryParams.length > 0) {
                    swaggerEntry.parameters = parameters.queryParams.map((param) => ({
                        name: param.name,
                        in: param.in,
                        required: param.required || false,
                        description: param.description || '',
                        schema: {
                            type: param.type || 'string',
                        },
                    }));
                }

                if (method != 'get') {
                    swaggerEntry['requestBody'] = {
                        required: true,
                        content: {
                            'application/json': {
                                example: parameters && parameters.params ? parameters.params : {}, // Add examples if needed
                            },
                        },
                    };
                }
                swaggerData.paths[fullPath][method] = swaggerEntry;
            });
        } else if (layer.handle && layer.handle.stack) {
            // Layer is a nested router
            const nestedRouter = layer.handle;
            const fullPath = parentPath + convertPatternToPath(layer.regexp.source);

            const nestedSwagger = generateSwaggerJSONFromRouter(nestedRouter, fields, fullPath);
            // Merge the nested swagger paths into the parent one
            Object.assign(swaggerData.paths, nestedSwagger.paths);
        }
    });
    //   swaggerData.paths = swagger.paths;
    return swaggerData;
};

export default generateSwaggerJSONFromRouter
