{
    "composition": {
        "type": "let",
        "declarations": {
            "params": null
        },
        "components": [
            {
                "type": "finally",
                "body": {
                    "type": "function",
                    "function": {
                        "exec": {
                            "kind": "nodejs:default",
                            "code": "args => { params = args }"
                        }
                    }
                },
                "finalizer": {
                    "type": "if_nosave",
                    "test": {
                        "type": "mask",
                        "components": [
                            {
                                "type": "action",
                                "name": "/_/Authenticate",
                                "path": ".test"
                            }
                        ]
                    },
                    "consequent": {
                        "type": "finally",
                        "body": {
                            "type": "function",
                            "function": {
                                "exec": {
                                    "kind": "nodejs:default",
                                    "code": "() => params"
                                }
                            }
                        },
                        "finalizer": {
                            "type": "mask",
                            "components": [
                                {
                                    "type": "action",
                                    "name": "/_/GetImageFromCreativeCloud",
                                    "path": ".consequent"
                                }
                            ]
                        }
                    },
                    "alternate": {
                        "type": "finally",
                        "body": {
                            "type": "function",
                            "function": {
                                "exec": {
                                    "kind": "nodejs:default",
                                    "code": "() => params"
                                }
                            }
                        },
                        "finalizer": {
                            "type": "mask",
                            "components": [
                                {
                                    "type": "action",
                                    "name": "/_/SendSlackMessage",
                                    "path": ".alternate"
                                }
                            ]
                        }
                    }
                }
            }
        ],
        "path": ""
    },
    "ast": {
        "type": "if",
        "test": {
            "type": "action",
            "name": "/_/Authenticate"
        },
        "consequent": {
            "type": "sequence",
            "step1": {
                "type": "action",
                "name": "/_/GetImageFromCreativeCloud",
            },
            "step2": {
              "type" "try",
              "body": {
                "type": "action",
                "name": "/_/UploadImageToCreativeCloud"
              },
              "handler": {
                "type": "action",
                "name": "/_/SendEmail"
              }
            }

        },
        "alternate": {
            "type": "action",
            "name": "/_/SendSlackMessage"
        }
    },
    "version": "0.12.0"
}
