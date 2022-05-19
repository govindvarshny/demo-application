module.exports = {
  '*.{js,jsx,ts,tsx,json}': (files) => {
    console.log('##################### files', files);
    const eslint = [];
    const prettier = [];

    const eslintRegExp = new RegExp('.tsx$');
    //const prettierRegExp = new RegExp('/src/');

    for (const file of files) {
      if (eslintRegExp.test(file)) {
        eslint.push(file);
      }
      //if (!prettierRegExp.test(file)) {
      prettier.push(file);
      //}
    }

    return [
      `eslint --fix ${eslint.join(' ')}`,
      `prettier --write ${prettier.join(' ')}`,
    ];
  },
};
