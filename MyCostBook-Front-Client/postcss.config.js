module.exports = {
    plugins: {
        "postcss-px-to-viewport": {
            unitToConvert: "px",
            viewportWidth: 420, // ��窗的宽度，对应的是我们设计�
            // unitPrecision: 6,
            // propList: ['*'],
        }
    }
}