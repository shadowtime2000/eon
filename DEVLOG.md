# Devlog
This file contains information about what features are currently in development

## Plugin API
New feature for v1.14.0: Plugin API! This API allows users to create plugins that hook deep into the eon engine and provide additional functionality. It's also a way to get access to external libraries without violating the no-dependencies policy.

## Callable Engine
In version v1.14.0, The Engine will be callable, like in express, so that it can be passed to an http.createServer function.