const fs = require('fs');
const path = require('path');

const baseDir = '/home/ajit/code/SankhyaCMS/Stories/src/data';

const propertyMapping = {
    // Global/Common
    'Title': 'title',
    'SubTitle': 'subtitle',
    'ImageUrl': 'imageSrc',
    'ButtonText': 'actionLabel',
    'Link': 'href',
    'logoSrc': 'imageSrc',
    'logoUrl': 'imageSrc',
};

function updateObject(obj, type = null) {
    if (!obj || typeof obj !== 'object') return obj;

    if (Array.isArray(obj)) {
        return obj.map(item => updateObject(item, type));
    }

    const newObj = {};
    for (const [key, value] of Object.entries(obj)) {
        let newKey = propertyMapping[key] || key;
        let newValue = value;

        // Special handling for nested structures
        if (key === 'Data' || key === 'data') {
            const currentType = obj.type || value.type || type;
            newValue = updateObject(value, currentType);
            newKey = 'data';
        } else if (key === 'children') {
            newValue = updateObject(value);
        } else if (key === 'items') {
            newValue = updateObject(value, type);
        } else if (key === 'image' && typeof value === 'object') {
            // Handle image: { src: "...", alt: "..." } -> { imageSrc: "...", alt: "..." }
            newValue = {};
            for (const [imgKey, imgValue] of Object.entries(value)) {
                if (imgKey === 'src' || imgKey === 'imageSrc') {
                    newValue['imageSrc'] = imgValue;
                } else {
                    newValue[imgKey] = imgValue;
                }
            }
        } else if (key === 'Title' || key === 'title') {
            newKey = 'title';
        } else if (key === 'SubTitle' || key === 'subtitle') {
            newKey = 'subtitle';
        } else {
            // Component-specific renames
            if (type === 'FeaturesSection' && key === 'featureLinkText') {
                newKey = 'actionLabel';
            } else if (type === 'FeatureItem' && key === 'url') {
                newKey = 'href';
            } else if (type === 'FeatureSplit') {
                if (key === 'description') newKey = 'subtitle';
                if (key === 'primaryActionLabel') newKey = 'actionLabel';
                if (key === 'primaryActionHref') newKey = 'href';
            } else if (type === 'Testimonials' && key === 'image') {
                newKey = 'imageSrc';
            } else if (type === 'Hero') {
                if (key === 'Title') newKey = 'title';
                if (key === 'SubTitle') newKey = 'subtitle';
                if (key === 'ButtonText') newKey = 'actionLabel';
                if (key === 'Link') newKey = 'href';
                if (key === 'ImageUrl') newKey = 'imageSrc';
            }

            newValue = updateObject(value, type);
        }

        newObj[newKey] = newValue;
    }
    return newObj;
}

const files = fs.readdirSync(baseDir).filter(f => f.endsWith('.json'));
files.forEach(file => {
    const filePath = path.join(baseDir, file);
    try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const updatedContent = updateObject(content);
        fs.writeFileSync(filePath, JSON.stringify(updatedContent, null, 2), 'utf8');
        console.log(`Updated ${file}`);
    } catch (e) {
        console.error(`Error updating ${file}:`, e.message);
    }
});
