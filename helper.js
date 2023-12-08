const {xpToLevelMapping} = require('./constants/fields')

const  getLevel = (xp) => {
    for (const xpThreshold in xpToLevelMapping) {
        if (xp < xpThreshold) {
            return xpToLevelMapping[xpThreshold] - 1;
        }
    }

    const levels = Object.values(xpToLevelMapping);
    return Math.max(...levels);
}


module.exports = {
    getLevel
}
