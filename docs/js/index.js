const pxPerMM = 3.78

const pageHeight = 297

const footerMargin = 7;

const pageTopMargin = 10;

const templates = {}

function registerTemplate() {
    $("body > div.templates").children().each((_, template) => {
        const templateName = $(template).attr("class").replace("-template", "")
        templates[templateName] = $("> div", template);
    })
}
function createPage(num) {
    const page = $(templates.page).clone()
    $(".footer .page-num", page).html(num);
    const container = $('body > div.container')
    $(page).appendTo(container)
    return page;
}

function removeTemplates() {
    $("body > div.templates").remove();
}

function getFooterHeight() {
    return getHeightInMM($(".footer", $(templates.page)));
}

function getHeightInMM(elem) {
    return $(elem).outerHeight() / pxPerMM;
}

function moveContentsIntoPages(contents) {
    const footerHeight = getFooterHeight() + footerMargin * 2

    let pageNumber = 1;
    let page = createPage(1)
    let accumulativeHeight = 0;

    for(var i = 0;i < contents.length;i++){
        const content = $(contents[i]);
        content.detach();
    }

    for(var i = 0;i < contents.length;i++){
        const content = $(contents[i]);
        content.appendTo(page)
        const contentHeight = getHeightInMM(content)

        accumulativeHeight += contentHeight;

        const overflow = accumulativeHeight + footerHeight + (pageNumber > 1 ? pageTopMargin : 0) > pageHeight

        if(overflow) {
            accumulativeHeight = contentHeight;
            pageNumber++;
            page = createPage(pageNumber)
            content.detach()
            i--;
        }
    }
}

$(document).ready(() => {
    registerTemplate()
    const contents = $("body > div.container").children()
    moveContentsIntoPages(contents)
    removeTemplates()
})
