const iconContent = ([content]) => {
    var animationId = 's'+Math.round(Math.random()*99999).toString(36);
    return {
        '&>:nth-child(1)': {
            'animation': animationId + ' 0ms',
        },
        '&>:nth-child(1)::before': {
            // 'display': 'none',
            'content': '"' + (content || '') + '"',
        },
        ['@keyframes ' + animationId]: {
            '0%':{'color':'black'}, '100%':{'color':'red'}
        }
    };
}

const htmlIcon = (html) => {
    const mixIcon = () => iconContent([html]);
    mixIcon.content = html;
    mixIcon.id = html;
    mixIcon.toString = () => html;
    return mixIcon;
};

module.exports.iconContent = iconContent; // ToDo: Remove export
module.exports.htmlIcon = htmlIcon;
module.exports.svgIcon = (svgContent) => {
    const html = `<svg viewBox='0 0 32 32' fill='currentColor'>${svgContent}</svg>`;
    return htmlIcon(html);
}
module.exports.emoji = (emoji) => {
    const html = `<svg viewBox='0 0 32 32'><text x='16' y='16' font-size='20' text-anchor='middle' alignment-baseline='central' fill='currentColor'>${emoji}</text></svg>`;
    return htmlIcon(html);
}