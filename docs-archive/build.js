/**
 * Webassembler build config file
 */

const webAssembler = require('webassembler');
const fs = require('fs');
const path = require('path');

webAssembler.dirWalk(path.resolve(__dirname, 'docs/md'), (p, full) => {
    console.log('building path:', p);
    let md = webAssembler.buildMD(p);
    let pageNames = full.map(el => path.basename(el.replace(/.+_/, ''), '.md'));
    let pageLinks = full.map((el, i) => `<a href="/docs/${path.basename(el.replace(/.+_/, ''), '.md')}.html">${pageNames[i]}</a>`).join('\n');
    let file = webAssembler.buildFromHTMLtemplate(path.resolve(__dirname, 'docs/template.html'), md, pageLinks);
    fs.writeFileSync(path.dirname(p) + `/../${path.basename(p.replace(/.+_/, ''), '.md')}.html`, file);
});