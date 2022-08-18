module.exports={
    parser:'@babel/eslint-parser',
    parserOptions:{
        ecmaVersion:6,
        sourceType:'module',
        ecmaFeatures:{
            jsx:true
        }
    },
    extends:["airbnb", "airbnb/hooks"],
    rules:{
        "semi": "off",
        "no-console": "warn",
        "react/react-in-jsx-scope": 0,
        "react/react-in-jsx-scope": 0,
        "react/button-has-type": 0,
        "linebreak-style":0,
        "no-undef":0,
        "react/jsx-filename-extension":0,
        "no-multi-spaces":0
    }
}