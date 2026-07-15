const fs = require('fs');
const path = require('path');

function processDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;

            // Replace font classes on h1
            content = content.replace(/<h1\s+className="([^"]+)"/g, (match, classes) => {
                if (classes.includes('text-white') || classes.match(/text-[4567]xl/)) {
                    let newClasses = classes
                        .replace(/\bfont-serif\b/g, '')
                        .replace(/\bfont-sans\b/g, '')
                        .replace(/\bfont-light\b/g, '')
                        .replace(/\bfont-black\b/g, '')
                        .replace(/\bfont-extrabold\b/g, '')
                        .replace(/\bfont-medium\b/g, '')
                        .replace(/\s+/g, ' ')
                        .trim();
                    
                    if (!newClasses.includes('font-display')) {
                        newClasses = `font-display font-bold ${newClasses}`;
                    }
                    return `<h1 className="${newClasses}"`;
                }
                return match;
            });

            // Remove signature font inline styles and change to standard italic
            // Look for <span className="text-gold italic" style={{ fontFamily: 'var(--font-signature)' ... }}>
            content = content.replace(/<span\s+className="([^"]*)"\s+style=\{\{[^}]*\}\}/g, (match, classes) => {
                if (match.includes('font-signature') || match.includes('var(--font-signature)')) {
                    let newClasses = classes;
                    if (!newClasses.includes('italic')) {
                        newClasses += ' italic';
                    }
                    return `<span className="${newClasses}"`;
                }
                return match;
            });

            if (content !== original) {
                fs.writeFileSync(fullPath, content);
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

processDir('src/pages');
processDir('src/components');
