const fs = require('fs-jetpack');
const rimraf = require('rimraf');

rimraf('../dist', (err) => {
    if (err) {
        console.error(err);
    } else {
        fs.move('build', '../dist');
    }
});