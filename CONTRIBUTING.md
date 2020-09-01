# Contributing to EON
🎉 First off, thanks for your willingness to contribute to the eon project. 🎉

This file contains all the information you should know before contributing to eon.

## What do I have to know before conrtibuting?
Know how to use eon. Take the time to read the documentation (https://eon.js.org), and create a simple project to get a feel for what eon is, and how to use it.

## Know the codebase
Before contributing to a project, you should know the codebase. In this section I will give a *brief* overview of where what code lives, and what it does.

- /index.js: This is the entry point, loaded when someone requires eon. All that happens here is that the **Eon Engine** is imported, and
  a factory function is exported that creates a new instance of the Eon Enigne

- /engine: This folder contains most of the code for eon's `EonWebEngine` class
  
  - /engine/index.js: Contains the definition for the `EonWebEngine` class
  
  - /engine/path: Contains definitions for the different Path classes returned by the Engine's `.get`, `.post`, etc. methods.
    
    - /engine/path/index.js: Reexports the get.js, post.js, etc. files
    
    - /engine/path/get.js: Contains the definition for the `GETPath` class. This is used as a base for all other `Path` classes.
    
    - /engine/path/post.js: Contains the definition for the `POSTPath` class. As of `v1.11.x`, this is identical to the `GETPath` class.
    
    - /engine/path/handlers: Contains definitions for all handlers that can be attached to `Path` objects
      
      - The function of these files is well described in the [api docs](https://eon.js.org/docs/API.html)
      
      - /engine/path/handlers/streams: A nicer API for the request and response objects
        
        - /engine/path/handlers/streams/index.js: Re-exports other files in directory
        
        - incoming.js: The `IncomingHTTPData` class. This re-wraps the req argument passed to the handler by http
        
        - outgoing.js: The `OutgoingHTTPData` class. This re-wraps the res argument passed to the handler by http

## How can I contribute?
### Reporting Bugs
Before reporting a bug, try to find out exactly what steps lead up to that bug occuring so that you can give an accurate description of how to reproduce the problem.
Also, check if there is already an issue describing this bug, so that you don't create duplicate issues. If you cannot find an issue describing the same behaviour,
please try to include as many details as possible in your own reports. You should use the Bug Report issue template and fill in all the blanks, so that we can pinpoint
your issue more easily. **If you have a fix ready, please create an issue anyway**

### Requesting features
We're always happy to accept feature requests, but before you request your own features, please make sure to read this section attentively.

There are certain criteria to follow when creating a feature request:
- Use the 'feature request' issue template and describe your issue in as much detail as possible.
- Your feature should be realistically possible without violating our pledge to keep eon at 0 deps.

To submit your feature request, please create an issue using the feature request template.

### Closing issues
If you have a fix ready for a bug, or an implementation for a feature, feel free to create a pull request. If you want to start working on an issue, leave a comment saying
that you want to contribute to this issue, so that we don't have multiple pull requests against the same issue.

### Contributing features
If you have an idea for a feature, and already have an idea of how to implement it, please do still create a feature request. Begin the title with [WIP] and add a comment
saying that you're already working on it to signal that you've got this yourself. Incase you get stuck, create your pull request and attach the [help-wanted] tag to your issue.
Other contributors can then help you figure it out.

# The End
That's it. Have fun contributing to eon! 🎉
