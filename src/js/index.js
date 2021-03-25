const PAGE_BREAK = "-----PAGE-BREAK-----"

const PX_PER_MM = 3.78

const PAGE_HEIGHT = 297

const FOOTER_MARGIN = 7;

const PAGE_TOP_MARGIN = 10;

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
    return $(elem).outerHeight() / PX_PER_MM;
}

function moveContentsIntoPages(contents) {
    const footerHeight = getFooterHeight() + FOOTER_MARGIN * 2

    let pageNumber = 1;
    let page = createPage(1)
    let accumulativeHeight = 0;

    for(var i = 0;i < contents.length;i++){
        const content = $(contents[i]);
        content.detach();
    }

    for(var i = 0;i < contents.length;i++){
        const content = $(contents[i]);
        const isPageBreak = content.text().trim() === PAGE_BREAK;

        if(isPageBreak) {
            pageNumber++;
            page = createPage(pageNumber)
            accumulativeHeight = 0;
            continue;
        }

        content.appendTo(page)
        const contentHeight = getHeightInMM(content)

        accumulativeHeight += contentHeight;

        const overflow = accumulativeHeight + footerHeight + (pageNumber > 1 ? PAGE_TOP_MARGIN : 0) > PAGE_HEIGHT

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
