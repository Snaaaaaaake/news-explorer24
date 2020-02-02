const presets = [
    [
    "@babel/env",
    {
        targets: { 
            edge: "17",
            firefox: "60",
            chrome: "64",
            safari: "11.1",
			ie: "11",
			ios: "12",
			android: "67",
			esmodules: true,
        },
            useBuiltIns: "usage", 
            corejs: "3.0.0",
        },
    ],
];

module.exports = { presets };